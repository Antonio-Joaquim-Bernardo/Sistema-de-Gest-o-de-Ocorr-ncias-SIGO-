import UsuarioController from "@/controllers/UsuarioController";


export async function GET() {

    return UsuarioController.listar();

}