const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TASKS = {
  "probleme-conditii": [
    { name: "FizzBuzz", difficulty: "easy",
      question: "Scrie programul FizzBuzz: pentru numerele 1-20 afișează 'Fizz' dacă e divizibil cu 3, 'Buzz' dacă e cu 5, 'FizzBuzz' dacă e cu ambele, altfel numărul.",
      starterCode: "for i in range(1, 21):\n    if i % 15 == 0:\n        print('FizzBuzz')\n    # adaugă celelalte cazuri\n",
      expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz" },
    { name: "An bisect", difficulty: "easy",
      question: "Scrie o funcție `an_bisect(an)` care returnează True dacă un an este bisect (divizibil cu 4, dar nu cu 100, sau cu 400). Testează cu 2024, 1900, 2000.",
      starterCode: "def an_bisect(an):\n    return (an % 4 == 0 and an % 100 != 0) or an % 400 == 0\n\nprint(an_bisect(2024))\nprint(an_bisect(1900))\nprint(an_bisect(2000))\n",
      expectedOutput: "True\nFalse\nTrue" },
  ],
  "while-avansat": [
    { name: "Ghicește numărul", difficulty: "medium",
      question: "Simulează jocul 'ghicește numărul': numărul secret este 42. Creează o listă de încercări [10, 60, 42] și iterează cu while până găsești numărul sau epuizezi lista. Afișează fiecare încercare cu 'Prea mic'/'Prea mare'/'Corect!'.",
      starterCode: "secret = 42\nincercari = [10, 60, 42]\ni = 0\nwhile i < len(incercari):\n    ghicit = incercari[i]\n    if ghicit < secret:\n        print(f'{ghicit}: Prea mic')\n    elif ghicit > secret:\n        print(f'{ghicit}: Prea mare')\n    else:\n        print(f'{ghicit}: Corect!')\n        break\n    i += 1\n",
      expectedOutput: "10: Prea mic\n60: Prea mare\n42: Corect!" },
    { name: "Colatz", difficulty: "medium",
      question: "Șirul Collatz: pornind de la n=27, dacă e par împarte la 2, dacă e impar înmulțește cu 3 și adaugă 1. Repetă până ajungi la 1. Afișează câți pași a durat.",
      starterCode: "n = 27\npasi = 0\nwhile n != 1:\n    if n % 2 == 0:\n        n = n // 2\n    else:\n        n = n * 3 + 1\n    pasi += 1\nprint(pasi)\n",
      expectedOutput: "111" },
  ],
  "while-true-break": [
    { name: "Sumă cu condiție stop", difficulty: "easy",
      question: "Calculează suma numerelor din lista `[3, 7, -1, 5, 2]` folosind `while True`. Dacă găsești un număr negativ, oprește-te (break) și afișează suma acumulată până atunci.",
      starterCode: "numere = [3, 7, -1, 5, 2]\nindex = 0\nsuma = 0\nwhile True:\n    if index >= len(numere):\n        break\n    if numere[index] < 0:\n        break\n    suma += numere[index]\n    index += 1\nprint(suma)\n",
      expectedOutput: "10" },
    { name: "Meniu simulat", difficulty: "medium",
      question: "Simulează un meniu: lista de comenzi = ['1', '2', '0']. Procesează fiecare comandă: '1' afișează 'Ai ales opțiunea 1', '2' afișează 'Ai ales opțiunea 2', '0' afișează 'La revedere!' și oprește bucla.",
      starterCode: "comenzi = ['1', '2', '0']\nfor cmd in comenzi:\n    if cmd == '0':\n        print('La revedere!')\n        break\n    elif cmd == '1':\n        print('Ai ales optiunea 1')\n    elif cmd == '2':\n        print('Ai ales optiunea 2')\n",
      expectedOutput: "Ai ales optiunea 1\nAi ales optiunea 2\nLa revedere!" },
  ],
  "liste-operatii": [
    { name: "Rotire listă", difficulty: "medium",
      question: "Scrie o funcție `rotire(lst, k)` care rotește lista cu k poziții la stânga. Exemplu: rotire([1,2,3,4,5], 2) → [3,4,5,1,2]. Testează cu [1,2,3,4,5] și k=2.",
      starterCode: "def rotire(lst, k):\n    k = k % len(lst)\n    return lst[k:] + lst[:k]\n\nprint(rotire([1, 2, 3, 4, 5], 2))\n",
      expectedOutput: "[3, 4, 5, 1, 2]" },
    { name: "Aplatizare listă", difficulty: "medium",
      question: "Scrie o funcție `flatten(lst)` care aplatizează o listă de liste de un nivel. Exemplu: flatten([[1,2],[3,4],[5]]) → [1,2,3,4,5].",
      starterCode: "def flatten(lst):\n    return [elem for sublista in lst for elem in sublista]\n\nprint(flatten([[1, 2], [3, 4], [5]]))\n",
      expectedOutput: "[1, 2, 3, 4, 5]" },
  ],
  "tupluri": [
    { name: "Schimb variabile", difficulty: "easy",
      question: "Folosind tuple unpacking, schimbă valorile variabilelor a=10 și b=20 fără variabilă temporară. Afișează valorile înainte și după.",
      starterCode: "a = 10\nb = 20\nprint(f'Inainte: a={a}, b={b}')\na, b = b, a\nprint(f'Dupa: a={a}, b={b}')\n",
      expectedOutput: "Inainte: a=10, b=20\nDupa: a=20, b=10" },
    { name: "Named tuple simplu", difficulty: "medium",
      question: "Creează o tupla `punct = (3, 4)`. Calculează distanța față de origine cu formula sqrt(x²+y²). Afișează rezultatul cu 2 zecimale. Hint: importă math.",
      starterCode: "import math\npunct = (3, 4)\nx, y = punct\ndistanta = math.sqrt(x**2 + y**2)\nprint(f'{distanta:.2f}')\n",
      expectedOutput: "5.00" },
  ],
  "functii-avansate": [
    { name: "Decorator simplu", difficulty: "hard",
      question: "Scrie un decorator `timer` care măsoară și afișează timpul de execuție al unei funcții. Aplică-l pe o funcție `calcul()` care face sum(range(1000000)). Hint: folosește time.time().",
      starterCode: "import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f'{func.__name__} a rulat in {end-start:.4f}s')\n        return result\n    return wrapper\n\n@timer\ndef calcul():\n    return sum(range(1000000))\n\ncalcul()\n",
      expectedOutput: "calcul a rulat in" },
    { name: "Funcție cu *args **kwargs", difficulty: "medium",
      question: "Scrie o funcție `info(*args, **kwargs)` care afișează câte argumente poziționale sunt și fiecare pereche cheie-valoare din kwargs. Testează cu info(1, 2, 3, nume='Ana', varsta=25).",
      starterCode: "def info(*args, **kwargs):\n    print(f'Pozitionale: {len(args)}')\n    for k, v in kwargs.items():\n        print(f'{k}: {v}')\n\ninfo(1, 2, 3, nume='Ana', varsta=25)\n",
      expectedOutput: "Pozitionale: 3\nnume: Ana\nvarsta: 25" },
  ],
  "erori-try-except": [
    { name: "Safe division", difficulty: "easy",
      question: "Scrie o funcție `safe_div(a, b)` care returnează a/b, sau 'Eroare: împărțire la zero' dacă b=0, sau 'Eroare: tip invalid' dacă argumentele nu sunt numerice. Testează cu (10,2), (5,0), ('a',2).",
      starterCode: "def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Eroare: impartire la zero'\n    except TypeError:\n        return 'Eroare: tip invalid'\n\nprint(safe_div(10, 2))\nprint(safe_div(5, 0))\nprint(safe_div('a', 2))\n",
      expectedOutput: "5.0\nEroare: impartire la zero\nEroare: tip invalid" },
    { name: "Excepție custom", difficulty: "medium",
      question: "Definește o excepție `VarstaNegativaError`. Scrie o funcție `set_varsta(v)` care ridică aceasta excepție dacă v < 0. Testează cu varsta 25 și -5.",
      starterCode: "class VarstaNegativaError(Exception):\n    pass\n\ndef set_varsta(v):\n    if v < 0:\n        raise VarstaNegativaError(f'Varsta {v} este invalida')\n    return v\n\ntry:\n    print(set_varsta(25))\n    print(set_varsta(-5))\nexcept VarstaNegativaError as e:\n    print(f'Eroare: {e}')\n",
      expectedOutput: "25\nEroare: Varsta -5 este invalida" },
  ],
  "oop-introducere": [
    { name: "Clasa Rectangle", difficulty: "easy",
      question: "Definește clasa `Rectangle` cu atributele `width` și `height`. Adaugă metodele `area()` și `perimeter()`. Creează un dreptunghi cu w=5, h=3 și afișează aria și perimetrul.",
      starterCode: "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n    \n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\nr = Rectangle(5, 3)\nprint(r.area())\nprint(r.perimeter())\n",
      expectedOutput: "15\n16" },
    { name: "Clasa Stack", difficulty: "medium",
      question: "Implementează clasa `Stack` cu metodele: `push(item)`, `pop()` (returnează și elimină ultimul element), `peek()` (returnează fără a elimina), `is_empty()`, `size()`. Testează toate.",
      starterCode: "class Stack:\n    def __init__(self):\n        self.items = []\n    \n    def push(self, item):\n        self.items.append(item)\n    \n    def pop(self):\n        return self.items.pop()\n    \n    def peek(self):\n        return self.items[-1]\n    \n    def is_empty(self):\n        return len(self.items) == 0\n    \n    def size(self):\n        return len(self.items)\n\ns = Stack()\nprint(s.is_empty())\ns.push(1)\ns.push(2)\ns.push(3)\nprint(s.peek())\nprint(s.pop())\nprint(s.size())\n",
      expectedOutput: "True\n3\n3\n2" },
  ],
  "python-oop-mostenire": [
    { name: "Figuri geometrice", difficulty: "medium",
      question: "Creează clasa de bază `Shape` cu metoda `area()` care returnează 0. Extinde cu `Circle(radius)` și `Square(side)`. Suprascrie `area()` în fiecare. Testează cu Circle(5) și Square(4). Folosește math.pi.",
      starterCode: "import math\n\nclass Shape:\n    def area(self):\n        return 0\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return math.pi * self.radius ** 2\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nprint(f'{Circle(5).area():.2f}')\nprint(Square(4).area())\n",
      expectedOutput: "78.54\n16" },
    { name: "super() și __str__", difficulty: "medium",
      question: "Clasa `Vehicle` cu `make` și `model`. `Car(Vehicle)` adaugă `num_doors`. Folosește `super()` în constructor. Implementează `__str__` care afișează '{make} {model} ({num_doors} uși)'. Testează cu Car('Toyota', 'Corolla', 4).",
      starterCode: "class Vehicle:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n\nclass Car(Vehicle):\n    def __init__(self, make, model, num_doors):\n        super().__init__(make, model)\n        self.num_doors = num_doors\n    \n    def __str__(self):\n        return f'{self.make} {self.model} ({self.num_doors} usi)'\n\nprint(Car('Toyota', 'Corolla', 4))\n",
      expectedOutput: "Toyota Corolla (4 usi)" },
  ],
  "python-dictionaries": [
    { name: "Frecvența cuvintelor", difficulty: "medium",
      question: "Scrie o funcție `word_freq(text)` care returnează un dicționar cu frecvența fiecărui cuvânt. Testează cu 'ana are mere ana are pere'. Afișează sortat după frecvență descrescătoare.",
      starterCode: "def word_freq(text):\n    freq = {}\n    for word in text.split():\n        freq[word] = freq.get(word, 0) + 1\n    return freq\n\nresult = word_freq('ana are mere ana are pere')\nfor k, v in sorted(result.items(), key=lambda x: -x[1]):\n    print(f'{k}: {v}')\n",
      expectedOutput: "ana: 2\nare: 2\nmere: 1\npere: 1" },
    { name: "Merge dicționare", difficulty: "easy",
      question: "Ai două dicționare: `d1 = {'a': 1, 'b': 2}` și `d2 = {'b': 3, 'c': 4}`. Creează un al treilea dicționar care le contopește, cu valorile din d2 prevalând pentru chei comune. Afișează rezultatul sortat.",
      starterCode: "d1 = {'a': 1, 'b': 2}\nd2 = {'b': 3, 'c': 4}\nd3 = {**d1, **d2}\nfor k in sorted(d3):\n    print(f'{k}: {d3[k]}')\n",
      expectedOutput: "a: 1\nb: 3\nc: 4" },
  ],
  "python-sets-tuples": [
    { name: "Operații pe seturi", difficulty: "easy",
      question: "Ai seturile A={1,2,3,4,5} și B={3,4,5,6,7}. Afișează: reuniunea, intersecția, diferența A-B, și verifică dacă {3,4} este subset al lui B.",
      starterCode: "A = {1, 2, 3, 4, 5}\nB = {3, 4, 5, 6, 7}\nprint(sorted(A | B))\nprint(sorted(A & B))\nprint(sorted(A - B))\nprint({3, 4}.issubset(B))\n",
      expectedOutput: "[1, 2, 3, 4, 5, 6, 7]\n[3, 4, 5]\n[1, 2]\nTrue" },
    { name: "Eliminare duplicate ordonate", difficulty: "medium",
      question: "Scrie o funcție `unique_ordered(lst)` care elimină duplicatele dintr-o listă păstrând ordinea inițială a elementelor. Testează cu [3,1,4,1,5,9,2,6,5,3].",
      starterCode: "def unique_ordered(lst):\n    seen = set()\n    result = []\n    for item in lst:\n        if item not in seen:\n            seen.add(item)\n            result.append(item)\n    return result\n\nprint(unique_ordered([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]))\n",
      expectedOutput: "[3, 1, 4, 5, 9, 2, 6]" },
  ],
  "python-comprehensions": [
    { name: "List comprehension filtrat", difficulty: "easy",
      question: "Folosind list comprehension, creează o listă cu pătratele numerelor pare din 1-20. Afișează rezultatul.",
      starterCode: "patrate_pare = [x**2 for x in range(1, 21) if x % 2 == 0]\nprint(patrate_pare)\n",
      expectedOutput: "[4, 16, 36, 64, 100, 144, 196, 256, 324, 400]" },
    { name: "Dict comprehension inversare", difficulty: "medium",
      question: "Ai dicționarul `d = {'a': 1, 'b': 2, 'c': 3}`. Folosind dict comprehension, creează dicționarul inversat (valorile devin chei și viceversa). Afișează rezultatul sortat.",
      starterCode: "d = {'a': 1, 'b': 2, 'c': 3}\ninversat = {v: k for k, v in d.items()}\nfor k in sorted(inversat):\n    print(f'{k}: {inversat[k]}')\n",
      expectedOutput: "1: a\n2: b\n3: c" },
  ],
  "python-functions-advanced": [
    { name: "Funcție care returnează funcție", difficulty: "hard",
      question: "Scrie o funcție `multiplier(n)` care returnează o altă funcție ce înmulțește argumentul cu n. Creează `double = multiplier(2)` și `triple = multiplier(3)`. Testează cu 5.",
      starterCode: "def multiplier(n):\n    def inner(x):\n        return x * n\n    return inner\n\ndouble = multiplier(2)\ntriple = multiplier(3)\nprint(double(5))\nprint(triple(5))\n",
      expectedOutput: "10\n15" },
    { name: "Funcție parțiala", difficulty: "medium",
      question: "Folosind `functools.partial`, creează o funcție `add5` din funcția `add(x, y)` cu y=5 fixat. Testează cu add5(10) și add5(20).",
      starterCode: "from functools import partial\n\ndef add(x, y):\n    return x + y\n\nadd5 = partial(add, y=5)\nprint(add5(10))\nprint(add5(20))\n",
      expectedOutput: "15\n25" },
  ],
  "python-lambda-map-filter": [
    { name: "Map și filter", difficulty: "easy",
      question: "Ai lista `numere = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. Folosind map() și filter(), creează o nouă listă cu pătratele numerelor impare. Afișează rezultatul.",
      starterCode: "numere = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nresult = list(map(lambda x: x**2, filter(lambda x: x % 2 != 0, numere)))\nprint(result)\n",
      expectedOutput: "[1, 9, 25, 49, 81]" },
    { name: "Sort cu lambda", difficulty: "easy",
      question: "Sortează lista de tupluri `[(3,'c'), (1,'a'), (2,'b'), (1,'z')]` mai întâi după primul element, iar la egalitate după al doilea (ambele crescător).",
      starterCode: "lst = [(3, 'c'), (1, 'a'), (2, 'b'), (1, 'z')]\nsortat = sorted(lst, key=lambda x: (x[0], x[1]))\nprint(sortat)\n",
      expectedOutput: "[(1, 'a'), (1, 'z'), (2, 'b'), (3, 'c')]" },
  ],
  "python-oop-avansat": [
    { name: "Property decorator", difficulty: "medium",
      question: "Creează clasa `Temperature` cu atribut privat `_celsius`. Adaugă property `celsius` cu getter/setter (setter validează că temperatura > -273.15). Adaugă property `fahrenheit` (read-only) care calculează F = C*9/5+32.",
      starterCode: "class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n    \n    @property\n    def celsius(self):\n        return self._celsius\n    \n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError('Sub zero absolut!')\n        self._celsius = value\n    \n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\nt = Temperature(100)\nprint(t.celsius)\nprint(t.fahrenheit)\n",
      expectedOutput: "100\n212.0" },
    { name: "__len__ și __contains__", difficulty: "medium",
      question: "Implementează clasa `Library` cu o listă de cărți. Implementează `__len__` (numărul de cărți), `__contains__` (verifică dacă titlul e în bibliotecă), `add(title)`. Testează cu 3 cărți.",
      starterCode: "class Library:\n    def __init__(self):\n        self.books = []\n    \n    def add(self, title):\n        self.books.append(title)\n    \n    def __len__(self):\n        return len(self.books)\n    \n    def __contains__(self, title):\n        return title in self.books\n\nlib = Library()\nlib.add('Python')\nlib.add('Clean Code')\nlib.add('SICP')\nprint(len(lib))\nprint('Python' in lib)\nprint('Java' in lib)\n",
      expectedOutput: "3\nTrue\nFalse" },
  ],
  "python-exceptions": [
    { name: "Ierarhie excepții", difficulty: "medium",
      question: "Creează ierarhia: `AppError` → `ValidationError` și `DatabaseError`. Scrie o funcție `process(value)` care ridică `ValidationError` dacă value < 0 și `DatabaseError` dacă value > 100. Prinde fiecare tip separat.",
      starterCode: "class AppError(Exception): pass\nclass ValidationError(AppError): pass\nclass DatabaseError(AppError): pass\n\ndef process(value):\n    if value < 0:\n        raise ValidationError(f'Valoare negativa: {value}')\n    if value > 100:\n        raise DatabaseError(f'Valoare prea mare: {value}')\n    return value\n\nfor v in [-1, 150, 50]:\n    try:\n        print(process(v))\n    except ValidationError as e:\n        print(f'Validare: {e}')\n    except DatabaseError as e:\n        print(f'DB: {e}')\n",
      expectedOutput: "Validare: Valoare negativa: -1\nDB: Valoare prea mare: 150\n50" },
  ],
  "python-file-io": [
    { name: "Scriere și citire fișier", difficulty: "easy",
      question: "Scrie o funcție `save_and_read(filename, lines)` care salvează liniile într-un fișier text, apoi le recitește și le afișează. Folosește context manager (with open). Testează cu 3 linii.",
      starterCode: "def save_and_read(filename, lines):\n    with open(filename, 'w') as f:\n        for line in lines:\n            f.write(line + '\\n')\n    with open(filename, 'r') as f:\n        for line in f:\n            print(line.strip())\n\nsave_and_read('test.txt', ['Prima linie', 'A doua linie', 'A treia linie'])\n",
      expectedOutput: "Prima linie\nA doua linie\nA treia linie" },
  ],
  "python-generators-iterators": [
    { name: "Generator infinit", difficulty: "medium",
      question: "Scrie un generator `fibonacci()` care produce șirul Fibonacci la infinit. Folosind `itertools.islice`, afișează primii 10 termeni.",
      starterCode: "def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfrom itertools import islice\nprint(list(islice(fibonacci(), 10)))\n",
      expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]" },
    { name: "Generator cu yield from", difficulty: "hard",
      question: "Scrie un generator `flatten(nested)` care aplatizează o structură arborescentă de liste. Testează cu [[1, [2, 3]], [4, [5, [6]]]].",
      starterCode: "def flatten(nested):\n    for item in nested:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item\n\nprint(list(flatten([[1, [2, 3]], [4, [5, [6]]]])))\n",
      expectedOutput: "[1, 2, 3, 4, 5, 6]" },
  ],
  "python-context-managers": [
    { name: "Context manager cu class", difficulty: "medium",
      question: "Implementează un context manager `Timer` care măsoară timpul de execuție al unui bloc with. Afișează 'Start timer' la intrare și 'Timp: Xs' la ieșire. Testează cu un calcul sum(range(1000000)).",
      starterCode: "import time\n\nclass Timer:\n    def __enter__(self):\n        print('Start timer')\n        self.start = time.time()\n        return self\n    \n    def __exit__(self, *args):\n        elapsed = time.time() - self.start\n        print(f'Timp: {elapsed:.4f}s')\n\nwith Timer():\n    result = sum(range(1000000))\n",
      expectedOutput: "Start timer\nTimp:" },
  ],
  "python-dataclasses": [
    { name: "Dataclass produs", difficulty: "easy",
      question: "Definește o `@dataclass` numită `Product` cu câmpurile: `name: str`, `price: float`, `quantity: int = 0`. Adaugă o metodă `total_value()` care returnează price * quantity. Creează 2 produse și afișează valoarea totală.",
      starterCode: "from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    quantity: int = 0\n    \n    def total_value(self):\n        return self.price * self.quantity\n\np1 = Product('Laptop', 1200.0, 3)\np2 = Product('Mouse', 50.0, 10)\nprint(p1.total_value())\nprint(p2.total_value())\n",
      expectedOutput: "3600.0\n500.0" },
  ],
  "python-regex": [
    { name: "Validare email regex", difficulty: "medium",
      question: "Scrie o funcție `valid_email(email)` care verifică dacă un email este valid (conține un @, domeniu cu punct, min 2 caractere TLD). Testează cu 'test@example.com', 'invalid@', '@nodomain.com', 'ok@sub.domain.ro'.",
      starterCode: "import re\n\ndef valid_email(email):\n    pattern = r'^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$'\n    return bool(re.match(pattern, email))\n\ntests = ['test@example.com', 'invalid@', '@nodomain.com', 'ok@sub.domain.ro']\nfor e in tests:\n    print(f'{e}: {valid_email(e)}')\n",
      expectedOutput: "test@example.com: True\ninvalid@: False\n@nodomain.com: False\nok@sub.domain.ro: True" },
    { name: "Extragere date din text", difficulty: "medium",
      question: "Extrage toate numerele de telefon din textul: 'Sună la 0720-123-456 sau 0731.987.654 sau 0040-21-3456789'. Returnează o listă cu numerele găsite.",
      starterCode: "import re\n\ntext = 'Suna la 0720-123-456 sau 0731.987.654 sau 0040-21-3456789'\ntelefoane = re.findall(r'[0-9][0-9.\\-]+[0-9]', text)\nprint(telefoane)\n",
      expectedOutput: "['0720-123-456', '0731.987.654', '0040-21-3456789']" },
  ],
  "python-type-annotations-modern": [
    { name: "Funcție cu tipuri", difficulty: "easy",
      question: "Scrie o funcție `calculate_bmi(weight: float, height: float) -> str` cu type hints care calculează BMI și returnează categoria: 'Subponderal' (<18.5), 'Normal' (18.5-25), 'Supraponderal' (25-30), 'Obez' (>30). Testează cu weight=70, height=1.75.",
      starterCode: "def calculate_bmi(weight: float, height: float) -> str:\n    bmi = weight / height ** 2\n    if bmi < 18.5:\n        return 'Subponderal'\n    elif bmi < 25:\n        return 'Normal'\n    elif bmi < 30:\n        return 'Supraponderal'\n    else:\n        return 'Obez'\n\nprint(calculate_bmi(70, 1.75))\nprint(calculate_bmi(90, 1.75))\n",
      expectedOutput: "Normal\nSupraponderal" },
  ],
  "python-design-patterns": [
    { name: "Singleton", difficulty: "hard",
      question: "Implementează pattern-ul Singleton pentru o clasă `Config` care stochează setări. Verifică că două instanțe sunt aceeași (is check). Adaugă o metodă `set(key, value)` și `get(key)`.",
      starterCode: "class Config:\n    _instance = None\n    _settings = {}\n    \n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n    \n    def set(self, key, value):\n        self._settings[key] = value\n    \n    def get(self, key):\n        return self._settings.get(key)\n\nc1 = Config()\nc2 = Config()\nc1.set('debug', True)\nprint(c2.get('debug'))\nprint(c1 is c2)\n",
      expectedOutput: "True\nTrue" },
    { name: "Observer pattern", difficulty: "hard",
      question: "Implementează Observer pattern: `EventEmitter` cu `on(event, callback)` și `emit(event, *args)`. Testează înregistrând 2 listeneri pe evenimentul 'click' și emitând evenimentul.",
      starterCode: "class EventEmitter:\n    def __init__(self):\n        self.listeners = {}\n    \n    def on(self, event, callback):\n        if event not in self.listeners:\n            self.listeners[event] = []\n        self.listeners[event].append(callback)\n    \n    def emit(self, event, *args):\n        for cb in self.listeners.get(event, []):\n            cb(*args)\n\nemitter = EventEmitter()\nemitter.on('click', lambda x: print(f'Listener 1: {x}'))\nemitter.on('click', lambda x: print(f'Listener 2: {x}'))\nemitter.emit('click', 'buton')\n",
      expectedOutput: "Listener 1: buton\nListener 2: buton" },
  ],
  "python-machine-learning": [
    { name: "Normalizare date", difficulty: "medium",
      question: "Implementează funcția `min_max_normalize(data)` care normalizează o listă de numere între 0 și 1 (formula: (x - min) / (max - min)). Testează cu [10, 20, 30, 40, 50].",
      starterCode: "def min_max_normalize(data):\n    min_val = min(data)\n    max_val = max(data)\n    return [(x - min_val) / (max_val - min_val) for x in data]\n\nresult = min_max_normalize([10, 20, 30, 40, 50])\nprint([round(x, 2) for x in result])\n",
      expectedOutput: "[0.0, 0.25, 0.5, 0.75, 1.0]" },
    { name: "Distanța Euclidiana", difficulty: "easy",
      question: "Calculează distanța Euclidiană între doi vectori `a = [1, 2, 3]` și `b = [4, 6, 3]` folosind formula sqrt(sum((ai-bi)^2)). Afișează cu 4 zecimale.",
      starterCode: "import math\n\ndef euclidean_distance(a, b):\n    return math.sqrt(sum((ai - bi) ** 2 for ai, bi in zip(a, b)))\n\nprint(f'{euclidean_distance([1, 2, 3], [4, 6, 3]):.4f}')\n",
      expectedOutput: "5.0000" },
  ],
  "python-pandas": [
    { name: "Statistici cu dict", difficulty: "medium",
      question: "Simulează funcționalitatea Pandas fără a folosi Pandas: ai o 'tabelă' ca listă de dict-uri cu coloanele 'name', 'age', 'score'. Calculează media vârstei și scor-ul maxim. Afișează rezultatele.",
      starterCode: "data = [\n    {'name': 'Ana', 'age': 25, 'score': 85},\n    {'name': 'Ion', 'age': 30, 'score': 92},\n    {'name': 'Maria', 'age': 22, 'score': 78},\n    {'name': 'Vlad', 'age': 28, 'score': 95},\n]\n\nages = [r['age'] for r in data]\nscores = [r['score'] for r in data]\nprint(f'Media varsta: {sum(ages)/len(ages):.1f}')\nprint(f'Scor maxim: {max(scores)}')\n",
      expectedOutput: "Media varsta: 26.2\nScor maxim: 95" },
  ],
  "python-numpy": [
    { name: "Operații pe array", difficulty: "easy",
      question: "Fără NumPy, simulează operații vectoriale pe liste: creează doi vectori `a = [1,2,3,4,5]` și `b = [10,20,30,40,50]`. Calculează: suma elementelor, produsul punct și norma lui a. Afișează rezultatele.",
      starterCode: "a = [1, 2, 3, 4, 5]\nb = [10, 20, 30, 40, 50]\n\n# suma elementelor lui a\nprint(sum(a))\n# produs punct (dot product)\nprint(sum(ai * bi for ai, bi in zip(a, b)))\n# norma lui a\nimport math\nprint(round(math.sqrt(sum(x**2 for x in a)), 4))\n",
      expectedOutput: "15\n550\n7.4162" },
  ],
  "python-async-await": [
    { name: "Async/await basic", difficulty: "hard",
      question: "Scrie două funcții async `task_a()` și `task_b()` care simulează operații cu asyncio.sleep(0). task_a afișează 'Start A', 'End A', task_b afișează 'Start B', 'End B'. Rulează-le concurent cu asyncio.gather.",
      starterCode: "import asyncio\n\nasync def task_a():\n    print('Start A')\n    await asyncio.sleep(0)\n    print('End A')\n\nasync def task_b():\n    print('Start B')\n    await asyncio.sleep(0)\n    print('End B')\n\nasyncio.run(asyncio.gather(task_a(), task_b()))\n",
      expectedOutput: "Start A\nStart B\nEnd A\nEnd B" },
  ],
  "python-fastapi": [
    { name: "Simulare endpoint FastAPI", difficulty: "medium",
      question: "Fără FastAPI, simulează logica unui endpoint: o funcție `get_user(user_id: int)` care returnează un dicționar cu datele utilizatorului dacă ID-ul există în baza de date, sau `{error: 'Not found'}` altfel. Testează cu ID-urile 1, 2, 99.",
      starterCode: "users_db = {\n    1: {'id': 1, 'name': 'Ana', 'email': 'ana@example.com'},\n    2: {'id': 2, 'name': 'Ion', 'email': 'ion@example.com'},\n}\n\ndef get_user(user_id: int):\n    return users_db.get(user_id, {'error': 'Not found'})\n\nfor uid in [1, 2, 99]:\n    print(get_user(uid))\n",
      expectedOutput: "{'id': 1, 'name': 'Ana', 'email': 'ana@example.com'}\n{'id': 2, 'name': 'Ion', 'email': 'ion@example.com'}\n{'error': 'Not found'}" },
  ],
  "python-stdlib-useful": [
    { name: "Counter și defaultdict", difficulty: "medium",
      question: "Folosind `collections.Counter`, numără frecvența literelor în cuvântul 'mississippi'. Afișează primele 3 cele mai frecvente litere cu numărul lor.",
      starterCode: "from collections import Counter\n\nword = 'mississippi'\ncounter = Counter(word)\nfor letter, count in counter.most_common(3):\n    print(f'{letter}: {count}')\n",
      expectedOutput: "s: 4\ni: 4\np: 2" },
  ],
  "python-testing": [
    { name: "Teste unitare simple", difficulty: "medium",
      question: "Scrie teste unitare cu `unittest` pentru funcția `fizzbuzz(n)` care returnează 'Fizz', 'Buzz', 'FizzBuzz' sau str(n). Testează cel puțin 4 cazuri.",
      starterCode: "import unittest\n\ndef fizzbuzz(n):\n    if n % 15 == 0: return 'FizzBuzz'\n    if n % 3 == 0: return 'Fizz'\n    if n % 5 == 0: return 'Buzz'\n    return str(n)\n\nclass TestFizzBuzz(unittest.TestCase):\n    def test_normal(self):\n        self.assertEqual(fizzbuzz(1), '1')\n    def test_fizz(self):\n        self.assertEqual(fizzbuzz(3), 'Fizz')\n    def test_buzz(self):\n        self.assertEqual(fizzbuzz(5), 'Buzz')\n    def test_fizzbuzz(self):\n        self.assertEqual(fizzbuzz(15), 'FizzBuzz')\n\nif __name__ == '__main__':\n    result = unittest.main(exit=False, verbosity=0)\n    print('OK' if result.result.wasSuccessful() else 'FAIL')\n",
      expectedOutput: "OK" },
  ],
  "python-web-requests": [
    { name: "Simulare request HTTP", difficulty: "medium",
      question: "Fără requests, simulează logica unui client HTTP: scrie o funcție `mock_get(url)` care returnează un dict cu `status_code` și `json`. Parsează URL-ul și returnează date diferite pentru '/users' vs '/posts'. Testează cu ambele.",
      starterCode: "def mock_get(url):\n    if '/users' in url:\n        return {'status_code': 200, 'json': [{'id': 1, 'name': 'Ana'}]}\n    elif '/posts' in url:\n        return {'status_code': 200, 'json': [{'id': 1, 'title': 'Post 1'}]}\n    return {'status_code': 404, 'json': {'error': 'Not found'}}\n\nfor endpoint in ['/users', '/posts', '/other']:\n    resp = mock_get(endpoint)\n    print(f'{endpoint}: {resp[\"status_code\"]}')\n",
      expectedOutput: "/users: 200\n/posts: 200\n/other: 404" },
  ],
  "python-concurenta": [
    { name: "Threading simplu", difficulty: "hard",
      question: "Creează 3 thread-uri care fiecare afișează un mesaj cu numărul lor (1, 2, 3). Folosește `threading.Thread`. Adaugă join() pentru fiecare. Afișează și un mesaj final 'Toate thread-urile gata'.",
      starterCode: "import threading\n\ndef task(n):\n    print(f'Thread {n} pornit')\n\nthreads = []\nfor i in range(1, 4):\n    t = threading.Thread(target=task, args=(i,))\n    threads.append(t)\n    t.start()\n\nfor t in threads:\n    t.join()\n\nprint('Toate thread-urile gata')\n",
      expectedOutput: "Thread 1 pornit\nThread 2 pornit\nThread 3 pornit\nToate thread-urile gata" },
  ],
  "python-mini-proiect": [
    { name: "Mini calculator RPN", difficulty: "hard",
      question: "Implementează un calculator Reverse Polish Notation (RPN). Evaluează expresia '3 4 + 2 * 7 -' (care înseamnă (3+4)*2-7 = 7). Folosește un stack. Suportă +, -, *, /.",
      starterCode: "def evaluate_rpn(expression):\n    stack = []\n    for token in expression.split():\n        if token in '+-*/':\n            b, a = stack.pop(), stack.pop()\n            if token == '+': stack.append(a + b)\n            elif token == '-': stack.append(a - b)\n            elif token == '*': stack.append(a * b)\n            elif token == '/': stack.append(a / b)\n        else:\n            stack.append(float(token))\n    return stack[0]\n\nprint(evaluate_rpn('3 4 + 2 * 7 -'))\n",
      expectedOutput: "7.0" },
  ],
  "python-proiect-final": [
    { name: "Manager de sarcini", difficulty: "hard",
      question: "Implementează un `TaskManager` cu: `add_task(title, priority)`, `complete_task(title)`, `get_pending()` (sortate după prioritate desc), `stats()` (total, completate, în așteptare). Testează cu 4 sarcini.",
      starterCode: "class TaskManager:\n    def __init__(self):\n        self.tasks = []\n    \n    def add_task(self, title, priority=1):\n        self.tasks.append({'title': title, 'priority': priority, 'done': False})\n    \n    def complete_task(self, title):\n        for t in self.tasks:\n            if t['title'] == title:\n                t['done'] = True\n                return\n    \n    def get_pending(self):\n        return sorted([t for t in self.tasks if not t['done']], key=lambda x: -x['priority'])\n    \n    def stats(self):\n        total = len(self.tasks)\n        done = sum(1 for t in self.tasks if t['done'])\n        return {'total': total, 'done': done, 'pending': total - done}\n\ntm = TaskManager()\ntm.add_task('Codat', 3)\ntm.add_task('Documentat', 1)\ntm.add_task('Testat', 2)\ntm.add_task('Deploy', 3)\ntm.complete_task('Codat')\nprint(tm.stats())\nfor t in tm.get_pending():\n    print(f\"{t['title']} (p={t['priority']})\")\n",
      expectedOutput: "{'total': 4, 'done': 1, 'pending': 3}\nDeploy (p=3)\nTestat (p=2)\nDocumentat (p=1)" },
  ],
};

async function main() {
  console.log('Adăugare coding tasks Python (batch 2)...');
  let added = 0, skipped = 0;

  for (const [slug, tasks] of Object.entries(TASKS)) {
    const lesson = await prisma.lesson.findFirst({ where: { slug } });
    if (!lesson) { console.log(`  [skip] ${slug} — negăsit`); skipped++; continue; }

    const existing = await prisma.task.count({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing >= 2) { console.log(`  [skip] ${slug} — are deja ${existing} coding tasks`); skipped++; continue; }

    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    let n = (maxTask?.number ?? 0) + 1;

    for (const t of tasks) {
      await prisma.task.create({
        data: {
          lessonId: lesson.id, number: n++,
          name: t.name, question: t.question,
          options: [], answer: '',
          explanation: t.explanation || t.expectedOutput || '',
          difficulty: t.difficulty || 'medium',
          type: 'coding', language: 'python',
          starterCode: t.starterCode || '',
          expectedOutput: t.expectedOutput || '',
        },
      });
      added++;
    }
    console.log(`  [ok] ${slug} — ${tasks.length} tasks`);
  }

  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
