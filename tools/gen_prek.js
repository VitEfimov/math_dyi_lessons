import fs from 'node:fs';
import { SYLLABUS } from './build_school_year.js';

const tr = (en, ru, zh) => ({ en, ru, zh });

// Load existing handcrafted Pre-K lessons (Weeks 1-4: 8 lessons)
const archivePrek = JSON.parse(fs.readFileSync('data/archive/curriculum_prek.json', 'utf8'));
const existingLessons = archivePrek.curriculum.stages[0].lessons;

// Attach teacher_notes to existing Pre-K lessons
const existingNotes = {
  prek_w1_l1: {
    explain: tr("Define a set by a single sensory rule: pure color. Keep boundaries physical and tactile with yarn.", "Задавайте множество по одному сенсорному признаку: чистому цвету. Границу делайте физической нитью.", "用单一且不可置疑的感官特征(颜色)定义集合。用毛线在桌面上建立清晰的物理边界圈。"),
    trap: tr("Mixing multiple properties at once (size AND color) which overloads a 3-year-old child.", "Одновременное смешивание признаков (размер И цвет), что перегружает трёхлетнего малыша.", "同时混合多个属性(颜色和大小),容易让3岁幼儿思维超载。"),
    socratic: tr("Look at this blue button. Does it have the red color pass to enter our red circle?", "Посмотри на синюю пуговицу. Есть ли у неё красный пропуск в наш красный круг?", "看这颗蓝纽扣,它有进入红圈圈的红色通行证吗?")
  },
  prek_w1_l2: {
    explain: tr("Do not count out loud! Pair objects one-to-one physically (cup to spoon, bunny to carrot).", "Не считайте вслух! Сопоставляйте предметы строго один к одному физически.", "切勿过早大声数数!纯粹通过实物一一配对(小杯子对小勺子,小兔子对胡萝卜)。"),
    trap: tr("Assuming a spread-out row has 'more' than a clumped row (Piaget conservation trap).", "Иллюзия, что растянутый в длину ряд содержит больше предметов (ловушка Пиаже).", "误以为排成长条的物体比聚成一团的物体“更多”(皮亚杰守恒认知错觉)。"),
    socratic: tr("Does stretching the line make new carrots appear out of thin air? Let us draw pair lines!", "Разве от растягивания ряда появляются новые морковки из воздуха? Давай проверим парами!", "把排队拉长一点,空气里会变出新胡萝卜吗?我们连线配对试一试!")
  },
  prek_w2_l1: {
    explain: tr("Transitivity of size: If A > B and B > C, then A > C. Demonstrate with nesting cups or bowls.", "Транзитивность размера: если А > Б и Б > В, то А > В. Показывайте на матрёшках или стаканчиках.", "大小传递性公理: 若A大于B且B大于C,则A必然大于C。通过套杯套碗层层嵌套直观展示。"),
    trap: tr("Comparing only by height rather than 3D containment.", "Сравнение только по высоте, а не по способности вмещать предмет.", "只看高度而不看三维容积大小。"),
    socratic: tr("If the little cup hides inside the medium cup, will it hide inside the giant daddy cup?", "Если маленький стаканчик спрятался в средний, спрячется ли он в гигантский папин стакан?", "如果小杯子能藏进中杯子里,那它能藏进巨大的爸爸杯子里吗?")
  },
  prek_w2_l2: {
    explain: tr("Patterns are algorithmic loops: ABAB rhythm. Chant aloud to engage audio and visual channels.", "Узоры — это алгоритмические циклы: ритм ABAB. Проговаривайте вслух под ритмичный напев.", "规律即计算机循环: ABAB韵律。大声念出节奏,调动听觉与视觉多感官通道。"),
    trap: tr("Interrupting the pattern rhythm before the child hears the cyclic repetition.", "Прерывание ритма до того, как ребёнок уловил циклический повтор.", "在孩子听出周期性旋律前过早打断。"),
    socratic: tr("Listen to our train: Red, Blue, Red, Blue... who is singing next?", "Послушай поезд: Красный, Синий, Красный, Синий... кто запоёт следующим?", "听听小火车唱歌: 红、蓝、红、蓝…接下来轮到谁唱歌了?")
  },
  prek_w3_l1: {
    explain: tr("A straight line is the shortest path between two points. Pull the yarn tight so child feels the tension.", "Прямая — кратчайший путь между двумя точками. Натяните нить туго, чтобы ребёнок ощутил натяжение.", "两点间直线最近。双手拉紧毛线,让幼儿掌心切实感受张力。"),
    trap: tr("Thinking a curved wiggly path might be shorter because it looks more fun.", "Заблуждение, что извилистый путь быстрее, потому что он интереснее.", "以为弯弯曲曲好玩的小路可能会更快。"),
    socratic: tr("Pull the string tight! Can we make it even straighter? No, it is already the shortest path!", "Тяни нитку туго! Можно сделать её ещё прямее? Нет, это уже кратчайший путь!", "使劲拉紧!还能更直吗?不能了,这已经是两只手之间最近的路了!")
  },
  prek_w3_l2: {
    explain: tr("A closed loop separates the whole plane into inside, outside, and the boundary line (Jordan curve).", "Замкнутая петля делит плоскость на внутри, снаружи и границу (кривая Жордана).", "封闭闭合线将空间绝对划分为圈内、圈外与边界线(若尔当曲线定理)。"),
    trap: tr("Leaving an unclosed gap in the loop so 'inside' leaks out.", "Оставление щели в кольце, из-за чего понятие «внутри» теряет смысл.", "绳圈留有缝隙未闭合,导致“圈内”漏到外面。"),
    socratic: tr("Can your finger walk to the desk edge without touching the rope? If the fence is closed, you cannot!", "Может ли пальчик дойти до края стола, не задев верёвку? Если забор закрыт — никак!", "手指不碰绳子能走到桌沿吗?围栏关紧的时候绝对出不去!")
  },
  prek_w4_l1: {
    explain: tr("Flash subitizing 1-3. Do not allow counting 1-by-1. Train instant visual pattern intake.", "Субитизация 1-3. Запрещайте пересчёт пальцем. Тренируйте мгновенный зрительный снимок.", "1-3极速识数。禁止逐一掰手指,训练照相机式瞬间视觉摄入。"),
    trap: tr("Reverting to finger pointing out of habit.", "Возврат к пересчёту пальчиком по привычке.", "孩子出于习惯下意识伸出手指点数。"),
    socratic: tr("Take a photo with your eyes: Click! How many dots did your camera see?", "Сделай снимок глазками: Щёлк! Сколько точек увидела твоя камера?", "眼睛咔嚓拍一张照片!你的小照相机拍到了几个点?")
  },
  prek_w4_l2: {
    explain: tr("Certain means guaranteed 100%. Impossible means 0%, cannot happen in the universe.", "Достоверно — это 100% гарантия. Невозможно — 0%, не может случиться никогда.", "“必然”是100%一定会发生。“不可能”是0%,宇宙中绝无可能发生。"),
    trap: tr("Confusing 'unlikely' with 'impossible'.", "Путаница между «редко» и «невозможно».", "混淆“罕见”与“绝不可能”。"),
    socratic: tr("If there are ONLY apples in the bag, can an orange magically jump into your hand?", "Если в мешке ТОЛЬКО яблоки, может ли в руке волшебно появиться апельсин?", "如果袋子里只有苹果,手里能凭空变出一个橘子吗?")
  }
};

for (const l of existingLessons) {
  l.teacher_notes = existingNotes[l.lesson_id];
}

