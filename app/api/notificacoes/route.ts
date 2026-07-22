import { NextRequest } from "next/server";
import NotificacaoController from "@/controllers/NotificacaoController";

// GET /api/notificacoes?usuario_id=123
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const usuarioId = searchParams.get("usuario_id");
  if (!usuarioId) {
    return Response.json(
      { sucesso: false, mensagem: "Parâmetro usuario_id é obrigatório." },
      { status: 400 }
    );
  }
  return await NotificacaoController.listarPorUsuario(request, Number(usuarioId));
}