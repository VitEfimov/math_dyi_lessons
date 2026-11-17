import fs from 'node:fs';
import { SYLLABUS } from './build_school_year.js';

const tr = (en, ru, zh) => ({ en, ru, zh });

// Load archived handcrafted Kindergarten lessons so we can preserve their rich text
const archiveK = JSON.parse(fs.readFileSync('data/archive/curriculum.json', 'utf8'));
const byOldId = {};
for (const l of archiveK.curriculum.stages[0].lessons) {
  byOldId[l.lesson_id] = l;
}

// 36-week specifications for Kindergarten (Ages 5-6)
const K_SPECS = {
  1: {
    catA: "Counting", methA: "USSR (Kiselev)", catB: "Logic", methB: "USSR (Kiselev)",
    oldA: "k01_w1_l1", oldB: "k01_w1_l3",
    prop: tr("5 spoons, 3 forks, 4 blocks, and a yarn loop", "5 ложек, 3 вилки, 4 кубика и кольцо из шерстяной нити", "5把勺子、3把叉子、4块积木和1个毛线圈"),
    def: tr("A set is a collection defined by an unambiguous rule: every object either belongs to the set or does not; logical operators NOT, AND, OR refine set membership.", "Множество задаётся однозначным правилом: каждый предмет либо входит в него, либо нет; связки НЕ, И, ИЛИ уточняют правило.", "集合由明确唯一的规则定义: 任何事物要么属于该集合,要么不属于;逻辑词“非、且、或”可精确组合集合条件。")
  },
  2: {
    catA: "Arithmetic", methA: "USSR (Kiselev)", catB: "Counting", methB: "USSR (Kiselev)",
    oldA: "k01_w1_l2",
    prop: tr("6 cups, 6 spoons, and 8 buttons in two rows", "6 чашек, 6 ложек и 8 пуговиц в два ряда", "6个杯子、6把勺子以及排成两排的8颗纽扣"),
    def: tr("Two sets are equinumerous (equal in number) if and only if their elements can be paired one-to-one with zero leftovers; stretching or compressing a row does not alter cardinality.", "Два множества равномощны (равны по числу), если между их элементами есть взаимно однозначное соответствие без остатка; растягивание ряда не меняет количество.", "当且仅当两个集合的元素能一一配对且无任何剩余时,两集合等势(数量相等);拉长或聚拢排列绝不改变数量(守恒律)。"),
    taskB: tr("line up 6 red buttons tightly and 6 blue buttons spread wide apart, then connect each red button to a blue partner with toothpicks to defeat the visual illusion", "выложить 6 красных пуговиц тесно, а 6 синих — широко, и соединить каждую пару зубочистками, разоблачив зрительную иллюзию", "将6颗红纽扣紧密排列、6颗蓝纽扣稀疏拉长,用牙签将红蓝纽扣一一连线配对,破除“排得长就更多”的视觉错觉"),
    puzB: tr("Row A has 6 coins touching each other. Row B has 5 coins spread far apart so Row B looks longer. Which row actually has MORE coins?", "В ряду А лежат 6 монет вплотную, а в ряду Б — 5 монет широко друг от друга, так что ряд Б длиннее. В каком ряду монет БОЛЬШЕ?", "A排有6枚硬币紧紧挨着,B排有5枚硬币远远拉开显得更长。哪一排的硬币实际上更多?"),
    solB: tr("Row A has more (6 > 5)! Pairing each coin in Row B with a coin in Row A leaves 1 extra coin in Row A. Length of a row does not equal number of items.", "В ряду А больше (6 > 5)! Если соединить монеты парами, в ряду А останется 1 лишняя монета. Длина ряда не равна числу предметов.", "A排更多(6 > 5)!将两排硬币一一配对后,A排还多出1枚硬币。排队的长度不代表数量的多少。")
  },
  3: {
    catA: "Counting", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "Chinese",
    prop: tr("groups of 4 toy cars, 4 spoons, 4 blocks, and dot cards", "группы из 4 машинок, 4 ложек, 4 кубиков и карточки с точками", "4辆玩具车、4把勺子、4块积木以及圆点卡"),
    def: tr("Kiselev definition of Number: a natural number is the shared property of all sets that can be placed in one-to-one correspondence with each other (e.g., 'Four' is what 4 cars, 4 claps, and 4 corners have in common).", "Определение числа по Киселёву: число есть общее свойство всех равномощных множеств («Четыре» — это общее у 4 машинок, 4 хлопков и 4 углов квадрата).", "基谢廖夫“数”的定义: 自然数是所有彼此能建立一一对应的等势集合的共同属性(例如“4”是4辆小车、4次拍手与正方形4个角的共同属性)。"),
    taskA: tr("build three completely different sets—4 spoons, 4 Lego bricks, and 4 pebbles—and verify by one-to-one pairing that all three share the exact same number: 4", "собрать три разных множества — 4 ложки, 4 кубика лего и 4 камешка — и попарным сопоставлением доказать, что все они выражают одно и то же число 4", "摆出三个完全不同材质的集合(4把勺子、4块乐高、4颗石子),通过一一对应证明它们拥有完全相同的数属性: 4"),
    puzA: tr("What do 3 big elephants, 3 tiny ants, and 3 loud bell rings have in common, even though elephants are huge and bell rings are invisible?", "Что общего у 3 огромных слонов, 3 крошечных муравьёв и 3 ударов колокола, хотя слоны большие, а звуки вообще невидимы?", "3头巨大的大象、3只微小的蚂蚁和3声看不见的钟声,尽管外观完全不同,它们却拥有什么共同的数学属性?"),
    solA: tr("They all share the number THREE (3)! Each elephant can be paired with one ant and one bell ring with zero leftovers.", "У них общее число ТРИ (3)! Каждого слона можно поставить в пару с одним муравьём и одним ударом колокола без остатка.", "它们拥有共同的基数属性——数字“3”!每头大象都能与1只蚂蚁、1声钟声建立一一对应而毫无剩余。"),
    taskB: tr("translate the same number (from 1 to 6) across four representations: physical counters, dot arrays, tally marks, and Arabic numerals", "переводить одно и то же число (от 1 до 6) между четырьмя формами: предметы, точечный массив, палочки-счёт и арабская цифра", "将1至6的同一个数在四种表征间自由转换: 实物筹码、点阵图、计数正字/竖线与阿拉伯数字"),
    puzB: tr("I clap my hands 5 times with your eyes closed. How many blocks must you place on the table so the set of blocks equals the set of claps?", "Я хлопнул в ладоши 5 раз, пока твои глаза были закрыты. Сколько кубиков нужно поставить на стол, чтобы множество кубиков было равно множеству хлопков?", "你闭上眼睛听我拍了5下手。你要在桌上放几块积木,才能让“积木的集合”与刚才“拍手的集合”数量相等?"),
    solB: tr("5 blocks! One block for each clap creates a one-to-one bijection of cardinality 5.", "5 кубиков! По одному кубику на каждый услышанный хлопок — получится ровно 5.", "5块积木!每一下拍手对应1块积木,建立起基数为5的一一对应。")
  },
  4: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "USSR (Kiselev)",
    oldA: "k01_w3_l1",
    prop: tr("a piece of string, a straight ruler, paper, and 2 pencils", "верёвочка, прямая линейка, бумага и 2 карандаша", "一根细绳、一把直尺、白纸和2支铅笔"),
    def: tr("Kiselev Straight Line Axiom: through any two distinct points, one and only one straight line can be drawn; the portion between the two endpoints is a line segment, which is the shortest path.", "Аксиома прямой Киселёва: через две точки можно провести только одну прямую; её часть между двумя точками — отрезок (кратчайший путь).", "基谢廖夫直线公理: 经过任意两个不同的点,有且仅有一条直线;两点之间的直线部分称为“线段”,它是连接两点的最短路径。"),
    taskB: tr("mark two points A and B on paper, draw the unique straight segment AB with a ruler, and use a taut string to compare its length against two curved paths", "отметить на бумаге точки А и Б, провести по линейке единственный отрезок АБ и с помощью нити сравнить его длину с двумя кривыми дорожками", "在纸上标出A、B两点,用直尺画出唯一的直线段AB,再用细绳比量线段AB与另外两条弯曲路径的长度"),
    puzB: tr("Two ants walk from Point A to Point B. Ant 1 walks along the straight ruler line. Ant 2 walks along a zigzag line at the exact same speed. Who arrives at Point B first?", "Два муравья вышли из точки А в точку Б с одинаковой скоростью. Первый идёт по прямой линии линейки, второй — по ломаной зигзагом. Кто придёт в Б первым?", "两只蚂蚁以完全相同的速度从A点走向B点。1号蚂蚁沿着直尺画出的线段走,2号蚂蚁沿着折线走。谁会先到达B点?"),
    solB: tr("Ant 1! Because the straight line segment is strictly the shortest distance between two points.", "Первый муравей! Потому что прямой отрезок — строго кратчайшее расстояние между двумя точками.", "1号蚂蚁先到!因为两点之间线段最短,走直线路程最少。")
  },
  5: {
    catA: "Counting", methA: "Chinese", catB: "Math Analysis", methB: "Chinese",
    oldA: "k01_w2_l1", oldB: "k01_w2_l3",
    prop: tr("a 2x5 ten-frame, 10 two-color counters, and dot cards", "рамка десяти 2×5, 10 двухцветных фишек и карточки с точками", "2×5十格框、10枚双色圆片和点阵卡"),
    def: tr("Instant subitizing and ten-frame structure: numbers 1–10 are seen structurally through the 5-row anchor (6=5+1, 7=5+2, 8=5+3, 9=5+4, 10=5+5).", "Мгновенная субитизация и структура рамки десяти: числа 1–10 воспринимаются через опорный ряд из 5 (6=5+1, 7=5+2, 8=5+3, 9=5+4, 10=5+5).", "快速识数与十格框空间结构: 以满排5为视觉锚点瞬间识别1-10(6=5+1, 7=5+2, 8=5+3, 9=5+4, 10=5+5)。")
  },
  6: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Oxford",
    oldA: "k01_w3_l2",
    prop: tr("a long shoelace or yarn loop, small toys, and paper mazes", "длинный шнурок или нить, мелкие игрушки и бумажные контуры", "长鞋带或毛线圈、小玩具以及纸面闭合曲线图"),
    def: tr("Jordan Curve Theorem: any simple closed curve divides the plane into two regions (interior and exterior); a path from interior to exterior must cross the boundary an odd number of times.", "Теорема Жордана: простая замкнутая кривая делит плоскость на внутреннюю и внешнюю области; переход между ними всегда пересекает границу нечётное число раз.", "若尔当闭曲线定理: 任意简单闭合曲线将平面严格分为内部与外部;从内部到外部的连线必定穿过边界奇数次。"),
    taskB: tr("draw a wiggly closed 'island' on paper, place Point A inside, and test what happens when you cross the boundary 1 time (Outside), 2 times (back Inside!), and 3 times (Outside!)", "нарисовать на бумаге замкнутый «остров», поставить точку А внутри и проверить, где окажется карандаш после 1 пересечения границы (снаружи), 2 пересечений (снова внутри!) и 3 пересечений (снаружи!)", "在纸上画一个弯曲闭合的“神秘岛”,从岛内A点出发画线: 穿过边界1次(到岛外)、穿过2次(又回岛内!)、穿过3次(在岛外!)"),
    puzB: tr("A frog starts INSIDE a closed garden fence. She jumps over the fence once, and then jumps back over the fence a second time. Is she now inside or outside the garden?", "Лягушка сидела ВНУТРИ замкнутого забора. Она перепрыгнула через забор один раз, а потом перепрыгнула через него второй раз. Где она теперь — внутри или снаружи?", "一只青蛙原本在闭合围栏的“里面”。它跳过围栏1次,接着又跳过围栏第2次。现在它在围栏里面还是外面?"),
    solB: tr("INSIDE the garden! Jump 1 takes her from Inside to Outside; Jump 2 brings her from Outside back to Inside.", "ВНУТРИ сада! Первый прыжок перенёс её изнутри наружу, а второй вернул снаружи обратно внутрь.", "在围栏里面!第1跳从里面跳到外面,第2跳又从外面跳回了里面(穿过边界偶数次回到原区域)。")
  },
  7: {
    catA: "Arithmetic", methA: "Chinese", catB: "Arithmetic", methB: "Chinese",
    oldA: "k01_w2_l2",
    prop: tr("9 beads on a rod (or counters), a ten-frame, and number bond cards", "9 бусин на спице (или фишек), рамка десяти и карточки состава числа", "9颗算珠(或圆片)、十格框和数字分合卡"),
    def: tr("Decompositions of 5, 6, 7, 8, 9: every number n can be partitioned into pairs (k, n-k); anchoring to 5 (e.g., 7=5+2, 8=5+3, 9=5+4) unlocks instant mental addition and subtraction.", "Состав чисел 5, 6, 7, 8, 9: каждое число раскладывается на пары частей; опора на пятёрку (7=5+2, 8=5+3, 9=5+4) даёт мгновенный устный счёт.", "5至9的分合结构: 每个数都可拆解为互补数对;以5为中继基准(7=5+2, 8=5+3, 9=5+4)可实现极速心算。"),
    taskB: tr("partition 6, 7, 8, and 9 using two-color counters on a ten-frame, recording all symmetric partner pairs (e.g. 8 = 7+1 = 6+2 = 5+3 = 4+4)", "разложить числа 6, 7, 8 и 9 двухцветными фишками на рамке десяти, записав все пары частей (например, 8 = 7+1 = 6+2 = 5+3 = 4+4)", "在十格框上用双色圆片系统拆解6、7、8、9的所有分合数对(如8 = 7+1 = 6+2 = 5+3 = 4+4)"),
    puzB: tr("I have 8 marbles in two pockets. Both pockets hold the EXACT same number of marbles. How many marbles are in each pocket?", "У меня 8 шариков в двух карманах, причём в обоих карманах шариков ПОРОВНУ. Сколько шариков в каждом кармане?", "我左右两个口袋里一共有8颗玻璃球,而且两个口袋里的球一样多。每个口袋里有几颗球?"),
    solB: tr("4 marbles in each pocket! Because 4 + 4 = 8 is the symmetric double decomposition of 8.", "По 4 шарика в каждом кармане! Потому что 4 + 4 = 8 — это разложение числа 8 на две равные половины.", "每个口袋里有4颗!因为8的对称双生分拆是4 + 4 = 8。")
  },
  8: {
    catA: "Arithmetic", methA: "USSR (Kiselev)", catB: "Counting", methB: "Oxford",
    prop: tr("a paper or floor number line marked 0 to 10 with equal unit steps and a jumping frog toy", "числовой луч от 0 до 10 с равными делениями и игрушечная лягушка", "标有0到10等距刻度的纸面/地垫数轴与玩具小青蛙"),
    def: tr("The Number Line starts at origin 0 and marks equal unit segments; a number N represents both the N-th point in order (ordinal) and the total count of N unit steps from 0 (cardinal distance).", "Числовой луч начинается в точке 0 и разбит равными единичными отрезками; число N показывает и номер точки по порядку, и расстояние в N шагов от нуля.", "数轴从原点0出发,按相等的单位线段依次标记;数字N既代表第N个序数位置,也代表从0出发累计走过的N个单位距离(基数)。"),
    taskA: tr("start the frog at 0 (not 1!) and count unit jumps along the segments to reach 4, then jump 3 more steps to land on 7", "поставить лягушку в точку 0 (а не в 1!) и отсчитать 4 единичных прыжка до числа 4, а затем ещё 3 прыжка до числа 7", "把小青蛙放在起点0(注意不是1!),数出4个单位步跳到4,再继续向前跳3步落到7"),
    puzA: tr("A kangaroo stands at 0 on the number line. Each hop is 2 units long. Where does the kangaroo land after 3 hops?", "Кенгуру стоит в точке 0 на числовом луче. Каждый его прыжок равен 2 делениям. В какой точке окажется кенгуру после 3 прыжков?", "袋鼠站在数轴的起点0上,它每跳一次跨过2格。连续跳3次后,袋鼠会落在数字几上面?"),
    solA: tr("On number 6! Hop 1 lands on 2, Hop 2 lands on 4, and Hop 3 lands on 6 (2 + 2 + 2 = 6).", "В точке 6! Первый прыжок — в 2, второй — в 4, третий — в 6 (2 + 2 + 2 = 6).", "落在数字6上!第1跳到2,第2跳到4,第3跳到6(2+2+2=6)。"),
    taskB: tr("distinguish '5 cars in total' (cardinal) from 'the 5th car in line' (ordinal) using a line of 8 colored toy cars", "различить «всего 5 машинок» (количественное число) и «5-я машинка по счёту» (порядковое число) на ряду из 8 машинок", "用排成一队的8辆不同颜色玩具车,严格区分“圈出前5辆车(基数总量)”与“只指出第5辆车(序数位置)”"),
    puzB: tr("In a race of runners, Anna is running in 4th place. How many runners are ahead of Anna?", "В забеге Аня бежит на 4-м месте. Сколько бегунов бегут ВПЕРЕДИ Ани?", "在跑步比赛中,安娜目前排在第4名。请问有几名选手跑在安娜的前面?"),
    solB: tr("3 runners (1st, 2nd, and 3rd place)! The 4th runner has 4 - 1 = 3 runners ahead of her.", "3 бегуна (1-й, 2-й и 3-й)! Перед 4-м местом находятся 4 − 1 = 3 человека.", "有3名选手(第1名、第2名、第3名)!排在第4名意味着前面有4 - 1 = 3个人。")
  },
  9: {
    catA: "Logic", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Chinese",
    prop: tr("2 overlapping yarn loops (Euler circles), attribute shape cards, ten-frames, and a ruler", "2 пересекающихся кольца из нитей (круги Эйлера), карточки фигур, рамка десяти и линейка", "2个交叉的毛线圈(欧拉韦恩圈)、几何属性卡、十格框和直尺"),
    def: tr("Term 1 Capstone synthesis: Euler set diagrams, pairwise bijection, ten-frame decompositions, and straight line segments.", "Финал 1-й четверти: круги Эйлера, взаимно однозначное соответствие, состав чисел до 10 и аксиома отрезка.", "第1学段综合挑战: 欧拉集合圈、一一对应、十格框分合以及直线段公理。"),
    taskA: tr("sort 10 shape cards into two intersecting Euler circles ('Red' and 'Triangles') and verify the total count across all regions equals 10", "разложить 10 карточек фигур в два пересекающихся круга Эйлера («Красные» и «Треугольники») и проверить, что сумма во всех областях равна 10", "将10张图形卡分入两个相交的欧拉圈(“红色”与“三角形”),并验证各区域卡片数量之和恒等于10"),
    puzA: tr("In our Euler circles, there are 3 Red-Only shapes, 2 Red Triangles in the middle overlap, and 4 Non-Red Triangles. How many triangles are there in total?", "В кругах Эйлера лежат 3 красные не-треугольные фигуры, 2 красных треугольника в пересечении и 4 синих треугольника. Сколько ВСЕГО треугольников?", "在欧拉圈里,纯红非三角形有3个,中间交集里有2个红三角形,纯蓝三角形有4个。请问一共有多少个三角形?"),
    solA: tr("6 triangles in total! The Triangle circle holds the 2 Red Triangles plus the 4 Non-Red Triangles (2 + 4 = 6).", "Всего 6 треугольников! В круге треугольников лежат 2 красных и 4 синих треугольника (2 + 4 = 6).", "一共有6个三角形!三角形圈内包含中间的2个红三角形和右边的4个蓝三角形(2+4=6)。"),
    taskB: tr("use a ruler to connect 4 dots into a closed quadrilateral fence and place 8 counters inside using a 5+3 ten-frame array", "соединить по линейке 4 точки в замкнутый четырёхугольник и разместить внутри 8 фишек в виде структуры 5+3", "用直尺连接4个顶点围成闭合四边形围栏,并在其内部按5+3结构摆入8枚圆片"),
    puzB: tr("8 sheep are inside the closed fence (5 on top, 3 on bottom). If 3 sheep jump outside the fence, how many sheep remain inside?", "Внутри замкнутой ограды 8 овечек (5 в верхнем ряду и 3 в нижнем). Если 3 овечки перепрыгнут наружу, сколько останется внутри?", "闭合围栏里有8只小羊(上排5只,下排3只)。如果有3只小羊跳出围栏到了外面,围栏里面还剩几只小羊?"),
    solB: tr("5 sheep remain inside, and the total sheep (5 inside + 3 outside) is still 8!", "Внутри останется 5 овечек (весь верхний ряд), а всего овечек (5 внутри + 3 снаружи) по-прежнему 8!", "里面还剩整整齐齐的5只小羊(8-3=5),而里外小羊的总数依然是8只!")
  },
  10: {
    catA: "Arithmetic", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("two small plates, a big bowl, and 10 wooden cubes", "две маленькие тарелочки, большая миска и 10 деревянных кубиков", "两个小盘子、一个大碗和10块木积木"),
    def: tr("Axiomatic Addition (Kiselev): adding two numbers means uniting two disjoint sets into a single set; Commutative Law: A + B = B + A because uniting the same two sets in either order yields the identical union.", "Аксиома сложения (Киселёв): сложить два числа — значит объединить два непересекающихся множества; переместительный закон A + B = B + A.", "基谢廖夫加法公理: 两数相加即将两个不相交集合合并为一个并集;加法交换律 A + B = B + A,合并顺序不影响总数。"),
    taskA: tr("place 4 cubes on the left plate and 3 cubes on the right plate, slide both into the big union bowl to get 7, then swap plates (3 on left, 4 on right) to prove 4+3 = 3+4 = 7", "положить 4 кубика на левую тарелку и 3 на правую, ссыпать их в общую миску (получив 7), а затем поменять тарелки местами, доказав 4 + 3 = 3 + 4 = 7", "左盘放4块积木、右盘放3块积木,合入大碗得出4+3=7;再交换左右盘验证3+4同样等于7"),
    puzA: tr("To calculate 2 + 6 in your head, is it faster to start at 2 and count up 6 steps, or swap them to 6 + 2 and count up just 2 steps?", "Чтобы сосчитать в уме 2 + 6, как быстрее: прибавлять к 2 по одному 6 раз или поменять местами на 6 + 2 и сделать всего 2 шага?", "心算 2 + 6 时,是从2开始往上数6步快,还是利用交换律变成 6 + 2、从6往上数2步快?"),
    solA: tr("Swap to 6 + 2! By the Commutative Law, 2 + 6 = 6 + 2 = 8, and counting 2 steps from 6 (7, 8) is instant!", "Поменять на 6 + 2! По переместительному закону 2 + 6 = 6 + 2 = 8, а прибавить 2 к 6 (7, 8) можно мгновенно!", "变成 6 + 2 快得多!根据加法交换律,2+6 = 6+2 = 8,从大数6往上数2步(7、8)瞬间就能得出答案!"),
    taskB: tr("write and model addition equations with zero (e.g., 5 + 0 = 5) using an empty second plate to prove the Identity Law of 0", "смоделировать сложение с нулём (5 + 0 = 5) с помощью пустой второй тарелки, доказав свойство нуля", "用空盘子演示加0运算(如 5 + 0 = 5),直观证明零的加法恒等性"),
    puzB: tr("In basket A there are 6 apples. Basket B is completely empty (0 apples). When we pour both baskets together, how many apples do we have?", "В корзинке А лежит 6 яблок, а корзинка Б пустая (0 яблок). Сколько яблок окажется, если объединить обе корзинки?", "A篮里有6个苹果,B篮是完全空的(0个苹果)。把两个篮子合在一起,一共有几个苹果?"),
    solB: tr("6 apples! Uniting any set with the empty set leaves the set unchanged: 6 + 0 = 6.", "6 яблок! Объединение любого множества с пустым множеством не меняет его: 6 + 0 = 6.", "还是6个苹果!任何集合与空集求并集都保持原样: 6 + 0 = 6。")
  },
  11: {
    catA: "Arithmetic", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "Chinese",
    prop: tr("9 counters, a paper cup for hiding a subset, and number bond mats", "9 фишек, бумажный стаканчик для накрывания части и коврик состава числа", "9枚圆片、用来遮盖子集的纸杯以及分合垫"),
    def: tr("Axiomatic Subtraction (Kiselev): subtraction is the inverse of addition—given a whole sum S and one known part A, finding the remaining part B = S - A such that A + B = S.", "Аксиома вычитания (Киселёв): вычитание есть действие, обратное сложению — по данной сумме S и одному слагаемому A находят другое слагаемое B = S − A.", "基谢廖夫减法公理: 减法是加法的逆运算——已知整体和 S 与其中一个部分 A,求剩下的互补部分 B = S - A,使得 A + B = S。"),
    taskA: tr("start with a whole set of 8 counters, cover 3 counters with a cup (8 - 3 = 5), and lift the cup to verify that reuniting 5 + 3 restores 8", "взять целое из 8 фишек, накрыть 3 фишки стаканчиком (8 − 3 = 5), а затем поднять стаканчик, проверив, что 5 + 3 снова дают 8", "先摆出整体8枚圆片,用纸杯盖住其中3枚(8-3=5),再揭开纸杯验证5+3必定还原为8"),
    puzA: tr("If you already know that 6 + 3 = 9, what is 9 - 6 and what is 9 - 3 without counting on your fingers?", "Если ты уже знаешь, что 6 + 3 = 9, чему равны 9 − 6 и 9 − 3 без пересчёта на пальцах?", "如果你已经知道 6 + 3 = 9,不用掰手指,你能立刻说出 9 - 6 等于几、9 - 3 等于几吗?"),
    solA: tr("9 - 6 = 3, and 9 - 3 = 6! Because 9 is the whole formed by the two parts 6 and 3.", "9 − 6 = 3, а 9 − 3 = 6! Ведь 9 — это целое, состоящее из частей 6 и 3.", "9 - 6 = 3,且 9 - 3 = 6!因为整体9就是由6和3这两个部分组成的。"),
    taskB: tr("compare two sets by subtraction ('How many MORE?'): align 7 red blocks above 4 blue blocks, cancel the 4 matched pairs, and see 7 - 4 = 3 extra red blocks", "сравнить два ряда вычитанием («На сколько больше?»): поставить 7 красных кубиков над 4 синими, закрыть 4 равные пары и увидеть разность 7 − 4 = 3", "用减法解决“多几个(差值比较)”: 上排摆7红、下排对齐摆4蓝,盖住配对相等的4个后,直观看出多出 7 - 4 = 3 个"),
    puzB: tr("Masha drew 8 stars and Leo drew 5 stars. How many MORE stars did Masha draw than Leo?", "Маша нарисовала 8 звёздочек, а Лео — 5 звёздочек. На сколько БОЛЬШЕ звёздочек нарисовала Маша, чем Лео?", "玛莎画了8颗星星,里奥画了5颗星星。玛莎比里奥多画了几颗星星?"),
    solB: tr("3 more stars! Matching 5 of Masha's stars with Leo's 5 stars leaves 8 - 5 = 3 extra stars.", "На 3 звёздочки больше! Если сопоставить 5 звёзд Маши и 5 звёзд Лео, останется разность 8 − 5 = 3.", "多画了3颗星星!把相同的5颗一一对应抵消后,剩下的差就是 8 - 5 = 3 颗。")
  },
  12: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "USSR (Kiselev)",
    oldA: "k01_w3_l3",
    prop: tr("toothpicks or straws and playdough balls for vertices", "зубочистки или трубочки и шарики пластилина для вершин", "牙签或吸管、以及充当顶点的橡皮泥小球"),
    def: tr("In any closed polygon, the number of straight sides always equals the number of vertices (corners): Triangle = 3 sides & 3 vertices; Quadrilateral = 4; Pentagon = 5; Hexagon = 6.", "В любом многоугольнике число прямых сторон всегда равно числу вершин (углов): треугольник — 3, четырёхугольник — 4, пятиугольник — 5.", "在任意封闭多边形中,直边的条数恒等于顶点(角)的个数: 三角形3边3角,四边形4边4角,五边形5边5角。"),
    taskB: tr("build a 3-sided triangle, a 4-sided quadrilateral, and a 5-sided pentagon out of sticks and playdough balls, counting sides and corners for each", "собрать из палочек и шариков пластилина треугольник (3), четырёхугольник (4) и пятиугольник (5), пересчитав стороны и вершины", "用小棒和橡皮泥球依次搭建三角形(3)、四边形(4)和五边形(5),逐一核对边数与顶点数相等的规律"),
    puzB: tr("A honeybee builds a wax cell with 6 straight sides (a hexagon). Without looking at a picture, how many corners (vertices) must that cell have?", "Пчёлка построила соту из 6 прямых сторон (шестиугольник). Не глядя на картинку, сколько уголков (вершин) у этой соты?", "小蜜蜂用蜂蜡筑了一个有6条直边的蜂房(六边形)。不用看图,你能推理出这个蜂房一定有几个顶点(角)吗?"),
    solB: tr("6 corners! In every closed polygon, each side meets the next side at a vertex, so 6 sides always form 6 vertices.", "6 уголков! В любом замкнутом многоугольнике число вершин строго равно числу сторон: 6 сторон — 6 углов.", "一定有6个顶点(角)!因为封闭多边形的边数与顶点数永远相等,6条边必然围出6个角。")
  },
  13: {
    catA: "Arithmetic", methA: "Chinese", catB: "Arithmetic", methB: "Chinese",
    prop: tr("two 10-frames and 15 two-color counters", "две рамки десяти и 15 двухцветных фишек", "两个十格框和15枚双色圆片"),
    def: tr("Chinese Make-a-Ten Strategy (凑十法 còushí fǎ): to add across 10 (like 8 + 5 or 9 + 4), split the smaller number to fill the first ten-frame to 10, then add the remainder to 10.", "Китайский метод «Дополни до десяти» (凑十法): чтобы сложить с переходом через 10 (8 + 5 или 9 + 4), дополняем первое число до 10, а остаток прибавляем к десятку.", "中国经典“凑十法”(看大数,分小数,凑成十,加剩数): 计算9+4或8+5时,先拆小数把大数凑满10,再用10加剩余部分。"),
    taskA: tr("place 9 red counters in Frame 1 (1 empty space) and 4 blue counters in Frame 2; slide 1 blue counter over to complete 10, seeing 9 + 4 = 10 + 3 = 13", "выложить 9 красных фишек в первую рамку (1 пустое место) и 4 синие во вторую; перенести 1 синюю фишку до полных 10, увидев: 9 + 4 = 10 + 3 = 13", "在第1个十格框放9枚红片(差1满十),第2个框放4枚蓝片;移动1枚蓝片填满10,直观看到 9 + 4 = 10 + 3 = 13"),
    puzA: tr("To solve 9 + 6 using Make-a-Ten, how many counters does 9 need to borrow from 6 to become a full 10, and what is the final answer?", "Чтобы решить 9 + 6 методом дополнения до 10, сколько единиц число 9 должно занять у 6 до полной десятки и какой получится ответ?", "用“凑十法”计算 9 + 6 时,9需要向6借几才能凑成满10?6被借走后还剩几,最终得数是多少?"),
    solA: tr("9 borrows 1 from 6 (splitting 6 into 1 and 5). Then 9 + 1 = 10, and 10 + 5 = 15!", "9 занимает 1 у 6 (разбиваем 6 на 1 и 5). Тогда 9 + 1 = 10, и 10 + 5 = 15!", "9向6借1凑成10(把6分成1和5),10加剩下的5等于15!"),
    taskB: tr("practice 8 + 5 and 8 + 6 on the twin ten-frames: since 8 has 2 empty spaces, always split the second number into (2 and rest)", "отработать 8 + 5 и 8 + 6 на двух рамках десяти: так как у 8 не хватает 2 клеточек до 10, всегда отделяем от второго числа 2", "在双十格框上演练8加几(8+5、8+6): 因为8差2满十,所以永远把第二个数拆成“2和几”"),
    puzB: tr("8 frogs are on Log A (which holds 10 frogs) and 5 frogs are on Log B. When 2 frogs hop from Log B to fill Log A to 10, how many frogs are on both logs?", "На бревне А (вмещает 10) сидят 8 лягушек, а на бревне Б — 5 лягушек. Когда 2 лягушки перепрыгнут на бревно А до полных 10, сколько станет всего?", "A木头(能坐10只)上有8只青蛙,B木头上有5只青蛙。从B木头跳2只过去把A木头凑满10只后,一共是几只青蛙?"),
    solB: tr("13 frogs! Log A now has 10 and Log B has 5 - 2 = 3 left: 10 + 3 = 13.", "13 лягушек! На бревне А стало 10, а на бревне Б осталось 5 − 2 = 3: 10 + 3 = 13.", "一共13只!A木头凑满10只,B木头还剩 5 - 2 = 3 只,10加3等于13。")
  },
  14: {
    catA: "Arithmetic", methA: "Chinese", catB: "Counting", methB: "USSR (Kiselev)",
    prop: tr("20 drinking straws, rubber bands for bundling tens, and place-value mats (Tens | Ones)", "20 трубочек, резиночки для пучков-десятков и коврик разрядов (Десятки | Единицы)", "20根吸管、用来捆成十的橡皮筋以及“十位 | 个位”数位垫"),
    def: tr("Decimal place value for 11–20: a teen number '1N' means strictly 1 Bundle of Ten (in the left place) plus N single Ones (in the right place); 20 is 2 Tens and 0 Ones.", "Десятичный состав чисел 11–20: запись «1N» означает ровно 1 пучок-десяток (слева) и N отдельных единиц (справа); 20 — это 2 десятка и 0 единиц.", "11至20的十进制位值制原理: “十几(1N)”中的“1”在十位上代表1整捆十,“N”在个位上代表N根单根一;满20则是2捆十和0个一。"),
    taskA: tr("bundle 10 straws with a rubber band, place the bundle in the 'Tens' column, and add 1 to 9 loose straws in the 'Ones' column to build 11 through 19", "связать 10 трубочек резинкой в пучок-десяток, положить его в колонку «Десятки» и добавлять от 1 до 9 трубочек в «Единицы», получая числа 11–19", "将10根吸管用皮筋捆成1捆放入“十位”栏,再在“个位”栏依次放1至9根散吸管,亲手构建11至19"),
    puzA: tr("In the written number 14, there is a '1' and a '4'. Does the '1' mean just 1 single straw, or 1 whole bundle of 10 straws?", "В записи числа 14 стоят цифры «1» и «4». Означает ли цифра «1» всего одну трубочку или целый пучок из 10 трубочек?", "在数字“14”里,左边写着1,右边写着4。请问左边的“1”代表1根吸管,还是代表整整1大捆(10根)吸管?"),
    solA: tr("1 whole bundle of 10 straws! Because it sits in the Tens place: 14 = 10 + 4.", "Целый пучок из 10 трубочек! Потому что цифра 1 стоит на месте десятков: 14 = 10 + 4.", "代表整整1大捆(10根)吸管!因为这个1站在十位上,14 = 1个十 + 4个一 = 10 + 4。"),
    taskB: tr("add 1 more straw to 19 (1 Ten and 9 Ones): when the 10th loose straw arrives, bundle all 10 loose straws into a SECOND Ten-bundle to make 20 (2 Tens, 0 Ones)", "добавить 1 трубочку к 19 (1 десяток и 9 единиц): когда единичек стало 10, связать их во ВТОРОЙ пучок, получив 20 (2 десятка и 0 единиц)", "在19(1捆十和9根一)的基础上再添1根: 个位满10根立即捆成第2捆放入十位,变成“2个十和0个一(20)”"),
    puzB: tr("Why do we write a '0' at the end of the number 20?", "Зачем в конце числа 20 пишется цифра «0»?", "为什么数字“20”的右边个位上必须要写一个“0”?"),
    solB: tr("Because all 20 straws are tied into 2 full bundles of Ten, leaving 0 loose single straws in the Ones column!", "Потому что все 20 трубочек связаны в 2 полных десятка, а отдельных несвязанных единиц осталось ровно 0!", "因为全部20根吸管正好捆成了2整捆十,个位上散着的单根吸管是0根,0用来占位表示“0个一”!")
  },
  15: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Chinese",
    prop: tr("square paper for folding, child-safe scissors, a small mirror, and grid mats", "квадратные листы бумаги, безопасные ножницы, зеркальце и клетчатый коврик", "正方形折纸、儿童安全剪刀、小镜子和方格垫"),
    def: tr("A figure has axial symmetry if folding along a straight line (axis of symmetry) makes both halves coincide completely.", "Фигура обладает осевой симметрией, если при перегибании вдоль прямой линии (оси симметрии) обе её половинки полностью совпадают.", "轴对称定理: 若图形沿一条直线(对称轴)对折后,左右两部分的所有边与顶点完全重合,则该图形为轴对称图形。"),
    taskA: tr("fold a sheet of paper in half, draw half a pine tree against the crease, cut along the line, and unfold to reveal a symmetric tree", "сложить лист пополам, нарисовать у линии сгиба половинку ёлочки, вырезать и развернуть, получив симметричную ёлочку", "将纸对折,紧贴折痕画出半棵松树并剪下,展开后得到左右完全对称的整棵松树"),
    puzA: tr("If you cut a triangle notch out of the folded crease edge, how many corners will the hole in the middle have when you unfold the paper?", "Если на сложенном пополам листе вырезать прямо на сгибе один треугольный уголок, какая фигура-окошко появится посередине, когда мы развернём лист?", "在已经对折的纸张折痕处剪掉一个三角形缺口,把纸完全展开后,正中间的洞会有几条边(什么形状)?"),
    solA: tr("4 sides (a diamond/rhombus)! Two cut edges on the left half reflect into two matching cut edges on the right half (2 + 2 = 4).", "Четырёхугольник (ромб из 4 сторон)! Два разреза с одной стороны отразятся двумя разрезами с другой стороны (2 + 2 = 4).", "4条边(菱形/四边形)!折痕左侧的2条剪边会在右侧镜像对称出另外2条边(2+2=4)。"),
    taskB: tr("test how many lines of symmetry a Square has vs a Rectangle by folding along vertical, horizontal, and diagonal lines", "проверить перегибанием, сколько осей симметрии у квадрата и сколько у неквадратного прямоугольника (по вертикали, горизонтали и диагонали)", "通过上下、左右和斜向对折实验,对比正方形与普通长方形各有几条对称轴"),
    puzB: tr("When you fold a long non-square rectangle diagonally from corner to corner, do the two halves match up, or do the corners stick out?", "Если сложить длинный прямоугольник (не квадрат) наискосок с угла на угол, совпадут ли половинки или уголки будут торчать?", "把一张长长的普通长方形纸斜着沿对角线折过去,两边能完全重合吗,还是会有角露在外面?"),
    solB: tr("The corners stick out! A non-square rectangle is symmetric vertically and horizontally (2 axes), NOT along its diagonal; a square matches along all 4 axes!", "Уголки будут торчать! У обычного прямоугольника только 2 оси симметрии (поперёк и вдоль), а у квадрата совпадают и диагонали (всего 4 оси)!", "角会错开露在外面!因为普通长方形邻边不等长,只有上下、左右2条对称轴;而正方形四边相等,连对角线也能重合(共4条对称轴)!")
  },
  16: {
    catA: "Geometry", methA: "Chinese", catB: "Logic", methB: "Oxford",
    prop: tr("colored blocks (Red, Blue, Yellow) for repeating patterns and Lego bricks for growing staircase towers", "цветные кубики (красные, синие, жёлтые) для повторяющихся узоров и лего для растущей лесенки", "用于摆重复规律的彩色积木(红、蓝、黄)与用于搭递增阶梯塔的乐高块"),
    def: tr("Repeating Patterns vs. Growing Patterns: a Repeating Pattern cycles the same core unit over and over (AB-AB or ABB-ABB); a Growing Pattern increases by a steady amount at each step (like a staircase growing by +1 block: 1, 2, 3, 4, 5!).", "Повторяющиеся и растущие узоры: в повторяющемся узоре один и тот же блок идёт по кругу (АБ-АБ или АББ-АББ), а в растущем узоре каждый следующий шаг увеличивается по правилу (например, лесенка +1 кубик: 1, 2, 3, 4, 5!).", "重复规律与递增规律: “重复规律”是同一个核心节拍循环出现(如 AB、ABB);“递增规律(生长模式)”则是每一步按固定数量不断长大(如每次多1块积木的阶梯塔: 1, 2, 3, 4, 5!)。"),
    taskA: tr("build and chant a 2-color AB pattern (Red-Blue-Red-Blue) and a 3-item ABB pattern (Clap-Tap-Tap, Clap-Tap-Tap), then cover 1 middle piece and ask which piece is hiding", "выложить и пропеть узор АБ (Красный-Синий) и узор АББ (Хлопок-Топ-Топ), а затем спрятать 1 фигурку в середине и угадать её по ритму", "摆出并拍手念出 AB 规律(红-蓝-红-蓝)与 ABB 规律(拍手-跺脚-跺脚),再遮住中间一个积木让孩子推理藏着什么颜色"),
    puzA: tr("Look at this necklace pattern: Circle, Square, Square, Circle, Square, Square, Circle, [?]. What shape comes next?", "Посмотри на бусы: Круг, Квадрат, Квадрат, Круг, Квадрат, Квадрат, Круг, [?]. Какая фигура идёт следующей?", "观察这串项链的规律: 圆、方、方、圆、方、方、圆、[?]。请问下一个应该穿什么形状?"),
    solA: tr("A Square! The repeating core unit is 'Circle, Square, Square' (ABB), so after Circle comes Square.", "Квадрат! Повторяющееся звено — «Круг, Квадрат, Квадрат» (АББ), значит после Круга идёт Квадрат.", "正方形!因为重复的核心节拍是“圆、方、方”(ABB),所以在圆后面紧跟着的是方。"),
    taskB: tr("build a Growing Staircase Pattern with Lego towers of heights 1, 2, 3, and 4, and ask your child to predict and build the 5th and 6th towers", "построить растущий узор-лесенку из башенок высотой 1, 2, 3 и 4 кубика и попросить ребёнка предсказать и собрать 5-ю и 6-ю ступеньки", "用乐高积木搭出高度依次为 1、2、3、4 的“递增阶梯塔”,请孩子预测并亲手搭出第5座和第6座塔"),
    puzB: tr("Our growing caterpillar has 2 circles on Monday, 4 circles on Tuesday, and 6 circles on Wednesday (growing by +2 circles each day!). How many circles will it have on Thursday?", "Растущая гусеница в понедельник состояла из 2 кружков, во вторник — из 4 кружков, в среду — из 6 кружков (каждый день вырастая на +2 кружка!). Сколько кружков будет у неё в четверг?", "一条不断长大的毛毛虫: 周一身体有2个圆圈,周二变成4个圆圈,周三变成6个圆圈(每天多长出2个圆圈!)。请问周四它会有几个圆圈?"),
    solB: tr("8 circles! Because the pattern grows by +2 each day, and 6 + 2 = 8!", "8 кружков! Потому что каждый день прибавляется по 2 кружка: 6 + 2 = 8!", "8个圆圈!因为它是每次增加2个的递增规律,6 + 2 = 8!")
  },
  17: {
    catA: "Time", methA: "Oxford", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("a paper-plate clock with movable short (hour) and long (minute) hands, and numeral cards 1–12", "макет часов из тарелки с подвижными короткой (часовой) и длинной (минутной) стрелками и числа 1–12", "带可拨动短针(时针)与长针(分针)的纸盘时钟模型,以及1-12数字卡"),
    def: tr("Cyclical clock arithmetic (Mod 12): the dial is divided into 12 equal hours arranged in a circle; when the long minute hand points straight up at 12, the short hour hand reads the exact hour.", "Циклическая арифметика часов (по модулю 12): циферблат разделён на 12 равных часов по кругу; когда длинная минутная стрелка смотрит на 12, короткая показывает ровно час.", "时钟模12周期算术: 表盘沿圆周均分为12个大格;当长分针正指12时,短时针指向几就是“几点整”,满12后重新从1循环。"),
    taskA: tr("build the clock face by placing 12 at the top, 6 at the bottom, 3 on the right, and 9 on the left first (quadrants!), then filling in the remaining numbers and setting whole hours", "собрать циферблат, сначала выложив опорные числа 12 сверху, 6 снизу, 3 справа и 9 слева (четверти круга!), затем остальные числа, и выставлять ровные часы", "先在圆盘上下左右四个正方向摆出基准数12、6、3、9,再填齐其余数字,拨动短时针认读整点时刻"),
    puzA: tr("It is 3 o'clock right now. In 2 hours, what time will the clock show?", "Сейчас на часах ровно 3 часа. Сколько времени покажут часы через 2 часа?", "现在时钟上是3点整。再过2个小时,时钟会指向几点整?"),
    solA: tr("5 o'clock! Starting at 3 and advancing 2 hour-steps clockwise reaches 3 + 2 = 5.", "5 часов! Сдвинув часовую стрелку от 3 на 2 деления по часовой стрелке, получим 3 + 2 = 5.", "5点整!时针从3开始顺时针走过2个大格,3 + 2 = 5点。"),
    taskB: tr("explore the wrap-around at 12: start at 11 o'clock and advance the hour hand 2 hours clockwise to discover it lands on 1 o'clock (not 13!)", "исследовать переход через 12: поставить стрелку на 11 часов и сдвинуть на 2 часа вперёд, увидев, что она пришла на 1 час", "探索跨过12点的周期循环: 从11点开始顺时针拨动2个小时,观察时针经过12后落在了1点上"),
    puzB: tr("The clock shows 12 o'clock noon. After 1 hour passes, does the hour hand point to 13 or to 1?", "Часы показывают 12 часов дня. На какое число укажет стрелка, когда пройдёт ещё 1 час — на 13 или на 1?", "中午12点整过后又过了1个小时,表盘上的短时针会指向数字几?"),
    solB: tr("It points to 1! Because the clock face is a 12-hour cycle; after completing 12, it starts a new cycle at 1.", "На число 1! Циферблат — это замкнутый круг из 12 часов, после 12 отсчёт круга начинается снова с 1.", "指向数字1(下午1点)!因为表盘是12小时循环周期,走满12后重新从1开始新一轮循环。")
  },
  18: {
    catA: "Computer Science", methA: "Oxford", catB: "Arithmetic", methB: "Chinese",
    prop: tr("twin 10-frames, 20 counters, arrow & IF/THEN cards, and a paper clock", "две рамки десяти, 20 фишек, карточки команд ЕСЛИ/ТО и макет часов", "双十格框、20枚圆片、条件指令卡和时钟模型"),
    def: tr("Term 2 Capstone synthesis: axiomatic addition/subtraction, polygons, Make-a-Ten (凑十法) for teen numbers, symmetry, clocks, and conditional algorithms.", "Финал 2-й четверти: сложение и вычитание, многоугольники, счёт через десяток (11–20), симметрия, часы и ветвления.", "第2学段综合挑战: 加减法公理、多边形、凑十法与十几的位值、对称、时钟与条件分支算法。"),
    taskA: tr("navigate the Robot Code Arena: at each gate on the grid, solve a Make-a-Ten challenge (8+5, 9+6, 7+4) to unlock the IF/THEN path", "пройти «Арену роботов»: у каждых ворот на сетке решить пример методом дополнения до 10 (8+5, 9+6, 7+4), чтобы открыть путь", "闯关“机器人代码竞技场”: 在每个网格关卡用凑十法解开算式密码(8+5、9+6、7+4)以触发前进指令"),
    puzA: tr("Gate 1 asks: 'I am 1 Ten and 3 Ones. If you take away 3 Ones, what number am I?'", "Загадка Ворот 1: «Во мне 1 десяток и 3 единицы. Если забрать 3 единицы, каким числом я стану?»", "第一道密码门提问: “我是1个十和3个一组成的数。如果拿走我的3个一,我还剩多少?”"),
    solA: tr("10! Because 1 Ten and 3 Ones is 13, and removing the 3 Ones leaves 1 full Ten (13 - 3 = 10).", "10! Потому что 1 десяток и 3 единицы — это 13, а без 3 единиц остаётся ровно 1 десяток (13 − 3 = 10).", "还剩10!因为1个十和3个一是13,去掉个位的3个一,正好剩下整整1个十(13-3=10)。"),
    taskB: tr("build a symmetric 6-sided hexagon fortress around the clock tower and compute the robot's arrival time after a 3-hour mission starting at 10 o'clock", "построить симметричную шестиугольную крепость вокруг часовой башни и вычислить время возвращения робота, если старт в 10 часов, а полёт длится 3 часа", "围绕钟楼搭建对称的六边形堡垒,并计算机器人从10点出发执行3小时任务后的返回时刻"),
    puzB: tr("The robot launches at 10 o'clock and flies for 3 hours. What time does the clock show when it lands?", "Робот стартовал в 10 часов и летел 3 часа. Сколько времени покажут стрелочные часы при посадке?", "机器人10点整起飞,连续飞行了3个小时。降落时表盘上是几点整?"),
    solB: tr("1 o'clock! Two hours bring it from 10 to 12, and the 3rd hour lands on 1.", "1 час! За 2 часа стрелка дойдёт от 10 до 12, а за 3-й час перейдёт на 1.", "1点整!从10点走2小时到12点,再走第3个小时正好落在1点上。")
  },
  19: {
    catA: "Arithmetic", methA: "Chinese", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("4 small paper plates and 12 counters (or berries)", "4 маленькие тарелочки и 12 фишек (или ягод)", "4个小纸盘和12枚圆片(或浆果)"),
    def: tr("Equal groups as the foundation of multiplication: when several groups each contain the exact same number of items, we find the total by repeated addition (e.g., 3 groups of 2 is 2 + 2 + 2 = 6).", "Равные группы как основа умножения: когда в нескольких группах поровну предметов, общее число находится сложением одинаковых слагаемых (3 раза по 2: 2 + 2 + 2 = 6).", "等量分组(乘法萌芽): 当若干个组里每组物品数量完全相同时,可通过相同数连加求总数(如3个2相加: 2+2+2=6)。"),
    taskA: tr("place 2 berries on each of 4 plates, verify every plate is equal, and skip-count by twos: '2, 4, 6, 8—four groups of 2 make 8!'", "положить по 2 ягодки на каждую из 4 тарелок и сосчитать двойками: «2, 4, 6, 8 — четыре раза по 2 будет 8!»", "在4个盘子里每盘放2颗浆果,先检验每盘数量相等,再两个两个地跳数: “2、4、6、8——4个2合起来是8!”"),
    puzA: tr("3 bicycles are parked in the yard. Each bicycle has 2 wheels. How many wheels are there altogether?", "Во дворе стоят 3 двухколёсных велосипеда. У каждого по 2 колеса. Сколько всего колёс у этих велосипедов?", "院子里停着3辆两轮自行车,每辆车有2个轮子。一共有几个轮子?"),
    solA: tr("6 wheels! Three groups of 2 equals 2 + 2 + 2 = 6.", "6 колёс! Три раза по 2 колеса: 2 + 2 + 2 = 6.", "一共6个轮子!3个2连加: 2 + 2 + 2 = 6。"),
    taskB: tr("make 3 equal groups of 3 counters (3 + 3 + 3 = 9) and compare with an unequal grouping (2 + 3 + 4) to see why '3 groups of 3' requires every group to be identical", "собрать 3 равные группы по 3 фишки (3 + 3 + 3 = 9) и сравнить с неравными группами, подчеркнув правило равенства групп", "摆出3组、每组3枚圆片(3+3+3=9),并与不均等分组对比,理解“几个几”必须每份完全相等"),
    puzB: tr("3 tricycles each have 3 wheels. How many wheels do the 3 tricycles have in all?", "У каждого из 3 трёхколёсных велосипедов по 3 колеса. Сколько всего колёс у всех 3 велосипедов?", "3辆三轮童车,每辆车有3个轮子。这3辆三轮车一共有几个轮子?"),
    solB: tr("9 wheels! Because 3 + 3 + 3 = 9 (three groups of 3).", "9 колёс! Потому что 3 + 3 + 3 = 9 (три раза по 3).", "一共9个轮子!因为3个3相加: 3 + 3 + 3 = 9。")
  },
  20: {
    catA: "Arithmetic", methA: "Chinese", catB: "Geometry", methB: "USSR (Kiselev)",
    prop: tr("12 square tiles or coins and a cardboard L-frame", "12 квадратных плиток или монеток и картонный уголок", "12块正方形磁力片(或硬币)和直角纸板框"),
    def: tr("Rectangular array model: arranging items in R equal rows of C columns shows visually that R rows of C equals C columns of R (spatial commutativity).", "Прямоугольный массив (таблица): расположение предметов рядами и столбцами наглядно показывает, что 2 ряда по 3 равны 3 рядам по 2.", "矩形点阵模型: 将物体排成整齐的“几行几列”,旋转90度即可直观证明“2行3列”与“3行2列”总数完全相等(空间交换律)。"),
    taskA: tr("arrange 6 coins into 2 horizontal rows of 3, count '3 + 3 = 6', then walk around the table (or rotate the mat 90°) to see 3 rows of 2 ('2 + 2 + 2 = 6')!", "выложить 6 монет в 2 ряда по 3 («3 + 3 = 6»), а затем повернуть коврик на 90° и увидеть 3 ряда по 2 («2 + 2 + 2 = 6»)!", "把6枚硬币排成2行、每行3枚(3+3=6),再将垫子旋转90度,观察它变成了3行、每行2枚(2+2+2=6)!"),
    puzA: tr("A muffin tray has 2 rows with 4 muffins in each row. If you turn the tray sideways so it has 4 rows of 2 muffins, did any muffins disappear?", "На противне 2 ряда по 4 кекса в каждом. Если повернуть противень боком, чтобы стало 4 ряда по 2 кекса, изменится ли число кексов?", "烤盘里有2排松饼,每排4个。如果把烤盘横过来放,变成4排、每排2个,松饼的总数变了吗?一共有几个?"),
    solA: tr("No muffins disappeared—there are 8 muffins both ways! 4 + 4 = 8 is the exact same array as 2 + 2 + 2 + 2 = 8.", "Ни один кекс не исчез — их 8 в любом положении! 4 + 4 = 8 — это тот же самый массив, что и 2 + 2 + 2 + 2 = 8.", "一个也没少,两种看法都是8个!横看4+4=8与竖看2+2+2+2=8是同一个点阵。"),
    taskB: tr("challenge the child to form different rectangular arrays using all 12 square tiles: 1x12, 2x6, and 3x4", "построить из всех 12 квадратных плиток разные прямоугольники: 1×12, 2×6 и 3×4", "用12块正方形方片探索能拼出哪些不同的长方形网格: 1行12列、2行6列、3行4列"),
    puzB: tr("Can you arrange 5 square tiles into a rectangle with 2 equal rows and no tiles sticking out, or is one row always shorter?", "Можно ли из 5 квадратных плиток сложить прямоугольник в 2 равных ряда без выступающих деталей, или один ряд всегда окажется длиннее?", "用5块正方形方片能拼成上下2排完全一样长、没有凸出的长方形吗?"),
    solB: tr("No! 5 splits into 2 and 3, so one row has 3 and the other has 2 (1 tile sticks out).", "Нельзя! Число 5 делится на 2 и 3, поэтому в одном ряду будет 3 плитки, а в другом 2 (1 плитка выступает).", "不能!因为5分成两排只能是3和2,必定有一排多出1块。")
  },
  21: {
    catA: "Algebra", methA: "USSR (Kiselev)", catB: "Algebra", methB: "USSR (Kiselev)",
    prop: tr("a balance scale drawing (or real balance), identical wooden blocks, and a small opaque matchbox labeled 'x'", "рисунок весов (или настоящие весы), одинаковые кубики и непрозрачная коробочка с буквой «x»", "天平图板(或实物天平)、相同的木积木以及贴有字母“x”的不透明小神秘盒"),
    def: tr("First-principles Algebra: an equation is a balanced scale; if we remove the same weight from both pans, the scale remains balanced, revealing the unknown weight x.", "Начала алгебры (Киселёв): уравнение — это уравновешенные весы; если снять одинаковый груз с обеих чаш, равновесие сохранится и откроет неизвестное x.", "代数方程第一性原理: 等式就是保持水平平衡的天平;从天平左右两盘同时拿走相同数量的积木,天平依然平衡,从而求出神秘盒里的未知数x。"),
    taskA: tr("set up the Mystery Box (holding 4 hidden coins) plus 2 visible coins on the Left Pan, balanced against 6 visible coins on the Right Pan (x + 2 = 6); remove 2 visible coins from BOTH pans to find x = 4", "поставить Коробочку x (внутри 4 монеты) и ещё 2 монеты слева, а справа положить 6 монет (x + 2 = 6); снять по 2 монеты с ОБЕИХ чаш и открыть x = 4", "左盘放神秘盒x(内藏4枚硬币)外加2枚明币,右盘放6枚明币(x+2=6);从左右两盘同时拿走2枚明币,推理出盒内必有x=4枚并开盒验证"),
    puzA: tr("On a balanced scale, the Left Pan has Mystery Bag x and 3 blocks. The Right Pan has 7 blocks. If we take 3 blocks off BOTH pans, how many blocks are left to balance Mystery Bag x?", "На ровных весах слева стоят Мешочек x и 3 кубика, а справа — 7 кубиков. Если снять по 3 кубика с ОБЕИХ чаш, сколько кубиков останется справа против Мешочка x?", "平衡的天平左盘放着神秘袋x和3块积木,右盘放着7块积木(x+3=7)。如果两边同时拿走3块积木,右盘还剩几块积木与神秘袋x平衡?"),
    solA: tr("4 blocks! Removing 3 from both sides leaves Mystery Bag x balanced against 7 - 3 = 4 blocks, so x = 4.", "4 кубика! Сняв по 3 кубика с обеих сторон, мы получим x = 7 − 3 = 4 кубика.", "还剩4块积木!两边同时拿走3块后,左边只剩x,右边剩 7 - 3 = 4 块,所以神秘袋里有 x = 4 块积木。"),
    taskB: tr("let the child hide 1 to 6 counters inside the 'x' box, add 3 counters beside it, tell you the total, and watch you solve for x using the balance rule—then swap!", "пусть ребёнок сам спрячет в коробочку «x» от 1 до 6 фишек, положит рядом 3 фишки и назовёт общую сумму, а затем поменяйтесь ролями!", "让孩子自己往x盒里藏几枚圆片并在盒旁放3枚,报出总数后一起用“两边同减”解出x,反复互换角色练习"),
    puzB: tr("Mystery Box x plus 5 apples balances 5 apples on the other side (x + 5 = 5). How many apples are inside Mystery Box x?", "Коробочка x да ещё 5 яблок уравновешивают 5 яблок на другой чаше (x + 5 = 5). Сколько яблок внутри коробочки x?", "神秘盒x加上5个苹果,刚好与右盘的5个苹果平衡(x + 5 = 5)。请问神秘盒x里面装了几个苹果?"),
    solB: tr("0 apples (the box is empty)! Removing 5 apples from both sides leaves x = 5 - 5 = 0.", "0 яблок (коробочка пустая)! Если снять по 5 яблок с обеих чаш, справа останется 5 − 5 = 0.", "0个苹果(是个空盒子)!两边同时拿走5个苹果后,右边剩下 5 - 5 = 0,所以盒子里是0。")
  },
  22: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Chinese",
    prop: tr("equal toothpicks or matchsticks (with tips removed), a toy ladybug, and grid paper", "одинаковые палочки (единичные отрезки), игрушечная божья коровка и бумага в крупную клетку", "等长小木棒(单位线段)、玩具小瓢虫和大方格纸"),
    def: tr("Perimeter is the total length of the closed boundary around a polygon—found by walking all the way around the edges from start back to start and summing the side lengths.", "Периметр — это сумма длин всех сторон многоугольника, то есть полный путь вдоль всей его замкнутой границы.", "周长的定义(基谢廖夫): 封闭多边形所有边界线段长度的总和,即沿着边界走完一整圈回到起点的总路程。"),
    taskA: tr("build a triangle with 3 unit sticks (1 per side) and a square with 4 unit sticks, walking the ladybug around every edge to count Perimeter = 3 and Perimeter = 4", "сложить треугольник из 3 палочек и квадрат из 4 палочек, проведя божью коровку вдоль всех сторон и посчитав периметр: 3 и 4", "用单位小棒拼出边长为1的等边三角形和正方形,让小瓢虫沿着边界走一整圈,数出周长分别为3和4"),
    puzA: tr("A square garden has 4 equal sides. Each side is 2 sticks long. How many sticks long is the fence all the way around the garden (its perimeter)?", "У квадратного садика 4 равные стороны, каждая сторона длиной в 2 палочки. Сколько всего палочек нужно для забора вокруг всего сада (периметр)?", "一个正方形小花园有4条相等的边,每条边长2根小棒。围着花园走一整圈的栅栏(周长)一共是几根小棒长?"),
    solA: tr("8 sticks! Walking all 4 sides adds 2 + 2 + 2 + 2 = 8 sticks.", "8 палочек! Складываем все 4 стороны: 2 + 2 + 2 + 2 = 8 палочек.", "8根小棒长!把4条边的长度加起来: 2 + 2 + 2 + 2 = 8 根。"),
    taskB: tr("build a rectangle with top/bottom sides of 3 sticks and left/right sides of 1 stick, verifying its perimeter is 3 + 1 + 3 + 1 = 8 sticks (same perimeter as the 2x2 square!)", "построить прямоугольник со сторонами 3 и 1 палочка и посчитать его периметр: 3 + 1 + 3 + 1 = 8 палочек (такой же периметр, как у квадрата 2×2!)", "用小棒拼一个长3根、宽1根的长方形,算出周长为 3+1+3+1 = 8 根(发现它与边长2的正方形周长相等!)"),
    puzB: tr("Can two different shapes (like a 2x2 square and a 3x1 rectangle) use the exact same number of fence sticks (8 sticks) around their boundary?", "Могут ли две разные по форме клумбы (квадрат 2×2 и длинный прямоугольник 3×1) иметь совершенно одинаковый периметр в 8 палочек?", "两个形状不同的花坛(一个是2×2的正方形,一个是3×1的细长方形),它们的边界周长能完全一样长(都是8根小棒)吗?"),
    solB: tr("Yes! 2 + 2 + 2 + 2 = 8 and 3 + 1 + 3 + 1 = 8. Different shapes can have the exact same perimeter.", "Да! Ведь 2 + 2 + 2 + 2 = 8 и 3 + 1 + 3 + 1 = 8. Разные фигуры могут иметь равный периметр.", "完全可以!因为 2+2+2+2 = 8,且 3+1+3+1 = 8,形状不同的多边形可以拥有完全相同的周长。")
  },
  23: {
    catA: "Arithmetic", methA: "USSR (Kiselev)", catB: "Logic", methB: "Oxford",
    prop: tr("10 counters (or socks) and a 2-column 'Pairing Strip'", "10 фишек (или носочков) и двухколоночная дорожка для построения пар", "10枚圆片(或袜子)以及双列“两两配对板”"),
    def: tr("Parity definition: an EVEN number can be divided into pairs of 2 with zero leftovers (2, 4, 6, 8, 10); an ODD number always has 1 lonely element left without a partner (1, 3, 5, 7, 9).", "Чётность: ЧЁТНОЕ число делится на пары без остатка (2, 4, 6, 8, 10), а у НЕЧЁТНОГО числа всегда остаётся 1 элемент без пары (1, 3, 5, 7, 9).", "奇偶性严格定义: 能两两配对且毫无剩余的数叫“偶数(双数: 2,4,6,8,10)”;两两配对后必定落单多出1个的数叫“奇数(单数: 1,3,5,7,9)”。"),
    taskA: tr("test numbers 1 through 10 by lining counters up in pairs (two abreast like marching buddies), sorting numeral cards into the EVEN pile and the ODD pile", "проверить числа от 1 до 10, выстраивая фишки парами в два ряда, и разложить карточки с цифрами на стопку ЧЁТНЫХ и стопку НЕЧЁТНЫХ", "把1到10的圆片按“两个一排好朋友”列队检验,将数字卡分进“偶数(成双)”与“奇数(落单)”两个阵营"),
    puzA: tr("7 children want to skate in pairs of 2 holding hands. Will everyone have a partner, or will 1 child be left without a partner?", "7 ребят хотят кататься на коньках парами, держась за руки по двое. Всем ли хватит пары или кто-то останется один?", "7个小朋友想两两手拉手成对滑冰。每个人都能拉到同伴吗,还是会有1个小朋友落单?"),
    solA: tr("1 child will be left without a partner! Because 7 is an ODD number: 3 pairs make 6, plus 1 leftover makes 7.", "1 ребёнок останется без пары! Потому что 7 — нечётное число: 3 пары дают 6, да ещё 1 остаётся.", "会有1个小朋友落单!因为7是奇数(单数): 6个人配成3对后,第7个人没有同伴。"),
    taskB: tr("discover the Parity Addition Law with blocks: take two ODD numbers (like 3 and 3, or 3 and 5) and push them together—their two lonely leftover blocks join hands to form a new pair, making an EVEN number!", "открыть закон сложения нечётных чисел на кубиках: соединить два НЕЧЁТНЫХ числа (например, 3 и 5) и увидеть, как две одинокие фишки образуют новую пару, давая ЧЁТНОЕ число!", "用积木发现奇偶加法定理: 把两个奇数(如3和3、或3和5)合在一起——原本各自落单的那1个和1个正好手拉手凑成新的一对,变成了偶数!"),
    puzB: tr("Group A has an ODD number of blocks (1 lonely block sticking out). Group B also has an ODD number of blocks (1 lonely block sticking out). When we join Group A and Group B together, is the total EVEN or ODD?", "В группе А нечётное число кубиков (1 без пары), и в группе Б нечётное число (1 без пары). Если соединить обе группы вместе, получится чётное или нечётное число?", "A组是奇数(有1个落单),B组也是奇数(也有1个落单)。把A组和B组合在一起后,总数会变成偶数还是奇数?"),
    solB: tr("EVEN! Because the 1 lonely block from Group A pairs up with the 1 lonely block from Group B (1 + 1 = 2), leaving zero unpaired blocks!", "ЧЁТНОЕ! Потому что 1 одинокий кубик из группы А встанет в пару с 1 одиноким кубиком из группы Б (1 + 1 = 2), и без пары никого не останется!", "一定会变成偶数!因为A组落单的1个和B组落单的1个正好配成一对好朋友(1+1=2),再也没有落单的了(奇+奇=偶)!")
  },
  24: {
    catA: "Logic", methA: "Oxford", catB: "Logic", methB: "USSR (Kiselev)",
    prop: tr("2 overlapping hoops (red and blue yarn) and 12 household items or attribute cards", "2 пересекающихся кольца из нитей и 12 предметов или карточек с признаками", "2个交叉重叠的毛线圈(韦恩图)和12件日常物品(或属性卡)"),
    def: tr("Venn diagram logic: Region 1 is Set A only, Region 2 is Set B only, the central overlap is the Intersection (A AND B), and the outside is Neither (NOT A and NOT B).", "Диаграмма Венна: левая часть — только А, правая — только Б, общая серединка — пересечение (А И Б), а снаружи — ни А, ни Б.", "韦恩图四区域逻辑: 左月牙区为“仅A”,右月牙区为“仅B”,中间橄榄区为交集“既A又B”,圈外区域为“既非A也非B”。"),
    taskA: tr("label Hoop A 'Things Used for Drawing' and Hoop B 'Things Made of Wood', placing a wooden pencil in the middle overlap, a plastic marker in A-only, a wooden spoon in B-only, and a metal coin outside both", "обозначить Круг А «Пишет/рисует», а Круг Б «Деревянное»: положить деревянный карандаш в пересечение, фломастер — только в А, деревянную ложку — только в Б, а монетку — снаружи", "将A圈设为“能画画的”,B圈设为“木头做的”: 把木铅笔放入中间交集,塑料水彩笔放仅A区,木勺放仅B区,金属硬币放两圈之外"),
    puzA: tr("Where does a wooden toy block belong in our two hoops ('Used for Drawing' and 'Made of Wood')?", "В какую область двух кругов («Рисует» и «Деревянное») нужно положить деревянный игрушечный кубик?", "一块“木头玩具积木”应该放在这两个圈(“能画画的”与“木头做的”)的哪个区域?"),
    solA: tr("In Hoop B only (not in the middle overlap)! Because it is made of wood, but you cannot draw with it.", "В боковую часть круга Б (не в пересечение)! Ведь кубик деревянный, но им нельзя рисовать.", "放在B圈的单独区域(不能放中间交集)!因为它是木头做的,但不能用来画画。"),
    taskB: tr("count elements in overlapping Venn diagrams: see why adding Hoop A's total and Hoop B's total double-counts the middle intersection!", "посчитать предметы в пересекающихся кругах: понять, почему при сложении круга А и круга Б предметы в общей серединке считаются дважды!", "在韦恩图中进行容斥计数启蒙: 观察为什么直接把A圈总数加B圈总数会把中间交集里的物品重复数两次!"),
    puzB: tr("On a plate, 3 children like apples, 3 children like bananas, and 1 child is sitting in the middle overlap because she likes BOTH! How many children are there in total (count each child once)?", "В круге «Любят яблоки» стоят 2 ребят сбоку и 1 девочка в общей серединке (всего 3). В круге «Любят бананы» стоят 2 ребят сбоку и та же 1 девочка в серединке (всего 3). Сколько всего ребят?", "左圈里有2个只爱吃苹果的小朋友,右圈里有2个只爱吃香蕉的小朋友,正中间交集站着1个两样都爱吃的小朋友。请问一共有几个小朋友?"),
    solB: tr("5 children in total! 2 (apple only) + 1 (both) + 2 (banana only) = 5.", "Всего 5 ребят! 2 (только яблоки) + 1 (оба фрукта) + 2 (только бананы) = 5.", "一共5个小朋友!左区2人 + 中间交集1人 + 右区2人 = 5人。")
  },
  25: {
    catA: "Time", methA: "Oxford", catB: "Time", methB: "USSR (Kiselev)",
    oldA: "k01_w4_l1",
    prop: tr("a monthly wall calendar, a 7-day week strip, and 4 season picture cards", "настенный календарь, полоска из 7 дней недели и 4 карточки времён года", "月历挂图、7天星期条和春夏秋冬四季图卡"),
    def: tr("Calendar cycles: 7 days form 1 week (repeating in a strict loop from Monday to Sunday), and 12 months form 1 full year across 4 seasons.", "Календарные циклы: 7 дней составляют 1 неделю (повторяясь по кругу с понедельника по воскресенье), а 12 месяцев — 1 год и 4 сезона.", "日历周期结构: 7天构成1个星期(从周一至周日严格循环),12个月构成1整年并经历春夏秋冬四季更替。"),
    taskB: tr("trace a finger across a real monthly calendar grid: see why every row has 7 boxes (1 week) and why moving straight down 1 row adds exactly 7 days", "проследить пальчиком по сетке календаря: увидеть, почему в каждой строке ровно 7 клеток (неделя), а шаг на 1 клетку вниз прибавляет ровно 7 дней", "在真实月历网格上用手指探索: 为什么每一横行恰好有7格(1星期),且从任意一天竖直往下移一格刚好过了7天"),
    puzB: tr("Today is Wednesday. How many days must pass until it is Wednesday again next week?", "Сегодня среда. Сколько дней должно пройти, чтобы снова наступила среда на следующей неделе?", "今天是星期三。再过几天又会回到下周的星期三?"),
    solB: tr("7 days (1 full week)! Because the days of the week repeat in a cycle of 7.", "7 дней (ровно 1 неделя)! Потому что дни недели повторяются с периодом в 7 дней.", "7天(整整1个星期)!因为星期是以7为周期循环往复的。")
  },
  26: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "Chinese",
    prop: tr("paper circles, squares, and rectangles, child-safe scissors, and 8 counters", "бумажные круги, квадраты и прямоугольники, безопасные ножницы и 8 фишек", "圆形、正方形、长方形纸片,儿童安全剪刀和8枚圆片"),
    def: tr("Fractions as equal parts of a whole: a HALF (1/2) is 1 of 2 strictly equal parts; a QUARTER (1/4) is 1 of 4 strictly equal parts (half of a half!).", "Дроби как равные доли целого: ПОЛОВИНА (1/2) — это одна из двух строго равных частей; ЧЕТВЕРТЬ (1/4) — одна из четырёх равных частей (половина половинки!).", "分数的等分定义: 把整体严格平分成2份,每份是“二分之一(一半)”;再把每一半对折平分,得到4份完全相等的“四分之一”。"),
    taskA: tr("fold a paper circle in half so the edges match, cut along the crease to get 2 halves, then fold and cut each half in half again to get 4 equal quarters", "сложить бумажный круг пополам до совпадения краёв (2 половинки), а затем сложить каждую половинку ещё пополам, получив 4 равные четвертинки", "将圆形纸片对折重合剪成2个“二分之一(半圆)”,再把每个半圆对折剪开得到4个完全相等的“四分之一(扇形)”"),
    puzA: tr("Papa cuts a pizza into 2 unequal pieces—one giant piece and one tiny sliver. Can the tiny sliver be called 'one-half' of the pizza?", "Папа разрезал пиццу на 2 неравных куска: один огромный и один крошечный. Можно ли назвать маленький кусочек «половиной» пиццы?", "爸爸把一张披萨切成了2块: 一块特别大,一块特别小。请问那块特别小的能叫做披萨的“一半(二分之一)”吗?"),
    solA: tr("No! By definition, halves MUST be equal in size. Unequal parts are just two pieces, not halves.", "Нет! По математическому определению половины ОБЯЗАНЫ быть равными друг другу. Неравные части половинами не называются.", "绝对不能!在数学定义中,“一半(二分之一)”必须要求两份完全相等;大小不等的只能叫两块,不能叫一半。"),
    taskB: tr("compare the size of 1 half-circle against 1 quarter-circle, and verify that 2 quarters fit exactly on top of 1 half", "сравнить по размеру половинку круга и четвертинку круга и наложением доказать, что 2 четвертинки составляют ровно 1 половинку", "将1个半圆与1个四分之一圆叠放比较大小,并验证2个四分之一拼起来恰好完全覆盖1个二分之一"),
    puzB: tr("You are very hungry for cake! Would you rather eat 1 HALF of the cake or 1 QUARTER of the same cake? Which piece is bigger?", "Ты очень проголодался! Какой кусок одного и того же пирога больше: ОДНА ПОЛОВИНА или ОДНА ЧЕТВЕРТИНКА?", "同一个美味蛋糕,你是吃它的“二分之一(一半)”吃得多,还是吃它的“四分之一”吃得多?哪一块更大?"),
    solB: tr("1 HALF is bigger! Because a quarter is a half cut in two again, so 1 half equals 2 quarters.", "ОДНА ПОЛОВИНА больше! Ведь четвертинка — это половинка, разрезанная ещё пополам (в одной половине помещаются две четвертинки).", "二分之一(一半)更大!因为四分之一是把一半又切开分成了两份,1个一半等于2个四分之一。")
  },
  27: {
    catA: "Geometry", methA: "Chinese", catB: "Algebra", methB: "USSR (Kiselev)",
    prop: tr("a 7-piece Tangram set (cut from cardboard), balance scale mat, and counters", "набор из 7 деталей Танграма (из картона), коврик весов и фишки", "七巧板拼图(硬纸板裁制)、天平代数垫和圆片"),
    def: tr("Term 3 Capstone synthesis: equal groups, rectangular arrays, balance scale algebra, polygon perimeter, parity, Venn diagrams, and equal fractions.", "Финал 3-й четверти: равные группы, массивы, уравнения на весах, периметр, чётность, круги Венна и равные доли (половина и четверть).", "第3学段综合挑战: 等量分组、矩形点阵、天平未知数、周长、奇偶性、韦恩图与七巧板面积守恒。"),
    taskA: tr("explore the Chinese Tangram: match the 2 large triangles together to form 1 big square, 1 big triangle, and 1 parallelogram, proving area stays constant!", "исследовать китайский Танграм: сложить из 2 больших равных треугольников квадрат, большой треугольник и параллелограмм, увидев сохранение площади!", "探索中国古典七巧板: 用2块大三角形分别拼出正方形、大三角形和平行四边形,领悟形状改变而总面积恒定不变"),
    puzA: tr("We use the exact same 2 Tangram triangles to build a Square and then a Big Triangle. Which shape has a bigger area (covers more space on the table)?", "Мы сложили из одних и тех же 2 треугольников Танграма сначала Квадрат, а потом Большой Треугольник. Какая из этих фигур занимает больше места по площади?", "我们用完全相同的2块七巧板大三角形,先拼成一个正方形,又拼成一个大三角形。这两个图形谁占的桌面面积更大?"),
    solA: tr("Their areas are EQUAL! Both are composed of the exact same two triangles with no overlaps.", "Их площади РАВНЫ! Обе фигуры составлены из одних и тех же двух треугольников без наложений.", "面积完全相等!因为它们都是由那两块一模一样的三角形不重叠拼接而成的(面积守恒定律)。"),
    taskB: tr("solve a multi-clue detective challenge: find Mystery Number x that is EVEN, greater than 4, and balances x + 2 = 8 on the scale", "решить детективную задачу по нескольким уликам: найти число x, которое ЧЁТНОЕ, больше 4 и удовлетворяет весам x + 2 = 8", "破解多线索侦探谜题: 寻找一个神秘数x,它是偶数、大于4,且满足天平等式 x + 2 = 8"),
    puzB: tr("Left Pan has Mystery Box x and 2 blocks. Right Pan has 2 rows of 4 blocks (8 blocks in all). How many blocks are in Mystery Box x, and is x even or odd?", "На левой чаше весов Коробочка x и 2 кубика. На правой чаше — 2 ряда по 4 кубика (всего 8). Чему равен x и чётное ли это число?", "天平左盘有神秘盒x和2块积木;右盘摆着2排、每排4块积木(共8块)。请问x等于几?它是奇数还是偶数?"),
    solB: tr("x = 6, and 6 is EVEN! Because 8 - 2 = 6, and 6 splits into 3 pairs with 0 leftovers.", "x = 6, и это ЧЁТНОЕ число! Ведь 8 − 2 = 6, а 6 делится на 3 пары без остатка.", "x = 6,而且6是偶数!因为 8 - 2 = 6,且6能配成3对而没有剩余。")
  },
  28: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("a centimeter ruler (0 to 15 cm), pencils of different lengths, and 1-cm unit cubes", "линейка с сантиметровыми делениями (0–15 см), карандаши разной длины и кубики со стороной 1 см", "厘米直尺(0至15厘米)、不同长度的铅笔以及边长1厘米的单位小方块"),
    def: tr("Metric measurement with a ruler: 1 centimeter (cm) is a universal standard unit length; to measure a segment, align its left endpoint strictly with the ZERO (0) mark, not the edge of the plastic or the 1 mark.", "Измерение линейкой: 1 сантиметр (см) — единая стандартная мерка длины; начало отрезка обязательно совмещают с отметкой НОЛЬ (0), а не с единицей.", "公制直尺测量法则: 1厘米(cm)是国际通用标准长度单位;测量线段时,左端点必须严格对齐“0刻度线”(而非尺子塑料边或刻度1)。"),
    taskA: tr("line up 1-cm unit cubes along the ruler from 0 to 6 to see that the mark '6' means 6 unit centimeter blocks from 0, then measure 3 household objects starting at 0", "выстроить сантиметровые кубики вдоль линейки от 0 до 6, увидев, что цифра 6 означает 6 шагов от нуля, и измерить 3 предмета от отметки 0", "将1厘米小方块沿直尺从0排到6,直观理解刻度6代表从0出发累计6个1厘米单位,再用零刻度对齐法测量3件物品"),
    puzA: tr("Leo places a crayon on the ruler starting at the number 1 instead of 0, and the tip of the crayon reaches the number 7. Is the crayon 7 cm long or 6 cm long?", "Лео приложил карандаш к линейке не от 0, а от цифры 1, и кончик карандаша дошёл до цифры 7. Длина карандаша равна 7 см или 6 см?", "里奥量蜡笔时没有对齐0刻度,而是把左端对齐了刻度1,蜡笔右端指着刻度7。这支蜡笔到底长7厘米还是6厘米?"),
    solA: tr("6 cm long! From mark 1 to mark 7 there are 7 - 1 = 6 centimeter unit steps.", "6 см! От деления 1 до деления 7 укладывается ровно 7 − 1 = 6 сантиметровых шагов.", "长6厘米!因为从刻度1到刻度7之间只有 7 - 1 = 6 个1厘米大格。"),
    taskB: tr("use the ruler to DRAW straight line segments of exact requested lengths (4 cm, 7 cm, 10 cm) by marking dots at 0 and L and connecting them", "начертить по линейке отрезки заданной длины (4 см, 7 см, 10 см), ставя точки против 0 и нужного числа", "用直尺在纸上精确画出指定长度的线段(4厘米、7厘米、10厘米): 先在0和目标刻度点两个端点,再连线"),
    puzB: tr("Segment A is 5 cm long. Segment B is 8 cm long. How many centimeters longer is Segment B than Segment A?", "Отрезок А равен 5 см, а отрезок Б — 8 см. На сколько сантиметров отрезок Б длиннее отрезка А?", "线段A长5厘米,线段B长8厘米。线段B比线段A长多少厘米?"),
    solB: tr("3 cm longer! Because 8 cm - 5 cm = 3 cm.", "На 3 см длиннее! Потому что 8 см − 5 см = 3 см.", "长3厘米!因为 8 - 5 = 3 厘米。")
  },
  29: {
    catA: "Probability", methA: "Oxford", catB: "Probability", methB: "Oxford",
    oldA: "k01_w4_l3",
    prop: tr("an opaque cloth bag, 6 red marbles/counters, 2 blue marbles/counters, and a tally chart", "непрозрачный мешочек, 6 красных и 2 синих шарика (или фишки) и таблица для галочек", "不透明布袋、6枚红棋子、2枚蓝棋子以及实验记录统计表"),
    def: tr("Sample space and empirical frequency: the more ways an outcome can happen in the bag, the higher its probability and the more often it appears in repeated draws.", "Пространство исходов и частота: чем больше в мешке предметов данного цвета, тем выше вероятность вытянуть этот цвет при многократных попытках.", "样本空间与统计频率: 袋中某种颜色的个体数量越多,摸出该颜色的可能性(概率)就越大,多次重复试验中出现的次数也越多。"),
    taskB: tr("put 4 red and 1 blue counter in the bag; draw 1 counter with eyes closed, record a tally mark, put it back (with replacement!), and repeat 10 times to see Red wins!", "положить в мешочек 4 красные и 1 синюю фишку; 10 раз не глядя вынимать фишку, ставить галочку в таблицу и возвращать фишку обратно в мешок", "袋中放4红1蓝,闭眼摸出1枚记录正字后再放回袋中(有放回抽样),重复10次验证红片出现次数远多于蓝片"),
    puzB: tr("In Mystery Bag X, we did 10 draws and got 5 Red and 5 Blue. Does Bag X probably have an equal number of Red and Blue counters, or 9 Red and 1 Blue?", "Из таинственного мешочка X не глядя доставали фишку 10 раз (возвращая обратно): 5 раз выпала красная и 5 раз синяя. Как ты думаешь, в мешке X красных и синих фишек примерно поровну или 9 красных и 1 синяя?", "从神秘盲袋X里有放回地摸了10次,结果摸出5次红片、5次蓝片。你推理袋子里的红蓝圆片数量是差不多一样多,还是9红1蓝?"),
    solB: tr("Probably an equal number! Equal outcomes over many trials point to equal quantities inside the bag.", "Примерно поровну! Равная частота выпадения указывает на равное количество красных и синих фишек внутри.", "差不多一样多!多次试验中两种颜色出现次数旗鼓相当,说明袋中两色圆片数量基本相等。")
  },
  30: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "USSR (Kiselev)",
    prop: tr("a wooden cube (or dice/box), playdough balls (vertices), and toothpicks (edges)", "кубик (или коробочка), шарики пластилина (вершины) и зубочистки (рёбра)", "正方体木块(或骰子/方盒)、橡皮泥球(顶点)和牙签(棱)"),
    def: tr("Anatomy of a 3D Polyhedron (Cube): flat surfaces are FACES (6 squares), straight lines where two faces meet are EDGES (12 segments), and sharp corners where edges meet are VERTICES (8 points).", "Строение многогранника (куба): плоские стенки — это ГРАНИ (6 квадратов), линии стыка граней — РЁБРА (12 отрезков), а уголки — ВЕРШИНЫ (8 точек).", "三维多面体(正方体)的几何三要素: 平平的壁叫“面(6个正方形)”,面与面相交的线段叫“棱(12条)”,棱相交的尖角叫“顶点(8个)”。"),
    taskA: tr("put a small sticker on each face of a cube as you count all 6 faces (Top, Bottom, Front, Back, Left, Right), then count the 4 top vertices + 4 bottom vertices = 8 vertices", "наклеить по маленькой наклейке на каждую грань куба, сосчитав все 6 граней (верх, низ, спереди, сзади, слева, справа), а затем 4 верхних + 4 нижних = 8 вершин", "在正方体的每个面上贴小贴纸数出6个面(上、下、前、后、左、右),再数出上面4个顶点加下面4个顶点共8个顶点"),
    puzA: tr("Why does a standard game die have numbers going from 1 up to 6?", "Почему на обычном игральном кубике точки идут от 1 ровно до 6?", "为什么标准游戏骰子上的点数总是从1点到6点?"),
    solA: tr("Because a cube has exactly 6 flat faces—one number on each face (Top, Bottom, and 4 side faces)!", "Потому что у куба ровно 6 плоских граней — по одному числу на каждую грань!", "因为正方体恰好有6个平平的面(上下2个面加四周4个侧面),每个面上刻一个数字正好是1到6!"),
    taskB: tr("build a 3D skeleton of a cube using 8 balls of playdough (vertices) and 12 toothpicks (4 on the bottom square, 4 standing pillars, 4 on the top square)", "собрать каркас куба из 8 шариков пластилина (вершины) и 12 палочек (4 в квадрате дна, 4 столбика-стенки и 4 в квадрате крыши)", "用8个橡皮泥球(顶点)和12根小木棒(底面4根、竖直立柱4根、顶面4根)亲手搭建一个正方体三维骨架"),
    puzB: tr("In our toothpick cube skeleton, there are 4 toothpicks on the floor square, 4 standing up like pillars, and 4 on the roof square. How many toothpick edges does a cube have in all?", "В каркасе куба 4 палочки лежат в квадрате пола, 4 стоят столбиками и 4 лежат в квадрате крыши. Сколько всего рёбер у куба?", "在正方体骨架中,底面正方形用了4根小棒,竖着立起4根柱子,顶面正方形又用了4根小棒。正方体一共有多少条棱?"),
    solB: tr("12 edges! Because 4 (bottom) + 4 (pillars) + 4 (top) = 12.", "12 рёбер! Потому что 4 (низ) + 4 (стойки) + 4 (верх) = 12.", "一共12条棱!因为底面4条 + 竖棱4条 + 顶面4条 = 12条。")
  },
  31: {
    catA: "Counting", methA: "Chinese", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("5 pairs of socks (10 socks), handprints of 5 fingers, and a 1-to-50 number chart", "5 пар носков (10 штук), ладошки по 5 пальцев и таблица чисел от 1 до 50", "5双袜子(10只)、5指手印卡以及1至50的数字表"),
    def: tr("Skip counting counts equal groups rapidly instead of one by one: counting by 2s (2, 4, 6, 8, 10) counts pairs; counting by 5s (5, 10, 15, 20, 25...) counts hands; counting by 10s (10, 20, 30, 40, 50) counts full ten-frames.", "Счёт равными группами (двойками, пятёрками и десятками) позволяет считать быстрее: 2, 4, 6, 8, 10 — парами; 5, 10, 15, 20 — пятёрками; 10, 20, 30, 40, 50 — десятками.", "跳数(按群计数)比一个一个数快得多: 2个一数(2, 4, 6, 8, 10)数成双的物品;5个一数(5, 10, 15, 20…)数小手掌;10个一数(10, 20, 30, 40, 50)数满十格框。"),
    taskA: tr("line up 5 pairs of socks and count them by 2s (2, 4, 6, 8, 10!), then do 6 high-fives counting by 5s (5, 10, 15, 20, 25, 30!)", "выложить 5 пар носков и сосчитать их двойками (2, 4, 6, 8, 10!), а затем дать друг другу «пять» 6 раз, считая пятёрками до 30!", "把5双袜子排成一排,两个两个地数(2, 4, 6, 8, 10!);再互相击掌6次,五个五个地数到30(5, 10, 15, 20, 25, 30!)"),
    puzA: tr("Follow the skip-counting pattern: 5, 10, 15, 20, [?]. What number comes next when we add one more hand of 5 fingers?", "Продолжи счёт пятёрками: 5, 10, 15, 20, [?]. Какое число будет следующим, если добавить ещё 5 пальчиков?", "按5个一数的规律接着数: 5, 10, 15, 20, [?]。再伸出一只手(5根手指),下一个数是几?"),
    solA: tr("25! Because 20 + 5 = 25.", "25! Потому что 20 + 5 = 25.", "是25!因为 20 再加 5 就是 25。"),
    taskB: tr("color the 10s column (10, 20, 30, 40, 50) and 5s column (5, 15, 25, 35, 45) on a 1-to-50 chart and notice how every 5-step ends in 5 or 0", "закрасить на таблице 1–50 столбик десятков (10, 20, 30, 40, 50) и пятёрок (5, 15, 25, 35, 45), заметив, что все они оканчиваются на 5 или 0", "在1到50的数字表上把5个一数的格子涂上颜色,发现它们全部以数字 5 或 0 结尾"),
    puzB: tr("Four children are sitting at a table, and each child holds up BOTH hands (10 fingers per child). Counting by 10s, how many fingers are up in all?", "За столом сидят 4 ребят, и каждый поднял ОБЕ ладошки (по 10 пальчиков у каждого). Если считать десятками, сколько всего пальчиков поднято?", "4个小朋友坐在桌旁,每个人举起双手(每人10根手指)。10个10个地数,一共举起了多少根手指?"),
    solB: tr("40 fingers! Counting by 10s four times: 10, 20, 30, 40!", "40 пальчиков! Считаем десятками 4 раза: 10, 20, 30, 40!", "40根手指!10个一数数4次: 10、20、30、40!")
  },
  32: {
    catA: "Computer Science", methA: "Oxford", catB: "Logic", methB: "Oxford",
    prop: tr("8 animal or shape cards and a drawn branching Tree Diagram on large paper", "8 карточек животных или фигур и нарисованное на большом листе бинарное дерево вопросов", "8张动物或几何卡片,以及大纸上画出的二分决策树图"),
    def: tr("Binary Decision Tree: by asking Yes/No questions that split the remaining candidates in half at each branch, we can identify 1 secret card out of 8 in just 3 questions!", "Бинарное дерево решений: задавая вопросы «Да/Нет», которые делят оставшиеся варианты пополам, можно угадать 1 секретную карточку из 8 всего за 3 вопроса!", "二分决策树算法: 每次提出一个能将剩余候选对象平分为两半的“是/否”问题,仅需3次提问即可从8张卡片中精准锁定秘密目标!"),
    taskA: tr("place 4 cards (Red Circle, Red Square, Blue Circle, Blue Square) at the top of a tree; Branch 1 asks 'Is it Red?' (splits into 2 and 2), Branch 2 asks 'Is it a Circle?' (isolates each card in 2 steps!)", "положить 4 карточки (Красный круг, Красный квадрат, Синий круг, Синий квадрат) у корня дерева: Вопрос 1 «Красная?» делит их 2 и 2, Вопрос 2 «Круглая?» однозначно находит карту!", "将4张卡片(红圆、红方、蓝圆、蓝方)放在树根: 第1问“是红色吗?”分成左右各2张,第2问“是圆形吗?”即可在2步内唯一定位每张卡!"),
    puzA: tr("I secretly picked one of the 4 cards (Red Circle, Red Square, Blue Circle, Blue Square). You ask: 'Is it Red?' → I say 'NO.' You ask: 'Does it have corners?' → I say 'YES.' Which card do I have?", "Я загадал одну из 4 карт (Красный круг, Красный квадрат, Синий круг, Синий квадрат). Вопрос 1: «Она красная?» — «НЕТ». Вопрос 2: «У неё есть углы?» — «ДА». Какая это карта?", "我从(红圆、红方、蓝圆、蓝方)中秘选了1张。你问:“是红色吗?”我答:“不是。”你又问:“它有尖角吗?”我答:“有。”我手里拿的是哪一张?"),
    solA: tr("The Blue Square! 'Not Red' leaves Blue Circle and Blue Square; 'Has corners' eliminates the circle and leaves the Blue Square.", "Синий квадрат! Ответ «Не красная» оставил синие фигуры, а «Есть углы» исключил круг и оставил Синий квадрат.", "是蓝色正方形!“不是红色”排除了红卡只剩两张蓝卡,“有尖角”排除了圆,唯一锁定蓝色正方形。"),
    taskB: tr("play 'Number Detective 1 to 8': child thinks of a number from 1 to 8, parent guesses it in 3 halving questions ('Is it greater than 4?', etc.), then child asks the questions!", "сыграть в «Детектив чисел от 1 до 8»: угадывать задуманное число от 1 до 8 за 3 вопроса делением пополам («Больше 4?» и т.д.)", "玩“1到8数字大侦探”: 孩子心里想一个1到8的数字,利用二分提问(“比4大吗?”等)在3问之内必中,再互换角色!"),
    puzB: tr("Secret number is between 1 and 4 (1, 2, 3, or 4). Is it better to ask 'Is it 1?' or 'Is it greater than 2?' to cut the choices in half?", "Секретное число — среди 1, 2, 3, 4. Какой вопрос лучше задать, чтобы разделить варианты ровно пополам: «Это 1?» или «Оно больше 2?»", "秘密数字藏在1、2、3、4之中。要想把范围一下子砍掉一半,问“它是1吗?”更好,还是问“它比2大吗?”更好?"),
    solB: tr("Ask 'Is it greater than 2?'! Whether the answer is Yes (3, 4) or No (1, 2), only 2 possibilities remain!", "Спросить «Оно больше 2?»! При любом ответе (Да: 3, 4 или Нет: 1, 2) останется ровно 2 варианта из 4!", "问“它比2大吗?”更好!因为无论回答“是(剩3、4)”还是“否(剩1、2)”,都能确保把候选范围精准缩小一半!")
  },
  33: {
    catA: "Logic", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "Oxford",
    prop: tr("a 3x3 visual puzzle grid with 3 shapes (Circle, Square, Triangle) and toy animals for making up math stories", "сетка 3×3 с тремя фигурами (круг, квадрат, треугольник) и фигурки животных для придумывания своих задач", "3×3视觉逻辑九宫格(含圆、正方、三角)以及用来自己编数学故事的动物玩偶"),
    def: tr("Visual Logic & Problem-Posing: in a visual logic grid, every row and column has one of each shape without repeats; in Problem-Posing, a complete math problem needs two GIVEN facts (the story) and one clear QUESTION to find!", "Наглядная логика и составление задач: в логическом квадрате в каждой строке и столбце все фигуры встречаются по одному разу; а настоящая задача состоит из УСЛОВИЯ (что известно) и ВОПРОСА (что нужно найти)!", "视觉逻辑与自己编题(Problem-Posing): 在3×3图形数独中,每行每列每种图形各出现一次;而在编数学故事时,一道完整的数学题必须包含“已知条件(故事里的信息)”和“一个明确的数学问题”!"),
    taskA: tr("solve a 3×3 Shape Sudoku grid together where each row has 1 Circle, 1 Square, and 1 Triangle, talking aloud about WHY only one shape can fit in the empty box", "решить вместе наглядный квадрат 3×3 из Кругов, Квадратов и Треугольников, проговаривая вслух, ПОЧЕМУ в пустую клетку подходит только одна фигура", "一起完成 3×3 图形逻辑格(每行每列都有1个圆、1个正方形、1个三角形),引导孩子大声说出“为什么空格里只能放这个图形”"),
    puzA: tr("In the top row of our 3-box grid, we already see a Circle and a Triangle. Which shape is missing from the 3rd box of that row?", "В верхней строчке из 3 клеток уже стоят Круг и Треугольник (из набора Круг, Квадрат, Треугольник). Какой фигуры не хватает в третьей клетке?", "在三格排成的一行里,已经放了“圆形”和“三角形”(全套是圆、正方、三角)。请问第3个空格里缺了什么图形?"),
    solA: tr("A Square! Since Circle and Triangle are already in that row, only the Square is left.", "Квадрата! Так как Круг и Треугольник в этой строке уже есть, методом исключения остаётся только Квадрат.", "缺了正方形!因为这一行里已经有了圆和三角形,用排除法可知剩下的必定是正方形。"),
    taskB: tr("practice Problem-Posing: place 5 toy bears and 3 toy ducks on the table and invite your child to invent two different math questions ('How many in all?' vs. 'How many more bears than ducks?') and solve them aloud!", "поупражняться в составлении своих задач: поставить 5 мишек и 3 уточек и попросить ребёнка придумать ДВА разных вопроса к этой картинке («Сколько всего?» и «На сколько мишек больше?»)!", "练习“自己编数学题(Problem-Posing)”: 在桌上摆5只小熊和3只小鸭,请孩子看着玩具自己编出两个不同的数学问题(“一共有几只?” vs “小熊比小鸭多几只?”)并大声解答!"),
    puzB: tr("Listen to this unfinished story: 'Emma has 6 red apples and 2 green apples.' Why is this NOT a math problem yet, and what question can you add to make it an addition problem?", "Послушай незаконченную историю: «У Эммы 6 красных яблок и 2 зелёных яблока». Почему это ещё НЕ задача, и какой вопрос нужно добавить, чтобы задача решалась сложением?", "听这个没讲完的故事:“艾玛有6个红苹果和2个青苹果。”为什么这还不能算一道数学题?你要给它加上什么问题,才能让它变成一道加法题?"),
    solB: tr("It has no question yet! If we ask 'How many apples does Emma have in all?', it becomes a complete math problem: 6 + 2 = 8 apples!", "В ней пока нет ВОПРОСА! Если спросить: «Сколько всего яблок у Эммы?», получится настоящая задача на сложение: 6 + 2 = 8 яблок!", "因为它只有已知条件,还没有提问!只要加上问题“艾玛一共有多少个苹果?”,就变成了一道完整的加法题: 6 + 2 = 8个苹果!")
  },
  34: {
    catA: "Geometry", methA: "Oxford", catB: "Computer Science", methB: "USSR (Kiselev)",
    prop: tr("paper maps with islands and bridges, a marker, and 6 counters to mark crossed bridges", "бумажные схемы с островками и мостиками, фломастер и 6 фишек для отметки пройденных мостов", "画有小岛与小桥的纸面地图、水彩笔以及用来标记已走过桥梁的6枚圆片"),
    def: tr("Eulerian path (one-stroke drawing / Bridges of Königsberg): tracing every bridge (edge) in a network exactly once without lifting the pencil or retracing any bridge.", "Эйлеров путь (рисование одним росчерком / мосты Кёнигсберга): обход всех мостов (рёбер графа) ровно по одному разу без отрыва карандаша и повторов.", "欧拉路径(一笔画与柯尼斯堡七桥问题): 不抬笔、不重复地走遍网络中的每一座桥(图的每条边)恰好一次。"),
    taskA: tr("place a counter on each bridge of a 3-island triangle map and walk a finger across every bridge, picking up each counter as you cross so no bridge is crossed twice", "положить по фишке на каждый мостик треугольной карты из 3 островов и пройти пальчиком по всем мостам, снимая фишки, чтобы не пройти ни один мост дважды", "在3个小岛组成的三角形地图的每座桥上放1枚圆片,用手指走过每座桥并拿走圆片,确保每座桥只走一次"),
    puzA: tr("Three islands A, B, C are connected in a triangle by 3 bridges. If you start on Island A and cross all 3 bridges once, which island do you finish on?", "Три острова А, Б и В соединены по кругу 3 мостами. Если начать прогулку на острове А и пройти все 3 моста по одному разу, на каком острове ты закончишь путь?", "A、B、C三个小岛用3座桥连成一个三角形环路。如果你从A岛出发,不重复地走完这3座桥,最后会停在哪个岛上?"),
    solA: tr("Back on Island A! A triangle of 3 bridges is a closed loop: A → B → C → A.", "Снова на острове А! Треугольник из 3 мостов — это замкнутый цикл: А → Б → В → А.", "正好回到起点A岛!因为3座桥围成闭合环路: A → B → C → A。"),
    taskB: tr("draw a 'House with a Roof' (square with a triangle on top) in one continuous stroke without lifting the crayon or tracing any line twice", "нарисовать «Конверт / Домик с крышей» одним непрерывным росчерком карандаша, не отрывая руки и не проводя по одной линии дважды", "挑战“一笔画小房子(正方形上加三角形屋顶)”: 不抬笔、不走回头路,一气呵成画出整座房子"),
    puzB: tr("Look at a Star shape (+) made of 4 roads meeting at a center crossroads (with dead ends at the 4 tips). Can you walk all 4 roads without ever retracing a road?", "Посмотри на перекрёсток в виде плюса (+), где из центральной точки выходят 4 тупиковые дорожки. Можно ли обойти все 4 дорожки, ни разу не пройдя по одной дорожке дважды?", "看一个“十”字形路口(+),4条死胡同小路汇集在正中心。你能不走任何回头路(每条路只走一次)就把4条小路全走遍吗?"),
    solB: tr("No! Every time you walk out to one of the 4 dead-end tips, you must walk back along that same road to return to the center!", "Нет! Зайдя в конец любой из 4 тупиковых дорожек, тебе придётся вернуться назад по ней же второй раз!", "不能!因为4个端点都是死胡同,一旦走到任何一个端点,要想再去别的路就必须原路返回走第二次!")
  },
  35: {
    catA: "Arithmetic", methA: "Chinese", catB: "Algebra", methB: "Oxford",
    prop: tr("play coins of values 1, 2, 5, and 10, and a toy shop with price tags from 3 to 15", "игрушечные монеты достоинством 1, 2, 5 и 10 и ценники магазина от 3 до 15", "面值为1元、2元、5元、10元的游戏硬币,以及标价3至15元的玩具小商店"),
    def: tr("Value vs Quantity in currency: a single '5' coin has the same value as five '1' coins (1 coin of 5 = 5 coins of 1); Change = Amount Paid - Price.", "Номинал (ценность) против количества монет: одна монета в «5» равна по ценности пяти монетам по «1»; Сдача = Оплата − Цена.", "货币面值与枚数的区别: 1枚“5元硬币”在价值上等于5枚“1元硬币”(等价代换);找零 = 付出的钱 - 商品价格。"),
    taskA: tr("trade single 1-coins at the 'Math Bank' for 2-coins, 5-coins, and 10-coins, and pay for a 7-coin toy in two ways (5+2 using 2 coins, or 5+1+1 using 3 coins)", "менять в «Математическом банке» единичные монетки на монеты по 2, 5 и 10 и оплатить игрушку ценой 7 двумя способами (5+2 или 5+1+1)", "在“数学银行”用1元硬币兑换2元、5元和10元硬币,并用最少硬币数(1枚5元+1枚2元)支付标价7元的玩具"),
    puzA: tr("Brother has ONE coin worth 5. Sister has THREE coins each worth 1. Who has more coins in their hand, and who has more money to spend?", "У брата ОДНА монета с цифрой 5, а у сестры ТРИ монетки с цифрой 1. У кого в руке больше монеток по счёту, а у кого больше денег по ценности?", "哥哥手里只有1枚“5元硬币”,妹妹手里有3枚“1元硬币”。请问谁手里的硬币个数多?谁手里的钱数(购买力)多?"),
    solA: tr("Sister has more coins (3 > 1), but Brother has more money (value 5 > value 3)!", "У сестры больше монеток по штукам (3 > 1), но у брата больше денег по ценности (5 > 3)!", "妹妹的硬币枚数多(3枚>1枚),但哥哥的钱数更多(5元>3元)!面值大小不等于硬币个数。"),
    taskB: tr("role-play shopkeeper and customer: customer pays with a 10-coin for items costing 6, 7, or 8, and shopkeeper counts up from the price to 10 to give exact change", "играть в продавца и покупателя: покупатель даёт монету 10 за товар ценой 6, 7 или 8, а продавец отсчитывает сдачу дополнением до 10", "扮演售货员与顾客找零: 顾客拿1枚10元硬币购买6元、7元或8元的物品,用10的分合算出应找回几元零钱"),
    puzB: tr("You buy a toy car that costs 7 coins. You hand the shopkeeper a 10-coin. How much change should the shopkeeper give back to you?", "Ты покупаешь машинку за 7 монет и даёшь продавцу монету достоинством 10. Сколько сдачи должен вернуть продавец?", "你买了一辆标价7元的玩具车,递给售货员1枚10元硬币。售货员应该找给你几元零钱?"),
    solB: tr("3 coins of change! Because 7 (price) + 3 (change) = 10 (amount paid), or 10 - 7 = 3.", "3 монеты сдачи! Потому что 7 (цена) + 3 (сдача) = 10, или 10 − 7 = 3.", "找回3元零钱!因为 10 - 7 = 3(商品7元加找零3元正好等于付出的10元)。")
  },
  36: {
    catA: "Logic", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "Chinese",
    prop: tr("twin 10-frames, balance scale mat, centimeter ruler, 3D solids, coins, and a Kindergarten Olympiad medal", "две рамки десяти, весы, линейка, объёмные тела, монеты и медаль Олимпиады выпускника", "双十格框、天平代数垫、厘米直尺、立体几何块、游戏币和幼儿园毕业奥数奖章"),
    def: tr("Full-year Kindergarten Grand Synthesis: sets, logic, Make-a-Ten (1–20), balance algebra, metric geometry, perimeter, clocks, probability, and Dirichlet's principle.", "Итоговый синтез года: множества, логика, счёт до 20 через десяток, уравнения на весах, линейка, периметр, часы, вероятность и принцип Дирихле.", "幼儿园大班/幼小衔接全学年大满贯: 集合与逻辑、20以内凑十法、天平代数、厘米度量、周长、时钟、概率与抽屉原理。"),
    taskA: tr("Olympiad Round 1 (Geometry & Algebra): measure a 6-cm segment with a ruler, build a square of perimeter 8 sticks, and solve x + 4 = 10 on the balance scale", "1-й тур Олимпиады (Геометрия и Алгебра): отмерить отрезок 6 см, построить квадрат периметром 8 палочек и решить уравнение x + 4 = 10 на весах", "毕业奥数第一轮(几何与代数): 用直尺画出6厘米线段、搭出周长为8的正方形,并在天平上解出 x + 4 = 10"),
    puzA: tr("Olympiad Logic Problem: There are 4 bunny rabbits and 3 carrots. Every bunny wants a carrot, and remaining bunnies without carrots go into 2 burrows. Wait—why did at least 1 bunny not get a carrot?", "Олимпиадная задача: На полянке 4 зайчика и 3 морковки. Почему хотя бы одному зайчику точно не хватит морковки?", "奥数第一题: 草地上有4只小兔和3根胡萝卜。为什么肯定至少有1只小兔分不到胡萝卜?如果4只小兔钻进3个兔洞,为什么至少有1个洞里有2只小兔?"),
    solA: tr("By one-to-one pairing, 3 carrots match 3 bunnies, leaving 4 - 3 = 1 bunny without a carrot; by Dirichlet's principle, 4 bunnies in 3 burrows forces at least 2 into one burrow!", "По взаимно однозначному соответствию 3 морковки достанутся 3 зайцам, а 1 останется без пары (4 − 3 = 1); а по принципу Дирихле 4 зайца в 3 норках дадут минимум 2 в одной норке!", "根据一一对应,3根胡萝卜配3只小兔还剩 4-3=1 只;根据抽屉原理,4只小兔进3个洞,至少有1个洞里必住2只!"),
    taskB: tr("Olympiad Round 2 (Mental Math & CS): solve 8 + 7 and 9 + 5 on twin ten-frames, tell the time 2 hours after 11 o'clock, and award the Kindergarten Graduation Medal!", "2-й тур Олимпиады (Счёт и Алгоритмы): решить 8 + 7 и 9 + 5 методом дополнения до 10, определить время через 2 часа после 11:00 и вручить медаль Выпускника!", "毕业奥数第二轮(心算与算法): 用凑十法心算 8+7 和 9+5,算出11点过2小时是几点,并颁发幼小衔接数学奥林匹克毕业奖章!"),
    puzB: tr("Grand Finale Puzzle: You have 8 gold stars from Term 1-2 and 6 gold stars from Term 3-4. Using Make-a-Ten (凑十法), how many gold stars did you earn across the whole year?", "Финальная задача года: У тебя 8 золотых звёзд за первое полугодие и 6 звёзд за второе. Используя метод «Дополни до десяти», сколько всего звёзд ты заработал за год?", "学年终极决胜题: 你上半学年赢得了8颗金星,下半学年又赢得了6颗金星。用“凑十法”心算,你一整年一共赢得了多少颗金星?"),
    solB: tr("14 gold stars! Split 6 into 2 and 4; then 8 + 2 = 10, and 10 + 4 = 14!", "14 золотых звёзд! Разложим 6 на 2 и 4: тогда 8 + 2 = 10, и 10 + 4 = 14!", "一共14颗金星!把6拆成2和4,先算 8 + 2 = 10,再算 10 + 4 = 14!")
  }
};

