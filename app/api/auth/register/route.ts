import { NextResponse } from "next/server";
import AuthController from "../../../../controllers/AuthController";

export async function POST(request: Request) {

    try {

        const body = await request.json();

        const resultado =
            await AuthController.registrar(body);

        return NextResponse.json(
            resultado,
            {
                status: 201
            }
        );

    } catch (error: any) {

        return NextResponse.json(
            {
                sucesso: false,
                mensagem: error.message
            },
            {
                status: 400
            }
        );

    }

}