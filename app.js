"use strict";
/* ================= DONNÉES ================= */
const WORDS = [], SENTS = [];
const BANDS = ["A1", "A2", "B1", "B2"];
BANDS.forEach((B, bi) => {
  const lines = WORDLIST[B].trim().split("\n"), half = Math.ceil(lines.length / 2);
  lines.forEach((s, i) => { const [en, fr] = s.split("|"); const a = en.split("/"); WORDS.push({ id: "w:" + a[0], en: a, fr, l: bi * 2 + (i < half ? 1 : 2) }); });
  if (PHRASES[B]) PHRASES[B].trim().split("\n").forEach(s => { const [en, fr] = s.split("|"); WORDS.push({ id: "w:" + en, en: [en], fr, l: bi * 2 + 2 }); });
});
for (const l in SENTLIST) SENTLIST[l].forEach(s => { const [en, fr] = s.split("|"); const a = en.split("/"); SENTS.push({ id: "s:" + a[0], en: a, fr, l: +l }); });
const DIALOGS = [...DATA.dialogs, ...MORE_DIALOGS].map((d, i) => ({ ...d, id: "d:" + d.lines[0] }));
const QUESTIONS = [...DATA.questions, ...MORE_QUESTIONS].map(q => ({ ...q, id: "q:" + q.q }));
const LEVELS = ["A1", "A1+", "A2", "A2+", "B1", "B1+", "B2", "B2+"];
const SKILLS = { listen: "Comprendre", speak: "Parler", vocab: "Vocabulaire", write: "Écrire" };

/* ================= ÉTAT ================= */
const KEY = "stepup-v2";
const INTERVALS = [0, 1, 2, 4, 7, 15, 30];
const fresh = () => ({ v: 2, sk: { listen: 2.5, speak: 2.5, vocab: 2.5, write: 2.5 }, run: { listen: 0, speak: 0, vocab: 0, write: 0 },
  items: {}, days: [], minutes: 0, dur: 10, canSpeak: true, sound: true, autoNext: true, updated: 0 });
let S = fresh();
try { const r = JSON.parse(localStorage.getItem(KEY) || "null"); if (r && r.v === 2) S = { ...fresh(), ...r, sk: { ...fresh().sk, ...r.sk }, run: { ...fresh().run, ...r.run } }; } catch (e) {}
function save() { S.updated = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const dayNum = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5); };

/* ================= OUTILS ================= */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lvlOf = x => clamp(Math.round(1 + (x - 1) * 7 / 9), 1, 8);
const CEFR = x => LEVELS[lvlOf(x) - 1];
const maxLevel = sk => lvlOf(S.sk[sk]);

