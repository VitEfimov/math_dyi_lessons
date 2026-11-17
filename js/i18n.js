// UI strings for the app shell. Lesson content itself lives in data/*.json.
export const LANGS = [['en', 'English'], ['ru', 'Русский'], ['zh', '中文']];

export const UI = {
  en: {
    app_tag: 'Parent Teaching Cockpit · Math at Home', nav_home: 'Dashboard', nav_lessons: 'Lesson Plans', nav_progress: 'Child Progress', nav_settings: 'Settings',
    hello: 'Parent Dashboard · Teaching {name}', next_lesson: 'Next Lesson to Conduct', start: 'Conduct Lesson', continue: 'Continue Lesson', review: 'Review Lesson',
    all_done: 'Month 1 complete! Wonderful work.', this_week: 'This week', sessions_of: '{n} of {goal} lessons',
    goal_hint: 'Recommended pace: 2–3 sessions per week, 30–45 minutes each.', overall: 'Overall curriculum progress',
    lessons_done: 'Lessons conducted', minutes: 'Teaching minutes', week_streak: 'Weeks in a row',
    week_n: 'Week {n}', min: 'min', st_new: 'Not conducted', st_prog: 'In progress', st_done: 'Completed',
    objective: 'Pedagogical Objective & Kiselev Principle', sec_theory: '1. Exposition (Spoken Script)', sec_practice: '2. Guided Hands-on Practice',
    sec_logic_puzzle: '3. Socratic Logic Puzzle', sec_finish: '4. Lesson Debrief', timer_start: 'Start timer', timer_pause: 'Pause',
    timer_reset: 'Reset', timer_done: 'Time is up! Move on when your child is ready.', show_solution: 'Reveal solution & proof',
    hide_solution: 'Hide solution', solution: 'Complete Solution & Proof',
    hint_think: 'Socratic rule: Let your child think quietly for at least 60 seconds before giving a hint.',
    back: 'Back to plans', next: 'Next Step', finish_lesson: 'Finish session', how_went: 'How did your child grasp the concept?',
    r1: 'Needed Heavy Help', r2: 'Grasped with Guidance', r3: 'Mastered Confidently', puzzle_res: 'Logic puzzle result', p_alone: 'Solved independently', p_hint: 'Solved with Socratic hint',
    p_not: 'Needs reinforcement', time_spent: 'Actual session duration (minutes)', notes: 'Parent teaching notes (what to review next time)',
    save_complete: 'Save to Child Profile', saved: 'Session saved to progress record!', done_on: 'Taught on {date}', times: 'Conducted {n}×',
    repeat: 'Repeat session', prev_results: 'Previous teaching logs', by_week: 'By curriculum week', by_subject: 'By mathematical domain',
    by_method: 'By pedagogical methodology', weekly_activity: 'Sessions per week', badges: 'Mastery Badges', history: 'Teaching Log History',
    no_history: 'No teaching sessions logged yet.', soon: 'coming soon', puzzle_stat: 'Puzzles solved independently',
    delete: 'Delete', language: 'Language', profiles: 'Children Profiles', add_child: 'Add Child Profile', name: 'Child Name',
    active: 'currently teaching', switch: 'Select', weekly_goal: 'Weekly teaching target (sessions)', data: 'Data & Backup',
    export: 'Export child progress', import: 'Import progress backup', reset: 'Erase all data',
    confirm_delete: 'Delete this child profile and all associated teaching history?', confirm_reset: 'Erase ALL teaching logs on this device?',
    confirm_del_run: 'Delete this session record?', imported: 'Progress imported successfully.', import_fail: 'Invalid file format.',
    install: 'Install Parent PWA', offline_ready: 'Fully functional offline', welcome: 'Welcome to Antigravity Parent Cockpit',
    welcome_text: 'Create a profile for your child to access scripted lesson plans and track mathematical mastery.', create: 'Create Profile',
    loading_err: 'Could not load lesson database.', age: 'Target Ages', lessons_n: '{done}/{total} lessons completed',
    b_first: 'First Lesson Conducted', b_week: 'Week {n} Mastered', b_three: '3 Sessions in 1 Week',
    b_streak3: '3-Week Consistency', b_puzzles5: '5 Puzzles Solved Independently', b_all: 'Month 1 Curriculum Mastered',
    parent_note: 'Parent Script', activity: 'Hands-on Activity', prompt: 'Puzzle Prompt', step_of: 'Step {n} of {total}',
    teacher_guide: "Parent & Teacher Field Manual", toggle_teacher: 'Pedagogical Guide & Tips',
    lesson_architecture: 'Universal 5-Phase Lesson Protocol', how_to_explain: 'How & What to Explain (Word-for-Word)',
    common_mistakes: 'Watch Out: Common Misconception', socratic_prompt: 'Socratic Dialogue Question',
    tier_tasks: 'Tiered Exercise System', phase1: '1. Oral Warm-up (5m)', phase2: '2. Exposition (8-10m)',
    phase3: '3. Guided Discovery (10-12m)', phase4: '4. Tiered Tasks (10-12m)', phase5: '5. Socratic Puzzle (5-8m)',
    parent_script_badge: '🗣️ READ ALOUD TO YOUR CHILD', parent_action_badge: '✋ YOUR ACTIONS (PROPS & HANDS)',
    diagnostic_tip_badge: '⚠️ IF YOUR CHILD HESITATES OR STUMBLES', materials_badge: '🎒 PROPS TO GATHER BEFOREHAND',
    filter_grade: 'Grade Stage', filter_category: 'Category', all_grades: 'All Stages', all_categories: 'All Categories',
    select_grade: 'Select Grade Stage', choose_grade: 'Choose Grade', current_grade: 'Active Grade', switch_grade: 'Switch Grade',
    school_year_roadmap: 'School Year Roadmap (36 Weeks · 2 Lessons/Week)', school_year: 'School Year (36 Weeks)',
    term_all: 'All 36 Weeks', term_1: 'Term 1: Foundations (W1–9)', term_2: 'Term 2: Core Expansion (W10–18)',
    term_3: 'Term 3: Logic & Space (W19–27)', term_4: 'Term 4: Olympiad Mastery (W28–36)',
    term_tag_1: '🍂 Term 1', term_tag_2: '❄️ Term 2', term_tag_3: '🌱 Term 3', term_tag_4: '☀️ Term 4',
    lesson_a: 'Lesson A: Core Discovery', lesson_b: 'Lesson B: Olympiad & Logic',
    two_lessons_per_week: '2 Lessons / Week Pace', teleprompter_mode: 'Parent Teleprompter', child_grade: "Child's Grade",
    grade_overview: 'Pedagogical Framework & Core Milestones',
  },
  ru: {
    app_tag: 'Педагогический пульт родителя · Математика дома', nav_home: 'Главная', nav_lessons: 'Планы уроков', nav_progress: 'Прогресс ребёнка', nav_settings: 'Настройки',
    hello: 'Пульт родителя · Обучаем: {name}', next_lesson: 'Следующий урок для проведения', start: 'Провести урок', continue: 'Продолжить урок', review: 'Повторить урок',
    all_done: 'Месяц 1 полностью пройден! Прекрасная работа.', this_week: 'Эта неделя', sessions_of: '{n} из {goal} уроков',
    goal_hint: 'Рекомендуемый темп: 2–3 урока в неделю по 30–45 минут.', overall: 'Общий прогресс программы',
    lessons_done: 'Проведено уроков', minutes: 'Минут обучения', week_streak: 'Недель подряд',
    week_n: 'Неделя {n}', min: 'мин', st_new: 'Не проведён', st_prog: 'В процессе', st_done: 'Пройден',
    objective: 'Педагогическая цель и принцип Киселёва', sec_theory: '1. Изложение (текст для чтения ребёнку)', sec_practice: '2. Практика с наглядными предметами',
    sec_logic_puzzle: '3. Сократическая задача на логику', sec_finish: '4. Итог занятия', timer_start: 'Запустить таймер', timer_pause: 'Пауза',
    timer_reset: 'Сброс', timer_done: 'Время вышло! Переходите дальше, когда ребёнок готов.', show_solution: 'Показать решение и доказательство',
    hide_solution: 'Скрыть решение', solution: 'Полное решение и доказательство',
    hint_think: 'Правило Сократа: дайте ребёнку подумать молча не менее 60 секунд до подсказки.',
    back: 'К списку планов', next: 'Следующий шаг', finish_lesson: 'Завершить урок', how_went: 'Как ребёнок усвоил тему?',
    r1: 'Требовалась сильная помощь', r2: 'Понял с наводящими вопросами', r3: 'Усвоил уверенно и легко', puzzle_res: 'Результат задачи на логику', p_alone: 'Решил полностью сам', p_hint: 'Решил с подсказкой',
    p_not: 'Нужно повторить', time_spent: 'Реальная длительность урока (мин)', notes: 'Заметки родителя (что повторить в следующий раз)',
    save_complete: 'Сохранить в профиль ребёнка', saved: 'Занятие сохранено в историю обучения!', done_on: 'Проведён {date}', times: 'Проведён {n} раз',
    repeat: 'Повторить занятие', prev_results: 'Журнал прошлых занятий', by_week: 'По неделям программы', by_subject: 'По математическим темам',
    by_method: 'По педагогическим школам', weekly_activity: 'Занятий в неделю', badges: 'Знаки мастерства', history: 'История занятий',
    no_history: 'Пока нет записей о проведённых уроках.', soon: 'скоро', puzzle_stat: 'Задач решено самостоятельно',
    delete: 'Удалить', language: 'Язык', profiles: 'Профили детей', add_child: 'Добавить профиль ребёнка', name: 'Имя ребёнка',
    active: 'текущий ученик', switch: 'Выбрать', weekly_goal: 'Цель на неделю (уроков)', data: 'Данные и резервные копии',
    export: 'Экспорт журнала прогресса', import: 'Импорт резервной копии', reset: 'Стереть все данные',
    confirm_delete: 'Удалить профиль этого ребёнка и весь журнал занятий?', confirm_reset: 'Стереть ВСЕ данные об обучении на этом устройстве?',
    confirm_del_run: 'Удалить эту запись занятия?', imported: 'Прогресс успешно импортирован.', import_fail: 'Неверный формат файла.',
    install: 'Установить пульт родителя', offline_ready: 'Работает без интернета', welcome: 'Добро пожаловать в пульт родителя Antigravity',
    welcome_text: 'Создайте профиль ребёнка, чтобы получить доступ к пошаговым сценариям уроков и журналу освоения.', create: 'Создать профиль',
    loading_err: 'Не удалось загрузить базу уроков.', age: 'Возрастная группа', lessons_n: '{done}/{total} уроков проведено',
    b_first: 'Первый проведённый урок', b_week: 'Неделя {n} освоена', b_three: '3 урока за 1 неделю',
    b_streak3: '3 недели регулярных занятий', b_puzzles5: '5 задач решено самостоятельно', b_all: 'Программа 1-го месяца освоена',
    parent_note: 'Текст для родителя', activity: 'Практическое задание', prompt: 'Задача', step_of: 'Шаг {n} из {total}',
    teacher_guide: 'Методическое руководство для родителя', toggle_teacher: 'Советы и методика урока',
    lesson_architecture: 'Универсальная 5-фазная структура урока', how_to_explain: 'Как и что объяснять (слово в слово)',
    common_mistakes: 'Внимание: типичные ошибки и заблуждения', socratic_prompt: 'Сократический наводящий вопрос',
    tier_tasks: 'Система уровневых заданий', phase1: '1. Устная разминка (5м)', phase2: '2. Изложение (8-10м)',
    phase3: '3. Исследование (10-12м)', phase4: '4. Уровневые задачи (10-12м)', phase5: '5. Задача на логику (5-8м)',
    parent_script_badge: '🗣️ СКАЖИТЕ РЕБЁНКУ (СЛОВО В СЛОВО)', parent_action_badge: '✋ ВАШИ ДЕЙСТВИЯ (ПРЕДМЕТЫ И ЖЕСТЫ)',
    diagnostic_tip_badge: '⚠️ ЕСЛИ РЕБЁНОК ЗАТРУДНЯЕТСЯ', materials_badge: '🎒 ПОДГОТОВЬТЕ ДО УРОКА (ПРЕДМЕТЫ)',
    filter_grade: 'Класс / Ступень', filter_category: 'Категория', all_grades: 'Все ступени', all_categories: 'Все категории',
    select_grade: 'Выберите класс / ступень', choose_grade: 'Выбрать класс', current_grade: 'Текущий класс', switch_grade: 'Сменить класс',
    school_year_roadmap: 'Программа учебного года (36 недель · 2 урока/нед)', school_year: 'Учебный год (36 недель)',
    term_all: 'Все 36 недель', term_1: '1-я четверть: Основы (Н1–9)', term_2: '2-я четверть: Развитие (Н10–18)',
    term_3: '3-я четверть: Логика и геометрия (Н19–27)', term_4: '4-я четверть: Олимпиадный финал (Н28–36)',
    term_tag_1: '🍂 1-я четв.', term_tag_2: '❄️ 2-я четв.', term_tag_3: '🌱 3-я четв.', term_tag_4: '☀️ 4-я четв.',
    lesson_a: 'Урок А: Открытие понятия', lesson_b: 'Урок Б: Олимпиадная логика',
    two_lessons_per_week: '2 урока в неделю (годовой темп)', teleprompter_mode: 'Режим суфлёра', child_grade: 'Класс ребёнка',
    grade_overview: 'Методика и ключевые цели ступени',
  },
  zh: {
    app_tag: '家长教学工作台 · 在家教数学', nav_home: '工作台', nav_lessons: '教学教案', nav_progress: '孩子进度', nav_settings: '设置',
    hello: '家长工作台 · 正在辅导: {name}', next_lesson: '下一节待开展课程', start: '开始辅导', continue: '继续辅导', review: '复习本课',
    all_done: '第1个月教学目标全部完成!太棒了。', this_week: '本周教学', sessions_of: '{n}/{goal} 节课',
    goal_hint: '建议节奏:每周辅导2–3节课,每节30–45分钟。', overall: '总体教学大纲进度',
    lessons_done: '已辅导课程', minutes: '辅导总分钟数', week_streak: '连续辅导周数',
    week_n: '第{n}周', min: '分钟', st_new: '未开展', st_prog: '进行中', st_done: '已完成',
    objective: '教学目标与基谢廖夫公理原理', sec_theory: '1. 概念讲授 (请念给孩子听)', sec_practice: '2. 动手实操与分步练习',
    sec_logic_puzzle: '3. 启发式逻辑挑战', sec_finish: '4. 教学总结与评价', timer_start: '开始计时', timer_pause: '暂停',
    timer_reset: '重置', timer_done: '时间到!当孩子准备好时可进入下一步。', show_solution: '显示解答与证明过程',
    hide_solution: '隐藏解答', solution: '完整解答与数学证明',
    hint_think: '苏格拉底原则:请让孩子独立安静思考至少60秒,切勿过早提示。',
    back: '返回教案列表', next: '进入下一步', finish_lesson: '完成本次辅导', how_went: '孩子对本课概念的掌握程度如何?',
    r1: '需要大量帮助', r2: '在启发下理解掌握', r3: '自信轻松完全掌握', puzzle_res: '逻辑谜题表现', p_alone: '完全独立解出', p_hint: '在提示下解出',
    p_not: '仍需后续巩固', time_spent: '实际辅导用时(分钟)', notes: '家长备忘笔记(下次复习重点)',
    save_complete: '保存至孩子档案', saved: '本次辅导记录已保存!', done_on: '辅导于 {date}', times: '已辅导{n}次',
    repeat: '再次辅导', prev_results: '历史辅导日志', by_week: '按大纲周次', by_subject: '按学科模块',
    by_method: '按教学法体系', weekly_activity: '每周辅导节数', badges: '数学能力勋章', history: '教学记录历史',
    no_history: '暂无已完成的辅导记录。', soon: '即将推出', puzzle_stat: '独立攻克的谜题',
    delete: '删除', language: '语言', profiles: '孩子档案', add_child: '添加孩子档案', name: '孩子姓名',
    active: '当前辅导中', switch: '选择', weekly_goal: '每周辅导目标(课数)', data: '数据与备份',
    export: '导出孩子学习记录', import: '导入备份数据', reset: '清除全部数据',
    confirm_delete: '确定删除此孩子的档案以及所有辅导记录吗?', confirm_reset: '确定清除此设备上的全部教学数据吗?',
    confirm_del_run: '删除这条教学记录?', imported: '辅导记录导入成功。', import_fail: '文件格式无效。',
    install: '安装家长工作台 PWA', offline_ready: '完全支持离线使用', welcome: '欢迎使用 Antigravity 家长教学工作台',
    welcome_text: '为孩子创建一份专属档案,即可获取逐字逐句的详尽教案并系统记录思维成长。', create: '创建档案',
    loading_err: '无法加载课程数据库。', age: '适龄阶段', lessons_n: '{done}/{total} 节课已完成',
    b_first: '完成首次辅导', b_week: '第{n}周大纲通关', b_three: '一周完成3次辅导',
    b_streak3: '连续3周坚持教学', b_puzzles5: '独立解出5道挑战题', b_all: '第1月全课程通关',
    parent_note: '家长逐字讲稿', activity: '实操活动', prompt: '谜题题干', step_of: '第{n}步,共{total}步',
    teacher_guide: '家长与教师教学手册', toggle_teacher: '教学重点与应对技巧',
    lesson_architecture: '通用五步教学架构', how_to_explain: '如何讲解与核心要点',
    common_mistakes: '警惕易错点与认知陷阱', socratic_prompt: '苏格拉底式启发提问',
    tier_tasks: '分层练习题库', phase1: '1. 快速口算热身 (5分钟)', phase2: '2. 概念讲授 (8-10分钟)',
    phase3: '3. 动手探索 (10-12分钟)', phase4: '4. 分层练习 (10-12分钟)', phase5: '5. 挑战谜题 (5-8分钟)',
    parent_script_badge: '🗣️ 请字正腔圆念给孩子听', parent_action_badge: '✋ 家长动手教具操作',
    diagnostic_tip_badge: '⚠️ 孩子卡壳时的应对引导', materials_badge: '🎒 课前所需实物道具',
    filter_grade: '学段年级', filter_category: '学科分类', all_grades: '全部学段', all_categories: '全部分类',
    select_grade: '请选择学段与年级', choose_grade: '选择年级', current_grade: '当前年级', switch_grade: '切换年级',
    school_year_roadmap: '全学年课程大纲 (36周 · 每周2课)', school_year: '学年大纲 (36周)',
    term_all: '全部 36 周', term_1: '第1学段: 概念奠基 (1–9周)', term_2: '第2学段: 结构拓展 (10–18周)',
    term_3: '第3学段: 算法与空间 (19–27周)', term_4: '第4学段: 奥数通关 (28–36周)',
    term_tag_1: '🍂 第1学段', term_tag_2: '❄️ 第2学段', term_tag_3: '🌱 第3学段', term_tag_4: '☀️ 第4学段',
    lesson_a: 'A课: 概念启发与探索', lesson_b: 'B课: 奥数挑战与思维',
    two_lessons_per_week: '每周2课学年节奏', teleprompter_mode: '家长实时提词模式', child_grade: '孩子当前年级',
    grade_overview: '阶段教学目标与学科框架',
  },
};

