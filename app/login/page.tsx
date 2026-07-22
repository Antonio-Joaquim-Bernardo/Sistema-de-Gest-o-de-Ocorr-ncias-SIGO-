"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {

    const router = useRouter();


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const [carregando, setCarregando] = useState(false);



    async function entrar(
        e: React.FormEvent
    ) {

        e.preventDefault();

        setErro("");
        setCarregando(true);


        try {


            const resposta =
                await fetch(
                    "/api/usuarios/login",
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:
                        JSON.stringify({
                            email,
                            senha
                        })
                    }
                );



            const dados =
                await resposta.json();



            if (!resposta.ok) {

                throw new Error(
                    dados.mensagem
                );

            }



            const funcao =
                dados.usuario.tipo_funcao;



            if(funcao === "super_admin") {

                router.push(
                    "/dashboard/super-admin"
                );

            } 
            else if(funcao === "admin_inema") {

                router.push(
                    "/dashboard/inema"
                );

            }
            else if(funcao === "admin_pna") {

                router.push(
                    "/dashboard/pna"
                );

            }
            else if(funcao === "admin_bombeiros") {

                router.push(
                    "/dashboard/bombeiros"
                );

            }
            else {

                router.push(
                    "/dashboard/cidadao"
                );

            }



        } catch(error:any) {


            setErro(
                error.message
            );


        } finally {

            setCarregando(false);

        }

    }



    return (

        <div>

            <h1>
                Login SIGO
            </h1>


            <form onSubmit={entrar}>


                <div>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={
                            e =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                </div>



                <div>

                    <label>
                        Senha
                    </label>

                    <input
                        type="password"
                        value={senha}
                        onChange={
                            e =>
                            setSenha(
                                e.target.value
                            )
                        }
                    />

                </div>



                {
                    erro &&
                    <p>
                        {erro}
                    </p>
                }



                <button
                    type="submit"
                    disabled={carregando}
                >

                    {
                        carregando
                        ?
                        "Entrando..."
                        :
                        "Entrar"
                    }

                </button>


            </form>


        </div>

    );

}