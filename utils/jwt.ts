import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function gerarToken(payload: any) {

    return jwt.sign(
        payload,
        SECRET,
        {
            expiresIn: "1d"
        }
    );

}

export function verificarToken(token: string) {

    return jwt.verify(
        token,
        SECRET
    );

}