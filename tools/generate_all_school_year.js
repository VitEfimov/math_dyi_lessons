import fs from 'node:fs';

const tr = (en, ru, zh) => ({ en, ru, zh });

// Import syllabus definitions from build_school_year.js
const { SYLLABUS } = await import('./build_school_year.js');

const terms = {
  "1": { name: tr("Term 1: Foundations", "1-я четверть: Основы", "第1学段: 概念奠基"), weeks: [1,2,3,4,5,6,7,8,9] },
  "2": { name: tr("Term 2: Core Expansion", "2-я четверть: Развитие", "第2学段: 结构拓展"), weeks: [10,11,12,13,14,15,16,17,18] },
  "3": { name: tr("Term 3: Logic & Space", "3-я четверть: Логика и геометрия", "第3学段: 算法与空间"), weeks: [19,20,21,22,23,24,25,26,27] },
  "4": { name: tr("Term 4: Olympiad Mastery", "4-я четверть: Олимпиадный финал", "第4学段: 奥数与通关"), weeks: [28,29,30,31,32,33,34,35,36] }
};

const stages = [
  { id: "prek", ages: "3–4", name: tr("Pre-K", "Младшая группа", "幼儿园小/中班"), icon: "🧸", desc: tr("Sorting by color & size, counting 1–10 with toys, basic shapes, and simple AB patterns", "Сортировка по цвету и размеру, счёт от 1 до 10 на игрушках, простые фигуры и узоры", "按颜色与大小分类、1–10实物数数、认识基本图形与简单规律") },
  { id: "kindergarten_01", ages: "5–6", name: tr("Kindergarten", "Подготовительный", "幼儿园大班/幼小衔接"), icon: "🎨", desc: tr("Counting 1–20, ten-frames, adding & subtracting within 10, flat & 3D shapes, clock hours, and coins", "Счёт до 20, десяток, сложение и вычитание в пределах 10, фигуры, часы и монеты", "1–20数数与比较、十格框、10以内加减法、平面与立体图形、认钟表与硬币") },
  { id: "elem_g1", ages: "6–7", name: tr("Grade 1", "1 класс", "小学一年级"), icon: "🎒", desc: tr("Numbers to 100, make-a-ten addition & subtraction, ruler measurement in cm, time, and missing-number puzzles", "Числа до 100, счёт через десяток, измерение линейкой в см, время и задачи с окошком", "100以内数的认识、凑十法与破十法、厘米直尺测量、认识时间与填未知数") },
  { id: "elem_g2", ages: "7–8", name: tr("Grade 2", "2 класс", "小学二年级"), icon: "🚀", desc: tr("Two-digit addition & subtraction with regrouping, multiplication & division tables, perimeter, and bar models", "Сложение и вычитание в столбик с переходом, таблица умножения и деления, периметр и схемы", "两位数进退位竖式加减、九九乘法与表内除法、图形周长与线段图应用题") },
  { id: "elem_g3", ages: "8–9", name: tr("Grade 3", "3 класс", "小学三年级"), icon: "💡", desc: tr("Multi-digit multiplication & long division, area of rectangles, fractions, two-step equations, and motion problems", "Многозначное умножение и деление уголком, площадь, дроби, двухшаговые уравнения и задачи на движение", "多位数乘除竖式、长方形面积、分数初步、两步方程与行程问题") },
  { id: "elem_g4", ages: "9–10", name: tr("Grade 4", "4 класс", "小学四年级"), icon: "🏛️", desc: tr("Decimals & fractions, angles & triangles, area of polygons, factors & multiples, and Olympiad logic", "Десятичные и обыкновенные дроби, углы и треугольники, площади фигур, делимость и олимпиадная логика", "小数与分数运算、角与三角形内角和、多边形面积、因数与倍数及奥数逻辑") }
];

// Write data/index.json
const indexData = {
  files: [
    "curriculum_prek.json",
    "curriculum.json",
    "curriculum_elementary.json"
  ],
  stages,
  terms,
  weeks: SYLLABUS
};

fs.writeFileSync('data/index.json', JSON.stringify(indexData, null, 2), 'utf8');
console.log('data/index.json written with 36 weeks for all 6 grades!');
