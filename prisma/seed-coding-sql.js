const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    lessonSlug: "sql-introducere-select",
    items: [
      {
        question: "Scrie o interogare SQL pentru a selecta coloanele `name`, `email`, și `created_at` din tabela `users`. Filtrează doar userii cu `active = 1`, ordonați descrescător după `created_at`, și limitează la 10 rezultate.",
        starterCode: "-- Selectează coloanele specifice din tabela users\n-- Filtrează useri activi, sortat după dată (cel mai nou primul), limitat la 10\nSELECT\n  \nFROM users\nWHERE\n  \nORDER BY\n  \nLIMIT 10;",
        explanation: "SELECT name, email, created_at FROM users WHERE active = 1 ORDER BY created_at DESC LIMIT 10;",
        type: "coding", language: "sql",
      },
      {
        question: "Scrie o interogare SQL pentru tabela `products` cu coloanele: `id`, `name`, `price`, `category`. Selectează toate produsele din categoria 'Electronics' cu prețul între 100 și 1000, ordonate după preț crescător.",
        starterCode: "-- Selectează produse din Electronics cu preț între 100-1000\nSELECT *\nFROM products\nWHERE\n  -- categoria este Electronics\n  -- și prețul este în intervalul 100-1000\nORDER BY price;",
        explanation: "SELECT * FROM products WHERE category = 'Electronics' AND price BETWEEN 100 AND 1000 ORDER BY price ASC;",
        type: "coding", language: "sql",
      },
      {
        question: "Scrie o interogare SQL care selectează din tabela `orders` coloanele `id`, `customer_id`, `total`, și calculează un câmp nou `discount` ca 10% din `total`. Filtrează comenzile cu `total > 500` și statusul 'completed'.",
        starterCode: "-- Selectează comenzile completate cu total > 500\n-- Calculează discount-ul de 10%\nSELECT\n  id,\n  customer_id,\n  total,\n  -- calculează discount ca 10% din total\nFROM orders\nWHERE\n  -- total mai mare de 500 și status 'completed';",
        explanation: "SELECT id, customer_id, total, total * 0.10 AS discount FROM orders WHERE total > 500 AND status = 'completed';",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-where-avansat",
    items: [
      {
        question: "Scrie o interogare SQL pentru tabela `employees` (coloane: id, name, department, salary, hire_date). Selectează angajații care lucrează în departamentele 'IT' sau 'Engineering' SAU au salariul mai mare de 5000, și au fost angajați după '2020-01-01'.",
        starterCode: "-- Filtrare complexă cu OR și AND\nSELECT *\nFROM employees\nWHERE\n  -- (departament IT sau Engineering SAU salar > 5000)\n  -- ȘI angajat după 2020\n  ;",
        explanation: "SELECT * FROM employees WHERE (department IN ('IT', 'Engineering') OR salary > 5000) AND hire_date > '2020-01-01';",
        type: "coding", language: "sql",
      },
      {
        question: "Scrie o interogare SQL care selectează din `users` toți userii al căror `email` se termină cu '@gmail.com' sau conține cuvântul 'admin'. Folosește operatorul LIKE.",
        starterCode: "-- Caută useri cu email Gmail sau care conțin 'admin'\nSELECT id, name, email\nFROM users\nWHERE\n  -- email se termină cu @gmail.com\n  -- SAU email conține 'admin'\n  ;",
        explanation: "SELECT id, name, email FROM users WHERE email LIKE '%@gmail.com' OR email LIKE '%admin%';",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-aggregate-groupby",
    items: [
      {
        question: "Scrie o interogare SQL pentru tabela `orders` (coloane: id, customer_id, product_id, quantity, total, status). Calculează: numărul total de comenzi, suma totală a vânzărilor, media per comandă, și comenzile maxime/minime — grupate pe `status`.",
        starterCode: "-- Statistici agregate grupate pe status\nSELECT\n  status,\n  -- număr comenzi\n  -- sumă totală\n  -- medie per comandă\n  -- valoare maximă\n  -- valoare minimă\nFROM orders\nGROUP BY status\nORDER BY total_sum DESC;",
        explanation: "SELECT status, COUNT(*) AS num_orders, SUM(total) AS total_sum, AVG(total) AS avg_order, MAX(total) AS max_order, MIN(total) AS min_order FROM orders GROUP BY status ORDER BY total_sum DESC;",
        type: "coding", language: "sql",
      },
      {
        question: "Scrie o interogare SQL pentru tabela `products` (coloane: id, name, category, price, stock). Găsește categoriile cu mai mult de 5 produse în stoc (stock > 0) și prețul mediu al produselor din acea categorie mai mare de 100. Afișează categoria și prețul mediu, sortat descrescător.",
        starterCode: "-- Categorii cu >5 produse și preț mediu >100\nSELECT\n  category,\n  -- prețul mediu\n  -- numărul de produse\nFROM products\nWHERE stock > 0\nGROUP BY category\nHAVING\n  -- mai mult de 5 produse\n  -- și prețul mediu > 100\nORDER BY avg_price DESC;",
        explanation: "SELECT category, AVG(price) AS avg_price, COUNT(*) AS product_count FROM products WHERE stock > 0 GROUP BY category HAVING COUNT(*) > 5 AND AVG(price) > 100 ORDER BY avg_price DESC;",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-joins",
    items: [
      {
        question: "Scrie un JOIN SQL între tabelele `orders` (id, customer_id, total, status) și `customers` (id, name, email, city). Selectează numele clientului, email-ul, totalul comenzii și statusul, DOAR pentru comenzile cu status 'completed'. Sortează după total descrescător.",
        starterCode: "-- JOIN între orders și customers\nSELECT\n  -- numele clientului\n  -- email-ul clientului\n  -- totalul comenzii\n  -- statusul comenzii\nFROM orders\n  -- JOIN cu customers\nWHERE orders.status = 'completed'\nORDER BY orders.total DESC;",
        explanation: "SELECT c.name, c.email, o.total, o.status FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.status = 'completed' ORDER BY o.total DESC;",
        type: "coding", language: "sql",
      },
      {
        question: "Scrie o interogare cu LEFT JOIN între `employees` (id, name, department_id) și `departments` (id, name, manager). Afișează toți angajații cu numele departamentului lor — inclusiv angajații fără departament (NULL). Adaugă coalesce pentru a afișa 'Fără departament' în loc de NULL.",
        starterCode: "-- LEFT JOIN pentru a include angajații fără departament\nSELECT\n  employees.name AS employee_name,\n  -- numele departamentului sau 'Fără departament' dacă NULL\nFROM employees\n  -- LEFT JOIN cu departments\nORDER BY employees.name;",
        explanation: "SELECT employees.name AS employee_name, COALESCE(departments.name, 'Fără departament') AS department FROM employees LEFT JOIN departments ON employees.department_id = departments.id ORDER BY employees.name;",
        type: "coding", language: "sql",
      },
      {
        question: "Scrie o interogare SQL cu JOIN pe 3 tabele: `orders` (id, customer_id, product_id, quantity), `customers` (id, name), `products` (id, name, price). Calculează valoarea totală per comandă (quantity * price), afișând: numele clientului, produsul, cantitatea, prețul unitar, și totalul. Sortează după total descrescător.",
        starterCode: "-- JOIN pe 3 tabele cu calcul\nSELECT\n  -- numele clientului\n  -- numele produsului\n  -- cantitatea\n  -- prețul unitar\n  -- totalul calculat\nFROM orders\n  -- JOIN cu customers\n  -- JOIN cu products\nORDER BY total DESC;",
        explanation: "SELECT c.name AS customer, p.name AS product, o.quantity, p.price, (o.quantity * p.price) AS total FROM orders o JOIN customers c ON o.customer_id = c.id JOIN products p ON o.product_id = p.id ORDER BY total DESC;",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-insert-update-delete",
    items: [
      {
        question: "Scrie comenzi SQL pentru a: (1) Insera un user nou cu name='Ana Pop', email='ana@test.com', active=1, created_at=NOW(). (2) Actualiza emailul userului cu id=5 la 'nou@email.com'. (3) Șterge toți userii inactivi (active=0) care nu s-au logat de mai mult de 1 an (last_login < DATE_SUB(NOW(), INTERVAL 1 YEAR)).",
        starterCode: "-- 1. Inserează user nou\nINSERT INTO users (name, email, active, created_at)\nVALUES (/* ... */);\n\n-- 2. Actualizează emailul pentru user cu id=5\nUPDATE users\nSET email = /* ... */\nWHERE id = 5;\n\n-- 3. Șterge userii inactivi vechi\nDELETE FROM users\nWHERE /* ... */;",
        explanation: "INSERT INTO users (name, email, active, created_at) VALUES ('Ana Pop', 'ana@test.com', 1, NOW()); UPDATE users SET email = 'nou@email.com' WHERE id = 5; DELETE FROM users WHERE active = 0 AND last_login < DATE_SUB(NOW(), INTERVAL 1 YEAR);",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-create-table",
    items: [
      {
        question: "Creează tabela SQL `blog_posts` cu coloanele: `id` (INT, primary key, auto-increment), `title` (VARCHAR 255, not null), `content` (TEXT), `author_id` (INT, foreign key referencing users.id), `published` (BOOLEAN, default false), `created_at` (DATETIME, default CURRENT_TIMESTAMP), `views` (INT, default 0).",
        starterCode: "-- Creează tabela blog_posts\nCREATE TABLE blog_posts (\n  -- definește coloanele cu tipuri și constrângeri\n  \n);",
        explanation: "CREATE TABLE blog_posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT, author_id INT, published BOOLEAN DEFAULT FALSE, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, views INT DEFAULT 0, FOREIGN KEY (author_id) REFERENCES users(id));",
        type: "coding", language: "sql",
      },
      {
        question: "Creează tabela `order_items` pentru un sistem de e-commerce cu: `id` (PK, auto-increment), `order_id` (FK → orders.id), `product_id` (FK → products.id), `quantity` (INT, not null, default 1), `unit_price` (DECIMAL(10,2), not null), `discount_percent` (DECIMAL(5,2), default 0). Adaugă un index pe `order_id`.",
        starterCode: "-- Creează tabela order_items\nCREATE TABLE order_items (\n  \n);\n\n-- Adaugă index pe order_id\nCREATE INDEX idx_order_items_order_id ON order_items(order_id);",
        explanation: "CREATE TABLE order_items (id INT AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL DEFAULT 1, unit_price DECIMAL(10,2) NOT NULL, discount_percent DECIMAL(5,2) DEFAULT 0, FOREIGN KEY (order_id) REFERENCES orders(id), FOREIGN KEY (product_id) REFERENCES products(id)); CREATE INDEX idx_order_items_order_id ON order_items(order_id);",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-subqueries",
    items: [
      {
        question: "Scrie o interogare SQL cu subquery pentru a găsi toți userii care au plasat cel puțin o comandă cu valoarea mai mare decât media tuturor comenzilor. Afișează: id, name, email al userilor.",
        starterCode: "-- Useri care au comandat mai mult decât media\nSELECT id, name, email\nFROM users\nWHERE id IN (\n  -- subquery: customer_id-urile cu total > media\n  SELECT customer_id\n  FROM orders\n  WHERE total > (\n    -- subquery nested: media totalurilor\n    \n  )\n);",
        explanation: "SELECT id, name, email FROM users WHERE id IN (SELECT customer_id FROM orders WHERE total > (SELECT AVG(total) FROM orders));",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-window-functions",
    items: [
      {
        question: "Scrie o interogare SQL cu window functions pentru tabela `employees` (id, name, department, salary). Calculează pentru fiecare angajat: salariul lor, media salariului din departamentul lor, rangul lor în departament după salariu (cel mai mare = 1), și diferența față de media departamentului.",
        starterCode: "-- Window functions pentru statistici per departament\nSELECT\n  name,\n  department,\n  salary,\n  -- media salariilor din departament (PARTITION BY department)\n  -- rangul în departament după salariu\n  -- diferența față de medie\nFROM employees\nORDER BY department, salary DESC;",
        explanation: "SELECT name, department, salary, AVG(salary) OVER (PARTITION BY department) AS dept_avg, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank, salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg FROM employees ORDER BY department, salary DESC;",
        type: "coding", language: "sql",
      },
    ],
  },
  {
    lessonSlug: "sql-cte",
    items: [
      {
        question: "Scrie o interogare SQL cu CTE (Common Table Expression) pentru a calcula: (1) vânzările totale per client în ultimele 30 de zile (CTE `recent_orders`), (2) din aceste CTE, selectează clienții cu vânzări totale > 1000, afișând și numărul lor de comenzi.",
        starterCode: "-- CTE pentru vânzări recente per client\nWITH recent_orders AS (\n  -- selectează comenzile din ultimele 30 de zile\n  -- grupate pe customer_id cu suma și numărul\n  SELECT\n    customer_id,\n    SUM(total) AS total_spent,\n    COUNT(*) AS order_count\n  FROM orders\n  WHERE created_at >= /* ... */\n  GROUP BY customer_id\n)\nSELECT\n  c.name,\n  ro.total_spent,\n  ro.order_count\nFROM recent_orders ro\nJOIN customers c ON ro.customer_id = c.id\nWHERE ro.total_spent > 1000\nORDER BY ro.total_spent DESC;",
        explanation: "WITH recent_orders AS (SELECT customer_id, SUM(total) AS total_spent, COUNT(*) AS order_count FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY customer_id) SELECT c.name, ro.total_spent, ro.order_count FROM recent_orders ro JOIN customers c ON ro.customer_id = c.id WHERE ro.total_spent > 1000 ORDER BY ro.total_spent DESC;",
        type: "coding", language: "sql",
      },
    ],
  },
];

async function main() {
  console.log('Adăugare coding tasks SQL...');
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
