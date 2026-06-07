"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // ─── 2. WHERE avansat — filtrare complexă ────────────────────────────────
  {
    lessonId: "6a081fdced4ef595fd66ee58",
    name: "2. WHERE avansat — filtrare complexă",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrează produsele cu prețul între 10 și 50.\n```sql\nSELECT * FROM produse\nWHERE pret ___ 10 AND 50;\n```",
        options: [], answer: "BETWEEN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Caută clienți al căror nume începe cu 'A'.\n```sql\nSELECT * FROM clienti\nWHERE nume ___ 'A%';\n```",
        options: [], answer: "LIKE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrează comenzile din categoriile 1, 3 sau 5.\n```sql\nSELECT * FROM comenzi\nWHERE categorie_id ___ (1, 3, 5);\n```",
        options: [], answer: "IN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Combină 2 condiții — produse active cu stoc > 0.\n```sql\nSELECT * FROM produse\nWHERE activ = 1 ___ stoc > 0;\n```",
        options: [], answer: "AND",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează înregistrările unde câmpul email este necompletat.\n```sql\nSELECT * FROM utilizatori\nWHERE email IS ___;\n```",
        options: [], answer: "NULL",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a selecta toți angajații cu salariul între 3000 și 7000.",
        starterCode: "SELECT * FROM angajati\nWHERE salariu BETWEEN 3000 AND 7000;",
        language: "sql", expectedOutput: "SELECT * FROM angajati\nWHERE salariu BETWEEN 3000 AND 7000;",
        options: [], answer: "SELECT * FROM angajati\nWHERE salariu BETWEEN 3000 AND 7000;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a găsi toate produsele al căror nume conține 'laptop' (case-insensitive).",
        starterCode: "SELECT * FROM produse\nWHERE LOWER(nume) LIKE '%laptop%';",
        language: "sql", expectedOutput: "SELECT * FROM produse\nWHERE LOWER(nume) LIKE '%laptop%';",
        options: [], answer: "SELECT * FROM produse\nWHERE LOWER(nume) LIKE '%laptop%';"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a selecta utilizatorii din orașele 'Cluj', 'Iasi' sau 'Timisoara'.",
        starterCode: "SELECT * FROM utilizatori\nWHERE oras IN ('Cluj', 'Iasi', 'Timisoara');",
        language: "sql", expectedOutput: "SELECT * FROM utilizatori\nWHERE oras IN ('Cluj', 'Iasi', 'Timisoara');",
        options: [], answer: "SELECT * FROM utilizatori\nWHERE oras IN ('Cluj', 'Iasi', 'Timisoara');"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru produsele active (activ=1) SAU cu stoc mai mare de 100.",
        starterCode: "SELECT * FROM produse\nWHERE activ = 1 OR stoc > 100;",
        language: "sql", expectedOutput: "SELECT * FROM produse\nWHERE activ = 1 OR stoc > 100;",
        options: [], answer: "SELECT * FROM produse\nWHERE activ = 1 OR stoc > 100;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a găsi comenzile create în 2024 (YEAR(data_comanda) = 2024).",
        starterCode: "SELECT * FROM comenzi\nWHERE YEAR(data_comanda) = 2024;",
        language: "sql", expectedOutput: "SELECT * FROM comenzi\nWHERE YEAR(data_comanda) = 2024;",
        options: [], answer: "SELECT * FROM comenzi\nWHERE YEAR(data_comanda) = 2024;"
      }
    ]
  },
  // ─── 4. Funcții agregate + GROUP BY ──────────────────────────────────────
  {
    lessonId: "6a081fe2ed4ef595fd66ee7f",
    name: "4. Funcții agregate + GROUP BY",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Numără înregistrările dintr-un tabel.\n```sql\nSELECT ___(*)  FROM comenzi;\n```",
        options: [], answer: "COUNT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Calculează suma totalului comenzilor.\n```sql\nSELECT ___(total) FROM comenzi;\n```",
        options: [], answer: "SUM",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrează grupurile cu mai mult de 5 înregistrări.\n```sql\nSELECT departament, COUNT(*) AS nr\nFROM angajati\nGROUP BY departament\n___ COUNT(*) > 5;\n```",
        options: [], answer: "HAVING",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Calculează media salariilor pe departament.\n```sql\nSELECT departament, ___(salariu)\nFROM angajati\nGROUP BY departament;\n```",
        options: [], answer: "AVG",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Returnează valoarea maximă din coloana salariu.\n```sql\nSELECT ___(salariu) FROM angajati;\n```",
        options: [], answer: "MAX",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a număra comenzile per client.",
        starterCode: "SELECT client_id, COUNT(*) AS nr_comenzi\nFROM comenzi\nGROUP BY client_id;",
        language: "sql", expectedOutput: "SELECT client_id, COUNT(*) AS nr_comenzi\nFROM comenzi\nGROUP BY client_id;",
        options: [], answer: "SELECT client_id, COUNT(*) AS nr_comenzi\nFROM comenzi\nGROUP BY client_id;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a afișa departamentele cu salariu mediu mai mare de 5000.",
        starterCode: "SELECT departament, AVG(salariu) AS salariu_mediu\nFROM angajati\nGROUP BY departament\nHAVING AVG(salariu) > 5000;",
        language: "sql", expectedOutput: "SELECT departament, AVG(salariu) AS salariu_mediu\nFROM angajati\nGROUP BY departament\nHAVING AVG(salariu) > 5000;",
        options: [], answer: "SELECT departament, AVG(salariu) AS salariu_mediu\nFROM angajati\nGROUP BY departament\nHAVING AVG(salariu) > 5000;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru suma totală a vânzărilor per produs.",
        starterCode: "SELECT produs_id, SUM(cantitate * pret) AS total\nFROM vanzari\nGROUP BY produs_id;",
        language: "sql", expectedOutput: "SELECT produs_id, SUM(cantitate * pret) AS total\nFROM vanzari\nGROUP BY produs_id;",
        options: [], answer: "SELECT produs_id, SUM(cantitate * pret) AS total\nFROM vanzari\nGROUP BY produs_id;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a găsi salariul minim și maxim din fiecare departament.",
        starterCode: "SELECT departament, MIN(salariu) AS min_sal, MAX(salariu) AS max_sal\nFROM angajati\nGROUP BY departament;",
        language: "sql", expectedOutput: "SELECT departament, MIN(salariu) AS min_sal, MAX(salariu) AS max_sal\nFROM angajati\nGROUP BY departament;",
        options: [], answer: "SELECT departament, MIN(salariu) AS min_sal, MAX(salariu) AS max_sal\nFROM angajati\nGROUP BY departament;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a număra câți angajați distincti au plasat cel puțin 3 comenzi.",
        starterCode: "SELECT client_id, COUNT(*) AS nr\nFROM comenzi\nGROUP BY client_id\nHAVING COUNT(*) >= 3;",
        language: "sql", expectedOutput: "SELECT client_id, COUNT(*) AS nr\nFROM comenzi\nGROUP BY client_id\nHAVING COUNT(*) >= 3;",
        options: [], answer: "SELECT client_id, COUNT(*) AS nr\nFROM comenzi\nGROUP BY client_id\nHAVING COUNT(*) >= 3;"
      }
    ]
  },
  // ─── 6. Subquery-uri + CTE ───────────────────────────────────────────────
  {
    lessonId: "6a081fe8ed4ef595fd66eea6",
    name: "6. Subquery-uri + CTE",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Subquery în clauza WHERE.\n```sql\nSELECT * FROM produse\nWHERE pret > (SELECT ___(pret) FROM produse);\n```",
        options: [], answer: "AVG",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: CTE definit cu WITH.\n```sql\n___ comenzi_mari AS (\n  SELECT * FROM comenzi WHERE total > 1000\n)\nSELECT * FROM comenzi_mari;\n```",
        options: [], answer: "WITH",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Subquery cu EXISTS — verifică dacă există comenzi pentru client.\n```sql\nSELECT * FROM clienti c\nWHERE ___ (SELECT 1 FROM comenzi WHERE client_id = c.id);\n```",
        options: [], answer: "EXISTS",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Subquery corelat în SELECT.\n```sql\nSELECT nume,\n  (SELECT COUNT(*) FROM comenzi WHERE client_id = c.id) AS nr_comenzi\nFROM clienti ___;\n```",
        options: [], answer: "c",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: CTE recursiv pentru ierarhie.\n```sql\nWITH ___ cte AS (\n  SELECT id, manager_id, 1 AS nivel FROM angajati WHERE manager_id IS NULL\n  UNION ALL\n  SELECT a.id, a.manager_id, c.nivel + 1\n  FROM angajati a JOIN cte c ON a.manager_id = c.id\n)\nSELECT * FROM cte;\n```",
        options: [], answer: "RECURSIVE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea cu subquery pentru a găsi produsele cu prețul mai mare decât media.",
        starterCode: "SELECT * FROM produse\nWHERE pret > (SELECT AVG(pret) FROM produse);",
        language: "sql", expectedOutput: "SELECT * FROM produse\nWHERE pret > (SELECT AVG(pret) FROM produse);",
        options: [], answer: "SELECT * FROM produse\nWHERE pret > (SELECT AVG(pret) FROM produse);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie un CTE care extrage comenzile din 2024 și le folosește pentru a număra per client.",
        starterCode: "WITH comenzi_2024 AS (\n  SELECT * FROM comenzi WHERE YEAR(data) = 2024\n)\nSELECT client_id, COUNT(*) AS nr\nFROM comenzi_2024\nGROUP BY client_id;",
        language: "sql", expectedOutput: "WITH comenzi_2024 AS (\n  SELECT * FROM comenzi WHERE YEAR(data) = 2024\n)\nSELECT client_id, COUNT(*) AS nr\nFROM comenzi_2024\nGROUP BY client_id;",
        options: [], answer: "WITH comenzi_2024 AS (\n  SELECT * FROM comenzi WHERE YEAR(data) = 2024\n)\nSELECT client_id, COUNT(*) AS nr\nFROM comenzi_2024\nGROUP BY client_id;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea cu NOT EXISTS pentru a găsi clienții fără nicio comandă.",
        starterCode: "SELECT * FROM clienti c\nWHERE NOT EXISTS (\n  SELECT 1 FROM comenzi WHERE client_id = c.id\n);",
        language: "sql", expectedOutput: "SELECT * FROM clienti c\nWHERE NOT EXISTS (\n  SELECT 1 FROM comenzi WHERE client_id = c.id\n);",
        options: [], answer: "SELECT * FROM clienti c\nWHERE NOT EXISTS (\n  SELECT 1 FROM comenzi WHERE client_id = c.id\n);"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea cu subquery pentru top 5 produse după vânzări.",
        starterCode: "SELECT * FROM produse\nWHERE id IN (\n  SELECT produs_id FROM vanzari\n  GROUP BY produs_id\n  ORDER BY SUM(cantitate) DESC\n  LIMIT 5\n);",
        language: "sql", expectedOutput: "SELECT * FROM produse\nWHERE id IN (\n  SELECT produs_id FROM vanzari\n  GROUP BY produs_id\n  ORDER BY SUM(cantitate) DESC\n  LIMIT 5\n);",
        options: [], answer: "SELECT * FROM produse\nWHERE id IN (\n  SELECT produs_id FROM vanzari\n  GROUP BY produs_id\n  ORDER BY SUM(cantitate) DESC\n  LIMIT 5\n);"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie un CTE cu 2 etape: prima extrage angajații seniori (> 5 ani), a doua calculează media salariilor lor.",
        starterCode: "WITH seniori AS (\n  SELECT * FROM angajati WHERE ani_experienta > 5\n)\nSELECT AVG(salariu) AS medie_seniori FROM seniori;",
        language: "sql", expectedOutput: "WITH seniori AS (\n  SELECT * FROM angajati WHERE ani_experienta > 5\n)\nSELECT AVG(salariu) AS medie_seniori FROM seniori;",
        options: [], answer: "WITH seniori AS (\n  SELECT * FROM angajati WHERE ani_experienta > 5\n)\nSELECT AVG(salariu) AS medie_seniori FROM seniori;"
      }
    ]
  },
  // ─── 7. CREATE TABLE și Design baze de date ──────────────────────────────
  {
    lessonId: "6a081febed4ef595fd66eeba",
    name: "7. CREATE TABLE și Design baze de date",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Definește cheia primară.\n```sql\nCREATE TABLE produse (\n  id INT ___ PRIMARY KEY,\n  nume VARCHAR(100)\n);\n```",
        options: [], answer: "AUTO_INCREMENT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Definește o cheie externă.\n```sql\nCREATE TABLE comenzi (\n  id INT PRIMARY KEY,\n  client_id INT,\n  ___ KEY (client_id) REFERENCES clienti(id)\n);\n```",
        options: [], answer: "FOREIGN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă constrângere UNIQUE pe email.\n```sql\nCREATE TABLE utilizatori (\n  id INT PRIMARY KEY,\n  email VARCHAR(255) ___\n);\n```",
        options: [], answer: "UNIQUE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Valoare implicită pentru o coloană.\n```sql\nCREATE TABLE produse (\n  stoc INT ___ 0\n);\n```",
        options: [], answer: "DEFAULT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Constrângere că valoarea nu poate fi NULL.\n```sql\nCREATE TABLE angajati (\n  nume VARCHAR(100) ___ NULL\n);\n```",
        options: [], answer: "NOT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea tabelul 'categorii' cu id (PK), nume NOT NULL și descriere.",
        starterCode: "CREATE TABLE categorii (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  descriere TEXT\n);",
        language: "sql", expectedOutput: "CREATE TABLE categorii (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  descriere TEXT\n);",
        options: [], answer: "CREATE TABLE categorii (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  descriere TEXT\n);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea tabelul 'produse' cu cheie externă spre 'categorii'.",
        starterCode: "CREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  categorie_id INT,\n  FOREIGN KEY (categorie_id) REFERENCES categorii(id)\n);",
        language: "sql", expectedOutput: "CREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  categorie_id INT,\n  FOREIGN KEY (categorie_id) REFERENCES categorii(id)\n);",
        options: [], answer: "CREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  categorie_id INT,\n  FOREIGN KEY (categorie_id) REFERENCES categorii(id)\n);"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea tabelul 'utilizatori' cu email UNIQUE și parola NOT NULL.",
        starterCode: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  parola VARCHAR(255) NOT NULL,\n  creat_la TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
        language: "sql", expectedOutput: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  parola VARCHAR(255) NOT NULL,\n  creat_la TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
        options: [], answer: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  parola VARCHAR(255) NOT NULL,\n  creat_la TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea tabelul de legătură 'produs_tag' pentru relație many-to-many.",
        starterCode: "CREATE TABLE produs_tag (\n  produs_id INT,\n  tag_id INT,\n  PRIMARY KEY (produs_id, tag_id),\n  FOREIGN KEY (produs_id) REFERENCES produse(id),\n  FOREIGN KEY (tag_id) REFERENCES taguri(id)\n);",
        language: "sql", expectedOutput: "CREATE TABLE produs_tag (\n  produs_id INT,\n  tag_id INT,\n  PRIMARY KEY (produs_id, tag_id),\n  FOREIGN KEY (produs_id) REFERENCES produse(id),\n  FOREIGN KEY (tag_id) REFERENCES taguri(id)\n);",
        options: [], answer: "CREATE TABLE produs_tag (\n  produs_id INT,\n  tag_id INT,\n  PRIMARY KEY (produs_id, tag_id),\n  FOREIGN KEY (produs_id) REFERENCES produse(id),\n  FOREIGN KEY (tag_id) REFERENCES taguri(id)\n);"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a adăuga ON DELETE CASCADE la o cheie externă existentă prin ALTER TABLE.",
        starterCode: "ALTER TABLE comenzi\n  DROP FOREIGN KEY fk_client,\n  ADD CONSTRAINT fk_client\n    FOREIGN KEY (client_id) REFERENCES clienti(id)\n    ON DELETE CASCADE;",
        language: "sql", expectedOutput: "ALTER TABLE comenzi\n  DROP FOREIGN KEY fk_client,\n  ADD CONSTRAINT fk_client\n    FOREIGN KEY (client_id) REFERENCES clienti(id)\n    ON DELETE CASCADE;",
        options: [], answer: "ALTER TABLE comenzi\n  DROP FOREIGN KEY fk_client,\n  ADD CONSTRAINT fk_client\n    FOREIGN KEY (client_id) REFERENCES clienti(id)\n    ON DELETE CASCADE;"
      }
    ]
  },
  // ─── 8. Optimizare + Întrebări clasice de interviu ───────────────────────
  {
    lessonId: "6a076bc66e9277ebc3a6110a",
    name: "8. Optimizare + Întrebări clasice de interviu",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un index pe coloana email.\n```sql\nCREATE ___ idx_email ON utilizatori(email);\n```",
        options: [], answer: "INDEX",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Analizează planul de execuție al unei interogări.\n```sql\n___ SELECT * FROM produse WHERE pret > 100;\n```",
        options: [], answer: "EXPLAIN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Prima formă normală (1NF) cere ca valorile să fie ___.\n```sql\n-- 1NF: fiecare coloana contine valori ___\n```",
        options: [], answer: "atomice",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Șterge un index existent.\n```sql\n___ INDEX idx_email ON utilizatori;\n```",
        options: [], answer: "DROP",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Comanda care arată informații despre structura unui tabel.\n```sql\n___ TABLE produse;\n```",
        options: [], answer: "DESCRIBE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea un index compus pe coloanele (client_id, data_comanda).",
        starterCode: "CREATE INDEX idx_client_data\nON comenzi(client_id, data_comanda);",
        language: "sql", expectedOutput: "CREATE INDEX idx_client_data\nON comenzi(client_id, data_comanda);",
        options: [], answer: "CREATE INDEX idx_client_data\nON comenzi(client_id, data_comanda);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie EXPLAIN pentru a analiza o interogare cu JOIN între comenzi și clienti.",
        starterCode: "EXPLAIN SELECT c.nume, COUNT(o.id) AS nr_comenzi\nFROM clienti c\nLEFT JOIN comenzi o ON c.id = o.client_id\nGROUP BY c.id;",
        language: "sql", expectedOutput: "EXPLAIN SELECT c.nume, COUNT(o.id) AS nr_comenzi\nFROM clienti c\nLEFT JOIN comenzi o ON c.id = o.client_id\nGROUP BY c.id;",
        options: [], answer: "EXPLAIN SELECT c.nume, COUNT(o.id) AS nr_comenzi\nFROM clienti c\nLEFT JOIN comenzi o ON c.id = o.client_id\nGROUP BY c.id;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a găsi înregistrările duplicate după email.",
        starterCode: "SELECT email, COUNT(*) AS nr\nFROM utilizatori\nGROUP BY email\nHAVING COUNT(*) > 1;",
        language: "sql", expectedOutput: "SELECT email, COUNT(*) AS nr\nFROM utilizatori\nGROUP BY email\nHAVING COUNT(*) > 1;",
        options: [], answer: "SELECT email, COUNT(*) AS nr\nFROM utilizatori\nGROUP BY email\nHAVING COUNT(*) > 1;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL clasică de interviu: al doilea cel mai mare salariu.",
        starterCode: "SELECT MAX(salariu) AS al_doilea_max\nFROM angajati\nWHERE salariu < (SELECT MAX(salariu) FROM angajati);",
        language: "sql", expectedOutput: "SELECT MAX(salariu) AS al_doilea_max\nFROM angajati\nWHERE salariu < (SELECT MAX(salariu) FROM angajati);",
        options: [], answer: "SELECT MAX(salariu) AS al_doilea_max\nFROM angajati\nWHERE salariu < (SELECT MAX(salariu) FROM angajati);"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a șterge un index și a-l recrea cu UNIQUE.",
        starterCode: "DROP INDEX idx_email ON utilizatori;\nCREATE UNIQUE INDEX idx_email ON utilizatori(email);",
        language: "sql", expectedOutput: "DROP INDEX idx_email ON utilizatori;\nCREATE UNIQUE INDEX idx_email ON utilizatori(email);",
        options: [], answer: "DROP INDEX idx_email ON utilizatori;\nCREATE UNIQUE INDEX idx_email ON utilizatori(email);"
      }
    ]
  },
  // ─── 10. Tranzacții și ACID ──────────────────────────────────────────────
  {
    lessonId: "6a08d070999573855635d26e",
    name: "10. Tranzacții și ACID",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Porneste o tranzacție.\n```sql\n___ TRANSACTION;\n```",
        options: [], answer: "BEGIN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Confirmă modificările tranzacției.\n```sql\nINSERT INTO conturi VALUES (1, 1000);\n___;\n```",
        options: [], answer: "COMMIT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Anulează modificările tranzacției.\n```sql\nBEGIN;\nUPDATE conturi SET sold = sold - 500 WHERE id = 1;\n___; -- anulam modificarile\n```",
        options: [], answer: "ROLLBACK",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Litera A din ACID înseamnă ___.\n```sql\n-- ACID: ___, Consistency, Isolation, Durability\n```",
        options: [], answer: "Atomicity",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un savepoint în tranzacție.\n```sql\nBEGIN;\nSAVEPOINT ___;\n```",
        options: [], answer: "sp1",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o tranzacție SQL pentru a transfera 500 lei din contul 1 în contul 2.",
        starterCode: "BEGIN TRANSACTION;\nUPDATE conturi SET sold = sold - 500 WHERE id = 1;\nUPDATE conturi SET sold = sold + 500 WHERE id = 2;\nCOMMIT;",
        language: "sql", expectedOutput: "BEGIN TRANSACTION;\nUPDATE conturi SET sold = sold - 500 WHERE id = 1;\nUPDATE conturi SET sold = sold + 500 WHERE id = 2;\nCOMMIT;",
        options: [], answer: "BEGIN TRANSACTION;\nUPDATE conturi SET sold = sold - 500 WHERE id = 1;\nUPDATE conturi SET sold = sold + 500 WHERE id = 2;\nCOMMIT;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o tranzacție cu ROLLBACK în caz de eroare.",
        starterCode: "BEGIN;\nUPDATE produse SET stoc = stoc - 1 WHERE id = 5;\nIF (SELECT stoc FROM produse WHERE id = 5) < 0 THEN\n  ROLLBACK;\nELSE\n  COMMIT;\nEND IF;",
        language: "sql", expectedOutput: "BEGIN;\nUPDATE produse SET stoc = stoc - 1 WHERE id = 5;\nIF (SELECT stoc FROM produse WHERE id = 5) < 0 THEN\n  ROLLBACK;\nELSE\n  COMMIT;\nEND IF;",
        options: [], answer: "BEGIN;\nUPDATE produse SET stoc = stoc - 1 WHERE id = 5;\nIF (SELECT stoc FROM produse WHERE id = 5) < 0 THEN\n  ROLLBACK;\nELSE\n  COMMIT;\nEND IF;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie proprietățile ACID ca interogare descriptivă.",
        starterCode: "SELECT 'Atomicity' AS proprietate, 'Tot sau nimic' AS descriere\nUNION ALL SELECT 'Consistency', 'Date valide'\nUNION ALL SELECT 'Isolation', 'Tranzactii independente'\nUNION ALL SELECT 'Durability', 'Date persistente';",
        language: "sql", expectedOutput: "SELECT 'Atomicity' AS proprietate, 'Tot sau nimic' AS descriere\nUNION ALL SELECT 'Consistency', 'Date valide'\nUNION ALL SELECT 'Isolation', 'Tranzactii independente'\nUNION ALL SELECT 'Durability', 'Date persistente';",
        options: [], answer: "SELECT 'Atomicity' AS proprietate, 'Tot sau nimic' AS descriere\nUNION ALL SELECT 'Consistency', 'Date valide'\nUNION ALL SELECT 'Isolation', 'Tranzactii independente'\nUNION ALL SELECT 'Durability', 'Date persistente';"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o tranzacție cu SAVEPOINT și ROLLBACK TO SAVEPOINT.",
        starterCode: "BEGIN;\nINSERT INTO log VALUES ('start');\nSAVEPOINT dupa_insert;\nUPDATE conturi SET sold = 0 WHERE id = 99;\nROLLBACK TO SAVEPOINT dupa_insert;\nCOMMIT;",
        language: "sql", expectedOutput: "BEGIN;\nINSERT INTO log VALUES ('start');\nSAVEPOINT dupa_insert;\nUPDATE conturi SET sold = 0 WHERE id = 99;\nROLLBACK TO SAVEPOINT dupa_insert;\nCOMMIT;",
        options: [], answer: "BEGIN;\nINSERT INTO log VALUES ('start');\nSAVEPOINT dupa_insert;\nUPDATE conturi SET sold = 0 WHERE id = 99;\nROLLBACK TO SAVEPOINT dupa_insert;\nCOMMIT;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a seta nivelul de izolare la SERIALIZABLE.",
        starterCode: "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nBEGIN;\nSELECT * FROM conturi WHERE id = 1;\nCOMMIT;",
        language: "sql", expectedOutput: "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nBEGIN;\nSELECT * FROM conturi WHERE id = 1;\nCOMMIT;",
        options: [], answer: "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nBEGIN;\nSELECT * FROM conturi WHERE id = 1;\nCOMMIT;"
      }
    ]
  },
  // ─── 11. Views — Vederi virtuale ─────────────────────────────────────────
  {
    lessonId: "6a08d073999573855635d282",
    name: "11. Views — Vederi virtuale",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează o vedere virtuală.\n```sql\nCREATE ___ v_comenzi_active AS\nSELECT * FROM comenzi WHERE status = 'activ';\n```",
        options: [], answer: "VIEW",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Actualizează o vedere existentă.\n```sql\nCREATE OR ___ VIEW v_clienti AS\nSELECT id, nume FROM clienti;\n```",
        options: [], answer: "REPLACE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Șterge o vedere.\n```sql\n___ VIEW v_comenzi_active;\n```",
        options: [], answer: "DROP",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Interogarea unei vederi este identică cu interogarea unui ___.\n```sql\nSELECT * FROM v_clienti_activi; -- ca un ___\n```",
        options: [], answer: "tabel",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Listeaza toate vederile din schema.\n```sql\nSHOW ___;\n```",
        options: [], answer: "FULL TABLES",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea o vedere cu angajații din departamentul IT.",
        starterCode: "CREATE VIEW v_angajati_it AS\nSELECT id, nume, salariu\nFROM angajati\nWHERE departament = 'IT';",
        language: "sql", expectedOutput: "CREATE VIEW v_angajati_it AS\nSELECT id, nume, salariu\nFROM angajati\nWHERE departament = 'IT';",
        options: [], answer: "CREATE VIEW v_angajati_it AS\nSELECT id, nume, salariu\nFROM angajati\nWHERE departament = 'IT';"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea o vedere cu JOIN între comenzi și clienti.",
        starterCode: "CREATE VIEW v_comenzi_clienti AS\nSELECT o.id, c.nume AS client, o.total, o.data\nFROM comenzi o\nJOIN clienti c ON o.client_id = c.id;",
        language: "sql", expectedOutput: "CREATE VIEW v_comenzi_clienti AS\nSELECT o.id, c.nume AS client, o.total, o.data\nFROM comenzi o\nJOIN clienti c ON o.client_id = c.id;",
        options: [], answer: "CREATE VIEW v_comenzi_clienti AS\nSELECT o.id, c.nume AS client, o.total, o.data\nFROM comenzi o\nJOIN clienti c ON o.client_id = c.id;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a interoga o vedere ca un tabel normal.",
        starterCode: "SELECT * FROM v_comenzi_clienti\nWHERE total > 500\nORDER BY data DESC;",
        language: "sql", expectedOutput: "SELECT * FROM v_comenzi_clienti\nWHERE total > 500\nORDER BY data DESC;",
        options: [], answer: "SELECT * FROM v_comenzi_clienti\nWHERE total > 500\nORDER BY data DESC;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea o vedere cu statistici per departament.",
        starterCode: "CREATE VIEW v_stats_departament AS\nSELECT departament,\n  COUNT(*) AS nr_angajati,\n  AVG(salariu) AS salariu_mediu\nFROM angajati\nGROUP BY departament;",
        language: "sql", expectedOutput: "CREATE VIEW v_stats_departament AS\nSELECT departament,\n  COUNT(*) AS nr_angajati,\n  AVG(salariu) AS salariu_mediu\nFROM angajati\nGROUP BY departament;",
        options: [], answer: "CREATE VIEW v_stats_departament AS\nSELECT departament,\n  COUNT(*) AS nr_angajati,\n  AVG(salariu) AS salariu_mediu\nFROM angajati\nGROUP BY departament;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a șterge și a recrea o vedere.",
        starterCode: "DROP VIEW IF EXISTS v_angajati_it;\nCREATE VIEW v_angajati_it AS\nSELECT id, nume FROM angajati WHERE departament = 'IT';",
        language: "sql", expectedOutput: "DROP VIEW IF EXISTS v_angajati_it;\nCREATE VIEW v_angajati_it AS\nSELECT id, nume FROM angajati WHERE departament = 'IT';",
        options: [], answer: "DROP VIEW IF EXISTS v_angajati_it;\nCREATE VIEW v_angajati_it AS\nSELECT id, nume FROM angajati WHERE departament = 'IT';"
      }
    ]
  },
  // ─── 12. DDL — CREATE, ALTER, DROP ───────────────────────────────────────
  {
    lessonId: "6a08d076999573855635d296",
    name: "12. DDL — CREATE, ALTER, DROP",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Adaugă o coloană nouă la un tabel existent.\n```sql\nALTER TABLE produse\n___ COLUMN descriere TEXT;\n```",
        options: [], answer: "ADD",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Modifică tipul de date al unei coloane.\n```sql\nALTER TABLE produse\n___ COLUMN pret DECIMAL(12,2);\n```",
        options: [], answer: "MODIFY",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Șterge un tabel și toate datele din el.\n```sql\n___ TABLE produse_vechi;\n```",
        options: [], answer: "DROP",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Redenumește o coloană.\n```sql\nALTER TABLE utilizatori\n___ COLUMN user_name TO username;\n```",
        options: [], answer: "RENAME",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Golește tabelul fără a-l șterge.\n```sql\n___ TABLE log_events;\n```",
        options: [], answer: "TRUNCATE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a adăuga coloanele 'telefon' și 'adresa' la tabelul clienti.",
        starterCode: "ALTER TABLE clienti\n  ADD COLUMN telefon VARCHAR(20),\n  ADD COLUMN adresa VARCHAR(255);",
        language: "sql", expectedOutput: "ALTER TABLE clienti\n  ADD COLUMN telefon VARCHAR(20),\n  ADD COLUMN adresa VARCHAR(255);",
        options: [], answer: "ALTER TABLE clienti\n  ADD COLUMN telefon VARCHAR(20),\n  ADD COLUMN adresa VARCHAR(255);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a renumi tabelul 'useri' în 'utilizatori'.",
        starterCode: "RENAME TABLE useri TO utilizatori;",
        language: "sql", expectedOutput: "RENAME TABLE useri TO utilizatori;",
        options: [], answer: "RENAME TABLE useri TO utilizatori;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a șterge coloana 'parola_veche' din tabelul utilizatori.",
        starterCode: "ALTER TABLE utilizatori\n  DROP COLUMN parola_veche;",
        language: "sql", expectedOutput: "ALTER TABLE utilizatori\n  DROP COLUMN parola_veche;",
        options: [], answer: "ALTER TABLE utilizatori\n  DROP COLUMN parola_veche;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a adăuga o constrângere CHECK că vârsta > 0.",
        starterCode: "ALTER TABLE angajati\n  ADD CONSTRAINT chk_varsta CHECK (varsta > 0);",
        language: "sql", expectedOutput: "ALTER TABLE angajati\n  ADD CONSTRAINT chk_varsta CHECK (varsta > 0);",
        options: [], answer: "ALTER TABLE angajati\n  ADD CONSTRAINT chk_varsta CHECK (varsta > 0);"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea un tabel doar dacă nu există deja.",
        starterCode: "CREATE TABLE IF NOT EXISTS setari (\n  cheie VARCHAR(100) PRIMARY KEY,\n  valoare TEXT\n);",
        language: "sql", expectedOutput: "CREATE TABLE IF NOT EXISTS setari (\n  cheie VARCHAR(100) PRIMARY KEY,\n  valoare TEXT\n);",
        options: [], answer: "CREATE TABLE IF NOT EXISTS setari (\n  cheie VARCHAR(100) PRIMARY KEY,\n  valoare TEXT\n);"
      }
    ]
  },
  // ─── 13. Window Functions ────────────────────────────────────────────────
  {
    lessonId: "6a076bc46e9277ebc3a610fb",
    name: "13. Window Functions",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Atribuie un număr de rând unic fiecare înregistrări.\n```sql\nSELECT nume, ROW_NUMBER() ___(ORDER BY salariu DESC) AS rang\nFROM angajati;\n```",
        options: [], answer: "OVER",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Calculează rang cu salturi pentru înregistrări egale.\n```sql\nSELECT nume, ___()\nOVER (ORDER BY salariu DESC) AS rang\nFROM angajati;\n```",
        options: [], answer: "RANK",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Împarte rezultatele în partiții.\n```sql\nSELECT departament, salariu,\n  RANK() OVER (___ BY departament ORDER BY salariu DESC) AS rang\nFROM angajati;\n```",
        options: [], answer: "PARTITION",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Calculează suma cumulativă.\n```sql\nSELECT data, total,\n  SUM(total) ___(ORDER BY data) AS total_cumulativ\nFROM vanzari;\n```",
        options: [], answer: "OVER",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: DENSE_RANK nu lasă goluri în rang.\n```sql\nSELECT nume,\n  ___()\nOVER (ORDER BY salariu DESC) AS rang\nFROM angajati;\n```",
        options: [], answer: "DENSE_RANK",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL cu ROW_NUMBER() pentru a numerota angajații în ordine descrescătoare a salariului.",
        starterCode: "SELECT\n  ROW_NUMBER() OVER (ORDER BY salariu DESC) AS nr,\n  nume,\n  salariu\nFROM angajati;",
        language: "sql", expectedOutput: "SELECT\n  ROW_NUMBER() OVER (ORDER BY salariu DESC) AS nr,\n  nume,\n  salariu\nFROM angajati;",
        options: [], answer: "SELECT\n  ROW_NUMBER() OVER (ORDER BY salariu DESC) AS nr,\n  nume,\n  salariu\nFROM angajati;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL cu RANK() OVER PARTITION BY departament pentru a ranga angajații per departament.",
        starterCode: "SELECT\n  departament,\n  nume,\n  salariu,\n  RANK() OVER (PARTITION BY departament ORDER BY salariu DESC) AS rang\nFROM angajati;",
        language: "sql", expectedOutput: "SELECT\n  departament,\n  nume,\n  salariu,\n  RANK() OVER (PARTITION BY departament ORDER BY salariu DESC) AS rang\nFROM angajati;",
        options: [], answer: "SELECT\n  departament,\n  nume,\n  salariu,\n  RANK() OVER (PARTITION BY departament ORDER BY salariu DESC) AS rang\nFROM angajati;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a calcula suma cumulativă a vânzărilor ordonate după dată.",
        starterCode: "SELECT\n  data,\n  total,\n  SUM(total) OVER (ORDER BY data) AS total_cumulativ\nFROM vanzari;",
        language: "sql", expectedOutput: "SELECT\n  data,\n  total,\n  SUM(total) OVER (ORDER BY data) AS total_cumulativ\nFROM vanzari;",
        options: [], answer: "SELECT\n  data,\n  total,\n  SUM(total) OVER (ORDER BY data) AS total_cumulativ\nFROM vanzari;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL cu LAG() pentru a compara salariul unui angajat cu cel al angajatului anterior.",
        starterCode: "SELECT\n  nume,\n  salariu,\n  LAG(salariu) OVER (ORDER BY salariu) AS salariu_anterior\nFROM angajati;",
        language: "sql", expectedOutput: "SELECT\n  nume,\n  salariu,\n  LAG(salariu) OVER (ORDER BY salariu) AS salariu_anterior\nFROM angajati;",
        options: [], answer: "SELECT\n  nume,\n  salariu,\n  LAG(salariu) OVER (ORDER BY salariu) AS salariu_anterior\nFROM angajati;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL cu NTILE(4) pentru a împărți angajații în 4 quartile după salariu.",
        starterCode: "SELECT\n  nume,\n  salariu,\n  NTILE(4) OVER (ORDER BY salariu) AS quartil\nFROM angajati;",
        language: "sql", expectedOutput: "SELECT\n  nume,\n  salariu,\n  NTILE(4) OVER (ORDER BY salariu) AS quartil\nFROM angajati;",
        options: [], answer: "SELECT\n  nume,\n  salariu,\n  NTILE(4) OVER (ORDER BY salariu) AS quartil\nFROM angajati;"
      }
    ]
  },
  // ─── 14. CTE — Common Table Expressions ─────────────────────────────────
  {
    lessonId: "6a08d07c999573855635d2bd",
    name: "14. CTE — Common Table Expressions",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Sintaxa de bază a unui CTE.\n```sql\n___ my_cte AS (\n  SELECT * FROM produse WHERE pret > 100\n)\nSELECT * FROM my_cte;\n```",
        options: [], answer: "WITH",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: CTE recursiv necesită keyword-ul ___.\n```sql\nWITH ___ cte AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM cte WHERE n < 10\n)\nSELECT * FROM cte;\n```",
        options: [], answer: "RECURSIVE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Mai multe CTE separate prin virgulă.\n```sql\nWITH cte1 AS (SELECT ...),\n  ___ cte2 AS (SELECT ...)\nSELECT * FROM cte1 JOIN cte2 ON ...;\n```",
        options: [], answer: "cte2",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Clauza de terminare a CTE recursiv.\n```sql\nWITH RECURSIVE cte AS (\n  SELECT 1 AS n  -- anchor\n  UNION ___\n  SELECT n + 1 FROM cte WHERE n < 5  -- recursive\n)\nSELECT * FROM cte;\n```",
        options: [], answer: "ALL",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: CTE îmbunătățesc ___ interogărilor complexe.\n```sql\n-- CTE fac codul mai ___\n```",
        options: [], answer: "lizibilitatea",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie un CTE care extrage comenzile mari (> 1000) și numără câte sunt per client.",
        starterCode: "WITH comenzi_mari AS (\n  SELECT * FROM comenzi WHERE total > 1000\n)\nSELECT client_id, COUNT(*) AS nr\nFROM comenzi_mari\nGROUP BY client_id;",
        language: "sql", expectedOutput: "WITH comenzi_mari AS (\n  SELECT * FROM comenzi WHERE total > 1000\n)\nSELECT client_id, COUNT(*) AS nr\nFROM comenzi_mari\nGROUP BY client_id;",
        options: [], answer: "WITH comenzi_mari AS (\n  SELECT * FROM comenzi WHERE total > 1000\n)\nSELECT client_id, COUNT(*) AS nr\nFROM comenzi_mari\nGROUP BY client_id;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie un CTE recursiv care generează numerele 1-5.",
        starterCode: "WITH RECURSIVE numere AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM numere WHERE n < 5\n)\nSELECT * FROM numere;",
        language: "sql", expectedOutput: "WITH RECURSIVE numere AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM numere WHERE n < 5\n)\nSELECT * FROM numere;",
        options: [], answer: "WITH RECURSIVE numere AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM numere WHERE n < 5\n)\nSELECT * FROM numere;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie 2 CTE înlănțuite: primul selectează angajații seniori, al doilea calculează media lor.",
        starterCode: "WITH seniori AS (\n  SELECT * FROM angajati WHERE ani_exp > 5\n),\nstatistici AS (\n  SELECT AVG(salariu) AS medie FROM seniori\n)\nSELECT * FROM statistici;",
        language: "sql", expectedOutput: "WITH seniori AS (\n  SELECT * FROM angajati WHERE ani_exp > 5\n),\nstatistici AS (\n  SELECT AVG(salariu) AS medie FROM seniori\n)\nSELECT * FROM statistici;",
        options: [], answer: "WITH seniori AS (\n  SELECT * FROM angajati WHERE ani_exp > 5\n),\nstatistici AS (\n  SELECT AVG(salariu) AS medie FROM seniori\n)\nSELECT * FROM statistici;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie un CTE recursiv pentru ierarhia organizațională (manager -> angajat).",
        starterCode: "WITH RECURSIVE ierarhie AS (\n  SELECT id, nume, manager_id, 0 AS nivel\n  FROM angajati WHERE manager_id IS NULL\n  UNION ALL\n  SELECT a.id, a.nume, a.manager_id, i.nivel + 1\n  FROM angajati a JOIN ierarhie i ON a.manager_id = i.id\n)\nSELECT * FROM ierarhie ORDER BY nivel;",
        language: "sql", expectedOutput: "WITH RECURSIVE ierarhie AS (\n  SELECT id, nume, manager_id, 0 AS nivel\n  FROM angajati WHERE manager_id IS NULL\n  UNION ALL\n  SELECT a.id, a.nume, a.manager_id, i.nivel + 1\n  FROM angajati a JOIN ierarhie i ON a.manager_id = i.id\n)\nSELECT * FROM ierarhie ORDER BY nivel;",
        options: [], answer: "WITH RECURSIVE ierarhie AS (\n  SELECT id, nume, manager_id, 0 AS nivel\n  FROM angajati WHERE manager_id IS NULL\n  UNION ALL\n  SELECT a.id, a.nume, a.manager_id, i.nivel + 1\n  FROM angajati a JOIN ierarhie i ON a.manager_id = i.id\n)\nSELECT * FROM ierarhie ORDER BY nivel;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie un CTE cu window function pentru top 3 angajați per departament.",
        starterCode: "WITH angajati_ranged AS (\n  SELECT *,\n    RANK() OVER (PARTITION BY departament ORDER BY salariu DESC) AS rang\n  FROM angajati\n)\nSELECT * FROM angajati_ranged WHERE rang <= 3;",
        language: "sql", expectedOutput: "WITH angajati_ranged AS (\n  SELECT *,\n    RANK() OVER (PARTITION BY departament ORDER BY salariu DESC) AS rang\n  FROM angajati\n)\nSELECT * FROM angajati_ranged WHERE rang <= 3;",
        options: [], answer: "WITH angajati_ranged AS (\n  SELECT *,\n    RANK() OVER (PARTITION BY departament ORDER BY salariu DESC) AS rang\n  FROM angajati\n)\nSELECT * FROM angajati_ranged WHERE rang <= 3;"
      }
    ]
  },
  // ─── 15. Proceduri Stocate și Funcții ────────────────────────────────────
  {
    lessonId: "6a08d07f999573855635d2d1",
    name: "15. Proceduri Stocate și Funcții",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează o procedură stocată.\n```sql\nCREATE ___ get_angajati(IN dept VARCHAR(50))\nBEGIN\n  SELECT * FROM angajati WHERE departament = dept;\nEND;\n```",
        options: [], answer: "PROCEDURE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Apelează o procedură stocată.\n```sql\n___ get_angajati('IT');\n```",
        options: [], answer: "CALL",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează o funcție care returnează o valoare.\n```sql\nCREATE ___ calcul_tva(pret DECIMAL)\nRETURNS DECIMAL\nBEGIN\n  RETURN pret * 0.19;\nEND;\n```",
        options: [], answer: "FUNCTION",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Declară o variabilă locală în procedură.\n```sql\nBEGIN\n  ___ total INT DEFAULT 0;\n  SELECT COUNT(*) INTO total FROM comenzi;\nEND;\n```",
        options: [], answer: "DECLARE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Parametru de ieșire al procedurii.\n```sql\nCREATE PROCEDURE get_count(___ total INT)\nBEGIN\n  SELECT COUNT(*) INTO total FROM comenzi;\nEND;\n```",
        options: [], answer: "OUT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o procedură stocată care returnează toate produsele dintr-o categorie dată.",
        starterCode: "CREATE PROCEDURE get_produse_categorie(IN cat_id INT)\nBEGIN\n  SELECT * FROM produse WHERE categorie_id = cat_id;\nEND;",
        language: "sql", expectedOutput: "CREATE PROCEDURE get_produse_categorie(IN cat_id INT)\nBEGIN\n  SELECT * FROM produse WHERE categorie_id = cat_id;\nEND;",
        options: [], answer: "CREATE PROCEDURE get_produse_categorie(IN cat_id INT)\nBEGIN\n  SELECT * FROM produse WHERE categorie_id = cat_id;\nEND;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție SQL care calculează TVA-ul (19%) pentru un preț dat.",
        starterCode: "CREATE FUNCTION calcul_tva(pret DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nDETERMINISTIC\nBEGIN\n  RETURN pret * 0.19;\nEND;",
        language: "sql", expectedOutput: "CREATE FUNCTION calcul_tva(pret DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nDETERMINISTIC\nBEGIN\n  RETURN pret * 0.19;\nEND;",
        options: [], answer: "CREATE FUNCTION calcul_tva(pret DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nDETERMINISTIC\nBEGIN\n  RETURN pret * 0.19;\nEND;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o procedură cu parametru OUT care returnează numărul total de comenzi.",
        starterCode: "CREATE PROCEDURE get_total_comenzi(OUT total INT)\nBEGIN\n  SELECT COUNT(*) INTO total FROM comenzi;\nEND;",
        language: "sql", expectedOutput: "CREATE PROCEDURE get_total_comenzi(OUT total INT)\nBEGIN\n  SELECT COUNT(*) INTO total FROM comenzi;\nEND;",
        options: [], answer: "CREATE PROCEDURE get_total_comenzi(OUT total INT)\nBEGIN\n  SELECT COUNT(*) INTO total FROM comenzi;\nEND;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a șterge o procedură stocată.",
        starterCode: "DROP PROCEDURE IF EXISTS get_angajati;\nDROP FUNCTION IF EXISTS calcul_tva;",
        language: "sql", expectedOutput: "DROP PROCEDURE IF EXISTS get_angajati;\nDROP FUNCTION IF EXISTS calcul_tva;",
        options: [], answer: "DROP PROCEDURE IF EXISTS get_angajati;\nDROP FUNCTION IF EXISTS calcul_tva;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o procedură cu logică IF/ELSE care inserează sau actualizează (upsert simplu).",
        starterCode: "CREATE PROCEDURE upsert_produs(IN p_id INT, IN p_name VARCHAR(100))\nBEGIN\n  IF EXISTS (SELECT 1 FROM produse WHERE id = p_id) THEN\n    UPDATE produse SET nume = p_name WHERE id = p_id;\n  ELSE\n    INSERT INTO produse(id, nume) VALUES (p_id, p_name);\n  END IF;\nEND;",
        language: "sql", expectedOutput: "CREATE PROCEDURE upsert_produs(IN p_id INT, IN p_name VARCHAR(100))\nBEGIN\n  IF EXISTS (SELECT 1 FROM produse WHERE id = p_id) THEN\n    UPDATE produse SET nume = p_name WHERE id = p_id;\n  ELSE\n    INSERT INTO produse(id, nume) VALUES (p_id, p_name);\n  END IF;\nEND;",
        options: [], answer: "CREATE PROCEDURE upsert_produs(IN p_id INT, IN p_name VARCHAR(100))\nBEGIN\n  IF EXISTS (SELECT 1 FROM produse WHERE id = p_id) THEN\n    UPDATE produse SET nume = p_name WHERE id = p_id;\n  ELSE\n    INSERT INTO produse(id, nume) VALUES (p_id, p_name);\n  END IF;\nEND;"
      }
    ]
  },
  // ─── 16. Triggere ────────────────────────────────────────────────────────
  {
    lessonId: "6a08d082999573855635d2e5",
    name: "16. Triggere",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un trigger BEFORE INSERT.\n```sql\nCREATE ___ trg_before_insert\nBEFORE INSERT ON produse\nFOR EACH ROW\nBEGIN ... END;\n```",
        options: [], answer: "TRIGGER",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Accesează noua valoare în trigger.\n```sql\nCREATE TRIGGER trg_check_pret\nBEFORE INSERT ON produse\nFOR EACH ROW\nBEGIN\n  IF ___.pret < 0 THEN SIGNAL SQLSTATE '45000'; END IF;\nEND;\n```",
        options: [], answer: "NEW",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Accesează valoarea veche în trigger AFTER UPDATE.\n```sql\nINSERT INTO audit_log(vechi_pret) VALUES (___.pret);\n```",
        options: [], answer: "OLD",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Trigger după INSERT (nu înainte).\n```sql\nCREATE TRIGGER trg_after_insert\n___ INSERT ON comenzi\n...\n```",
        options: [], answer: "AFTER",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Șterge un trigger existent.\n```sql\n___ TRIGGER trg_before_insert;\n```",
        options: [], answer: "DROP",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie un trigger BEFORE INSERT care setează automat data_creare la NOW().",
        starterCode: "CREATE TRIGGER trg_set_data\nBEFORE INSERT ON comenzi\nFOR EACH ROW\nBEGIN\n  SET NEW.data_creare = NOW();\nEND;",
        language: "sql", expectedOutput: "CREATE TRIGGER trg_set_data\nBEFORE INSERT ON comenzi\nFOR EACH ROW\nBEGIN\n  SET NEW.data_creare = NOW();\nEND;",
        options: [], answer: "CREATE TRIGGER trg_set_data\nBEFORE INSERT ON comenzi\nFOR EACH ROW\nBEGIN\n  SET NEW.data_creare = NOW();\nEND;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie un trigger AFTER INSERT care loghează automat inserarea în tabela audit_log.",
        starterCode: "CREATE TRIGGER trg_audit_insert\nAFTER INSERT ON produse\nFOR EACH ROW\nBEGIN\n  INSERT INTO audit_log(tabel, actiune, id_rand)\n  VALUES ('produse', 'INSERT', NEW.id);\nEND;",
        language: "sql", expectedOutput: "CREATE TRIGGER trg_audit_insert\nAFTER INSERT ON produse\nFOR EACH ROW\nBEGIN\n  INSERT INTO audit_log(tabel, actiune, id_rand)\n  VALUES ('produse', 'INSERT', NEW.id);\nEND;",
        options: [], answer: "CREATE TRIGGER trg_audit_insert\nAFTER INSERT ON produse\nFOR EACH ROW\nBEGIN\n  INSERT INTO audit_log(tabel, actiune, id_rand)\n  VALUES ('produse', 'INSERT', NEW.id);\nEND;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie un trigger BEFORE UPDATE care validează că noul preț nu poate fi negativ.",
        starterCode: "CREATE TRIGGER trg_valid_pret\nBEFORE UPDATE ON produse\nFOR EACH ROW\nBEGIN\n  IF NEW.pret < 0 THEN\n    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Pretul nu poate fi negativ';\n  END IF;\nEND;",
        language: "sql", expectedOutput: "CREATE TRIGGER trg_valid_pret\nBEFORE UPDATE ON produse\nFOR EACH ROW\nBEGIN\n  IF NEW.pret < 0 THEN\n    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Pretul nu poate fi negativ';\n  END IF;\nEND;",
        options: [], answer: "CREATE TRIGGER trg_valid_pret\nBEFORE UPDATE ON produse\nFOR EACH ROW\nBEGIN\n  IF NEW.pret < 0 THEN\n    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Pretul nu poate fi negativ';\n  END IF;\nEND;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie un trigger AFTER DELETE care scade stocul dintr-un tabel de statistici.",
        starterCode: "CREATE TRIGGER trg_after_delete\nAFTER DELETE ON comenzi\nFOR EACH ROW\nBEGIN\n  UPDATE statistici SET total_comenzi = total_comenzi - 1;\nEND;",
        language: "sql", expectedOutput: "CREATE TRIGGER trg_after_delete\nAFTER DELETE ON comenzi\nFOR EACH ROW\nBEGIN\n  UPDATE statistici SET total_comenzi = total_comenzi - 1;\nEND;",
        options: [], answer: "CREATE TRIGGER trg_after_delete\nAFTER DELETE ON comenzi\nFOR EACH ROW\nBEGIN\n  UPDATE statistici SET total_comenzi = total_comenzi - 1;\nEND;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a lista toate trigger-ele din baza de date curentă.",
        starterCode: "SELECT TRIGGER_NAME, EVENT_MANIPULATION, EVENT_OBJECT_TABLE\nFROM INFORMATION_SCHEMA.TRIGGERS\nWHERE TRIGGER_SCHEMA = DATABASE();",
        language: "sql", expectedOutput: "SELECT TRIGGER_NAME, EVENT_MANIPULATION, EVENT_OBJECT_TABLE\nFROM INFORMATION_SCHEMA.TRIGGERS\nWHERE TRIGGER_SCHEMA = DATABASE();",
        options: [], answer: "SELECT TRIGGER_NAME, EVENT_MANIPULATION, EVENT_OBJECT_TABLE\nFROM INFORMATION_SCHEMA.TRIGGERS\nWHERE TRIGGER_SCHEMA = DATABASE();"
      }
    ]
  },
  // ─── 17. Normalizare ─────────────────────────────────────────────────────
  {
    lessonId: "6a08d085999573855635d2f9",
    name: "17. Normalizare",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Prima Formă Normală (1NF) impune ca fiecare coloană să conțină valori ___.\n```sql\n-- 1NF: valori ___, un singur tip per coloana\n```",
        options: [], answer: "atomice",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: 2NF elimină dependențele parțiale față de cheia ___.\n```sql\n-- 2NF: fiecare atribut ne-cheie depinde de INTREAGA ___\n```",
        options: [], answer: "primara",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: 3NF elimină dependențele tranzitive.\n```sql\n-- 3NF: atributele ne-cheie NU depind de alte atribute ___\n```",
        options: [], answer: "ne-cheie",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Denormalizarea poate îmbunătăți ___ la costul redundanței.\n```sql\n-- denormalizare: mai multa ___ dar interogari mai rapide\n```",
        options: [], answer: "performanta",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Anomalia de inserare apare când nu poți insera date fără a insera ___.\n```sql\n-- anomalie: nu poti insera un produs fara a specifica o ___\n```",
        options: [], answer: "comanda",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a converti un tabel non-1NF (telefoane multiple) în forma 1NF.",
        starterCode: "-- Forma non-1NF (gresita):\n-- CREATE TABLE clienti (id INT, telefoane VARCHAR(255));\n-- Forma 1NF (corecta):\nCREATE TABLE clienti (id INT PRIMARY KEY, nume VARCHAR(100));\nCREATE TABLE telefoane (id INT PRIMARY KEY, client_id INT, numar VARCHAR(20));",
        language: "sql", expectedOutput: "-- Forma non-1NF (gresita):\n-- CREATE TABLE clienti (id INT, telefoane VARCHAR(255));\n-- Forma 1NF (corecta):\nCREATE TABLE clienti (id INT PRIMARY KEY, nume VARCHAR(100));\nCREATE TABLE telefoane (id INT PRIMARY KEY, client_id INT, numar VARCHAR(20));",
        options: [], answer: "-- Forma non-1NF (gresita):\n-- CREATE TABLE clienti (id INT, telefoane VARCHAR(255));\n-- Forma 1NF (corecta):\nCREATE TABLE clienti (id INT PRIMARY KEY, nume VARCHAR(100));\nCREATE TABLE telefoane (id INT PRIMARY KEY, client_id INT, numar VARCHAR(20));"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie schema 2NF pentru o tabelă de comenzi cu produse (eliminând dependența parțială).",
        starterCode: "-- 2NF: separam produsele de comenzi\nCREATE TABLE comenzi (id INT PRIMARY KEY, client_id INT, data DATE);\nCREATE TABLE produse (id INT PRIMARY KEY, nume VARCHAR(100), pret DECIMAL);\nCREATE TABLE comanda_produs (comanda_id INT, produs_id INT, cantitate INT, PRIMARY KEY(comanda_id, produs_id));",
        language: "sql", expectedOutput: "-- 2NF: separam produsele de comenzi\nCREATE TABLE comenzi (id INT PRIMARY KEY, client_id INT, data DATE);\nCREATE TABLE produse (id INT PRIMARY KEY, nume VARCHAR(100), pret DECIMAL);\nCREATE TABLE comanda_produs (comanda_id INT, produs_id INT, cantitate INT, PRIMARY KEY(comanda_id, produs_id));",
        options: [], answer: "-- 2NF: separam produsele de comenzi\nCREATE TABLE comenzi (id INT PRIMARY KEY, client_id INT, data DATE);\nCREATE TABLE produse (id INT PRIMARY KEY, nume VARCHAR(100), pret DECIMAL);\nCREATE TABLE comanda_produs (comanda_id INT, produs_id INT, cantitate INT, PRIMARY KEY(comanda_id, produs_id));"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL care demonstrează problema redundanței (un angajat cu departament duplicat).",
        starterCode: "-- Problema: departament duplicat in fiecare rand\n-- SELECT * FROM angajati_denorm WHERE departament = 'IT';\n-- Solutia 3NF: separam departamentele\nCREATE TABLE departamente (id INT PRIMARY KEY, nume VARCHAR(100), locatie VARCHAR(100));\nALTER TABLE angajati ADD COLUMN departament_id INT REFERENCES departamente(id);",
        language: "sql", expectedOutput: "-- Problema: departament duplicat in fiecare rand\n-- SELECT * FROM angajati_denorm WHERE departament = 'IT';\n-- Solutia 3NF: separam departamentele\nCREATE TABLE departamente (id INT PRIMARY KEY, nume VARCHAR(100), locatie VARCHAR(100));\nALTER TABLE angajati ADD COLUMN departament_id INT REFERENCES departamente(id);",
        options: [], answer: "-- Problema: departament duplicat in fiecare rand\n-- SELECT * FROM angajati_denorm WHERE departament = 'IT';\n-- Solutia 3NF: separam departamentele\nCREATE TABLE departamente (id INT PRIMARY KEY, nume VARCHAR(100), locatie VARCHAR(100));\nALTER TABLE angajati ADD COLUMN departament_id INT REFERENCES departamente(id);"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a verifica că un tabel respectă 1NF (nicio coloană cu valori multiple).",
        starterCode: "SELECT * FROM clienti\nWHERE telefon LIKE '%,%';",
        language: "sql", expectedOutput: "SELECT * FROM clienti\nWHERE telefon LIKE '%,%';",
        options: [], answer: "SELECT * FROM clienti\nWHERE telefon LIKE '%,%';"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a lista formele normale: 1NF, 2NF, 3NF cu descrierile lor.",
        starterCode: "SELECT '1NF' AS forma, 'Valori atomice' AS regula\nUNION ALL SELECT '2NF', 'Fara dependente partiale'\nUNION ALL SELECT '3NF', 'Fara dependente tranzitive';",
        language: "sql", expectedOutput: "SELECT '1NF' AS forma, 'Valori atomice' AS regula\nUNION ALL SELECT '2NF', 'Fara dependente partiale'\nUNION ALL SELECT '3NF', 'Fara dependente tranzitive';",
        options: [], answer: "SELECT '1NF' AS forma, 'Valori atomice' AS regula\nUNION ALL SELECT '2NF', 'Fara dependente partiale'\nUNION ALL SELECT '3NF', 'Fara dependente tranzitive';"
      }
    ]
  },
  // ─── 18. Optimizare SQL și EXPLAIN ───────────────────────────────────────
  {
    lessonId: "6a081ff1ed4ef595fd66eee1",
    name: "18. Optimizare SQL și EXPLAIN",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Comanda pentru analiza planului de execuție.\n```sql\n___ SELECT * FROM comenzi WHERE status = 'activ';\n```",
        options: [], answer: "EXPLAIN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Evită SELECT * — selectează doar coloanele ___.\n```sql\nSELECT ___ FROM comenzi; -- bine\nSELECT * FROM comenzi; -- evita\n```",
        options: [], answer: "necesare",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Un index pe coloana filtrată accelerează ___.\n```sql\nCREATE INDEX idx_status ON comenzi(status);\n-- accelereaza WHERE status = ___\n```",
        options: [], answer: "cautarea",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: LIMIT reduce numărul de înregistrări returnate.\n```sql\nSELECT * FROM log_events\nORDER BY data DESC\n___ 100;\n```",
        options: [], answer: "LIMIT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: EXPLAIN ANALYZE oferă informații detaliate despre execuție (PostgreSQL).\n```sql\nEXPLAIN ___ SELECT * FROM comenzi WHERE total > 1000;\n```",
        options: [], answer: "ANALYZE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie EXPLAIN pentru a analiza o interogare cu subquery.",
        starterCode: "EXPLAIN SELECT * FROM produse\nWHERE pret > (SELECT AVG(pret) FROM produse);",
        language: "sql", expectedOutput: "EXPLAIN SELECT * FROM produse\nWHERE pret > (SELECT AVG(pret) FROM produse);",
        options: [], answer: "EXPLAIN SELECT * FROM produse\nWHERE pret > (SELECT AVG(pret) FROM produse);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea optimizată: în loc de NOT IN, folosește NOT EXISTS.",
        starterCode: "-- Variantă lentă:\n-- SELECT * FROM clienti WHERE id NOT IN (SELECT client_id FROM comenzi);\n-- Variantă optimizată:\nSELECT * FROM clienti c\nWHERE NOT EXISTS (SELECT 1 FROM comenzi WHERE client_id = c.id);",
        language: "sql", expectedOutput: "-- Variantă lentă:\n-- SELECT * FROM clienti WHERE id NOT IN (SELECT client_id FROM comenzi);\n-- Variantă optimizată:\nSELECT * FROM clienti c\nWHERE NOT EXISTS (SELECT 1 FROM comenzi WHERE client_id = c.id);",
        options: [], answer: "-- Variantă lentă:\n-- SELECT * FROM clienti WHERE id NOT IN (SELECT client_id FROM comenzi);\n-- Variantă optimizată:\nSELECT * FROM clienti c\nWHERE NOT EXISTS (SELECT 1 FROM comenzi WHERE client_id = c.id);"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL cu index hint pentru a forța folosirea unui index specific.",
        starterCode: "SELECT * FROM comenzi USE INDEX (idx_status)\nWHERE status = 'activ';",
        language: "sql", expectedOutput: "SELECT * FROM comenzi USE INDEX (idx_status)\nWHERE status = 'activ';",
        options: [], answer: "SELECT * FROM comenzi USE INDEX (idx_status)\nWHERE status = 'activ';"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a identifica cele mai lente interogări (slow query log concept).",
        starterCode: "SELECT query_time, sql_text\nFROM mysql.slow_log\nORDER BY query_time DESC\nLIMIT 10;",
        language: "sql", expectedOutput: "SELECT query_time, sql_text\nFROM mysql.slow_log\nORDER BY query_time DESC\nLIMIT 10;",
        options: [], answer: "SELECT query_time, sql_text\nFROM mysql.slow_log\nORDER BY query_time DESC\nLIMIT 10;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a verifica indexurile unui tabel.",
        starterCode: "SHOW INDEXES FROM comenzi;",
        language: "sql", expectedOutput: "SHOW INDEXES FROM comenzi;",
        options: [], answer: "SHOW INDEXES FROM comenzi;"
      }
    ]
  },
  // ─── 19. Securitate SQL și Injecție SQL ──────────────────────────────────
  {
    lessonId: "6a08d08a999573855635d320",
    name: "19. Securitate SQL și Injecție SQL",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Folosește interogări parametrizate pentru a preveni SQL Injection.\n```sql\n-- Python/psycopg2:\ncursor.execute(\"SELECT * FROM users WHERE id = ___\", (user_id,))\n```",
        options: [], answer: "%s",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: SQL Injection exploatează lipsa ___.\n```sql\n-- Vulnerabil:\nquery = \"SELECT * FROM users WHERE name = '\" + user_input + \"'\"\n-- Prevenit prin: ___\n```",
        options: [], answer: "sanitizarii",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Acordă permisiuni minime necesare (principiul ___ privilege).\n```sql\nGRANT SELECT ON baza_de_date.* TO 'user_readonly'@'localhost';\n```",
        options: [], answer: "least",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Revocă permisiunile unui utilizator.\n```sql\n___ ALL PRIVILEGES ON baza_de_date.* FROM 'user'@'localhost';\n```",
        options: [], answer: "REVOKE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un utilizator cu parolă.\n```sql\nCREATE ___ 'app_user'@'localhost' IDENTIFIED BY 'parola_sigura';\n```",
        options: [], answer: "USER",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie exemplul de SQL Injection clasic și varianta sigură cu parametri.",
        starterCode: "-- SQL Injection (NESIGUR):\n-- SELECT * FROM users WHERE name = '' OR '1'='1';\n\n-- Varianta sigura (parametrizata):\nSELECT * FROM users WHERE name = ?;",
        language: "sql", expectedOutput: "-- SQL Injection (NESIGUR):\n-- SELECT * FROM users WHERE name = '' OR '1'='1';\n\n-- Varianta sigura (parametrizata):\nSELECT * FROM users WHERE name = ?;",
        options: [], answer: "-- SQL Injection (NESIGUR):\n-- SELECT * FROM users WHERE name = '' OR '1'='1';\n\n-- Varianta sigura (parametrizata):\nSELECT * FROM users WHERE name = ?;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea un utilizator read-only și a-i acorda permisiuni SELECT.",
        starterCode: "CREATE USER 'readonly_user'@'localhost' IDENTIFIED BY 'parola123';\nGRANT SELECT ON mydb.* TO 'readonly_user'@'localhost';\nFLUSH PRIVILEGES;",
        language: "sql", expectedOutput: "CREATE USER 'readonly_user'@'localhost' IDENTIFIED BY 'parola123';\nGRANT SELECT ON mydb.* TO 'readonly_user'@'localhost';\nFLUSH PRIVILEGES;",
        options: [], answer: "CREATE USER 'readonly_user'@'localhost' IDENTIFIED BY 'parola123';\nGRANT SELECT ON mydb.* TO 'readonly_user'@'localhost';\nFLUSH PRIVILEGES;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL care arată permisiunile unui utilizator.",
        starterCode: "SHOW GRANTS FOR 'readonly_user'@'localhost';",
        language: "sql", expectedOutput: "SHOW GRANTS FOR 'readonly_user'@'localhost';",
        options: [], answer: "SHOW GRANTS FOR 'readonly_user'@'localhost';"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a revoca permisiunile și șterge utilizatorul.",
        starterCode: "REVOKE ALL PRIVILEGES ON mydb.* FROM 'readonly_user'@'localhost';\nDROP USER 'readonly_user'@'localhost';",
        language: "sql", expectedOutput: "REVOKE ALL PRIVILEGES ON mydb.* FROM 'readonly_user'@'localhost';\nDROP USER 'readonly_user'@'localhost';",
        options: [], answer: "REVOKE ALL PRIVILEGES ON mydb.* FROM 'readonly_user'@'localhost';\nDROP USER 'readonly_user'@'localhost';"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru audit: cine a accesat tabelul utilizatori (concept).",
        starterCode: "SELECT user, host, db, command, time\nFROM information_schema.processlist\nWHERE db = 'mydb';",
        language: "sql", expectedOutput: "SELECT user, host, db, command, time\nFROM information_schema.processlist\nWHERE db = 'mydb';",
        options: [], answer: "SELECT user, host, db, command, time\nFROM information_schema.processlist\nWHERE db = 'mydb';"
      }
    ]
  },
  // ─── 20. Proiect Final — Schema Completă ─────────────────────────────────
  {
    lessonId: "6a08d08d999573855635d334",
    name: "20. Proiect Final — Schema Completă",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Schema e-commerce include tabela ___ pentru produse.\n```sql\nCREATE TABLE ___ (id INT PK, nume VARCHAR, pret DECIMAL, stoc INT);\n```",
        options: [], answer: "produse",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Relația comenzi-produse se face prin tabelă de ___.\n```sql\nCREATE TABLE comanda_produs (\n  comanda_id INT, produs_id INT,\n  ___ KEY (comanda_id, produs_id)\n);\n```",
        options: [], answer: "PRIMARY",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: JOIN pentru a afișa detaliile comenzii cu clientul.\n```sql\nSELECT c.id, u.email, c.total\nFROM comenzi c\n___ utilizatori u ON c.utilizator_id = u.id;\n```",
        options: [], answer: "JOIN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Indexul îmbunătățește căutarea după email.\n```sql\nCREATE UNIQUE ___ idx_email ON utilizatori(email);\n```",
        options: [], answer: "INDEX",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: CASCADE șterge comenzile când se șterge clientul.\n```sql\nFOREIGN KEY (client_id) REFERENCES clienti(id) ON DELETE ___\n```",
        options: [], answer: "CASCADE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie schema SQL completă pentru tabelele de bază ale unui e-commerce: utilizatori, produse, comenzi.",
        starterCode: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  nume VARCHAR(100) NOT NULL\n);\nCREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2) NOT NULL,\n  stoc INT DEFAULT 0\n);\nCREATE TABLE comenzi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  utilizator_id INT NOT NULL,\n  total DECIMAL(10,2),\n  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (utilizator_id) REFERENCES utilizatori(id)\n);",
        language: "sql", expectedOutput: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  nume VARCHAR(100) NOT NULL\n);\nCREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2) NOT NULL,\n  stoc INT DEFAULT 0\n);\nCREATE TABLE comenzi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  utilizator_id INT NOT NULL,\n  total DECIMAL(10,2),\n  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (utilizator_id) REFERENCES utilizatori(id)\n);",
        options: [], answer: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  nume VARCHAR(100) NOT NULL\n);\nCREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2) NOT NULL,\n  stoc INT DEFAULT 0\n);\nCREATE TABLE comenzi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  utilizator_id INT NOT NULL,\n  total DECIMAL(10,2),\n  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (utilizator_id) REFERENCES utilizatori(id)\n);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL care afișează top 5 clienți după valoarea totală a comenzilor.",
        starterCode: "SELECT u.email, SUM(c.total) AS total_cumparaturi\nFROM utilizatori u\nJOIN comenzi c ON u.id = c.utilizator_id\nGROUP BY u.id\nORDER BY total_cumparaturi DESC\nLIMIT 5;",
        language: "sql", expectedOutput: "SELECT u.email, SUM(c.total) AS total_cumparaturi\nFROM utilizatori u\nJOIN comenzi c ON u.id = c.utilizator_id\nGROUP BY u.id\nORDER BY total_cumparaturi DESC\nLIMIT 5;",
        options: [], answer: "SELECT u.email, SUM(c.total) AS total_cumparaturi\nFROM utilizatori u\nJOIN comenzi c ON u.id = c.utilizator_id\nGROUP BY u.id\nORDER BY total_cumparaturi DESC\nLIMIT 5;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL cu CTE pentru a calcula statistici per categorie: nr produse și pret mediu.",
        starterCode: "WITH stats_categorie AS (\n  SELECT categorie_id,\n    COUNT(*) AS nr_produse,\n    AVG(pret) AS pret_mediu\n  FROM produse\n  GROUP BY categorie_id\n)\nSELECT c.nume, s.nr_produse, s.pret_mediu\nFROM stats_categorie s\nJOIN categorii c ON s.categorie_id = c.id;",
        language: "sql", expectedOutput: "WITH stats_categorie AS (\n  SELECT categorie_id,\n    COUNT(*) AS nr_produse,\n    AVG(pret) AS pret_mediu\n  FROM produse\n  GROUP BY categorie_id\n)\nSELECT c.nume, s.nr_produse, s.pret_mediu\nFROM stats_categorie s\nJOIN categorii c ON s.categorie_id = c.id;",
        options: [], answer: "WITH stats_categorie AS (\n  SELECT categorie_id,\n    COUNT(*) AS nr_produse,\n    AVG(pret) AS pret_mediu\n  FROM produse\n  GROUP BY categorie_id\n)\nSELECT c.nume, s.nr_produse, s.pret_mediu\nFROM stats_categorie s\nJOIN categorii c ON s.categorie_id = c.id;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru raportul lunar al vânzărilor (YEAR+MONTH grouping).",
        starterCode: "SELECT YEAR(data) AS an, MONTH(data) AS luna,\n  COUNT(*) AS nr_comenzi,\n  SUM(total) AS vanzari_totale\nFROM comenzi\nGROUP BY YEAR(data), MONTH(data)\nORDER BY an, luna;",
        language: "sql", expectedOutput: "SELECT YEAR(data) AS an, MONTH(data) AS luna,\n  COUNT(*) AS nr_comenzi,\n  SUM(total) AS vanzari_totale\nFROM comenzi\nGROUP BY YEAR(data), MONTH(data)\nORDER BY an, luna;",
        options: [], answer: "SELECT YEAR(data) AS an, MONTH(data) AS luna,\n  COUNT(*) AS nr_comenzi,\n  SUM(total) AS vanzari_totale\nFROM comenzi\nGROUP BY YEAR(data), MONTH(data)\nORDER BY an, luna;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a afișa produsele cu stoc sub pragul de reaprovizionare (< 10).",
        starterCode: "SELECT id, nume, stoc\nFROM produse\nWHERE stoc < 10\nORDER BY stoc ASC;",
        language: "sql", expectedOutput: "SELECT id, nume, stoc\nFROM produse\nWHERE stoc < 10\nORDER BY stoc ASC;",
        options: [], answer: "SELECT id, nume, stoc\nFROM produse\nWHERE stoc < 10\nORDER BY stoc ASC;"
      }
    ]
  },
  // ─── 21. PostgreSQL vs MySQL vs SQLite ───────────────────────────────────
  {
    lessonId: "6a09bb61855b60bc2da6e3d6",
    name: "21. PostgreSQL vs MySQL vs SQLite",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: PostgreSQL folosește ___ în loc de AUTO_INCREMENT.\n```sql\nCREATE TABLE produse (id ___ PRIMARY KEY, ...);\n```",
        options: [], answer: "SERIAL",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: SQLite este o bază de date bazată pe ___.\n```sql\n-- SQLite: o singura baza de date intr-un singur ___\n```",
        options: [], answer: "fisier",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: PostgreSQL ILIKE face căutare case-___.\n```sql\nSELECT * FROM produse WHERE nume ___ '%laptop%';\n```",
        options: [], answer: "ILIKE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: MySQL folosește LIMIT, PostgreSQL folosește tot LIMIT (sintaxă ___.\n```sql\nSELECT * FROM produse LIMIT 10 ___; -- PostgreSQL\n```",
        options: [], answer: "OFFSET 0",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: PostgreSQL suportă tipul de date ___ nativ.\n```sql\nCREATE TABLE setari (config ___ NOT NULL);\n```",
        options: [], answer: "JSONB",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie aceeași interogare de creare a tabelei în MySQL și PostgreSQL (diferența AUTO_INCREMENT vs SERIAL).",
        starterCode: "-- MySQL:\nCREATE TABLE produse (id INT AUTO_INCREMENT PRIMARY KEY, nume VARCHAR(100));\n-- PostgreSQL:\nCREATE TABLE produse (id SERIAL PRIMARY KEY, nume VARCHAR(100));",
        language: "sql", expectedOutput: "-- MySQL:\nCREATE TABLE produse (id INT AUTO_INCREMENT PRIMARY KEY, nume VARCHAR(100));\n-- PostgreSQL:\nCREATE TABLE produse (id SERIAL PRIMARY KEY, nume VARCHAR(100));",
        options: [], answer: "-- MySQL:\nCREATE TABLE produse (id INT AUTO_INCREMENT PRIMARY KEY, nume VARCHAR(100));\n-- PostgreSQL:\nCREATE TABLE produse (id SERIAL PRIMARY KEY, nume VARCHAR(100));"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea de concatenare string în PostgreSQL (|| operator) vs MySQL (CONCAT).",
        starterCode: "-- PostgreSQL:\nSELECT prenume || ' ' || nume AS nume_complet FROM angajati;\n-- MySQL:\nSELECT CONCAT(prenume, ' ', nume) AS nume_complet FROM angajati;",
        language: "sql", expectedOutput: "-- PostgreSQL:\nSELECT prenume || ' ' || nume AS nume_complet FROM angajati;\n-- MySQL:\nSELECT CONCAT(prenume, ' ', nume) AS nume_complet FROM angajati;",
        options: [], answer: "-- PostgreSQL:\nSELECT prenume || ' ' || nume AS nume_complet FROM angajati;\n-- MySQL:\nSELECT CONCAT(prenume, ' ', nume) AS nume_complet FROM angajati;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie comparația cazurilor de utilizare: MySQL pentru web, PostgreSQL pentru enterprise, SQLite pentru embedded.",
        starterCode: "SELECT 'MySQL' AS db, 'aplicatii web' AS utilizare\nUNION ALL SELECT 'PostgreSQL', 'enterprise / complexitate'\nUNION ALL SELECT 'SQLite', 'embedded / mobile';",
        language: "sql", expectedOutput: "SELECT 'MySQL' AS db, 'aplicatii web' AS utilizare\nUNION ALL SELECT 'PostgreSQL', 'enterprise / complexitate'\nUNION ALL SELECT 'SQLite', 'embedded / mobile';",
        options: [], answer: "SELECT 'MySQL' AS db, 'aplicatii web' AS utilizare\nUNION ALL SELECT 'PostgreSQL', 'enterprise / complexitate'\nUNION ALL SELECT 'SQLite', 'embedded / mobile';"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea PostgreSQL specifică cu RETURNING clause după INSERT.",
        starterCode: "INSERT INTO produse (nume, pret)\nVALUES ('Laptop', 999)\nRETURNING id, nume;",
        language: "sql", expectedOutput: "INSERT INTO produse (nume, pret)\nVALUES ('Laptop', 999)\nRETURNING id, nume;",
        options: [], answer: "INSERT INTO produse (nume, pret)\nVALUES ('Laptop', 999)\nRETURNING id, nume;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQLite specifică cu PRAGMA pentru a vedea structura unui tabel.",
        starterCode: "PRAGMA table_info(produse);",
        language: "sql", expectedOutput: "PRAGMA table_info(produse);",
        options: [], answer: "PRAGMA table_info(produse);"
      }
    ]
  },
  // ─── 22. Indexuri avansate ───────────────────────────────────────────────
  {
    lessonId: "6a09bb64855b60bc2da6e3ea",
    name: "22. Indexuri avansate",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Index compus pe mai multe coloane.\n```sql\nCREATE INDEX idx_compus ON comenzi(___, data);\n```",
        options: [], answer: "client_id",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Index parțial care indexează doar înregistrările active.\n```sql\nCREATE INDEX idx_activi ON utilizatori(email)\n___ (activ = true);\n```",
        options: [], answer: "WHERE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Comanda PostgreSQL pentru analiză detaliată.\n```sql\nEXPLAIN ___ SELECT * FROM comenzi WHERE status = 'nou';\n```",
        options: [], answer: "ANALYZE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Index unic previne duplicate.\n```sql\nCREATE ___ INDEX idx_email ON utilizatori(email);\n```",
        options: [], answer: "UNIQUE",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Vizualizează indexurile unui tabel MySQL.\n```sql\nSHOW ___ FROM comenzi;\n```",
        options: [], answer: "INDEXES",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea un index compus pentru filtrarea comenzilor după client și status.",
        starterCode: "CREATE INDEX idx_client_status\nON comenzi(client_id, status);",
        language: "sql", expectedOutput: "CREATE INDEX idx_client_status\nON comenzi(client_id, status);",
        options: [], answer: "CREATE INDEX idx_client_status\nON comenzi(client_id, status);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie EXPLAIN ANALYZE pentru a vedea dacă un index este folosit.",
        starterCode: "EXPLAIN ANALYZE\nSELECT * FROM comenzi\nWHERE client_id = 5 AND status = 'activ';",
        language: "sql", expectedOutput: "EXPLAIN ANALYZE\nSELECT * FROM comenzi\nWHERE client_id = 5 AND status = 'activ';",
        options: [], answer: "EXPLAIN ANALYZE\nSELECT * FROM comenzi\nWHERE client_id = 5 AND status = 'activ';"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru un index parțial pe comenzile din 2024.",
        starterCode: "CREATE INDEX idx_comenzi_2024\nON comenzi(client_id, total)\nWHERE YEAR(data) = 2024;",
        language: "sql", expectedOutput: "CREATE INDEX idx_comenzi_2024\nON comenzi(client_id, total)\nWHERE YEAR(data) = 2024;",
        options: [], answer: "CREATE INDEX idx_comenzi_2024\nON comenzi(client_id, total)\nWHERE YEAR(data) = 2024;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL care afișează dimensiunea indexurilor dintr-un tabel (MySQL).",
        starterCode: "SELECT index_name, stat_value AS pages\nFROM mysql.innodb_index_stats\nWHERE table_name = 'comenzi'\n  AND stat_name = 'size';",
        language: "sql", expectedOutput: "SELECT index_name, stat_value AS pages\nFROM mysql.innodb_index_stats\nWHERE table_name = 'comenzi'\n  AND stat_name = 'size';",
        options: [], answer: "SELECT index_name, stat_value AS pages\nFROM mysql.innodb_index_stats\nWHERE table_name = 'comenzi'\n  AND stat_name = 'size';"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL care identifică coloanele fără index folosite în WHERE frecvent.",
        starterCode: "-- Verifică indexurile existente\nSHOW INDEXES FROM comenzi;\n-- Compara cu coloanele folosite in WHERE\nEXPLAIN SELECT * FROM comenzi WHERE total > 500;",
        language: "sql", expectedOutput: "-- Verifică indexurile existente\nSHOW INDEXES FROM comenzi;\n-- Compara cu coloanele folosite in WHERE\nEXPLAIN SELECT * FROM comenzi WHERE total > 500;",
        options: [], answer: "-- Verifică indexurile existente\nSHOW INDEXES FROM comenzi;\n-- Compara cu coloanele folosite in WHERE\nEXPLAIN SELECT * FROM comenzi WHERE total > 500;"
      }
    ]
  },
  // ─── 23. JSON in SQL ─────────────────────────────────────────────────────
  {
    lessonId: "6a09bb67855b60bc2da6e3fe",
    name: "23. JSON in SQL",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Extrage valoarea câmpului 'nume' din JSON (MySQL).\n```sql\nSELECT JSON_EXTRACT(date_json, '$.___ ') FROM produse;\n```",
        options: [], answer: "nume",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Operator shorthand pentru extragerea JSON în MySQL.\n```sql\nSELECT date_json ___ '$.pret' FROM produse;\n```",
        options: [], answer: "->>",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Tipul de date PostgreSQL optimizat pentru JSON cu indexare.\n```sql\nCREATE TABLE setari (config ___ NOT NULL);\n```",
        options: [], answer: "JSONB",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Actualizează un câmp JSON cu JSON_SET.\n```sql\nUPDATE produse\nSET date_json = JSON_SET(date_json, '$.stoc', ___)\nWHERE id = 1;\n```",
        options: [], answer: "0",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul PostgreSQL pentru conținut JSON (@>).\n```sql\nSELECT * FROM produse\nWHERE config ___ '{\"activ\": true}';\n```",
        options: [], answer: "@>",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea MySQL pentru a extrage câmpul 'pret' din coloana JSON.",
        starterCode: "SELECT id,\n  date_json->>'$.pret' AS pret\nFROM produse\nWHERE date_json->>'$.activ' = 'true';",
        language: "sql", expectedOutput: "SELECT id,\n  date_json->>'$.pret' AS pret\nFROM produse\nWHERE date_json->>'$.activ' = 'true';",
        options: [], answer: "SELECT id,\n  date_json->>'$.pret' AS pret\nFROM produse\nWHERE date_json->>'$.activ' = 'true';"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea PostgreSQL cu JSONB pentru a extrage informații din câmpul config.",
        starterCode: "SELECT id,\n  config->>'nume' AS nume,\n  (config->>'pret')::DECIMAL AS pret\nFROM produse\nWHERE config @> '{\"activ\": true}';",
        language: "sql", expectedOutput: "SELECT id,\n  config->>'nume' AS nume,\n  (config->>'pret')::DECIMAL AS pret\nFROM produse\nWHERE config @> '{\"activ\": true}';",
        options: [], answer: "SELECT id,\n  config->>'nume' AS nume,\n  (config->>'pret')::DECIMAL AS pret\nFROM produse\nWHERE config @> '{\"activ\": true}';"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a insera un rând cu coloană JSON.",
        starterCode: "INSERT INTO produse (id, date_json)\nVALUES (1, '{\"nume\": \"Laptop\", \"pret\": 999, \"activ\": true}');",
        language: "sql", expectedOutput: "INSERT INTO produse (id, date_json)\nVALUES (1, '{\"nume\": \"Laptop\", \"pret\": 999, \"activ\": true}');",
        options: [], answer: "INSERT INTO produse (id, date_json)\nVALUES (1, '{\"nume\": \"Laptop\", \"pret\": 999, \"activ\": true}');"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea un index GIN pe o coloană JSONB (PostgreSQL).",
        starterCode: "CREATE INDEX idx_config_gin ON produse USING GIN (config);",
        language: "sql", expectedOutput: "CREATE INDEX idx_config_gin ON produse USING GIN (config);",
        options: [], answer: "CREATE INDEX idx_config_gin ON produse USING GIN (config);"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a agrega date JSON cu JSON_ARRAYAGG.",
        starterCode: "SELECT client_id,\n  JSON_ARRAYAGG(JSON_OBJECT('id', id, 'total', total)) AS comenzi\nFROM comenzi\nGROUP BY client_id;",
        language: "sql", expectedOutput: "SELECT client_id,\n  JSON_ARRAYAGG(JSON_OBJECT('id', id, 'total', total)) AS comenzi\nFROM comenzi\nGROUP BY client_id;",
        options: [], answer: "SELECT client_id,\n  JSON_ARRAYAGG(JSON_OBJECT('id', id, 'total', total)) AS comenzi\nFROM comenzi\nGROUP BY client_id;"
      }
    ]
  },
  // ─── 24. Full-Text Search in SQL ─────────────────────────────────────────
  {
    lessonId: "6a09bb6a855b60bc2da6e412",
    name: "24. Full-Text Search in SQL",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Creează un index FULLTEXT pe coloana descriere.\n```sql\nCREATE ___ INDEX idx_ft ON produse(descriere);\n```",
        options: [], answer: "FULLTEXT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Clauza pentru căutare full-text în MySQL.\n```sql\nSELECT * FROM articole\nWHERE ___ (titlu, continut) AGAINST ('sql optimization');\n```",
        options: [], answer: "MATCH",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Modul boolean pentru full-text search.\n```sql\nSELECT * FROM articole\nWHERE MATCH(titlu) AGAINST ('+sql -beginner' IN ___ MODE);\n```",
        options: [], answer: "BOOLEAN",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Operatorul + în boolean mode înseamnă că termenul este ___.\n```sql\nMATCH(col) AGAINST ('+obligatoriu -exclus' IN BOOLEAN MODE)\n```",
        options: [], answer: "obligatoriu",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: PostgreSQL folosește ___ pentru full-text search.\n```sql\nSELECT * FROM articole\nWHERE to_tsvector('romanian', titlu) @@ ___ ('sql');\n```",
        options: [], answer: "to_tsquery",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea MySQL FULLTEXT pentru a căuta articole despre 'baze de date'.",
        starterCode: "SELECT id, titlu\nFROM articole\nWHERE MATCH(titlu, continut) AGAINST ('baze de date' IN BOOLEAN MODE);",
        language: "sql", expectedOutput: "SELECT id, titlu\nFROM articole\nWHERE MATCH(titlu, continut) AGAINST ('baze de date' IN BOOLEAN MODE);",
        options: [], answer: "SELECT id, titlu\nFROM articole\nWHERE MATCH(titlu, continut) AGAINST ('baze de date' IN BOOLEAN MODE);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea MySQL cu relevanță FULLTEXT (scor MATCH AGAINST).",
        starterCode: "SELECT id, titlu,\n  MATCH(titlu, continut) AGAINST ('sql index') AS relevanta\nFROM articole\nWHERE MATCH(titlu, continut) AGAINST ('sql index')\nORDER BY relevanta DESC;",
        language: "sql", expectedOutput: "SELECT id, titlu,\n  MATCH(titlu, continut) AGAINST ('sql index') AS relevanta\nFROM articole\nWHERE MATCH(titlu, continut) AGAINST ('sql index')\nORDER BY relevanta DESC;",
        options: [], answer: "SELECT id, titlu,\n  MATCH(titlu, continut) AGAINST ('sql index') AS relevanta\nFROM articole\nWHERE MATCH(titlu, continut) AGAINST ('sql index')\nORDER BY relevanta DESC;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea PostgreSQL full-text search cu tsvector.",
        starterCode: "SELECT id, titlu\nFROM articole\nWHERE to_tsvector('romanian', titlu || ' ' || continut)\n  @@ to_tsquery('romanian', 'baze & date');",
        language: "sql", expectedOutput: "SELECT id, titlu\nFROM articole\nWHERE to_tsvector('romanian', titlu || ' ' || continut)\n  @@ to_tsquery('romanian', 'baze & date');",
        options: [], answer: "SELECT id, titlu\nFROM articole\nWHERE to_tsvector('romanian', titlu || ' ' || continut)\n  @@ to_tsquery('romanian', 'baze & date');"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a crea un index FULLTEXT pe titlu și continut.",
        starterCode: "ALTER TABLE articole\n  ADD FULLTEXT INDEX idx_fulltext (titlu, continut);",
        language: "sql", expectedOutput: "ALTER TABLE articole\n  ADD FULLTEXT INDEX idx_fulltext (titlu, continut);",
        options: [], answer: "ALTER TABLE articole\n  ADD FULLTEXT INDEX idx_fulltext (titlu, continut);"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea boolean mode cu + și - pentru a găsi articole cu 'sql' dar fără 'beginner'.",
        starterCode: "SELECT * FROM articole\nWHERE MATCH(titlu, continut)\n  AGAINST ('+sql -beginner' IN BOOLEAN MODE);",
        language: "sql", expectedOutput: "SELECT * FROM articole\nWHERE MATCH(titlu, continut)\n  AGAINST ('+sql -beginner' IN BOOLEAN MODE);",
        options: [], answer: "SELECT * FROM articole\nWHERE MATCH(titlu, continut)\n  AGAINST ('+sql -beginner' IN BOOLEAN MODE);"
      }
    ]
  },
  // ─── 25. Replicare si Sharding ───────────────────────────────────────────
  {
    lessonId: "6a09bb6d855b60bc2da6e426",
    name: "25. Replicare si Sharding",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Read replicas servesc cererile de ___ pentru a descărca serverul principal.\n```sql\n-- Read replica: preia cererile de ___\n```",
        options: [], answer: "citire",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Sharding împarte datele orizontal în mai mulți ___ de baze de date.\n```sql\n-- Shard 1: useri cu id 1-1000000\n-- Shard 2: useri cu id 1000001-2000000\n```",
        options: [], answer: "noduri",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Replicarea sincronă garantează ___ înainte de confirmare.\n```sql\n-- Sincron: datele sunt scrise pe TOATE replicile inainte de ___\n```",
        options: [], answer: "COMMIT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: CAP Theorem — nu poți garata simultan Consistency, Availability și ___ Tolerance.\n```sql\n-- CAP: Consistency, Availability, ___ Tolerance\n```",
        options: [], answer: "Partition",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Cheie de sharding (shard key) determină pe ce shard ajunge un ___.\n```sql\n-- shard_key = user_id % num_shards\n-- user 1 -> shard ___\n```",
        options: [], answer: "rand",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL care direcționează citirile spre replica (comentariu cu hint).",
        starterCode: "-- Citire de pe replica\n/*+ READ_FROM_REPLICA */\nSELECT * FROM produse WHERE activ = 1;\n-- Scriere pe master\nINSERT INTO produse (nume, pret) VALUES ('Nou', 99);",
        language: "sql", expectedOutput: "-- Citire de pe replica\n/*+ READ_FROM_REPLICA */\nSELECT * FROM produse WHERE activ = 1;\n-- Scriere pe master\nINSERT INTO produse (nume, pret) VALUES ('Nou', 99);",
        options: [], answer: "-- Citire de pe replica\n/*+ READ_FROM_REPLICA */\nSELECT * FROM produse WHERE activ = 1;\n-- Scriere pe master\nINSERT INTO produse (nume, pret) VALUES ('Nou', 99);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie logica de shard routing: calculează shard-ul pentru user_id dat (mod 4 shards).",
        starterCode: "SELECT\n  user_id,\n  user_id % 4 AS shard_nr\nFROM utilizatori\nLIMIT 10;",
        language: "sql", expectedOutput: "SELECT\n  user_id,\n  user_id % 4 AS shard_nr\nFROM utilizatori\nLIMIT 10;",
        options: [], answer: "SELECT\n  user_id,\n  user_id % 4 AS shard_nr\nFROM utilizatori\nLIMIT 10;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie comparația tipurilor de replicare.",
        starterCode: "SELECT 'Sincrona' AS tip, 'Zero lag, mai lenta' AS descriere\nUNION ALL SELECT 'Asincrona', 'Rapid, posibil lag'\nUNION ALL SELECT 'Semi-sincrona', 'Compromis';",
        language: "sql", expectedOutput: "SELECT 'Sincrona' AS tip, 'Zero lag, mai lenta' AS descriere\nUNION ALL SELECT 'Asincrona', 'Rapid, posibil lag'\nUNION ALL SELECT 'Semi-sincrona', 'Compromis';",
        options: [], answer: "SELECT 'Sincrona' AS tip, 'Zero lag, mai lenta' AS descriere\nUNION ALL SELECT 'Asincrona', 'Rapid, posibil lag'\nUNION ALL SELECT 'Semi-sincrona', 'Compromis';"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a verifica statusul replicării MySQL.",
        starterCode: "SHOW REPLICA STATUS\\G",
        language: "sql", expectedOutput: "SHOW REPLICA STATUS\\G",
        options: [], answer: "SHOW REPLICA STATUS\\G"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie avantajele și dezavantajele sharding.",
        starterCode: "SELECT 'Avantaje' AS aspect, 'Scalare orizontala, performanta' AS detaliu\nUNION ALL SELECT 'Dezavantaje', 'Complexitate, cross-shard joins';",
        language: "sql", expectedOutput: "SELECT 'Avantaje' AS aspect, 'Scalare orizontala, performanta' AS detaliu\nUNION ALL SELECT 'Dezavantaje', 'Complexitate, cross-shard joins';",
        options: [], answer: "SELECT 'Avantaje' AS aspect, 'Scalare orizontala, performanta' AS detaliu\nUNION ALL SELECT 'Dezavantaje', 'Complexitate, cross-shard joins';"
      }
    ]
  },
  // ─── 26. Database Design Patterns ────────────────────────────────────────
  {
    lessonId: "6a09bb70855b60bc2da6e43a",
    name: "26. Database Design Patterns",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Soft delete folosește coloana ___ în loc să șteargă rândul.\n```sql\nUPDATE produse SET ___ = NOW() WHERE id = 5;\n```",
        options: [], answer: "deleted_at",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Audit table înregistrează cine a modificat datele și ___.\n```sql\nINSERT INTO audit_log (tabel, actiune, utilizator, ___)\nVALUES ('produse', 'UPDATE', 'admin', NOW());\n```",
        options: [], answer: "data",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Filtrarea soft-deleted records.\n```sql\nSELECT * FROM produse\nWHERE deleted_at IS ___;\n```",
        options: [], answer: "NULL",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Timestamp automat la creare și actualizare.\n```sql\nCREATE TABLE produse (\n  creat_la TIMESTAMP DEFAULT ___,\n  actualizat_la TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n);\n```",
        options: [], answer: "CURRENT_TIMESTAMP",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Versioning — coloana version previne ___ pierdute.\n```sql\nUPDATE produse SET pret = 99, version = version + 1\nWHERE id = 1 AND version = ___;\n```",
        options: [], answer: "3",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie schema SQL pentru soft delete cu coloana deleted_at.",
        starterCode: "CREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  deleted_at TIMESTAMP NULL DEFAULT NULL\n);\n-- Soft delete:\nUPDATE produse SET deleted_at = NOW() WHERE id = 5;\n-- Query activi:\nSELECT * FROM produse WHERE deleted_at IS NULL;",
        language: "sql", expectedOutput: "CREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  deleted_at TIMESTAMP NULL DEFAULT NULL\n);\n-- Soft delete:\nUPDATE produse SET deleted_at = NOW() WHERE id = 5;\n-- Query activi:\nSELECT * FROM produse WHERE deleted_at IS NULL;",
        options: [], answer: "CREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  deleted_at TIMESTAMP NULL DEFAULT NULL\n);\n-- Soft delete:\nUPDATE produse SET deleted_at = NOW() WHERE id = 5;\n-- Query activi:\nSELECT * FROM produse WHERE deleted_at IS NULL;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie schema SQL pentru audit table care loghează modificările.",
        starterCode: "CREATE TABLE audit_log (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  tabel VARCHAR(50),\n  rand_id INT,\n  actiune ENUM('INSERT','UPDATE','DELETE'),\n  utilizator VARCHAR(100),\n  data_modificare TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  date_vechi JSON,\n  date_noi JSON\n);",
        language: "sql", expectedOutput: "CREATE TABLE audit_log (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  tabel VARCHAR(50),\n  rand_id INT,\n  actiune ENUM('INSERT','UPDATE','DELETE'),\n  utilizator VARCHAR(100),\n  data_modificare TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  date_vechi JSON,\n  date_noi JSON\n);",
        options: [], answer: "CREATE TABLE audit_log (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  tabel VARCHAR(50),\n  rand_id INT,\n  actiune ENUM('INSERT','UPDATE','DELETE'),\n  utilizator VARCHAR(100),\n  data_modificare TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  date_vechi JSON,\n  date_noi JSON\n);"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru optimistic locking cu câmpul version.",
        starterCode: "-- Citire cu version\nSELECT id, pret, version FROM produse WHERE id = 1;\n-- Actualizare cu verif version\nUPDATE produse\nSET pret = 99, version = version + 1\nWHERE id = 1 AND version = 5;",
        language: "sql", expectedOutput: "-- Citire cu version\nSELECT id, pret, version FROM produse WHERE id = 1;\n-- Actualizare cu verif version\nUPDATE produse\nSET pret = 99, version = version + 1\nWHERE id = 1 AND version = 5;",
        options: [], answer: "-- Citire cu version\nSELECT id, pret, version FROM produse WHERE id = 1;\n-- Actualizare cu verif version\nUPDATE produse\nSET pret = 99, version = version + 1\nWHERE id = 1 AND version = 5;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie pattern-ul temporal table: istoricul modificărilor cu valid_from și valid_to.",
        starterCode: "CREATE TABLE produse_history (\n  id INT,\n  pret DECIMAL(10,2),\n  valid_from TIMESTAMP,\n  valid_to TIMESTAMP DEFAULT '9999-12-31'\n);\n-- Versiunea curenta:\nSELECT * FROM produse_history\nWHERE id = 1 AND valid_to = '9999-12-31';",
        language: "sql", expectedOutput: "CREATE TABLE produse_history (\n  id INT,\n  pret DECIMAL(10,2),\n  valid_from TIMESTAMP,\n  valid_to TIMESTAMP DEFAULT '9999-12-31'\n);\n-- Versiunea curenta:\nSELECT * FROM produse_history\nWHERE id = 1 AND valid_to = '9999-12-31';",
        options: [], answer: "CREATE TABLE produse_history (\n  id INT,\n  pret DECIMAL(10,2),\n  valid_from TIMESTAMP,\n  valid_to TIMESTAMP DEFAULT '9999-12-31'\n);\n-- Versiunea curenta:\nSELECT * FROM produse_history\nWHERE id = 1 AND valid_to = '9999-12-31';"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a restaura un record soft-deleted.",
        starterCode: "-- Restaurare record sters logic:\nUPDATE produse\nSET deleted_at = NULL\nWHERE id = 5 AND deleted_at IS NOT NULL;",
        language: "sql", expectedOutput: "-- Restaurare record sters logic:\nUPDATE produse\nSET deleted_at = NULL\nWHERE id = 5 AND deleted_at IS NOT NULL;",
        options: [], answer: "-- Restaurare record sters logic:\nUPDATE produse\nSET deleted_at = NULL\nWHERE id = 5 AND deleted_at IS NOT NULL;"
      }
    ]
  },
  // ─── 27. SQL in aplicatii Node.js ────────────────────────────────────────
  {
    lessonId: "6a09bb73855b60bc2da6e44e",
    name: "27. SQL in aplicatii Node.js",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Modulul Node.js pentru conexiunea MySQL.\n```js\nconst mysql = require('___');\n```",
        options: [], answer: "mysql2",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Placeholder pentru interogări parametrizate în mysql2.\n```js\nconnection.query('SELECT * FROM users WHERE id = ___', [userId]);\n```",
        options: [], answer: "?",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Pool de conexiuni îmbunătățește performanța.\n```js\nconst pool = mysql.createPool({ ___ : 10 });\n```",
        options: [], answer: "connectionLimit",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: ORM popular pentru Node.js care suportă MySQL/PostgreSQL.\n```js\nconst { Sequelize } = require('___');\n```",
        options: [], answer: "sequelize",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Query builder pentru Node.js.\n```js\nconst db = require('___')('mysql2', config);\n```",
        options: [], answer: "knex",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie codul Node.js pentru o interogare parametrizată cu mysql2.",
        starterCode: "const [rows] = await pool.query(\n  'SELECT * FROM produse WHERE pret > ? AND activ = ?',\n  [100, true]\n);\nconsole.log(rows);",
        language: "sql", expectedOutput: "const [rows] = await pool.query(\n  'SELECT * FROM produse WHERE pret > ? AND activ = ?',\n  [100, true]\n);\nconsole.log(rows);",
        options: [], answer: "const [rows] = await pool.query(\n  'SELECT * FROM produse WHERE pret > ? AND activ = ?',\n  [100, true]\n);\nconsole.log(rows);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie codul Node.js pentru INSERT parametrizat cu mysql2.",
        starterCode: "const [result] = await pool.query(\n  'INSERT INTO produse (nume, pret) VALUES (?, ?)',\n  ['Laptop', 999]\n);\nconsole.log('ID inserat:', result.insertId);",
        language: "sql", expectedOutput: "const [result] = await pool.query(\n  'INSERT INTO produse (nume, pret) VALUES (?, ?)',\n  ['Laptop', 999]\n);\nconsole.log('ID inserat:', result.insertId);",
        options: [], answer: "const [result] = await pool.query(\n  'INSERT INTO produse (nume, pret) VALUES (?, ?)',\n  ['Laptop', 999]\n);\nconsole.log('ID inserat:', result.insertId);"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie codul Node.js pentru tranzacție cu mysql2.",
        starterCode: "const conn = await pool.getConnection();\nawait conn.beginTransaction();\ntry {\n  await conn.query('UPDATE conturi SET sold = sold - 100 WHERE id = 1');\n  await conn.query('UPDATE conturi SET sold = sold + 100 WHERE id = 2');\n  await conn.commit();\n} catch (e) {\n  await conn.rollback();\n} finally {\n  conn.release();\n}",
        language: "sql", expectedOutput: "const conn = await pool.getConnection();\nawait conn.beginTransaction();\ntry {\n  await conn.query('UPDATE conturi SET sold = sold - 100 WHERE id = 1');\n  await conn.query('UPDATE conturi SET sold = sold + 100 WHERE id = 2');\n  await conn.commit();\n} catch (e) {\n  await conn.rollback();\n} finally {\n  conn.release();\n}",
        options: [], answer: "const conn = await pool.getConnection();\nawait conn.beginTransaction();\ntry {\n  await conn.query('UPDATE conturi SET sold = sold - 100 WHERE id = 1');\n  await conn.query('UPDATE conturi SET sold = sold + 100 WHERE id = 2');\n  await conn.commit();\n} catch (e) {\n  await conn.rollback();\n} finally {\n  conn.release();\n}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie codul Node.js cu Prisma pentru a găsi un user după email.",
        starterCode: "const user = await prisma.user.findUnique({\n  where: { email: 'test@example.com' }\n});\nconsole.log(user);",
        language: "sql", expectedOutput: "const user = await prisma.user.findUnique({\n  where: { email: 'test@example.com' }\n});\nconsole.log(user);",
        options: [], answer: "const user = await prisma.user.findUnique({\n  where: { email: 'test@example.com' }\n});\nconsole.log(user);"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie comparația dintre bibliotecile Node.js pentru SQL.",
        starterCode: "SELECT 'mysql2' AS lib, 'Driver direct, rapid' AS descriere\nUNION ALL SELECT 'Sequelize', 'ORM complet, model-based'\nUNION ALL SELECT 'Prisma', 'ORM modern, type-safe'\nUNION ALL SELECT 'Knex', 'Query builder flexibil';",
        language: "sql", expectedOutput: "SELECT 'mysql2' AS lib, 'Driver direct, rapid' AS descriere\nUNION ALL SELECT 'Sequelize', 'ORM complet, model-based'\nUNION ALL SELECT 'Prisma', 'ORM modern, type-safe'\nUNION ALL SELECT 'Knex', 'Query builder flexibil';",
        options: [], answer: "SELECT 'mysql2' AS lib, 'Driver direct, rapid' AS descriere\nUNION ALL SELECT 'Sequelize', 'ORM complet, model-based'\nUNION ALL SELECT 'Prisma', 'ORM modern, type-safe'\nUNION ALL SELECT 'Knex', 'Query builder flexibil';"
      }
    ]
  },
  // ─── 28. SQL in aplicatii Python ─────────────────────────────────────────
  {
    lessonId: "6a09bb76855b60bc2da6e462",
    name: "28. SQL in aplicatii Python",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Biblioteca Python pentru PostgreSQL.\n```python\nimport ___\nconn = psycopg2.connect(dsn)\n```",
        options: [], answer: "psycopg2",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Execută o interogare cu cursor psycopg2.\n```python\ncur = conn.cursor()\ncur.___(\"SELECT * FROM users WHERE id = %s\", (user_id,))\n```",
        options: [], answer: "execute",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Obține toate rezultatele din cursor.\n```python\nrows = cur.___all()\n```",
        options: [], answer: "fetch",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: ORM Python care suportă mai multe baze de date.\n```python\nfrom ___ import create_engine\n```",
        options: [], answer: "sqlalchemy",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Context manager pentru conexiunea automată.\n```python\nwith psycopg2.connect(dsn) as ___:\n  with conn.cursor() as cur:\n    cur.execute(\"SELECT 1\")\n```",
        options: [], answer: "conn",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie codul Python psycopg2 pentru o interogare SELECT parametrizată.",
        starterCode: "import psycopg2\nconn = psycopg2.connect(\"dbname=mydb user=admin\")\ncur = conn.cursor()\ncur.execute(\"SELECT * FROM produse WHERE pret > %s\", (100,))\nrows = cur.fetchall()\nfor row in rows:\n    print(row)\ncur.close()\nconn.close()",
        language: "sql", expectedOutput: "import psycopg2\nconn = psycopg2.connect(\"dbname=mydb user=admin\")\ncur = conn.cursor()\ncur.execute(\"SELECT * FROM produse WHERE pret > %s\", (100,))\nrows = cur.fetchall()\nfor row in rows:\n    print(row)\ncur.close()\nconn.close()",
        options: [], answer: "import psycopg2\nconn = psycopg2.connect(\"dbname=mydb user=admin\")\ncur = conn.cursor()\ncur.execute(\"SELECT * FROM produse WHERE pret > %s\", (100,))\nrows = cur.fetchall()\nfor row in rows:\n    print(row)\ncur.close()\nconn.close()"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie codul Python SQLAlchemy pentru a crea o sesiune și a face un query.",
        starterCode: "from sqlalchemy import create_engine, text\nengine = create_engine('postgresql://user:pass@localhost/mydb')\nwith engine.connect() as conn:\n    result = conn.execute(text(\"SELECT * FROM produse WHERE activ = :activ\"),\n                          {\"activ\": True})\n    for row in result:\n        print(row)",
        language: "sql", expectedOutput: "from sqlalchemy import create_engine, text\nengine = create_engine('postgresql://user:pass@localhost/mydb')\nwith engine.connect() as conn:\n    result = conn.execute(text(\"SELECT * FROM produse WHERE activ = :activ\"),\n                          {\"activ\": True})\n    for row in result:\n        print(row)",
        options: [], answer: "from sqlalchemy import create_engine, text\nengine = create_engine('postgresql://user:pass@localhost/mydb')\nwith engine.connect() as conn:\n    result = conn.execute(text(\"SELECT * FROM produse WHERE activ = :activ\"),\n                          {\"activ\": True})\n    for row in result:\n        print(row)"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie codul Python pentru o tranzacție cu psycopg2.",
        starterCode: "import psycopg2\ntry:\n    conn = psycopg2.connect(\"dbname=mydb\")\n    cur = conn.cursor()\n    cur.execute(\"UPDATE conturi SET sold = sold - 100 WHERE id = 1\")\n    cur.execute(\"UPDATE conturi SET sold = sold + 100 WHERE id = 2\")\n    conn.commit()\nexcept Exception as e:\n    conn.rollback()\n    print(f\"Eroare: {e}\")\nfinally:\n    conn.close()",
        language: "sql", expectedOutput: "import psycopg2\ntry:\n    conn = psycopg2.connect(\"dbname=mydb\")\n    cur = conn.cursor()\n    cur.execute(\"UPDATE conturi SET sold = sold - 100 WHERE id = 1\")\n    cur.execute(\"UPDATE conturi SET sold = sold + 100 WHERE id = 2\")\n    conn.commit()\nexcept Exception as e:\n    conn.rollback()\n    print(f\"Eroare: {e}\")\nfinally:\n    conn.close()",
        options: [], answer: "import psycopg2\ntry:\n    conn = psycopg2.connect(\"dbname=mydb\")\n    cur = conn.cursor()\n    cur.execute(\"UPDATE conturi SET sold = sold - 100 WHERE id = 1\")\n    cur.execute(\"UPDATE conturi SET sold = sold + 100 WHERE id = 2\")\n    conn.commit()\nexcept Exception as e:\n    conn.rollback()\n    print(f\"Eroare: {e}\")\nfinally:\n    conn.close()"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie comparația bibliotecilor Python SQL.",
        starterCode: "SELECT 'psycopg2' AS lib, 'Driver PostgreSQL, rapid' AS descriere\nUNION ALL SELECT 'mysql-connector', 'Driver oficial MySQL'\nUNION ALL SELECT 'SQLAlchemy', 'ORM + Core, multi-DB'\nUNION ALL SELECT 'Django ORM', 'ORM integrat in Django';",
        language: "sql", expectedOutput: "SELECT 'psycopg2' AS lib, 'Driver PostgreSQL, rapid' AS descriere\nUNION ALL SELECT 'mysql-connector', 'Driver oficial MySQL'\nUNION ALL SELECT 'SQLAlchemy', 'ORM + Core, multi-DB'\nUNION ALL SELECT 'Django ORM', 'ORM integrat in Django';",
        options: [], answer: "SELECT 'psycopg2' AS lib, 'Driver PostgreSQL, rapid' AS descriere\nUNION ALL SELECT 'mysql-connector', 'Driver oficial MySQL'\nUNION ALL SELECT 'SQLAlchemy', 'ORM + Core, multi-DB'\nUNION ALL SELECT 'Django ORM', 'ORM integrat in Django';"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie codul Python SQLAlchemy ORM pentru a defini un model Product.",
        starterCode: "from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\nclass Base(DeclarativeBase): pass\nclass Produs(Base):\n    __tablename__ = 'produse'\n    id: Mapped[int] = mapped_column(primary_key=True)\n    nume: Mapped[str]\n    pret: Mapped[float]",
        language: "sql", expectedOutput: "from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\nclass Base(DeclarativeBase): pass\nclass Produs(Base):\n    __tablename__ = 'produse'\n    id: Mapped[int] = mapped_column(primary_key=True)\n    nume: Mapped[str]\n    pret: Mapped[float]",
        options: [], answer: "from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column\nclass Base(DeclarativeBase): pass\nclass Produs(Base):\n    __tablename__ = 'produse'\n    id: Mapped[int] = mapped_column(primary_key=True)\n    nume: Mapped[str]\n    pret: Mapped[float]"
      }
    ]
  },
  // ─── 29. Performance Tuning avansat SQL ──────────────────────────────────
  {
    lessonId: "6a09bb79855b60bc2da6e476",
    name: "29. Performance Tuning avansat SQL",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: PostgreSQL VACUUM curăță rândurile ___ din tabel.\n```sql\n___ ANALYZE produse;\n```",
        options: [], answer: "VACUUM",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: ANALYZE actualizează statisticile ___ pentru query planner.\n```sql\nANALYZE ___;\n```",
        options: [], answer: "produse",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Vista pg_stat cu statistici despre tabele.\n```sql\nSELECT relname, seq_scan, idx_scan\nFROM pg_stat_user___;\n```",
        options: [], answer: "tables",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: Setează work_mem pentru operații de sortare.\n```sql\nSET ___ = '256MB';\n```",
        options: [], answer: "work_mem",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Planul de execuție arată tipul de join folosit (Hash Join, Nested Loop, ___.\n```sql\nEXPLAIN SELECT ...; -- poate afisa: ___ Loop Join\n```",
        options: [], answer: "Merge",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie interogarea PostgreSQL pentru VACUUM ANALYZE pe tabelul comenzi.",
        starterCode: "VACUUM ANALYZE comenzi;",
        language: "sql", expectedOutput: "VACUUM ANALYZE comenzi;",
        options: [], answer: "VACUUM ANALYZE comenzi;"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a identifica tabelele cu cele mai multe sequential scans (fără index).",
        starterCode: "SELECT relname, seq_scan, idx_scan,\n  seq_scan - idx_scan AS diferenta\nFROM pg_stat_user_tables\nWHERE seq_scan > idx_scan\nORDER BY seq_scan DESC;",
        language: "sql", expectedOutput: "SELECT relname, seq_scan, idx_scan,\n  seq_scan - idx_scan AS diferenta\nFROM pg_stat_user_tables\nWHERE seq_scan > idx_scan\nORDER BY seq_scan DESC;",
        options: [], answer: "SELECT relname, seq_scan, idx_scan,\n  seq_scan - idx_scan AS diferenta\nFROM pg_stat_user_tables\nWHERE seq_scan > idx_scan\nORDER BY seq_scan DESC;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a găsi indexurile neutilizate (idx_scan = 0).",
        starterCode: "SELECT indexrelname, idx_scan, idx_tup_read\nFROM pg_stat_user_indexes\nWHERE idx_scan = 0\nORDER BY indexrelname;",
        language: "sql", expectedOutput: "SELECT indexrelname, idx_scan, idx_tup_read\nFROM pg_stat_user_indexes\nWHERE idx_scan = 0\nORDER BY indexrelname;",
        options: [], answer: "SELECT indexrelname, idx_scan, idx_tup_read\nFROM pg_stat_user_indexes\nWHERE idx_scan = 0\nORDER BY indexrelname;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a verifica dimensiunea tabelelor.",
        starterCode: "SELECT\n  table_name,\n  pg_size_pretty(pg_total_relation_size(table_name::text)) AS dimensiune\nFROM information_schema.tables\nWHERE table_schema = 'public'\nORDER BY pg_total_relation_size(table_name::text) DESC;",
        language: "sql", expectedOutput: "SELECT\n  table_name,\n  pg_size_pretty(pg_total_relation_size(table_name::text)) AS dimensiune\nFROM information_schema.tables\nWHERE table_schema = 'public'\nORDER BY pg_total_relation_size(table_name::text) DESC;",
        options: [], answer: "SELECT\n  table_name,\n  pg_size_pretty(pg_total_relation_size(table_name::text)) AS dimensiune\nFROM information_schema.tables\nWHERE table_schema = 'public'\nORDER BY pg_total_relation_size(table_name::text) DESC;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea pentru a găsi query-urile lente cu pg_stat_statements.",
        starterCode: "SELECT query, calls, total_exec_time, mean_exec_time\nFROM pg_stat_statements\nORDER BY mean_exec_time DESC\nLIMIT 10;",
        language: "sql", expectedOutput: "SELECT query, calls, total_exec_time, mean_exec_time\nFROM pg_stat_statements\nORDER BY mean_exec_time DESC\nLIMIT 10;",
        options: [], answer: "SELECT query, calls, total_exec_time, mean_exec_time\nFROM pg_stat_statements\nORDER BY mean_exec_time DESC\nLIMIT 10;"
      }
    ]
  },
  // ─── 30. Mini Proiect SQL Final — Schema E-Commerce ──────────────────────
  {
    lessonId: "6a09bb7c855b60bc2da6e48a",
    name: "30. Mini Proiect SQL Final — Schema E-Commerce",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează: Tabelul de plăți are FK spre ___.\n```sql\nCREATE TABLE plati (\n  id INT PRIMARY KEY,\n  comanda_id INT,\n  FOREIGN KEY (comanda_id) REFERENCES ___(id)\n);\n```",
        options: [], answer: "comenzi",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează: Starea plății poate fi ENUM.\n```sql\nstatus ENUM('pending', 'completed', '___') DEFAULT 'pending'\n```",
        options: [], answer: "failed",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează: Raportul de vânzări grupează după ___.\n```sql\nSELECT MONTH(data) AS luna, SUM(total)\nFROM comenzi\nGROUP BY ___(data);\n```",
        options: [], answer: "MONTH",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează: LEFT JOIN include și clientii fără comenzi.\n```sql\nSELECT c.email, COUNT(o.id)\nFROM clienti c\n___ JOIN comenzi o ON c.id = o.client_id\nGROUP BY c.id;\n```",
        options: [], answer: "LEFT",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează: Scade stocul la plasarea comenzii.\n```sql\nUPDATE produse SET stoc = stoc - ___\nWHERE id = produs_id;\n```",
        options: [], answer: "cantitate",
        starterCode: "", language: "sql", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie schema SQL completă pentru e-commerce: utilizatori, produse, comenzi, detalii_comanda, plati.",
        starterCode: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL\n);\nCREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  stoc INT DEFAULT 0\n);\nCREATE TABLE comenzi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  utilizator_id INT NOT NULL,\n  total DECIMAL(10,2),\n  status VARCHAR(20) DEFAULT 'pending',\n  FOREIGN KEY (utilizator_id) REFERENCES utilizatori(id)\n);\nCREATE TABLE detalii_comanda (\n  comanda_id INT, produs_id INT,\n  cantitate INT, pret_unitar DECIMAL(10,2),\n  PRIMARY KEY (comanda_id, produs_id)\n);\nCREATE TABLE plati (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  comanda_id INT,\n  metoda VARCHAR(50),\n  status ENUM('pending','completed','failed') DEFAULT 'pending',\n  FOREIGN KEY (comanda_id) REFERENCES comenzi(id)\n);",
        language: "sql", expectedOutput: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL\n);\nCREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  stoc INT DEFAULT 0\n);\nCREATE TABLE comenzi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  utilizator_id INT NOT NULL,\n  total DECIMAL(10,2),\n  status VARCHAR(20) DEFAULT 'pending',\n  FOREIGN KEY (utilizator_id) REFERENCES utilizatori(id)\n);\nCREATE TABLE detalii_comanda (\n  comanda_id INT, produs_id INT,\n  cantitate INT, pret_unitar DECIMAL(10,2),\n  PRIMARY KEY (comanda_id, produs_id)\n);\nCREATE TABLE plati (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  comanda_id INT,\n  metoda VARCHAR(50),\n  status ENUM('pending','completed','failed') DEFAULT 'pending',\n  FOREIGN KEY (comanda_id) REFERENCES comenzi(id)\n);",
        options: [], answer: "CREATE TABLE utilizatori (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL\n);\nCREATE TABLE produse (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  nume VARCHAR(100) NOT NULL,\n  pret DECIMAL(10,2),\n  stoc INT DEFAULT 0\n);\nCREATE TABLE comenzi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  utilizator_id INT NOT NULL,\n  total DECIMAL(10,2),\n  status VARCHAR(20) DEFAULT 'pending',\n  FOREIGN KEY (utilizator_id) REFERENCES utilizatori(id)\n);\nCREATE TABLE detalii_comanda (\n  comanda_id INT, produs_id INT,\n  cantitate INT, pret_unitar DECIMAL(10,2),\n  PRIMARY KEY (comanda_id, produs_id)\n);\nCREATE TABLE plati (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  comanda_id INT,\n  metoda VARCHAR(50),\n  status ENUM('pending','completed','failed') DEFAULT 'pending',\n  FOREIGN KEY (comanda_id) REFERENCES comenzi(id)\n);"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru raportul de vânzări lunare.",
        starterCode: "SELECT\n  YEAR(data) AS an,\n  MONTH(data) AS luna,\n  COUNT(*) AS nr_comenzi,\n  SUM(total) AS vanzari\nFROM comenzi\nWHERE status = 'completed'\nGROUP BY YEAR(data), MONTH(data)\nORDER BY an, luna;",
        language: "sql", expectedOutput: "SELECT\n  YEAR(data) AS an,\n  MONTH(data) AS luna,\n  COUNT(*) AS nr_comenzi,\n  SUM(total) AS vanzari\nFROM comenzi\nWHERE status = 'completed'\nGROUP BY YEAR(data), MONTH(data)\nORDER BY an, luna;",
        options: [], answer: "SELECT\n  YEAR(data) AS an,\n  MONTH(data) AS luna,\n  COUNT(*) AS nr_comenzi,\n  SUM(total) AS vanzari\nFROM comenzi\nWHERE status = 'completed'\nGROUP BY YEAR(data), MONTH(data)\nORDER BY an, luna;"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru top 5 produse cel mai vândute.",
        starterCode: "SELECT p.nume, SUM(dc.cantitate) AS total_vandut\nFROM detalii_comanda dc\nJOIN produse p ON dc.produs_id = p.id\nGROUP BY p.id\nORDER BY total_vandut DESC\nLIMIT 5;",
        language: "sql", expectedOutput: "SELECT p.nume, SUM(dc.cantitate) AS total_vandut\nFROM detalii_comanda dc\nJOIN produse p ON dc.produs_id = p.id\nGROUP BY p.id\nORDER BY total_vandut DESC\nLIMIT 5;",
        options: [], answer: "SELECT p.nume, SUM(dc.cantitate) AS total_vandut\nFROM detalii_comanda dc\nJOIN produse p ON dc.produs_id = p.id\nGROUP BY p.id\nORDER BY total_vandut DESC\nLIMIT 5;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL cu window function pentru ranking clienților după valoarea totală.",
        starterCode: "SELECT\n  u.email,\n  SUM(c.total) AS total,\n  RANK() OVER (ORDER BY SUM(c.total) DESC) AS rang\nFROM utilizatori u\nJOIN comenzi c ON u.id = c.utilizator_id\nGROUP BY u.id;",
        language: "sql", expectedOutput: "SELECT\n  u.email,\n  SUM(c.total) AS total,\n  RANK() OVER (ORDER BY SUM(c.total) DESC) AS rang\nFROM utilizatori u\nJOIN comenzi c ON u.id = c.utilizator_id\nGROUP BY u.id;",
        options: [], answer: "SELECT\n  u.email,\n  SUM(c.total) AS total,\n  RANK() OVER (ORDER BY SUM(c.total) DESC) AS rang\nFROM utilizatori u\nJOIN comenzi c ON u.id = c.utilizator_id\nGROUP BY u.id;"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie interogarea SQL pentru a găsi produsele cu stoc scăzut și trimite alertă (sub 5 unități).",
        starterCode: "SELECT id, nume, stoc,\n  CASE\n    WHEN stoc = 0 THEN 'EPUIZAT'\n    WHEN stoc < 5 THEN 'CRITIC'\n    ELSE 'OK'\n  END AS status_stoc\nFROM produse\nWHERE stoc < 5\nORDER BY stoc ASC;",
        language: "sql", expectedOutput: "SELECT id, nume, stoc,\n  CASE\n    WHEN stoc = 0 THEN 'EPUIZAT'\n    WHEN stoc < 5 THEN 'CRITIC'\n    ELSE 'OK'\n  END AS status_stoc\nFROM produse\nWHERE stoc < 5\nORDER BY stoc ASC;",
        options: [], answer: "SELECT id, nume, stoc,\n  CASE\n    WHEN stoc = 0 THEN 'EPUIZAT'\n    WHEN stoc < 5 THEN 'CRITIC'\n    ELSE 'OK'\n  END AS status_stoc\nFROM produse\nWHERE stoc < 5\nORDER BY stoc ASC;"
      }
    ]
  }
];

async function main() {
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({ where: { lessonId: fix.lessonId, number: { gte: 6 } } });
    await prisma.task.createMany({ data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId })) });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
