// Validates one lesson chunk file.  Usage: node tools/check_chunk.js data/lessons/g2_w10-12.json
// File name must be <prefix>_w<start>-<end>.json ; it must hold exactly 2 lessons per week.
import fs from 'node:fs';
import path from 'node:path';

const file = process.argv[2];
if (!file) { console.error('usage: node tools/check_chunk.js <chunk.json>'); process.exit(2); }
const m = /^(prek|k|g[1-4])_w(\d+)-(\d+)\.json$/.exec(path.basename(file));
if (!m) { console.error('bad file name, expected <prefix>_w<start>-<end>.json'); process.exit(2); }
const [, prefix, s, e] = m; const w0 = +s, w1 = +e;

const SUBJECTS = ['Counting', 'Arithmetic', 'Geometry', 'Time', 'Logic', 'Algebra', 'Probability', 'Computer Science', 'Math Analysis'];
const METHODS = ['USSR (Kiselev)', 'Chinese', 'Oxford'];
const errors = [];
let j;
try { j = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (err) { console.error('INVALID JSON: ' + err.message); process.exit(1); }
const lessons = j.lessons;
if (!Array.isArray(lessons)) { console.error('top-level must be {"lessons":[...]}'); process.exit(1); }

const cyr = /[\u0400-\u04FF]/, cjk = /[\u4E00-\u9FFF]/;
const loc = (o, where, min = 8) => {
  if (!o || typeof o !== 'object') return errors.push(where + ': not a localized object');
  if (Object.keys(o).sort().join() !== 'en,ru,zh') errors.push(where + ': keys must be exactly en,ru,zh');
  for (const k of ['en', 'ru', 'zh']) if (!o[k] || String(o[k]).trim().length < min) errors.push(where + '.' + k + ' missing/too short');
  if (o.ru && !cyr.test(o.ru)) errors.push(where + '.ru has no Cyrillic');
  if (o.zh && !cjk.test(o.zh)) errors.push(where + '.zh has no Chinese characters');
  for (const k of ['en', 'ru', 'zh']) if (/TODO|TBD|lorem|placeholder|\.\.\.\.|\[\.\.\.\]/i.test(o[k] || '')) errors.push(where + '.' + k + ' looks like a placeholder');
};
const steps = x => (x.match(/^\d+\)/gm) || []).length;

const expected = [];
for (let w = w0; w <= w1; w++) expected.push(`${prefix}_w${w}_l1`, `${prefix}_w${w}_l2`);
const got = lessons.map(l => l.lesson_id);
if (got.join() !== expected.join()) errors.push('lesson_ids must be exactly, in order: ' + expected.join(', ') + '\n   got: ' + got.join(', '));

for (const l of lessons) {
  const id = l.lesson_id;
  if (!SUBJECTS.includes(l.category)) errors.push(id + ': bad category ' + l.category);
  if (!METHODS.includes(l.methodology_focus)) errors.push(id + ': bad methodology_focus ' + l.methodology_focus);
  loc(l.title, id + '.title', 4); loc(l.objective, id + '.objective', 30);
  if (!l.sections || l.sections.map(x => x.type).join() !== 'theory,practice,logic_puzzle') { errors.push(id + ': sections must be theory,practice,logic_puzzle'); continue; }
  const [t, p, z] = l.sections;
  loc(t.parent_script, id + '.parent_script', 120);
  loc(p.activity, id + '.activity', 200);
  loc(z.prompt, id + '.prompt', 30); loc(z.solution, id + '.solution', 40);
  const sum = l.sections.reduce((a, x) => a + (x.duration || 0), 0);
  if (sum !== l.duration_minutes) errors.push(id + ': section durations sum ' + sum + ' != duration_minutes ' + l.duration_minutes);
  if (!(l.duration_minutes >= 30 && l.duration_minutes <= 45)) errors.push(id + ': duration_minutes must be 30..45');
  if (p.activity) {
    const n = ['en', 'ru', 'zh'].map(k => steps(p.activity[k] || ''));
    if (n[0] < 4) errors.push(id + ': practice needs >= 4 numbered steps written as "1) ..." on separate lines (en has ' + n[0] + ')');
    if (new Set(n).size !== 1) errors.push(id + ': practice step count differs en/ru/zh ' + n);
  }
  const tn = l.teacher_notes;
  if (!tn) errors.push(id + ': teacher_notes missing');
  else { loc(tn.explain, id + '.teacher_notes.explain', 40); loc(tn.trap, id + '.teacher_notes.trap', 25); loc(tn.socratic, id + '.teacher_notes.socratic', 15); }
}
const cats = [...new Set(lessons.map(l => l.category))];
console.log(`${path.basename(file)}: ${lessons.length} lessons | categories: ${cats.join(', ')}`);
if (errors.length) { console.error('\nERRORS (' + errors.length + '):\n' + errors.slice(0, 40).join('\n')); process.exit(1); }
console.log('OK');
