const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'python-modules-packages',
    name: 'Crează un modul Python',
    question: 'Scrie un modul Python numit `mathutils` cu o funcție `circle_area(r)` care returnează aria unui cerc. Importă și folosește-l.',
    language: 'python',
    starterCode: `import math\n\ndef circle_area(r):\n    # completează\n    pass\n\nprint(circle_area(5))`,
    expectedOutput: '78.53981633974483',
  },
  {
    slug: 'python-virtual-env',
    name: 'Gestionare dependențe cu pip',
    question: 'Scrie un script care importă modulul `json` (built-in) și serializează un dicționar cu 3 chei într-un string JSON formatat (indent=2).',
    language: 'python',
    starterCode: `import json\n\ndata = {"name": "Alice", "age": 30, "city": "Cluj"}\n# serializează cu indent=2\nresult = \nprint(result)`,
    expectedOutput: '{\n  "name": "Alice",\n  "age": 30,\n  "city": "Cluj"\n}',
  },
  {
    slug: 'python-debugging',
    name: 'Debugging cu assert',
    question: 'Scrie o funcție `safe_divide(a, b)` care ridică `ValueError` cu mesajul "Division by zero" dacă b=0, altfel returnează a/b.',
    language: 'python',
    starterCode: `def safe_divide(a, b):\n    # adaugă validare\n    return a / b\n\ntry:\n    print(safe_divide(10, 2))\n    print(safe_divide(5, 0))\nexcept ValueError as e:\n    print(e)`,
    expectedOutput: '5.0\nDivision by zero',
  },
  {
    slug: 'python-matplotlib-seaborn',
    name: 'Statistici cu date',
    question: 'Fără matplotlib, calculează media, minimul și maximul unei liste de valori numerice și afișează-le formatat.',
    language: 'python',
    starterCode: `values = [23, 45, 12, 67, 34, 89, 11, 56]\n\nmean = sum(values) / len(values)\nmin_val = \nmax_val = \n\nprint(f"Media: {mean:.1f}")\nprint(f"Min: {min_val}")\nprint(f"Max: {max_val}")`,
    expectedOutput: 'Media: 42.1\nMin: 11\nMax: 89',
  },
  {
    slug: 'python-sqlalchemy',
    name: 'Simulare ORM simplu',
    question: 'Creează o clasă `User` cu atributele `id`, `name`, `email`. Instanțiază 2 useri și afișează-i în format "ID: {id} | {name} <{email}>".',
    language: 'python',
    starterCode: `class User:\n    def __init__(self, id, name, email):\n        # completează\n        pass\n    \n    def __str__(self):\n        return f"ID: {self.id} | {self.name} <{self.email}>"\n\nu1 = User(1, "Alice", "alice@ex.com")\nu2 = User(2, "Bob", "bob@ex.com")\nprint(u1)\nprint(u2)`,
    expectedOutput: 'ID: 1 | Alice <alice@ex.com>\nID: 2 | Bob <bob@ex.com>',
  },
  {
    slug: 'python-docker',
    name: 'Environment variables în Python',
    question: 'Scrie cod Python care citește variabila de mediu `APP_ENV` folosind `os.environ.get()` cu default "development" și afișează "Running in: {env}".',
    language: 'python',
    starterCode: `import os\n\nenv = os.environ.get("APP_ENV", "development")\nprint(f"Running in: {env}")`,
    expectedOutput: 'Running in: development',
  },
  {
    slug: 'python-cli-click-rich',
    name: 'CLI simplu cu argparse',
    question: 'Scrie o funcție `greet(name, loud=False)` care returnează "HELLO, {NAME}!" dacă loud=True, altfel "Hello, {name}!". Testează cu ambele cazuri.',
    language: 'python',
    starterCode: `def greet(name, loud=False):\n    # implementează\n    pass\n\nprint(greet("Alice"))\nprint(greet("Bob", loud=True))`,
    expectedOutput: 'Hello, Alice!\nHELLO, BOB!',
  },
];

async function main() {
  console.log('Adăugare coding tasks Python (remaining)...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