const CONTR = { "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is", "we're": "we are", "they're": "they are", "that's": "that is", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "can not", "cannot": "can not", "won't": "will not", "i'd": "i would", "you'd": "you would", "we'd": "we would", "i'll": "i will", "we'll": "we will", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not", "i've": "i have", "we've": "we have", "let's": "let us", "what's": "what is", "where's": "where is", "there's": "there is", "how's": "how is" };
const NUMS = { 0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty", 30: "thirty", 40: "forty", 50: "fifty" };
function norm(s) {
  s = String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[.,!?;:"()]/g, " ").replace(/\s+/g, " ").trim();
  s = s.split(" ").map(w => CONTR[w] || (NUMS[w] !== undefined ? NUMS[w] : w)).join(" ");
  return s.replace(/^to /, "").trim();
}
function lev(a, b) {
  const m = a.length, n = b.length; const d = Array.from({ length: m + 1 }, (_, i) => { const r = new Array(n + 1).fill(0); r[0] = i; return r; });
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[m][n];
}
function checkText(input, answers) {
  const u = norm(input); if (!u) return { ok: false };
  for (const a of answers) if (norm(a) === u) return { ok: true };
  for (const a of answers) { const n = norm(a); if (n.length > 4 && lev(n, u) <= Math.max(1, Math.floor(n.length / 14))) return { ok: true, typo: true }; }
  return { ok: false };
}
// Similarité orale : mots de la cible retrouvés dans l'ordre (plus longue sous-séquence commune)
function speechScore(heard, target) {
  const h = norm(heard).split(" ").filter(Boolean), t = norm(target).split(" ").filter(Boolean);
  if (!t.length) return { score: 0, marks: [] };
  const m = h.length, n = t.length, L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  const same = (a, b) => a === b || (a.length > 3 && lev(a, b) <= 1);
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) L[i][j] = same(h[i - 1], t[j - 1]) ? L[i - 1][j - 1] + 1 : Math.max(L[i - 1][j], L[i][j - 1]);
  const hit = new Array(n).fill(false); let i = m, j = n;
  while (i > 0 && j > 0) { if (same(h[i - 1], t[j - 1])) { hit[j - 1] = true; i--; j--; } else if (L[i - 1][j] >= L[i][j - 1]) i--; else j--; }
  return { score: L[m][n] / Math.max(n, m * 0.8), hit, words: t };
}

/* ================= AUDIO ================= */
const hasTTS = "speechSynthesis" in window;
let voices = [];
function loadVoices() { if (!hasTTS) return; const v = speechSynthesis.getVoices(); const us = v.filter(x => /en[-_]US/i.test(x.lang)), gb = v.filter(x => /en[-_]GB/i.test(x.lang)), any = v.filter(x => /^en/i.test(x.lang)); voices = [...us, ...gb, ...any.filter(x => !us.includes(x) && !gb.includes(x))]; }
if (hasTTS) {
  loadVoices();
  speechSynthesis.onvoiceschanged = () => { const had = voices.length; loadVoices(); if (!had && voices.length && !sess) home(); };
  let tries = 0; const poll = setInterval(() => { tries++; const had = voices.length; loadVoices(); if (!had && voices.length && !sess) home(); if (voices.length || tries > 20) clearInterval(poll); }, 400);
}
const soundOK = () => S.sound && hasTTS;
const baseRate = () => clamp(0.72 + (S.sk.listen - 1) * 0.055, 0.7, 1.2);
function say(text, opt = {}) {
  return new Promise(res => {
    if (!soundOK()) return res();
    try {
      if (!opt.queue) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); const v = voices[opt.voice || 0] || voices[0];
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US"; u.rate = opt.slow ? 0.62 : baseRate(); u.pitch = opt.pitch || 1;
      u.onend = u.onerror = () => res(); speechSynthesis.speak(u);
      setTimeout(res, 2500 + text.length * 120);
    } catch (e) { res(); }
  });
}
async function sayDialog(lines, slow) {
  if (!soundOK()) return; speechSynthesis.cancel();
  const two = voices.length > 1;
  for (let k = 0; k < lines.length; k++) await say(lines[k], { queue: true, slow, voice: two ? k % 2 : 0, pitch: two ? 1 : (k % 2 ? 0.8 : 1.15) });
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const micOK = () => S.canSpeak && !!SR;
function recognize(onInterim) {
  return new Promise(resolve => {
    let done = false, best = [];
    const r = new SR(); r.lang = "en-US"; r.interimResults = true; r.maxAlternatives = 3; r.continuous = false;
    r.onresult = e => { const res = e.results[e.results.length - 1]; const alts = [...res].map(a => a.transcript); if (onInterim) onInterim(alts[0]); if (res.isFinal) best = alts; };
    r.onerror = e => { if (!done) { done = true; resolve({ error: e.error, alts: best }); } };
    r.onend = () => { if (!done) { done = true; resolve({ alts: best, error: best.length ? null : "no-speech" }); } };
    try { r.start(); } catch (e) { done = true; resolve({ error: "start" }); }
    setTimeout(() => { try { r.stop(); } catch (e) {} }, 12000);
    recognize.stop = () => { try { r.stop(); } catch (e) {} };
  });
}
const ICON = {
  spk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
  mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>'
};

/* ================= MÉMOIRE (révisions espacées) ================= */
const rec = id => S.items[id];
function gradeItem(id, ok) {
  if (sess && sess.placement) return;
  const w = S.items[id] || { b: 0, d: 0 };
  if (ok) w.b = Math.min(6, w.b + 1); else w.b = w.b > 1 ? Math.floor(w.b / 2) : 1;
  w.d = dayNum() + INTERVALS[w.b]; S.items[id] = w;
}
function gradeSkill(sk, ok, help) {
  if (sess && sess.placement) { // test de niveau : on cherche vite le bon palier
    const step = Math.max(0.45, 1.3 - (sess.stats[sk]?.n || 0) * 0.15);
    S.sk[sk] = clamp(S.sk[sk] + (ok ? step * (help ? 0.5 : 1) : -step * 0.8), 1, 10); return;
  }
  if (ok) {
    S.run[sk] = (S.run[sk] || 0) + 1;
    let g = 0.22 * (help ? 0.4 : 1);
    if (S.run[sk] >= 5) { g += 0.35; S.run[sk] = 0; } // toujours juste → ça monte vite
    S.sk[sk] = clamp(S.sk[sk] + g, 1, 10);
  } else { S.run[sk] = 0; S.sk[sk] = clamp(S.sk[sk] - 0.35, 1, 10); }
}
function chooseFrom(list, sk, { minBack = 2, allowNew = true } = {}) {
  const top = maxLevel(sk), lo = Math.max(1, top - minBack), t = dayNum();
  const pool = list.filter(x => x.l <= top && x.l >= lo);
  const due = shuffle(pool.filter(x => rec(x.id) && rec(x.id).d <= t && !recent.includes(x.id))).sort((a, b) => rec(a.id).b - rec(b.id).b);
  if (due.length) return due[0];
  const unseen = shuffle(pool.filter(x => !rec(x.id) && !recent.includes(x.id))).sort((a, b) => b.l - a.l);
  if (allowNew && unseen.length) return unseen[0];
  const rest = shuffle(pool.filter(x => !recent.includes(x.id)));
  return rest.sort((a, b) => (rec(a.id)?.b || 0) - (rec(b.id)?.b || 0))[0] || pick(pool.length ? pool : list.filter(x => x.l <= top));
}

/* ================= CHOIX DE L'EXERCICE SUIVANT ================= */
let sess = null, recent = [];
function weights() {
  const w = { listen: soundOK() ? 0.35 : 0, speak: micOK() ? 0.3 : 0, vocab: 0.2, write: 0.15 };
  const act = Object.keys(w).filter(k => w[k] > 0), avg = act.reduce((s, k) => s + S.sk[k], 0) / act.length;
  if (sess && sess.placement) { for (const k of act) w[k] = 1; return w; }
  for (const k of act) w[k] *= 1 + clamp((avg - S.sk[k]) / 4, -0.4, 0.8); // on renforce la compétence la plus faible
  return w;
}
function wpick(obj) { const e = Object.entries(obj).filter(([, v]) => v > 0); let r = Math.random() * e.reduce((s, [, v]) => s + v, 0); for (const [k, v] of e) { r -= v; if (r <= 0) return k; } return e[0][0]; }
function nextItem() {
  if (sess.queue.length && sess.queue[0].wait <= 0) return sess.queue.shift().item;
  sess.queue.forEach(q => q.wait--);
  let sk = wpick(weights());
  if (sess.lastSk.length >= 2 && sess.lastSk.slice(-2).every(x => x === sk)) { const w = weights(); delete w[sk]; if (Object.values(w).some(v => v > 0)) sk = wpick(w); }
  sess.lastSk.push(sk);
  const L = S.sk[sk];
  if (sk === "vocab") return vocabItem();
  if (sk === "write") {
    const s = chooseFrom(SENTS, "write");
    return { t: L >= 5 && Math.random() < 0.7 ? "w_type" : "w_build", s, sk };
  }
  if (sk === "listen") {
    const t = L < 3 ? wpick({ l_word: 0.5, l_mcq: 0.5 }) : L < 5 ? wpick({ l_mcq: 0.35, l_pair: 0.2, l_dbuild: 0.25, l_dialog: 0.2 }) : L < 7 ? wpick({ l_dbuild: 0.25, l_dtype: 0.2, l_dialog: 0.3, l_mcq: 0.15, l_pair: 0.1 }) : wpick({ l_dtype: 0.35, l_dialog: 0.45, l_pair: 0.2 });
    if (t === "l_word") return { t, w: chooseFrom(WORDS.filter(w => rec(w.id)), "listen", { minBack: 5 }) || chooseFrom(WORDS, "listen"), sk };
    if (t === "l_pair") return { t, p: pick(DATA.pairs), sk };
    if (t === "l_dialog") return { t, d: chooseFrom(DIALOGS, "listen", { minBack: 2 }), sk };
    return { t, s: chooseFrom(SENTS, "listen"), sk };
  }
  // parler
  const t = L < 3 ? wpick({ s_repeat: 0.7, s_trans: 0.3 }) : L < 6 ? wpick({ s_echo: soundOK() ? 0.3 : 0, s_trans: 0.5, s_answer: 0.2 }) : wpick({ s_trans: 0.5, s_answer: 0.35, s_echo: soundOK() ? 0.15 : 0 });
  if (t === "s_answer") return { t, q: chooseFrom(QUESTIONS, "speak", { minBack: 3 }), sk };
  if (t === "s_repeat" && !soundOK()) return { t: "s_trans", s: chooseFrom(SENTS, "speak"), sk };
  return { t, s: chooseFrom(SENTS, "speak"), sk };
}
function vocabItem() {
  const sk = "vocab", top = maxLevel(sk), t = dayNum();
  if (sess.placement) { const w = pick(WORDS.filter(x => x.l === top && !recent.includes(x.id))); return { t: top >= 5 ? "v_type" : Math.random() < 0.5 ? "v_mcq_ef" : "v_mcq_fe", w, sk }; }
  const due = shuffle(WORDS.filter(w => rec(w.id) && rec(w.id).d <= t && !recent.includes(w.id))).sort((a, b) => rec(a.id).b - rec(b.id).b);
  if (due.length && (sess.newCount >= sess.newMax || Math.random() < 0.65)) return vocabQuiz(due[0]);
  if (sess.newCount < sess.newMax) {
    const nw = WORDS.filter(w => !rec(w.id) && w.l <= top && w.l >= Math.max(1, top - 2)).sort((a, b) => a.l - b.l)[0] || WORDS.find(w => !rec(w.id) && w.l <= top);
    if (nw) { sess.newCount++; sess.queue.push({ wait: 2, item: { t: "v_mcq_ef", w: nw, sk } }); return { t: "v_intro", w: nw, sk }; }
  }
  const seen = shuffle(WORDS.filter(w => rec(w.id) && !recent.includes(w.id))).sort((a, b) => rec(a.id).b - rec(b.id).b);
  return seen.length ? vocabQuiz(seen[0]) : { t: "v_intro", w: WORDS[0], sk };
}
function vocabQuiz(w) {
  const b = rec(w.id)?.b || 0, L = S.sk.vocab;
  const t = b <= 1 ? "v_mcq_ef" : b === 2 ? "v_mcq_fe" : L >= 4 ? "v_type" : "v_mcq_fe";
  return { t, w, sk: "vocab" };
}

/* ================= DICTIONNAIRE AU TOUCHER ================= */
const DICT = {}, DICTV = {};
for (const w of WORDS) for (const e of w.en) { const isV = /^to /i.test(e), k = e.toLowerCase().replace(/^to /, ""); if (k.includes(" ")) continue; if (isV && !DICTV[k]) DICTV[k] = w.fr; if (!DICT[k]) DICT[k] = w.fr; }
Object.assign(DICT, Object.fromEntries(Object.entries({ should: "devrait (conseil)", could: "pourrait", would: "conditionnel (-rais)", must: "devoir (obligation)", might: "pourrait (peut-être)", will: "futur (-ra)", can: "pouvoir", about: "à propos de / environ", before: "avant", after: "après", until: "jusqu'à", during: "pendant", without: "sans", with: "avec", for: "pour / depuis", since: "depuis", ago: "il y a", still: "encore / toujours", just: "juste / venir de", ever: "déjà / jamais", something: "quelque chose", someone: "quelqu'un", nothing: "rien", everything: "tout", everyone: "tout le monde", anything: "quelque chose / rien", each: "chaque", every: "chaque", other: "autre", another: "un autre", own: "propre", such: "tel", which: "lequel / qui", whose: "dont / à qui", than: "que (comparaison)", then: "puis / alors", there: "là / il y a", these: "ces", those: "ces (là-bas)", into: "dans (mouvement)", through: "à travers", over: "au-dessus / fini", under: "sous", between: "entre", against: "contre", towards: "vers", already: "déjà", yet: "encore / déjà", soon: "bientôt", once: "une fois", twice: "deux fois", both: "les deux", few: "peu de", less: "moins", more: "plus", most: "la plupart / le plus", much: "beaucoup", many: "beaucoup de", some: "du / quelques", any: "du / aucun", next: "prochain", last: "dernier", first: "premier", only: "seulement", even: "même", ago: "il y a" }).filter(([k]) => !DICT[k])));
const IRREG = { went: "go", gone: "go", ate: "eat", eaten: "eat", got: "get", forgot: "forget", forgotten: "forget", lost: "lose", found: "find", bought: "buy", told: "tell", said: "say", came: "come", took: "take", taken: "take", left: "leave", made: "make", had: "have", has: "have", was: "be", were: "be", been: "be", is: "be", are: "be", am: "be", broke: "break", broken: "break", saw: "see", seen: "see", thought: "think", gave: "give", given: "give", felt: "feel", slept: "sleep", spoke: "speak", spent: "spend", met: "meet", knew: "know", known: "know", wrote: "write", written: "write", ran: "run", drove: "drive", sat: "sit", stood: "stand", woke: "wake", paid: "pay", sent: "send", kept: "keep", brought: "bring", heard: "hear", read: "read", built: "build", fell: "fall", won: "win", began: "begin", chose: "choose", stole: "steal", children: "child", men: "man", women: "woman", feet: "foot", teeth: "tooth", better: "good", best: "good", worse: "bad", worst: "bad" };
function lookup(word) {
  const w = word.toLowerCase().replace(/[^a-z'-]/g, "").replace(/'s$/, "");
  if (!w) return null;
  if (IRREG[w] && DICTV[IRREG[w]]) return { base: IRREG[w], fr: DICTV[IRREG[w]] };
  for (const c of [w.replace(/ied$/, "y"), w.replace(/ed$/, ""), w.replace(/d$/, ""), w.replace(/([a-z])\1ed$/, "$1"), w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/([a-z])\1ing$/, "$1")]) if (c !== w && DICTV[c]) return { base: c, fr: DICTV[c] };
  const cands = [w, IRREG[w], w.replace(/ier$/, "y"), w.replace(/iest$/, "y"), w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""), w.replace(/ied$/, "y"), w.replace(/ed$/, ""), w.replace(/d$/, ""), w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/([a-z])\1ing$/, "$1"), w.replace(/([a-z])\1ed$/, "$1"), w.replace(/er$/, ""), w.replace(/est$/, ""), w.replace(/ly$/, "")];
  for (const c of cands) if (c && DICT[c]) return { base: c, fr: DICT[c] };
  return null;
}
function linkify(text) {
  return text.split(/(\s+)/).map(tok => { const m = lookup(tok); return m ? `<button class="wd" data-b="${esc(m.base)}" data-f="${esc(m.fr)}">${esc(tok)}</button>` : esc(tok); }).join("");
}
function bindWords() {
  $$(".wd").forEach(b => b.onclick = e => { e.stopPropagation(); const o = $("#wdout"); if (o) { o.hidden = false; o.textContent = `${b.dataset.b} = ${b.dataset.f}`; } say(b.dataset.b); });
}