// Week-by-week specifications for Pre-K Weeks 5..36
const PREK_SPECS = {
  5: {
    catA: "Counting", methA: "Chinese", catB: "Counting", methB: "Chinese",
    prop: tr("dot flash-cards (1, 2, 3 dots) and wooden blocks", "карточки с точками (1, 2, 3) и деревянные кубики", "圆点闪卡(1、2、3点)和木制积木"),
    def: tr("Quantity 1, 2, or 3 stays invariant whether arranged in a line, a triangle, or shown on fingers.", "Количество 1, 2 или 3 не меняется, расположены ли точки в ряд, треугольником или показаны на пальцах.", "1、2、3的数量无论排成直线、三角形还是用手指比划,其总数恒定不变。"),
    taskA: tr("flash dot cards for 1 second and match them to 1, 2, or 3 claps and finger patterns", "показывать карточки на 1 секунду и отвечать 1, 2 или 3 хлопками и пальчиками", "闪示圆点卡1秒,用对应次数的拍手与手指造型快速回应"),
    puzA: tr("I show 2 fingers on my left hand and 1 finger on my right hand. Without counting one-by-one, which dot card has the same amount?", "Я показываю 2 пальца на левой руке и 1 на правой. Не пересчитывая по одному, какая карточка с точками содержит столько же?", "我左手伸2根手指,右手伸1根手指。不用一个个数,哪张圆点卡上的点子和我的手指一样多?"),
    solA: tr("The 3-dot triangle card! Two and one together form the triad pattern of 3.", "Карточка с 3 точками треугольником! Два да один образуют тройку.", "3点三角形卡!2和1合起来正好构成3的整体图像。"),
    taskB: tr("rearrange 3 blocks from a straight train into an L-corner and a triangle without adding or taking away any block", "перестраивать 3 кубика из поезда в уголок и треугольник, ничего не добавляя и не убирая", "把3块积木从一字火车变成拐角形和品字形,期间不添一块也不拿走一块"),
    puzB: tr("Three little frogs sit in a straight row. They hop into a triangle. Did a fourth frog appear, or are there still 3?", "Три лягушонка сидели в ряд, а потом прыгнули треугольником. Появился ли четвёртый лягушонок или их всё ещё 3?", "3只小青蛙本来排成一排,跳了一下变成三角形。青蛙变多了吗,还是依然只有3只?"),
    solB: tr("Still 3! Changing positions in space never changes the number of frogs (conservation of number).", "Всё ещё 3! Перемена мест в пространстве никогда не меняет количество (сохранение числа).", "依然是3只!空间摆放位置的变化绝对不会改变物体的数量(数量守恒律)。")
  },
  6: {
    catA: "Computer Science", methA: "Oxford", catB: "Logic", methB: "Oxford",
    prop: tr("toy animals (bears, bunnies, ducks) and colored mats", "игрушечные зверята (мишки, зайки, уточки) и цветные коврики", "玩具小动物(小熊、小兔、小鸭)和彩色垫子"),
    def: tr("A repeating pattern is a strict cyclic rule (ABAB or AABAAB) where each position is determined by the rule.", "Повторяющийся узор — это строгое циклическое правило (ABAB или AABAAB), где каждое место задано правилом.", "重复规律是一种严格的周期性算法(ABAB或AABAAB),每个位置都由既定规则决定。"),
    taskA: tr("build Bear-Bunny-Bear-Bunny chains and cover one middle animal with a cup to deduce the hidden toy", "строить цепочки Мишка-Зайка-Мишка-Зайка и накрывать одну игрушку в середине стаканчиком, чтобы угадать её", "排列“小熊-小兔-小熊-小兔”队列,用纸杯盖住中间一只让孩子推理杯下是谁"),
    puzA: tr("Our parade goes: Duck, Bear, Duck, Bear, [Cup], Bear. Who is hiding under the cup?", "Наш парад идёт так: Уточка, Мишка, Уточка, Мишка, [Стаканчик], Мишка. Кто спрятался под стаканчиком?", "动物游行队伍是: 小鸭、小熊、小鸭、小熊、[纸杯]、小熊。纸杯底下藏着谁?"),
    solA: tr("A Duck! Because between every two Bears in an alternating ABAB parade, there must be a Duck.", "Уточка! Потому что между каждыми двумя Мишками в чередующемся ряду ABAB обязательно стоит Уточка.", "是小鸭!因为在ABAB交替队列里,两只小熊中间必定是一只小鸭。"),
    taskB: tr("upgrade to a 3-step rhythm: Clap-Clap-Jump (AABAAB) and translate it into Red-Red-Blue block towers", "перейти к трёхшаговому ритму: Хлоп-Хлоп-Прыжок (AABAAB) и перевести его в кубики Красный-Красный-Синий", "进阶到三拍韵律: 拍-拍-跳(AABAAB),并将其编码翻译成“红-红-蓝”积木序列"),
    puzB: tr("Clap-Clap-Jump, Clap-Clap-Jump! If we do two Claps right now, what action must our feet do next?", "Хлоп-Хлоп-Прыжок, Хлоп-Хлоп-Прыжок! Если мы только что сделали два Хлопка, что должны сделать ножки?", "“拍-拍-跳,拍-拍-跳!”如果我们刚刚拍了两下手,接下来双脚必须做什么动作?"),
    solB: tr("Jump! In an AAB cycle, two A's are always followed by one B.", "Прыжок! В цикле AAB после двух действий А всегда следует действие B.", "跳!在AAB循环律中,连续两个A动作之后必定紧跟一个B动作。")
  },
  7: {
    catA: "Algebra", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("a coat-hanger balance scale (or outstretched hands), wooden blocks, and feathers", "весы из плечиков (или ладошки), деревянные кубики и пёрышки", "衣架简易天平(或双手平伸)、木积木和羽毛"),
    def: tr("Weight is an attribute independent of visual size; a balance scale tips down toward the heavier side and stays level when weights are equal.", "Вес не зависит от видимого размера; чаша весов опускается там, где тяжелее, и держится ровно при равенстве.", "重量是独立于外观大小的属性;天平向更重的一侧下沉,两侧重量相等时保持水平平衡。"),
    taskA: tr("place a large inflated balloon on one hand and a small metal spoon on the other to feel that bigger is not always heavier", "положить на одну ладонь большой воздушный шарик, а на другую — маленькую металлическую ложку, ощутив, что большое не всегда тяжёлое", "一手托大吹气球,一手托小金属勺,亲身感知“体积大不一定重”"),
    puzA: tr("A giant fluffy cotton ball is on the left pan, and a small stone is on the right pan. Which pan goes DOWN?", "Огромный пушистый комок ваты лежит на левой чаше, а маленький камушек — на правой. Какая чаша опустится ВНИЗ?", "左边托盘放一大团蓬松的棉花,右边托盘放一颗小石头。哪边的托盘会沉下去?"),
    solA: tr("The right pan with the stone! The stone has greater mass, so gravity pulls its pan down despite its smaller size.", "Правая чаша с камушком! Камень тяжелее ваты, поэтому чаша с ним опускается вниз, хоть он и меньше по размеру.", "右边放石头的托盘会沉下去!因为石头比棉花重,天平只看重量不看个头大小。"),
    taskB: tr("balance 2 identical wooden blocks on the left pan by placing 1 block on the right pan and asking how many more blocks are needed to make it level", "уравновесить 2 одинаковых кубика слева, положив 1 кубик справа и подобрав ещё кубики до ровного положения", "左盘放2块相同积木,右盘先放1块,让孩子动手添积木直到天平恢复水平"),
    puzB: tr("Left pan has 2 identical apples. Right pan has 1 identical apple. What must we do to make the balance beam perfectly flat?", "На левой чаше 2 одинаковых яблока, на правой — 1 такое же яблоко. Что нужно сделать, чтобы коромысло весов стало ровным?", "左盘有2个一模一样的苹果,右盘只有1个同样的苹果。怎样才能让天平两端完全平齐?"),
    solB: tr("Either add 1 apple to the right pan (1+1=2) OR remove 1 apple from the left pan (2-1=1)!", "Либо добавить 1 яблоко на правую чашу (1+1=2), ЛИБО убрать 1 яблоко с левой чаши (2-1=1)!", "有两种办法: 往右盘再添1个苹果(1+1=2),或者从左盘拿走1个苹果(2-1=1)!")
  },
  8: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Chinese",
    prop: tr("cardboard circles and squares, jar lids, coasters, and 4 equal sticks", "картонные круги и квадраты, крышки от банок, подставки и 4 равные палочки", "硬纸板圆形与正方形、瓶盖、方形杯垫和4根等长小棒"),
    def: tr("A circle has a smooth curved boundary that rolls; a square has 4 straight equal sides and 4 sharp corners that prevent rolling.", "У круга гладкая изогнутая граница без углов, поэтому он катится; у квадрата 4 прямые равные стороны и 4 угла.", "圆形由平滑无角的曲线围成,可以顺畅滚动;正方形有4条相等的直边和4个尖角,无法滚动。"),
    taskA: tr("trace a finger around a circle (never stops at a corner) and around a square (count 1-2-3-4 corners and 4 straight sides)", "обвести пальчиком круг (нет углов) и квадрат (посчитать 1-2-3-4 уголка и 4 прямые стороны)", "用手指沿圆形边缘滑动(没有拐角),再沿正方形边缘滑动(数出1-2-3-4个尖角和4条直边)"),
    puzA: tr("Why does a bicycle have round circular wheels instead of square wheels?", "Почему у велосипеда круглые колёса, а не квадратные?", "为什么自行车的轮子要做成圆形的,而不能做成正方形的?"),
    solA: tr("A circle has no corners, so its edge stays at a constant distance from the center and rolls smoothly. Square corners would bump and get stuck!", "У круга нет углов, все точки края равноудалены от центра, и он плавно катится. Квадратные углы застревали бы при каждом повороте!", "因为圆没有尖角,边缘到中心距离处处相等,能平稳滚动;正方形的4个尖角会让车子一颠一颠卡住!"),
    taskB: tr("build a square out of 4 equal sticks and rotate it slightly like a kite to prove it is still the exact same square", "сложить квадрат из 4 равных палочек и повернуть его углом вверх, убедившись, что он остался тем же квадратом", "用4根等长小棒拼成正方形,再把它斜转过来摆成风筝样,验证它依然是同一个正方形"),
    puzB: tr("I turn a square cracker so one corner points up at the ceiling. Did it turn into a circle, or is it still a square with 4 equal sides?", "Я повернул квадратное печенье уголком вверх к потолку. Оно превратилось в круг или осталось квадратом с 4 равными сторонами?", "我把一块正方形饼干斜过来拿,让一个尖角朝向天花板。它变成别的图形了吗,还是依然有4条等边和4个角?"),
    solB: tr("It is still a square! Rotating a shape in space never changes its 4 equal sides and 4 corners.", "Оно осталось квадратом! Поворот фигуры в пространстве не меняет её 4 равных сторон и 4 углов.", "它依然是正方形!旋转摆放角度不会改变它的4条等长直边和4个角。")
  },
  9: {
    catA: "Logic", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Oxford",
    prop: tr("two yarn loops (red and blue), animal figures, and a tape maze on the floor", "два кольца из нитей (красное и синее), фигурки животных и лабиринт из ленты на полу", "两个毛线圈(红圈和蓝圈)、动物模型以及地板胶带迷宫"),
    def: tr("Term 1 synthesis: classifying objects by clear rules, comparing sizes transitively, and navigating closed boundaries.", "Синтез 1-й четверти: классификация по чёткому правилу, транзитивное сравнение размеров и обход замкнутых границ.", "第1学段综合复盘: 按明确规则分类、传递性大小比较与闭合边界迷宫寻路。"),
    taskA: tr("sort 6 safari animals into 'Lives in Water' vs 'Lives on Land' hoops and pair each animal with a matching-size bowl", "рассортировать 6 животных сафари в обручи «Живёт в воде» и «Живёт на суше» и подобрать каждому миску по размеру", "将6只动物按“水生”与“陆生”分类进圈,并为大中小型动物匹配对应大小的食盆"),
    puzA: tr("In the Land hoop there are 3 elephants. We bring 2 water bowls. How many elephants are still waiting for a bowl?", "В обруче «Суша» стоят 3 слоника. Мы принесли 2 миски с водой. Сколько слоников всё ещё ждут свою миску?", "陆地圈里有3只小象,我们端来2碗水。一配一之后,还有几只小象没分到水碗?"),
    solA: tr("1 elephant! Two elephants pair with the 2 bowls, leaving 1 elephant without a pair.", "1 слоник! Двум слоникам достанется по миске, а 1 слоник останется без пары.", "还有1只小象!2只小象配2只碗,剩下1只小象落单。"),
    taskB: tr("walk a toy jeep along a straight road vs a curved detour through a floor tape maze without crossing any closed wall", "провести игрушечный джип по прямой дороге и по кривому объезду в лабиринте на полу, не пересекая закрытых стен", "驾驶玩具吉普车在胶带迷宫中对比直线捷径与曲线绕行,严格不跨越封闭墙壁"),
    puzB: tr("The lion's den is surrounded by a closed rope fence with NO gate. Can the jeep drive inside without running over the rope?", "Логово льва окружено замкнутым верёвочным забором БЕЗ ворот. Может ли джип заехать внутрь, не переехав через верёвку?", "狮子窝被一圈完全闭合、没有门的绳子围住了。吉普车能在不压过绳子的前提下开进去吗?"),
    solB: tr("No! By the closed boundary law, you cannot pass from outside to inside without crossing the boundary.", "Нет! По закону замкнутой границы нельзя попасть снаружи внутрь, не пересекая саму границу.", "不能!根据闭合边界定理,不穿过边界线就绝不可能从外部进入内部。")
  },
  10: {
    catA: "Counting", methA: "USSR (Kiselev)", catB: "Logic", methB: "Chinese",
    prop: tr("a single sun card, a nose in the mirror, and trays of single vs grouped toys", "карточка с одним солнцем, зеркало (один нос) и подносы с одиночными и парными игрушками", "一张太阳卡、一面镜子(观察1个鼻子)以及单件与多件玩具托盘"),
    def: tr("The number ONE (1) is the property of any set containing a single, unique element with no other companions in that set.", "Число ОДИН (1) — это свойство множества, в котором есть ровно один-единственный элемент и больше никого.", "数字“1”是所有仅包含唯一一个独立元素的集合的共同属性。"),
    taskA: tr("hunt around the room and body for things that come in sets of exactly 1: 1 nose, 1 mouth, 1 head, 1 sun in the sky", "найти на себе и в комнате то, чего ровно по 1: 1 нос, 1 рот, 1 голова, 1 солнце на небе", "在身体和房间里寻找数量恰好为1的事物: 1个鼻子、1张嘴、1个脑袋、天上1个太阳"),
    puzA: tr("Look in the mirror: Do you have 1 nose or 2 noses? What about eyes—do eyes belong in the 'Set of 1'?", "Посмотри в зеркало: у тебя 1 нос или 2? А глазки — подходят ли глазки в «Множество по одному»?", "照照镜子: 你有1个鼻子还是2个鼻子?那眼睛呢,眼睛属于“数量为1的集合”吗?"),
    solA: tr("You have 1 nose (belongs to Set of 1), and 2 eyes (does NOT belong to Set of 1 because there is a pair!).", "У тебя 1 нос (входит в множество единицы), а глазок 2 (они НЕ входят, потому что образуют пару!).", "你有1个鼻子(属于1的集合),但有2只眼睛(不属于1的集合,因为眼睛是一对)!"),
    taskB: tr("place 1 apple in a basket, then take it out so the basket is empty (0), contrasting 1 vs 0 (empty set)", "положить 1 яблоко в корзинку, а затем вынуть его, сделав корзинку пустой (0), сравнивая 1 и пустое множество 0", "在篮子里放1个苹果,再拿出来变成空篮子(0),直观对比“有1个”与“空集0个”"),
    puzB: tr("There is 1 bird on a branch. The 1 bird flies away. How many birds are left on the branch?", "На ветке сидела 1 птичка. Эта 1 птичка улетела. Сколько птичек осталось на ветке?", "树枝上停着1只小鸟,这1只小鸟飞走了。现在树枝上还有几只小鸟?"),
    solB: tr("Zero (none)! When you remove the single element from a set of 1, the set becomes empty.", "Ноль (ни одной)! Когда из множества в 1 элемент убирают этот единственный элемент, множество становится пустым.", "0只(一只也没有了)!当把单元素集合里的唯一元素移走后,集合就变成了空集。")
  },
  11: {
    catA: "Counting", methA: "Chinese", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("pairs of socks, shoes, mittens, and chopsticks", "пары носков, ботинок, варежек и палочек для еды", "成双的袜子、鞋子、连指手套和筷子"),
    def: tr("The number TWO (2) is one and one more (1 + 1 = 2); it forms a complete PAIR where two items match each other.", "Число ДВА (2) — это один да ещё один (1 + 1 = 2); оно образует ПАРУ, где два предмета дополняют друг друга.", "数字“2”是1添上1(1+1=2);它在生活中构成“一双/一对”,两个元素成双配对。"),
    taskA: tr("mix up 3 pairs of patterned socks in a pile and have the child find each twin to form pairs of 2", "перемешать 3 пары разных носков в кучке и попросить ребёнка найти близнецов, сложив пары по 2", "把3双不同花纹的袜子打乱,让孩子找出孪生配对组成“每双2只”"),
    puzA: tr("You put a sock on your left foot. How many more socks do you need so BOTH feet are warm?", "Ты надел носочек на левую ножку. Сколько ещё носочков нужно надеть, чтобы ОБЕ ножки были в тепле?", "你左脚穿上了1只袜子。还需要再穿几只袜子,才能让两只小脚都暖和?"),
    solA: tr("1 more sock! Because 1 foot + 1 foot = 2 feet (a pair).", "Ещё 1 носочек! Потому что 1 да ещё 1 — это 2 (полная пара).", "还需要1只袜子!因为1添上1等于2,凑成完整的一双。"),
    taskB: tr("hold up 1 block in each hand, clap them together while saying '1 and 1 make 2!', then separate them back into 1 and 1", "взять по 1 кубику в каждую руку, соединить их со словами «1 да 1 будет 2!», а затем снова развести на 1 и 1", "左右手各拿1块积木,合拢碰在一起大声说“1和1合起来是2!”,再分开说“2可以分成1和1”"),
    puzB: tr("A mother duck has 2 ducklings. One duckling hides behind a reed. How many ducklings can we still see?", "У мамы-утки 2 утёнка. Один утёнок спрятался за камыш. Сколько утят мы всё ещё видим?", "鸭妈妈带着2只小鸭子,其中1只躲进了芦苇丛后面。我们还能看见几只小鸭子?"),
    solB: tr("1 duckling! Because 2 splits into 1 and 1; if 1 is hidden, 1 remains visible.", "1 утёнка! Потому что 2 состоит из 1 и 1: если один спрятался, один остался на виду.", "还能看见1只!因为2是由1和1组成的,藏起1只就剩下1只。")
  },
  12: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Counting", methB: "Chinese",
    prop: tr("3 straws or popsicle sticks, playdough balls, and a 3-legged stool", "3 трубочки или палочки, шарики пластилина и трёхногий табурет", "3根吸管或冰棒棍、橡皮泥小球和三脚架/三脚凳"),
    def: tr("The number THREE (3) is 2 and 1 more (2 + 1 = 3); geometrically, 3 non-collinear points joined by 3 straight segments form a TRIANGLE.", "Число ТРИ (3) — это 2 да ещё 1 (2 + 1 = 3); геометрически 3 точки, соединённые 3 отрезками, образуют ТРЕУГОЛЬНИК.", "数字“3”是2添上1(2+1=3);几何上,不在同一直线上的3个顶点由3条线段首尾相连构成三角形。"),
    taskA: tr("use 3 balls of playdough as vertices (corners) and connect them with 3 sticks to build a rigid triangle", "слепить 3 шарика пластилина (вершины) и соединить их 3 палочками, построив жёсткий треугольник", "捏3个橡皮泥球作为顶点,用3根小木棒把它们连接起来拼成一个稳固的三角形"),
    puzA: tr("I give you 2 sticks. Can you close them up with straight sides to build a triangle, or is a stick missing?", "Я дал тебе 2 палочки. Сможешь ли ты замкнуть их прямыми сторонами, чтобы получился треугольник, или не хватает палочки?", "我只给你2根笔直的小木棒。你能把它们围成一个封闭的三角形吗,还是缺了小木棒?"),
    solA: tr("A stick is missing! Two straight segments can only meet at one corner; you need a 3rd segment to close the triangle.", "Не хватает 1 палочки! Два прямых отрезка не могут замкнуть пространство — нужен 3-й отрезок, чтобы закрыть треугольник.", "缺了1根小棒!两条直边只能碰出一个角,必须要有第3根小棒才能把开口封上围成三角形。"),
    taskB: tr("act out 'The Three Bears': set 3 plates, 3 spoons, and 3 chairs, counting '1, 2, 3—three in all!'", "разыграть «Три медведя»: расставить 3 тарелки, 3 ложки и 3 стула, приговаривая «1, 2, 3 — всего три!»", "扮演《三只熊》故事: 摆出3个盘子、3把勺子、3把椅子,点数确认“1、2、3,一共是3!”"),
    puzB: tr("Papa Bear, Mama Bear, and Baby Bear are sitting at the table. Papa Bear goes to check the door. How many bears are still at the table?", "Папа-медведь, Мама-медведица и Мишутка сидят за столом. Папа пошёл открыть дверь. Сколько медведей осталось за столом?", "熊爸爸、熊妈妈和小熊宝宝一共3只熊坐在桌旁。熊爸爸起身去开门了,桌旁还剩几只熊?"),
    solB: tr("2 bears (Mama and Baby)! Because 3 take away 1 leaves 2.", "2 медведя (Мама и Мишутка)! Потому что 3 без одного — это 2.", "还剩2只熊(熊妈妈和熊宝宝)!因为3去掉1还剩2。")
  },
  13: {
    catA: "Counting", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Chinese",
    prop: tr("a toy car with 4 wheels, a chair with 4 legs, and 4 square tiles", "машинка с 4 колёсами, стул с 4 ножками и 4 квадратные плитки", "有4个轮子的玩具车、4条腿的椅子和4块正方形瓷砖片"),
    def: tr("The number FOUR (4) is 3 and 1 more (3 + 1 = 4), and it is also two pairs (2 + 2 = 4), seen in the 4 corners of a square.", "Число ЧЕТЫРЕ (4) — это 3 да ещё 1 (3 + 1 = 4), а также две пары (2 + 2 = 4), как 4 угла у квадрата.", "数字“4”是3添上1(3+1=4),同时也是两对的组合(2+2=4),正如正方形的4个角与小车的4个轮子。"),
    taskA: tr("turn a toy car upside down and count the 2 front wheels and 2 back wheels: 1, 2, 3, 4 wheels in total", "перевернуть машинку и посчитать 2 передних колеса и 2 задних: 1, 2, 3, 4 — всего 4 колеса", "把玩具小车翻过来,先看前排2个轮子,再看后排2个轮子,合起来数1、2、3、4个轮子"),
    puzA: tr("A puppy has 2 front paws and 2 back paws. How many little boots does the puppy need for the snow?", "У щенка 2 передние лапки и 2 задние лапки. Сколько сапожек нужно надеть щенку на прогулку по снегу?", "小狗有2只前爪和2只后爪。下雪天出门,小狗一共需要穿几只小雪地靴?"),
    solA: tr("4 boots! Two front paws plus two back paws equal 4 paws in all (2 + 2 = 4).", "4 сапожка! Две передние лапки да две задние — всего 4 лапки (2 + 2 = 4).", "需要4只小靴子!两只前爪加两只后爪一共是4只爪子(2+2=4)。"),
    taskB: tr("arrange 4 square tiles into a long 1x4 train, then rearrange the exact same 4 tiles into a 2x2 big square", "выложить 4 квадратные плитки в длинный поезд 1×4, а затем сложить из тех же 4 плиток большой квадрат 2×2", "把4块小方片先排成一长条(1×4火车),再拼成一个2×2的大正方形"),
    puzB: tr("Did the 2x2 big square use more tiles than the 1x4 long train, or the exact same 4 tiles?", "Потребовалось ли для большого квадрата 2×2 больше плиток, чем для длинного поезда 1×4, или это те же самые 4 плитки?", "拼成2×2大正方形用的方片,比排成长火车时更多吗,还是完完全全就是那4块?"),
    solB: tr("The exact same 4 tiles! Rearranging 4 into a 2x2 array preserves the quantity 4.", "Ровно те же 4 плитки! Перестановка 4 элементов в квадрат 2×2 полностью сохраняет количество 4.", "完完全全就是那4块!把1×4长条重组为2×2方阵,总数量4保持不变。")
  },
  14: {
    catA: "Counting", methA: "Chinese", catB: "Arithmetic", methB: "Chinese",
    prop: tr("a cardboard 5-frame (1x5 grid), 5 two-color counters, and the child's own hand", "картонная полоска-пятиклеточка (1×5), 5 фишек и ладошка ребёнка", "五格框纸板(1×5方格)、5枚双色圆片以及孩子自己的小手"),
    def: tr("The number FIVE (5) is 4 and 1 more (4 + 1 = 5); it fills one complete hand (5 fingers) and one complete 5-frame.", "Число ПЯТЬ (5) — это 4 да ещё 1 (4 + 1 = 5); оно заполняет всю ладошку (5 пальцев) и всю полоску-пятиклеточку.", "数字“5”是4添上1(4+1=5);它刚好占满一整只手掌(5根手指)和一整个五格框,是十进制算盘的核心中继基准。"),
    taskA: tr("place 1 counter on each finger of an outlined handprint on paper, then slide them into the 5 boxes of a 5-frame", "положить по 1 фишке на каждый пальчик обведённой на бумаге ладошки, а затем передвинуть их в 5 окошек пятиклеточки", "在纸上描出孩子的小手印,每根手指上放1枚圆片,再将它们一一滑入五格框的5个房间里"),
    puzA: tr("Our 5-frame has 5 rooms. Right now, 4 rooms have bears in them and 1 room is empty. How many more bears do we need to make the house completely full (5)?", "В нашем домике-пятиклеточке 5 комнат. Сейчас в 4 комнатах сидят мишки, а 1 комната пустая. Сколько ещё мишек нужно заселить до полных 5?", "我们的五格框小房子有5个房间。现在4个房间住了小熊,只有1个空房间。再住进几只小熊就能住满5只?"),
    solA: tr("1 more bear! Because 4 occupied rooms plus 1 empty room equals all 5 rooms (4 + 1 = 5).", "Ещё 1 мишку! Потому что 4 занятых окошка да 1 пустое — это все 5 окошек (4 + 1 = 5).", "再住进1只小熊!因为4加1等于5,填满最后1个空格就是完整的5。"),
    taskB: tr("play 'Hide Fingers': show all 5 fingers, fold down the thumb (leaving 4), or fold down 2 fingers (leaving 3)", "сыграть в «Прятки пальчиков»: показать все 5 пальцев, загнуть большой палец (осталось 4), затем загнуть 2 пальца (осталось 3)", "玩“手指捉迷藏”: 张开5根手指,弯下大拇指看还立着几根(4根),弯下2根手指看还立着几根(3根)"),
    puzB: tr("Five fingers are standing up tall. Two sleepy fingers lie down to nap. How many fingers are still standing awake?", "Пять пальчиков стоят ровно. Два сонных пальчика легли спать. Сколько бодрых пальчиков продолжают стоять?", "5根手指头站得笔直,有2根犯困的手指头弯下去睡觉了。还剩几根清醒的手指头立着?"),
    solB: tr("3 fingers! Because 5 splits into 2 and 3 (5 - 2 = 3).", "3 пальчика! Потому что 5 состоит из 2 и 3 (5 − 2 = 3).", "还剩3根手指!因为5可以分成2和3(5-2=3)。")
  },
  15: {
    catA: "Math Analysis", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Oxford",
    prop: tr("a tall narrow glass, a short wide bowl, a measuring cup, and colored water", "высокий узкий стакан, низкая широкая миска, мерный стаканчик и подкрашенная вода", "高瘦透明杯、矮胖透明碗、标准小量杯和滴了色素的有色水"),
    def: tr("Conservation of volume (continuous quantity): pouring liquid into a wider or narrower container changes the water level height, but the total amount of water remains invariant.", "Сохранение объёма (непрерывной величины): при переливании воды в широкий или узкий сосуд меняется высота уровня, но количество воды остаётся неизменным.", "连续量体积守恒公理: 将水倒入高瘦或矮胖的容器时,水位高度会改变,但水的总量绝对不变。"),
    taskA: tr("pour 1 cup of blue water into the tall narrow glass, mark the height, then pour that exact water into the wide bowl and back again", "налить 1 чашку синей воды в узкий высокий стакан, отметить уровень, а затем перелить эту же воду в широкую миску и обратно", "将1小杯蓝水倒入高瘦杯并标记水位,再当着孩子的面把水全部倒进矮胖碗里,然后再倒回高瘦杯验证水位"),
    puzA: tr("When we poured the water from the tall glass into the wide bowl, the water level went down low. Did someone drink the water, or is it the exact same amount?", "Когда мы перелили воду из высокого стакана в широкую миску, уровень опустился низко. Кто-то отпил воду или её осталось ровно столько же?", "当我们把高瘦杯里的水倒进矮胖碗里时,水面变矮了。是有人偷偷喝掉了一口水,还是水一点儿也没少?"),
    solA: tr("The exact same amount! The bowl is wider, so the water spreads out sideways instead of stacking up high.", "Ровно столько же! Миска широкая, поэтому вода разлилась вширь, а не ввысь.", "水一点儿也没少!因为碗底很宽,水向四周铺开了,倒回高瘦杯里立刻又回到原来的高度。"),
    taskB: tr("fill two big jars using a small scoop, counting 3 scoops into Jar A and 3 scoops into Jar B to prove equal volume despite different jar shapes", "наполнить две разные банки маленьким черпачком, отмерив ровно по 3 черпачка в каждую, доказав равенство объёма", "用同一个小勺向两个形状不同的空瓶装水或米,各装满3勺,通过标准单位度量证明两瓶容量相等"),
    puzB: tr("Jar A is tall and Jar B is round. Both were filled with 3 full scoops of rice using the same scoop. Which jar has more rice?", "Банка А высокая, а банка Б круглая. В обе насыпали ровно по 3 полные мерные ложки риса. В какой банке риса больше?", "A瓶高高瘦瘦,B瓶圆圆胖胖。我们用同一个小量勺往两个瓶子里各倒了满满3勺大米。哪个瓶子里的大米更多?"),
    solB: tr("Neither—they have EQUAL rice! Both contain exactly 3 unit scoops.", "Поровну! В обеих банках ровно по 3 одинаковые мерные ложки риса.", "一样多!因为它们都装了整整3个标准量勺的大米,形状不同不改变总量。")
  },
  16: {
    catA: "Computer Science", methA: "Oxford", catB: "Computer Science", methB: "Oxford",
    prop: tr("a plush turtle or robot toy, a 3x3 cushion grid on the floor, and arrow cards (↑ Forward, ↰ Turn Left, ↱ Turn Right)", "игрушечная черепашка или робот, сетка 3×3 из подушек или листов на полу и карточки со стрелками (↑ Вперёд, ↰ Налево, ↱ Направо)", "玩具小乌龟或机器人、地垫3×3方格网以及方向指令卡(↑前进1格、↰左转、↱右转)"),
    def: tr("An algorithm is an ordered sequence of precise step-by-step instructions that guides an agent from a start state to a goal state.", "Алгоритм — это точная последовательность команд по шагам, которая приводит исполнителя от старта к цели.", "算法是一系列次序分明、指令精确的步骤,引导执行者从起点准确到达终点。"),
    taskA: tr("lay 3 arrow cards in a row (↑ Forward, ↑ Forward, ↱ Turn Right) and have the child move the Turtle step-by-step to reach a lettuce leaf", "выложить 3 карточки со стрелками (↑ Вперёд, ↑ Вперёд, ↱ Направо) и провести Черепашку по клеткам к листику салата", "排列3张指令卡(↑前进、↑前进、↱右转),让孩子严格按顺序操纵小乌龟走格子去吃生菜叶"),
    puzA: tr("The Turtle is 2 squares in front of the strawberry. If we give the command [↑ Forward] only 1 time, will she reach the strawberry?", "Черепашка стоит в 2 клетках перед клубничкой. Если дать команду [↑ Вперёд] только 1 раз, дойдёт ли она до клубнички?", "小乌龟距离草莓还有2格远。如果我们只下达1次[↑前进1格]的指令,它能吃到草莓吗?"),
    solA: tr("No! One [↑ Forward] command moves her only 1 square. She needs two [↑ Forward] commands to travel 2 squares.", "Нет! Одна команда [↑ Вперёд] сдвигает её только на 1 клетку. Нужно две команды [↑ Вперёд], чтобы пройти 2 клетки.", "不能!1次[↑前进]指令只能走1格,必须连续下达2次[↑前进]指令才能走完2格。"),
    taskB: tr("place a rock obstacle on the middle square so the child must plan a 3-step detour around the rock using arrow cards", "положить камень-препятствие на среднюю клетку, чтобы ребёнок составил из стрелок маршрут обхода вокруг камня", "在中间格子放一块石头障碍物,让孩子用方向箭头卡规划一条绕开石头的路径"),
    puzB: tr("There is a puddle right in front of the robot! What happens if we tell the robot [↑ Forward] before telling it to turn?", "Прямо перед роботом лужа! Что случится, если сначала дать команду [↑ Вперёд], а потом — поворот?", "机器人正前方1格就是水坑!如果我们先执行[↑前进]再执行转弯,会发生什么?"),
    solB: tr("The robot will step right into the puddle! In an algorithm, the ORDER of commands matters: it must turn first, then step forward.", "Робот наступит прямо в лужу! В алгоритме ПОРЯДОК команд критически важен: нужно сначала повернуть, а потом шагать.", "机器人会一脚踩进水坑里!在计算机算法中,指令的先后顺序至关重要,必须先转弯再前进。")
  },
  17: {
    catA: "Counting", methA: "USSR (Kiselev)", catB: "Logic", methB: "Chinese",
    prop: tr("5 red apples (or red counters), 5 green pears (or green counters), and pieces of yarn for pairing lines", "5 красных яблок (или фишек), 5 зелёных груш и ниточки для соединения пар", "5个红苹果(或红圆片)、5个绿梨子(或绿圆片)以及用来连线配对的短毛线"),
    def: tr("When two sets are paired one-to-one, the set with leftover unpaired elements has MORE, and the other has LESS; how much more equals the number of unpaired leftovers.", "При соединении элементов двух множеств парами то множество, где остались элементы без пары, содержит БОЛЬШЕ, а другое — МЕНЬШЕ.", "将两个集合的元素一一连线配对后,有剩余元素的集合“更多”,另一个“更少”;多出的数量恰等于未配对的剩余元素个数。"),
    taskA: tr("line up 4 red counters and 3 green counters, connect pairs with short yarn strings, and circle the 1 leftover red counter", "выложить 4 красные и 3 зелёные фишки, соединить пары ниточками и обвести 1 лишнюю красную фишку", "摆出4枚红圆片和3枚绿圆片,用短毛线一一连成配对夫妻,圈出多出来的那1枚红圆片"),
    puzA: tr("4 squirrels and 3 acorns are paired one-to-one. Are there more squirrels or more acorns, and by how many?", "4 белочки и 3 жёлудя соединили парами. Кого больше — белочек или желудей, и на сколько?", "4只小松鼠和3颗橡子一一配对。是松鼠多还是橡子多?多几个?"),
    solA: tr("More squirrels, by 1! Three squirrels get acorns, and 1 squirrel is left without a pair.", "Белочек больше на 1! Трём белочкам достанется по жёлудю, а 1 белочка останется без пары.", "松鼠多,多1只!3只松鼠分到橡子后,还有1只松鼠没有配对的橡子。"),
    taskB: tr("ask how to transform '4 red vs 3 green' into EQUAL sets in two ways: adding 1 green OR taking away 1 red", "найти два способа уравнять 4 красные и 3 зелёные фишки: добавить 1 зелёную ИЛИ убрать 1 красную", "探索把“4红对3绿”变成“一样多”的两种互逆方法: 添上1枚绿片,或者拿走1枚红片"),
    puzB: tr("Brother has 5 stickers and Sister has 4 stickers. If we cannot buy any new stickers, how can we make their collections equal?", "У брата 5 наклеек, а у сестры 4. Если новых наклеек нет, как сделать так, чтобы убрав лишнее, у них стало поровну?", "哥哥有5张贴纸,妹妹有4张贴纸。如果不去买新贴纸,只拿走多余的,拿走几张就能让两人一样多?"),
    solB: tr("Take 1 sticker away from Brother (5 - 1 = 4), so both have 4!", "Убрать 1 лишнюю наклейку у брата (5 − 1 = 4), и у обоих станет по 4!", "从哥哥那里拿走多出来的1张贴纸(5-1=4),两人就都是4张了!")
  },
  18: {
    catA: "Counting", methA: "Chinese", catB: "Logic", methB: "Oxford",
    prop: tr("number cards 1–5, 5-frames, nesting cups, and arrow cards", "карточки с числами 1–5, пятиклеточки, стаканчики и карточки со стрелками", "1-5数字卡、五格框、大小套杯和方向箭头卡"),
    def: tr("Term 2 synthesis: mastery of quantities 1 to 5, volume conservation, and step-by-step directional algorithms.", "Синтез 2-й четверти: уверенное владение числами 1–5, сохранение объёма и пошаговые алгоритмы движения.", "第2学段综合复盘: 1至5数感全贯通、容积守恒与网格方向指令算法。"),
    taskA: tr("match shuffled dot cards (1 to 5) to numeral cards (1 to 5) and order 5 towers of blocks like a staircase from 1 to 5", "сопоставить перемешанные точечные карточки (1–5) с цифрами и построить лесенку из 5 башен от 1 до 5 кубиков", "将打乱的1-5点卡与数字卡配对,并用积木搭出从1层到5层的阶梯宝塔"),
    puzA: tr(" Look at our staircase of towers: 1, 2, 3, 5. One tower is missing from the stairs! Which number tower forgot to come?", "Посмотри на нашу лесенку башен: 1, 2, 3, 5. Одной ступеньки не хватает! Башня какого числа забыла встать в строй?", "看我们的数字阶梯宝塔: 1层、2层、3层、5层。中间有一级台阶不见了!是数字几的宝塔忘了来排队?"),
    solA: tr("Tower 4! Because 4 is 3 plus 1, standing right between 3 and 5.", "Башня 4! Потому что 4 — это 3 да ещё 1, она стоит ровно между 3 и 5.", "是数字4的宝塔!因为3添上1是4,4正好排在3和5的中间。"),
    taskB: tr("guide the robot across a 5-step path where each square requires placing the matching number of counters (1 to 5)", "провести робота по маршруту из 5 клеток, выкладывая на каждую клетку соответствующее число фишек (от 1 до 5)", "引导机器人走过5格通关之路,每到一格就按格子编号摆出对应数量(1到5)的筹码"),
    puzB: tr("The robot needs 5 energy stars to launch its rocket. It already collected 3 stars. Looking at your 5 fingers, how many more stars does it need?", "Роботу нужно 5 звёздочек энергии для старта ракеты. Он уже собрал 3 звёздочки. Глядя на свои 5 пальчиков, сколько ещё звёзд ему не хватает?", "机器人需要集齐5颗能量星才能发射火箭,它已经收集了3颗。看看你的5根手指头,还差几颗能量星?"),
    solB: tr("2 more stars! Because 3 fingers up leaves 2 fingers folded down (3 + 2 = 5).", "Ещё 2 звёздочки! На ладошке из 5 пальцев при 3 открытых остаются загнутыми ровно 2 пальчика (3 + 2 = 5).", "还差2颗能量星!因为5根手指伸出3根后,还弯着2根(3+2=5)。")
  },
  19: {
    catA: "Arithmetic", methA: "USSR (Kiselev)", catB: "Arithmetic", methB: "Chinese",
    prop: tr("3 strawberries (or counters) and 2 small plates", "3 клубнички (или фишки) и 2 маленькие тарелочки", "3颗草莓(或圆片)和2个小盘子"),
    def: tr("Number decomposition of 3: a whole group of 3 can be partitioned into two non-empty parts as (1 and 2) or (2 and 1), and uniting the parts restores 3.", "Состав числа 3: целое из 3 предметов раскладывается на две части как (1 и 2) или (2 и 1), а их объединение снова даёт 3.", "数字3的分解与组合: 整体3分成两个非空部分只有(1和2)或(2和1),两部分合起来必还原为3。"),
    taskA: tr("distribute 3 strawberries across 2 plates in every possible way: (1 on left, 2 on right) and (2 on left, 1 on right)", "разложить 3 клубнички на 2 тарелки всеми способами: (1 слева, 2 справа) и (2 слева, 1 справа)", "把3颗草莓分到左右2个盘子里,找出所有分法: (左1右2)与(左2右1)"),
    puzA: tr("I hold 3 buttons in my two hands. I open my left hand and show 1 button. How many buttons are hiding in my closed right hand?", "У меня в двух руках всего 3 пуговицы. Я разжал левую ладонь — там 1 пуговица. Сколько пуговиц спрятано в правой руке?", "我两只手一共握着3颗纽扣。我摊开左手让你看到1颗纽扣,那我紧握的右手里藏着几颗纽扣?"),
    solA: tr("2 buttons! Because 3 is composed of 1 and 2 (3 - 1 = 2).", "2 пуговицы! Потому что 3 состоит из 1 и 2 (3 − 1 = 2).", "2颗纽扣!因为整体3分成1和2,左手是1,右手必定是2。"),
    taskB: tr("flip 3 two-color counters (red on one side, yellow on the other) and chant the bond: '2 red and 1 yellow make 3!'", "переворачивать 3 двухцветные фишки (красно-жёлтые) и напевать состав: «2 красные и 1 жёлтая — вместе 3!»", "翻转3枚红黄双色片,边摆边念分合口诀: “2个红和1个黄,合起来是3!”"),
    puzB: tr("If 2 bunnies are inside the burrow and 1 bunny is outside on the grass, how many bunnies are in the family altogether?", "Если 2 зайчика сидят в норке, а 1 зайчик прыгает на травке, сколько всего зайчиков в этой семье?", "如果2只小兔在洞里,1只小兔在洞外草地上,这一家子一共有几只小兔?"),
    solB: tr("3 bunnies! Joining the part of 2 and the part of 1 gives the whole of 3 (2 + 1 = 3).", "3 зайчика! Объединение части 2 и части 1 даёт целое 3 (2 + 1 = 3).", "一共3只小兔!把部分2和部分1合并起来就是整体3(2+1=3)。")
  },
  20: {
    catA: "Arithmetic", methA: "Chinese", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("4 walnuts (or blocks) and a cardboard 'Number Bond House' with 2 rooms on each floor", "4 грецких ореха (или кубика) и картонный «Домик состава числа 4»", "4颗核桃(或积木)以及画有左右两个房间的“数字4分合小房子”纸板"),
    def: tr("Number 4 decomposes into (1 and 3), the symmetric double (2 and 2), and (3 and 1).", "Число 4 раскладывается на части тремя способами: (1 и 3), симметричная пара (2 и 2) и (3 и 1).", "数字4的三种分拆结构: (1和3)、对称双生数(2和2)、以及交换后的(3和1)。"),
    taskA: tr("move 4 walnuts one by one from the left room to the right room, recording (3,1), (2,2), and (1,3)", "перекладывать 4 ореха по одному из левой комнаты в правую, наблюдая пары (3 и 1), (2 и 2), (1 и 3)", "将4颗核桃从左房间每次移1颗到右房间,依次观察并读出(3和1)、(2和2)、(1和3)"),
    puzA: tr("Four birds want to sit on two branches so that BOTH branches have the exact same number of birds. How many birds sit on each branch?", "Четыре птички хотят сесть на две ветки так, чтобы на ОБЕИХ ветках стало поровну. По сколько птичек сядет на каждую ветку?", "4只小鸟想停在两根树枝上,要求两根树枝上的小鸟一样多。每根树枝上应该停几只?"),
    solA: tr("2 birds on each branch! Because 2 and 2 are equal halves that make 4 (2 + 2 = 4).", "По 2 птички на каждую ветку! Потому что 2 и 2 — это две равные половинки числа 4 (2 + 2 = 4).", "每根树枝停2只!因为4平分成相等的两半就是2和2(2+2=4)。"),
    taskB: tr("play 'Under the Cup' with 4 blocks: parent hides some under a cup, child sees the rest and deduces the hidden number", "играть в «Под стаканчиком» с 4 кубиками: родитель прячет часть под стакан, ребёнок по оставшимся называет спрятанное число", "用4块积木玩“猜猜杯下有几个”: 家长用杯子盖住一部分,孩子看外面的积木推理杯子下的数量"),
    puzB: tr("We started with 4 blocks on the mat. Now you see only 1 block outside the cup. How many blocks are hiding under the cup?", "На коврике было 4 кубика. Сейчас снаружи виден только 1 кубик. Сколько кубиков спряталось под стаканчиком?", "垫子上原本有4块积木,现在杯子外面只看得到1块。杯子底下藏着几块积木?"),
    solB: tr("3 blocks! Because 1 and 3 together make 4 (4 - 1 = 3).", "3 кубика! Потому что 1 да 3 составляют 4 (4 − 1 = 3).", "藏着3块积木!因为4可以分成1和3,外面有1块,杯下必有3块。")
  },
  21: {
    catA: "Arithmetic", methA: "Chinese", catB: "Arithmetic", methB: "Chinese",
    prop: tr("5 beads on a pipe-cleaner slide (Chinese abacus rod) and 5 fingers", "5 бусин на синельной палочке (как спица счётов) и 5 пальцев", "穿在毛根条上的5颗算珠(简易算盘档)与5根手指"),
    def: tr("The five-anchor decomposition: 5 splits into (1,4), (2,3), (3,2), and (4,1)—the foundational pairs of Chinese mental arithmetic.", "Состав опорной пятёрки: 5 делится на (1 и 4), (2 и 3), (3 и 2), (4 и 1) — фундамент устного счёта на абакусе.", "五的凑数分合: 5可分解为(1和4)、(2和3)、(3和2)、(4和1),这是中国珠心算“凑五加、破五减”的基石。"),
    taskA: tr("slide 5 beads on the rod to the left and right ends to discover all four partner pairs that sum to 5", "двигать 5 бусин по палочке влево и вправо, открывая все четыре пары-друзья, дающие в сумме 5", "在毛根条左右两端滑动5颗算珠,找出所有相加等于5的“好朋友数对”"),
    puzA: tr("In the Five-Friends Club, 1 is best friends with 4 because 1 + 4 = 5. Who is the best friend of 2?", "В «Клубе друзей пятёрки» число 1 дружит с 4, потому что 1 + 4 = 5. А кто лучший друг числа 2?", "在“凑五好朋友俱乐部”里,1的好朋友是4(因为1+4=5)。那么2的凑五好朋友是几?"),
    solA: tr("3! Because 2 and 3 together make a full hand of 5 (2 + 3 = 5).", "Число 3! Потому что 2 да 3 вместе составляют полную пятёрку (2 + 3 = 5).", "是3!因为2和3合起来正好凑成一整只手的5(2+3=5)。"),
    taskB: tr("call out a number from 1 to 4 while flashing fingers, and have the child show the missing fingers needed to make 5", "называть число от 1 до 4 на пальцах, а ребёнок показывает недостающие пальчики до полных 5", "家长伸出1到4根手指报数,孩子立刻伸出凑成5所需的互补手指数量"),
    puzB: tr("You have 3 coins, and a toy sticker costs 5 coins. How many more coins do you need to buy the sticker?", "У тебя есть 3 монетки, а наклейка стоит 5 монеток. Сколько ещё монеток тебе не хватает для покупки?", "你有3枚游戏币,一张贴纸需要5枚游戏币。你还需要再攒几枚游戏币?"),
    solB: tr("2 more coins! Because 3 and 2 are the partner pair that makes 5.", "Ещё 2 монетки! Потому что 3 и 2 — это пара-друзья, составляющая 5.", "还需要2枚!因为3和2是凑成5的互补数对(3+2=5)。")
  },
  22: {
    catA: "Time", methA: "Oxford", catB: "Time", methB: "USSR (Kiselev)",
    prop: tr("4 picture cards (Sunrise/Breakfast, High Sun/Play, Sunset/Dinner, Moon/Sleep) and a circular paper plate arrow", "4 картинки (Рассвет/Завтрак, Полдень/Прогулка, Закат/Ужин, Луна/Сон) и круглая тарелка со стрелкой", "4张作息图卡(日出早餐、正午玩耍、日落晚餐、月亮睡觉)和带指针的圆形纸盘"),
    def: tr("Time flows in a strict directed cycle: Morning → Afternoon → Evening → Night → back to Morning.", "Время течёт по строго направленному кругу: Утро → День → Вечер → Ночь → и снова Утро.", "昼夜时间按严格的单向周期循环流动: 早晨 → 中午 → 傍晚 → 夜晚 → 再回到第二天早晨。"),
    taskA: tr("place the 4 time-of-day cards in a straight line from wake-up to bedtime, then bend the line into a circle on the paper plate", "выложить 4 карточки режима дня в ряд от пробуждения до сна, а затем замкнуть их по кругу на бумажной тарелке", "将4张作息卡从起床到睡觉排成一行,再将它们围在圆纸盘边缘组成循环周期"),
    puzA: tr("Can we eat dinner at night BEFORE we wake up for morning breakfast on the same day, or does Morning always come first?", "Может ли ужин перед сном наступить РАНЬШЕ утреннего завтрака того же дня, или сначала всегда идёт Утро?", "在同一天里,能先到晚上吃晚饭、然后再退回去过早晨吃早饭吗?"),
    solA: tr("Morning always comes first! Time moves forward in order: Morning, then Afternoon, then Evening, then Night.", "Сначала всегда идёт Утро! Время движется только вперёд по порядку: Утро, День, Вечер, Ночь.", "早晨总是在最前面!时间只能向前按顺序流动: 早晨→中午→傍晚→夜晚。"),
    taskB: tr("practice the temporal logic words BEFORE and AFTER using daily actions (wash hands BEFORE eating; brush teeth AFTER dinner)", "отработать логические слова ДО (раньше) и ПОСЛЕ (позже) на действиях дня (мыть руки ДО еды, чистить зубы ПОСЛЕ ужина)", "用日常行为演练时间逻辑词“在…之前”与“在…之后”(吃饭前洗手,晚饭后刷牙)"),
    puzB: tr("First we put on socks, then we put on shoes. What happens if we reverse the order and put on shoes BEFORE socks?", "Сначала мы надеваем носки, а потом ботинки. Что получится, если перепутать порядок и надеть ботинки ДО носков?", "我们出门时先穿袜子、后穿鞋子。如果把顺序反过来,在穿袜子之前先穿上鞋子会怎样?"),
    solB: tr("The socks would go on the outside of the shoes! Some sequences are non-commutative: order changes the result.", "Носки окажутся поверх ботинок! В алгоритмах времени порядок действий нельзя менять местами.", "袜子就会套在鞋子外面了!时间序列具有不可交换性,颠倒顺序会彻底改变结果。")
  },
  23: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "Chinese",
    prop: tr("folded paper hearts/butterflies, washable paint, a small hand mirror, and Lego bricks", "сложенные из бумаги бабочки и сердечки, краска, маленькое зеркальце и кубики лего", "对折的蝴蝶/爱心画纸、水彩颜料、小镜子和乐高积木"),
    def: tr("Mirror symmetry means two halves match point-for-point when folded along the central axis line, at equal distance from the crease.", "Зеркальная (осевая) симметрия означает, что две половинки полностью совпадают при перегибании по линии сгиба.", "镜面对称(轴对称)是指图形沿中心折痕对折时,左右两半的每一点都到折痕距离相等并完全重合。"),
    taskA: tr("put 3 drops of paint on the left wing of a paper butterfly, fold along the middle line, press, and open to see the matching right wing", "капнуть 3 капли краски на левое крыло бумажной бабочки, сложить по линии сгиба и раскрыть, увидев точно такое же правое крыло", "在蝴蝶画纸左翼滴3滴不同颜色的颜料,沿中线对折按压后展开,观察右侧自动印出的对称图案"),
    puzA: tr("If the paint drop on the left wing is very close to the center fold line, will its twin on the right wing be close to the fold line or far away at the edge?", "Если капля краски на левом крыле находится совсем близко к линии сгиба, где отпечатается её близнец на правом крыле — близко к сгибу или далеко на краю?", "如果左翅膀上的颜料点紧挨着中间的折痕线,那么印在右翅膀上的孪生颜料点会紧挨着折痕,还是跑到最外面的边角去?"),
    solA: tr("Close to the fold line! In mirror symmetry, matching points are always the exact same distance from the axis.", "Тоже близко к линии сгиба! При симметрии парные точки всегда находятся на одинаковом расстоянии от оси.", "同样紧挨着折痕线!在镜面对称中,对称点到中心折痕的距离必定完全相等。"),
    taskB: tr("place a tape line down the middle of a mat; parent places 1 red and 1 blue block on the left, child builds the mirror reflection on the right", "проклеить линию-ось посередине коврика: родитель ставит красный и синий кубики слева, а ребёнок строит зеркальное отражение справа", "在垫子中央贴一条对称轴胶带,家长在左侧摆1红1蓝积木,孩子在右侧摆出镜像位置"),
    puzB: tr("Look at your own body in the mirror: if we draw a line down your nose, how many ears are on the left side and how many on the right?", "Посмотри на себя в зеркало: если провести линию ровно посередине через нос, сколько ушек окажется слева и сколько справа?", "对着镜子看自己的身体: 如果顺着鼻梁正中间画一条对称线,左边有几只耳朵,右边有几只耳朵?"),
    solB: tr("1 ear on the left and 1 ear on the right! Our face has bilateral (left-right) symmetry.", "1 ушко слева и 1 ушко справа! Наше лицо обладает двусторонней зеркальной симметрией.", "左边1只耳朵,右边1只耳朵!人的脸庞和身体具有天然的左右轴对称结构。")
  },
  24: {
    catA: "Logic", methA: "USSR (Kiselev)", catB: "Computer Science", methB: "Oxford",
    prop: tr("colored shapes cut from cardboard (red/blue circles and red/blue squares) and 2 overlapping yarn hoops", "вырезанные из картона цветные фигуры (красные и синие круги и квадраты) и 2 пересекающихся кольца из нитей", "彩色几何卡片(红圆、蓝圆、红方、蓝方)和两个交叉重叠的毛线圈"),
    def: tr("Logical conjunction (AND): an element belongs to the intersection of two sets only if it satisfies BOTH rules at the same time.", "Логическое И (пересечение множеств): предмет попадает в общую область двух кругов, только если выполняет ОБА правила одновременно.", "逻辑合取(并且/交集): 一个元素只有同时满足两个集合的规则,才能进入两圈重叠的交集区域。"),
    taskA: tr("make the Red hoop and the Circle hoop overlap in the middle, and guide the child to place ONLY the Red Circles into the shared middle lens", "пересечь Красный круг и Круг для круглых фигур и положить в общую серединку ТОЛЬКО те фигуры, которые одновременно красные И круглые", "让“红色圈”与“圆形圈”在中间交叉重叠,引导孩子把“既是红色又是圆形”的卡片放入中间重叠区"),
    puzA: tr("I am holding a RED SQUARE. It is red, so it likes the Red hoop. Can it sit in the middle overlap room reserved for 'Red AND Round'?", "У меня в руке КРАСНЫЙ КВАДРАТ. Он красный. Но может ли он сесть в среднюю общую комнату, где живут «Красные И Круглые»?", "我手里拿着一张“红色正方形”。它是红色的,但它能住进中间“既红又圆”的交叉房间里吗?"),
    solA: tr("No! It obeys the Red rule, but fails the Round rule because it is a square. It stays in the Red-only side.", "Нет! Он выполняет правило «Красный», но не выполняет правило «Круглый». Поэтому он живёт в красной части сбоку, а не в пересечении.", "不能!它虽然满足“红色”条件,但不满足“圆形”条件,只能住在左边纯红色区域,不能进中间交集。"),
    taskB: tr("play 'The Two-Gate Castle': Gate 1 checks 'Is it Blue?', Gate 2 checks 'Does it have 4 corners?'—only Blue Squares pass both gates", "сыграть в «Замок с двумя воротами»: Ворота 1 проверяют «Синий?», Ворота 2 проверяют «Есть 4 угла?» — проходят только синие квадраты", "玩“双道城门安检”: 第一道门只放蓝色通过,第二道门只放有4个角的图形通过,找出能连过两关的图形"),
    puzB: tr("A Blue Circle walks up to the Two-Gate Castle. Which gate lets it through, and which gate stops it?", "Синий Круг подошёл к Замку с двумя воротами. Какие ворота его пропустят, а какие остановят?", "一个“蓝色圆形”来到双道城门前。哪一道门会放它过去,哪一道门会把它拦下?"),
    solB: tr("Gate 1 ('Blue?') lets it through, but Gate 2 ('4 corners?') stops it because a circle has 0 corners!", "Ворота 1 («Синий?») пропустят, а Ворота 2 («Есть 4 угла?») остановят, ведь у круга нет углов!", "第一道“蓝色门”会放行,但第二道“四角门”会把它拦下,因为圆形没有角!")
  },
  25: {
    catA: "Geometry", methA: "Oxford", catB: "Computer Science", methB: "Oxford",
    prop: tr("printed or drawn paper mazes, 2 colored crayons, and yarn walls on the table", "нарисованные на листе лабиринты, 2 цветных карандаша и стенки из ниток на столе", "纸面大迷宫图、两支彩色蜡笔以及桌面毛线墙壁"),
    def: tr("Path connectivity: two points are connected if a continuous line can be traced from start to finish without lifting the finger or crossing any barrier wall.", "Связность пути: две точки соединены, если от старта до финиша можно провести непрерывную линию, не отрывая пальца и не пересекая стен.", "路径连通性: 若能从起点到终点画出一条不抬笔、不穿墙的连续曲线,则两点在迷宫中连通。"),
    taskA: tr("trace a path with the index finger first (dry run) before drawing with a crayon from the puppy to the bone", "сначала провести дорожку указательным пальчиком (пробный поиск), и только потом прочертить карандашом путь от щенка к косточке", "先用食指在迷宫里探路试走,确认不撞进死胡同后,再用蜡笔画出从小狗到骨头的连续路径"),
    puzA: tr("Two paths lead from the bee: Path Red ends at a wall (dead end), and Path Blue reaches the flower. Why should we trace with our finger BEFORE drawing with ink?", "От пчёлки ведут две дорожки: Красная упирается в тупик, а Синяя ведёт к цветку. Почему умные математики сначала проверяют путь пальчиком, а потом рисуют?", "小蜜蜂面前有两条路: 红路走到底是一堵死胡同墙,蓝路通向花朵。为什么我们要先用手指试走,然后再下笔画线?"),
    solA: tr("Looking ahead prevents getting stuck in a dead end! Testing with a finger lets us backtrack cleanly before committing.", "Взгляд вперёд спасает от тупика! Проверка пальчиком позволяет вернуться из тупика без ошибок на бумаге.", "先用手指探路可以提前发现死胡同并退回重选,避免在纸上画错被困住(回溯搜索思想)!"),
    taskB: tr("connect 2 matching pairs of animals (Cat to Milk, Dog to Bone) inside a box WITHOUT letting the two crayon paths cross each other", "соединить 2 пары (Кошку с молоком, Собачку с косточкой) внутри рамки так, чтобы две цветные дорожки НЕ пересеклись", "在方框内分别把“小猫连向牛奶”、“小狗连向骨头”,要求两条彩色路线绝对不能交叉相撞"),
    puzB: tr("If the Cat's road goes straight through the middle from top to bottom, can the Dog go straight across the middle without crashing, or must the Dog go around?", "Если дорожка Кошки прошла прямо посередине сверху вниз, может ли Собачка побежать прямо поперёк середины без столкновения, или ей нужно обойти вокруг?", "如果小猫的路线已经从正中间竖直穿过了,小狗还能从正中间横穿过去而不撞车吗,还是必须绕着边走?"),
    solB: tr("The Dog must curve around the outside! Crossing straight through the middle would intersect the Cat's path.", "Собачке нужно обойти по краю вокруг! Прямой путь посередине обязательно пересечёт дорожку Кошки.", "小狗必须从外围绕过去!如果直接横穿正中间,两条线就一定会交叉相撞。")
  },
  26: {
    catA: "Arithmetic", methA: "USSR (Kiselev)", catB: "Logic", methB: "Chinese",
    prop: tr("2 plush teddy bears, 2 plates, and 5 crackers or wooden tokens", "2 плюшевых мишки, 2 тарелки и 5 печений или деревянных кружков", "2只毛绒小熊、2个盘子和5块小饼干(或木圆片)"),
    def: tr("Division by fair sharing (dealing): distributing items one-by-one ('one for you, one for me') guarantees equal shares; even totals leave 0 remainder, odd totals leave 1 leftover.", "Деление поровну (раздача по одному): правило «одно тебе, одно мне» гарантирует равные доли; чётное число делится без остатка, а нечётное даёт 1 лишний предмет.", "公平分物(等分除启蒙): 按“你一个、我一个”轮流分发可保证份额相等;偶数刚好分完无剩余,奇数必定多出1个余数。"),
    taskA: tr("deal 4 tokens one-by-one between Bear A and Bear B ('one for you, one for you') and verify both bears have 2", "раздать 4 кружка по одному двум мишкам («один тебе, один тебе») и проверить, что у обоих мишек стало ровно по 2", "把4块圆片按“你一个、它一个”轮流分给两只小熊,验证每只小熊都公平分到了2块"),
    puzA: tr("We have 4 cookies and 2 hungry bears. After fair sharing, how many cookies are on each bear's plate?", "У нас 4 печенья и 2 голодных мишки. По сколько печений окажется на тарелке у каждого мишки после честного дележа?", "有4块小饼干平分给2只小熊。公平分发后,每只小熊的盘子里有几块饼干?"),
    solA: tr("2 cookies each! Because 4 shared equally between 2 is 2 and 2.", "По 2 печенья каждому! Потому что 4 состоит из двух равных частей: 2 и 2.", "每只小熊2块!因为4平分成相等的两份就是2和2。"),
    taskB: tr("try to share 5 tokens equally between the 2 bears, discovering that after each gets 2, there is 1 leftover token in the middle", "попробовать разделить поровну 5 кружков между 2 мишками, обнаружив, что после раздачи по 2 остаётся 1 лишний кружок посередине", "尝试把5块圆片平分给2只小熊,发现每只小熊分得2块后,正中间还剩下1块没法整块平分"),
    puzB: tr("Why can't we give that 1 leftover cookie to just one bear if our rule is STRICT FAIR SHARING?", "Почему нельзя отдать это 1 оставшееся печенье только одному мишке, если наше правило — СТРОГО ПОРОВНУ?", "如果我们的规则是“绝对公平一样多”,为什么最后剩下的那1块饼干不能随便全给其中一只小熊?"),
    solB: tr("If one bear got it, that bear would have 3 and the other would have 2 (not equal!). It must stay as a remainder (or be cut in half).", "Тогда у одного мишки станет 3, а у другого 2 — равенство нарушится! Лишнее печенье остаётся в остатке (или делится пополам).", "如果全给其中一只,它就有3块而另一只只有2块,就不再相等了!这1块叫做“余数”(除非把它从中间对半切开)。")
  },
  27: {
    catA: "Arithmetic", methA: "Chinese", catB: "Logic", methB: "USSR (Kiselev)",
    prop: tr("teddy bears, tea cups, 5 counters, folded paper napkins, and 2 yarn hoops", "плюшевые мишки, чашечки, 5 фишек, бумажные салфетки и 2 кольца из нитей", "玩具小熊、小茶杯、5枚圆片、折纸餐巾和2个毛线圈"),
    def: tr("Term 3 synthesis: decompositions of 3, 4, 5, mirror symmetry, two-attribute sorting, and fair sharing.", "Синтез 3-й четверти: состав чисел 3, 4, 5, зеркальная симметрия, сортировка по двум признакам и делёж поровну.", "第3学段综合复盘: 3/4/5的分解组合、镜面对称、双重属性分类与公平等分。"),
    taskA: tr("host the Teddy Bear Tea Party: fold symmetric napkins, share 4 berries between 2 bears, and split 5 biscuits into 2 red and 3 yellow plates", "устроить Чаепитие мишек: сложить симметричные салфетки, разделить 4 ягодки поровну двум мишкам и разложить 5 печений на 2 и 3", "举办小熊下午茶: 折叠对称餐巾、将4颗浆果平分给2只小熊、将5块饼干按2和3分盘"),
    puzA: tr("At the tea party there are 5 cups in total: 2 cups are filled with tea, and the rest are empty. How many cups are empty?", "На чаепитии всего 5 чашечек: в 2 чашки уже налили чай, а остальные пустые. Сколько чашечек пустует?", "茶话会上一共有5个小茶杯,其中2个已经倒好了茶,其余是空杯子。有几个空杯子?"),
    solA: tr("3 empty cups! Because 5 splits into 2 and 3.", "3 пустые чашечки! Потому что 5 состоит из 2 и 3.", "有3个空杯子!因为5可以分成2和3(5-2=3)。"),
    taskB: tr("sort the tea-party plates into 'Big AND Round' vs 'Small OR Square' and trace a non-crossing path to serve the cake", "рассортировать тарелочки на «Большие И Круглые» и провести дорожку для торта без пересечения препятствий", "将茶盘按“既大又圆”双重条件分类,并画出一条不穿过障碍物的送蛋糕路径"),
    puzB: tr("Mama Bear cuts a round pie right down the center line into 2 pieces. How can we prove the 2 pieces are symmetric and equal?", "Мама-медведица разрезала круглый пирог ровно посередине на 2 кусочка. Как доказать, что оба кусочка симметричны и равны?", "熊妈妈顺着正中间的对称线把圆派切成了2块。怎么证明这两块派是一模一样大的?"),
    solB: tr("Place one half directly on top of the other (superposition): their curved edges and straight cuts match completely!", "Наложить одну половинку на другую (метод наложения Киселёва): их края полностью совпадут!", "把其中一半叠放到另一半上面(基谢廖夫叠合法),它们的弧边和直边会丝毫不差地完全重合!")
  },
  28: {
    catA: "Counting", methA: "Chinese", catB: "Arithmetic", methB: "Chinese",
    prop: tr("a cardboard 10-frame (two rows of 5), 7 counters, and two hands", "картонная рамка десяти (два ряда по 5), 7 фишек и две ладошки", "十格框纸板(上下两排各5格)、7枚圆片以及双手"),
    def: tr("Five-anchor structure for 6 and 7: 6 is 'one full hand of 5 and 1 more' (5 + 1); 7 is '5 and 2 more' (5 + 2).", "Опора на пятёрку для чисел 6 и 7: 6 — это «полная пятёрка да ещё 1» (5 + 1); 7 — это «пятёрка да ещё 2» (5 + 2).", "6和7的五基准结构: 6是“一整排5再添1”(5+1); 7是“一整排5再添2”(5+2)。"),
    taskA: tr("fill the entire top row of the 10-frame with 5 red counters ('Five!'), then place 1 blue counter on the bottom row for 6, and a 2nd blue counter for 7", "заполнить весь верхний ряд рамки десяти 5 красными фишками («Пять!»), затем добавить в нижний ряд 1 синюю фишку (получилось 6) и 2-ю синюю (получилось 7)", "先用5枚红片填满十格框上排(“满5!”),再在下排放1枚蓝片认识6(5+1),放2枚蓝片认识7(5+2)"),
    puzA: tr("Show me one full hand (5 fingers) and 2 fingers on your other hand. Without counting from 1, what number is 5 and 2?", "Покажи мне одну полную ладошку (5 пальцев) и ещё 2 пальчика на другой руке. Не пересчитывая с единицы, какое число дают 5 да 2?", "左手伸出整只手掌(5根手指),右手伸出2根手指。不用从1开始数,5添上2直接是几?"),
    solA: tr("7! Five and two more is always 7.", "7! Пятёрка да ещё два — это всегда 7.", "是7!满五加二直接就是7。"),
    taskB: tr("connect 7 to the 7 days of the week: place 5 weekday blocks in the top row and 2 weekend blocks in the bottom row", "связать число 7 с 7 днями недели: положить 5 кубиков будних дней в верхний ряд и 2 кубика выходных в нижний", "将数字7与一星期7天联系起来: 上排放5块工作日积木,下排放2块周末积木"),
    puzB: tr("A caterpillar ate 1 leaf each day for 5 school days, and 1 leaf on Saturday. How many leaves did she eat in all?", "Гусеница съедала по 1 листику каждый из 5 будних дней и ещё 1 листик в субботу. Сколько всего листиков она съела?", "毛毛虫在5个上学日每天吃1片树叶,周六又吃了1片树叶。它一共吃了几片树叶?"),
    solB: tr("6 leaves! Because 5 leaves plus 1 more leaf equals 6 (5 + 1 = 6).", "6 листиков! Потому что 5 да ещё 1 — это 6 (5 + 1 = 6).", "6片树叶!因为5添上1等于6(5+1=6)。")
  },
  29: {
    catA: "Counting", methA: "Chinese", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("a 10-frame, 9 counters, an octopus picture (8 legs), and two hands", "рамка десяти, 9 фишек, картинка осьминога (8 щупалец) и две ладошки", "十格框、9枚圆片、章鱼图片(8条触手)和双手"),
    def: tr("Numbers 8 and 9 have dual anchors: from 5 (8 = 5 + 3, 9 = 5 + 4) and from 10 (8 is 10 with 2 empty spaces; 9 is 10 with 1 empty space).", "Числа 8 и 9 видны двояко: от пятёрки (8 = 5 + 3, 9 = 5 + 4) и от десятки (8 — это 10 без 2 пустых клеточек; 9 — это 10 без 1).", "8和9具有双重基准视角: 从5往上数(8=5+3, 9=5+4),以及从满10往下看(8是十格框空2格,9是十格框只空1格)。"),
    taskA: tr("place 5 red counters on top and 3 blue counters on the bottom of the 10-frame to make 8, noticing that exactly 2 boxes remain empty", "выложить 5 красных фишек сверху и 3 синие снизу для числа 8, обратив внимание, что пустыми остались ровно 2 окошка", "在十格框上排放5红、下排放3蓝组成8,同时引导孩子观察右下角刚好空着2个格子"),
    puzA: tr("An octopus has 4 legs on its left side and 4 legs on its right side (or 5 and 3). How many shoes does the octopus need in all?", "У осьминога 4 щупальца слева и 4 справа (или 5 да 3). Сколько всего ботиночек нужно осьминогу?", "章鱼左边有4条触手,右边也有4条触手(或者看成5加3)。章鱼一共需要穿几只小鞋子?"),
    solA: tr("8 shoes! Four and four (or 5 and 3) make 8.", "8 ботиночек! Четыре да четыре (или 5 да 3) дают 8.", "8只小鞋子!4加4(或者5加3)等于8。"),
    taskB: tr("add 1 more counter to 8 to make 9 (5 + 4), pointing out that only 1 single box in the whole 10-frame is empty", "добавить к 8 ещё 1 фишку, получив 9 (5 + 4), и увидеть, что во всей рамке десяти пустует только 1 клеточка", "在8的基础上再添1枚圆片变成9(5+4),发现整个十格框只剩下最后1个空格"),
    puzB: tr("Hold up both hands (10 fingers) and fold down just 1 pinky finger. How many fingers are still standing up?", "Подними обе ладошки (все 10 пальцев) и загни только 1 мизинчик. Сколько пальчиков осталось стоять?", "举起双手全部10根手指,只弯下1根小拇指。现在还立着几根手指?"),
    solB: tr("9 fingers! Because 9 is just 1 less than a full 10.", "9 пальчиков! Потому что 9 — это десятка без одного.", "9根手指!因为满10去掉1正好是9。")
  },
  30: {
    catA: "Counting", methA: "Chinese", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("a 10-frame, 10 counters, 10 bowling pins (or paper cups), and a rubber band to bundle 10 straws", "рамка десяти, 10 фишек, 10 стаканчиков-кеглей и резиночка для связывания пучка из 10 трубочек", "十格框、10枚圆片、10个纸杯保龄球以及用来捆扎10根吸管的橡皮筋"),
    def: tr("The number TEN (10) is two full fives (5 + 5 = 10); when 10 unit items are collected, they bundle into 1 whole Group of Ten.", "Число ДЕСЯТЬ (10) — это две полные пятёрки (5 + 5 = 10); 10 отдельных единиц связываются в 1 целый ДЕСЯТОК.", "数字“10”是两个完整的5(5+5=10);当集齐10个单根个体时,即可捆成“1个十”(十进制位值制萌芽)。"),
    taskA: tr("fill all 10 boxes of the 10-frame (5 on top, 5 on bottom) and bundle 10 loose straws with a rubber band into 'One Ten-Bundle'", "заполнить все 10 клеточек рамки (5 сверху и 5 снизу) и связать 10 отдельных трубочек резиночкой в «Один пучок-десяток»", "填满十格框的全部10个格子(上5下5),并用橡皮筋把10根散装吸管捆成“1捆十”"),
    puzA: tr("Are there any empty rooms left in our 10-frame when 10 counters move in?", "Осталась ли хоть одна пустая комната в нашей рамке десяти, когда туда заселились все 10 фишек?", "当10枚圆片全部住进十格框后,房子里还有空房间吗?"),
    solA: tr("Zero empty rooms! Ten completely fills both rows of 5 (5 + 5 = 10).", "Ни одной (ноль)! Десять полностью заполняет оба ряда по 5 (5 + 5 = 10).", "0个空房间(全住满了)!因为上排5加下排5正好填满全部10格。"),
    taskB: tr("set up 10 paper cups like bowling pins (4+3+2+1 triangle), roll a soft ball, and count how many fell down vs how many still stand", "расставить 10 стаканчиков треугольником (как кегли), покатить мячик и посчитать, сколько упало и сколько осталось стоять", "将10个纸杯摆成保龄球阵,滚球击倒一部分后,点数倒下的几个与站立的几个合起来总是10"),
    puzB: tr("We had 10 bowling cups. You knocked down all 5 cups in the front, and 5 cups are still standing. How many cups were there in total?", "Стояло 10 стаканчиков-кеглей. Ты сбил 5 стаканчиков, а ещё 5 остались стоять. Сколько всего стаканчиков вместе (сбитых и стоящих)?", "原本摆了10个保龄球纸杯,你一球撞倒了5个,还立着5个。倒下的5个和站着的5个合起来一共是几个?"),
    solB: tr("10 cups! Because 5 fallen plus 5 standing equals the whole 10 (5 + 5 = 10).", "10 стаканчиков! Потому что 5 упавших да 5 стоящих вместе составляют все 10 (5 + 5 = 10).", "一共10个!因为5加5等于完整的10。")
  },
  31: {
    catA: "Probability", methA: "Oxford", catB: "Probability", methB: "Oxford",
    prop: tr("a clear plastic bowl (or bag) and toy fish/counters in red and yellow", "прозрачная чаша (или мешочек) и игрушечные рыбки или фишки красного и жёлтого цвета", "透明塑料碗(或盲袋)以及红色、黄色的玩具小鱼(或圆片)"),
    def: tr("Three levels of chance: CERTAIN (all items match), IMPOSSIBLE (zero items match), and POSSIBLE / MAYBE (a mix of items is inside).", "Три ступени случайности: ДОСТОВЕРНО (все такие), НЕВОЗМОЖНО (нет ни одного) и ВОЗМОЖНО (внутри смесь разных).", "随机事件的三种状态: 必然(碗里全都是它)、不可能(碗里一个它也没有)、以及可能/不一定(碗里混有两种颜色)。"),
    taskA: tr("test 3 bowls with eyes closed: Bowl 1 has ONLY red fish (Certain), Bowl 2 has ONLY yellow fish (Red is Impossible), Bowl 3 has BOTH red and yellow (Possible!)", "проверить 3 чаши с закрытыми глазами: в 1-й ТОЛЬКО красные рыбки (достоверно), во 2-й ТОЛЬКО жёлтые (красная невозможна), в 3-й и красные, и жёлтые (возможно!)", "闭眼测试3个碗: 1号碗全是红鱼(摸出红鱼是必然),2号碗全是黄鱼(摸出红鱼是不可能),3号碗有红有黄(摸出红鱼是可能/不一定)"),
    puzA: tr("In Bowl 3 there is 1 red fish and 1 yellow fish. If you close your eyes and pick one, are you 100% sure it will be red, or could it be either one?", "В чаше лежат 1 красная рыбка и 1 жёлтая. Если закрыть глаза и вынуть одну, можно ли заранее знать наверняка, что она будет красной, или может попасться любая?", "碗里有1条红鱼和1条黄鱼。闭上眼睛摸一条,你能100%保证一定摸到红鱼吗,还是红鱼黄鱼都有可能摸到?"),
    solA: tr("It could be either one (POSSIBLE, not certain)! Because both red and yellow are in the bowl.", "Может попасться любая (это ВОЗМОЖНО, но не гарантировано)! Ведь в чаше есть и красная, и жёлтая рыбка.", "红鱼和黄鱼都有可能摸到(属于“可能”而非“必然”)!因为碗里同时存在两种颜色的鱼。"),
    taskB: tr("put 9 red counters and only 1 blue counter in the bowl to feel the difference between 'Very Likely' (red) and 'Unlikely' (blue)", "положить в чашу 9 красных фишек и всего 1 синюю, чтобы ощутить разницу между «Очень вероятно» (красная) и «Маловероятно» (синяя)", "在碗里放9枚红片和仅仅1枚蓝片,闭眼摸多次,直观体会“很有可能(大概率是红)”与“不太可能(小概率是蓝)”"),
    puzB: tr("A pond has 9 red fish and only 1 tiny blue fish. Which color are you MORE LIKELY to catch on your first try?", "В пруду плавают 9 красных рыбок и всего 1 синяя. Рыбку какого цвета СКОРЕЕ ВСЕГО ты поймаешь с первой попытки?", "池塘里有9条红鱼和仅仅1条蓝鱼。闭着眼睛捞第一网,捞到哪种颜色小鱼的可能性更大?"),
    solB: tr("A red fish! Because there are 9 red fish and only 1 blue fish (9 is much more than 1).", "Красную рыбку! Потому что красных рыбок 9, а синяя всего 1 (9 намного больше 1).", "捞到红鱼的可能性大得多!因为红鱼有9条,而蓝鱼只有1条(9远多于1)。")
  },
  32: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Geometry", methB: "USSR (Kiselev)",
    prop: tr("a wooden sphere (ball), a wooden cube (block), a cylinder (tin can), and a cardboard ramp", "деревянный шар (мячик), куб (кубик), цилиндр (баночка) и картонная горка", "木球(或皮球)、正方体木块、圆柱体纸筒以及硬纸板斜坡"),
    def: tr("3D solids vs 2D flat shapes: a SPHERE is curved in all directions and rolls every way; a CUBE has 6 flat square faces and stacks firmly without rolling.", "Объёмные тела (3D): ШАР изогнут со всех сторон и катится куда угодно; у КУБА 6 плоских квадратных граней, он стоит устойчиво и строится в башню.", "三维立体图形: 球体表面处处弯曲,向任何方向都能滚动;正方体有6个平平的正方形面,能稳稳堆叠而不会自己滚动。"),
    taskA: tr("place a ball and a cube at the top of a cardboard ramp and release them together to see which rolls down and which slides or stays put", "поставить мячик и кубик на вершину картонной горки и отпустить, наблюдая, кто покатится, а кто останется стоять или заскользит", "把小球和正方体积木同时放在纸板斜坡顶端松手,观察谁会骨碌碌滚下来、谁拥有平平的底面"),
    puzA: tr("Can you build a tall 3-block tower out of three round balls without them rolling off each other? Why do builders use flat bricks (cubes) instead?", "Можно ли построить высокую башню из трёх круглых мячиков, чтобы они не раскатились? Почему строители используют плоские кирпичи и кубики?", "你能把3个圆溜溜的皮球直接叠成一座高塔而不滚下来吗?为什么建筑工人盖房子要用平面的砖块和正方体?"),
    solA: tr("Balls have curved surfaces that touch at only a tiny point and roll away! Cubes have flat faces that rest solidly on each other.", "У шаров круглая поверхность без плоского дна, поэтому они скатываются! А у кубиков плоские грани, которые ровно лежат друг на друге.", "不能!因为球体没有平平的面,叠在一起会立刻滑落滚开;正方体有平平的面,面与面贴合才能稳固堆高。"),
    taskB: tr("dip one face of a cube and the flat end of a cylinder in paint (or trace around them) to see what 2D footprints they leave on paper", "обвести на бумаге донышко кубика и донышко цилиндра (или сделать отпечаток), угадывая, чей это плоский след", "将正方体的底面和圆柱体的底面按在纸上描出轮廓,像侦探一样观察三维立体留下的二维平面脚印"),
    puzB: tr("A 3D block stepped in mud and left a flat SQUARE footprint on the paper. Was the block a round ball or a cube?", "Объёмная фигура наступила в краску и оставила на бумаге плоский КВАДРАТНЫЙ след. Это был круглый мячик или кубик?", "一个立体玩具踩了印泥,在白纸上留下了一个方方正正的“正方形脚印”。这个立体玩具是圆皮球还是正方体积木?"),
    solB: tr("A cube! Because every flat face of a cube is a square.", "Кубик! Потому что каждая плоская грань куба — это квадрат.", "是正方体积木!因为正方体的每一个平面都是正方形。")
  },
  33: {
    catA: "Geometry", methA: "USSR (Kiselev)", catB: "Math Analysis", methB: "Oxford",
    prop: tr("identical Duplo/Lego bricks, paperclips, and the parent's and child's hands/feet", "одинаковые кубики лего/дупло, крупные скрепки и ладошки/ступни родителя и ребёнка", "一模一样的乐高大颗粒积木、回形针以及家长和孩子的手掌与脚丫"),
    def: tr("Measurement is finding how many identical unit lengths fit end-to-end along an object without gaps or overlaps (Kiselev axiom of measurement).", "Измерение длины — это подсчёт того, сколько одинаковых единичных мерок укладывается вдоль предмета вплотную без щелей и наложений.", "度量的本质(基谢廖夫度量公理): 用同一种标准单位首尾相接、无空隙无重叠地铺满物体,数出包含多少个单位。"),
    taskA: tr("measure the length of a picture book by laying identical Lego bricks end-to-end along its edge with no gaps", "измерить длину книги, прикладывая одинаковые кубики лего вплотную друг к другу вдоль края без дырок", "用同样大小的乐高积木首尾紧挨着沿绘本边缘排成一排,数出绘本等于几块积木长"),
    puzA: tr("When measuring the book, what goes wrong if we leave big empty gaps between our Lego bricks?", "Что произойдёт при измерении книги, если мы оставим большие пустые дырки между кубиками-мерками?", "测量绘本长度时,如果我们在积木和积木之间留出大大的空隙,测出来的数量还准吗?"),
    solA: tr("The count will be too small and inaccurate! Unit measures must touch end-to-end with zero gaps.", "Число мерок получится меньше настоящего! Единицы измерения должны прилегать друг к другу вплотную без щелей.", "不准,测出来的积木数会偏少!度量公理要求单位之间必须首尾相接、严丝合缝。"),
    taskB: tr("have both parent and child measure the same table edge using their own handspans, discovering that smaller hands give a bigger number!", "измерить край одного и того же стола папиной/маминой ладонью и маленькой ладошкой ребёнка, сравнив получившиеся числа", "让家长用大手掌、孩子用小手掌分别拃量同一张书桌的长边,观察为什么同一张桌子会量出不同的拃数"),
    puzB: tr("The table is 4 Daddy-hands long, and 7 Child-hands long. Why did your child-hands count a BIGGER number (7) for the exact same table?", "Длина стола — 4 папины ладони, но 7 детских ладошек. Почему твоих ладошек поместилось БОЛЬШЕ (7) на том же самом столе?", "同一张桌子,爸爸量是4拃长,宝宝量却是7拃长。为什么宝宝量出来的数字(7)反而更大?"),
    solB: tr("Because your hand is smaller! The smaller the unit of measure, the more units fit along the same length.", "Потому что детская ладошка меньше! Чем меньше мерка, тем больше раз она укладывается вдоль одной и той же длины.", "因为宝宝的手掌更小!测量的单位越小,在同样长度里能放下的次数就越多。")
  },
  34: {
    catA: "Logic", methA: "Oxford", catB: "Logic", methB: "USSR (Kiselev)",
    prop: tr("two animal puppets (Truthful Bunny who always tells the truth, and Silly Fox who always tells opposite/silly things) and colored blocks", "две игрушки на руку (Честный Зайка, который всегда говорит правду, и Хитрая Лисичка, которая всегда шутит наоборот) и цветные кубики", "两个手偶(只说真话的诚实兔、专说反话的淘气狐)和彩色积木"),
    def: tr("Truth value and logical negation (NOT): a statement is TRUE if it matches reality, and FALSE if it contradicts reality.", "Истинность и логическое отрицание (НЕ): высказывание ИСТИННО (правда), если совпадает с реальностью, и ЛОЖНО, если противоречит ей.", "真值与逻辑否定(非): 陈述与客观事实一致即为“真(真话)”,与事实相反即为“假(假话)”。"),
    taskA: tr("hold up a RED block: Truthful Bunny says 'This block is red!' (True!), while Silly Fox says 'This block is a banana!' (False!)", "показать КРАСНЫЙ кубик: Честный Зайка говорит «Кубик красный!» (Правда!), а Лисичка говорит «Это банан!» (Неправда!)", "举起一块红积木: 诚实兔说“这是红积木!”(真话),淘气狐说“这是一根香蕉!”(假话),让孩子当小法官判案"),
    puzA: tr("Silly Fox points at the bright yellow sun in a picture and says, 'Look, it is dark midnight!' Is Fox telling the truth or a falsehood?", "Лисичка показывает на яркое жёлтое солнышко на картинке и говорит: «Смотрите, сейчас тёмная полночь!» Это правда или выдумка?", "淘气狐指着画上火红的太阳说: “看呐,现在是漆黑的半夜!”它说的是真话还是假话?"),
    solA: tr("A falsehood! When the sun is shining high in the sky, it is daytime, NOT midnight.", "Выдумка (ложь)! Когда светит солнышко — сейчас день, а НЕ полночь.", "是假话!太阳高照的时候是白天,绝对不是半夜。"),
    taskB: tr("play a 2-cup hiding game where Truthful Bunny gives a true clue ('The coin is NOT under the blue cup') so the child deduces it is under the red cup", "сыграть в прятки монетки под 2 стаканчиками (синим и красным), где Честный Зайка даёт правдивую подсказку: «Монетка НЕ под синим стаканом»", "用红蓝两个纸杯玩藏硬币游戏,诚实兔给出真话线索: “硬币不在蓝杯子下面”,让孩子推理硬币在哪里"),
    puzB: tr("There are only 2 cups: Red and Blue. Truthful Bunny says: 'The berry is NOT under the Blue cup.' Where MUST the berry be?", "На столе только 2 стаканчика: Красный и Синий. Честный Зайка говорит правду: «Ягодка НЕ под Синим стаканом». Где ОБЯЗАТЕЛЬНО лежит ягодка?", "桌上只有红、蓝两个杯子。只说真话的诚实兔说: “浆果不在蓝杯子底下。”那么浆果一定在哪个杯子底下?"),
    solB: tr("Under the Red cup! With only two choices, eliminating Blue leaves Red as the only possible truth.", "Под Красным стаканчиком! Когда вариантов всего два и Синий исключён, остаётся только Красный (метод исключения).", "一定在红杯子底下!总共只有两个选择,排除了蓝杯子,就必然在红杯子里(逻辑排除法)。")
  },
  35: {
    catA: "Counting", methA: "Chinese", catB: "Arithmetic", methB: "USSR (Kiselev)",
    prop: tr("5 toy blocks stacked like a rocket tower, 5 fingers, and a paper number track 1 to 5", "5 кубиков, сложенных башней-ракетой, 5 пальчиков и числовая дорожка от 1 до 5", "叠成火箭塔的5块积木、5根手指以及1至5的数字步道"),
    def: tr("Counting backwards (5, 4, 3, 2, 1, 0) means taking 1 away at each step until zero items remain.", "Обратный счёт (5, 4, 3, 2, 1, 0) означает убирание по 1 предмету на каждом шаге, пока не останется ни одного (ноль).", "倒着数(5、4、3、2、1、0)就是每次拿走1个,直到全部拿完变成0(没有了)。"),
    taskA: tr("hold up 5 fingers and fold down 1 finger at a time while chanting '5, 4, 3, 2, 1, Zero — Blast Off!'", "поднять 5 пальчиков и загибать по одному под счёт: «5, 4, 3, 2, 1, Ноль — Пуск ракеты!»", "伸出5根手指,一边倒数“5、4、3、2、1、0——火箭发射!”一边每次弯下1根手指"),
    puzA: tr("4 little frogs are sitting on a log. 1 frog jumps into the pond. Count backwards one step from 4: how many frogs are left on the log?", "На брёвнышке сидели 4 лягушки. 1 лягушка прыгнула в воду. Сделай один шаг назад от 4: сколько лягушек осталось?", "木头上坐着4只小青蛙,1只跳进池塘里。从4倒着数一步,木头上还剩几只小青蛙?"),
    solA: tr("3 frogs! Counting back one step from 4 lands on 3.", "3 лягушки! Шаг назад от 4 ведёт к числу 3.", "还剩3只小青蛙!从4倒着退一步就是3。"),
    taskB: tr("walk a toy bunny forward 1, 2, 3, 4, 5 along the number track, and then hop backwards 5, 4, 3, 2, 1 back to the start", "провести зайчика вперёд по дорожке 1, 2, 3, 4, 5, а затем вернуть прыжками назад: 5, 4, 3, 2, 1", "让玩具小兔沿着数字格正着跳 1、2、3、4、5,再倒着跳 5、4、3、2、1 回到起点"),
    puzB: tr("Count backwards: 5, 4, 3, [?], 1! Which number is hiding in the middle?", "Посчитай обратно: 5, 4, 3, [?], 1! Какое число спряталось между 3 и 1?", "倒着数一数: 5、4、3、[?]、1!夹在3和1中间的是数字几?"),
    solB: tr("2! Going down one step from 3 gives 2.", "2! На один меньше трёх — это два.", "是数字2!从3往下少1个就是2。")
  },
  36: {
    catA: "Logic", methA: "USSR (Kiselev)", catB: "Counting", methB: "Chinese",
    prop: tr("a 10-frame, 10 counters, 3D solids (sphere, cube), yarn loops, and a graduation crown", "рамка десяти, 10 фишек, объёмные фигуры (шар, куб), кольца из нитей и корона выпускника", "十格框、10枚圆片、立体几何块(球、正方体)、毛线圈和毕业小皇冠"),
    def: tr("Full-year Pre-K synthesis: sets, pairwise equality, numbers 1–10 with the 5-anchor, 2D/3D geometry, patterns, and logical deduction.", "Итоговый синтез года Pre-K: множества, взаимно однозначное соответствие, числа 1–10 с опорой на 5, геометрия 2D/3D и логика.", "Pre-K全学年总复盘: 集合公理、一一配对、以5为基准的1-10数感、平面与立体几何以及逻辑推理。"),
    taskA: tr("complete Station 1 (sort 3D solids vs flat shapes into two hoops) and Station 2 (fill a 10-frame to show 7 as 5+2 and 10 as 5+5)", "пройти Станцию 1 (разделить объёмные и плоские фигуры в два круга) и Станцию 2 (показать на рамке десяти числа 7 = 5+2 и 10 = 5+5)", "闯过第一关(将平面与立体图形分类进圈)与第二关(在十格框上用5+2摆出7、用5+5摆出10)"),
    puzA: tr("Station 3 Riddle: I have 4 equal straight sides and 4 corners, and I am flat on the paper. Who am I?", "Загадка Станции 3: У меня 4 равные прямые стороны и 4 уголка, и я плоский на листе бумаги. Кто я?", "第三关谜语: 我平平地躺在纸上,有4条一样长的直边和4个尖尖的角。我是谁?"),
    solA: tr("A Square! Defined by 4 equal straight sides and 4 right corners.", "Квадрат! Фигура с 4 равными прямыми сторонами и 4 углами.", "正方形!由4条相等的直边和4个角共同定义。"),
    taskB: tr("complete Station 4: share 6 graduation stickers fairly between child and teddy bear (3 and 3), and crown the Pre-K Math Graduate!", "пройти Станцию 4: разделить 6 наклеек поровну между ребёнком и мишкой (по 3 каждому) и вручить корону Выпускника Pre-K!", "闯过第四关: 将6张荣誉贴纸公平分给孩子和小熊(每人3张),为孩子戴上Pre-K数学毕业小皇冠!"),
    puzB: tr("Final Graduation Puzzle: You and Teddy Bear each got 3 gold stars (3 and 3). If you put your stars together on one banner, how many stars shine in all?", "Финальная задача выпускника: Ты и Мишка получили по 3 золотые звёздочки (3 и 3). Если сложить ваши звёздочки вместе на один плакат, сколько всего звёзд засияет?", "毕业终极挑战: 你和小熊每人分到了3颗金星(3和3)。如果把你们两人的金星合贴在一张奖状上,一共有几颗金星闪闪发光?"),
    solB: tr("6 gold stars! Because 3 and 3 make 6 (or 5 and 1 more on the 10-frame!).", "6 золотых звёздочек! Потому что 3 да 3 вместе составляют 6 (или 5 да ещё 1).", "一共6颗金星!因为3加3等于6(在十格框上就是满5再多1颗)!")
  }
};

