// Validates data/*.json against the Antigravity schema. Run: node tools/validate.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, '..', 'data');
const idx = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'), 'utf8'));
const errors = [];
const loc = (o, where) => {
  if (!o || typeof o !== 'object') return errors.push(where + ': not a localized object');
  const keys = Object.keys(o).sort().join();
  if (keys !== 'en,ru,zh') errors.push(where + ': keys=' + keys);
  for (const k of ['en', 'ru', 'zh']) if (!o[k] || !String(o[k]).trim()) errors.push(where + '.' + k + ' empty');
};
const SUBJECTS = ['Counting', 'Arithmetic', 'Geometry', 'Time', 'Logic', 'Algebra', 'Probability', 'Computer Science', 'Math Analysis'];
const METHODS = ['USSR (Kiselev)', 'Chinese', 'Oxford'];
const ids = new Set(); let lessons = 0; const cats = {};
for (const f of idx.files) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  for (const st of j.curriculum.stages) {
    loc(st.title, st.stage_id + '.title');
    for (const l of st.lessons) {
      lessons++; const w = l.lesson_id;
      if (ids.has(w)) errors.push('dup id ' + w); ids.add(w);
      if (!SUBJECTS.includes(l.category)) errors.push(w + ': bad category ' + l.category);
      if (!METHODS.includes(l.methodology_focus)) errors.push(w + ': bad method');
      cats[l.category] = (cats[l.category] || 0) + 1;
      loc(l.title, w + '.title'); loc(l.objective, w + '.objective');
      const types = l.sections.map(s => s.type).join();
      if (types !== 'theory,practice,logic_puzzle') errors.push(w + ': sections ' + types);
      const sum = l.sections.reduce((a, s) => a + s.duration, 0);
      if (sum !== l.duration_minutes) errors.push(w + ': durations sum ' + sum + ' != ' + l.duration_minutes);
      if (l.duration_minutes < 30 || l.duration_minutes > 45) errors.push(w + ': duration out of 30-45');
      for (const s of l.sections) {
        if (s.type === 'theory') loc(s.parent_script, w + '.parent_script');
        if (s.type === 'practice') loc(s.activity, w + '.activity');
        if (s.type === 'logic_puzzle') { loc(s.prompt, w + '.prompt'); loc(s.solution, w + '.solution'); }
      }
      // practice step count should match across languages
      const pr = l.sections[1].activity; const n = x => (x.match(/^\d+[)）]/gm) || []).length;
      if (n(pr.en) !== n(pr.ru) || n(pr.en) !== n(pr.zh)) errors.push(w + ': practice step count differs en/ru/zh ' + [n(pr.en), n(pr.ru), n(pr.zh)]);
    }
  }
}
console.log('lessons:', lessons, '| subjects covered:', JSON.stringify(cats));
console.log('missing subjects:', SUBJECTS.filter(s => !cats[s]).join(', ') || 'none');
if (errors.length) { console.error('\nERRORS:\n' + errors.join('\n')); process.exit(1); }
console.log('OK: schema valid');