/* ================= ÉCRANS ================= */
let view = "home";
function render() { if (sess) return renderItem(); home(); }
function home() {
  const days = S.days.length;
  $("#app").innerHTML = `
  <header class="top"><div class="brand">Step Up <span>English</span></div>${days ? `<span class="note num">${days} jour${days > 1 ? "s" : ""} pratiqué${days > 1 ? "s" : ""}</span>` : ""}</header>
  <main>
    <section class="card">
      <div class="label">Ton niveau estimé par compétence</div>
      <div class="skills">${Object.entries(SKILLS).map(([k, n]) => `<div class="sk"><span class="nm">${n}</span><div class="bar"><i style="width:${Math.round(S.sk[k] / 10 * 100)}%"></i></div><span class="lv">${CEFR(S.sk[k])}</span></div>`).join("")}</div>
      <p class="note" style="margin:0">Estimation calculée sur tes réponses, pas un niveau officiel. Chaque barre monte quand tu réussis et descend quand tu te trompes.</p>
    </section>
    <section class="card">
      <h2 style="font-size:22px">Séance</h2>
      <div><div class="label" style="margin-bottom:8px">Durée</div><div class="chips">${[5, 10, 15, 20].map(d => `<button class="chip" data-dur="${d}" aria-pressed="${S.dur === d}">${d} min</button>`).join("")}</div></div>
      <div>
        <button class="toggle" role="switch" id="tSpeak" aria-checked="${S.canSpeak}"><span><b>Je peux parler à voix haute</b><br><span class="note">Désactive dans le métro : plus d'exercices de micro.</span></span><span class="sw"></span></button>
        <button class="toggle" role="switch" id="tSound" aria-checked="${S.sound}"><span><b>J'ai le son</b><br><span class="note">Haut-parleur ou écouteurs.</span></span><span class="sw"></span></button>
      </div>
      ${S.canSpeak && !SR ? `<div class="banner">Ce navigateur ne reconnaît pas la voix. Ouvre l'appli dans Chrome pour les exercices de micro.</div>` : ""}

      <button class="btn" id="go">Commencer</button>
      <button class="btn ghost" id="place">${S.placed ? "Refaire le test de niveau" : "Faire le test de niveau (7 min)"}</button>
      ${S.placed ? "" : `<p class="note" style="margin:0">Conseillé avant ta première séance : il règle ton point de départ dans les 4 compétences.</p>`}
    </section>
    <section class="card">
      <details><summary>Comment l'appli s'adapte</summary>
        <p>4 compétences évoluent séparément. Si tu enchaînes 5 bonnes réponses, la compétence monte nettement. Ce qui augmente avec ton niveau : la vitesse de la voix, la longueur des phrases, le nombre de mots pièges, et les exercices eux-mêmes (choix multiple, puis dictée, puis traduction orale chronométrée).</p>
        <p>Le contenu va de A1 à B2 : plus de 1 100 mots du quotidien, classés selon le niveau CECR que leur donne l'Oxford 3000/5000, et environ 190 phrases rangées selon la grammaire de chaque niveau. Le niveau affiché reste une estimation : pour un niveau officiel, passe un test comme l'EF SET.</p>
        <p>Chaque mot et chaque phrase reviennent selon ta mémoire : 1, 2, 4, 7, 15 puis 30 jours si tu réussis, plus vite si tu te trompes. La séance travaille plus la compétence la plus faible.</p>
      </details>
      <details><summary>Sauvegarde</summary>
        <p class="note">Ta progression est enregistrée sur ce téléphone. Fais une sauvegarde de temps en temps pour ne rien perdre si tu changes de téléphone.</p>
        <div class="row"><button class="btn ghost" id="exp">Exporter</button><label class="btn ghost" style="text-align:center">Importer<input type="file" id="imp" accept="application/json" hidden></label></div>
        <p class="note" id="impmsg"></p>
      </details>
    </section>
  </main>`;
  $$("[data-dur]").forEach(b => b.onclick = () => { S.dur = +b.dataset.dur; save(); home(); });
  $("#tSpeak").onclick = () => { S.canSpeak = !S.canSpeak; save(); home(); };
  $("#tSound").onclick = () => { S.sound = !S.sound; save(); home(); };
  $("#go").onclick = () => start(false);
  $("#place").onclick = () => start(true);
  $("#exp").onclick = () => { const b = new Blob([JSON.stringify(S)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `stepup-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(a); a.click(); a.remove(); };
  $("#imp").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (d.v !== 2) throw 0; S = { ...fresh(), ...d }; save(); home(); } catch (err) { $("#impmsg").textContent = "Fichier non reconnu : choisis un fichier exporté depuis Step Up English."; } }; r.readAsText(f); };
}

