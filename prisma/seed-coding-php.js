const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    lessonSlug: "php-introducere-echo",
    items: [
      {
        question: "Scrie un script PHP care: (1) declară variabila `$name` cu valoarea 'Ana', (2) declară `$age` cu valoarea 25, (3) folosind `echo` și interpolarea stringurilor, afișează: `Buna ziua! Numele meu este Ana si am 25 de ani.`",
        starterCode: "<?php\n// Declara variabilele\n$name = '';\n$age = 0;\n\n// Afișează mesajul folosind echo și interpolarea\necho \"\";\n?>",
        explanation: "<?php\n$name = 'Ana';\n$age = 25;\necho \"Buna ziua! Numele meu este $name si am $age de ani.\";\n?>",
        type: "coding", language: "php",
      },
      {
        question: "Scrie un script PHP care calculează și afișează suma, diferența, produsul și câtul a două numere: `$a = 18` și `$b = 6`. Afișează fiecare rezultat pe o linie separată cu `\\n`.",
        starterCode: "<?php\n$a = 18;\n$b = 6;\n\n// Calculează și afișează suma\n// Calculează și afișează diferența\n// Calculează și afișează produsul\n// Calculează și afișează câtul\n?>",
        explanation: "<?php\n$a = 18;\n$b = 6;\necho \"Suma: \" . ($a + $b) . \"\\n\";\necho \"Diferenta: \" . ($a - $b) . \"\\n\";\necho \"Produsul: \" . ($a * $b) . \"\\n\";\necho \"Catul: \" . ($a / $b) . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
      {
        question: "Scrie un script PHP care: declară un array `$fruits = ['mere', 'pere', 'struguri', 'banane']`. Afișează numărul de elemente cu `count()`, primul element, ultimul element (folosind count pentru index), și iterează array-ul cu `foreach` afișând fiecare fruct.",
        starterCode: "<?php\n$fruits = ['mere', 'pere', 'struguri', 'banane'];\n\n// Afișează numărul de elemente\n\n// Afișează primul element\n\n// Afișează ultimul element\n\n// Iterează cu foreach\n?>",
        explanation: "<?php\n$fruits = ['mere', 'pere', 'struguri', 'banane'];\necho \"Numar: \" . count($fruits) . \"\\n\";\necho \"Primul: \" . $fruits[0] . \"\\n\";\necho \"Ultimul: \" . $fruits[count($fruits) - 1] . \"\\n\";\nforeach ($fruits as $fruit) { echo $fruit . \"\\n\"; }\n?>",
        type: "coding", language: "php",
      },
    ],
  },
  {
    lessonSlug: "php-conditii",
    items: [
      {
        question: "Scrie o funcție PHP `getGrade($score)` care primește un scor (0-100) și returnează calificativul: 'Excelent' (90-100), 'Bine' (70-89), 'Satisfăcător' (50-69), 'Insuficient' (sub 50). Testează cu scorurile: 95, 75, 55, 35.",
        starterCode: "<?php\nfunction getGrade($score) {\n    // returnează calificativul bazat pe scor\n    if ($score >= 90) {\n        return '';\n    }\n    // adaugă celelalte condiții\n}\n\n// Testează funcția\necho getGrade(95) . \"\\n\";\necho getGrade(75) . \"\\n\";\necho getGrade(55) . \"\\n\";\necho getGrade(35) . \"\\n\";\n?>",
        explanation: "<?php\nfunction getGrade($score) {\n    if ($score >= 90) return 'Excelent';\n    elseif ($score >= 70) return 'Bine';\n    elseif ($score >= 50) return 'Satisfacator';\n    else return 'Insuficient';\n}\necho getGrade(95) . \"\\n\";\necho getGrade(75) . \"\\n\";\necho getGrade(55) . \"\\n\";\necho getGrade(35) . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
      {
        question: "Scrie un script PHP cu o structură `switch` care primește variabila `$day` (număr 1-7) și afișează: 'Luni'....'Duminică', sau 'Zi invalidă' pentru alte valori. Testează cu zilele 1, 5, 7, și 9.",
        starterCode: "<?php\nfunction getDayName($day) {\n    switch ($day) {\n        // adaugă cazurile pentru zilele 1-7\n        default:\n            return 'Zi invalida';\n    }\n}\n\necho getDayName(1) . \"\\n\";\necho getDayName(5) . \"\\n\";\necho getDayName(7) . \"\\n\";\necho getDayName(9) . \"\\n\";\n?>",
        explanation: "<?php\nfunction getDayName($day) {\n    switch ($day) {\n        case 1: return 'Luni';\n        case 2: return 'Marti';\n        case 3: return 'Miercuri';\n        case 4: return 'Joi';\n        case 5: return 'Vineri';\n        case 6: return 'Sambata';\n        case 7: return 'Duminica';\n        default: return 'Zi invalida';\n    }\n}\necho getDayName(1) . \"\\n\";\necho getDayName(5) . \"\\n\";\necho getDayName(7) . \"\\n\";\necho getDayName(9) . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
    ],
  },
  {
    lessonSlug: "php-bucle",
    items: [
      {
        question: "Scrie un script PHP care folosind o buclă `for` afișează tabla înmulțirii pentru numărul 7 (de la 7x1 până la 7x10), în formatul: `7 x 1 = 7`.",
        starterCode: "<?php\n$number = 7;\n\n// Afișează tabla înmulțirii cu for\nfor ($i = 1; $i <= 10; $i++) {\n    // afișează formatul: 7 x i = rezultat\n}\n?>",
        explanation: "<?php\n$number = 7;\nfor ($i = 1; $i <= 10; $i++) {\n    echo $number . \" x \" . $i . \" = \" . ($number * $i) . \"\\n\";\n}\n?>",
        type: "coding", language: "php",
      },
      {
        question: "Scrie o funcție PHP `sumDigits($n)` care calculează suma cifrelor unui număr întreg pozitiv folosind o buclă `while`. Testează cu numerele: 123, 9999, 1001.",
        starterCode: "<?php\nfunction sumDigits($n) {\n    $sum = 0;\n    // folosește while pentru a extrage și suma cifrele\n    while ($n > 0) {\n        // extrage ultima cifră cu modulo\n        // elimină ultima cifră cu împărțire întreagă\n    }\n    return $sum;\n}\n\necho sumDigits(123) . \"\\n\";   // 6\necho sumDigits(9999) . \"\\n\";  // 36\necho sumDigits(1001) . \"\\n\";  // 2\n?>",
        explanation: "<?php\nfunction sumDigits($n) {\n    $sum = 0;\n    while ($n > 0) {\n        $sum += $n % 10;\n        $n = intdiv($n, 10);\n    }\n    return $sum;\n}\necho sumDigits(123) . \"\\n\";\necho sumDigits(9999) . \"\\n\";\necho sumDigits(1001) . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
      {
        question: "Creează un array PHP `$students` cu 5 obiecte (array-uri asociative) cu câmpurile `name` și `grade`. Folosind `foreach`, calculează media notelor și afișează fiecare student cu nota lui, iar la final afișează media clasei.",
        starterCode: "<?php\n$students = [\n    ['name' => 'Ana', 'grade' => 9],\n    ['name' => 'Bogdan', 'grade' => 7],\n    ['name' => 'Carla', 'grade' => 8],\n    ['name' => 'Dan', 'grade' => 6],\n    ['name' => 'Elena', 'grade' => 10]\n];\n\n$total = 0;\n\nforeach ($students as $student) {\n    // afișează studentul și nota\n    // adaugă nota la total\n}\n\n// calculează și afișează media\n?>",
        explanation: "<?php\n$students = [['name' => 'Ana', 'grade' => 9], ['name' => 'Bogdan', 'grade' => 7], ['name' => 'Carla', 'grade' => 8], ['name' => 'Dan', 'grade' => 6], ['name' => 'Elena', 'grade' => 10]];\n$total = 0;\nforeach ($students as $s) {\n    echo $s['name'] . ': ' . $s['grade'] . \"\\n\";\n    $total += $s['grade'];\n}\necho 'Media: ' . ($total / count($students)) . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
    ],
  },
  {
    lessonSlug: "php-functii",
    items: [
      {
        question: "Scrie o funcție PHP recursivă `fibonacci($n)` care returnează al n-lea număr Fibonacci. Testează afișând primele 10 numere Fibonacci (fibonacci(0) până la fibonacci(9)): 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.",
        starterCode: "<?php\nfunction fibonacci($n) {\n    // cazuri de baza\n    if ($n <= 0) return 0;\n    if ($n === 1) return 1;\n    // apel recursiv\n}\n\n// Afișează primele 10 numere Fibonacci\nfor ($i = 0; $i < 10; $i++) {\n    echo fibonacci($i) . \" \";\n}\necho \"\\n\";\n?>",
        explanation: "<?php\nfunction fibonacci($n) {\n    if ($n <= 0) return 0;\n    if ($n === 1) return 1;\n    return fibonacci($n - 1) + fibonacci($n - 2);\n}\nfor ($i = 0; $i < 10; $i++) {\n    echo fibonacci($i) . \" \";\n}\necho \"\\n\";\n?>",
        type: "coding", language: "php",
      },
      {
        question: "Creează o funcție PHP `arrayStats($arr)` care primește un array de numere și returnează un array asociativ cu: `min`, `max`, `sum`, `average`, și `count`. Testează cu array-ul `[4, 8, 15, 16, 23, 42]`.",
        starterCode: "<?php\nfunction arrayStats($arr) {\n    // calculează statisticile\n    return [\n        'min' => /* ... */,\n        'max' => /* ... */,\n        'sum' => /* ... */,\n        'average' => /* ... */,\n        'count' => /* ... */\n    ];\n}\n\n$result = arrayStats([4, 8, 15, 16, 23, 42]);\nforeach ($result as $key => $value) {\n    echo $key . ': ' . $value . \"\\n\";\n}\n?>",
        explanation: "<?php\nfunction arrayStats($arr) {\n    return ['min' => min($arr), 'max' => max($arr), 'sum' => array_sum($arr), 'average' => array_sum($arr) / count($arr), 'count' => count($arr)];\n}\n$result = arrayStats([4, 8, 15, 16, 23, 42]);\nforeach ($result as $key => $value) { echo $key . ': ' . $value . \"\\n\"; }\n?>",
        type: "coding", language: "php",
      },
    ],
  },
  {
    lessonSlug: "php-string-functions",
    items: [
      {
        question: "Scrie o funcție PHP `cleanAndFormat($str)` care: (1) elimină spațiile de la capete cu `trim()`, (2) convertește la lowercase cu `strtolower()`, (3) înlocuiește spațiile cu liniuțe cu `str_replace()`, (4) elimină caracterele speciale păstrând doar litere, cifre și liniuțe cu `preg_replace()`. Testează cu 'Hello World! This is PHP.'",
        starterCode: "<?php\nfunction cleanAndFormat($str) {\n    // trim, lowercase, înlocuiește spații cu -, elimina speciale\n    $str = trim($str);\n    // continuă transformările\n    return $str;\n}\n\necho cleanAndFormat('Hello World! This is PHP.') . \"\\n\";\necho cleanAndFormat('  PHP Programming 2024  ') . \"\\n\";\n?>",
        explanation: "<?php\nfunction cleanAndFormat($str) {\n    $str = trim($str);\n    $str = strtolower($str);\n    $str = str_replace(' ', '-', $str);\n    $str = preg_replace('/[^a-z0-9-]/', '', $str);\n    return $str;\n}\necho cleanAndFormat('Hello World! This is PHP.') . \"\\n\";\necho cleanAndFormat('  PHP Programming 2024  ') . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
    ],
  },
  {
    lessonSlug: "php-arrays",
    items: [
      {
        question: "Scrie un script PHP care: (1) creează array-ul `$numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]`, (2) elimină duplicatele cu `array_unique()`, (3) sortează crescător cu `sort()`, (4) filtrează să rămână doar numerele > 3 cu `array_filter()`, (5) afișează rezultatul final cu `implode(', ', $arr)`.",
        starterCode: "<?php\n$numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];\n\n// Elimina duplicatele\n$unique = /* ... */;\n\n// Sortează crescător\nsort($unique);\n\n// Filtrează > 3\n$filtered = array_filter($unique, function($n) {\n    return /* ... */;\n});\n\n// Afișează rezultatul\necho implode(', ', $filtered) . \"\\n\";\n?>",
        explanation: "<?php\n$numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];\n$unique = array_unique($numbers);\nsort($unique);\n$filtered = array_filter($unique, function($n) { return $n > 3; });\necho implode(', ', $filtered) . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
      {
        question: "Creează o funcție PHP `groupBy($array, $key)` care grupează un array de array-uri asociative după valoarea unui câmp specificat. Testează cu un array de studenți cu câmpul 'class' — grupați după clasă.",
        starterCode: "<?php\nfunction groupBy($array, $key) {\n    $result = [];\n    foreach ($array as $item) {\n        // grupează item-ul după valoarea $key\n    }\n    return $result;\n}\n\n$students = [\n    ['name' => 'Ana', 'class' => 'A'],\n    ['name' => 'Bogdan', 'class' => 'B'],\n    ['name' => 'Carla', 'class' => 'A'],\n    ['name' => 'Dan', 'class' => 'B'],\n    ['name' => 'Elena', 'class' => 'A'],\n];\n\n$grouped = groupBy($students, 'class');\nforeach ($grouped as $class => $members) {\n    echo \"Clasa $class: \" . implode(', ', array_column($members, 'name')) . \"\\n\";\n}\n?>",
        explanation: "<?php\nfunction groupBy($array, $key) {\n    $result = [];\n    foreach ($array as $item) { $result[$item[$key]][] = $item; }\n    return $result;\n}\n$students = [['name' => 'Ana', 'class' => 'A'], ['name' => 'Bogdan', 'class' => 'B'], ['name' => 'Carla', 'class' => 'A'], ['name' => 'Dan', 'class' => 'B'], ['name' => 'Elena', 'class' => 'A']];\n$grouped = groupBy($students, 'class');\nforeach ($grouped as $class => $members) { echo \"Clasa $class: \" . implode(', ', array_column($members, 'name')) . \"\\n\"; }\n?>",
        type: "coding", language: "php",
      },
    ],
  },
  {
    lessonSlug: "php-oop-clase",
    items: [
      {
        question: "Creează o clasă PHP `BankAccount` cu: proprietățile private `$balance` (inițial 0) și `$owner`. Constructor care setează owner-ul. Metodele: `deposit($amount)` (adaugă la balance dacă > 0), `withdraw($amount)` (scade dacă balance suficient), `getBalance()`. Instanțiază și testează toate metodele.",
        starterCode: "<?php\nclass BankAccount {\n    private $balance;\n    private $owner;\n    \n    public function __construct($owner) {\n        $this->owner = $owner;\n        $this->balance = 0;\n    }\n    \n    public function deposit($amount) {\n        // adaugă la balance dacă amount > 0\n    }\n    \n    public function withdraw($amount) {\n        // scade din balance dacă suficient\n    }\n    \n    public function getBalance() {\n        return $this->balance;\n    }\n}\n\n$account = new BankAccount('Ana');\n$account->deposit(1000);\n$account->withdraw(250);\necho 'Balance: ' . $account->getBalance() . \"\\n\";\n$account->withdraw(1000); // insuficient\necho 'Balance final: ' . $account->getBalance() . \"\\n\";\n?>",
        explanation: "<?php\nclass BankAccount {\n    private $balance;\n    private $owner;\n    public function __construct($owner) { $this->owner = $owner; $this->balance = 0; }\n    public function deposit($amount) { if ($amount > 0) $this->balance += $amount; }\n    public function withdraw($amount) { if ($amount <= $this->balance) $this->balance -= $amount; else echo 'Fonduri insuficiente' . \"\\n\"; }\n    public function getBalance() { return $this->balance; }\n}\n$account = new BankAccount('Ana');\n$account->deposit(1000);\n$account->withdraw(250);\necho 'Balance: ' . $account->getBalance() . \"\\n\";\n$account->withdraw(1000);\necho 'Balance final: ' . $account->getBalance() . \"\\n\";\n?>",
        type: "coding", language: "php",
      },
    ],
  },
  {
    lessonSlug: "php-oop-mostenire",
    items: [
      {
        question: "Creează o ierarhie de clase PHP: clasa de bază `Animal` cu proprietatea `$name` și metodele `eat()` (afișează '{name} mănâncă') și `speak()` (abstract). Clasele `Dog` și `Cat` extind `Animal` și implementează `speak()` diferit. Testează cu instanțe ale ambelor clase.",
        starterCode: "<?php\nclass Animal {\n    protected $name;\n    \n    public function __construct($name) {\n        $this->name = $name;\n    }\n    \n    public function eat() {\n        echo $this->name . ' mananca' . \"\\n\";\n    }\n    \n    public function speak() {\n        // va fi suprascris de subclase\n        echo $this->name . ' face un sunet' . \"\\n\";\n    }\n}\n\nclass Dog extends Animal {\n    public function speak() {\n        // câinele latră\n    }\n}\n\nclass Cat extends Animal {\n    public function speak() {\n        // pisica miauna\n    }\n}\n\n$dog = new Dog('Rex');\n$cat = new Cat('Whiskers');\n$dog->speak();\n$dog->eat();\n$cat->speak();\n$cat->eat();\n?>",
        explanation: "<?php\nclass Animal {\n    protected $name;\n    public function __construct($name) { $this->name = $name; }\n    public function eat() { echo $this->name . ' mananca' . \"\\n\"; }\n    public function speak() { echo $this->name . ' face un sunet' . \"\\n\"; }\n}\nclass Dog extends Animal { public function speak() { echo $this->name . ' latra: Ham ham!' . \"\\n\"; } }\nclass Cat extends Animal { public function speak() { echo $this->name . ' miauna: Miau!' . \"\\n\"; } }\n$dog = new Dog('Rex'); $cat = new Cat('Whiskers');\n$dog->speak(); $dog->eat(); $cat->speak(); $cat->eat();\n?>",
        type: "coding", language: "php",
      },
    ],
  },
];

async function main() {
  console.log('Adăugare coding tasks PHP...');
  let added = 0, skipped = 0;

  for (const { lessonSlug, items } of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: lessonSlug } });
    if (!lesson) { console.log(`  [skip] ${lessonSlug} — lecție negăsită`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= items.length) { console.log(`  [skip] ${lessonSlug} — are deja ${existing} coding tasks`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const item of items) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id,
          number: n++,
          name: item.name || '',
          question: item.question,
          type: item.type,
          language: item.language,
          starterCode: item.starterCode || '',
          explanation: item.explanation || '',
          options: [],
          answer: '',
          difficulty: item.difficulty || 'medium',
          expectedOutput: '',
        },
      });
    }
    console.log(`  [ok] ${lessonSlug} — ${items.length} tasks adăugate`);
    added += items.length;
  }

  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
  await prisma.$disconnect();
}

main().catch(console.error);
