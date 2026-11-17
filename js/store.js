// Local-first progress storage (localStorage). Nothing leaves the device.
const KEY = 'antigravity.progress.v1';
const EMPTY = () => ({ v: 1, lang: null, active: null, weeklyGoal: 2, selectedGrade: 'prek', profiles: {} });

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign(EMPTY(), JSON.parse(raw));
  } catch (e) { /* ignore corrupt data */ }
  return EMPTY();
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

export const get = () => state;
export function setLang(l) { state.lang = l; save(); }
export function setWeeklyGoal(n) { state.weeklyGoal = n; save(); }
export function activeProfile() { return state.profiles[state.active] || null; }

export function curGrade() {
  const p = activeProfile();
  return state.selectedGrade || (p && p.grade) || 'prek';
}
export function setGrade(g) {
  state.selectedGrade = g;
  const p = activeProfile();
  if (p) p.grade = g;
  save();
}

export function addProfile(name, emoji, grade = 'prek') {
  const id = 'p' + Date.now().toString(36);
  state.profiles[id] = { id, name, emoji, grade, created: Date.now(), lessons: {}, runs: [] };
  state.selectedGrade = grade;
  state.active = id; save(); return id;
}
export function selectProfile(id) { if (state.profiles[id]) { state.active = id; save(); } }
export function deleteProfile(id) {
  delete state.profiles[id];
  if (state.active === id) state.active = Object.keys(state.profiles)[0] || null;
  save();
}

// per-lesson in-progress info: which sections were finished
export function lessonInfo(lessonId) {
  const p = activeProfile(); if (!p) return null;
  return p.lessons[lessonId] || (p.lessons[lessonId] = { sections: {} });
}
export function markSection(lessonId, type) { lessonInfo(lessonId).sections[type] = true; save(); }
export function clearSections(lessonId) { lessonInfo(lessonId).sections = {}; save(); }

export function addRun(run) {
  const p = activeProfile();
  p.runs.push(Object.assign({ id: 'r' + Date.now().toString(36), at: Date.now() }, run));
  clearSections(run.lessonId); save();
}
export function deleteRun(id) {
  const p = activeProfile(); p.runs = p.runs.filter(r => r.id !== id); save();
}

export function runsFor(lessonId) {
  const p = activeProfile(); return p ? p.runs.filter(r => r.lessonId === lessonId) : [];
}
export function isDone(lessonId) { return runsFor(lessonId).length > 0; }
export function isStarted(lessonId) {
  const p = activeProfile(); const i = p && p.lessons[lessonId];
  return !!(i && Object.keys(i.sections).length);
}

// ---- dates / weeks (Monday-based, local time) ----
export function weekStart(ts) {
  const d = new Date(ts); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getTime();
}
const WEEK = 7 * 864e5;

export function stats() {
  const p = activeProfile();
  const runs = p ? p.runs : [];
  const done = new Set(runs.map(r => r.lessonId));
  const minutes = runs.reduce((a, r) => a + (r.minutes || 0), 0);
  const perWeek = new Map();
  runs.forEach(r => { const k = weekStart(r.at); perWeek.set(k, (perWeek.get(k) || 0) + 1); });
  const cur = weekStart(Date.now());
  const thisWeek = perWeek.get(cur) || 0;
  // streak: consecutive weeks with >= 2 lessons; the running week may still be completed
  let streak = 0, k = cur;
  if ((perWeek.get(k) || 0) >= 2) streak++;
  k -= WEEK;
  while ((perWeek.get(k) || 0) >= 2) { streak++; k -= WEEK; }
  const puzzlesAlone = runs.filter(r => r.puzzle === 'alone').length;
  return { runs, done, minutes, perWeek, thisWeek, streak, puzzlesAlone, maxWeek: Math.max(0, ...perWeek.values()) };
}

// ---- backup ----
export function exportJSON() { return JSON.stringify(state, null, 2); }
export function importJSON(text) {
  const o = JSON.parse(text);
  if (!o || typeof o !== 'object' || !o.profiles) throw new Error('bad');
  state = Object.assign(EMPTY(), o); save();
}
export function resetAll() { state = EMPTY(); save(); }