/* ================= SÉANCE ================= */
function start(placement) {
  placement = placement === true;
  if (hasTTS) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(""); speechSynthesis.speak(u); } catch (e) {} }
  const prevSk = { ...S.sk };
  if (placement) S.sk = { listen: 4, speak: 4, vocab: 4, write: 4 };
  const mins = placement ? 7 : S.dur;
  sess = { placement, maxItems: placement ? 32 : Infinity, t0: Date.now(), end: Date.now() + mins * 60000, dur: mins, queue: [], lastSk: [], newCount: 0, newMax: placement ? 0 : Math.round(S.dur * 0.6), stats: {}, before: { ...S.sk }, prevSk, n: 0, cur: null };
  recent = [];
  nextOrFinish();
}
function nextOrFinish() {
  if (Date.now() >= sess.end || sess.n >= sess.maxItems) return finish();
  sess.cur = nextItem(); sess.n++;
  const id = sess.cur.w?.id || sess.cur.s?.id || sess.cur.d?.id || sess.cur.q?.id; if (id) { recent.push(id); if (recent.length > 8) recent.shift(); }
  window.scrollTo(0, 0); renderItem();
}
let clockT = null;
function renderItem() {
  const it = sess.cur;
  $("#app").innerHTML = `<div class="stop"><button class="x" id="quit" aria-label="Arrêter la séance">×</button><div class="bar"><i id="tbar"></i></div><span class="clock" id="clock"></span></div>
  <div class="stage" id="stage"></div><div class="foot" id="foot"><div class="in" id="fin"></div></div>`;
  $("#quit").onclick = () => finish(true);
  tick(); clearInterval(clockT); clockT = setInterval(tick, 1000);
  sess.state = "ask"; sess.help = false;
  EX[it.t](it);
}
function tick() {
  if (!sess || !$("#clock")) return;
  const left = Math.max(0, sess.end - Date.now()), tot = sess.dur * 60000;
  $("#clock").textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, "0")}`;
  $("#tbar").style.width = `${Math.round((1 - left / tot) * 100)}%`;
}
function head(kind, sk) { return `<div class="kind"><span class="skilltag">${SKILLS[sk]}</span>${kind}</div>`; }
function foot(html, cls) { const f = $("#foot"); f.className = "foot" + (cls ? " " + cls : ""); $("#fin").innerHTML = html; }
function audioBtns(text, big) {
  if (!soundOK()) return "";
  return big ? `<div class="audio" style="justify-content:center"><button class="spk big" data-say="n" aria-label="Réécouter">${ICON.spk}</button><button class="linkbtn" data-say="s">Lentement</button></div>`
    : `<div class="audio"><button class="spk" data-say="n">${ICON.spk} Écouter</button><button class="spk" data-say="s">${ICON.spk} Lentement</button></div>`;
}
function bindAudio(text) { $$("[data-say]").forEach(b => b.onclick = () => { if (b.dataset.say === "s") sess.help = true; say(text, { slow: b.dataset.say === "s" }); }); }
function stat(sk, ok) { const s = sess.stats[sk] || (sess.stats[sk] = { ok: 0, n: 0 }); s.n++; if (ok) s.ok++; }

// Résultat commun
function result(it, ok, shown, opts = {}) {
  if (sess.state !== "ask") return; sess.state = "done";
  gradeSkill(it.sk, ok, sess.help || opts.partial);
  stat(it.sk, ok);
  const id = it.w?.id || it.s?.id || it.d?.id; if (id) gradeItem(id, ok);
  if (!ok && !it.retry) sess.queue.push({ wait: 3, item: { ...it, retry: true } });
  save();
  const trTxt = translationFor(it);
  if (trTxt) opts.noAuto = true; // le temps de lire la traduction
  const title = ok ? (opts.partial ? "Presque" : opts.typo ? "Juste, petite faute de frappe" : "Juste") : "Faux";
  const cls = ok ? (opts.partial ? "mid" : "ok") : "ko";
  const showAns = !ok || opts.typo || opts.partial || opts.always;
  foot(`<div class="fb"><h3>${title}</h3>${showAns && shown ? `<p>${opts.prefix || "Réponse :"} <b>${it.s ? linkify(shown) : esc(shown)}</b></p>` : ""}${opts.extra || ""}${trTxt ? `<p class="tr">Traduction : ${esc(trTxt)}</p>` : ""}</div>
    ${it.s || it.d ? `<p class="note" style="margin:0">Touche un mot anglais pour voir sa traduction.</p><p class="wdout" id="wdout" hidden></p>` : ""}
    <button class="btn" id="cont">Continuer</button>`, cls);
  bindWords();
  $("#cont").onclick = nextOrFinish;
  if (ok && !opts.partial && !opts.typo && S.autoNext && !opts.noAuto) setTimeout(() => { if (sess && sess.state === "done" && $("#cont")) nextOrFinish(); }, 1100);
}

const FR_VISIBLE = ["w_type", "w_build", "s_trans", "v_mcq_fe", "v_mcq_ef", "v_type", "l_mcq", "l_word", "l_dialog"];
function translationFor(it) {
  if (FR_VISIBLE.includes(it.t)) return "";
  if (it.s) return it.s.fr;
  if (it.p) return it.p.map(x => `${x} = ${DATA.pairFr[x] || "?"}`).join(" · ");
  if (it.q) return it.q.fr;
  return "";
}
function distract(w, k, field) {
  const pool = WORDS.filter(x => x.id !== w.id && Math.abs(x.l - w.l) <= 1);
  const out = [], seen = new Set([field(w)]);
  for (const x of shuffle(pool)) { const v = field(x); if (!seen.has(v)) { seen.add(v); out.push(v); } if (out.length >= k) break; }
  return out;
}
function mcq(it, prompt, kindTxt, ans, options, onAnswer, extraTop = "") {
  $("#stage").innerHTML = `${head(kindTxt, it.sk)}${extraTop}${prompt}<div class="opts">${options.map(o => `<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
  foot(`<p class="note" style="margin:0;text-align:center">Touche la bonne réponse</p>`);
  $$(".opt").forEach(b => b.onclick = () => {
    if (sess.state !== "ask") return;
    const ok = b.dataset.o === ans;
    $$(".opt").forEach(x => { x.disabled = true; if (x.dataset.o === ans) x.classList.add("ok"); });
    if (!ok) b.classList.add("ko");
    onAnswer(ok);
  });
}
function sentOptions(s, k) {
  const others = shuffle(SENTS.filter(x => x.id !== s.id && Math.abs(x.l - s.l) <= 1)).slice(0, k).map(x => x.fr);
  return shuffle([s.fr, ...others]);
}

/* ---------- les exercices ---------- */
const EX = {
  v_intro(it) {
    const w = it.w;
    $("#stage").innerHTML = `${head("Nouveau mot", it.sk)}<div class="card intro"><div class="en">${esc(w.en[0])}</div><div class="fr">${esc(w.fr)}</div>${audioBtns(w.en[0])}</div>
      <p class="note">${S.canSpeak ? "Répète-le à voix haute deux fois." : "Répète-le dans ta tête."} Il revient dans un instant.</p>`;
    bindAudio(w.en[0]); say(w.en[0]);
    if (!rec(w.id)) { S.items[w.id] = { b: 0, d: dayNum() }; save(); }
    foot(`<button class="btn" id="cont">Continuer</button>`); $("#cont").onclick = nextOrFinish;
  },
  v_mcq_ef(it) {
    const w = it.w;
    mcq(it, `<div class="audio"><div class="prompt" style="flex:1">${esc(w.en[0])}</div>${soundOK() ? `<button class="spk" data-say="n" aria-label="Écouter">${ICON.spk}</button>` : ""}</div>`, "Que veut dire ce mot ?", w.fr, shuffle([w.fr, ...distract(w, 3, x => x.fr)]), ok => result(it, ok, w.fr));
    bindAudio(w.en[0]); say(w.en[0]);
  },
  v_mcq_fe(it) {
    const w = it.w;
    mcq(it, `<div class="prompt">${esc(w.fr)}</div>`, "Comment dit-on en anglais ?", w.en[0], shuffle([w.en[0], ...distract(w, 3, x => x.en[0])]), ok => { say(w.en[0]); result(it, ok, w.en[0]); });
  },
  v_type(it) { const w = it.w; typing(it, `<div class="prompt">${esc(w.fr)}</div>`, "Écris le mot en anglais", w.en, w.en[0]); },
  w_type(it) { const s = it.s; typing(it, `<div class="prompt sm">${esc(s.fr)}</div>`, "Traduis la phrase", s.en, s.en[0]); },
  w_build(it) { build(it, `<div class="prompt sm">${esc(it.s.fr)}</div>`, "Remets les mots dans l'ordre", S.sk.write); },
  l_word(it) {
    const w = it.w;
    mcq(it, audioBtns(w.en[0], true), "Écoute : que veut dire ce mot ?", w.fr, shuffle([w.fr, ...distract(w, 3, x => x.fr)]), ok => result(it, ok, `${w.en[0]} = ${w.fr}`, { always: !ok }));
    bindAudio(w.en[0]); setTimeout(() => say(w.en[0]), 250);
  },
  l_mcq(it) {
    const s = it.s, k = S.sk.listen < 3 ? 2 : 3;
    mcq(it, audioBtns(s.en[0], true), "Écoute : que dit la phrase ?", s.fr, sentOptions(s, k), ok => result(it, ok, `${s.en[0]}`, { prefix: "Phrase entendue :", always: true, noAuto: true }));
    bindAudio(s.en[0]); setTimeout(() => say(s.en[0]), 250);
  },
  l_pair(it) {
    const p = it.p, target = pick(p);
    mcq(it, audioBtns(target, true), "Écoute bien : quel mot entends-tu ?", target, shuffle([...p]), ok => result(it, ok, target));
    bindAudio(target); setTimeout(() => say(target), 250);
  },
  l_dbuild(it) { build(it, audioBtns(it.s.en[0], true), "Dictée : construis la phrase que tu entends", S.sk.listen, true); bindAudio(it.s.en[0]); setTimeout(() => say(it.s.en[0]), 250); },
  l_dtype(it) { typing(it, audioBtns(it.s.en[0], true), "Dictée : écris la phrase que tu entends", it.s.en, it.s.en[0], true); bindAudio(it.s.en[0]); setTimeout(() => say(it.s.en[0]), 250); },
  l_dialog(it) {
    const d = it.d, ans = d.o[0];
    const play = slow => { if (slow) sess.help = true; sayDialog(d.lines, slow); };
    mcq(it, `<div class="audio" style="justify-content:center"><button class="spk big" id="dplay" aria-label="Réécouter le dialogue">${ICON.spk}</button><button class="linkbtn" id="dslow">Lentement</button></div><p class="prompt sm" style="margin:0">${esc(d.q)}</p>`,
      "Écoute le dialogue", ans, shuffle(d.o), ok => {
        const extra = `<div class="dlg" style="margin-top:8px">${d.lines.map((l, k) => `<div>${linkify(l)}${d.tr ? `<br><span class="note">${esc(d.tr[k])}</span>` : ""}</div>`).join("")}</div>`;
        result(it, ok, ok ? "" : ans, { extra, noAuto: true });
      });
    $("#dplay").onclick = () => play(false); $("#dslow").onclick = () => play(true);
    setTimeout(() => play(false), 300);
  },
  s_repeat(it) { speakEx(it, `<div class="prompt sm">${esc(it.s.en[0])}</div><div class="note">${esc(it.s.fr)}</div>${audioBtns(it.s.en[0])}`, "Écoute, puis répète la phrase", it.s.en, true); bindAudio(it.s.en[0]); say(it.s.en[0]); },
  s_echo(it) { speakEx(it, `${audioBtns(it.s.en[0], true)}<p class="note" style="text-align:center;margin:0">Le texte s'affiche après ta réponse.</p>`, "Écoute et répète, sans lire", it.s.en, true); bindAudio(it.s.en[0]); setTimeout(() => say(it.s.en[0]), 250); },
  s_trans(it) {
    const words = it.s.en[0].split(" ").length, secs = Math.round(clamp(16 - S.sk.speak, 5, 14) + words * 0.5);
    speakEx(it, `<div class="prompt sm">${esc(it.s.fr)}</div><div class="timer"><i id="tm"></i></div><p class="note" style="margin:0">Dis-le en anglais en moins de ${secs} secondes.</p>`, "Dis-le en anglais", it.s.en, false, secs);
  },
  s_answer(it) { answerEx(it); }
};

function typing(it, promptHtml, kind, answers, shown, isListen) {
  $("#stage").innerHTML = `${head(kind, it.sk)}${promptHtml}<input class="type" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Écris en anglais">`;
  const inp = $("#inp"); setTimeout(() => inp.focus(), 60);
  foot(`<div class="row"><button class="btn ghost" id="skip" style="flex:0 0 auto;width:auto;padding-inline:16px">Je ne sais pas</button><button class="btn" id="chk" disabled>Vérifier</button></div>`);
  const chk = $("#chk"); inp.oninput = () => chk.disabled = !inp.value.trim();
  const go = () => { if (sess.state !== "ask") return; const r = checkText(inp.value, answers); inp.disabled = true; say(shown); result(it, r.ok, shown, { typo: r.typo, always: isListen }); };
  chk.onclick = go; inp.onkeydown = e => { if (e.key === "Enter" && inp.value.trim()) go(); };
  $("#skip").onclick = () => { if (sess.state !== "ask") return; inp.disabled = true; say(shown); result(it, false, shown); };
}
function build(it, promptHtml, kind, level, isListen) {
  const s = it.s, target = s.en[0].replace(/[.!?]$/, ""), toks = target.split(" ");
  const nd = level < 3 ? 1 : level < 5 ? 2 : level < 7 ? 3 : 4;
  const lower = toks.map(t => t.toLowerCase().replace(/[,]/g, ""));
  const others = [...new Set(SENTS.filter(x => x.id !== s.id).flatMap(x => x.en[0].replace(/[.!?,]/g, "").split(" ")))].filter(t => !lower.includes(t.toLowerCase()));
  const bank = shuffle([...toks, ...shuffle(others).slice(0, nd)]).map((t, i) => ({ t, i, used: false }));
  const line = [];
  $("#stage").innerHTML = `${head(kind, it.sk)}${promptHtml}<div class="answer-line" id="line" aria-label="Ta phrase"></div><div class="bank" id="bank"></div>`;
  foot(`<button class="btn" id="chk" disabled>Vérifier</button>`);
  const draw = () => {
    $("#line").innerHTML = line.map((b, k) => `<button class="tok" data-k="${k}">${esc(b.t)}</button>`).join("");
    $("#bank").innerHTML = bank.map(b => `<button class="tok ${b.used ? "used" : ""}" data-i="${b.i}" ${b.used ? 'tabindex="-1" aria-hidden="true"' : ""}>${esc(b.t)}</button>`).join("");
    $("#chk").disabled = !line.length;
    $$("#bank .tok").forEach(e => e.onclick = () => { if (sess.state !== "ask") return; const b = bank.find(x => x.i == e.dataset.i); if (b.used) return; b.used = true; line.push(b); draw(); });
    $$("#line .tok").forEach(e => e.onclick = () => { if (sess.state !== "ask") return; const b = line.splice(+e.dataset.k, 1)[0]; b.used = false; draw(); });
  };
  draw();
  $("#chk").onclick = () => { if (sess.state !== "ask") return; const txt = line.map(b => b.t).join(" "); const r = checkText(txt, s.en); say(s.en[0]); result(it, r.ok && !r.typo, s.en[0], { always: isListen }); };
}

function micUI() {
  return `<button class="mic" id="mic" aria-label="Appuie et parle">${ICON.mic}</button><div class="heard" id="heard"><span class="note">Appuie sur le micro, puis parle</span></div>`;
}
function micError(err) {
  if (err === "not-allowed" || err === "service-not-allowed") return "Le micro est bloqué. Autorise-le : icône cadenas à côté de l'adresse > Autorisations > Micro.";
  if (err === "network") return "La reconnaissance vocale a besoin d'internet. Vérifie ta connexion, ou désactive « Je peux parler ».";
  if (err === "no-speech") return "Je n'ai rien entendu. Rapproche le téléphone et réessaie.";
  return "Le micro n'a pas fonctionné. Réessaie.";
}
function speakEx(it, promptHtml, kind, answers, hideAnswerUntil, secs) {
  let tries = 0; const t0 = Date.now();
  $("#stage").innerHTML = `${head(kind, it.sk)}${promptHtml}${micUI()}`;
  foot(`<button class="btn ghost" id="skip">Je ne sais pas</button>`);
  $("#skip").onclick = () => { recognize.stop && recognize.stop(); say(answers[0]); result(it, false, answers[0]); };
  let tmT = null;
  if (secs) { const tm = $("#tm"); tm.style.transition = `width ${secs}s linear`; requestAnimationFrame(() => requestAnimationFrame(() => tm.style.width = "0%")); }
  const mic = $("#mic");
  mic.onclick = async () => {
    if (sess.state !== "ask" || mic.classList.contains("on")) return;
    hasTTS && speechSynthesis.cancel();
    mic.classList.add("on"); $("#heard").innerHTML = `<span class="note">J'écoute…</span>`;
    const r = await recognize(txt => { $("#heard").textContent = txt; });
    mic.classList.remove("on");
    if (sess.state !== "ask") return;
    if (r.error && !r.alts.length) { $("#heard").innerHTML = `<span class="note">${esc(micError(r.error))}</span>`; return; }
    let best = { score: -1 }, bestTxt = "", bestAns = answers[0];
    for (const a of r.alts) for (const ans of answers) { const sc = speechScore(a, ans); if (sc.score > best.score) { best = sc; bestTxt = a; bestAns = ans; } }
    tries++;
    const late = secs && (Date.now() - t0) / 1000 > secs + 2;
    const diff = `<div class="diff" style="margin-top:6px">${best.words.map((w, k) => `<span class="${best.hit[k] ? "hit" : "miss"}">${esc(w)}</span>`).join(" ")}</div>`;
    const heardLine = `<p class="note" style="margin:4px 0 0">Entendu : « ${esc(bestTxt)} »</p>`;
    if (best.score >= 0.85) { if (late) sess.help = true; say(bestAns); result(it, true, bestAns, { extra: heardLine + (late ? `<p class="note" style="margin:4px 0 0">Juste, mais un peu lent : essaie d'aller plus vite.</p>` : ""), always: hideAnswerUntil, noAuto: hideAnswerUntil }); }
    else if (best.score >= 0.6 && tries >= 2) { say(bestAns); result(it, true, bestAns, { partial: true, extra: diff + heardLine, prefix: "Phrase attendue :" }); }
    else if (tries < 2) {
      $("#heard").innerHTML = `<span>${esc(bestTxt)}</span><p class="note" style="margin:4px 0 0">${best.score >= 0.6 ? "Presque. Mots en rouge à revoir, réessaie." : "Pas encore. Réessaie une fois."}</p>${best.score >= 0.6 && !hideAnswerUntil ? diff : ""}`;
    } else { say(bestAns); result(it, false, bestAns, { extra: diff + heardLine, prefix: "Phrase attendue :" }); }
  };
}
function answerEx(it) {
  const q = it.q;
  $("#stage").innerHTML = `${head("Réponds à voix haute, avec une phrase complète", it.sk)}<div class="prompt sm">${esc(q.q)}</div>
    ${soundOK() ? `<div class="audio"><button class="spk" data-say="n">${ICON.spk} Écouter</button><button class="linkbtn" id="tr">Voir la traduction</button></div>` : `<button class="linkbtn" id="tr" style="justify-self:start">Voir la traduction</button>`}
    <p class="note" id="trtxt" hidden>${esc(q.fr)}</p>${micUI()}`;
  bindAudio(q.q); say(q.q);
  $("#tr").onclick = () => { $("#trtxt").hidden = false; sess.help = true; };
  foot(`<button class="btn ghost" id="skip">Je ne sais pas</button>`);
  const showSelf = heard => {
    foot(`<div class="fb"><h3>Compare avec un exemple</h3><p class="note" style="margin:2px 0">Toi : « ${esc(heard)} »</p><p>Exemple : <b>${esc(q.ex)}</b></p><p class="tr">Question : ${esc(q.fr)}</p></div>
      <div class="row"><button class="btn ghost" id="no">Pas vraiment</button><button class="btn" id="yes">J'ai bien répondu</button></div>`, "mid");
    $("#yes").onclick = () => { sess.state = "ask"; result(it, true, "", { noAuto: false }); };
    $("#no").onclick = () => { sess.state = "ask"; result(it, false, q.ex, { prefix: "Exemple :" }); };
  };
  $("#skip").onclick = () => { sess.state = "ask"; say(q.ex); result(it, false, q.ex, { prefix: "Exemple :" }); };
  const mic = $("#mic");
  mic.onclick = async () => {
    if (sess.state !== "ask" || mic.classList.contains("on")) return;
    hasTTS && speechSynthesis.cancel();
    mic.classList.add("on"); $("#heard").innerHTML = `<span class="note">J'écoute…</span>`;
    const r = await recognize(txt => { $("#heard").textContent = txt; });
    mic.classList.remove("on");
    if (r.error && !r.alts.length) { $("#heard").innerHTML = `<span class="note">${esc(micError(r.error))}</span>`; return; }
    const txt = r.alts[0] || "", n = norm(txt).split(" ").filter(Boolean).length, need = q.l <= 2 ? 3 : 5;
    if (n < need) { $("#heard").innerHTML = `<span>${esc(txt)}</span><p class="note" style="margin:4px 0 0">Trop court : fais une phrase complète d'au moins ${need} mots.</p>`; return; }
    sess.state = "self"; say(q.ex); showSelf(txt);
  };
}

/* ================= FIN DE SÉANCE ================= */
function finish(early) {
  clearInterval(clockT); hasTTS && speechSynthesis.cancel(); recognize.stop && recognize.stop();
  if (!sess) return home();
  const mins = Math.round((Date.now() - sess.t0) / 60000);
  const wasPlacement = sess.placement && !early; if (wasPlacement) S.placed = true;
  if (sess.placement && early) S.sk = sess.prevSk; // test interrompu : on garde l'ancien niveau
  const t = dayNum(); if (sess.n > 1 && !S.days.includes(t)) S.days.push(t);
  S.minutes += mins; save();
  const rows = Object.entries(SKILLS).map(([k, n]) => {
    const st = sess.stats[k]; const d = S.sk[k] - sess.before[k];
    const arrow = Math.abs(d) < 0.05 ? "" : d > 0 ? `<span class="up">monte</span>` : `<span class="down">baisse</span>`;
    return st ? `<span>${n}</span><span class="num">${st.ok}/${st.n}</span><span>${CEFR(S.sk[k])} ${arrow}</span>` : "";
  }).join("");
  const weak = Object.keys(SKILLS).filter(k => sess.stats[k]).sort((a, b) => (sess.stats[a].ok / sess.stats[a].n) - (sess.stats[b].ok / sess.stats[b].n))[0];
  sess = null;
  $("#app").innerHTML = `<header class="top"><div class="brand">Step Up <span>English</span></div></header><main>
    <section class="card"><h2 style="font-size:24px">${wasPlacement ? "Test de niveau terminé" : early ? "Séance arrêtée" : "Séance terminée"} · ${mins} min</h2>
    ${wasPlacement ? `<p style="margin:0">Ton point de départ est réglé. Les séances partiront de ces niveaux et s'ajusteront ensuite à chaque réponse.</p>` : ""}
    ${rows ? `<div class="res"><span class="label">Compétence</span><span class="label">Réussi</span><span class="label">Niveau</span>${rows}</div>` : `<p class="note">Aucun exercice fait.</p>`}
    ${weak ? `<p class="note" style="margin:0">À travailler : ${SKILLS[weak].toLowerCase()}. La prochaine séance en mettra davantage.</p>` : ""}</section>
    <button class="btn" id="home">Retour</button></main>`;
  $("#home").onclick = home;
}

/* ================= DÉMARRAGE ================= */
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
home();
