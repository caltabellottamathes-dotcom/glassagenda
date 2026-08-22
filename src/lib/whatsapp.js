export const GRADS = [
  "from-plum to-clay",
  "from-clay to-sand",
  "from-sand to-sky",
  "from-sky to-marble",
  "from-urgent to-sand",
  "from-plum to-sand",
];

export const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
export const grad = (id) => GRADS[id % GRADS.length];

export const CHATS = [
  { id: 1, name: "Giulia Visser", last: "Update Marktanalyse", time: "14:32", unread: 2, online: true, role: "Partner", group: false },
  { id: 2, name: "F. de Boer", last: "Concept Brons feedback", time: "11:48", unread: 0, online: false, role: "Klant", group: false },
  { id: 3, name: "Centrum West", last: "Ruimte bevestigd", time: "09:20", unread: 1, online: true, role: "Locatie", group: false },
  { id: 4, name: "T. Bakker", last: "Tot morgen!", time: "gisteren", unread: 0, online: false, role: "Collega", group: false },
  { id: 5, name: "S. Kaya", last: "Design draft klaar", time: "gisteren", unread: 3, online: true, role: "Designer", group: false },
  { id: 6, name: "Team Focus", last: "Vergadering om 16:00", time: "08:05", unread: 5, online: true, role: "Groep · 8 leden", group: true },
  { id: 7, name: "M. de Jong", last: "Gezellig dit weekend", time: "vr", unread: 0, online: false, role: "Vriend", group: false },
  { id: 8, name: "Huisarts", last: "Recept klaarleggen", time: "wo", unread: 0, online: false, role: "Zorg", group: false },
];

export const MESSAGES = {
  1: [
    { me: false, text: "Heb je het rapport al?", time: "14:30" },
    { me: true, text: "Bijna klaar, stuur het vandaag", time: "14:31", status: "read" },
    { me: false, text: "Top, ik wacht 👍", time: "14:32" },
  ],
  2: [
    { me: false, text: "Concept Brons bevalt me goed", time: "11:40" },
    { me: true, text: "Fijn om te horen!", time: "11:45", status: "read" },
    { me: false, text: "Eén puntje over de kleur...", time: "11:48" },
  ],
  3: [{ me: false, text: "Ruimte is bevestigd voor donderdag", time: "09:20" }],
  4: [
    { me: true, text: "Tot morgen!", time: "20:10", status: "read" },
    { me: false, text: "Tot morgen 👋", time: "20:12" },
  ],
  5: [
    { me: false, text: "Design draft staat online", time: "16:30" },
    { me: false, text: "Kun je kijken vandaag?", time: "16:31" },
    { me: false, text: "Pakket 2 bevalt me meest", time: "16:33" },
  ],
  6: [
    { me: false, text: "Vergadering om 16:00 in ruimte 3", time: "08:05" },
    { me: false, text: "Agenda volgt zo", time: "08:06" },
  ],
  7: [{ me: false, text: "Gezellig dit weekend 🍷", time: "vr" }],
  8: [{ me: false, text: "Recept ligt klaar bij de balie", time: "wo" }],
};

export const seedMessages = (id) => (MESSAGES[id] ? MESSAGES[id].map((m, i) => ({ ...m, id: i })) : []);

export const replyFor = (text) => {
  const t = text.toLowerCase();
  if (t.includes("?")) return "Goede vraag, ik zoek het voor je uit 🔎";
  if (t.includes("bedankt") || t.includes("dank")) return "Geen probleem 😊";
  return "Begrepen, ik pak het op 👍";
};