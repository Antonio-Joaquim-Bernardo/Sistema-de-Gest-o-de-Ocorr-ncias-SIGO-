/**
 * Converte string para número e valida se é um ID válido.
 * Reutilizado em várias rotas.
 */
export function obterId(id: string): number {
  const idNumero = Number(id);
  if (isNaN(idNumero) || idNumero <= 0) {
    throw new Error("ID inválido.");
  }
  return idNumero;
}

/**
 * Verifica se um valor é um número inteiro positivo.
 */
export function isIdValido(id: any): boolean {
  return typeof id === "number" && Number.isInteger(id) && id > 0;
}