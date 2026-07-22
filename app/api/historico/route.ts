import { NextRequest } from "next/server";
import HistoricoController from "@/controllers/HistoricoController";


export async function POST(

    request:NextRequest

){

    return await HistoricoController.criar(

        request

    );

}


export async function GET(

    request:NextRequest

){

    return await HistoricoController.listarTodos(

        request

    );

}