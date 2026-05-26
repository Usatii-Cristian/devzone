"use strict";
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

const updates = [
  {
    id: "6a0b53051419ceefc0245699",
    title: "Variabile și tipuri de date — PHP tipizat dinamic",
    content: `PHP este un limbaj **dinamic tipizat** — o variabilă poate deține orice tip de valoare, iar tipul se poate schimba pe parcursul execuției. Asta oferă flexibilitate enormă, dar și riscuri dacă nu ești atent.

**Declararea variabilelor**

Toate variabilele PHP încep cu \`$\`. Nu există cuvânt cheie de declarare — variabila se creează în momentul primei atribuiri:

\`\`\`php
<?php
$nume = "Ana";         // string
$varsta = 28;          // integer
$salariu = 4500.50;    // float/double
$activ = true;         // boolean
$date = null;          // null (lipsa valorii)

echo $nume;            // Ana
echo gettype($varsta); // integer
echo gettype($salariu);// double (PHP numeste float tot "double")
\`\`\`

**Cele 8 tipuri primitive PHP**

• **Scalare**: \`int\`, \`float\`, \`string\`, \`bool\`
• **Compuse**: \`array\`, \`object\`
• **Speciale**: \`null\`, \`resource\`

\`\`\`php
<?php
// int: numere intregi (pozitive, negative, zero)
$pagina = 1;
$temperatura = -15;
$populatie = 8_000_000_000; // underscore pentru lizibilitate (PHP 7.4+)

// float: numere cu zecimale (atentie la erorile de precizie!)
$pi = 3.14159;
$nota = 9.75;

// string: text intre ghilimele simple sau duble
$mesaj1 = 'Hello World';    // ghilimele simple: literal, fara interpolatie
$prenume = "Maria";
$mesaj2 = "Buna, $prenume!"; // ghilimele duble: interpolatie variabile
$mesaj3 = "Buna, {$prenume}!"; // sintaxa complexa cu acolade

// bool: true sau false (case-insensitive)
$logat = true;
$admin = FALSE; // echivalent cu false

// null: lipsa valorii sau resetare
$rezultat = null;
isset($rezultat); // false — variabila nu "exista" efectiv
\`\`\`

**Tipare dinamică — conversii implicite**

PHP convertește automat tipurile în funcție de context — dar asta poate surprinde:

\`\`\`php
<?php
// Conversii implicite (type juggling)
var_dump(0 == "foo");   // PHP < 8: true (!) | PHP 8+: false (corectat!)
var_dump(0 == "");      // PHP < 8: true     | PHP 8+: false
var_dump("1" == "01");  // true (ambele devin int 1)
var_dump("10" == "1e1");// true (10 == 10.0)

// Comparare STRICTA: === verifica si tipul
var_dump(0 === "foo");  // false (tipuri diferite)
var_dump(1 === "1");    // false (int vs string)
var_dump(1 === 1);      // true

// Conversie explicita (type casting)
$text = "42 de ani";
$numar = (int) $text;   // 42 (ia cifrele de la inceput)
$float = (float) "3.14"; // 3.14
$bool = (bool) "false"; // true! (orice string nevid e true)
$bool2 = (bool) "";     // false (string vid)
\`\`\`

**Type Declarations (PHP 7+) — tipare statică opțională**

Poți forța tipuri pentru parametri, valori de return și proprietăți de clasă:

\`\`\`php
<?php
declare(strict_types=1); // activeaza verificare stricta de tipuri

function calculeaza_tva(float $pret, float $procent = 0.19): float {
    return $pret * $procent;
}

echo calculeaza_tva(100.0);     // 19.0
echo calculeaza_tva("100.0");  // TypeError in strict mode!

// Union types (PHP 8.0+)
function proceseaza(int|string $input): string {
    return (string) $input;
}

// Nullable type: ?string inseamna string sau null
function gaseste_user(?int $id): ?string {
    if ($id === null) return null;
    return "User #$id";
}

// Mixed type (orice tip)
function debug(mixed $valoare): void {
    var_dump($valoare);
}
\`\`\`

**Verificarea și convertirea tipurilor**

\`\`\`php
<?php
$val = "42";

// Verificare tip
is_int($val);     // false
is_string($val);  // true
is_numeric($val); // true (string numeric!)

// Verificare null/empty
$x = null;
is_null($x);       // true
isset($x);         // false
empty($x);         // true

$y = 0;
is_null($y);       // false
isset($y);         // true
empty($y);         // true! (0 e considerat "gol")

// Functii utile
gettype($val);     // "string"
var_dump($val);    // string(2) "42"
print_r([1, 2, 3]);// Array ( [0] => 1 [1] => 2 [2] => 3 )
\`\`\`

**Greșeli comune**

• **\`==\` vs \`===\`** — folosește întotdeauna \`===\` pentru comparații; \`==\` cu type coercion produce rezultate surprinzătoare
• **String numeric** — \`"5"\` și \`5\` par identice cu \`==\`, dar nu cu \`===\`; alege tipul corect în funcție de context
• **\`empty()\` vs \`isset()\`** — \`empty("")\`, \`empty(0)\`, \`empty([])\` sunt toate \`true\`; dacă vrei doar să verifici existența, folosește \`isset()\`
• **\`declare(strict_types=1)\` lipsă** — fără asta, PHP convertește silențios tipuri greșite în loc să arunce erori; adaugă-l în fiecare fișier nou`,
  },
  {
    id: "6a081ffced4ef595fd66ef1b",
    title: "if / elseif / else — luarea deciziilor în cod",
    content: `Structurile condiționale sunt mecanismul de bază prin care un program ia decizii. PHP oferă sintaxa clasică \`if/elseif/else\` — flexibilă, ușor de citit și universalmente înțeleasă.

**Sintaxa de bază**

\`\`\`php
<?php
$varsta = 22;

if ($varsta < 18) {
    echo "Minor";
} elseif ($varsta >= 18 && $varsta < 65) {
    echo "Adult";
} else {
    echo "Senior";
}
// Output: Adult
\`\`\`

**Condiții compuse — operatori logici**

\`\`\`php
<?php
$logat = true;
$admin = false;
$varsta = 25;

// AND: amandoua conditiile trebuie sa fie adevarate
if ($logat && $varsta >= 18) {
    echo "Utilizator adult autentificat";
}

// OR: cel putin una trebuie sa fie adevarata
if (!$logat || $varsta < 13) {
    echo "Acces restrictionat";
}

// NOT: neaga conditia
if (!$admin) {
    echo "Nu esti administrator";
}

// Prioritate: NOT > AND > OR (foloseste paranteze pentru claritate!)
if ($logat && ($admin || $varsta > 18)) {
    echo "Acces permis";
}
\`\`\`

**Valorile falsy în PHP**

PHP tratează anumite valori ca \`false\` în context boolean — important de știut:

\`\`\`php
<?php
// Toate acestea sunt "falsy" in PHP:
$f1 = false;
$f2 = 0;
$f3 = 0.0;
$f4 = "";          // string vid
$f5 = "0";         // string "zero"!
$f6 = [];          // array vid
$f7 = null;

foreach ([$f1, $f2, $f3, $f4, $f5, $f6, $f7] as $v) {
    if (!$v) echo gettype($v) . " este falsy\n";
}

// Orice altceva e "truthy":
if ("false") echo "truthy!\n"; // "false" ca string e TRUTHY!
if (-1)      echo "truthy!\n"; // -1 e TRUTHY!
if ([0])     echo "truthy!\n"; // array cu un element e TRUTHY!
\`\`\`

**Operatorul ternar și null coalescing**

\`\`\`php
<?php
// Operatorul ternar: conditie ? valoare_true : valoare_false
$varsta = 20;
$categorie = $varsta >= 18 ? "adult" : "minor";
echo $categorie; // adult

// Versiunea scurta: ?: (Elvis operator)
// Returneaza primul operand daca e truthy, altfel al doilea
$username = $_GET['user'] ?? '';
$display = $username ?: "Anonim"; // daca $username e vid, foloseste "Anonim"

// Null coalescing: ?? (PHP 7+) — cel mai sigur pentru valori posibil null
$config = null;
$timeout = $config ?? 30; // daca $config e null, foloseste 30
echo $timeout; // 30

// Inlantuire ??
$a = null;
$b = null;
$c = "valoare";
echo $a ?? $b ?? $c; // "valoare"
\`\`\`

**Sintaxa alternativă pentru HTML/template**

PHP oferă o sintaxă alternativă cu \`:\` și \`endif\` pentru template-uri HTML:

\`\`\`php
<?php $logat = true; ?>

<?php if ($logat): ?>
    <div class="dashboard">Bun venit!</div>
<?php elseif ($invitat): ?>
    <div class="preview">Vizualizare limitata</div>
<?php else: ?>
    <div class="login">Te rugam sa te autentifici</div>
<?php endif; ?>
\`\`\`

**Exemplu practic: validare formular**

\`\`\`php
<?php
function valideaza_varsta(mixed $input): string {
    // Pasul 1: verificare existenta
    if (!isset($input) || $input === '') {
        return "Varsta este obligatorie";
    }

    // Pasul 2: verificare tip numeric
    if (!is_numeric($input)) {
        return "Varsta trebuie sa fie un numar";
    }

    $varsta = (int) $input;

    // Pasul 3: verificare interval logic
    if ($varsta < 0 || $varsta > 150) {
        return "Varsta invalida (0-150)";
    }

    return ""; // valid — mesaj de eroare vid
}

$eroare = valideaza_varsta($_POST['varsta'] ?? '');
if ($eroare !== '') {
    echo "Eroare: $eroare";
} else {
    echo "Varsta valida: " . (int)$_POST['varsta'];
}
\`\`\`

**Greșeli comune**

• **Atribuire în condiție** — \`if ($x = 5)\` *atribuie* 5 lui \`$x\` și evaluează la \`true\`; vrei probabil \`if ($x == 5)\` sau \`if ($x === 5)\`
• **Compararea \`null\` cu \`==\`** — \`null == false\` e \`true\`, \`null == 0\` e \`true\`; folosește \`=== null\` sau \`is_null()\`
• **Lipsă acolade** — PHP permite \`if ($c) echo "x";\` fără acolade, dar e periculos la refactorizare; folosește întotdeauna acolade
• **\`elseif\` vs \`else if\`** — ambele funcționează în PHP, dar \`elseif\` (un singur cuvânt) este standardul; în sintaxa alternativă cu \`:\`, doar \`elseif\` e valid`,
  },
  {
    id: "6a081ffced4ef595fd66ef1d",
    title: "switch vs match — vechi și nou",
    content: `PHP oferă două instrucțiuni pentru ramificare pe valori multiple: \`switch\` (clasic, din PHP 4) și \`match\` (modern, din PHP 8.0). Înțelegerea diferențelor este esențială pentru cod corect și sigur.

**switch — ramificare clasică**

\`\`\`php
<?php
$zi = "luni";

switch ($zi) {
    case "luni":
    case "marti":
    case "miercuri":
    case "joi":
    case "vineri":
        echo "Zi lucratoare";
        break; // OBLIGATORIU! fara break, executia continua in urmatorul case
    case "sambata":
    case "duminica":
        echo "Weekend";
        break;
    default:
        echo "Zi necunoscuta";
}
\`\`\`

**Capcana fall-through în switch**

\`\`\`php
<?php
$nota = 8;

switch (true) {  // trick: switch(true) pentru range-uri
    case $nota >= 9:
        echo "Excelent";
        // UITAT break — executia va continua in case-ul urmator!
    case $nota >= 7:
        echo "Bine";    // SE AFISEAZA SI "Bine"! Bug subtil
        break;
    case $nota >= 5:
        echo "Satisfacator";
        break;
    default:
        echo "Nesatisfacator";
}
// Output gresit: "ExcelentBine" (fall-through!)
\`\`\`

**switch foloseste == (loose comparison)**

\`\`\`php
<?php
$input = "1"; // string

switch ($input) {
    case 1:       // switch("1" == 1) => true! (type coercion)
        echo "Unu";
        break;
    case "1":
        echo "String unu";
        break;
}
// Output: "Unu" — primul case se potriveste datorita == loose!
\`\`\`

**match — expresie modernă (PHP 8.0+)**

\`match\` rezolvă toate problemele lui \`switch\`:
• Folosește **comparare strictă** (\`===\`)
• Este o **expresie** (returnează o valoare)
• **Nu are fall-through** (fără break necesar)
• Aruncă \`UnhandledMatchError\` dacă nicio ramură nu se potrivește

\`\`\`php
<?php
$nota = 8;

$calificativ = match(true) {
    $nota >= 9  => "Excelent",
    $nota >= 7  => "Bine",
    $nota >= 5  => "Satisfacator",
    default     => "Nesatisfacator",
};

echo $calificativ; // "Bine"

// match ca expresie — poate fi folosit direct
$mesaj = "Nota ta: " . match($nota) {
    10 => "perfect!",
    9  => "excelent!",
    8, 7 => "bine!",     // multiple valori intr-un arm
    default => "continua sa inveti!"
};
echo $mesaj; // "Nota ta: bine!"
\`\`\`

**match cu comparare strictă vs switch**

\`\`\`php
<?php
$valoare = "1";

// switch: comparare laxa (==)
switch ($valoare) {
    case 1:   echo "switch: match cu int 1!"; break; // SE EXECUTA!
    case "1": echo "switch: match cu string"; break;
}

// match: comparare stricta (===)
echo match($valoare) {
    1   => "match: int 1",    // NU se executa (string != int)
    "1" => "match: string 1", // SE EXECUTA
    default => "altceva"
};
// Output match: "match: string 1" — corect!
\`\`\`

**Când să folosești switch vs match**

\`\`\`php
<?php
// match — preferat pentru:
// - valori exacte, fara fall-through
// - cand ai nevoie de expresie (return, assign)
// - PHP 8.0+

$status = "active";
$label = match($status) {
    "active"   => "Activ",
    "inactive" => "Inactiv",
    "banned"   => "Banat",
    default    => throw new \InvalidArgumentException("Status necunoscut: $status")
};

// switch — util pentru:
// - fall-through intentionat
// - logica complexa in fiecare case (mai mult decat o expresie)
// - compatibilitate cu PHP < 8.0

switch ($comanda) {
    case "quit":
    case "exit":
    case "bye":
        cleanup();
        exit(0);
        break;
    case "help":
        afiseaza_ajutor();
        break;
}
\`\`\`

**Greșeli comune**

• **Uiți \`break\`** — în \`switch\`, fiecare \`case\` fără \`break\` va executa și case-urile următoare; intenționat rar, accidental des
• **Comparare laxă în switch** — \`switch("0") { case false: ... }\` se potrivește din cauza \`"0" == false\`; dacă ai nevoie de strictețe, folosește \`match\`
• **\`match\` fără \`default\`** — dacă nicio ramură nu se potrivește, \`match\` aruncă \`UnhandledMatchError\`; adaugă \`default\` sau asigură-te că toate valorile sunt acoperite`,
  },
  {
    id: "6a082002ed4ef595fd66ef45",
    title: "Arrays în PHP — indexate și asociative",
    content: `Array-urile în PHP sunt structuri de date extrem de flexibile — pot stoca valori de orice tip, inclusiv alte array-uri, și funcționează atât ca liste indexate, cât și ca dicționare cheie-valoare. Practic, un singur tip de array acoperă toate cazurile de utilizare.

**Declararea array-urilor**

\`\`\`php
<?php
// Sintaxa moderna (PHP 5.4+) — preferata
$fructe = ["mar", "banana", "portocala"];
$golire = []; // array vid

// Sintaxa veche (compatibila cu PHP 4)
$legume = array("morcov", "ceapa", "rosie");

// Array cu indici expliciti
$saptamana = [
    1 => "Luni",
    2 => "Marti",
    3 => "Miercuri",
    // ... PHP completeaza automat: 4, 5, 6, 7
];

// Accesare elemente
echo $fructe[0];       // "mar" (indexare de la 0)
echo $saptamana[2];    // "Marti"
\`\`\`

**Array-uri asociative — cheie => valoare**

\`\`\`php
<?php
// Array asociativ: chei personalizate (string sau int)
$utilizator = [
    "id"       => 42,
    "nume"     => "Ion Popescu",
    "email"    => "ion@example.com",
    "varsta"   => 35,
    "activ"    => true,
];

echo $utilizator["email"]; // "ion@example.com"
echo $utilizator["varsta"]; // 35

// Modificare si adaugare
$utilizator["varsta"] = 36;           // modifica
$utilizator["telefon"] = "0722000000"; // adauga nou

// Stergere
unset($utilizator["telefon"]);
\`\`\`

**Funcțiile esențiale pentru array-uri**

\`\`\`php
<?php
$numere = [5, 3, 1, 4, 2];

// Dimensiune
echo count($numere);     // 5

// Sortare
sort($numere);           // [1, 2, 3, 4, 5] — modifica original, index reset
rsort($numere);          // [5, 4, 3, 2, 1] — descrescator

$produse = ["banana" => 2, "mar" => 5, "cires" => 1];
asort($produse);         // sorteaza dupa valori, pastreaza cheile
ksort($produse);         // sorteaza dupa chei

// Adaugare si extragere
array_push($numere, 6);  // adauga la sfarsit (echivalent $arr[] = 6)
$ultim = array_pop($numere); // extrage si returneaza ultimul element
array_unshift($numere, 0);   // adauga la inceput
$prim = array_shift($numere); // extrage primul element

// Cautare
in_array(3, $numere);    // true — cauta valoarea
array_search(3, $numere); // returneaza cheia (indexul) sau false
\`\`\`

**Funcții de transformare**

\`\`\`php
<?php
$numere = [1, 2, 3, 4, 5, 6];

// array_filter: pastreaza elementele care trec testul
$pare = array_filter($numere, fn($n) => $n % 2 === 0);
// [1 => 2, 3 => 4, 5 => 6] — atentie: cheile se pastreaza!
$pare = array_values($pare); // reset chei: [0 => 2, 1 => 4, 2 => 6]

// array_map: transforma fiecare element
$patrate = array_map(fn($n) => $n ** 2, $numere);
// [1, 4, 9, 16, 25, 36]

// array_reduce: reduce array la o singura valoare
$suma = array_reduce($numere, fn($carry, $item) => $carry + $item, 0);
// 21

// array_slice: extrage o portiune
$mijloc = array_slice($numere, 1, 3); // [2, 3, 4] (offset=1, length=3)

// array_merge si spread operator
$a = [1, 2, 3];
$b = [4, 5, 6];
$c = array_merge($a, $b);    // [1, 2, 3, 4, 5, 6]
$d = [...$a, ...$b];         // identic cu spread operator (PHP 7.4+)
\`\`\`

**Array-uri multidimensionale**

\`\`\`php
<?php
$studenti = [
    ["nume" => "Ana",  "note" => [9, 8, 10, 7]],
    ["nume" => "Mihai","note" => [6, 7, 8, 9]],
    ["nume" => "Ioana","note" => [10, 10, 9, 8]],
];

// Accesare element nested
echo $studenti[0]["nume"];           // "Ana"
echo $studenti[0]["note"][2];        // 10

// Calcul medie pentru fiecare student
foreach ($studenti as $student) {
    $medie = array_sum($student["note"]) / count($student["note"]);
    printf("%s: %.2f\n", $student["nume"], $medie);
}
// Ana: 8.50
// Mihai: 7.50
// Ioana: 9.25
\`\`\`

**Greșeli comune**

• **Index out of bounds** — accesarea unui index inexistent (ex: \`$arr[10]\` pe un array cu 3 elemente) produce \`Notice\` și returnează \`null\`; verifică cu \`isset()\` sau \`array_key_exists()\`
• **Cheile se resetează la merge** — \`array_merge\` cu array-uri numerice reindexează cheile de la 0; dacă vrei să păstrezi cheile, folosește operatorul \`+\` sau \`array_merge\` atent
• **\`array_filter\` păstrează cheile** — după filtrare, array-ul poate să nu mai aibă chei consecutive; apelează \`array_values()\` dacă ai nevoie de reindexare`,
  },
  {
    id: "6a0b531d1419ceefc0245731",
    title: "Access modifiers — public, protected, private",
    content: `**Access modifiers** (modificatori de acces) controlează vizibilitatea proprietăților și metodelor unei clase — cine poate citi sau modifica o valoare. Sunt fundamentul **encapsulării**, unul dintre principiile de bază ale OOP.

**Cele trei niveluri de acces**

• \`public\` — accesibil de oriunde: din clasă, din subclase, din afara clasei
• \`protected\` — accesibil doar din clasă și din subclasele ei
• \`private\` — accesibil exclusiv din interiorul clasei în care e definit

\`\`\`php
<?php
class ContBancar {
    public string $titular;        // oricine poate citi/scrie
    protected float $sold;         // doar clasa si subclasele
    private string $pin;           // doar aceasta clasa

    public function __construct(string $titular, float $soldInitial, string $pin) {
        $this->titular = $titular;
        $this->sold = $soldInitial;
        $this->pin = $pin;
    }

    public function getSold(): float {
        return $this->sold; // acces intern la protected
    }

    protected function valideazaPin(string $pin): bool {
        return $this->pin === $pin; // acces intern la private
    }

    public function retrage(float $suma, string $pin): bool {
        if (!$this->valideazaPin($pin)) {
            return false;
        }
        if ($suma > $this->sold) {
            return false;
        }
        $this->sold -= $suma;
        return true;
    }
}

$cont = new ContBancar("Ion Popescu", 1000.0, "1234");
echo $cont->titular;          // OK: public
echo $cont->getSold();        // OK: metoda publica
// echo $cont->sold;          // EROARE: protected
// echo $cont->pin;           // EROARE: private
// $cont->valideazaPin("1234");// EROARE: protected
\`\`\`

**Moștenire și access modifiers**

\`\`\`php
<?php
class ContEconomii extends ContBancar {
    private float $dobanda;

    public function __construct(string $titular, float $sold, string $pin, float $dobanda) {
        parent::__construct($titular, $sold, $pin); // apeleaza constructorul parintelui
        $this->dobanda = $dobanda;
    }

    public function adaugaDobanda(): void {
        // OK: $this->sold e protected — accesibil in subclase
        $this->sold *= (1 + $this->dobanda / 100);
    }

    public function verificaPin(string $pin): bool {
        // OK: valideazaPin() e protected — accesibil in subclase
        return $this->valideazaPin($pin);
    }
}

$economii = new ContEconomii("Ana", 5000.0, "5678", 3.5);
$economii->adaugaDobanda();  // sold devine 5175
echo $economii->getSold();   // 5175
\`\`\`

**Properties cu readonly (PHP 8.1+)**

\`\`\`php
<?php
class Produs {
    public readonly string $sku;  // poate fi setata o singura data

    public function __construct(string $sku, public string $nume, private float $pret) {
        // Constructor promotion: parametrii sunt declarati + initializati automat
        $this->sku = $sku;
    }

    public function getPret(): float { return $this->pret; }
}

$p = new Produs("SKU-001", "Laptop", 2999.99);
echo $p->sku;   // "SKU-001"
echo $p->nume;  // "Laptop"
// $p->sku = "ALT"; // EROARE: readonly nu poate fi modificata dupa initializare
\`\`\`

**Getteri și Setteri — pattern standard**

\`\`\`php
<?php
class Utilizator {
    private string $email;
    private int $varsta;

    public function getEmail(): string { return $this->email; }

    public function setEmail(string $email): void {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Email invalid: $email");
        }
        $this->email = strtolower($email); // normalizeaza
    }

    public function getVarsta(): int { return $this->varsta; }

    public function setVarsta(int $varsta): void {
        if ($varsta < 0 || $varsta > 150) {
            throw new \RangeException("Varsta invalida: $varsta");
        }
        $this->varsta = $varsta;
    }
}

$u = new Utilizator();
$u->setEmail("ION@EXAMPLE.COM"); // normalizeaza la "ion@example.com"
echo $u->getEmail();              // "ion@example.com"
\`\`\`

**Greșeli comune**

• **Toate proprietățile public** — face clasa imposibil de menținut: orice cod extern poate corupe starea internă fără validare; proprietățile trebuie să fie \`private\` sau \`protected\` implicit
• **Getter/setter pentru tot** — nu folosi getter/setter mecanic pentru orice proprietate; o clasă care expune tot nu oferă nicio encapsulare reală
• **Confundarea \`protected\` cu \`private\`** — \`private\` e inaccesibil în subclase; dacă planifici să extinzi clasa, \`protected\` e alegerea corectă`,
  },
  {
    id: "6a082005ed4ef595fd66ef53",
    title: "Operații fundamentale pe stringuri",
    content: `PHP are una dintre cele mai bogate biblioteci de funcții pentru manipularea stringurilor. Cunoașterea funcțiilor de bază este esențială — sunt folosite zilnic în aproape orice aplicație PHP.

**Concatenarea și interpolarea**

\`\`\`php
<?php
$prenume = "Ion";
$nume = "Popescu";

// Concatenare cu operatorul .
$numecComplet = $prenume . " " . $nume; // "Ion Popescu"

// Interpolarea in ghilimele duble
$mesaj = "Buna ziua, $numecComplet!"; // "Buna ziua, Ion Popescu!"
$complex = "Salut, {$prenume}!";      // sintaxa acolada pentru expresii

// Operatorul .= (append)
$text = "Hello";
$text .= " World"; // "Hello World"
\`\`\`

**Lungime și conversii**

\`\`\`php
<?php
$text = "  Hello, World!  ";

// Lungime in bytes (nu caractere Unicode!)
echo strlen($text);          // 18
// Pentru Unicode (multibyte):
echo mb_strlen($text, 'UTF-8'); // 18 (acelasi daca e ASCII)
$unicode = "Bună ziua!";
echo strlen($unicode);       // mai mare decat 10 (bytes UTF-8)
echo mb_strlen($unicode, 'UTF-8'); // 10 (caractere reale)

// Stergere spatii
echo trim($text);            // "Hello, World!" (ambele capete)
echo ltrim($text);           // "Hello, World!  " (stanga)
echo rtrim($text);           // "  Hello, World!" (dreapta)
echo trim($text, "! ");      // "Hello, World" (caractere custom)
\`\`\`

**Transformări de caz**

\`\`\`php
<?php
$text = "hello world PHP";

echo strtoupper($text);      // "HELLO WORLD PHP"
echo strtolower($text);      // "hello world php"
echo ucfirst($text);         // "Hello world PHP" (prima litera)
echo ucwords($text);         // "Hello World PHP" (fiecare cuvant)

// Versiuni multibyte pentru limbi cu diacritice
echo mb_strtoupper("bună ziua", 'UTF-8'); // "BUNĂ ZIUA"
echo mb_strtolower("BUNĂ ZIUA", 'UTF-8'); // "bună ziua"
\`\`\`

**Extragere și împărțire**

\`\`\`php
<?php
$text = "Hello, World!";

// Extrage o portiune
echo substr($text, 7, 5);    // "World" (start=7, length=5)
echo substr($text, -6);      // "orld!" (de la sfarsit)
echo substr($text, 0, 5);    // "Hello"

// Imparte dupa separator
$csv = "Ana,Mihai,Ioana,Petre";
$persoane = explode(",", $csv);       // ["Ana", "Mihai", "Ioana", "Petre"]
$primele_doua = explode(",", $csv, 2); // ["Ana", "Mihai,Ioana,Petre"] (limit=2)

// Uneste array intr-un string
echo implode(" | ", $persoane);  // "Ana | Mihai | Ioana | Petre"
echo implode(", ", $persoane);   // "Ana, Mihai, Ioana, Petre"

// Imparte in caractere (sau chunk-uri)
$litere = str_split("PHP");        // ["P", "H", "P"]
$chunks = str_split("abcdefgh", 2);// ["ab", "cd", "ef", "gh"]
\`\`\`

**Paddings, repeat și reverse**

\`\`\`php
<?php
// str_pad: umple cu caractere
$numar = "42";
echo str_pad($numar, 5, "0", STR_PAD_LEFT);  // "00042"
echo str_pad($numar, 5, "-", STR_PAD_RIGHT); // "42---"
echo str_pad($numar, 7, "-+", STR_PAD_BOTH); // "-+42-+-"

// str_repeat: repeta un string
echo str_repeat("=-", 10);  // "=-=-=-=-=-=-=-=-=-=-=-=-"
echo str_repeat("*", 5);     // "*****"

// strrev: inverseaza (nu e multibyte-safe!)
echo strrev("PHP");          // "PHP" (palindrom :))
echo strrev("Hello");        // "olleH"

// wordwrap: imparte text lung la un numar de caractere
$lung = "Acesta este un text foarte lung care trebuie impartit";
echo wordwrap($lung, 20, "\n", true);
\`\`\`

**Formatare și printf**

\`\`\`php
<?php
$pret = 1234.5;
$produs = "Laptop";

// sprintf: format string (nu afiseaza, returneaza)
$text = sprintf("Produsul '%s' costa %.2f RON", $produs, $pret);
echo $text; // "Produsul 'Laptop' costa 1234.50 RON"

// printf: format si afiseaza direct
printf("%-20s %8.2f RON\n", "Laptop", 1234.5);
printf("%-20s %8.2f RON\n", "Mouse", 89.99);
// Output aliniat:
// Laptop               1234.50 RON
// Mouse                  89.99 RON

// number_format: formatare numere
echo number_format(1234567.891, 2, ',', '.');
// "1.234.567,89" (format european)
\`\`\`

**Greșeli comune**

• **\`strlen\` vs \`mb_strlen\`** — \`strlen()\` numără bytes, nu caractere; pentru text cu diacritice sau emoji (UTF-8 multibyte), folosește întotdeauna \`mb_strlen\`
• **\`explode\` cu string vid** — \`explode("", "text")\` aruncă \`ValueError\`; verifică că separatorul nu e vid
• **Concatenare în buclă** — \`$str .= $x\` într-o buclă mare e lent; adună într-un array și apelează \`implode\` la final`,
  },
  {
    id: "6a082005ed4ef595fd66ef54",
    title: "Căutare, înlocuire și poziționare",
    content: `PHP oferă un set complet de funcții pentru căutare în stringuri, localizarea pozițiilor și înlocuirea subșirurilor. Aceste funcții apar constant în procesarea textului, validare și sanitizare.

**Verificarea prezenței unui subșir**

\`\`\`php
<?php
$text = "Buna ziua, PHP este grozav!";

// str_contains: cel mai simplu (PHP 8.0+)
if (str_contains($text, "PHP")) {
    echo "Contine PHP!\n"; // se afiseaza
}

// str_starts_with / str_ends_with (PHP 8.0+)
str_starts_with($text, "Buna"); // true
str_ends_with($text, "grozav!"); // true

// strpos: gaseste pozitia primei aparitii (sau false daca nu e)
$pozitie = strpos($text, "PHP");
if ($pozitie !== false) {  // ATENTIE: comparatie stricta! (pozitia 0 == false)
    echo "PHP gasit la pozitia: $pozitie\n"; // 11
}

// strrpos: ultima aparitie
$text2 = "ana are mere, mere multe";
echo strrpos($text2, "mere"); // 14 (ultima aparitie)
\`\`\`

**Căutare case-insensitive**

\`\`\`php
<?php
$email = "User@EXAMPLE.COM";
$domeniu = "example.com";

// stripos: case-insensitive (i = insensitive)
if (stripos($email, $domeniu) !== false) {
    echo "Email de la $domeniu\n"; // se afiseaza
}

// str_contains e case-sensitive — neglijat des!
str_contains($email, "example");   // false ("EXAMPLE" != "example")
stripos($email, "example") !== false; // true — corect
\`\`\`

**Înlocuire de subșiruri**

\`\`\`php
<?php
// str_replace: inlocuire simpla
$original = "Buna ziua, lumea PHP!";
$nou = str_replace("PHP", "web", $original);
echo $nou; // "Buna ziua, lumea web!"

// Inlocuiri multiple simultan (array)
$text = "pisica gri mananca mici";
$inlocuit = str_replace(
    ["pisica", "gri", "manci"],
    ["caine", "negru", "ros"],
    $text
);
// "caine negru mananca mici"

// str_ireplace: case-insensitive
$curat = str_ireplace(["spam", "SPAM", "Spam"], "[filtrat]", $continut);
// inlocuieste toate variantele de caz — dar str_ireplace le face pe toate simultan

// substr_replace: inlocuire la pozitie specifica
$card = "1234567890123456";
$mascat = substr_replace($card, "****", 6, 6); // "123456****3456"
\`\`\`

**Extragere avansată**

\`\`\`php
<?php
$url = "https://www.example.com/produse/laptop?sort=pret&page=2";

// parse_url: descompune un URL
$componente = parse_url($url);
// [
//   "scheme" => "https",
//   "host"   => "www.example.com",
//   "path"   => "/produse/laptop",
//   "query"  => "sort=pret&page=2"
// ]
parse_str($componente['query'], $params);
// $params = ["sort" => "pret", "page" => "2"]

// strstr: tot ce e dupa primul separato
$email = "ion@example.com";
echo strstr($email, "@");        // "@example.com" (inclusiv separatorul)
echo strstr($email, "@", true);  // "ion" (inainte de separator)

// Extrage extensia unui fisier
$fisier = "document.pdf";
$ext = pathinfo($fisier, PATHINFO_EXTENSION); // "pdf"
$baza = pathinfo($fisier, PATHINFO_FILENAME); // "document"
\`\`\`

**Numărul de apariții**

\`\`\`php
<?php
$text = "pere, mere, pere, visine, pere";

// substr_count: numara aparitiile unui subșir
echo substr_count($text, "pere");  // 3

// count_chars: statistici despre caractere
$frecvente = count_chars("hello world", 1);
// returneaza array [cod_ascii => numar_aparitii] pentru chars prezente

// str_word_count: numara cuvintele
$articol = "PHP este un limbaj puternic";
echo str_word_count($articol);           // 5
$cuvinte = str_word_count($articol, 1);  // ["PHP", "este", "un", ...] — array
\`\`\`

**Greșeli comune**

• **\`strpos\` comparat cu \`== false\`** — folosește \`!== false\` (strict); \`strpos\` returnează 0 dacă subșirul e la început, iar \`0 == false\` este \`true\` în PHP
• **\`str_replace\` cu array de căutare** — când folosești array-uri, înlocuirile se aplică în ordine; o înlocuire poate afecta textul produs de o înlocuire anterioară
• **Funcții multibyte uitate** — \`substr\`, \`strpos\`, \`strtolower\` etc. operează pe bytes; pentru text UTF-8 cu diacritice, folosește \`mb_substr\`, \`mb_strpos\`, \`mb_strtolower\``,
  },
  {
    id: "6a0b532c1419ceefc024578e",
    title: "Ce sunt expresiile regulate și sintaxa de bază",
    content: `**Expresiile regulate** (RegEx — Regular Expressions) sunt modele de căutare extrem de puternice, capabile să descrie structuri complexe de text cu o sintaxă compactă. PHP le implementează prin funcțiile \`preg_*\`, bazate pe biblioteca PCRE (Perl Compatible Regular Expressions).

**Anatomia unui pattern RegEx**

Un pattern RegEx în PHP este delimitat de slash-uri și poate include modificatori:

\`\`\`php
<?php
// Structura: /pattern/modificatori
$pattern = '/hello/i';   // cauta "hello" (case-insensitive datorita i)
$text = "Hello, World!";
preg_match($pattern, $text, $matches);
var_dump($matches[0]); // "Hello"
\`\`\`

**Caracterele speciale (metacaracterele)**

\`\`\`php
<?php
// . = orice caracter (exceptand newline)
preg_match('/c.t/', 'cat', $m);  // potriveste "cat", "cut", "c3t", etc.

// ^ = inceput de string/linie
// $ = sfarsit de string/linie
preg_match('/^PHP/', 'PHP este grozav', $m); // potriveste (incepe cu PHP)
preg_match('/grozav$/', 'PHP este grozav', $m); // potriveste (se termina)

// * = 0 sau mai multe repetitii
// + = 1 sau mai multe repetitii
// ? = 0 sau 1 aparitii (optional)
// {n} = exact n repetitii
// {n,m} = intre n si m repetitii

preg_match('/go+gle/', 'google', $m);   // "google" (o+)
preg_match('/colou?r/', 'color', $m);   // potriveste "color" si "colour"
preg_match('/\d{4}/', '2024-01-15', $m); // "2024" (exact 4 cifre)
\`\`\`

**Clase de caractere**

\`\`\`php
<?php
// [abc] = unul dintre a, b sau c
// [a-z] = orice litera mica
// [^abc] = orice in afara de a, b, c
// \d = cifra [0-9]
// \w = litera, cifra sau _ [a-zA-Z0-9_]
// \s = spatiu (space, tab, newline)
// \D, \W, \S = inversele

$codPostal = "010101";
if (preg_match('/^\d{6}$/', $codPostal)) {
    echo "Cod postal valid\n"; // se afiseaza
}

$telefon = "0722123456";
if (preg_match('/^0[67]\d{8}$/', $telefon)) {
    echo "Numar mobil valid (07xx sau 06xx)\n";
}

// Validare email simpla
$email = "user@example.com";
if (preg_match('/^[\w.+-]+@[\w-]+\.[a-z]{2,}$/i', $email)) {
    echo "Email valid\n";
}
\`\`\`

**Grupuri și capturi**

\`\`\`php
<?php
// Paranteze = grup de captura
$data = "2024-03-15";
preg_match('/(\d{4})-(\d{2})-(\d{2})/', $data, $matches);
// $matches[0] = "2024-03-15" (intregul match)
// $matches[1] = "2024" (primul grup)
// $matches[2] = "03" (al doilea grup)
// $matches[3] = "15" (al treilea grup)

echo "Anul: {$matches[1]}, Luna: {$matches[2]}, Ziua: {$matches[3]}\n";

// Grupuri numite: (?P<nume>pattern)
preg_match('/(?P<an>\d{4})-(?P<luna>\d{2})-(?P<zi>\d{2})/', $data, $m);
echo "Luna: {$m['luna']}\n"; // "03" — acces prin nume

// Alternanta: |
preg_match('/cat|dog/', 'I have a dog', $m); // potriveste "dog"
\`\`\`

**Funcțiile preg_* principale**

\`\`\`php
<?php
$text = "Pretul este 150 RON si 200 EUR plus 50 USD";

// preg_match: primul match
preg_match('/\d+ [A-Z]{3}/', $text, $m);
echo $m[0]; // "150 RON"

// preg_match_all: toate match-urile
$count = preg_match_all('/\d+ [A-Z]{3}/', $text, $matches);
echo $count;             // 3
print_r($matches[0]);    // ["150 RON", "200 EUR", "50 USD"]

// preg_replace: inlocuire cu regex
$sanitizat = preg_replace('/\d+/', '***', $text);
// "Pretul este *** RON si *** EUR plus *** USD"

// preg_replace cu callback
$dublat = preg_replace_callback(
    '/\d+/',
    fn($m) => (int)$m[0] * 2, // dubleaza fiecare numar
    $text
);
// "Pretul este 300 RON si 400 EUR plus 100 USD"

// preg_split: imparte dupa regex
$cuvinte = preg_split('/\s+/', "  hello   world  php  ");
// elimina spatii multiple
$cuvinte = array_filter($cuvinte); // elimina string-uri vide
\`\`\`

**Modificatori importanți**

\`\`\`
/pattern/i  — case-insensitive
/pattern/m  — ^ si $ se aplica pe fiecare linie (multiline)
/pattern/s  — . include newline (single-line mode)
/pattern/u  — Unicode — OBLIGATORIU pentru text cu diacritice!
/pattern/x  — permite comentarii si spatii in pattern (eXtended)
\`\`\`

**Greșeli comune**

• **Uitarea modificatorului \`u\`** — fără \`/u\`, regex-ul operează pe bytes, nu pe caractere Unicode; \`\\w\` nu va include ă, î, ș, ț
• **Catastrofic backtracking** — pattern-uri ca \`(a+)+\` pe input adversarial pot dura ore; evită quantificatori imbricați
• **\`preg_match\` returnează 0, nu \`false\`** — returnează \`1\` la match, \`0\` la no-match, \`false\` la eroare; folosește \`=== false\` pentru verificarea erorilor și \`=== 1\` pentru match`,
  },
  {
    id: "6a0b533b1419ceefc02457ee",
    title: "Implementarea unui Router simplu",
    content: `Un **router** este componenta centrală a oricărei aplicații MVC — mapează URL-uri (rute) la controllere și acțiuni. Implementând un router simplu, înțelegi ce se întâmplă în spatele framework-urilor ca Laravel sau Symfony.

**Conceptul de bază — URL rewriting**

Primul pas este ca TOATE cererile să ajungă la un singur fișier \`index.php\`. Asta se face cu \`.htaccess\` (Apache) sau \`nginx.conf\`:

\`\`\`apache
# .htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]
\`\`\`

Acum tot ce nu e un fișier static ajunge la \`index.php\` cu calea în \`$_SERVER['REQUEST_URI']\`.

**Router simplu cu array de rute**

\`\`\`php
<?php
class Router {
    private array $routes = [];

    // Inregistreaza o ruta: metoda HTTP, cale, handler
    public function add(string $method, string $path, callable $handler): void {
        $this->routes[] = [
            'method'  => strtoupper($method),
            'path'    => $path,
            'handler' => $handler,
        ];
    }

    // Metode helper pentru fiecare verb HTTP
    public function get(string $path, callable $handler): void {
        $this->add('GET', $path, $handler);
    }

    public function post(string $path, callable $handler): void {
        $this->add('POST', $path, $handler);
    }

    // Potriveste URL-ul curent si executa handler-ul corespunzator
    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri    = rtrim($uri, '/') ?: '/'; // normalizeaza trailing slash

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) continue;

            // Converteste ruta in regex: /produse/{id} -> /produse/([^/]+)
            $pattern = preg_replace('/\{[^}]+\}/', '([^/]+)', $route['path']);
            $pattern = '#^' . $pattern . '$#';

            if (preg_match($pattern, $uri, $matches)) {
                array_shift($matches); // elimina match-ul complet [0]
                call_user_func_array($route['handler'], $matches);
                return;
            }
        }

        // 404 Not Found
        http_response_code(404);
        echo json_encode(['error' => 'Ruta nu a fost gasita']);
    }
}
\`\`\`

**Utilizarea routerului**

\`\`\`php
<?php
// index.php
require_once 'Router.php';
require_once 'controllers/ProduseController.php';
require_once 'controllers/UtilizatoriController.php';

$router = new Router();

// Rute simple
$router->get('/', function() {
    echo json_encode(['mesaj' => 'Bun venit la API!']);
});

// Rute cu parametri dinamici
$router->get('/produse', [ProduseController::class, 'index']);
$router->get('/produse/{id}', [ProduseController::class, 'show']);
$router->post('/produse', [ProduseController::class, 'store']);
$router->add('PUT', '/produse/{id}', [ProduseController::class, 'update']);
$router->add('DELETE', '/produse/{id}', [ProduseController::class, 'destroy']);

// Rute cu mai multi parametri
$router->get('/utilizatori/{userId}/comenzi/{orderId}', function($userId, $orderId) {
    echo json_encode(['user' => $userId, 'order' => $orderId]);
});

// Porneste procesarea
$router->dispatch();
\`\`\`

**Controllerul de produse**

\`\`\`php
<?php
class ProduseController {
    public static function index(): void {
        // Returneaza lista de produse
        header('Content-Type: application/json');
        echo json_encode(['produse' => ['Laptop', 'Mouse', 'Tastatura']]);
    }

    public static function show(string $id): void {
        // Returneaza un produs dupa id
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'ID invalid']);
            return;
        }
        header('Content-Type: application/json');
        echo json_encode(['id' => (int)$id, 'nume' => "Produs #$id"]);
    }

    public static function store(): void {
        $body = json_decode(file_get_contents('php://input'), true);
        // Valideaza si salveaza...
        http_response_code(201);
        echo json_encode(['mesaj' => 'Produs creat', 'data' => $body]);
    }
}
\`\`\`

**Middleware simplu — autentificare**

\`\`\`php
<?php
// Adauga suport pentru middleware in Router
class Router {
    private array $middleware = [];

    public function use(callable $middleware): void {
        $this->middleware[] = $middleware;
    }

    public function dispatch(): void {
        // Ruleaza middleware inainte de handler
        foreach ($this->middleware as $mw) {
            if ($mw() === false) return; // middleware a oprit executia
        }
        // ... restul logicii de dispatch
    }
}

// Utilizare:
$router->use(function() {
    if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Autentificare necesara']);
        return false; // opreste executia
    }
    return true; // continua
});
\`\`\`

**Greșeli comune**

• **SQL injection prin parametrii de rută** — niciodată nu folosi direct \`$id\` din URL în query SQL; sanitizează și validează întotdeauna parametrii extrași
• **Ordinea rutelor contează** — \`/produse/special\` trebuie definit ÎNAINTE de \`/produse/{id}\`, altfel \`special\` va fi tratat ca ID
• **\`REQUEST_URI\` include query string** — folosește \`parse_url(..., PHP_URL_PATH)\` pentru a extrage doar calea, fără \`?param=valoare\``,
  },
];

async function main() {
  console.log(`Updating ${updates.length} PHP sections with manual 10/10 content...`);
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
