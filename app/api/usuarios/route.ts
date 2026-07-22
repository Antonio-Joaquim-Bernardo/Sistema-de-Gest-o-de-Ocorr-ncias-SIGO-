import { NextRequest } from "next/server";
import UsuarioController from "@/controllers/UsuarioController";



export async function POST(

    request:NextRequest

){


    return await UsuarioController.criar(

        request

    );


}







export async function GET(

    request:NextRequest

){


    return await UsuarioController.listar();


}