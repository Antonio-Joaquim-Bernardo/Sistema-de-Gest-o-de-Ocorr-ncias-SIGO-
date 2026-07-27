import VerificacaoModel from "../models/VerificacaoModel";
import UsuarioModel from "../models/UsuarioModel";
import EmailService from "./EmailService";

export default class VerificacaoService {
  /**
   * Gera um código aleatório de 6 dígitos
   */
  static gerarCodigo(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Cria um código de verificação e envia por email
   */
  static async enviarCodigoEmail(id_usuario: number) {
    const usuario = await UsuarioModel.buscarPorId(id_usuario);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    if (!usuario.email) {
      throw new Error("Usuário não tem email cadastrado.");
    }

    // Verifica se já existe um código válido para este usuário (não usado e não expirado)
    const codigosExistentes = await VerificacaoModel.buscarPorUsuario(id_usuario);
    const agora = new Date();
    const valido = codigosExistentes.find(
      (c) =>
        !c.usado &&
        new Date(c.expiracao) > agora
    );

    if (valido) {
      // Reutiliza o código existente (ou pode gerar novo, mas vou reutilizar para não sobrecarregar)
      await EmailService.enviarCodigoVerificacao(
        usuario.email,
        usuario.nome_completo,
        valido.codigo
      );
      return valido;
    }

    // Gera novo código
    const codigo = this.gerarCodigo();
    const expiracao = new Date();
    expiracao.setMinutes(expiracao.getMinutes() + 15); // 15 minutos

    const novaVerificacao = await VerificacaoModel.criar({
      id_usuario,
      codigo,
      tipo: "email",
      expiracao,
    });

    // Envia email
    await EmailService.enviarCodigoVerificacao(
      usuario.email,
      usuario.nome_completo,
      codigo
    );

    return novaVerificacao;
  }

  /**
   * Verifica o código e ativa a conta
   */
  static async verificarCodigo(id_usuario: number, codigo: string) {
    const usuario = await UsuarioModel.buscarPorId(id_usuario);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    if (usuario.estado === "confirmado") {
      throw new Error("Esta conta já foi confirmada.");
    }

    // Busca o código
    const verificacao = await VerificacaoModel.buscarPorCodigo(codigo, id_usuario);
    if (!verificacao) {
      throw new Error("Código inválido.");
    }

    if (verificacao.usado) {
      throw new Error("Este código já foi utilizado.");
    }

    const agora = new Date();
    if (new Date(verificacao.expiracao) < agora) {
      throw new Error("Código expirado. Solicite um novo.");
    }

    // Marca como usado
    await VerificacaoModel.marcarUsado(verificacao.id_verificacao);

    // Confirma o usuário
    await UsuarioModel.atualizarEstado(id_usuario, "confirmado");

    return { sucesso: true, mensagem: "Conta confirmada com sucesso!" };
  }

  /**
   * Reenvia o código para o email do usuário
   */
  static async reenviarCodigo(id_usuario: number) {
    return await this.enviarCodigoEmail(id_usuario);
  }
}