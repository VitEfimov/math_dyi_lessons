import { LANGS, CATS, METHODS, GRADES, t as tr } from './i18n.js';
import * as S from './store.js';

const $app = document.getElementById('app');
const $nav = document.getElementById('nav');
const D = { stages: [], lessons: [], byId: {}, weeks: {} };
const AVATARS = ['🦊', '🐼', '🐯', '🐸', '🦉', '🚀', '🐙', '🦄'];
const SECTIONS = ['theory', 'practice', 'logic_puzzle'];
const SEC_ICON = { theory: '📖', practice: '🧩', logic_puzzle: '💡', finish: '🏁' };
const RATE_ICON = { 1: '😕', 2: '😐', 3: '😊' };
const PUZ_ICON = { alone: '⭐', hint: '💡', not: '…' };

const lang = () => S.get().lang || 'en';
const t = (k, v) => tr(lang(), k, v);
const L = o => (o ? o[lang()] || o.en || '' : '');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtDate = ts => new Date(ts).toLocaleDateString(lang() === 'zh' ? 'zh-CN' : lang(), { day: 'numeric', month: 'short', year: 'numeric' });
const shortDate = ts => { const d = new Date(ts); return (d.getMonth() + 1) + '/' + d.getDate(); };
const catName = c => (CATS[c] ? CATS[c][lang()] : c);
const methName = m => (METHODS[m] ? METHODS[m][lang()] : m);
const weekTitle = (stage, w) => L(D.weeks[stage.stage_id] && D.weeks[stage.stage_id][w]);

if (!S.get().lang) {
  const n = (navigator.language || 'en').slice(0, 2);
  S.setLang(['ru', 'zh'].includes(n) ? n : 'en');
}

// ---------- data ----------
async function loadData() {
  const idx = await (await fetch('data/index.json')).json();
  D.weeks = idx.weeks || {};
  for (const f of idx.files) {
    const j = await (await fetch('data/' + f)).json();
    for (const st of j.curriculum.stages) {
      D.stages.push(st);
      st.lessons.forEach(l => {
        const m = /_w(\d+)_/.exec(l.lesson_id);
        l.week = m ? +m[1] : 1; l.stage = st;
        D.lessons.push(l); D.byId[l.lesson_id] = l;
      });
    }
  }
}

// ---------- small ui helpers ----------
function ring(p) {
  const r = 44, c = 2 * Math.PI * r;
  return `<svg viewBox="0 0 100 100" class="ring" role="img" aria-label="${Math.round(p * 100)}%"><circle cx="50" cy="50" r="${r}" class="ring-bg"/><circle cx="50" cy="50" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" transform="rotate(-90 50 50)"/><text x="50" y="57" text-anchor="middle" class="ring-t">${Math.round(p * 100)}%</text></svg>`;
}
const bar = p => `<div class="bar"><i style="width:${Math.round(p * 100)}%"></i></div>`;
const lessonStatus = id => (S.isDone(id) ? 'done' : S.isStarted(id) ? 'prog' : 'new');
const statusIcon = s => ({ done: '✅', prog: '🟡', new: '⚪' }[s]);
function toast(msg) {
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
}
function paragraphs(s) { return s.split('\n').filter(Boolean).map(p => `<p>${esc(p)}</p>`).join(''); }
function nextLesson() {
  return D.lessons.find(l => S.isStarted(l.lesson_id) && !S.isDone(l.lesson_id)) || D.lessons.find(l => !S.isDone(l.lesson_id));
}
function lessonCard(l, n) {
  const s = lessonStatus(l.lesson_id);
  return `<a class="card lesson-card" href="#/lesson/${l.lesson_id}">
    <div class="lc-num">${n}</div>
    <div class="lc-body"><div class="lc-title">${esc(L(l.title))}</div>
      <div class="chips"><span class="chip c-${esc(l.methodology_focus.split(' ')[0].toLowerCase())}">${esc(methName(l.methodology_focus))}</span><span class="chip">${esc(catName(l.category))}</span><span class="chip">${l.duration_minutes} ${t('min')}</span></div></div>
    <div class="lc-status" title="${t('st_' + s)}">${statusIcon(s)}</div></a>`;
}

// ---------- views ----------
function welcomeView() {
  return `<section class="card center"><h1>🚀 ${t('welcome')}</h1><p>${t('welcome_text')}</p>${profileForm()}${langPicker()}</section>`;
}
let curStageFilter = 'all';
let curCatFilter = 'all';
let curTermFilter = 'all';
let showGradeModal = false;

function gradePillarsHtml(gObj) {
  let out = '';
  if (gObj.tiers && gObj.tiers.length) {
    out += `<div class="tier-row">${gObj.tiers.map(tr => `<div class="tier-badge-card"><b>${esc(tr.badge)}</b><span>${esc(L(tr))}</span></div>`).join('')}</div>`;
  }
  if (gObj.pillars && gObj.pillars.length) {
    out += `<ul class="grade-pillars">${gObj.pillars.map(p => `<li>${esc(L(p))}</li>`).join('')}</ul>`;
  }
  return out;
}

function gradeBarHtml() {
  const curG = S.curGrade();
  return `<div class="grade-hub-nav">
    <div class="grade-hub-scroll">
      ${GRADES.map(g => `<button class="grade-pill ${curG === g.id ? 'on' : ''}" data-action="select-grade" data-v="${g.id}">
        <span class="gp-icon">${g.icon}</span>
        <span class="gp-text"><b>${esc(L(g.name))}</b><small>${g.ages}</small></span>
      </button>`).join('')}
    </div>
  </div>`;
}

