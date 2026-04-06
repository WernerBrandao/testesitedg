// email.ts — versão sem dependências do Manus

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

/**
 * Envio de email desativado (Manus removido).
 * Mantemos a função por compatibilidade, mas ela sempre retorna false.
 */
export async function sendEmail(_payload: EmailPayload): Promise<boolean> {
  console.warn("[Email] Serviço de envio de email desativado.");
  return false;
}

/**
 * Template de email para reset de senha
 */
export function getPasswordResetEmailTemplate(
  userName: string,
  resetLink: string
): { subject: string; html: string } {
  return {
    subject: "Redefinir sua senha - DEGASE",
    html: `... (todo o HTML permanece igual) ...`
  };
}

/**
 * Template de email para notificações de segurança
 */
export function getSecurityNotificationEmailTemplate(
  title: string,
  message: string,
  details: Record<string, string>
): { subject: string; html: string } {
  const detailsHtml = Object.entries(details)
    .map(([k, v]) => `<tr><td><strong>${k}:</strong></td><td>${v}</td></tr>`)
    .join("");

  return {
    subject: `🔒 Notificação de Segurança: ${title} - DEGASE`,
    html: `... (todo o HTML permanece igual) ...`
  };
}