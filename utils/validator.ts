/**
 * Validação de email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validação de senha (mínimo 6 caracteres)
 */
export function isValidPassword(senha: string): boolean {
  return senha.length >= 6;
}

/**
 * Validação de BI (exemplo: 9 dígitos, pode ajustar)
 */
export function isValidBI(bi: string): boolean {
  return /^\d{9}$/.test(bi);
}

/**
 * Validação de telefone (exemplo: 9 dígitos)
 */
export function isValidPhone(telefone: string): boolean {
  return /^\d{9,12}$/.test(telefone);
}

/**
 * Sanitiza uma string (remove espaços extras, etc.)
 */
export function sanitizarString(texto: string): string {
  return texto.trim().replace(/\s+/g, " ");
}