function profileForm() {
  const curG = S.curGrade();
  return `<form data-form="add-child" class="form">
    <label>${t('name')}<input name="name" required maxlength="24" autocomplete="off" placeholder="e.g. Leo / Маша / 乐乐"></label>
    <label>${t('child_grade')}
      <select name="grade" class="field-select">
        ${GRADES.map(g => `<option value="${g.id}" ${curG === g.id ? 'selected' : ''}>${g.icon} ${esc(L(g.name))} (${g.ages} ${t('age')})</option>`).join('')}
      </select>
    </label>
    <div class="avatars">${AVATARS.map((a, i) => `<label class="av"><input type="radio" name="emoji" value="${a}" ${i === 0 ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div>
    <button class="btn primary" type="submit">${t('create')}</button></form>`;
}
function langPicker() {
  return `<div class="seg">${LANGS.map(([c, n]) => `<button class="${lang() === c ? 'on' : ''}" data-action="lang" data-v="${c}">${n}</button>`).join('')}</div>`;
}

function homeView() {
  const p = S.activeProfile(); if (!p) return welcomeView();
  const st = S.stats();
  const curG = S.curGrade();
  const gObj = GRADES.find(g => g.id === curG) || GRADES[0];
  
  const stageLessons = D.lessons.filter(l => l.stage && l.stage.stage_id === curG);
  const stageDoneCount = stageLessons.filter(l => st.done.has(l.lesson_id)).length;
  const stageTotal = stageLessons.length;
  
  const nl = stageLessons.find(l => S.isStarted(l.lesson_id) && !S.isDone(l.lesson_id)) || stageLessons.find(l => !S.isDone(l.lesson_id)) || stageLessons[0];
  const started = nl && S.isStarted(nl.lesson_id);
  const goal = S.get().weeklyGoal;
  const dots = Array.from({ length: goal }, (_, i) => `<span class="dot ${i < st.thisWeek ? 'on' : ''}"></span>`).join('');

  return `${gradeBarHtml()}
  <header class="hero">
    <div class="avatar">${p.emoji}</div>
    <div class="hero-info">
      <h1>${t('hello', { name: esc(p.name) })}</h1>
      <p class="muted">${t('app_tag')} · <b>${gObj.icon} ${esc(L(gObj.name))}</b></p>
    </div>
  </header>

  <!-- Active Grade Stage Cockpit Card -->
  <section class="card grade-hero-card">
    <div class="gh-top">
      <div class="gh-badge">${gObj.icon} <b>${esc(L(gObj.name))}</b> <span class="gh-age">${gObj.ages}</span></div>
      <button class="btn small ghost" data-action="toggle-grade-hub">🔄 ${t('switch_grade')}</button>
    </div>
    <p class="gh-desc">${esc(L(gObj.desc))}</p>
    ${gradePillarsHtml(gObj)}
    <div class="gh-pacing-tag">🗓️ ${t('school_year_roadmap')}</div>
    <div class="gh-progress">
      <div class="row"><small class="muted">${t('lessons_done')}</small><b>${stageDoneCount} / ${stageTotal}</b></div>
      ${bar(stageTotal ? stageDoneCount / stageTotal : 0)}
    </div>
    ${nl ? `
      <div class="next-action-row">
        <div class="next-action-info">
          <small class="muted">${t('next_lesson')}:</small>
          <div class="lc-title">${esc(L(nl.title))}</div>
          <div class="chips"><span class="chip c-${esc(nl.methodology_focus.split(' ')[0].toLowerCase())}">${esc(methName(nl.methodology_focus))}</span><span class="chip">${esc(catName(nl.category))}</span><span class="chip">${nl.duration_minutes} ${t('min')}</span></div>
        </div>
        <a class="btn primary" href="#/lesson/${nl.lesson_id}">${started ? t('continue') : t('start')} →</a>
      </div>` : `<p class="note">🎉 ${t('all_done')}</p>`}
  </section>

  <!-- Expandable All-Grades Directory Card -->
  ${showGradeModal ? `
  <section class="card grade-selector-panel">
    <div class="row"><h3>🎒 ${t('choose_grade')}</h3><button class="icon-btn" data-action="toggle-grade-hub">✕</button></div>
    <p class="muted small">${t('grade_overview')}</p>
    <div class="grade-grid">
      ${GRADES.map(g => {
        const ls = D.lessons.filter(l => l.stage && l.stage.stage_id === g.id);
        const dn = ls.filter(l => st.done.has(l.lesson_id)).length;
        return `<div class="card grade-card-pick ${curG === g.id ? 'active' : ''}" data-action="select-grade" data-v="${g.id}">
          <div class="gp-head"><span class="gp-ico">${g.icon}</span><b>${esc(L(g.name))}</b><span class="chip small">${g.ages}</span></div>
          <p class="small muted">${esc(L(g.desc))}</p>
          <div class="small">${dn}/${ls.length} ${t('lessons_done')}</div>
          ${bar(ls.length ? dn / ls.length : 0)}
        </div>`;
      }).join('')}
    </div>
  </section>` : ''}

  <div class="grid2">
    <section class="card center"><h3>${t('overall')}</h3>${ring(stageTotal ? stageDoneCount / stageTotal : 0)}<p class="muted">${t('lessons_n', { done: stageDoneCount, total: stageTotal })}</p></section>
    <section class="card center"><h3>${t('this_week')}</h3><div class="dots">${dots}</div><p><b>${t('sessions_of', { n: st.thisWeek, goal })}</b></p><p class="muted small">${t('goal_hint')}</p></section>
  </div>
  <div class="grid3">
    <div class="card stat"><b>${st.runs.length}</b><span>${t('lessons_done')}</span></div>
    <div class="card stat"><b>${st.minutes}</b><span>${t('minutes')}</span></div>
    <div class="card stat"><b>🔥 ${st.streak}</b><span>${t('week_streak')}</span></div>
  </div>`;
}

function lessonsView() {
  if (!S.activeProfile()) return welcomeView();
  const curG = S.curGrade();
  const gObj = GRADES.find(g => g.id === curG) || GRADES[0];
  const stageObj = D.stages.find(st => st.stage_id === curG) || D.stages[0];
  let n = 0, html = '';

  html += gradeBarHtml();

  // Academic Term selector (All, Term 1, Term 2, Term 3, Term 4)
  html += `<div class="term-selector">
    <button class="term-pill ${curTermFilter === 'all' ? 'on' : ''}" data-action="filter-term" data-v="all">${t('term_all')}</button>
    <button class="term-pill ${curTermFilter === '1' ? 'on' : ''}" data-action="filter-term" data-v="1">${t('term_1')}</button>
    <button class="term-pill ${curTermFilter === '2' ? 'on' : ''}" data-action="filter-term" data-v="2">${t('term_2')}</button>
    <button class="term-pill ${curTermFilter === '3' ? 'on' : ''}" data-action="filter-term" data-v="3">${t('term_3')}</button>
    <button class="term-pill ${curTermFilter === '4' ? 'on' : ''}" data-action="filter-term" data-v="4">${t('term_4')}</button>
  </div>`;

  // Categories filter (only show categories present in this grade)
  const stageCats = new Set((stageObj ? stageObj.lessons : []).map(l => l.category));
  if (curCatFilter !== 'all' && !stageCats.has(curCatFilter)) curCatFilter = 'all';
  const visibleCats = Object.keys(CATS).filter(c => stageCats.has(c));
  html += `<div class="filter-pills-row">
    <button class="pill small ${curCatFilter === 'all' ? 'on' : ''}" data-action="filter-cat" data-v="all">${t('all_categories')}</button>
    ${visibleCats.map(c => `<button class="pill small ${curCatFilter === c ? 'on' : ''}" data-action="filter-cat" data-v="${c}">${esc(catName(c))}</button>`).join('')}
  </div>`;

  // Stage Header
  html += `<div class="stage-banner">
    <div class="sb-title"><h2>${gObj.icon} ${esc(L(gObj.name))}</h2><span class="sb-ages">${gObj.ages}</span></div>
    <p class="muted small">${esc(L(gObj.desc))}</p>
    ${gradePillarsHtml(gObj)}
    <div class="sb-cadence">⚡ <b>${t('two_lessons_per_week')}</b> · 36 ${t('school_year')}</div>
  </div>`;

  // Filter weeks
  const allWeeksObj = D.weeks[curG] || {};
  let weekNums = Object.keys(allWeeksObj).map(Number).sort((a,b) => a-b);
  if (!weekNums.length) {
    weekNums = Array.from({ length: 36 }, (_, i) => i + 1);
  }

  if (curTermFilter === '1') weekNums = weekNums.filter(w => w >= 1 && w <= 9);
  else if (curTermFilter === '2') weekNums = weekNums.filter(w => w >= 10 && w <= 18);
  else if (curTermFilter === '3') weekNums = weekNums.filter(w => w >= 19 && w <= 27);
  else if (curTermFilter === '4') weekNums = weekNums.filter(w => w >= 28 && w <= 36);

  const stageLessons = (stageObj ? stageObj.lessons : []).filter(l => curCatFilter === 'all' || l.category === curCatFilter);

  for (const w of weekNums) {
    const termNum = w <= 9 ? 1 : w <= 18 ? 2 : w <= 27 ? 3 : 4;
    const termTag = t('term_tag_' + termNum);
    const wTitle = L(allWeeksObj[w]) || (t('week_n', { n: w }));
    const ls = stageLessons.filter(l => l.week === w);
    if (curCatFilter !== 'all' && !ls.length) continue;
    const done = ls.filter(l => S.isDone(l.lesson_id)).length;

    html += `<div class="week-section">
      <div class="week-head">
        <div class="wh-left">
          <span class="term-badge">${termTag}</span>
          <h3>${t('week_n', { n: w })}: <span class="wh-title">${esc(wTitle)}</span></h3>
        </div>
        ${ls.length ? `<span class="wh-done">${done}/${ls.length}</span>` : ''}
      </div>
      ${ls.length ? bar(done / ls.length) : ''}
      <div class="week-lessons">
        ${ls.map(l => lessonCard(l, ++n)).join('')}
        ${!ls.length ? `
          <div class="card syllabus-plan-card">
            <div class="row">
              <span class="muted small"><b>📘 ${t('lesson_a')}</b>: ${esc(wTitle)}</span>
              <span class="chip small">30–45 ${t('min')}</span>
            </div>
            <div class="row" style="margin-top:6px">
              <span class="muted small"><b>🧩 ${t('lesson_b')}</b>: Hands-on Practice & Olympiad Challenge</span>
              <span class="chip small">30–45 ${t('min')}</span>
            </div>
          </div>
        ` : ''}
      </div>
    </div>`;
  }

  return html;
}

// ----- lesson player -----
let LS = null; let ticker = null; let wake = null;
async function keepAwake() { try { if ('wakeLock' in navigator) wake = await navigator.wakeLock.request('screen'); } catch (e) { /* optional */ } }
function releaseAwake() { if (wake) { wake.release().catch(() => {}); wake = null; } }
function stopTicker() { clearInterval(ticker); ticker = null; if (LS) LS.running = false; }
const fmtTime = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');

function startLesson(id) {
  const l = D.byId[id]; if (!l) return;
  const info = S.lessonInfo(id);
  let step = SECTIONS.findIndex(s => !info.sections[s]); if (step < 0) step = S.isDone(id) ? 0 : 3;
  LS = { id, step, left: {}, running: false, elapsed: 0, revealed: false, checks: {}, rating: 2, puzzle: 'alone', showGuide: false };
  l.sections.forEach(s => (LS.left[s.type] = s.duration * 60));
  keepAwake();
}

function getTeacherGuide(l) {
  const guideMap = {
    prek_w1_l1: {
      explain: {
        en: 'Define a set by a single sensory rule: pure color. Keep boundaries physical and tactile with yarn.',
        ru: 'Задавайте множество по одному сенсорному признаку: чистому цвету. Границу делайте физической нитью.',
        zh: '用单一且不可置疑的感官特征(颜色)定义集合。用毛线在桌面上建立清晰的物理边界圈。'
      },
      trap: {
        en: 'Mixing multiple properties at once (size AND color) which overloads a 3-year-old child.',
        ru: 'Одновременное смешивание признаков (размер И цвет), что перегружает трёхлетнего малыша.',
        zh: '同时混合多个属性(颜色和大小),容易让3岁幼儿思维超载。'
      },
      socratic: {
        en: '"Look at this blue button. Does it have the red color pass to enter our red circle?"',
        ru: '«Посмотри на синюю пуговицу. Есть ли у неё красный пропуск в наш красный круг?»',
        zh: '“看这颗蓝纽扣,它有进入红圈圈的红色通行证吗?”'
      }
    },
    prek_w1_l2: {
      explain: {
        en: 'Do not count out loud! Pair objects one-to-one physically (cup to spoon, bunny to carrot).',
        ru: 'Не считайте вслух! Сопоставляйте предметы строго один к одному физически.',
        zh: '切勿过早大声数数!纯粹通过实物一一配对(小杯子对小勺子,小兔子对胡萝卜)。'
      },
      trap: {
        en: 'Assuming a spread out row has "more" than a clumped row (Piaget conservation trap).',
        ru: 'Иллюзия, что растянутый в длину ряд содержит больше предметов (ловушка Пиаже).',
        zh: '误以为排成长条的物体比聚成一团的物体“更多”(皮亚杰守恒认知错觉)。'
      },
      socratic: {
        en: '"Does stretching the line make new carrots appear out of thin air? Let us draw pair lines!"',
        ru: '«Разве от растягивания ряда появляются новые морковки из воздуха? Давай проверим парами!»',
        zh: '“把排队拉长一点,空气里会变出新胡萝卜吗?我们连线配对试一试!”'
      }
    },
    prek_w2_l1: {
      explain: {
        en: 'Transitivity of size: If A > B and B > C, then A > C. Demonstrate with nesting cups or bowls.',
        ru: 'Транзитивность размера: если А > Б и Б > В, то А > В. Показывайте на матрёшках или стаканчиках.',
        zh: '大小传递性公理: 若A大于B且B大于C,则A必然大于C。通过套杯套碗层层嵌套直观展示。'
      },
      trap: {
        en: 'Comparing only by height rather than 3D containment.',
        ru: 'Сравнение только по высоте, а не по способности вмещать предмет.',
        zh: '只看高度而不看三维容积大小。'
      },
      socratic: {
        en: '"If the little cup hides inside the medium cup, will it hide inside the giant daddy cup?"',
        ru: '«Если маленький стаканчик спрятался в средний, спрячется ли он в гигантский папин стакан?»',
        zh: '“如果小杯子能藏进中杯子里,那它能藏进巨大的爸爸杯子里吗?”'
      }
    },
    prek_w2_l2: {
      explain: {
        en: 'Patterns are algorithmic loops: ABAB rhythm. Chant aloud to engage audio and visual channels.',
        ru: 'Узоры — это алгоритмические циклы: ритм ABAB. Проговаривайте вслух под ритмичный напев.',
        zh: '规律即计算机循环: ABAB韵律。大声念出节奏,调动听觉与视觉多感官通道。'
      },
      trap: {
        en: 'Interrupting the pattern rhythm before the child hears the cyclic repetition.',
        ru: 'Прерывание ритма до того, как ребёнок уловил циклический повтор.',
        zh: '在孩子听出周期性旋律前过早打断。'
      },
      socratic: {
        en: '"Listen to our train: Red, Blue, Red, Blue... who is singing next?"',
        ru: '«Послушай поезд: Красный, Синий, Красный, Синий... кто запоёт следующим?»',
        zh: '“听听小火车唱歌: 红、蓝、红、蓝…接下来轮到谁唱歌了?”'
      }
    },
    prek_w3_l1: {
      explain: {
        en: 'A straight line is the shortest path between two points. Pull the yarn tight so child feels the tension.',
        ru: 'Прямая — кратчайший путь между двумя точками. Натяните нить туго, чтобы ребёнок ощутил натяжение.',
        zh: '两点间直线最近。双手拉紧毛线,让幼儿掌心切实感受张力。'
      },
      trap: {
        en: 'Thinking a curved wiggly path might be shorter because it looks longer or more fun.',
        ru: 'Заблуждение, что извилистый путь быстрее, потому что он интереснее.',
        zh: '以为弯弯曲曲好玩的小路可能会更快。'
      },
      socratic: {
        en: '"Pull the string tight! Can we make it even straighter? No, it is already the shortest path!"',
        ru: '«Тяни нитку туго! Можно сделать её ещё прямее? Нет, это уже кратчайший путь!»',
        zh: '“使劲拉紧!还能更直吗?不能了,这已经是两只手之间最近的路了!”'
      }
    },
    prek_w3_l2: {
      explain: {
        en: 'A closed loop separates the whole plane into inside, outside, and the boundary line (Jordan curve).',
        ru: 'Замкнутая петля делит плоскость на внутри, снаружи и границу (кривая Жордана).',
        zh: '封闭闭合线将空间绝对划分为圈内、圈外与边界线(若尔当曲线定理)。'
      },
      trap: {
        en: 'Leaving an unclosed gap in the loop so "inside" leaks out.',
        ru: 'Оставление щели в кольце, из-за чего понятие «внутри» теряет смысл.',
        zh: '绳圈留有缝隙未闭合,导致“圈内”漏到外面。'
      },
      socratic: {
        en: '"Can your finger walk to the desk edge without touching the rope? If the fence is closed, you cannot!"',
        ru: '«Может ли пальчик дойти до края стола, не задев верёвку? Если забор закрыт — никак!»',
        zh: '“手指不碰绳子能走到桌沿吗?围栏关紧的时候绝对出不去!”'
      }
    },
    prek_w4_l1: {
      explain: {
        en: 'Flash subitizing 1-3. Do not allow counting 1-by-1. Train instant visual pattern intake.',
        ru: 'Субитизация 1-3. Запрещайте пересчёт пальцем. Тренируйте мгновенный зрительный снимок.',
        zh: '1-3极速识数。禁止逐一掰手指,训练照相机式瞬间视觉摄入。'
      },
      trap: {
        en: 'Reverting to finger pointing out of habit.',
        ru: 'Возврат к пересчёту пальчиком по привычке.',
        zh: '孩子出于习惯下意识伸出手指点数。'
      },
      socratic: {
        en: '"Take a photo with your eyes: Click! How many dots did your camera see?"',
        ru: '«Сделай снимок глазками: Щёлк! Сколько точек увидела твоя камера?»',
        zh: '“眼睛咔嚓拍一张照片!你的小照相机拍到了几个点?”'
      }
    },
    prek_w4_l2: {
      explain: {
        en: 'Certain means guaranteed 100%. Impossible means 0%, cannot happen in the universe.',
        ru: 'Достоверно — это 100% гарантия. Невозможно — 0%, не может случиться никогда.',
        zh: '“必然”是100%一定会发生。“不可能”是0%,宇宙中绝无可能发生。'
      },
      trap: {
        en: 'Confusing "unlikely" with "impossible" (e.g. finding a shiny stone is rare, not impossible).',
        ru: 'Путаница между «редко» и «невозможно».',
        zh: '混淆“罕见”与“绝不可能”。'
      },
      socratic: {
        en: '"If there are ONLY apples in the bag, can an orange magically jump into your hand?"',
        ru: '«Если в мешке ТОЛЬКО яблоки, может ли в руке волшебно появиться апельсин?»',
        zh: '“如果袋子里只有苹果,手里能凭空变出一个橘子吗?”'
      }
    },
    k01_w1_l1: {
      explain: {
        en: 'Define a set by a single, crisp rule (e.g. "it is a spoon"). Immediately test non-examples (a fork, a ball). Emphasize that membership is definite: something is either an element or not.',
        ru: 'Определяйте множество через одно чёткое правило («это ложка»). Сразу проверьте контрпримеры (вилка, мяч). Принадлежность однозначна: предмет либо входит, либо нет.',
        zh: '用一条清晰的规则定义集合(如“它是勺子”)。立即测试反例(叉子、球)。强调确定性:事物要么是元素,要么不是。'
      },
      trap: {
        en: 'Children often group things by accidental proximity ("they lie next to each other") or color rather than the stated logical rule.',
        ru: 'Дети часто объединяют предметы по случайному признаку («лежат рядом») или цвету, а не по логическому правилу.',
        zh: '孩子容易按偶然位置(“放在一起”)或颜色分类,而非既定逻辑规则。'
      },
      socratic: {
        en: '"If I place a wooden block into our spoon circle, can we eat soup with it? Does it obey the spoon rule?"',
        ru: '«Если я положу кубик в круг с ложками, можно ли им есть суп? Подчиняется ли он правилу ложки?»',
        zh: '“如果我把积木放进勺子圈,能用它喝汤吗?它符合勺子的规则吗?”'
      }
    },
    k01_w1_l2: {
      explain: {
        en: 'Forbid counting at first! Compare quantities purely by one-to-one pairing. When every cup has a spoon, they are equal. Leftover items define "more".',
        ru: 'Сначала запретите счёт! Сравнивайте количества строго по парам один к одному. У каждой чашки есть ложка — поровну. Предмет без пары задаёт «больше».',
        zh: '一开始先不要数数!纯粹通过一一配对比较。每个杯子配一把勺子且无剩余就是一样多;多出来的就是“更多”。'
      },
      trap: {
        en: 'Piagetian Conservation Trap: A spread-out row of 5 objects appears "more" to young eyes than 7 tightly clustered objects.',
        ru: 'Ловушка Пиаже: растянутый ряд из 5 предметов кажется ребёнку больше, чем плотная кучка из 7 предметов.',
        zh: '皮亚杰守恒陷阱:拉长稀疏的5个物品看起来往往比紧密聚拢的7个物品“更多”。'
      },
      socratic: {
        en: '"Look at this row: it is long, but does stretching it create new buttons out of thin air? Let us draw pair lines to verify."',
        ru: '«Этот ряд длинный, но разве от растягивания появляются новые пуговицы из воздуха? Давай проверим парами».',
        zh: '“看这一排虽然长,但拉长会让空气里变出新纽扣吗?我们连线配对检验一下。”'
      }
    },
    k01_w1_l3: {
      explain: {
        en: 'NOT inverts membership. AND requires both conditions simultaneously. OR requires at least one condition (can be both).',
        ru: 'НЕ меняет правило на противоположное. И требует обоих условий одновременно. ИЛИ требует хотя бы одного (можно оба).',
        zh: '“不”表示否定。“并且”要求两者同时满足。“或者”要求至少满足其一(可以两者都满足)。'
      },
      trap: {
        en: 'Assuming "ball OR green" cannot include a green ball (excluding items that satisfy both conditions).',
        ru: 'Ошибочное предположение, что «мяч ИЛИ зелёный» не включает зелёный мяч.',
        zh: '误以为“是球或者是绿色的”不能包含绿色的球(排除了两者皆满足的情形)。'
      },
      socratic: {
        en: '"This ball is green AND a ball. Does it obey: is it a ball OR green? Yes, it passes with flying colors!"',
        ru: '«Этот мяч зелёный И мяч. Подходит ли под правило: мяч ИЛИ зелёный? Да, полностью подходит!»',
        zh: '“这个球既是绿色的并且也是球。它符合‘是球或者是绿色的’吗?完全符合!”'
      }
    },
    k01_w2_l1: {
      explain: {
        en: 'Train subitizing (instant visual recognition). Use dice dot configurations and five-finger anchors. Flash cards for max 1.5 seconds.',
        ru: 'Тренируйте субитизацию (мгновенное узнавание). Используйте грани кубика и 5 пальцев. Показывайте карточки максимум на 1.5 секунды.',
        zh: '训练一眼认数(无需逐个数)。利用骰子点阵与手掌5指基准。闪卡不超过1.5秒。'
      },
      trap: {
        en: 'Child slips into pointing and counting 1, 2, 3... Flash faster to force the brain to see the shape of the number.',
        ru: 'Ребёнок сбивается на счёт пальцем 1, 2, 3... Убирайте карточку быстрее, заставляя мозг видеть образ числа.',
        zh: '孩子忍不住用手逐个数。快速收起卡片,促使大脑直接识别整体数形。'
      },
      socratic: {
        en: '"Do you count your five fingers every morning, or do you know your hand is 5 in one glance?"',
        ru: '«Ты считаешь пять пальцев каждое утро по одному или сразу видишь, что ладонь — это пять?»',
        zh: '“你每天早上都要一根根数5根手指吗,还是一眼就看出整只手是5?”'
      }
    },
    k01_w2_l2: {
      explain: {
        en: 'Number Bonds (parts and whole). Splitting 5 never changes total count. 2 and 3 make 5; 5 take away 2 leaves 3. Addition and subtraction are inverse.',
        ru: 'Состав числа (части и целое). Разделение 5 не меняет итог. 2 и 3 — это 5; 5 без 2 — это 3. Сложение и вычитание обратны.',
        zh: '数的分合(部分与整体)。拆分5绝不改变总量。2和3合成5;5拿走2剩3。加减互逆。'
      },
      trap: {
        en: 'Treating addition and subtraction as separate isolated facts rather than two sides of one number bond.',
        ru: 'Восприятие сложения и вычитания как изолированных действий, а не сторон одного состава числа.',
        zh: '把加法和减法割裂记忆,没有理解它们是同一对分合关系。'
      },
      socratic: {
        en: '"If you know 2 + 3 = 5, what is 5 - 3? Do you need to count backward, or do the parts tell you?"',
        ru: '«Если 2 + 3 = 5, сколько будет 5 - 3? Нужно ли считать назад, или части уже подсказали?»',
        zh: '“如果你知道 2 + 3 = 5,那 5 - 3 是几?需要倒数吗,还是分合关系直接告诉你了?”'
      }
    },
    k01_w2_l3: {
      explain: {
        en: 'Numbers 6-10 anchored to 5 (Chinese Abacus & Ten-Frame). 7 is 5 + 2. 8 is 5 + 3. 9 is 10 - 1. Always fill the top row first.',
        ru: 'Числа 6-10 с опорой на 5 (счёты и рамка десяти). 7 = 5 + 2. 8 = 5 + 3. 9 = 10 - 1. Сначала заполняем верхний ряд.',
        zh: '6-10以5为基准(算盘与十格框)。7是5+2,8是5+3,9是10-1。务必先填满上排。'
      },
      trap: {
        en: 'Scattering counters randomly across the frame so the five-anchor visual structure is lost.',
        ru: 'Хаотичное разбрасывание фишек по рамке, из-за чего теряется структура пятёрки.',
        zh: '随意散放筹码,破坏了五的结构感。'
      },
      socratic: {
        en: '"If 2 rooms are empty in our ten-frame, how many rooms are occupied?"',
        ru: '«Если в рамке десяти 2 клетки пустые, сколько занято?»',
        zh: '“如果十格框里有2个空格,那住了几个人?”'
      }
    },
    k01_w3_l1: {
      explain: {
        en: 'A point has no size, only location. A straight line is the unique shortest path between two points (Kiselev axiom).',
        ru: 'Точка не имеет размеров, только место. Прямая — единственный кратчайший путь между двумя точками (аксиома Киселёва).',
        zh: '点无长宽仅表位置。直线是两点间唯一的最近路径(基谢廖夫公理)。'
      },
      trap: {
        en: 'Thinking a line must be horizontal or has fixed ends (confusing line and segment).',
        ru: 'Путаница между бесконечной прямой и отрезком с концами.',
        zh: '以为直线只能水平画,或混淆直线与线段。'
      },
      socratic: {
        en: '"Pull this string tight. Can you make it even straighter? No, because it is already the shortest path!"',
        ru: '«Натяни нитку туго. Можно ли сделать её ещё прямее? Нет, ведь это уже кратчайший путь!»',
        zh: '“拉紧绳子。还能更直吗?不能了,因为这已经是两点间最近的线了!”'
      }
    },
    k01_w3_l2: {
      explain: {
        en: 'A closed line divides space into inside and outside. Moving between them requires crossing the boundary (Jordan curve theorem).',
        ru: 'Замкнутая линия делит плоскость на внутри и снаружи. Переход обязательно пересекает границу.',
        zh: '封闭线把平面严格分成内与外。跨越必须穿过边界。'
      },
      trap: {
        en: 'Self-intersecting loops like figure-8s confuse inside/outside intuition.',
        ru: 'Петли с самопересечениями (восьмёрки) сбивают интуицию внутренней области.',
        zh: '带交叉的图形(如8字形)容易混淆内外区域。'
      },
      socratic: {
        en: '"Can you slide your finger from inside this loop to the desk edge without touching the string?"',
        ru: '«Можешь ли ты провести пальцем изнутри петли до края стола, не задев нитку?»',
        zh: '“你能把手指从圈内移到桌沿一次都不碰到绳子吗?”'
      }
    },
    k01_w3_l3: {
      explain: {
        en: 'Shapes are defined by properties (number of straight sides and corners), NOT orientation. A square turned 45 degrees is still a square!',
        ru: 'Фигуры определяются признаками (число сторон и углов), а не положением. Повёрнутый на 45° квадрат остаётся квадратом!',
        zh: '图形由边数和角决定,与摆放角度无关。旋转45度的正方形依然是正方形!'
      },
      trap: {
        en: 'Calling a tilted square a "diamond" rather than recognizing it as a rotated square.',
        ru: 'Называние наклонённого квадрата «ромбиком» без понимания, что это тот же квадрат.',
        zh: '把倾斜的正方形误当成另外一种图形“菱形”。'
      },
      socratic: {
        en: '"If you tilt your head, do you turn into a different person? Then why would a square change shape when tilted?"',
        ru: '«Если ты наклонишь голову, ты станешь другим человеком? Так почему квадрат должен измениться?»',
        zh: '“你歪一下头就变成另一个人了吗?那正方形歪过来摆为什么会变?”'
      }
    },
    k01_w4_l1: {
      explain: {
        en: 'Time is a directed, irreversible flow. Physical causality dictates that step A must precede step B (socks before shoes).',
        ru: 'Время направлено и необратимо. Причинность требует, чтобы шаг А предшествовал шагу Б (носки до обуви).',
        zh: '时间单向流动不可逆。因果关系决定顺序(先穿袜后穿鞋)。'
      },
      trap: {
        en: 'Confusing optional habits with strict physical necessity.',
        ru: 'Путаница бытовых привычек с физической неизбежностью порядка.',
        zh: '把个人习惯与物理上必然的先后因果混淆。'
      },
      socratic: {
        en: '"Can you eat an apple before taking a bite of it? Why does order matter in reality?"',
        ru: '«Можно ли съесть яблоко до того, как откусил его? Почему порядок так важен?»',
        zh: '“你能先吃完苹果再去咬它吗?为什么顺序在现实里不能颠倒?”'
      }
    },
    k01_w4_l2: {
      explain: {
        en: 'An algorithm is an exact sequence of simple commands. A robot does exactly what is written, with zero assumptions. A bug is our mistake.',
        ru: 'Алгоритм — точный список простых команд. Робот делает ровно то, что сказано. Баг — это наша неточность.',
        zh: '算法是精确的步骤清单。机器人只会严格执行指令,毫无常识。Bug是指令中的错误。'
      },
      trap: {
        en: 'Giving vague contextual instructions like "go to the chair" instead of counting exact forward paces and turns.',
        ru: 'Подача расплывчатых команд вроде «иди к стулу» вместо точных шагов и поворотов.',
        zh: '给出“去椅子那里”这种模糊指令,而不是分解成步数与转向。'
      },
      socratic: {
        en: '"If the robot bumps into the wall, is the robot broken, or did the programmer write an incorrect step?"',
        ru: '«Если робот врезался в стену, робот сломался или программист ошибся в шаге?»',
        zh: '“如果机器人撞墙了,是机器人坏了,还是程序员步骤写错了?”'
      }
    },
    k01_w4_l3: {
      explain: {
        en: 'Patterns have an invariant repeating unit (the kernel). Probability partitions events into: Certain, Possible, and Impossible.',
        ru: 'Узоры имеют повторяющееся ядро. Вероятность делит события на: Достоверные, Возможные и Невозможные.',
        zh: '规律必有循环核心单元。可能性严格分为三类:必然发生、可能发生、不可能发生。'
      },
      trap: {
        en: 'Believing an impossible event can occur "with luck", or confusing high chance with certainty.',
        ru: 'Вера в то, что невозможное случится «если повезёт», или путаница высокой вероятности с точностью.',
        zh: '以为不可能的事情“碰运气”就能发生,或将高概率等同于必然。'
      },
      socratic: {
        en: '"If a box has only red blocks, is pulling a red block POSSIBLE or CERTAIN?"',
        ru: '«Если в коробке только красные кубики, вынуть красный — это ВОЗМОЖНО или ТОЧНО?»',
        zh: '“如果盒子里只有红积木,摸出红积木是‘可能’还是‘一定’?”'
      }
    },
    g01_w1_l1: {
      explain: {
        en: 'An equation is a balanced scale. Whatever operation is done to one side must be performed on the other side to preserve equality.',
        ru: 'Уравнение — это чашечные весы в равновесии. Любое действие с одной стороной обязательно должно повторяться с другой.',
        zh: '方程就是平衡的天平。对等式一边所做的任何运算,必须在另一边完全同步进行以保持平衡。'
      },
      trap: {
        en: 'Child removes the constant from only one side, forgetting that the scale tilts.',
        ru: 'Ребёнок убирает число только с одной стороны, забывая, что весы перекосятся.',
        zh: '孩子只从一边拿走常数,忘记天平会倾斜。'
      },
      socratic: {
        en: '"If we take 3 coins off the left pan, what must we do to the right pan to keep them level?"',
        ru: '«Если мы снимем 3 монеты с левой чаши, что нужно сделать с правой, чтобы сохранить баланс?»',
        zh: '“如果我们从左边拿走3枚硬币,右边该怎么做才能保持平衡?”'
      }
    },
    g01_w1_l2: {
      explain: {
        en: 'The Chinese Make-a-Ten method: split the second addend into the partner to 10 plus remainder. Eliminate counting by ones.',
        ru: 'Китайский метод «собери десятку»: разложите второе слагаемое на дополнение до 10 и остаток. Исключите счёт единицами.',
        zh: '凑十法:把第二个加数拆成凑10的伙伴数加余数。彻底抛弃逐一数数。'
      },
      trap: {
        en: 'Child slips into finger counting 9, 10, 11, 12... Interrupt and anchor back to 10.',
        ru: 'Ребёнок переходит на пересчёт по пальцам: 9, 10, 11... Остановите и верните к опоре на 10.',
        zh: '孩子忍不住伸出手指一二三往上数。打断并重新引导至以10为中转桥梁。'
      },
      socratic: {
        en: '"How many does 8 need to become 10? Where can it borrow them from?"',
        ru: '«Сколько не хватает восьмёрке до 10? У кого она может их одолжить?»',
        zh: '“8还差几个变成10?它可以向谁借?”'
      }
    },
    g01_w1_l3: {
      explain: {
        en: 'A ray has a beginning point and extends infinitely in one direction. An angle is the opening between two rays from one vertex.',
        ru: 'Луч имеет начало и бесконечен в одну сторону. Угол — это раскрытие между двумя лучами из одной вершины.',
        zh: '射线有起点向一端无限延伸。角是从同一点出发的两条射线之间的张角。'
      },
      trap: {
        en: 'Confusing angle opening with the drawn length of the rays (thinking longer lines mean a bigger angle).',
        ru: 'Путаница между раскрытием угла и нарисованной длиной линий (мысль, что длинные линии делают угол больше).',
        zh: '误以为角的大小取决于射线画得多长,而不是两条射线的开合张角。'
      },
      socratic: {
        en: '"If we make the pencils longer, does the book corner open wider or stay the same square?"',
        ru: '«Если взять более длинные карандаши, угол книги станет шире или останется тем же прямым?»',
        zh: '“如果换更长的铅笔,这个书角的直角张口会变大还是保持不变?”'
      }
    },
    g02_w1_l1: {
      explain: {
        en: 'For 2x + b = c, peel away the loose constants first, then partition the remaining total into equal shares.',
        ru: 'В уравнении 2x + b = c сначала уберите свободные слагаемые, затем разделите остаток на равные доли.',
        zh: '在 2x + b = c 中,先剥离常数项,再将剩余总量等分成未知数的份数。'
      },
      trap: {
        en: 'Attempting to divide before subtracting the constant term.',
        ru: 'Попытка деления до вычитания свободного числа.',
        zh: '在减去常数项之前过早尝试除法。'
      },
      socratic: {
        en: '"Before we can open the two mystery bags, how do we get rid of the loose extra coin?"',
        ru: '«Прежде чем делить два мешочка, как нам убрать лишнюю отдельную монету?»',
        zh: '“在我们平分两个神秘袋子之前,怎样先把旁边多余的那枚硬币去掉?”'
      }
    },
    g02_w1_l2: {
      explain: {
        en: 'Multiplication is area of a rectangular grid. Commutative law is proven by 90-degree spatial rotation.',
        ru: 'Умножение — это площадь прямоугольной сетки. Переместительный закон доказывается поворотом на 90 градусов.',
        zh: '乘法即矩形网格面积。旋转90度证明乘法交换律。'
      },
      trap: {
        en: 'Rote memorization of multiplication facts without spatial array mental images.',
        ru: 'Зубрёжка таблицы умножения без зрительного образа сетки.',
        zh: '脱离点阵面积图像、孤立机械地死记硬背口诀。'
      },
      socratic: {
        en: '"Turn the card 90 degrees: did any chocolate square disappear?"',
        ru: '«Поверни карточку на 90 градусов: пропала ли хоть одна долька шоколада?»',
        zh: '“把卡片转90度:有一小格巧克力消失了吗?”'
      }
    },
    g02_w1_l3: {
      explain: {
        en: 'Algorithms evaluate Boolean conditions (True/False). If-Then-Else trees route decisions with zero ambiguity.',
        ru: 'Алгоритмы проверяют булевы условия (Истина/Ложь). Дерево «Если-То-Иначе» направляет выбор без двусмысленности.',
        zh: '算法对布尔条件求值(真/假)。如果-那么-否则 决策树毫无二义性地分流决策。'
      },
      trap: {
        en: 'Using fuzzy or subjective questions that cannot evaluate strictly to True or False.',
        ru: 'Использование размытых вопросов, на которые нельзя ответить строго Да или Нет.',
        zh: '使用主观模糊的提问,导致计算机无法判定真假。'
      },
      socratic: {
        en: '"Can a computer answer \"maybe\", or must it strictly choose Yes or No?"',
        ru: '«Может ли компьютер ответить „может быть“, или он обязан выбрать Да или Нет?»',
        zh: '“计算机能回答‘可能吧’吗,还是必须严格非真即假?”'
      }
    },
    g03_w1_l1: {
      explain: {
        en: 'Use bar models to visualize 3x + 4 = 19. Undo operations in reverse order: subtract 4, then divide by 3.',
        ru: 'Используйте полосковую модель для 3x + 4 = 19. Отменяйте действия в обратном порядке: сначала вычесть 4, затем разделить на 3.',
        zh: '利用线段图直观呈现 3x + 4 = 19。按逆顺序倒推:先减去4,再除以3。'
      },
      trap: {
        en: 'Inverting the order of inverse operations (e.g. dividing by 3 before subtracting 4).',
        ru: 'Путаница порядка обратных действий (например, деление на 3 до вычитания 4).',
        zh: '逆运算顺序颠倒(例如先除以3再去减4)。'
      },
      socratic: {
        en: '"What was added last in the forward journey? Then what must we undo first?"',
        ru: '«Что было прибавлено последним при прямом счёте? Значит, что нужно отменить первым?»',
        zh: '“正向计算时最后加了什么?那我们倒推时第一步必须先消去什么?”'
      }
    },
    g03_w1_l2: {
      explain: {
        en: 'Rate of change is steepness of slope: v = distance / time. A flat horizontal line means zero velocity.',
        ru: 'Скорость изменения — это крутизна наклона графика: v = путь / время. Горизонтальная линия — нулевая скорость.',
        zh: '变化率是图像斜率的陡峭度:v = 距离 / 时间。水平线代表停滞、速度为零。'
      },
      trap: {
        en: 'Assuming average speed is the arithmetic average of uphill and downhill speeds.',
        ru: 'Ошибочное предположение, что средняя скорость — это среднее арифметическое скоростей туда и обратно.',
        zh: '误以为来回全程平均速度就是上坡速度和下坡速度的简单平均值。'
      },
      socratic: {
        en: '"Did the rider spend more hours climbing slow or racing down fast?"',
        ru: '«Провёл ли велосипедист больше часов, медленно поднимаясь или быстро спускаясь?»',
        zh: '“骑车人是在慢速爬坡上耗费的时间更长,还是在飞速冲坡上下降的时间更长?”'
      }
    },
    g03_w1_l3: {
      explain: {
        en: 'Two dice generate a 6x6 sample space (36 outcomes). Sum 7 has 6 paths; sum 2 has only 1 path.',
        ru: 'Два кубика образуют сетку 6x6 (36 исходов). Сумма 7 имеет 6 вариантов, а сумма 2 — только 1.',
        zh: '双骰子生成 6x6 样本空间(36种结局)。和为7有6种可能,而和为2仅有1种。'
      },
      trap: {
        en: 'Assuming all sums from 2 to 12 have an equal probability of winning.',
        ru: 'Заблуждение, что все суммы от 2 до 12 выпадают с одинаковой вероятностью.',
        zh: '直觉错觉以为从2到12每个点数和出现的概率全都一样。'
      },
      socratic: {
        en: '"How many dice pairs make sum 7? How many make sum 2? Are those chances equal?"',
        ru: '«Сколько пар кубиков дают сумму 7? А сумму 2? Одинаковы ли их шансы?»',
        zh: '“有多少对骰子点数能加出7?有多少只能加出2?这两种机会平等吗?”'
      }
    },
    g04_w1_l1: {
      explain: {
        en: 'Systems of equations: substitution replaces an unknown with its equal expression on the balance scale.',
        ru: 'Системы уравнений: подстановка заменяет неизвестное на равное ему выражение на весах.',
        zh: '方程组:代入消元法在天平上将一个未知项替换为其等价的算式。'
      },
      trap: {
        en: 'Dropping the second variable when substituting (forgetting the rest of the equation).',
        ru: 'Потеря второй переменной при подстановке выражения.',
        zh: '代入时漏掉原方程中的第二项未知数。'
      },
      socratic: {
        en: '"If 1 apple = (1 pear + 40g), can we swap the apple on the first scale with that bundle?"',
        ru: '«Если 1 яблоко = (1 груша + 40 г), можем ли мы заменить яблоко на первых весах этой связкой?»',
        zh: '“如果1个苹果在天平上完全等于‘1个梨+40克’,我们能不能直接把天平上的苹果替换成这一堆东西?”'
      }
    },
    g04_w1_l2: {
      explain: {
        en: 'Dirichlet\'s Principle: placing n items into m boxes (n > m) guarantees at least one box has >= 2 items.',
        ru: 'Принцип Дирихле: распределение n предметов по m ящикам (n > m) гарантирует не менее 2 предметов в каком-то ящике.',
        zh: '抽屉原理:将n个物体放入m个抽屉 (n > m),必然至少有一个抽屉含有至少2个物体。'
      },
      trap: {
        en: 'Searching for an exact placement rather than proving the inevitable worst-case minimum.',
        ru: 'Попытка найти точное распределение вместо доказательства неизбежного минимума.',
        zh: '试图寻找某种特殊的摆放方式,而非论证最极端恶劣情况下的必然底线。'
      },
      socratic: {
        en: '"If every box has at most 1 item, how many can 3 boxes hold? But we hold 4 items!"',
        ru: '«Если в каждом ящике не больше 1 предмета, сколько поместится в 3 ящика? Но у нас 4 предмета!»',
        zh: '“如果每个盒子里最多只有1件东西,3个盒子总共最多装几件?可是我们手里拿着4件!”'
      }
    },
    g04_w1_l3: {
      explain: {
        en: 'Triangle angle sum is proven by an auxiliary parallel line matching alternating interior angles to form 180 degrees.',
        ru: 'Сумма углов треугольника доказывается параллельной прямой, образующей развёрнутый угол 180° с накрест лежащими углами.',
        zh: '三角形内角和定理通过作平行线利用内错角相等证明其拼成180度平角。'
      },
      trap: {
        en: 'Believing larger triangles have larger angle sums than smaller triangles.',
        ru: 'Заблуждение, что у больших треугольников сумма углов больше, чем у маленьких.',
        zh: '以为大三角形的内角和会比小三角形更大。'
      },
      socratic: {
        en: '"When we tear the three corners and place them together, do they make a flat 180-degree line?"',
        ru: '«Когда мы отрываем три угла и складываем их вместе, образуют ли они плоскую линию 180 градусов?»',
        zh: '“当我们撕下三个角把顶点拼在一起时,它们是不是刚好贴合成一条180度的平角平线?”'
      }
    }
  };

  const defaultGuide = {
    explain: {
      en: 'Establish the core definition first with concrete objects. Move to pictorial representations, then abstract mathematical notation.',
      ru: 'Сначала сформулируйте точное определение на наглядных предметах. Перейдите к рисунку, затем к абстрактной записи.',
      zh: '先用实物建立清晰的核心概念定义,再过渡到图像表达,最后进行抽象符号运算。'
    },
    trap: {
      en: 'Rushing to abstract calculations before the child has developed spatial and physical intuition.',
      ru: 'Преждевременный переход к абстрактным формулам до того, как ребёнок усвоил физическую суть.',
      zh: '在孩子建立具象直觉前过早死记硬背抽象公式。'
    },
    socratic: {
      en: '"Can you show me with blocks why this answer is true?"',
      ru: '«Можешь показать на кубиках, почему этот ответ верен?»',
      zh: '“你能用积木摆出来证明为什么这个答案是对的吗?”'
    }
  };

  return guideMap[l.lesson_id] || l.teacher_notes || defaultGuide;
}

function teacherPanelHtml(l) {
  const g = getTeacherGuide(l);
  return `<div class="teacher-box">
    <div class="tb-head"><b>👨‍🏫 ${t('teacher_guide')}</b> · <small>${t('lesson_architecture')}</small></div>
    <div class="tb-phases">
      <span class="tb-pill">${t('phase1')}</span>
      <span class="tb-pill">${t('phase2')}</span>
      <span class="tb-pill">${t('phase3')}</span>
      <span class="tb-pill">${t('phase4')}</span>
      <span class="tb-pill">${t('phase5')}</span>
    </div>
    <div class="tb-card">
      <b>💡 ${t('how_to_explain')}</b>
      <p>${esc(L(g.explain))}</p>
    </div>
    <div class="tb-card warn">
      <b>⚠️ ${t('common_mistakes')}</b>
      <p>${esc(L(g.trap))}</p>
    </div>
    <div class="tb-card info">
      <b>💬 ${t('socratic_prompt')}</b>
      <p>${esc(L(g.socratic))}</p>
    </div>
  </div>`;
}

function lessonView(id) {
  const l = D.byId[id];
  if (!l) return `<p>404</p>`;
  if (!S.activeProfile()) return welcomeView();
  if (!LS || LS.id !== id) startLesson(id);
  const runs = S.runsFor(id);
  const stepType = LS.step < 3 ? SECTIONS[LS.step] : 'finish';
  const stepper = [...SECTIONS, 'finish'].map((s, i) => `<button class="step ${i === LS.step ? 'on' : ''} ${i < LS.step ? 'past' : ''}" data-action="goto" data-v="${i}"><span>${SEC_ICON[s]}</span><small>${t('sec_' + s)}</small></button>`).join('');
  return `<a class="back" href="#/lessons">← ${t('back')}</a>
  <header class="card"><h1>${esc(L(l.title))}</h1>
    <div class="chips"><span class="chip c-${esc(l.methodology_focus.split(' ')[0].toLowerCase())}">${esc(methName(l.methodology_focus))}</span><span class="chip">${esc(catName(l.category))}</span><span class="chip">${l.duration_minutes} ${t('min')}</span></div>
    <p><b>${t('objective')}:</b> ${esc(L(l.objective))}</p>
    ${runs.length ? `<p class="muted small">✅ ${t('times', { n: runs.length })} · ${t('done_on', { date: fmtDate(runs[runs.length - 1].at) })}</p>` : ''}
    <button class="btn ghost toggle-guide-btn" data-action="toggle-guide">👨‍🏫 ${LS.showGuide ? t('hide_solution') : t('toggle_teacher')}</button>
    ${LS.showGuide ? teacherPanelHtml(l) : ''}
  </header>
  <nav class="stepper">${stepper}</nav>
  <section class="card step-body">${stepType === 'finish' ? finishHtml(l) : sectionHtml(l, stepType)}</section>`;
}

function timerHtml(type) {
  const left = LS.left[type];
  return `<div class="timer ${left === 0 ? 'zero' : ''}"><span id="timer">${fmtTime(left)}</span>
    <button class="btn" data-action="timer">${LS.running ? t('timer_pause') : t('timer_start')}</button>
    <button class="btn ghost" data-action="timer-reset">${t('timer_reset')}</button></div>
    ${left === 0 ? `<p class="note">⏰ ${t('timer_done')}</p>` : ''}`;
}

function sectionHtml(l, type) {
  const s = l.sections.find(x => x.type === type);
  const guide = getTeacherGuide(l);
  let body = '';
  if (type === 'theory') {
    body = `<div>
      <span class="parent-deck-tag script-tag">${t('parent_script_badge')}</span>
      <h2>${SEC_ICON[type]} ${t('sec_theory')}</h2>
      <blockquote class="script">${paragraphs(L(s.parent_script))}</blockquote>
      <div class="parent-coaching-box">
        <div class="pc-row"><b>💡 ${t('how_to_explain')}</b><span>${esc(L(guide.explain))}</span></div>
        <div class="pc-row warn"><b>⚠️ ${t('diagnostic_tip_badge')}</b><span>${esc(L(guide.trap))}</span></div>
      </div>
    </div>`;
  }
  if (type === 'practice') {
    const items = L(s.activity).split('\n').filter(Boolean).map(x => x.replace(/^\d+\)\s*/, ''));
    body = `<div>
      <span class="parent-deck-tag action-tag">${t('parent_action_badge')}</span>
      <h2>${SEC_ICON[type]} ${t('sec_practice')}</h2>
      <ol class="steps">${items.map((x, i) => `<li><label><input type="checkbox" data-action="check" data-v="${i}" ${LS.checks[i] ? 'checked' : ''}><span>${esc(x)}</span></label></li>`).join('')}</ol>
      <div class="parent-coaching-box">
        <div class="pc-row"><b>💬 ${t('socratic_prompt')}</b><span>${esc(L(guide.socratic))}</span></div>
      </div>
    </div>`;
  }
  if (type === 'logic_puzzle') {
    body = `<div>
      <span class="parent-deck-tag puzzle-tag">${t('sec_logic_puzzle')}</span>
      <h2>${SEC_ICON[type]} ${esc(L(l.title))}</h2>
      <div class="puzzle">${paragraphs(L(s.prompt))}</div>
      <div class="parent-coaching-box">
        <div class="pc-row"><b>💬 ${t('socratic_prompt')}</b><span>${esc(L(guide.socratic))}</span></div>
        <div class="pc-row"><b>⏳ ${t('hint_think')}</b></div>
      </div>
      <button class="btn" data-action="reveal">${LS.revealed ? t('hide_solution') : t('show_solution')}</button>
      ${LS.revealed ? `<div class="solution"><b>${t('solution')}</b>${paragraphs(L(s.solution))}</div>` : ''}
    </div>`;
  }
  const last = LS.step === 2;
  return `<div class="sec-top"><span class="muted">${t('step_of', { n: LS.step + 1, total: 4 })} · ${s.duration} ${t('min')}</span></div>${timerHtml(type)}${body}
    <div class="nav-row">${LS.step > 0 ? `<button class="btn ghost" data-action="prev">← ${t('back')}</button>` : '<span></span>'}
    <button class="btn primary" data-action="next">${last ? t('finish_lesson') : t('next')} →</button></div>`;
}

function finishHtml(l) {
  const planned = l.sections.reduce((a, s) => a + s.duration, 0);
  const measured = Math.round(LS.elapsed / 60);
  const rate = [1, 2, 3].map(n => `<button class="pill ${LS.rating === n ? 'on' : ''}" data-action="rate" data-v="${n}">${RATE_ICON[n]} ${t('r' + n)}</button>`).join('');
  const puz = [['alone', 'p_alone'], ['hint', 'p_hint'], ['not', 'p_not']].map(([v, k]) => `<button class="pill ${LS.puzzle === v ? 'on' : ''}" data-action="puz" data-v="${v}">${PUZ_ICON[v]} ${t(k)}</button>`).join('');
  return `<h2>🏁 ${t('how_went')}</h2><div class="pills">${rate}</div>
    <h3>${t('puzzle_res')}</h3><div class="pills">${puz}</div>
    <label class="field">${t('time_spent')}<input id="f-min" type="number" min="1" max="180" value="${measured || planned}"></label>
    <label class="field">${t('notes')}<textarea id="f-notes" rows="3" maxlength="500"></textarea></label>
    <div class="nav-row"><button class="btn ghost" data-action="prev">← ${t('back')}</button><button class="btn primary" data-action="save-lesson">✔ ${t('save_complete')}</button></div>`;
}

function tick() {
  if (!LS || !LS.running || LS.step > 2) return;
  const type = SECTIONS[LS.step];
  LS.left[type] = Math.max(0, LS.left[type] - 1); LS.elapsed++;
  const el = document.getElementById('timer'); if (el) el.textContent = fmtTime(LS.left[type]);
  if (LS.left[type] === 0) { stopTicker(); if (navigator.vibrate) navigator.vibrate([200, 100, 200]); draw(); }
}

// ----- progress -----
function progressView() {
  const p = S.activeProfile(); if (!p) return welcomeView();
  const st = S.stats(); const total = D.lessons.length;
  const doneCount = D.lessons.filter(l => st.done.has(l.lesson_id)).length;
  const goal = S.get().weeklyGoal;
  const curG = S.curGrade();
  const gObj = GRADES.find(g => g.id === curG) || GRADES[0];
  const stageLessons = D.lessons.filter(l => l.stage && l.stage.stage_id === curG);
  const stageDoneCount = stageLessons.filter(l => st.done.has(l.lesson_id)).length;
  // subjects
  const subj = Object.keys(CATS).map(c => {
    const ls = D.lessons.filter(l => l.category === c); const d = ls.filter(l => st.done.has(l.lesson_id)).length;
    return `<div class="row ${ls.length ? '' : 'dim'}"><span>${esc(catName(c))}</span><span class="muted">${ls.length ? d + '/' + ls.length : t('soon')}</span></div>${ls.length ? bar(d / ls.length) : ''}`;
  }).join('');
  const meth = Object.keys(METHODS).map(m => {
    const ls = D.lessons.filter(l => l.methodology_focus === m); const d = ls.filter(l => st.done.has(l.lesson_id)).length;
    return `<div class="row"><span>${esc(methName(m))}</span><span class="muted">${d}/${ls.length}</span></div>${bar(ls.length ? d / ls.length : 0)}`;
  }).join('');
  let weeksHtml = '';
  for (const stage of D.stages) for (const w of [...new Set(stage.lessons.map(l => l.week))]) {
    const ls = stage.lessons.filter(l => l.week === w); const d = ls.filter(l => st.done.has(l.lesson_id)).length;
    weeksHtml += `<div class="row"><span>${t('week_n', { n: w })} <small class="muted">${esc(weekTitle(stage, w))}</small></span><span class="muted">${d}/${ls.length}</span></div>${bar(d / ls.length)}`;
  }
  // last 8 weeks chart
  const cur = S.weekStart(Date.now()); const scale = Math.max(goal, st.maxWeek, 1);
  const cols = Array.from({ length: 8 }, (_, i) => {
    const k = cur - (7 - i) * 7 * 864e5; const n = st.perWeek.get(k) || 0;
    return `<div class="col"><div class="colbar ${n >= goal ? 'goal' : ''}" style="height:${(n / scale) * 100}%"><b>${n || ''}</b></div><small>${shortDate(k)}</small></div>`;
  }).join('');
  // badges
  const badges = [];
  badges.push([st.runs.length > 0, '🌱', t('b_first')]);
  for (const stage of D.stages) for (const w of [...new Set(stage.lessons.map(l => l.week))]) {
    const ls = stage.lessons.filter(l => l.week === w);
    badges.push([ls.every(l => st.done.has(l.lesson_id)), ['🔷', '🔢', '📐', '🤖'][(w - 1) % 4], t('b_week', { n: w })]);
  }
  badges.push([st.maxWeek >= 3, '🎯', t('b_three')], [st.streak >= 3, '🔥', t('b_streak3')],
    [st.puzzlesAlone >= 5, '🧠', t('b_puzzles5')], [doneCount === total && total > 0, '🏆', t('b_all')]);
  const hist = [...st.runs].sort((a, b) => b.at - a.at).map(r => {
    const l = D.byId[r.lessonId];
    return `<div class="hist"><div><b>${l ? esc(L(l.title)) : esc(r.lessonId)}</b><div class="muted small">${fmtDate(r.at)} · ${r.minutes} ${t('min')} · ${RATE_ICON[r.rating] || ''} ${PUZ_ICON[r.puzzle] || ''}</div>${r.notes ? `<div class="small">📝 ${esc(r.notes)}</div>` : ''}</div><button class="icon-btn" data-action="del-run" data-v="${r.id}" aria-label="${t('delete')}">🗑</button></div>`;
  }).join('') || `<p class="muted">${t('no_history')}</p>`;
  return `${gradeBarHtml()}
  <header class="hero"><div class="avatar">${p.emoji}</div><div><h1>${esc(p.name)}</h1><p class="muted">${t('nav_progress')} · <b>${gObj.icon} ${esc(L(gObj.name))}</b></p></div></header>
  <section class="card hero2">${ring(total ? doneCount / total : 0)}<div class="grid2 tight">
    <div class="stat"><b>${doneCount}/${total}</b><span>${t('lessons_done')}</span></div><div class="stat"><b>${st.minutes}</b><span>${t('minutes')}</span></div>
    <div class="stat"><b>🔥 ${st.streak}</b><span>${t('week_streak')}</span></div><div class="stat"><b>⭐ ${st.puzzlesAlone}</b><span>${t('puzzle_stat')}</span></div></div></section>
  <section class="card"><h3>${t('weekly_activity')}</h3><div class="chart">${cols}</div></section>
  <section class="card"><h3>${t('by_week')}</h3>${weeksHtml}</section>
  <section class="card"><h3>${t('by_subject')}</h3>${subj}</section>
  <section class="card"><h3>${t('by_method')}</h3>${meth}</section>
  <section class="card"><h3>${t('badges')}</h3><div class="badges">${badges.map(([on, i, n]) => `<div class="badge ${on ? 'on' : ''}"><span>${i}</span><small>${esc(n)}</small></div>`).join('')}</div></section>
  <section class="card"><h3>${t('history')}</h3>${hist}</section>`;
}

// ----- settings -----
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; if (location.hash === '#/settings') draw(); });

function settingsView() {
  const s = S.get();
  const plist = Object.values(s.profiles).map(p => `<div class="row prof"><span class="av-big">${p.emoji}</span><b>${esc(p.name)}</b>
    ${p.id === s.active ? `<span class="chip">${t('active')}</span>` : `<button class="btn" data-action="select-profile" data-v="${p.id}">${t('switch')}</button>`}
    <button class="icon-btn" data-action="del-profile" data-v="${p.id}" aria-label="${t('delete')}">🗑</button></div>`).join('');
  return `<h1>⚙️ ${t('nav_settings')}</h1>
  <section class="card"><h3>${t('language')}</h3>${langPicker()}</section>
  <section class="card"><h3>${t('profiles')}</h3>${plist}<h4>${t('add_child')}</h4>${profileForm()}</section>
  <section class="card"><h3>${t('weekly_goal')}</h3><div class="seg">${[2, 3].map(n => `<button class="${s.weeklyGoal === n ? 'on' : ''}" data-action="goal" data-v="${n}">${n}</button>`).join('')}</div></section>
  <section class="card"><h3>${t('data')}</h3><div class="stack">
    <button class="btn" data-action="export">⬇ ${t('export')}</button>
    <label class="btn">⬆ ${t('import')}<input id="import" type="file" accept="application/json" hidden></label>
    ${deferredInstall ? `<button class="btn primary" data-action="install">📲 ${t('install')}</button>` : ''}
    <button class="btn danger" data-action="reset">${t('reset')}</button></div>
    <p class="muted small">✔ ${t('offline_ready')}</p></section>`;
}

// ---------- router / render ----------
function draw() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [, view, arg] = h.split('/');
  let html;
  try {
    if (view === 'lessons') html = lessonsView();
    else if (view === 'lesson') html = lessonView(arg);
    else if (view === 'progress') html = progressView();
    else if (view === 'settings') html = settingsView();
    else html = homeView();
  } catch (e) { console.error(e); html = `<p>${t('loading_err')}</p>`; }
  $app.innerHTML = html;
  const items = [['', '🏠', 'nav_home'], ['lessons', '📚', 'nav_lessons'], ['progress', '📈', 'nav_progress'], ['settings', '⚙️', 'nav_settings']];
  $nav.innerHTML = items.map(([v, i, k]) => `<a href="#/${v}" class="${(view || '') === v || (view === 'lesson' && v === 'lessons') ? 'on' : ''}"><span>${i}</span><small>${t(k)}</small></a>`).join('');
  document.documentElement.lang = lang();
}
function route() {
  stopTicker(); releaseAwake();
  const h = location.hash;
  if (!h.startsWith('#/lesson/')) LS = null;
  else if (LS && LS.id === h.split('/')[2]) keepAwake();
  draw(); window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

// ---------- events ----------
$app.addEventListener('click', e => {
  const b = e.target.closest('[data-action]'); if (!b) return;
  const a = b.dataset.action, v = b.dataset.v;
  const l = LS && D.byId[LS.id];
  switch (a) {
    case 'lang': S.setLang(v); draw(); break;
    case 'goal': S.setWeeklyGoal(+v); draw(); break;
    case 'select-grade': S.setGrade(v); curStageFilter = v; showGradeModal = false; draw(); break;
    case 'toggle-grade-hub': showGradeModal = !showGradeModal; draw(); break;
    case 'filter-term': curTermFilter = v; draw(); break;
    case 'filter-stage': curStageFilter = v; draw(); break;
    case 'filter-cat': curCatFilter = v; draw(); break;
    case 'toggle-guide': if (LS) { LS.showGuide = !LS.showGuide; draw(); } break;
    case 'goto': stopTicker(); LS.step = +v; draw(); break;
    case 'prev': stopTicker(); LS.step = Math.max(0, LS.step - 1); draw(); window.scrollTo(0, 0); break;
    case 'next': stopTicker(); S.markSection(LS.id, SECTIONS[LS.step]); LS.step++; LS.revealed = false; draw(); window.scrollTo(0, 0); break;
    case 'timer':
      if (LS.running) stopTicker();
      else { LS.running = true; clearInterval(ticker); ticker = setInterval(tick, 1000); }
      draw(); break;
    case 'timer-reset': { stopTicker(); const type = SECTIONS[LS.step]; LS.left[type] = l.sections.find(s => s.type === type).duration * 60; draw(); break; }
    case 'check': LS.checks[v] = b.checked; break;
    case 'reveal': LS.revealed = !LS.revealed; draw(); break;
    case 'rate': LS.rating = +v; draw(); break;
    case 'puz': LS.puzzle = v; draw(); break;
    case 'save-lesson': {
      const minutes = Math.max(1, Math.min(180, +document.getElementById('f-min').value || l.duration_minutes));
      S.addRun({ lessonId: LS.id, minutes, rating: LS.rating, puzzle: LS.puzzle, notes: document.getElementById('f-notes').value.trim() });
      LS = null; releaseAwake(); toast('🎉 ' + t('saved')); location.hash = '#/progress'; break;
    }
    case 'del-run': if (confirm(t('confirm_del_run'))) { S.deleteRun(v); draw(); } break;
    case 'select-profile': S.selectProfile(v); draw(); break;
    case 'del-profile': if (confirm(t('confirm_delete'))) { S.deleteProfile(v); draw(); } break;
    case 'export': {
      const url = URL.createObjectURL(new Blob([S.exportJSON()], { type: 'application/json' }));
      const el = document.createElement('a'); el.href = url; el.download = 'antigravity-progress-' + new Date().toISOString().slice(0, 10) + '.json'; el.click(); URL.revokeObjectURL(url); break;
    }
    case 'install': if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; } break;
    case 'reset': if (confirm(t('confirm_reset'))) { S.resetAll(); S.setLang(lang()); LS = null; location.hash = '#/'; draw(); } break;
  }
});
$app.addEventListener('submit', e => {
  const f = e.target.closest('[data-form="add-child"]'); if (!f) return;
  e.preventDefault();
  const fd = new FormData(f); const name = String(fd.get('name')).trim(); if (!name) return;
  const grade = String(fd.get('grade') || 'prek');
  S.addProfile(name, fd.get('emoji') || AVATARS[0], grade); location.hash = '#/'; draw();
});
$app.addEventListener('change', e => {
  if (e.target.id !== 'import' || !e.target.files[0]) return;
  const r = new FileReader();
  r.onload = () => { try { S.importJSON(r.result); toast(t('imported')); draw(); } catch (err) { toast(t('import_fail')); } };
  r.readAsText(e.target.files[0]);
});

// ---------- boot ----------
loadData().then(route).catch(err => { console.error(err); $app.innerHTML = `<p class="card">${t('loading_err')}<br><small>${esc(err.message)}</small></p>`; });
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
