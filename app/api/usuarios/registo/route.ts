import UsuarioController from "@/controllers/UsuarioController";
import { NextRequest } from "next/server";


export async function POST(
    req: NextRequest
) {

    return UsuarioController.criar(req);

}