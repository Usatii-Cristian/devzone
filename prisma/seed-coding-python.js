// Coding tasks for Python lessons (actual Python via Piston)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CODING_TASKS = {
  "input-conversii": [
    { name: "Calcul vârstă", difficulty: "easy", language: "python",
      question: "Cere utilizatorului anul nașterii (simulează cu input hardcodat: 1998) și afișează vârsta calculată pentru 2026.",
      starterCode: "# Simulăm input: an_nastere = 1998\nan_nastere = 1998\n# calculează și afișează vârsta\n",
      expectedOutput: "28", explanation: "2026 - 1998 = 28. int(input()) pentru real." },
    { name: "Celsius la Fahrenheit", difficulty: "easy", language: "python",
      question: "Convertește temperatura de 100 grade Celsius la Fahrenheit. Formula: F = C * 9/5 + 32.",
      starterCode: "celsius = 100\n# calculează fahrenheit\n# afișează rezultatul\n",
      expectedOutput: "212.0", explanation: "100 * 9/5 + 32 = 212.0" },
    { name: "Suma și media", difficulty: "medium", language: "python",
      question: "Calculează suma și media a 5 numere: 10, 20, 30, 40, 50. Afișează suma pe primul rând și media pe al doilea.",
      starterCode: "numere = [10, 20, 30, 40, 50]\n# suma și media\n",
      expectedOutput: "150", explanation: "sum() și len() sau sum()/5." },
    { name: "String la int verificat", difficulty: "medium", language: "python",
      question: "Încearcă să convertești '42abc' la int. Dacă nu se poate, afișează 'conversie imposibilă'.",
      starterCode: "valoare = '42abc'\ntry:\n    print(int(valoare))\nexcept:\n    print('conversie imposibila')\n",
      expectedOutput: "conversie imposibila", explanation: "int('42abc') aruncă ValueError — prindem cu try/except." },
  ],
  "operatori": [
    { name: "Calculator", difficulty: "easy", language: "python",
      question: "Declară a=17, b=5. Afișează pe rânduri separate: suma, diferența, produsul, câtul întreg, restul și puterea (a**b).",
      starterCode: "a = 17\nb = 5\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a // b)\nprint(a % b)\nprint(a ** b)\n",
      expectedOutput: "22", explanation: "// = cât întreg, % = rest, ** = putere." },
    { name: "IMC", difficulty: "medium", language: "python",
      question: "Calculează IMC pentru greutate=70, înălțime=1.75. Afișează cu 2 zecimale.",
      starterCode: "greutate = 70\ninaltime = 1.75\nimc = greutate / inaltime ** 2\nprint(f'{imc:.2f}')\n",
      expectedOutput: "22.86", explanation: "70 / 1.75^2 ≈ 22.86. f'{val:.2f}' pentru 2 zecimale." },
    { name: "Augmented assignment", difficulty: "easy", language: "python",
      question: "Pornind de la scor=100, aplică: scor += 50, scor -= 20, scor *= 2. Afișează scorul final.",
      starterCode: "scor = 100\nscor += 50\nscor -= 20\nscor *= 2\nprint(scor)\n",
      expectedOutput: "260", explanation: "(100+50-20)*2 = 260." },
    { name: "Modulo aplicat", difficulty: "medium", language: "python",
      question: "Verifică dacă 1234 este par sau impar și dacă este divizibil cu 6. Afișează rezultatele.",
      starterCode: "n = 1234\nprint('par' if n % 2 == 0 else 'impar')\nprint('div cu 6' if n % 6 == 0 else 'nu div cu 6')\n",
      expectedOutput: "par", explanation: "1234%2=0 → par. 1234%6=2 → nu div cu 6." },
  ],
  "if-else-elif": [
    { name: "Nota la literă", difficulty: "easy", language: "python",
      question: "Declară nota=85. Afișează: A (>=90), B (>=80), C (>=70), D (altfel).",
      starterCode: "nota = 85\nif nota >= 90:\n    print('A')\nelif nota >= 80:\n    print('B')\nelif nota >= 70:\n    print('C')\nelse:\n    print('D')\n",
      expectedOutput: "B", explanation: "85 >= 80 dar < 90 → B." },
    { name: "Maxim 3 numere", difficulty: "medium", language: "python",
      question: "Declară a=12, b=45, c=33. Afișează maximul folosind if/elif/else.",
      starterCode: "a, b, c = 12, 45, 33\nif a >= b and a >= c:\n    print(a)\nelif b >= a and b >= c:\n    print(b)\nelse:\n    print(c)\n",
      expectedOutput: "45", explanation: "b=45 e maximul." },
    { name: "An bisect", difficulty: "medium", language: "python",
      question: "Verifică dacă 2024 este an bisect (div cu 4 și nu cu 100, SAU div cu 400). Afișează 'bisect' sau 'nu e bisect'.",
      starterCode: "an = 2024\nif (an % 4 == 0 and an % 100 != 0) or an % 400 == 0:\n    print('bisect')\nelse:\n    print('nu e bisect')\n",
      expectedOutput: "bisect", explanation: "2024 % 4 == 0 și 2024 % 100 != 0 → bisect." },
    { name: "FizzBuzz pentru un număr", difficulty: "easy", language: "python",
      question: "Implementează FizzBuzz pentru n=15: dacă div cu 3 și 5 → FizzBuzz, cu 3 → Fizz, cu 5 → Buzz, altfel numărul.",
      starterCode: "n = 15\nif n % 3 == 0 and n % 5 == 0:\n    print('FizzBuzz')\nelif n % 3 == 0:\n    print('Fizz')\nelif n % 5 == 0:\n    print('Buzz')\nelse:\n    print(n)\n",
      expectedOutput: "FizzBuzz", explanation: "15 e div cu 3 și 5 → FizzBuzz." },
  ],
  "while-loop": [
    { name: "Countdown", difficulty: "easy", language: "python",
      question: "Afișează numerele de la 5 la 1 (descrescător) folosind while.",
      starterCode: "i = 5\nwhile i >= 1:\n    print(i)\n    i -= 1\n",
      expectedOutput: "5", explanation: "while cu decrementare." },
    { name: "Suma while", difficulty: "easy", language: "python",
      question: "Calculează suma 1+2+...+10 folosind while. Afișează suma.",
      starterCode: "suma = 0\ni = 1\nwhile i <= 10:\n    suma += i\n    i += 1\nprint(suma)\n",
      expectedOutput: "55", explanation: "1+2+...+10 = 55." },
    { name: "Cifrele unui număr", difficulty: "hard", language: "python",
      question: "Afișează cifrele numărului 12345 una câte una (de la ultima la prima) folosind while cu %10 și //10.",
      starterCode: "n = 12345\nwhile n > 0:\n    print(n % 10)\n    n //= 10\n",
      expectedOutput: "5", explanation: "12345%10=5, 1234%10=4, 123%10=3, 12%10=2, 1%10=1." },
    { name: "Puterea lui 2", difficulty: "medium", language: "python",
      question: "Afișează toate puterile lui 2 mai mici decât 1000 (1, 2, 4, 8, ..., 512).",
      starterCode: "p = 1\nwhile p < 1000:\n    print(p)\n    p *= 2\n",
      expectedOutput: "1", explanation: "1, 2, 4, 8, 16, 32, 64, 128, 256, 512." },
  ],
  "for-range": [
    { name: "Suma 1..N", difficulty: "easy", language: "python",
      question: "Calculează suma numerelor de la 1 la 20 folosind for + range. Afișează rezultatul.",
      starterCode: "suma = 0\nfor i in range(1, 21):\n    suma += i\nprint(suma)\n",
      expectedOutput: "210", explanation: "1+2+...+20 = 210." },
    { name: "Tabelul înmulțirii", difficulty: "easy", language: "python",
      question: "Afișează tabelul înmulțirii cu 7 (7×1 până la 7×10), câte un rezultat pe rând.",
      starterCode: "for i in range(1, 11):\n    print(7 * i)\n",
      expectedOutput: "7", explanation: "7, 14, 21, ..., 70." },
    { name: "FizzBuzz 1..20", difficulty: "medium", language: "python",
      question: "Afișează FizzBuzz pentru numerele de la 1 la 20.",
      starterCode: "for i in range(1, 21):\n    if i % 3 == 0 and i % 5 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)\n",
      expectedOutput: "1", explanation: "FizzBuzz clasic." },
    { name: "Numere prime", difficulty: "hard", language: "python",
      question: "Afișează toate numerele prime de la 2 la 30.",
      starterCode: "for n in range(2, 31):\n    este_prim = True\n    for d in range(2, int(n**0.5) + 1):\n        if n % d == 0:\n            este_prim = False\n            break\n    if este_prim:\n        print(n)\n",
      expectedOutput: "2", explanation: "2, 3, 5, 7, 11, 13, 17, 19, 23, 29." },
  ],
  "functii-basic": [
    { name: "Funcție salut", difficulty: "easy", language: "python",
      question: "Definește funcția salut(nume) care returnează f'Buna ziua, {nume}!'. Afișează pentru 'Profesor'.",
      starterCode: "def salut(nume):\n    return f'Buna ziua, {nume}!'\n\nprint(salut('Profesor'))\n",
      expectedOutput: "Buna ziua, Profesor!", explanation: "f-string cu parametrul funcției." },
    { name: "Cel mai mare", difficulty: "easy", language: "python",
      question: "Definește maxim(a, b, c) care returnează maximul. Testează cu maxim(4, 9, 6).",
      starterCode: "def maxim(a, b, c):\n    return max(a, b, c)\n\nprint(maxim(4, 9, 6))\n",
      expectedOutput: "9", explanation: "max() built-in sau if-elif comparând." },
    { name: "Palindrom", difficulty: "medium", language: "python",
      question: "Definește este_palindrom(s) care returnează True dacă s e palindrom. Testează cu 'racecar' și 'python'.",
      starterCode: "def este_palindrom(s):\n    return s == s[::-1]\n\nprint(este_palindrom('racecar'))\nprint(este_palindrom('python'))\n",
      expectedOutput: "True", explanation: "s[::-1] inversează string-ul." },
    { name: "Factorial recursiv", difficulty: "hard", language: "python",
      question: "Definește factorial(n) recursiv. Testează cu factorial(6).",
      starterCode: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(6))\n",
      expectedOutput: "720", explanation: "6! = 720." },
  ],
  "liste-introducere": [
    { name: "Operații listă", difficulty: "easy", language: "python",
      question: "Pornind de la lista ['Ana', 'Ion', 'Maria'], adaugă 'Cristi' cu append(). Afișează lungimea și primul element.",
      starterCode: "lst = ['Ana', 'Ion', 'Maria']\nlst.append('Cristi')\nprint(len(lst))\nprint(lst[0])\n",
      expectedOutput: "4", explanation: "append() adaugă la final. len() → 4." },
    { name: "Suma listei", difficulty: "easy", language: "python",
      question: "Calculează suma elementelor din [3, 7, 2, 8, 5] folosind sum(). Afișează suma și media.",
      starterCode: "nums = [3, 7, 2, 8, 5]\nprint(sum(nums))\nprint(sum(nums) / len(nums))\n",
      expectedOutput: "25", explanation: "sum([3,7,2,8,5])=25, media=5.0." },
    { name: "Filtrare pari", difficulty: "medium", language: "python",
      question: "Din lista [1,2,3,4,5,6,7,8,9,10], creează o nouă listă cu numerele pare folosind list comprehension.",
      starterCode: "nums = list(range(1, 11))\npare = [n for n in nums if n % 2 == 0]\nprint(pare)\n",
      expectedOutput: "[2, 4, 6, 8, 10]", explanation: "List comprehension cu condiție." },
    { name: "Sortare și invers", difficulty: "medium", language: "python",
      question: "Sortează [5, 1, 8, 3, 9, 2] ascendent și descendent. Afișează ambele.",
      starterCode: "lst = [5, 1, 8, 3, 9, 2]\nprint(sorted(lst))\nprint(sorted(lst, reverse=True))\n",
      expectedOutput: "[1, 2, 3, 5, 8, 9]", explanation: "sorted() nu modifică original. reverse=True → descendent." },
  ],
  "dictionare": [
    { name: "Creare dicționar", difficulty: "easy", language: "python",
      question: "Creează un dicționar 'student' cu: nume='Elena', nota=9.5, clasa=12. Afișează nota și verifică dacă 'clasa' e cheie.",
      starterCode: "student = {'nume': 'Elena', 'nota': 9.5, 'clasa': 12}\nprint(student['nota'])\nprint('clasa' in student)\n",
      expectedOutput: "9.5", explanation: "Acces cu ['cheie']. 'in' verifică existența cheii." },
    { name: "Iterare dicționar", difficulty: "medium", language: "python",
      question: "Afișează toate cheile și valorile din {'a': 1, 'b': 2, 'c': 3} folosind .items().",
      starterCode: "d = {'a': 1, 'b': 2, 'c': 3}\nfor cheie, valoare in d.items():\n    print(f'{cheie}: {valoare}')\n",
      expectedOutput: "a: 1", explanation: ".items() returnează perechi (cheie, valoare)." },
    { name: "Frecvență caractere", difficulty: "hard", language: "python",
      question: "Numără frecvența fiecărui caracter din 'banana'. Afișează dicționarul.",
      starterCode: "s = 'banana'\nfreq = {}\nfor ch in s:\n    freq[ch] = freq.get(ch, 0) + 1\nprint(freq)\n",
      expectedOutput: "{'b': 1, 'a': 3, 'n': 2}", explanation: ".get(ch, 0) returnează 0 dacă cheia nu există." },
    { name: "Dict comprehension", difficulty: "medium", language: "python",
      question: "Creează un dicționar {număr: pătrat} pentru numerele 1-5 folosind dict comprehension.",
      starterCode: "patrate = {n: n**2 for n in range(1, 6)}\nprint(patrate)\n",
      expectedOutput: "{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}", explanation: "Dict comprehension: {k: v for k, v in ...}" },
  ],
  "string-uri": [
    { name: "Metode string", difficulty: "easy", language: "python",
      question: "Din ' Buna ziua! ', elimină spații cu strip(), pune uppercase, și afișează lungimea.",
      starterCode: "s = '  Buna ziua!  '\ntrimmed = s.strip()\nprint(trimmed.upper())\nprint(len(trimmed))\n",
      expectedOutput: "BUNA ZIUA!", explanation: ".strip() elimină spații, .upper() pune majuscule." },
    { name: "Split și join", difficulty: "medium", language: "python",
      question: "Împarte 'Ana,Ion,Maria' cu split(','), sortează, și reunește cu ' | '. Afișează.",
      starterCode: "s = 'Ana,Ion,Maria'\nparts = s.split(',')\nparts.sort()\nprint(' | '.join(parts))\n",
      expectedOutput: "Ana | Ion | Maria", explanation: ".split(','), .sort(), ' | '.join(list)." },
    { name: "f-string formatare", difficulty: "easy", language: "python",
      question: "Afișează: 'Produs: Laptop, Pret: 3500.00 lei, Stoc: 10 buc' folosind f-string.",
      starterCode: "produs = 'Laptop'\npret = 3500\nstoc = 10\nprint(f'Produs: {produs}, Pret: {pret:.2f} lei, Stoc: {stoc} buc')\n",
      expectedOutput: "Produs: Laptop, Pret: 3500.00 lei, Stoc: 10 buc", explanation: "f'{val:.2f}' formatează cu 2 zecimale." },
    { name: "Inversare string", difficulty: "medium", language: "python",
      question: "Inversează string-ul 'programare' folosind slicing [::-1]. Afișează și verifică dacă e palindrom.",
      starterCode: "s = 'programare'\ninvers = s[::-1]\nprint(invers)\nprint(s == invers)\n",
      expectedOutput: "eramaorgorp", explanation: "[::-1] inversează string-ul. 'programare' nu e palindrom." },
  ],
};

async function main() {
  console.log("Adăugare coding tasks Python...");
  let added = 0, skipped = 0;

  for (const [slug, tasks] of Object.entries(CODING_TASKS)) {
    const lesson = await prisma.lesson.findFirst({ where: { slug } });
    if (!lesson) { console.log(`  [skip] ${slug} negăsit`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: "coding" } });
    if (existing >= 3) { console.log(`  [skip] ${slug} — are deja ${existing} coding tasks`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: "desc" } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const t of tasks) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id, number: n++,
          name: t.name, question: t.question,
          options: [], answer: "",
          explanation: t.explanation || "",
          difficulty: t.difficulty || "easy",
          type: "coding", language: t.language || "python",
          starterCode: t.starterCode || "",
          expectedOutput: t.expectedOutput || "",
        },
      });
      added++;
    }
    console.log(`  [ok] ${slug} — ${tasks.length} tasks adăugate`);
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