function buildPrekWeekLessons(w, spec) {
  const wTitle = SYLLABUS.prek[w];
  const l1Id = `prek_w${w}_l1`;
  const l2Id = `prek_w${w}_l2`;

  const lessonA = {
    lesson_id: l1Id,
    duration_minutes: 30,
    category: spec.catA,
    methodology_focus: spec.methA,
    title: tr(
      `Lesson A: ${wTitle.en} — Core Discovery`,
      `Урок А: ${wTitle.ru} — Открытие понятия`,
      `A课: ${wTitle.zh} — 核心概念探索`
    ),
    objective: tr(
      `${ spec.def.en } Practice hands-on with ${ spec.prop.en }.`,
      `${ spec.def.ru } Практическое исследование с помощью: ${ spec.prop.ru }.`,
      `${ spec.def.zh } 借助${ spec.prop.zh }进行具象操作体验。`
    ),
    sections: [
      {
        type: "theory",
        duration: 8,
        parent_script: tr(
          `Today we are exploring "${wTitle.en}". Gather ${spec.prop.en} on the mat in front of us. Listen carefully to our math rule: ${spec.def.en} Watch my hands first as I show you how this works step by step, and then it will be your turn to test the rule!`,
          `Сегодня мы исследуем тему «${wTitle.ru}». Положим перед собой на коврик ${spec.prop.ru}. Послушай внимательно наше математическое правило: ${spec.def.ru} Сначала посмотри на мои руки — я покажу, как это работает, а потом ты сам проверишь правило!`,
          `今天我们来探索“${wTitle.zh}”。先把${spec.prop.zh}摆在我们面前的垫子上。仔细听今天的数学核心法则: ${spec.def.zh} 先看爸爸/妈妈亲手示范一遍,接下来就轮到你来亲手验证这个规律啦!`
        )
      },
      {
        type: "practice",
        duration: 15,
        activity: tr(
          `1) Lay out ${spec.prop.en} on the table and let your child touch and name each piece.\n2) Together, ${spec.taskA.en}.\n3) Ask your child to explain in their own words what happened and point to the matching pieces.\n4) Swap roles: let your child be the 'Little Teacher' and give you one example to check!`,
          `1) Выложите на стол ${spec.prop.ru} и дайте ребёнку потрогать и назвать каждый предмет.\n2) Вместе с ребёнком постарайтесь ${spec.taskA.ru}.\n3) Попросите малыша своими словами объяснить результат и показать пальчиком на предметы.\n4) Поменяйтесь ролями: пусть ребёнок станет «Маленьким учителем» и даст задание вам!`,
          `1) 在桌上摆出${spec.prop.zh},让孩子亲手摸一摸并说出每样教具的名称。\n2) 家长与孩子一起动手: ${spec.taskA.zh}。\n3) 请孩子用自己的话讲一讲刚才发现了什么,并用小手指指出对应的教具。\n4) 角色互换: 让孩子当“小老师”给家长出一道同样的测试题!`
        )
      },
      {
        type: "logic_puzzle",
        duration: 7,
        prompt: spec.puzA,
        solution: spec.solA
      }
    ],
    teacher_notes: {
      explain: spec.def,
      trap: tr(
        `Rushing to verbal words before your child has physically manipulated ${spec.prop.en}.`,
        `Переход к словам и числам до того, как ребёнок руками потрогал и проверил ${spec.prop.ru}.`,
        `在孩子亲手操作${spec.prop.zh}建立具象直觉之前,切勿过早催促背诵口诀。`
      ),
      socratic: spec.puzA
    }
  };

  const lessonB = {
    lesson_id: l2Id,
    duration_minutes: 30,
    category: spec.catB,
    methodology_focus: spec.methB,
    title: tr(
      `Lesson B: ${wTitle.en} — Playful Mastery & Logic`,
      `Урок Б: ${wTitle.ru} — Практикум и логика`,
      `B课: ${wTitle.zh} — 思维进阶与奥数挑战`
    ),
    objective: tr(
      `Deepen "${wTitle.en}" through playful variation: ${spec.taskB.en}.`,
      `Углубить тему «${wTitle.ru}» через вариативную практику: ${spec.taskB.ru}.`,
      `通过变式游戏深化“${wTitle.zh}”: ${spec.taskB.zh}。`
    ),
    sections: [
      {
        type: "theory",
        duration: 8,
        parent_script: tr(
          `Last time we discovered the secret of "${wTitle.en}". Remember our rule: ${spec.def.en} Today we are going to play a detective game with ${spec.prop.en}! Even when things move, hide, or change order, our mathematical rule still tells us the exact truth. Let us test it!`,
          `На прошлом занятии мы открыли секрет темы «${wTitle.ru}». Вспомним наше правило: ${spec.def.ru} Сегодня мы сыграем в игру детективов с помощью: ${spec.prop.ru}! Даже когда предметы прячутся или меняются местами, правило всегда подскажет верный ответ!`,
          `上一节课我们发现了“${wTitle.zh}”的奥秘,还记得我们的核心法则吗?${spec.def.zh} 今天我们要用${spec.prop.zh}玩一场数学小侦探游戏!就算物品移动、藏起来或者换了位置,数学规律依然能帮我们一眼看穿真相!`
        )
      },
      {
        type: "practice",
        duration: 15,
        activity: tr(
          `1) Quick 1-minute warm-up: review ${spec.prop.en} from Lesson A.\n2) Main variation challenge: ${spec.taskB.en}.\n3) Hide or rearrange one piece and ask: 'What changed, and what stayed the exact same?'\n4) Celebrate with 3 high-fives as your child proves the answer using the props!`,
          `1) Быстрая разминка на 1 минуту: вспомните ${spec.prop.ru} из Урока А.\n2) Главное задание-вариация: ${spec.taskB.ru}.\n3) Спрячьте или передвиньте один предмет и спросите: «Что изменилось, а что осталось прежним?»\n4) Отпразднуйте успех и дайте «пять», когда ребёнок докажет ответ на предметах!`,
          `1) 1分钟快速热身: 用${spec.prop.zh}回顾A课的核心玩法。\n2) 核心变式挑战: ${spec.taskB.zh}。\n3) 藏起或移动其中一个教具并提问: “什么发生了变化,什么依然保持不变?”\n4) 当孩子用实物摆出证明时,击掌三次庆祝闯关成功!`
        )
      },
      {
        type: "logic_puzzle",
        duration: 7,
        prompt: spec.puzB,
        solution: spec.solB
      }
    ],
    teacher_notes: {
      explain: spec.def,
      trap: tr(
        `Giving away the answer to the puzzle instead of letting your child test it physically with ${spec.prop.en}.`,
        `Подсказка готового ответа вместо того, чтобы дать ребёнку проверить задачу руками на ${spec.prop.ru}.`,
        `直接告诉孩子谜底,而不是引导孩子亲手用${spec.prop.zh}摆出来验证。`
      ),
      socratic: spec.puzB
    }
  };

  return [lessonA, lessonB];
}

const PREK_CAT_MAP = {
  "Math Analysis": "Counting",
  "Algebra": "Arithmetic",
  "Computer Science": "Logic",
  "Probability": "Logic"
};
const allPrekLessons = [...existingLessons];
for (let w = 5; w <= 36; w++) {
  const [la, lb] = buildPrekWeekLessons(w, PREK_SPECS[w]);
  allPrekLessons.push(la, lb);
}
for (const l of allPrekLessons) {
  if (PREK_CAT_MAP[l.category]) l.category = PREK_CAT_MAP[l.category];
}

const prekOut = {
  curriculum: {
    stages: [
      {
        stage_id: "prek",
        age_range: "3–4",
        title: tr("Stage 0: Pre-K Foundations (Ages 3–4)", "Ступень 0: Малыши Pre-K (3–4 года)", "第0阶段: 幼儿园小/中班启蒙 (3–4岁)"),
        lessons: allPrekLessons
      }
    ]
  }
};

fs.writeFileSync('data/curriculum_prek.json', JSON.stringify(prekOut, null, 2), 'utf8');
console.log('Generated data/curriculum_prek.json with', allPrekLessons.length, 'lessons across 36 weeks!');
