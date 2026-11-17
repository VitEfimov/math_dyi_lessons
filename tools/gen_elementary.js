import fs from 'node:fs';
import { SYLLABUS } from './build_school_year.js';
import { G1_SPECS } from './specs_g1.js';
import { G2_SPECS } from './specs_g2.js';
import { G3_SPECS } from './specs_g3.js';
import { G4_SPECS } from './specs_g4.js';

const tr = (en, ru, zh) => ({ en, ru, zh });

// Load archived handcrafted Elementary lessons so we preserve their rich original text
const archiveElem = JSON.parse(fs.readFileSync('data/archive/curriculum_elementary.json', 'utf8'));
const byOldId = {};
for (const stage of archiveElem.curriculum.stages) {
  for (const l of stage.lessons) {
    byOldId[l.lesson_id] = l;
  }
}

function buildElemWeekLessons(stageId, prefix, w, spec) {
  const wTitle = SYLLABUS[stageId][w];
  const l1Id = `${prefix}_w${w}_l1`;
  const l2Id = `${prefix}_w${w}_l2`;

  const titleA = stageId === 'elem_g1'
    ? tr(`Lesson A: ${wTitle.en} — Concrete to Pictorial Model`, `Урок А: ${wTitle.ru} — От предметов к наглядной схеме`, `A课: ${wTitle.zh} — 从实物到图形表征`)
    : stageId === 'elem_g2'
    ? tr(`Lesson A [Accelerated / Advanced]: ${wTitle.en}`, `Урок А [Accelerated / Advanced]: ${wTitle.ru}`, `A课 [Accelerated / Advanced]: ${wTitle.zh}`)
    : tr(`Lesson A: ${wTitle.en} — Core Concept & Proof`, `Урок А: ${wTitle.ru} — Теория и доказательство`, `A课: ${wTitle.zh} — 核心概念与公理证明`);

  const titleB = stageId === 'elem_g1'
    ? tr(`Lesson B: ${wTitle.en} — Structured Problem-Solving & Logic`, `Урок Б: ${wTitle.ru} — Решение задач и логика`, `B课: ${wTitle.zh} — 结构化解应用题与逻辑`)
    : stageId === 'elem_g2'
    ? tr(`Lesson B [Advanced / Honors · Math Kangaroo]: ${wTitle.en}`, `Урок Б [Advanced / Honors · Кенгуру]: ${wTitle.ru}`, `B课 [Advanced / Honors · 袋鼠数学竞赛]: ${wTitle.zh}`)
    : tr(`Lesson B: ${wTitle.en} — Olympiad Mastery & Application`, `Урок Б: ${wTitle.ru} — Олимпиадная логика и практикум`, `B课: ${wTitle.zh} — 奥数深化与综合应用`);

  let lessonA;
  if (spec.oldA && byOldId[spec.oldA]) {
    lessonA = JSON.parse(JSON.stringify(byOldId[spec.oldA]));
    lessonA.lesson_id = l1Id;
    lessonA.title = titleA;
    lessonA.teacher_notes = {
      explain: spec.def,
      trap: tr(
        `Rushing to mechanical formulas in "${wTitle.en}" without first verifying the physical or visual proof using ${spec.prop.en}.`,
        `Переход к механическому заучиванию формулы в теме «${wTitle.ru}» без наглядного доказательства на ${spec.prop.ru}.`,
        `在“${wTitle.zh}”中跳过使用${spec.prop.zh}的直观证明,直接死记硬背公式。`
      ),
      socratic: lessonA.sections[2].prompt
    };
  } else {
    lessonA = {
      lesson_id: l1Id,
      duration_minutes: 40,
      category: spec.catA,
      methodology_focus: spec.methA,
      title: titleA,
      objective: tr(
        `Master the foundational definition and first-principles proof of "${wTitle.en}" (${spec.catA}): ${spec.def.en}`,
        `Освоить точное определение и доказательство из первых принципов по теме «${wTitle.ru}» (${spec.catA}): ${spec.def.ru}`,
        `掌握“${wTitle.zh}”(${spec.catA})的严格定义与第一性原理证明: ${spec.def.zh}`
      ),
      sections: [
        {
          type: "theory",
          duration: 12,
          parent_script: tr(
            `Prepare ${spec.prop.en}. Say to your child: "Today in Week ${w} Lesson A, we explore '${wTitle.en}'. In Andrey Kiselev's mathematics, we never memorize a rule blindly — we prove why it MUST be true! Listen to our foundational definition: ${spec.def.en} Let's test and prove this together right now using ${spec.prop.en}!"`,
            `Подготовьте ${spec.prop.ru}. Скажите ребёнку: «Сегодня на Уроке А недели ${w} мы изучаем тему „${wTitle.ru}“. В классической математике А. П. Киселёва мы никогда не заучиваем правила вслепую — мы доказываем, почему иначе быть не может! Вот наше строгое определение: ${spec.def.ru} Давай проверим и докажем это прямо сейчас на ${spec.prop.ru}!»`,
            `准备好${spec.prop.zh}。对孩子说:“今天在第${w}周的A课中,我们要探索‘${wTitle.zh}’。在基谢廖夫的数学体系里,我们绝不死记硬背口诀,而是要搞懂并证明它为什么一定成立!先听今天的核心公理与定义: ${spec.def.zh} 现在让我们用${spec.prop.zh}亲手验证并证明它!”`
          )
        },
        {
          type: "practice",
          duration: 18,
          activity: tr(
            `1) Set up ${spec.prop.en} on the worktable and state the goal of "${wTitle.en}".\n2) Guided First-Principles Proof: ${spec.taskA.en}.\n3) Have your child explain WHY the rule works in their own words while pointing to the model.\n4) Vary the numbers or geometry once to confirm the invariant holds in every case!`,
            `1) Разложите на столе ${spec.prop.ru} и сформулируйте цель темы «${wTitle.ru}».\n2) Практикум и наглядное доказательство: ${spec.taskA.ru}.\n3) Попросите ребёнка своими словами объяснить, ПОЧЕМУ работает это правило, показывая на модели.\n4) Измените числа или размеры ещё один раз, чтобы убедиться, что закон выполняется всегда!`,
            `1) 在桌面上摆好${spec.prop.zh},明确“${wTitle.zh}”的探究目标。\n2) 第一性原理实操证明: ${spec.taskA.zh}。\n3) 请孩子指着教具模型,用自己的话完整讲出“为什么这个规律一定成立”。\n4) 改变一组数字或图形尺寸再次验证,确认该数学不变量在任何情况下都成立!`
          )
        },
        {
          type: "logic_puzzle",
          duration: 10,
          prompt: spec.puzA,
          solution: spec.solA
        }
      ],
      teacher_notes: {
        explain: spec.def,
        trap: tr(
          `Rushing to mechanical calculation in "${wTitle.en}" before your child can physically demonstrate the concept with ${spec.prop.en}.`,
          `Переход к механическим вычислениям в теме «${wTitle.ru}» до того, как ребёнок наглядно покажет суть на ${spec.prop.ru}.`,
          `在孩子还没能用${spec.prop.zh}演示清楚底层原理之前,就急于刷题套公式。`
        ),
        socratic: spec.puzA
      }
    };
  }

  let lessonB;
  if (spec.oldB && byOldId[spec.oldB]) {
    lessonB = JSON.parse(JSON.stringify(byOldId[spec.oldB]));
    lessonB.lesson_id = l2Id;
    lessonB.title = titleB;
    lessonB.teacher_notes = {
      explain: spec.def,
      trap: tr(
        `Accepting a final number without asking your child to prove why alternative answers are impossible.`,
        `Принятие готового ответа без просьбы доказать, почему другие ответы невозможны.`,
        `只看最终得数,而没有要求孩子证明为什么其他答案不可能成立。`
      ),
      socratic: lessonB.sections[2].prompt
    };
  } else {
    lessonB = {
      lesson_id: l2Id,
      duration_minutes: 40,
      category: spec.catB,
      methodology_focus: spec.methB,
      title: titleB,
      objective: tr(
        `Extend "${wTitle.en}" to Olympiad problem-solving and algorithmic fluency: ${spec.taskB.en}.`,
        `Углубить тему «${wTitle.ru}» через олимпиадные задачи и быстрый счёт: ${spec.taskB.ru}.`,
        `将“${wTitle.zh}”拓展至奥数思维与算法巧算: ${spec.taskB.zh}。`
      ),
      sections: [
        {
          type: "theory",
          duration: 10,
          parent_script: tr(
            `In Lesson A we proved the core principle of "${wTitle.en}": ${spec.def.en} Today in Lesson B, we combine the Soviet school's rigor, the Chinese school's structural speed, and the Oxford school's algorithmic thinking! Using ${spec.prop.en}, we will tackle inverse problems, edge cases, and Olympiad-level traps.`,
            `На Уроке А мы доказали главный закон темы «${wTitle.ru}»: ${spec.def.ru} Сегодня на Уроке Б мы объединим строгость советской школы, скорость китайской методики и алгоритмическое мышление Оксфорда! С помощью ${spec.prop.ru} мы разберём обратные задачи, крайние случаи и олимпиадные ловушки.`,
            `在A课中我们严格证明了“${wTitle.zh}”的核心定理: ${spec.def.zh} 今天的B课我们要融汇苏联学派的严密推理、中国学派的结构巧算与牛津学派的算法思维!借助${spec.prop.zh},我们将挑战逆向问题、极端情况与经典奥数陷阱。`
          )
        },
        {
          type: "practice",
          duration: 18,
          activity: tr(
            `1) 2-Minute Axiom Recall: ask your child to state the core rule of "${wTitle.en}" using ${spec.prop.en}.\n2) Olympiad Mastery Practice: ${spec.taskB.en}.\n3) Mental Modeling: ask your child to solve a variation purely in their head by visualizing the structure before writing anything down.\n4) Verify the answer using an independent inverse operation or symmetry check!`,
            `1) Быстрое повторение (2 мин): попросите ребёнка сформулировать главное правило темы «${wTitle.ru}» на ${spec.prop.ru}.\n2) Олимпиадный практикум: ${spec.taskB.ru}.\n3) Мысленное моделирование: предложите решить вариативную задачу в уме, представив схему до записи на бумаге.\n4) Проверьте ответ независимым обратным действием или оценкой!`,
            `1) 2分钟公理复盘: 请孩子结合${spec.prop.zh}说出“${wTitle.zh}”的核心定律。\n2) 奥数进阶实战: ${spec.taskB.zh}。\n3) 脑内建模推演: 引导孩子先不动笔,在脑海中构建几何或代数结构心算求解。\n4) 用逆运算或极端情况检验法对结果进行独立验算!`
          )
        },
        {
          type: "logic_puzzle",
          duration: 12,
          prompt: spec.puzB,
          solution: spec.solB
        }
      ],
      teacher_notes: {
        explain: spec.def,
        trap: tr(
          `Falling for surface-level number patterns without checking the underlying invariant or boundary condition.`,
          `Попадание в ловушку поверхностного сходства чисел без проверки инварианта и граничных условий.`,
          `被表面数字迷惑而掉入陷阱,没有先检查守恒不变量或边界条件。`
        ),
        socratic: spec.puzB
      }
    };
  }

  return [lessonA, lessonB];
}

