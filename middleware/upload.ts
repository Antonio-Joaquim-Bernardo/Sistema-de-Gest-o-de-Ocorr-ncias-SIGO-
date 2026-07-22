import { NextRequest, NextResponse } from "next/server";
import { autenticar } from "./auth";

/**
 * Limite de tamanho de ficheiro (5MB por defeito)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Tipos de ficheiro permitidos (imagem, vídeo, áudio)
 */
const TIPOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
];

/**
 * Middleware para processar upload de ficheiros.
 * Verifica autenticação, tipo e tamanho do ficheiro.
 * Deve ser usado em API routes que recebem FormData.
 *
 * Exemplo de uso:
 *   const { files, fields } = await processarUpload(req);
 */
export async function processarUpload(
  req: NextRequest,
  opcoes?: {
    maxSize?: number;
    tiposPermitidos?: string[];
    required?: boolean;
  }
) {
  // 1. Autenticação
  const usuario = autenticar(req);

  // 2. Configurações
  const maxSize = opcoes?.maxSize || MAX_FILE_SIZE;
  const tiposPermitidos = opcoes?.tiposPermitidos || TIPOS_PERMITIDOS;
  const required = opcoes?.required !== undefined ? opcoes.required : true;

  // 3. Processar FormData
  const formData = await req.formData();
  const files: File[] = [];
  const fields: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      files.push(value);
    } else {
      fields[key] = value as string;
    }
  }

  // 4. Validação: se é obrigatório e não há ficheiros
  if (required && files.length === 0) {
    throw new Error("Nenhum ficheiro enviado.");
  }

  // 5. Validação de cada ficheiro
  for (const file of files) {
    if (file.size > maxSize) {
      throw new Error(
        `Ficheiro "${file.name}" excede o tamanho máximo de ${maxSize / 1024 / 1024}MB.`
      );
    }
    if (!tiposPermitidos.includes(file.type)) {
      throw new Error(
        `Tipo de ficheiro "${file.type}" não permitido. Tipos permitidos: ${tiposPermitidos.join(", ")}`
      );
    }
  }

  return {
    usuario,
    files,
    fields,
  };
}

/**
 * Helper para gerar nome único para o ficheiro
 */
export function gerarNomeUnico(originalName: string): string {
  const ext = originalName.split(".").pop() || "bin";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${ext}`;
}