const K_CAT_MAP = {
  "Math Analysis": "Counting",
  "Algebra": "Arithmetic",
  "Computer Science": "Logic",
  "Probability": "Logic"
};
const normKCat = c => K_CAT_MAP[c] || c;

function cloneAndAssign(oldLesson, newId, newTitle) {
  const copy = JSON.parse(JSON.stringify(oldLesson));
  copy.lesson_id = newId;
  copy.category = normKCat(copy.category);
  if (newTitle) copy.title = newTitle;
  return copy;
}

function buildKWeekLessons(w, spec) {
  const wTitle = SYLLABUS.kindergarten_01[w];
  const l1Id = `k01_w${w}_l1`;
  const l2Id = `k01_w${w}_l2`;

  let lessonA, lessonB;

  if (spec.oldA && byOldId[spec.oldA]) {
    lessonA = cloneAndAssign(
      byOldId[spec.oldA],
      l1Id,
      tr(
        `Lesson A: ${wTitle.en} — Hands-On Discovery`,
        `Урок А: ${wTitle.ru} — Наглядное открытие`,
        `A课: ${wTitle.zh} — 动手探索`
      )
    );
    lessonA.teacher_notes = {
      explain: spec.def,
      trap: tr(
        `Rushing to abstract symbols before verifying ${wTitle.en} with ${spec.prop.en}.`,
        `Переход к абстрактным записям до проверки темы «${wTitle.ru}» на предметах (${spec.prop.ru}).`,
        `在用${spec.prop.zh}完成具象验证之前,切勿过早跳入纯符号背诵。`
      ),
      socratic: lessonA.sections[2].prompt
    };
  } else {
    lessonA = {
      lesson_id: l1Id,
      duration_minutes: 35,
      category: normKCat(spec.catA),
      methodology_focus: spec.methA,
      title: tr(
        `Lesson A: ${wTitle.en} — Hands-On Discovery`,
        `Урок А: ${wTitle.ru} — Наглядное открытие`,
        `A课: ${wTitle.zh} — 动手探索`
      ),
      objective: tr(
        `${spec.def.en} Hands-on exploration with ${spec.prop.en}.`,
        `${spec.def.ru} Практическое исследование с помощью: ${spec.prop.ru}.`,
        `${spec.def.zh} 借助${spec.prop.zh}开展具象动手操作。`
      ),
      sections: [
        {
          type: "theory",
          duration: 10,
          parent_script: tr(
            `Welcome to today's math game: "${wTitle.en}"! Let us place ${spec.prop.en} on the table. Here is the key idea we are discovering today: ${spec.def.en} Let's try this together with our hands first and see how it works!`,
            `Добро пожаловать в нашу математическую игру: «${wTitle.ru}»! Положим перед собой на стол ${spec.prop.ru}. Вот главное правило, которое мы сегодня откроем: ${spec.def.ru} Давай сначала проверим это руками на предметах!`,
            `欢迎来到今天的数学游戏课——“${wTitle.zh}”!请把${spec.prop.zh}摆在桌面上。今天我们要一起发现的数学小秘密是: ${spec.def.zh} 先跟着我一起亲手摆一摆、试一试吧!`
          )
        },
        {
          type: "practice",
          duration: 15,
          activity: tr(
            `1) Prepare ${spec.prop.en} on a clear workspace and review the core idea together.\n2) Guided discovery: ${spec.taskA.en}.\n3) Ask your child to show and explain WHY the answer works using the physical pieces.\n4) Role reversal: let your child set up a new example with ${spec.prop.en} for you to solve!`,
            `1) Подготовьте на столе ${spec.prop.ru} и обсудите главное правило урока.\n2) Практическое исследование: ${spec.taskA.ru}.\n3) Попросите ребёнка объяснить, ПОЧЕМУ получился такой ответ, показывая на предметах.\n4) Смена ролей: пусть ребёнок сам придумает и выложит задание для вас!`,
            `1) 在桌面准备好${spec.prop.zh},与孩子一起聊聊本课的核心玩法。\n2) 引导式动手探索: ${spec.taskA.zh}。\n3) 请孩子指着实物教具,用自己的话讲讲“为什么”会得到这个结果。\n4) 角色互换: 让孩子用${spec.prop.zh}出题考家长,由孩子来当小老师!`
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
          `Skipping the tactile setup with ${spec.prop.en} and asking for a memorized answer.`,
          `Пропуск работы руками с предметами (${spec.prop.ru}) и требование заученного ответа.`,
          `跳过使用${spec.prop.zh}的动手操作环节,直接要求孩子死记硬背结论。`
        ),
        socratic: spec.puzA
      }
    };
  }

  if (spec.oldB && byOldId[spec.oldB]) {
    lessonB = cloneAndAssign(
      byOldId[spec.oldB],
      l2Id,
      tr(
        `Lesson B: ${wTitle.en} — Practice & Brainteaser Game`,
        `Урок Б: ${wTitle.ru} — Практика и смекалка`,
        `B课: ${wTitle.zh} — 趣味练习与脑筋急转弯`
      )
    );
    lessonB.teacher_notes = {
      explain: spec.def,
      trap: tr(
        `Giving hints too early instead of letting your child test the puzzle with ${spec.prop.en}.`,
        `Слишком ранняя подсказка вместо того, чтобы дать ребёнку проверить идею на ${spec.prop.ru}.`,
        `过早给出提示,未让孩子利用${spec.prop.zh}独立试错与验证。`
      ),
      socratic: lessonB.sections[2].prompt
    };
  } else {
    lessonB = {
      lesson_id: l2Id,
      duration_minutes: 35,
      category: normKCat(spec.catB),
      methodology_focus: spec.methB,
      title: tr(
        `Lesson B: ${wTitle.en} — Practice & Brainteaser Game`,
        `Урок Б: ${wTitle.ru} — Практика и смекалка`,
        `B课: ${wTitle.zh} — 趣味练习与脑筋急转弯`
      ),
      objective: tr(
        `Practice "${wTitle.en}" through playful hands-on variations: ${spec.taskB.en}.`,
        `Закрепить тему «${wTitle.ru}» через игровые задачи: ${spec.taskB.ru}.`,
        `通过趣味变式游戏巩固“${wTitle.zh}”: ${spec.taskB.zh}。`
      ),
      sections: [
        {
          type: "theory",
          duration: 10,
          parent_script: tr(
            `In Lesson A we explored "${wTitle.en}": ${spec.def.en} Today, in Lesson B, we will play a detective game with ${spec.prop.en} to see what happens when we change the arrangement or work backwards!`,
            `На Уроке А мы познакомились с темой «${wTitle.ru}»: ${spec.def.ru} Сегодня на Уроке Б мы сыграем в математических детективов с помощью ${spec.prop.ru} и проверим интересные загадки!`,
            `在A课中我们一起玩了“${wTitle.zh}”: ${spec.def.zh} 今天的B课我们要当小小数学侦探!借助${spec.prop.zh},看看当位置变化或倒过来想时会发生什么有趣的事。`
          )
        },
        {
          type: "practice",
          duration: 15,
          activity: tr(
            `1) Quick 2-minute recall: demonstrate the core rule of "${wTitle.en}" using ${spec.prop.en}.\n2) Deepening variation: ${spec.taskB.en}.\n3) Mental visualization: cover the props with a cloth and ask your child to picture the transformation in their mind.\n4) Uncover and verify the proof together!`,
            `1) Быстрое повторение (2 минуты): покажите основное правило темы «${wTitle.ru}» на ${spec.prop.ru}.\n2) Углублённый практикум: ${spec.taskB.ru}.\n3) Мысленный образ: накройте предметы салфеткой и попросите ребёнка представить действие в уме.\n4) Откройте салфетку и проверьте доказательство наглядно!`,
            `1) 2分钟快速复盘: 用${spec.prop.zh}演示“${wTitle.zh}”的核心法则。\n2) 进阶变式实操: ${spec.taskB.zh}。\n3) 闭眼珠心算/空间想象: 用布盖住教具,引导孩子在脑海中构建图像并推演结果。\n4) 揭开盖布,共同动手验证推理过程!`
          )
        },
        {
          type: "logic_puzzle",
          duration: 10,
          prompt: spec.puzB,
          solution: spec.solB
        }
      ],
      teacher_notes: {
        explain: spec.def,
        trap: tr(
          `Allowing guessing without asking "How can we prove this is the only possible answer?"`,
          `Принятие ответа наугад без вопроса: «Как доказать, что это единственный верный ответ?»`,
          `允许孩子靠瞎猜作答,而没有追问“怎么证明这是唯一正确的答案?”`
        ),
        socratic: spec.puzB
      }
    };
  }

  return [lessonA, lessonB];
}

const allKLessons = [];
for (let w = 1; w <= 36; w++) {
  const [la, lb] = buildKWeekLessons(w, K_SPECS[w]);
  allKLessons.push(la, lb);
}

const kOut = {
  curriculum: {
    stages: [
      {
        stage_id: "kindergarten_01",
        age_range: "5–6",
        title: tr("Stage 1: Kindergarten (Ages 5–6) — Full School Year", "Ступень 1: Подготовительный класс (5–6 лет) — Учебный год", "第1阶段: 幼儿园大班/幼小衔接 (5–6岁) — 全学年"),
        lessons: allKLessons
      }
    ]
  }
};

fs.writeFileSync('data/curriculum.json', JSON.stringify(kOut, null, 2), 'utf8');
console.log('Generated data/curriculum.json with', allKLessons.length, 'lessons across 36 weeks!');
