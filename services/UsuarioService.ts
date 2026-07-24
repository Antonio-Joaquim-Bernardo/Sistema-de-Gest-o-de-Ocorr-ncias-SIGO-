import bcrypt from "bcrypt";
import UsuarioModel from "../models/UsuarioModel";
import { criarToken, UsuarioToken } from "@/lib/auth";

export default class UsuarioService {
  /**
   * Cria um novo usuário (cidadão)
   * Apenas cidadãos podem ser criados publicamente
   */
  static async criarUsuario(dados: any) {
    // Validação de campos obrigatórios
    if (!dados.nome_completo || !dados.email || !dados.senha) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    // Verifica se o email já existe
    const usuarioExistente = await UsuarioModel.buscarPorEmail(dados.email);
    if (usuarioExistente) {
      throw new Error("Este email já está cadastrado.");
    }

    // Verifica se o BI já existe (se foi fornecido)
    if (dados.bi) {
      const usuarioComBI = await UsuarioModel.buscarPorBI(dados.bi);
      if (usuarioComBI) {
        throw new Error("Este BI já está cadastrado.");
      }
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(dados.senha, 10);
    dados.senha = senhaHash;

    // 🔒 FORÇA "cidadao" no registo público (nunca aceitar outro valor)
    dados.tipo_funcao = "cidadao";
    dados.estado = "pendente";

    try {
      return await UsuarioModel.criar(dados);
    } catch (error: any) {
      // Captura erros de violação de unique do PostgreSQL
      if (error.code === "23505") {
        const detail = error.detail || "";
        if (detail.includes("email")) {
          throw new Error("Este email já está cadastrado.");
        }
        if (detail.includes("bi")) {
          throw new Error("Este BI já está cadastrado.");
        }
        throw new Error("Já existe um registro com esta informação.");
      }
      throw error;
    }
  }

  /**
   * Login do usuário
   */
  static async login(email: string, senha: string) {
    const usuario = await UsuarioModel.buscarPorEmail(email);
    if (!usuario) {
      throw new Error("Email ou senha incorretos.");
    }

    if (usuario.estado === "bloqueado") {
      throw new Error("Esta conta está bloqueada.");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Email ou senha incorretos.");
    }

    const token = criarToken({
      id_usuario: usuario.id_usuario,
      tipo_funcao: usuario.tipo_funcao,
    });

    return {
      usuario: {
        id_usuario: usuario.id_usuario,
        nome_completo: usuario.nome_completo,
        email: usuario.email,
        tipo_funcao: usuario.tipo_funcao,
        estado: usuario.estado,
      },
      token,
    };
  }

  /**
   * Lista todos os usuários (apenas super_admin deve usar)
   */
  static async listarUsuarios() {
    return await UsuarioModel.listar();
  }

  /**
   * Busca um usuário por ID
   */
  static async buscarUsuario(id: number) {
    const usuario = await UsuarioModel.buscarPorId(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }

  /**
   * Atualiza dados de um usuário (sem alterar senha, estado ou função)
   */
  static async atualizarUsuario(id: number, dados: any) {
    await this.buscarUsuario(id);

    // Se estiver a atualizar o email, verificar se já existe (e não é o próprio)
    if (dados.email) {
      const usuarioExistente = await UsuarioModel.buscarPorEmail(dados.email);
      if (usuarioExistente && usuarioExistente.id_usuario !== id) {
        throw new Error("Este email já está cadastrado por outro usuário.");
      }
    }

    // Se estiver a atualizar o BI, verificar se já existe (e não é o próprio)
    if (dados.bi) {
      const usuarioExistente = await UsuarioModel.buscarPorBI(dados.bi);
      if (usuarioExistente && usuarioExistente.id_usuario !== id) {
        throw new Error("Este BI já está cadastrado por outro usuário.");
      }
    }

    return await UsuarioModel.atualizar(id, dados);
  }

  /**
   * Atualiza a senha do usuário
   */
  static async atualizarSenha(id: number, novaSenha: string) {
    await this.buscarUsuario(id);
    const senhaHash = await bcrypt.hash(novaSenha, 10);
    return await UsuarioModel.atualizarSenha(id, senhaHash);
  }

  /**
   * Atualiza o estado do usuário (apenas super_admin)
   */
  static async atualizarEstado(id: number, estado: string) {
    const estadosPermitidos = ["pendente", "confirmado", "bloqueado"];
    if (!estadosPermitidos.includes(estado)) {
      throw new Error("Estado inválido.");
    }
    await this.buscarUsuario(id);
    return await UsuarioModel.atualizarEstado(id, estado);
  }

  /**
   * Atualiza a função do usuário (apenas super_admin)
   * 🔒 NUNCA permite rebaixar um super_admin
   */
  static async atualizarFuncao(
    id: number,
    tipo_funcao: string,
    usuarioLogado: UsuarioToken
  ) {
    const funcoesPermitidas = [
      "super_admin",
      "admin_inema",
      "admin_bombeiros",
      "admin_pna",
      "cidadao",
    ];
    if (!funcoesPermitidas.includes(tipo_funcao)) {
      throw new Error("Função inválida.");
    }

    // Apenas super_admin pode alterar funções
    if (usuarioLogado.tipo_funcao !== "super_admin") {
      throw new Error("Apenas Super Administradores podem alterar funções.");
    }

    const usuarioAlvo = await this.buscarUsuario(id);

    // 🔒 PROTEÇÃO: Ninguém pode rebaixar um super_admin (nem ele próprio)
    if (usuarioAlvo.tipo_funcao === "super_admin") {
      throw new Error("Não é possível alterar a função de um Super Administrador.");
    }

    // Se o alvo for o próprio super_admin, também bloqueia (já está coberto pelo if acima)
    // Mas garantimos que não há loophole

    return await UsuarioModel.atualizarFuncao(id, tipo_funcao);
  }

  /**
   * Elimina um usuário (apenas super_admin)
   * 🔒 NUNCA permite eliminar um super_admin
   */
  static async eliminarUsuario(id: number, usuarioLogado: UsuarioToken) {
    // Apenas super_admin pode eliminar
    if (usuarioLogado.tipo_funcao !== "super_admin") {
      throw new Error("Apenas Super Administradores podem eliminar usuários.");
    }

    const usuarioAlvo = await this.buscarUsuario(id);

    // 🔒 PROTEÇÃO: Ninguém pode eliminar um super_admin
    if (usuarioAlvo.tipo_funcao === "super_admin") {
      throw new Error("Não é possível eliminar um Super Administrador.");
    }

    return await UsuarioModel.eliminar(id);
  }
}