const STAGE_CONFIGS = [
  {
    stage_id: "elem_g1",
    prefix: "g01",
    age_range: "6–7",
    title: tr(
      "Stage 2: Grade 1 (Ages 6–7) — Full School Year",
      "Ступень 2: 1 класс (6–7 лет) — Полный учебный год",
      "第2阶段: 小学一年级 (6–7岁) — 全学年课程"
    ),
    specs: G1_SPECS
  },
  {
    stage_id: "elem_g2",
    prefix: "g02",
    age_range: "7–8",
    title: tr(
      "Stage 3: Grade 2 (Ages 7–8) — Full School Year",
      "Ступень 3: 2 класс (7–8 лет) — Полный учебный год",
      "第3阶段: 小学二年级 (7–8岁) — 全学年课程"
    ),
    specs: G2_SPECS
  },
  {
    stage_id: "elem_g3",
    prefix: "g03",
    age_range: "8–9",
    title: tr(
      "Stage 4: Grade 3 (Ages 8–9) — Full School Year",
      "Ступень 4: 3 класс (8–9 лет) — Полный учебный год",
      "第4阶段: 小学三年级 (8–9岁) — 全学年课程"
    ),
    specs: G3_SPECS
  },
  {
    stage_id: "elem_g4",
    prefix: "g04",
    age_range: "9–10",
    title: tr(
      "Stage 5: Grade 4 (Ages 9–10) — Full School Year",
      "Ступень 5: 4 класс (9–10 лет) — Полный учебный год",
      "第5阶段: 小学四年级 (9–10岁) — 全学年课程"
    ),
    specs: G4_SPECS
  }
];

const elemStages = [];
for (const cfg of STAGE_CONFIGS) {
  const lessons = [];
  for (let w = 1; w <= 36; w++) {
    const [la, lb] = buildElemWeekLessons(cfg.stage_id, cfg.prefix, w, cfg.specs[w]);
    lessons.push(la, lb);
  }
  elemStages.push({
    stage_id: cfg.stage_id,
    age_range: cfg.age_range,
    title: cfg.title,
    lessons
  });
  console.log(`Built ${cfg.stage_id}: ${lessons.length} lessons across 36 weeks.`);
}

const elemOut = {
  curriculum: {
    stages: elemStages
  }
};

fs.writeFileSync('data/curriculum_elementary.json', JSON.stringify(elemOut, null, 2), 'utf8');
console.log('Successfully generated data/curriculum_elementary.json with', elemStages.reduce((a, s) => a + s.lessons.length, 0), 'total elementary lessons!');
