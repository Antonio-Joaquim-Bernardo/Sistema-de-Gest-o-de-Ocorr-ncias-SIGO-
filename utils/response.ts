import { NextResponse } from "next/server";

/**
 * Helper para padronizar respostas JSON da API.
 * Todos os controllers devem usar estas funções para manter consistência.
 */
export default class ApiResponse {
  /**
   * Resposta de sucesso (200)
   */
  static sucesso(dados: any, mensagem?: string) {
    return NextResponse.json(
      {
        sucesso: true,
        mensagem: mensagem || "Operação realizada com sucesso.",
        dados,
      },
      { status: 200 }
    );
  }

  /**
   * Resposta de criação (201)
   */
  static criado(dados: any, mensagem?: string) {
    return NextResponse.json(
      {
        sucesso: true,
        mensagem: mensagem || "Recurso criado com sucesso.",
        dados,
      },
      { status: 201 }
    );
  }

  /**
   * Resposta de erro (400, 401, 404, 500, etc.)
   */
  static erro(mensagem: string, status: number = 400) {
    return NextResponse.json(
      {
        sucesso: false,
        mensagem,
      },
      { status }
    );
  }

  /**
   * Resposta de não autorizado (401)
   */
  static naoAutorizado(mensagem?: string) {
    return this.erro(mensagem || "Não autorizado.", 401);
  }

  /**
   * Resposta de não encontrado (404)
   */
  static naoEncontrado(mensagem?: string) {
    return this.erro(mensagem || "Recurso não encontrado.", 404);
  }

  /**
   * Resposta de erro interno (500)
   */
  static erroInterno(mensagem?: string) {
    return this.erro(mensagem || "Erro interno do servidor.", 500);
  }
}