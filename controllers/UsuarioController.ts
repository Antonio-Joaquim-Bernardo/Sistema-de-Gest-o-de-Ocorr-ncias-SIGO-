import { NextRequest, NextResponse } from "next/server";
import UsuarioService from "../services/UsuarioService";



export default class UsuarioController {




    static async criar(

        req:NextRequest

    ){


        try {


            const dados =

                await req.json();



            const usuario =

                await UsuarioService.criarUsuario(

                    dados

                );



            return NextResponse.json(

                {

                    mensagem:

                    "Usuário criado com sucesso.",


                    usuario

                },

                {

                    status:201

                }

            );



        }catch(erro:any){


            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:400

                }

            );


        }


    }









    static async login(

        req:NextRequest

    ){


        try {



            const {

                email,

                senha


            } = await req.json();





            const resultado =

                await UsuarioService.login(

                    email,

                    senha

                );





            const resposta =

                NextResponse.json(

                    {

                        mensagem:

                        "Login realizado com sucesso.",


                        ...resultado

                    },

                    {

                        status:200

                    }

                );





            resposta.cookies.set(

                "token",

                resultado.token,

                {


                    httpOnly:true,


                    secure:

                    process.env.NODE_ENV === "production",


                    sameSite:"lax",


                    maxAge:

                    60 * 60 * 24 * 7,


                    path:"/"


                }

            );





            return resposta;



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:401

                }

            );


        }


    }









    static async listar(){



        try {



            const usuarios =

                await UsuarioService.listarUsuarios();





            return NextResponse.json(

                usuarios,

                {

                    status:200

                }

            );



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:500

                }

            );


        }


    }









    static async buscarPorId(

        id:number

    ){



        try {



            const usuario =

                await UsuarioService.buscarUsuario(

                    id

                );





            return NextResponse.json(

                usuario,

                {

                    status:200

                }

            );



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:404

                }

            );


        }


    }









    static async atualizar(

        id:number,

        req:NextRequest

    ){



        try {



            const dados =

                await req.json();





            const usuario =

                await UsuarioService.atualizarUsuario(

                    id,

                    dados

                );





            return NextResponse.json(

                {

                    mensagem:

                    "Usuário atualizado com sucesso.",


                    usuario

                },

                {

                    status:200

                }

            );



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:400

                }

            );


        }


    }









    static async atualizarSenha(

        id:number,

        req:NextRequest

    ){



        try {



            const {

                novaSenha

            } = await req.json();





            const usuario =

                await UsuarioService.atualizarSenha(

                    id,

                    novaSenha

                );





            return NextResponse.json(

                {

                    mensagem:

                    "Senha atualizada com sucesso.",


                    usuario

                },

                {

                    status:200

                }

            );



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:400

                }

            );


        }


    }









    static async atualizarEstado(

        id:number,

        req:NextRequest

    ){



        try {



            const {

                estado

            } = await req.json();





            const usuario =

                await UsuarioService.atualizarEstado(

                    id,

                    estado

                );





            const {

                senha,

                ...usuarioSeguro

            } = usuario;





            return NextResponse.json(

                {

                    mensagem:

                    "Estado do usuário atualizado com sucesso.",


                    usuario:

                    usuarioSeguro

                },

                {

                    status:200

                }

            );



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:400

                }

            );


        }


    }









    static async atualizarFuncao(

        id:number,

        req:NextRequest

    ){



        try {



            const {

                tipo_funcao

            } = await req.json();





            const usuario =

                await UsuarioService.atualizarFuncao(

                    id,

                    tipo_funcao

                );





            const {

                senha,

                ...usuarioSeguro

            } = usuario;





            return NextResponse.json(

                {

                    mensagem:

                    "Função do usuário atualizada com sucesso.",


                    usuario:

                    usuarioSeguro

                },

                {

                    status:200

                }

            );



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:400

                }

            );


        }


    }









    static async eliminar(

        id:number

    ){



        try {



            await UsuarioService.eliminarUsuario(

                id

            );





            return NextResponse.json(

                {

                    mensagem:

                    "Usuário eliminado com sucesso."

                },

                {

                    status:200

                }

            );



        }catch(erro:any){



            return NextResponse.json(

                {

                    mensagem:

                    erro.message

                },

                {

                    status:404

                }

            );


        }


    }





}