export const CATS = {
  Counting: { en: 'Counting', ru: 'Счёт', zh: '数数' },
  Arithmetic: { en: 'Arithmetic', ru: 'Арифметика', zh: '算术' },
  Geometry: { en: 'Geometry', ru: 'Геометрия', zh: '几何' },
  Time: { en: 'Time', ru: 'Время', zh: '时间' },
  Logic: { en: 'Logic', ru: 'Логика', zh: '逻辑' },
  Algebra: { en: 'Algebra', ru: 'Алгебра', zh: '代数' },
  Probability: { en: 'Probability', ru: 'Вероятность', zh: '概率' },
  'Computer Science': { en: 'Computer Science', ru: 'Информатика', zh: '计算机科学' },
  'Math Analysis': { en: 'Math Analysis', ru: 'Матанализ', zh: '数学分析' },
};

export const METHODS = {
  'USSR (Kiselev)': { en: 'USSR (Kiselev)', ru: 'СССР (Киселёв)', zh: '苏联(基谢廖夫)' },
  Chinese: { en: 'Chinese', ru: 'Китайская', zh: '中国' },
  Oxford: { en: 'Oxford', ru: 'Оксфорд', zh: '牛津' },
};

export const GRADES = [
  {
    id: 'prek',
    icon: '🧸',
    ages: '3–4',
    name: { en: 'Pre-K', ru: 'Младшая группа', zh: '幼儿园小/中班' },
    desc: {
      en: 'Play-based sensory exploration with household toys and hands-on games to build early number intuition and spatial vocabulary.',
      ru: 'Игровое сенсорное исследование с домашними игрушками для развития раннего чувства числа и пространственной речи.',
      zh: '通过生活玩具与亲子游戏开展感官探索,建立早期数感与空间方位词汇。'
    },
    pillars: [
      {
        en: 'Numbers & quantities (1–10): Matching one-to-one, instant recognition of 1–3, and counting on fingers up to 10.',
        ru: 'Числа и количества (1–10): сопоставление один к одному, мгновенное узнавание 1–3 и счёт на пальчиках до 10.',
        zh: '数量与数感 (1–10): 一一配对比较、1–3瞬间识数,以及用小手点数到10。'
      },
      {
        en: 'Shapes & spatial play: Circles, squares, triangles, 3D balls vs. blocks, inside/outside, and simple AB patterns.',
        ru: 'Фигуры и пространство: круги, квадраты, треугольники, шар и куб, внутри/снаружи и простые ритмичные узоры AB.',
        zh: '图形与空间游戏: 认识圆、正方形、三角形、球与积木,区分里外上下及简单AB交替规律。'
      },
      {
        en: 'Early logic & talk: Sorting by color and size, fair sharing, and answering playful "why?" questions aloud.',
        ru: 'Логика и речь: сортировка по цвету и размеру, честный делёж поровну и устные ответы на вопросы «почему?».',
        zh: '早期逻辑与表达: 按颜色大小分类、公平分物,并在游戏中大声说出自己的想法。'
      }
    ]
  },
  {
    id: 'kindergarten_01',
    icon: '🎨',
    ages: '5–6',
    name: { en: 'Kindergarten', ru: 'Подготовительный', zh: '幼儿园大班/幼小衔接' },
    desc: {
      en: 'Classes use child-initiated play, manipulatives, and hands-on activities to build early abstract reasoning.',
      ru: 'Занятия строятся на живой игре, наглядных предметах и практических действиях для развития раннего абстрактного мышления.',
      zh: '课程采用孩子主导的游戏、实物教具与动手操作活动,培养早期抽象推理能力。'
    },
    pillars: [
      {
        en: 'Numbers and connections: Exploring quantities, relationships between numbers, ten-frames, and basic number sense (1–20).',
        ru: 'Числа и связи: исследование количеств, отношений между числами, рамки десяти и базового чувства числа (1–20).',
        zh: '数与联系: 探索数量含义、数字间的分合关系、十格框结构与基本数感 (1–20)。'
      },
      {
        en: 'Geometry and patterns: Identifying geometric shapes, spatial relationships, symmetry, and recognizing repeating or growing patterns.',
        ru: 'Геометрия и закономерности: распознавание геометрических фигур, пространственных отношений, симметрии и повторяющихся или растущих узоров.',
        zh: '几何与规律: 识别平面与立体图形、空间方位关系、对称性,以及发现重复规律与递增规律。'
      },
      {
        en: 'Logic and math language: Solving visual logic puzzles, discussing mathematical ideas aloud, and practicing problem-posing and problem-solving.',
        ru: 'Логика и математическая речь: решение наглядных логических задач, обсуждение идей вслух и самостоятельное составление и решение задач.',
        zh: '逻辑与数学语言: 解决视觉逻辑谜题、大声讨论数学想法,并练习自己编题与解题。'
      }
    ]
  },
  {
    id: 'elem_g1',
    icon: '🎒',
    ages: '6–7',
    name: { en: 'Grade 1', ru: '1 класс', zh: '小学一年级' },
    desc: {
      en: 'First-grade lessons transition from concrete models to pictorial representations and early structured problem-solving.',
      ru: 'Уроки 1 класса обеспечивают плавный переход от предметных моделей к наглядным схемам и структурированному решению задач.',
      zh: '一年级课程从具象实物模型平稳过渡到图形表征(线段图/条形图)与早期结构化问题解决。'
    },
    pillars: [
      {
        en: 'Number operations: Building fluency with addition, subtraction, Make-a-Ten / Break-a-Ten, and place value strategies rather than memorizing algorithms.',
        ru: 'Действия с числами: развитие беглости сложения и вычитания, счёта через десяток и понимания разрядов вместо механической зубрёжки.',
        zh: '数的运算: 通过凑十法、破十法与数位拆分策略建立加减法灵活数感,而非死记硬背竖式套路。'
      },
      {
        en: 'Early algebraic thinking: Introduction to unknown quantities, simple equations, and balancing relationships on scales.',
        ru: 'Раннее алгебраическое мышление: знакомство с неизвестными величинами, простыми уравнениями и равновесием на весах.',
        zh: '早期代数思维: 引入未知量概念、简单天平方程与等量平衡关系。'
      },
      {
        en: 'Word problems and geometry: Breaking down multi-step logic puzzles with pictorial models, exploring properties of 2D shapes, and practicing clear mathematical communication.',
        ru: 'Текстовые задачи и геометрия: разбор многошаговых задач со схемами, исследование свойств плоских фигур (2D) и развитие точной математической речи.',
        zh: '应用题与几何: 用图示拆解多步逻辑应用题、探索二维平面图形特征,并练习清晰的数学说理。'
      }
    ]
  },
  {
    id: 'elem_g2',
    icon: '🚀',
    ages: '7–8',
    name: { en: 'Grade 2', ru: '2 класс', zh: '小学二年级' },
    desc: {
      en: 'Second grade branches into three distinct placement tiers (Accelerated for new students, Advanced for returning students, and Honors for competition-track students).',
      ru: 'Программа 2 класса включает три уровня глубины: Accelerated (для новых учеников), Advanced (для продолжающих) и Honors (олимпиадный трек и «Кенгуру»).',
      zh: '二年级分为三个进阶层次: Accelerated (新生加速班)、Advanced (进阶提高班) 与 Honors (数学袋鼠竞赛与数论尖子班)。'
    },
    tiers: [
      { badge: '⚡ Accelerated', en: 'New students: Core concepts & visual models', ru: 'Новые ученики: базовые модели и алгоритмы', zh: '新生加速: 核心概念与直观建模' },
      { badge: '🚀 Advanced', en: 'Returning students: Multi-step fluency', ru: 'Продолжающие: многошаговые задачи', zh: '进阶提高: 多步运算与逆向思维' },
      { badge: '🏆 Honors (Math Kangaroo)', en: 'Competition track: Number theory & Olympiad puzzles', ru: 'Олимпиадный трек: теория чисел и «Кенгуру»', zh: '荣誉尖子: 数论启蒙与袋鼠数学竞赛' }
    ],
    pillars: [
      {
        en: 'Arithmetic and fractions: Multi-digit addition and subtraction with regrouping, introduction to multiplication and division, and foundational concepts of fractions.',
        ru: 'Арифметика и дроби: сложение и вычитание многозначных чисел с переходом, введение в умножение и деление, основы понятия дроби.',
        zh: '算术与分数: 多位数进退位加减、乘法与除法概念建立,以及分数的初步认识。'
      },
      {
        en: 'Algebra and variables: Modeling word problems with variables and bar diagrams, and solving basic linear equations (ax + b = c).',
        ru: 'Алгебра и переменные: моделирование текстовых задач с переменными и схемами отрезков, решение линейных уравнений.',
        zh: '代数与变量: 用字母变量和条形线段图建立应用题模型,求解基础一元一次方程。'
      },
      {
        en: 'Geometry: Measuring and calculating the perimeter and area of geometric shapes alongside exploring angles and shape properties.',
        ru: 'Геометрия: измерение и вычисление периметра и площади геометрических фигур, исследование углов и свойств многоугольников.',
        zh: '几何度量: 测量并计算几何图形的周长与面积,深入探索角与多边形的几何性质。'
      },
      {
        en: 'Number theory (Honors): Early introduction to number theory (parity, divisibility, primes, remainders) and preparation for competitions like Math Kangaroo.',
        ru: 'Теория чисел (Honors): раннее введение в теорию чисел (чётность, делимость, простые числа, остатки) и подготовка к олимпиаде «Кенгуру» (Math Kangaroo).',
        zh: '数论与竞赛 (Honors): 早期数论启蒙(奇偶性、整除特征、素数、余数周期)与袋鼠数学竞赛 (Math Kangaroo) 专项备战。'
      }
    ]
  },
  {
    id: 'elem_g3',
    icon: '💡',
    ages: '8–9',
    name: { en: 'Grade 3', ru: '3 класс', zh: '小学三年级' },
    desc: {
      en: 'Third grade deepens structural reasoning across multi-digit operations, geometric area proofs, fraction equivalence, and Olympiad problem-solving.',
      ru: 'В 3 классе углубляется структурное мышление: многозначное умножение и деление, доказательства площадей, свойства дробей и олимпиадные методы.',
      zh: '三年级深化结构化推理: 多位数乘除竖式、多边形面积割补证明、分数基本性质与奥数解题方法。'
    },
    pillars: [
      {
        en: 'Multi-digit operations & fractions: Area-model multiplication, long division, equivalent fractions, and decimals on the metric ruler.',
        ru: 'Многозначные числа и дроби: умножение через площадь, деление уголком, основное свойство дроби и десятичные дроби.',
        zh: '多位数运算与分数: 面积模型乘法、长除法竖式、同分母与异分母分数加减及小数初步。'
      },
      {
        en: 'Algebraic equations & motion: Two-step equations with parentheses, working-backwards chains, and speed-time-distance relationships (s = v × t).',
        ru: 'Алгебра и движение: уравнения со скобками, метод решения с конца и задачи на встречное движение и скорость (s = v × t).',
        zh: '代数方程与行程: 含括号的两步方程、逆向还原倒推法,以及速度、时间、路程相遇追及问题。'
      },
      {
        en: 'Geometry & Olympiad logic: Areas of triangles, parallelograms, and trapezoids, 3D cuboid volume, combinatorics, and the Pigeonhole Principle.',
        ru: 'Геометрия и олимпиадная логика: площади треугольника, параллелограмма и трапеции, объём параллелепипеда, комбинаторика и принцип Дирихле.',
        zh: '几何证明与奥数: 三角形、平行四边形与梯形面积推导,长方体体积,排列计数与抽屉原理。'
      }
    ]
  },
  {
    id: 'elem_g4',
    icon: '🏛️',
    ages: '9–10',
    name: { en: 'Grade 4', ru: '4 класс', zh: '小学四年级' },
    desc: {
      en: 'Fourth grade prepares students for middle-school honors math and Olympiads through systems of equations, deductive geometry proofs, number theory, and probability.',
      ru: '4 класс готовит к олимпиадной математике средней школы: системы уравнений, строгие геометрические доказательства, теория чисел и вероятность.',
      zh: '四年级全面衔接高阶思维与数学竞赛: 二元一次方程组、严谨几何定理证明、数论体系与多步概率。'
    },
    pillars: [
      {
        en: 'Algebra & rational numbers: Systems of linear equations (substitution & elimination), negative numbers, inequalities, percentages, and fraction multiplication/division.',
        ru: 'Алгебра и рациональные числа: системы линейных уравнений, отрицательные числа, неравенства, проценты, умножение и деление дробей.',
        zh: '代数与有理数: 二元一次方程组(代入与加减消元)、正负数运算、不等式、百分数及分数乘除法。'
      },
      {
        en: 'Deductive geometry: Euclidean angle-sum and exterior-angle proofs, the Pythagorean theorem (3-4-5), similar triangles, and circle/cylinder area & volume.',
        ru: 'Дедуктивная геометрия: доказательство суммы углов треугольника, теорема Пифагора, подобие треугольников, площадь круга и объём цилиндра.',
        zh: '演绎几何: 三角形内角和与外角定理严格证明、勾股定理、相似三角形及圆与柱体体积。'
      },
      {
        en: 'Number theory, combinatorics & proofs: Primes, GCD/LCM (Euclid\'s algorithm), modular arithmetic, Pascal\'s triangle combinations, and proof by contradiction.',
        ru: 'Теория чисел, комбинаторика и доказательства: простые числа, алгоритм Евклида (НОД/НОК), модулярная арифметика, треугольник Паскаля и доказательство от противного.',
        zh: '数论、组合与严密证明: 素数筛法、辗转相除法(最大公因数)、同余模算术、杨辉三角组合数与反证法。'
      }
    ]
  }
];

export function t(lang, key, vars) {
  let s = (UI[lang] && UI[lang][key]) || UI.en[key] || key;
  if (vars) for (const k in vars) s = s.replaceAll('{' + k + '}', vars[k]);
  return s;
}
