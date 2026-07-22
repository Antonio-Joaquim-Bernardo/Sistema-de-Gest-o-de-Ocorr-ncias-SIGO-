import CategoriaController from "@/controllers/CategoriaController";



export async function GET(){

    return await CategoriaController.listar();

}