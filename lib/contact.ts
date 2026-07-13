import { site } from '@/data/site';

const WHATSAPP_PHONE = site.phone.replace(/\D/g, '');

export function buildWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

export function buildProjectWhatsAppMessage(service?: string) {
  const intro = `Hi Tayo,\n\nI'd like to discuss a project with you.`;
  if (!service?.trim()) return intro;
  return `${intro}\n\nProject type: ${service.trim()}`;
}
