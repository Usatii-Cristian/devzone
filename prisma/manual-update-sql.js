"use strict";
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const updates = [
  {
    id: "6a0b52b91419ceefc02454bf",
    title: "CTE Recursiv — parcurgi ierarhii",
    content: `Un **CTE recursiv** (Common Table Expression recursiv) este o tehnică SQL avansată care îți permite să parcurgi structuri ierarhice — arbori de categorii, organigramă, lanțuri de dependențe — fără să știi dinainte adâncimea ierarhiei.

**Anatomia unui CTE recursiv**

Un CTE recursiv are întotdeauna două părți obligatorii, unite cu \`UNION ALL\`:
• **Ancoră (anchor member)** — interogarea de bază, returnează rândul/rândurile de start (de obicei rădăcina ierarhiei)
• **Parte recursivă** — se referă la CTE-ul însuși și adaugă un nivel în plus la fiecare iterație

\`\`\`sql
WITH RECURSIVE nume_cte AS (
  -- 1. Ancora: punctul de start
  SELECT id, nume, parinte_id, 0 AS nivel
  FROM categorii
  WHERE parinte_id IS NULL          -- radacina

  UNION ALL

  -- 2. Recursiv: adauga cate un nivel
  SELECT c.id, c.nume, c.parinte_id, cte.nivel + 1
  FROM categorii c
  INNER JOIN nume_cte cte ON c.parinte_id = cte.id
)
SELECT * FROM nume_cte ORDER BY nivel, nume;
\`\`\`

**Exemplu real: organigramă companie**

Imaginează-ți o tabelă de angajați unde fiecare angajat are un manager:

\`\`\`sql
CREATE TABLE angajati (
  id INT PRIMARY KEY,
  nume VARCHAR(100),
  manager_id INT REFERENCES angajati(id),
  departament VARCHAR(50)
);

-- Găsește întregul lanț de raportare pornind de la CEO
WITH RECURSIVE org_chart AS (
  -- Ancora: CEO-ul (fără manager)
  SELECT id, nume, manager_id, 0 AS nivel,
         CAST(nume AS VARCHAR(500)) AS cale
  FROM angajati
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursiv: adaugă subordonații
  SELECT a.id, a.nume, a.manager_id,
         oc.nivel + 1,
         CONCAT(oc.cale, ' -> ', a.nume)
  FROM angajati a
  INNER JOIN org_chart oc ON a.manager_id = oc.id
)
SELECT nivel, REPEAT('  ', nivel) || nume AS structura, cale
FROM org_chart
ORDER BY cale;
\`\`\`

**Exemplu: suma într-o ierarhie de categorii (e-commerce)**

\`\`\`sql
-- Categorii cu subcategorii și numărul total de produse (inclusiv din subcategorii)
WITH RECURSIVE cat_tree AS (
  SELECT id, nume, parinte_id, id AS root_id
  FROM categorii
  UNION ALL
  SELECT c.id, c.nume, c.parinte_id, ct.root_id
  FROM categorii c
  JOIN cat_tree ct ON c.parinte_id = ct.id
)
SELECT ct.root_id,
       cat.nume AS categorie_radacina,
       COUNT(p.id) AS total_produse
FROM cat_tree ct
JOIN categorii cat ON cat.id = ct.root_id
LEFT JOIN produse p ON p.categorie_id = ct.id
GROUP BY ct.root_id, cat.nume
ORDER BY total_produse DESC;
\`\`\`

**Controlul adâncimii (protecție la bucle infinite)**

Dacă datele au cicluri (A → B → A), CTE-ul va rula la infinit. Protejează-te cu un contor de nivel:

\`\`\`sql
WITH RECURSIVE ierarhie AS (
  SELECT id, parinte_id, nume, 1 AS nivel
  FROM noduri WHERE id = 1

  UNION ALL

  SELECT n.id, n.parinte_id, n.nume, i.nivel + 1
  FROM noduri n
  JOIN ierarhie i ON n.parinte_id = i.id
  WHERE i.nivel < 10   -- limita de adancime: max 10 niveluri
)
SELECT * FROM ierarhie;
\`\`\`

**Greșeli comune și cum să le eviți**

• **Uiți \`UNION ALL\`** — dacă folosești \`UNION\` (fără ALL), SQL va deduplica la fiecare iterație, ceea ce e extrem de lent și poate schimba rezultatele
• **Nu pui condiție de oprire** — recursivitatea trebuie să conveargă; asigură-te că relația \`parinte_id → id\` are întotdeauna un capăt (\`NULL\` sau o valoare santinelă)
• **Referință la CTE în subquery** — în MySQL, CTE-ul recursiv nu poate fi referit de mai multe ori în partea recursivă; folosește un JOIN simplu
• **Performanță pe ierarhii mari** — pentru >100.000 noduri, consideră stocarea adâncimii ca coloană materializată sau folosește extensia \`ltree\` (PostgreSQL)

**Când folosești CTE recursiv vs alte metode**

• **CTE recursiv** — ierarhii necunoscute ca adâncime, cod lizibil, date relativ mici
• **Nested Sets** — citiri frecvente, scrieri rare, performanță maximă la SELECT
• **Adjacency List + JOIN multiplu** — când știi exact adâncimea maximă (ex: max 3 niveluri)`,
  },
  {
    id: "6a0b52ce1419ceefc0245541",
    title: "Introducere în Window Functions",
    content: `**Window Functions** (funcții de fereastră) sunt unele dintre cele mai puternice unelte din SQL modern. Spre deosebire de \`GROUP BY\` care colapsează rândurile în grupuri, window functions calculează valori *pentru fiecare rând în parte*, păstrând toate rândurile vizibile în rezultat.

**Metafora ferestrei**

Imaginează-ți că ești la un birou cu o fereastră. Prin fereastră poți vedea o porțiune din stradă (fereastra ta de calcul). Poți analiza ce se întâmplă în acea porțiune fără să "distrugi" restul strazii — toate rândurile rămân intacte.

**Sintaxa generală**

\`\`\`sql
functie_window() OVER (
  PARTITION BY coloana_grupare    -- optional: imparte datele in grupe
  ORDER BY coloana_ordonare       -- optional: ordinea in fereastra
  ROWS/RANGE BETWEEN ... AND ...  -- optional: dimensiunea ferestrei
)
\`\`\`

**Categorii de window functions**

• **Funcții de rang**: \`ROW_NUMBER()\`, \`RANK()\`, \`DENSE_RANK()\`, \`NTILE(n)\`
• **Funcții analitice**: \`LAG()\`, \`LEAD()\`, \`FIRST_VALUE()\`, \`LAST_VALUE()\`
• **Funcții agregate ca window**: \`SUM()\`, \`AVG()\`, \`COUNT()\`, \`MIN()\`, \`MAX()\`

**Exemplu 1: ROW_NUMBER — numără rândurile**

\`\`\`sql
-- Clasamentul angajatilor dupa salariu, pe departament
SELECT
  nume,
  departament,
  salariu,
  ROW_NUMBER() OVER (
    PARTITION BY departament
    ORDER BY salariu DESC
  ) AS rang_in_departament
FROM angajati;

-- Rezultat:
-- Ana | IT | 8000 | 1
-- Ion | IT | 7500 | 2
-- Maria | HR | 6000 | 1
-- Petre | HR | 5500 | 2
\`\`\`

**Exemplu 2: SUM cumulativ — running total**

\`\`\`sql
-- Vanzari zilnice cu total cumulativ
SELECT
  data_vanzare,
  suma,
  SUM(suma) OVER (
    ORDER BY data_vanzare
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS total_cumulativ,
  AVG(suma) OVER (
    ORDER BY data_vanzare
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS medie_7_zile
FROM vanzari
ORDER BY data_vanzare;
\`\`\`

**Exemplu 3: LAG și LEAD — compară cu rândul anterior/următor**

\`\`\`sql
-- Cresterea procentuala a vanzarilor fata de luna precedenta
SELECT
  luna,
  vanzari,
  LAG(vanzari, 1) OVER (ORDER BY luna) AS vanzari_luna_trecuta,
  ROUND(
    (vanzari - LAG(vanzari, 1) OVER (ORDER BY luna))
    / LAG(vanzari, 1) OVER (ORDER BY luna) * 100, 2
  ) AS crestere_procentuala
FROM vanzari_lunare;
\`\`\`

**Exemplu 4: PARTITION BY — grupare fără GROUP BY**

\`\`\`sql
-- Procentul din totalul departamentului pentru fiecare angajat
SELECT
  nume,
  departament,
  salariu,
  SUM(salariu) OVER (PARTITION BY departament) AS total_departament,
  ROUND(salariu * 100.0 /
    SUM(salariu) OVER (PARTITION BY departament), 2) AS procent
FROM angajati
ORDER BY departament, salariu DESC;
\`\`\`

**Diferența cheie față de GROUP BY**

\`\`\`sql
-- GROUP BY: collapseaza randurile (pierzi detaliile)
SELECT departament, AVG(salariu) FROM angajati GROUP BY departament;
-- → 2 randuri (IT: 7750, HR: 5750)

-- Window function: pastreaza toate randurile
SELECT nume, departament, salariu,
       AVG(salariu) OVER (PARTITION BY departament) AS medie_dept
FROM angajati;
-- → 4 randuri, fiecare cu media departamentului alaturat
\`\`\`

**Greșeli comune**

• **Window functions în WHERE** — nu poți folosi o window function direct în \`WHERE\` sau \`HAVING\`; folosește un subquery sau CTE
• **Confuzia ROWS vs RANGE** — \`ROWS\` numără rânduri fizice, \`RANGE\` numără valori distincte; diferă când există duplicate
• **ORDER BY lipsă în funcții de rang** — fără \`ORDER BY\` în \`OVER()\`, \`ROW_NUMBER()\` returnează ordine nedefinită
• **Performanță** — window functions pot fi costisitoare pe tabele mari; adaugă indecși pe coloanele din \`PARTITION BY\` și \`ORDER BY\``,
  },
  {
    id: "6a0b52d11419ceefc0245555",
    title: "CTE recursiv — structuri ierarhice",
    content: `**CTE-urile recursive** sunt instrumentul ideal pentru a lucra cu date organizate ierarhic în SQL. Orice structură de tip arbore — categorii cu subcategorii, foldere cu subfoldere, comentarii cu răspunsuri, lanțuri de aprovizionare — poate fi parcursă elegant cu un CTE recursiv.

**De ce ai nevoie de CTE recursiv?**

Înainte de CTE recursive, pentru a parcurge o ierarhie trebuia să știi exact adâncimea și să scrii JOIN-uri înlănțuite manual:

\`\`\`sql
-- Abordarea veche (funcționează doar pentru 3 niveluri fixe)
SELECT t1.id, t1.nume, t2.nume AS nivel2, t3.nume AS nivel3
FROM categorii t1
LEFT JOIN categorii t2 ON t2.parinte_id = t1.id
LEFT JOIN categorii t3 ON t3.parinte_id = t2.id
WHERE t1.parinte_id IS NULL;
-- Nu functioneaza daca ierarhia are 4, 5... n niveluri
\`\`\`

Cu CTE recursiv, nu mai contează adâncimea:

\`\`\`sql
-- Abordarea moderna cu CTE recursiv
WITH RECURSIVE arbore AS (
  -- Ancora: nivelul 0 (radacinile)
  SELECT id, nume, parinte_id, 0 AS adancime,
         CAST(id AS CHAR(200)) AS cale_id
  FROM categorii
  WHERE parinte_id IS NULL

  UNION ALL

  -- Recursiv: adauga urmatorul nivel
  SELECT c.id, c.nume, c.parinte_id,
         a.adancime + 1,
         CONCAT(a.cale_id, '/', c.id)
  FROM categorii c
  INNER JOIN arbore a ON c.parinte_id = a.id
)
SELECT REPEAT('  ', adancime) || nume AS ierarhie_vizuala,
       adancime, cale_id
FROM arbore
ORDER BY cale_id;
\`\`\`

**Caz practic: sistem de comentarii nested (Reddit-style)**

\`\`\`sql
CREATE TABLE comentarii (
  id SERIAL PRIMARY KEY,
  continut TEXT NOT NULL,
  autor VARCHAR(100),
  parinte_id INT REFERENCES comentarii(id),
  creat_la TIMESTAMP DEFAULT NOW(),
  like_uri INT DEFAULT 0
);

-- Afiseaza tot thread-ul unui comentariu, cu indentare
WITH RECURSIVE thread AS (
  SELECT id, continut, autor, parinte_id, like_uri,
         0 AS nivel, ARRAY[id] AS cale
  FROM comentarii
  WHERE id = 42    -- comentariul radacina

  UNION ALL

  SELECT c.id, c.continut, c.autor, c.parinte_id, c.like_uri,
         t.nivel + 1,
         t.cale || c.id
  FROM comentarii c
  INNER JOIN thread t ON c.parinte_id = t.id
)
SELECT nivel,
       REPEAT('  ', nivel) || autor || ': ' || LEFT(continut, 50) AS preview,
       like_uri
FROM thread
ORDER BY cale;
\`\`\`

**Calcularea sumelor aggregate prin ierarhie**

\`\`\`sql
-- Buget total pe departament (inclusiv subdepartamente)
WITH RECURSIVE dept_tree AS (
  SELECT id, nume, parinte_id, buget
  FROM departamente
  WHERE id = 1   -- departamentul de start

  UNION ALL

  SELECT d.id, d.nume, d.parinte_id, d.buget
  FROM departamente d
  INNER JOIN dept_tree dt ON d.parinte_id = dt.id
)
SELECT
  SUM(buget) AS buget_total_incluzand_subdepartamente,
  COUNT(*) AS numar_departamente
FROM dept_tree;
\`\`\`

**Găsirea căii dintre două noduri**

\`\`\`sql
-- Calea de la un angajat pana la CEO
WITH RECURSIVE cale_sus AS (
  SELECT id, nume, manager_id, 0 AS pas
  FROM angajati
  WHERE id = 15   -- angajatul de start

  UNION ALL

  SELECT a.id, a.nume, a.manager_id, cs.pas + 1
  FROM angajati a
  INNER JOIN cale_sus cs ON a.id = cs.manager_id
)
SELECT pas, nume FROM cale_sus ORDER BY pas;
\`\`\`

**Performanță și indexare**

• **Indexează coloana de relație**: \`CREATE INDEX ON categorii(parinte_id)\` — esențial pentru performanță
• **Limitează adâncimea**: adaugă \`WHERE nivel < 20\` ca protecție
• **Materializează ierarhia des accesată**: pentru date statice, precalculează și stochează calea ca string (\`/1/3/7/\`)

**Greșeli comune**

• **UNION în loc de UNION ALL** — cauzează deduplicare la fiecare iterație, scade dramatic performanța
• **Cicluri în date** — dacă un nod e propriul său părinte (sau bunic), CTE rulează la infinit; protejează cu limita de nivel
• **Coloane necasts** — în unele dialecte SQL, coloanele din ancoră trebuie să aibă tipul explicit pentru coloanele calculate (CAST)`,
  },
  {
    id: "6a077318b06306c6cc4479ae",
    title: "Optimizări practice și anti-pattern-uri",
    content: `Performanța unui query SQL se poate îmbunătăți dramatic prin câteva tehnici bine înțelese. Diferența dintre un query care rulează 10 secunde și unul care rulează 10 milisecunde este adesea o chestiune de cunoaștere a anti-pattern-urilor și a optimizărilor corecte.

**Anti-pattern 1: SELECT * în producție**

\`SELECT *\` pare convenabil, dar trage toate coloanele, inclusiv \`TEXT\` sau \`BLOB\` mari, prin rețea, chiar dacă nu le folosești:

\`\`\`sql
-- Rau: trage toate coloanele (poate include descrieri de 10KB)
SELECT * FROM produse WHERE categorie = 'electronics';

-- Bun: ia doar ce ai nevoie
SELECT id, nume, pret, stoc
FROM produse
WHERE categorie = 'electronics';
\`\`\`

**Anti-pattern 2: funcții pe coloane indexate în WHERE**

Aplicarea unei funcții pe o coloană indexată **distruge** indexul — DB-ul nu poate folosi indexul B-tree:

\`\`\`sql
-- Indexul pe data_creare nu e folosit!
SELECT * FROM comenzi WHERE YEAR(data_creare) = 2024;
SELECT * FROM utilizatori WHERE LOWER(email) = 'test@ex.com';

-- Rescrie fara functie pe coloana indexata
SELECT * FROM comenzi
WHERE data_creare BETWEEN '2024-01-01' AND '2024-12-31';

-- Sau index functional (PostgreSQL)
CREATE INDEX ON utilizatori(LOWER(email));
SELECT * FROM utilizatori WHERE LOWER(email) = 'test@ex.com';
\`\`\`

**Anti-pattern 3: N+1 queries**

Cel mai costisitor pattern — faci un query pentru a lua o listă, apoi câte un query pentru fiecare element:

\`\`\`sql
-- N+1: 1 query pentru comenzi + N query-uri pentru clienti
SELECT id, client_id FROM comenzi LIMIT 100;
-- Apoi in aplicatie: SELECT * FROM clienti WHERE id = 1;
-- SELECT * FROM clienti WHERE id = 2; ... (de 100 ori)

-- Un singur query cu JOIN
SELECT c.id, c.total, cl.nume, cl.email
FROM comenzi c
INNER JOIN clienti cl ON cl.id = c.client_id
LIMIT 100;
\`\`\`

**Anti-pattern 4: OR pe coloane indexate diferit**

\`OR\` între coloane diferite forțează un table scan complet:

\`\`\`sql
-- Nu poate folosi indexii individuali eficient
SELECT * FROM produse WHERE categorie = 'IT' OR pret < 100;

-- UNION ALL: fiecare branch foloseste indexul sau
SELECT * FROM produse WHERE categorie = 'IT'
UNION ALL
SELECT * FROM produse WHERE pret < 100
  AND categorie != 'IT';  -- evita duplicate
\`\`\`

**Optimizare: indecși compositi — ordinea contează**

\`\`\`sql
-- Query frecvent:
SELECT * FROM comenzi
WHERE status = 'pending' AND client_id = 42
ORDER BY data_creare DESC;

-- Index compus in ordinea corecta: egalitate primul, range la final
CREATE INDEX idx_comenzi_status_client_data
ON comenzi(status, client_id, data_creare DESC);
-- Regula: coloane cu egalitate (=) -> coloane cu range (<, >) -> ORDER BY
\`\`\`

**Optimizare: covering index (index acoperitor)**

Dacă toate coloanele din query sunt în index, DB-ul nu mai accesează tabelul deloc:

\`\`\`sql
-- Query care citeste doar id, status, total
SELECT id, status, total FROM comenzi WHERE client_id = 42;

-- Index acoperitor: include TOATE coloanele din SELECT + WHERE
CREATE INDEX idx_covering ON comenzi(client_id) INCLUDE (status, total, id);
-- PostgreSQL: INCLUDE; MySQL: adauga coloanele in index direct
\`\`\`

**Optimizare: paginare eficientă cu keyset**

\`OFFSET\` mare este lent — DB-ul citește și aruncă mii de rânduri:

\`\`\`sql
-- Lent la pagina 1000 (OFFSET 99000 scaneaza 99000 randuri)
SELECT * FROM produse ORDER BY id LIMIT 100 OFFSET 99000;

-- Keyset pagination: foloseste ultimul ID din pagina anterioara
SELECT * FROM produse
WHERE id > 99000
ORDER BY id
LIMIT 100;
\`\`\`

**Greșeli comune**

• **Over-indexing** — fiecare index încetinește INSERT/UPDATE/DELETE; indexează doar coloanele din WHERE, JOIN, ORDER BY ale query-urilor frecvente
• **Ignorarea EXPLAIN** — rulează \`EXPLAIN ANALYZE\` înainte și după orice optimizare ca să confirmi îmbunătățirea
• **Subquery corelat în SELECT** — un subquery corelat rulează o dată pentru fiecare rând; înlocuiește cu LEFT JOIN
• **DISTINCT inutil** — \`SELECT DISTINCT\` ascunde probleme de JOIN care produc duplicate; repară JOIN-ul, nu masca problema`,
  },
  {
    id: "6a077313b06306c6cc447990",
    title: "Tipuri de date — alege corect pentru performanță",
    content: `Alegerea tipului de date potrivit în SQL nu este doar o chestiune de corectitudine — afectează direct dimensiunea tabelei, viteza query-urilor și integritatea datelor. Un tip greșit poate dubla sau tripla spațiul pe disc și poate face indexurile ineficiente.

**Tipuri numerice — cel mai mic tip suficient**

\`\`\`sql
-- Alege tipul cel mai mic care acopera valorile posibile
CREATE TABLE produse (
  id         INT UNSIGNED,        -- 0 la 4 miliarde (4 bytes)
  -- vs BIGINT: 0 la 18 trilioane (8 bytes) -- nu ai nevoie
  stoc       SMALLINT UNSIGNED,   -- 0 la 65535 (2 bytes) -- suficient pt stoc
  pret       DECIMAL(10, 2),      -- exact, nu aproximat! (bani = DECIMAL)
  discount   FLOAT,               -- aproximat, ok pt procente si statistici
  rating     TINYINT UNSIGNED     -- 0-5 (1 byte) -- nu INT!
);
\`\`\`

**DECIMAL vs FLOAT vs DOUBLE — regula de aur**

\`\`\`sql
-- FLOAT pentru bani este periculos din cauza erorilor de rotunjire
SELECT 0.1 + 0.2;  -- → 0.30000000000000004 in multe DB-uri!

-- DECIMAL pentru bani, preturi, cantitati exacte
CREATE TABLE facturi (
  total        DECIMAL(15, 2),   -- pana la 999.999.999.999.99
  tva_procent  DECIMAL(5, 4),    -- 0.1900 = 19%
  suma_tva     DECIMAL(15, 2)
);

-- FLOAT/DOUBLE: ok pentru coordonate GPS, scoruri ML, statistici
CREATE TABLE locatii (
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION
);
\`\`\`

**Tipuri pentru text — VARCHAR vs TEXT vs CHAR**

\`\`\`sql
CREATE TABLE utilizatori (
  -- CHAR(n): lungime FIXA, completat cu spatii — pt coduri standard
  cod_tara    CHAR(2),         -- 'RO', 'US' — mereu 2 caractere
  cod_postal  CHAR(6),         -- '010101' — mereu 6 caractere

  -- VARCHAR(n): lungime VARIABILA, max n caractere — pt stringuri scurte
  email       VARCHAR(255),    -- max 255 chars, stocheaza cat e necesar
  nume        VARCHAR(100),
  titlu       VARCHAR(500),

  -- TEXT: fara limita practica — pt continut lung, NU indexabil usor
  descriere   TEXT,            -- articole, bio, continut HTML
  continut    LONGTEXT         -- MySQL: pana la 4GB
);
-- Regula: VARCHAR pt <8KB indexabil, TEXT pt continut lung
\`\`\`

**Tipuri pentru date și timp**

\`\`\`sql
CREATE TABLE evenimente (
  -- DATE: doar data (YYYY-MM-DD) — 3 bytes
  data_nastere  DATE,

  -- TIME: doar ora (HH:MM:SS) — 3 bytes
  ora_start     TIME,

  -- DATETIME/TIMESTAMP: data + ora
  creat_la      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- TIMESTAMP: 4 bytes, range 1970-2038 (UTC, auto-convertit)
  -- DATETIME: 8 bytes, range 1000-9999 (fara timezone)

  -- Foloseste TIMESTAMP pt evenimente (auto-timezone conversion)
  -- Foloseste DATETIME pt date independente de timezone (aniversari)
  modificat_la  TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

**Tipuri pentru valori categorice — ENUM vs VARCHAR**

\`\`\`sql
-- ENUM: eficient pentru seturi mici fixe (1-2 bytes)
CREATE TABLE comenzi (
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')
    DEFAULT 'pending'
);
-- ENUM: mai rapid, mai mic, validare automată
-- Dezavantaj ENUM: greu de modificat (ALTER TABLE pt fiecare valoare nouă)

-- VARCHAR alternativa flexibila cu CHECK constraint
status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'shipped'))
\`\`\`

**Boolean și NULL — capcanele**

\`\`\`sql
-- BOOLEAN (MySQL: TINYINT(1), PostgreSQL: BOOLEAN)
activ     BOOLEAN DEFAULT TRUE,
verificat BOOLEAN DEFAULT FALSE,

-- Evita NULL pentru campuri logice — foloseste DEFAULT
-- NULL inseamna "necunoscut", nu "fals"
-- NULL != NULL in comparatii — foloseste IS NULL, nu = NULL

-- Exemplu de capcana cu NULL in calcule:
SELECT 100 + NULL;   -- → NULL (nu 100!)
SELECT NULL = NULL;  -- → NULL (nu TRUE!)
SELECT NULL IS NULL; -- → TRUE (forma corecta)
\`\`\`

**Alegerea cheii primare — UUID vs INT vs BIGINT**

\`\`\`sql
-- INT UNSIGNED: simplu, compact (4 bytes), max 4 miliarde de randuri
CREATE TABLE log_events (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, ...);

-- BIGINT UNSIGNED: pentru tabele mari (8 bytes), max 18 trilioane
CREATE TABLE clickstream (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, ...);

-- UUID: portabil, distribuit, fara coliziuni (16 bytes, mai lent la JOIN)
CREATE TABLE sesiuni (id CHAR(36) DEFAULT (UUID()) PRIMARY KEY, ...);
-- PostgreSQL: id UUID DEFAULT gen_random_uuid() PRIMARY KEY
\`\`\`

**Greșeli comune**

• **INT pentru ID când ai milioane de înregistrări** — treci la BIGINT din start sau vei face ALTER TABLE pe o tabelă uriașă
• **VARCHAR(255) pentru tot** — VARCHAR mare consumă mai mult în indecși și memorie temporară; dimensionează realist
• **FLOAT pentru bani** — produce erori de rotunjire invizibile; mereu DECIMAL pentru valori financiare
• **DATETIME în loc de TIMESTAMP** — dacă ai utilizatori din mai multe timezone-uri, TIMESTAMP convertit la UTC e esențial
• **NULL overuse** — NULL propagă în calcule (\`NULL + 1 = NULL\`); folosește DEFAULT acolo unde poți`,
  },
];

async function main() {
  console.log(`Updating ${updates.length} SQL sections with manual 10/10 content...`);
  for (const u of updates) {
    await p.theory.update({
      where: { id: u.id },
      data: { content: u.content },
    });
    console.log(`✓ ${u.title} — ${u.content.length} chars`);
  }
  await p.$disconnect();
  console.log("Done.");
}
main().catch(console.error);
