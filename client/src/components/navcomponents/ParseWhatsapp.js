// src/lib/parseWhatsApp.js
export function parseWhatsAppText(content) {
  const lines = content.split(/\r?\n/);
  const messages = [];

  const regex = /^(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}),\s(\d{1,2}:\d{2})(?:\s?[APap][Mm])?\s-\s([^:]+):\s([\s\S]*)$/;

  for (let line of lines) {
    const match = line.match(regex);
    if (match) {
      const [_, dateStr, timeStr, sender, text] = match;
      messages.push({
        dateStr,
        timeStr,
        sender,
        text,
        isMediaOmitted: text === '<Media omitted>',
      });
    }
  }
  return messages;
}
