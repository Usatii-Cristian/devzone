const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  {
    lessonId: "6a021a68f0ec7fc9c03a622f",
    name: "38. Debugging și profiling",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru a seta un breakpoint în Python:\n```python\nimport ___\npdb.set_trace()\n```", answer:"pdb", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a măsura timpul de execuție:\n```python\nimport ___\nstart = time.perf_counter()\n```", answer:"time", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează decoratorul pentru profiling cu cProfile:\n```python\nimport cProfile\ncProfile.___(my_function)\n```", answer:"run", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Ce afișează codul următor?\n```python\nx = [1, 2, 3]\nprint(type(x).__name__)\n``` Răspuns: `___`", answer:"list", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Completează pentru a printa variabilele locale:\n```python\ndef f(x, y):\n    print(___())\nf(1, 2)\n```", answer:"locals", difficulty:"medium" },
      { number:11, type:"coding", question:"Scrie cod care măsoară timpul de execuție al sumei primelor 1000 de numere și afișează rezultatul sumei:\n```\n499500\n```", answer:"", starterCode:"", language:"python", expectedOutput:"499500", difficulty:"medium" },
      { number:12, type:"coding", question:"Afișează toate variabilele globale definite de utilizator (nu cele care încep cu __) dintr-un dict {'a':1,'b':2}:\n```\na\nb\n```", answer:"", starterCode:"", language:"python", expectedOutput:"a\nb", difficulty:"medium" },
      { number:13, type:"coding", question:"Scrie o funcție factorial(n) și afișează factorial(5):\n```\n120\n```", answer:"", starterCode:"", language:"python", expectedOutput:"120", difficulty:"medium" },
      { number:14, type:"coding", question:"Folosind timeit logic simplu: afișează cât durează (în microsecunde) crearea unei liste [x*2 for x in range(1000)] — afișează doar '1000' (count):\n```\n1000\n```", answer:"", starterCode:"", language:"python", expectedOutput:"1000", difficulty:"medium" },
      { number:15, type:"coding", question:"Afișează primele 3 atribute ale unui obiect list folosind dir():\n```\n__add__\n__class__\n__class_getitem__\n```", answer:"", starterCode:"", language:"python", expectedOutput:"__add__\n__class__\n__class_getitem__", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a021a69f0ec7fc9c03a6236",
    name: "39. Design patterns în Python",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru Singleton:\n```python\nclass Singleton:\n    _instance = ___\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n```", answer:"None", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru Factory pattern:\n```python\nclass AnimalFactory:\n    @staticmethod\n    def create(tip):\n        if tip == 'caine': ___ Caine()\n```", answer:"return", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru Observer pattern:\n```python\nclass Subject:\n    def __init__(self):\n        self._observers = ___\n```", answer:"[]", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Ce design pattern folosește decoratorul Python (@functools.wraps)?\nRăspuns: `___`", answer:"Decorator", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Completează pentru Strategy pattern:\n```python\nclass Context:\n    def __init__(self, strategy):\n        self._strategy = ___\n```", answer:"strategy", difficulty:"medium" },
      { number:11, type:"coding", question:"Implementează Singleton simplu și verifică că două instanțe sunt identice. Afișează:\n```\nTrue\n```", answer:"", starterCode:"", language:"python", expectedOutput:"True", difficulty:"medium" },
      { number:12, type:"coding", question:"Implementează Factory care creează 'cerc' sau 'patrat'. Creează un 'cerc' și afișează tipul:\n```\ncerc\n```", answer:"", starterCode:"", language:"python", expectedOutput:"cerc", difficulty:"medium" },
      { number:13, type:"coding", question:"Implementează Observer: Subject notifică 2 observatori. Afișează mesajele primite:\n```\nObserver1: eveniment\nObserver2: eveniment\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Observer1: eveniment\nObserver2: eveniment", difficulty:"medium" },
      { number:14, type:"coding", question:"Folosind functools.wraps, scrie un decorator @cronometru care afișează 'Executat'. Aplică pe o funcție și rulează:\n```\nExecutat\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Executat", difficulty:"medium" },
      { number:15, type:"coding", question:"Implementează Builder pentru Pizza cu ingrediente. Construiește o pizza cu 'mozzarella' și 'rosii' și afișează:\n```\nmozzarella, rosii\n```", answer:"", starterCode:"", language:"python", expectedOutput:"mozzarella, rosii", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a021a6af0ec7fc9c03a623d",
    name: "40. Mini proiect Python — CLI Todo App",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru a citi argumentele CLI:\n```python\nimport ___\nparser = argparse.ArgumentParser()\n```", answer:"argparse", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a adăuga un argument:\n```python\nparser.___(\"--task\", help=\"Task de adăugat\")\n```", answer:"add_argument", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru a salva JSON:\n```python\nimport json\nwith open('tasks.json', 'w') as f:\n    json.___(tasks, f)\n```", answer:"dump", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru a citi JSON:\n```python\nwith open('tasks.json') as f:\n    tasks = json.___(f)\n```", answer:"load", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce metodă verifică dacă un fișier există?\n```python\nfrom pathlib import Path\nPath('tasks.json').___\n``` Răspuns: `___`", answer:"exists()", difficulty:"medium" },
      { number:11, type:"coding", question:"Scrie cod care creează o listă de tasks, adaugă 'Cumpărături', marchează ca done și afișează taskul:\n```\nCumpărături - done\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Cumpărături - done", difficulty:"medium" },
      { number:12, type:"coding", question:"Filtrează task-urile nedone dintr-o listă și afișează câte sunt:\n```python\ntasks = [{'name':'a','done':True},{'name':'b','done':False},{'name':'c','done':False}]\n```\n```\n2\n```", answer:"", starterCode:"", language:"python", expectedOutput:"2", difficulty:"medium" },
      { number:13, type:"coding", question:"Sortează o listă de task-uri după prioritate (1=mare) și afișează primul:\n```\nurgent\n```", answer:"", starterCode:"", language:"python", expectedOutput:"urgent", difficulty:"medium" },
      { number:14, type:"coding", question:"Numără task-urile done și undone și afișează:\n```\nDone: 2\nUndone: 3\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Done: 2\nUndone: 3", difficulty:"medium" },
      { number:15, type:"coding", question:"Implementează o clasă TodoApp cu add() și list(). Adaugă 3 taskuri și afișează numărul:\n```\n3\n```", answer:"", starterCode:"", language:"python", expectedOutput:"3", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b0859384b94515fcec5b",
    name: "42. Pandas pentru Data Science",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru a crea un DataFrame:\n```python\nimport pandas as pd\ndf = pd.___(data)\n```", answer:"DataFrame", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a filtra rândurile unde vârsta > 25:\n```python\ndf_adult = df[df['varsta'] ___ 25]\n```", answer:">", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru a elimina valorile lipsă:\n```python\ndf_curat = df.___() \n```", answer:"dropna", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru a grupa și calcula media:\n```python\ndf.groupby('categorie')['valoare'].___() \n```", answer:"mean", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce metodă afișează primele 5 rânduri? Răspuns: `___`", answer:"head()", difficulty:"medium" },
      { number:11, type:"coding", question:"Creează un DataFrame cu coloanele 'nume' și 'nota' (3 studenți). Afișează media notelor:\n```\n8.0\n```", answer:"", starterCode:"", language:"python", expectedOutput:"8.0", difficulty:"medium" },
      { number:12, type:"coding", question:"Dintr-un DataFrame cu coloane 'produs' și 'pret', afișează produsul cu prețul maxim:\n```\nLaptop\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Laptop", difficulty:"medium" },
      { number:13, type:"coding", question:"Afișează câte valori lipsă (NaN) sunt în coloana 'email' a unui DataFrame:\n```\n2\n```", answer:"", starterCode:"", language:"python", expectedOutput:"2", difficulty:"medium" },
      { number:14, type:"coding", question:"Filtrează studenții cu nota >= 9 și afișează câți sunt:\n```\n2\n```", answer:"", starterCode:"", language:"python", expectedOutput:"2", difficulty:"medium" },
      { number:15, type:"coding", question:"Grupează vânzările pe lună și afișează totalul pentru 'ian':\n```\n5000\n```", answer:"", starterCode:"", language:"python", expectedOutput:"5000", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b0879384b94515fcec6f",
    name: "43. NumPy — Calcul Numeric",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru a crea un array:\n```python\nimport numpy as np\narr = np.___([ 1, 2, 3, 4 ])\n```", answer:"array", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru un array de zerouri 3x3:\n```python\nmatrix = np.___(( 3, 3 ))\n```", answer:"zeros", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru înmulțire element-wise:\n```python\na = np.array([1,2,3])\nb = np.array([4,5,6])\nrezultat = a ___ b\n```", answer:"*", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru a calcula media unui array:\n```python\narr = np.array([1,2,3,4,5])\nprint(np.___(arr))\n```", answer:"mean", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce metodă reshape-uiește un array?\n```python\narr = np.arange(6).___((2, 3))\n``` Răspuns: `___`", answer:"reshape", difficulty:"medium" },
      { number:11, type:"coding", question:"Creează un array [1..10], calculează suma și afișează:\n```\n55\n```", answer:"", starterCode:"", language:"python", expectedOutput:"55", difficulty:"medium" },
      { number:12, type:"coding", question:"Creează o matrice identitate 3x3 cu np.eye și afișează elementul [1][1]:\n```\n1.0\n```", answer:"", starterCode:"", language:"python", expectedOutput:"1.0", difficulty:"medium" },
      { number:13, type:"coding", question:"Înmulțește două array-uri [1,2,3] și [4,5,6] element-wise și afișează suma produselor:\n```\n32\n```", answer:"", starterCode:"", language:"python", expectedOutput:"32", difficulty:"medium" },
      { number:14, type:"coding", question:"Reshape un array de la shape (6,) la (2,3) și afișează elementul de pe rândul 1, coloana 2:\n```\n6\n```", answer:"", starterCode:"", language:"python", expectedOutput:"6", difficulty:"medium" },
      { number:15, type:"coding", question:"Calculează deviația standard a array-ului [2,4,4,4,5,5,7,9] și afișează rotunjit la 2 zecimale:\n```\n2.0\n```", answer:"", starterCode:"", language:"python", expectedOutput:"2.0", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b08a9384b94515fcec83",
    name: "44. Matplotlib si Seaborn — Vizualizare Date",
    tasks: [
      { number:6, type:"fillblank", question:"Completează importul standard:\n```python\nimport matplotlib.pyplot as ___\n```", answer:"plt", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a seta titlul graficului:\n```python\nplt.___(\"Vânzări 2025\")\n```", answer:"title", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează importul Seaborn:\n```python\nimport seaborn as ___\n```", answer:"sns", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru a crea un histogramă cu seaborn:\n```python\nsns.___(data=df, x='varsta')\n```", answer:"histplot", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce metodă salvează graficul ca fișier?\n```python\nplt.___('grafic.png')\n``` Răspuns: `___`", answer:"savefig", difficulty:"medium" },
      { number:11, type:"coding", question:"Calculează minimul, maximul și media listei [23,45,12,67,34] și afișează:\n```\n12\n67\n36.2\n```", answer:"", starterCode:"", language:"python", expectedOutput:"12\n67\n36.2", difficulty:"medium" },
      { number:12, type:"coding", question:"Numără câte valori sunt sub 50 în lista [23,45,12,67,34,89,15]:\n```\n4\n```", answer:"", starterCode:"", language:"python", expectedOutput:"4", difficulty:"medium" },
      { number:13, type:"coding", question:"Calculează media mobilă simplă (fereastră 3) pentru [1,2,3,4,5] și afișează al doilea element:\n```\n3.0\n```", answer:"", starterCode:"", language:"python", expectedOutput:"3.0", difficulty:"medium" },
      { number:14, type:"coding", question:"Normalizează lista [10,20,30,40,50] la interval [0,1] și afișează primul și ultimul element:\n```\n0.0\n1.0\n```", answer:"", starterCode:"", language:"python", expectedOutput:"0.0\n1.0", difficulty:"medium" },
      { number:15, type:"coding", question:"Calculează corelația Pearson simplă dintre [1,2,3,4,5] și [2,4,6,8,10] și afișează:\n```\n1.0\n```", answer:"", starterCode:"", language:"python", expectedOutput:"1.0", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b08c9384b94515fcec97",
    name: "45. FastAPI — Web API modern",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru a crea aplicația FastAPI:\n```python\nfrom fastapi import FastAPI\napp = ___() \n```", answer:"FastAPI", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează decoratorul pentru GET endpoint:\n```python\n@app.___('/items')\nasync def get_items():\n    return []\n```", answer:"get", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru a defini un model Pydantic:\n```python\nfrom pydantic import BaseModel\nclass Item(___): \n    name: str\n    price: float\n```", answer:"BaseModel", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru parametru de cale (path):\n```python\n@app.get('/items/{item_id}')\nasync def get_item(___: int):\n    return {'id': item_id}\n```", answer:"item_id", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce comandă pornește serverul uvicorn?\n```bash\nuvicorn main:app ___\n``` Răspuns: `___`", answer:"--reload", difficulty:"medium" },
      { number:11, type:"coding", question:"Definește o funcție async care returnează un dict cu status. Afișează valoarea cheii 'status':\n```\nok\n```", answer:"", starterCode:"", language:"python", expectedOutput:"ok", difficulty:"medium" },
      { number:12, type:"coding", question:"Creează un model Pydantic simplu Product(name, price) și instanțiază-l. Afișează name:\n```\nLaptop\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Laptop", difficulty:"medium" },
      { number:13, type:"coding", question:"Simulează un endpoint care filtrează produse după preț minim. Afișează câte produse trec filtrul price>=100:\n```\n2\n```", answer:"", starterCode:"", language:"python", expectedOutput:"2", difficulty:"medium" },
      { number:14, type:"coding", question:"Implementează validare Pydantic: Product cu price > 0. Prinde ValidationError și afișează:\n```\nPret invalid\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Pret invalid", difficulty:"medium" },
      { number:15, type:"coding", question:"Simulează router cu prefix '/api/v1'. Construiește URL-ul complet pentru '/items' și afișează:\n```\n/api/v1/items\n```", answer:"", starterCode:"", language:"python", expectedOutput:"/api/v1/items", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b08f9384b94515fcecab",
    name: "46. SQLAlchemy — ORM in Python",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru a crea engine-ul:\n```python\nfrom sqlalchemy import create_engine\nengine = ___(\"sqlite:///app.db\")\n```", answer:"create_engine", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a defini un model:\n```python\nfrom sqlalchemy.orm import DeclarativeBase\nclass Base(___): pass\n```", answer:"DeclarativeBase", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru a adăuga un obiect:\n```python\nwith Session(engine) as session:\n    session.___(new_user)\n    session.commit()\n```", answer:"add", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru a interoga toți utilizatorii:\n```python\nusers = session.exec(select(___)).all()\n```", answer:"User", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce decorator marchează o coloană ca cheie primară?\n```python\nfrom sqlalchemy import Column, Integer\nid: int = Column(Integer, ___=True)\n``` Răspuns: `___`", answer:"primary_key", difficulty:"medium" },
      { number:11, type:"coding", question:"Creează o clasă User cu câmpurile id și name. Afișează numele câmpurilor:\n```\nid\nname\n```", answer:"", starterCode:"", language:"python", expectedOutput:"id\nname", difficulty:"medium" },
      { number:12, type:"coding", question:"Simulează un repository pattern: creează 3 useri și afișează câți sunt:\n```\n3\n```", answer:"", starterCode:"", language:"python", expectedOutput:"3", difficulty:"medium" },
      { number:13, type:"coding", question:"Filtrează o listă de useri cu vârsta >= 18 și afișează numărul:\n```\n2\n```", answer:"", starterCode:"", language:"python", expectedOutput:"2", difficulty:"medium" },
      { number:14, type:"coding", question:"Simulează o relație One-to-Many: un user cu 3 posts. Afișează numărul de posts:\n```\n3\n```", answer:"", starterCode:"", language:"python", expectedOutput:"3", difficulty:"medium" },
      { number:15, type:"coding", question:"Implementează un model cu created_at default la datetime.now(). Creează instanță și afișează tipul câmpului:\n```\ndatetime\n```", answer:"", starterCode:"", language:"python", expectedOutput:"datetime", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b0929384b94515fcecbf",
    name: "47. Docker si Python",
    tasks: [
      { number:6, type:"fillblank", question:"Completează instrucțiunea de bază a Dockerfile:\n```dockerfile\n___ python:3.12-slim\n```", answer:"FROM", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a copia fișierele:\n```dockerfile\n___ requirements.txt .\n```", answer:"COPY", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru a instala dependențele:\n```dockerfile\n___ pip install -r requirements.txt\n```", answer:"RUN", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru a seta comanda implicită:\n```dockerfile\n___ [\"python\", \"main.py\"]\n```", answer:"CMD", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce comandă construiește imaginea Docker?\n```bash\ndocker ___ -t myapp .\n``` Răspuns: `___`", answer:"build", difficulty:"medium" },
      { number:11, type:"coding", question:"Scrie conținutul unui Dockerfile minimal pentru Python ca string și afișează prima linie:\n```\nFROM python:3.12-slim\n```", answer:"", starterCode:"", language:"python", expectedOutput:"FROM python:3.12-slim", difficulty:"medium" },
      { number:12, type:"coding", question:"Simulează parsarea unui docker-compose.yml simplu. Afișează serviciile disponibile:\n```\nweb\ndb\n```", answer:"", starterCode:"", language:"python", expectedOutput:"web\ndb", difficulty:"medium" },
      { number:13, type:"coding", question:"Calculează câte layer-uri are un Dockerfile cu 5 instrucțiuni RUN, 2 COPY, 1 FROM:\n```\n8\n```", answer:"", starterCode:"", language:"python", expectedOutput:"8", difficulty:"medium" },
      { number:14, type:"coding", question:"Afișează variabilele de mediu necesare pentru o aplicație Python cu DB:\n```\nDATABASE_URL\nSECRET_KEY\nDEBUG\n```", answer:"", starterCode:"", language:"python", expectedOutput:"DATABASE_URL\nSECRET_KEY\nDEBUG", difficulty:"medium" },
      { number:15, type:"coding", question:"Simulează verificarea portului expus. Afișează portul standard pentru o aplicație FastAPI:\n```\n8000\n```", answer:"", starterCode:"", language:"python", expectedOutput:"8000", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b0949384b94515fcecd3",
    name: "48. CLI cu Click si Rich",
    tasks: [
      { number:6, type:"fillblank", question:"Completează decoratorul Click pentru o comandă:\n```python\nimport click\n@click.___\ndef salut():\n    click.echo('Salut!')\n```", answer:"command", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a adăuga o opțiune:\n```python\n@click.___(\"--name\", default=\"World\")\n```", answer:"option", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru a afișa cu Rich:\n```python\nfrom rich import print as rprint\nrprint(\"[bold green]___[/bold green]\", \"Salut!\")\n```", answer:"bold green", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru un grup de comenzi Click:\n```python\n@click.___\ndef cli():\n    pass\n```", answer:"group", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce metodă Click citește input de la utilizator?\n```python\nval = click.___('Introdu valoarea')\n``` Răspuns: `___`", answer:"prompt", difficulty:"medium" },
      { number:11, type:"coding", question:"Simulează o comandă CLI care afișează un mesaj de bun venit cu un nume:\n```\nBun venit, Ana!\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Bun venit, Ana!", difficulty:"medium" },
      { number:12, type:"coding", question:"Creează o tabelă simplă cu Rich: afișează 2 coloane și 1 rând cu Produs/Pret:\n```\nLaptop | 999\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Laptop | 999", difficulty:"medium" },
      { number:13, type:"coding", question:"Simulează o bară de progres care procesează 3 item-uri și afișează numărul procesate:\n```\n3\n```", answer:"", starterCode:"", language:"python", expectedOutput:"3", difficulty:"medium" },
      { number:14, type:"coding", question:"Validează argumentul CLI: dacă nu e număr pozitiv, afișează eroarea:\n```\nEroare: valoarea trebuie sa fie pozitiva\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Eroare: valoarea trebuie sa fie pozitiva", difficulty:"medium" },
      { number:15, type:"coding", question:"Simulează listarea fișierelor cu Rich: afișează 3 fișiere cu extensia .py:\n```\nmain.py\nutils.py\ntests.py\n```", answer:"", starterCode:"", language:"python", expectedOutput:"main.py\nutils.py\ntests.py", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b0979384b94515fcece7",
    name: "49. Concurenta — threading, multiprocessing, asyncio avansat",
    tasks: [
      { number:6, type:"fillblank", question:"Completează pentru a crea un thread:\n```python\nimport threading\nt = threading.___(target=functia_mea)\n```", answer:"Thread", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează pentru a porni thread-ul:\n```python\nt.___()\n```", answer:"start", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează pentru a crea un task asyncio:\n```python\nimport asyncio\nasync def main():\n    task = asyncio.___(coro())\n    await task\n```", answer:"create_task", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru a rula mai mulți coroutini în paralel:\n```python\nrezultate = await asyncio.gather(___, coro2())\n```", answer:"coro1()", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Ce clasă protejează o secțiune critică?\n```python\nlock = threading.___() \n``` Răspuns: `___`", answer:"Lock", difficulty:"medium" },
      { number:11, type:"coding", question:"Creează 3 thread-uri care adaugă la o listă (thread-safe). Afișează lungimea finală:\n```\n3\n```", answer:"", starterCode:"", language:"python", expectedOutput:"3", difficulty:"medium" },
      { number:12, type:"coding", question:"Folosind asyncio, rulează 2 corutine care returnează valori și afișează suma:\n```\n15\n```", answer:"", starterCode:"", language:"python", expectedOutput:"15", difficulty:"medium" },
      { number:13, type:"coding", question:"Implementează un producer-consumer simplu cu Queue. Afișează mesajele procesate:\n```\nProcesat: task1\nProcesat: task2\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Procesat: task1\nProcesat: task2", difficulty:"medium" },
      { number:14, type:"coding", question:"Folosind multiprocessing.Pool, calculează pătratele [1,2,3,4,5] și afișează suma:\n```\n55\n```", answer:"", starterCode:"", language:"python", expectedOutput:"55", difficulty:"medium" },
      { number:15, type:"coding", question:"Demonstrează GIL cu threading: 2 thread-uri incrementează un contor. Afișează valoarea finală (nu neapărat exactă):\n```\nGata\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Gata", difficulty:"medium" },
    ],
  },
  {
    lessonId: "6a09b0999384b94515fcecfb",
    name: "50. Mini Proiect Python Final — API complet cu FastAPI + SQLAlchemy + Docker",
    tasks: [
      { number:6, type:"fillblank", question:"Completează structura proiectului — fișierul de entry point:\n```python\n# main.py\nfrom fastapi import FastAPI\napp = ___() \n```", answer:"FastAPI", difficulty:"medium" },
      { number:7, type:"fillblank", question:"Completează dependency injection pentru DB session:\n```python\ndef get_db():\n    db = SessionLocal()\n    try:\n        ___ db\n    finally:\n        db.close()\n```", answer:"yield", difficulty:"medium" },
      { number:8, type:"fillblank", question:"Completează schema Pydantic pentru response:\n```python\nclass UserResponse(BaseModel):\n    id: int\n    email: str\n    class Config:\n        ___ = True\n```", answer:"from_attributes", difficulty:"medium" },
      { number:9, type:"fillblank", question:"Completează pentru endpoint cu autentificare:\n```python\n@app.get('/me')\nasync def get_me(current_user = Depends(___)): \n    return current_user\n```", answer:"get_current_user", difficulty:"medium" },
      { number:10, type:"fillblank", question:"Completează Dockerfile CMD pentru FastAPI:\n```dockerfile\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"___\", \"--port\", \"8000\"]\n```", answer:"0.0.0.0", difficulty:"medium" },
      { number:11, type:"coding", question:"Definește arhitectura unui proiect FastAPI cu 4 module. Afișează lista modulelor:\n```\nrouters\nmodels\nschemas\ndatabase\n```", answer:"", starterCode:"", language:"python", expectedOutput:"routers\nmodels\nschemas\ndatabase", difficulty:"medium" },
      { number:12, type:"coding", question:"Simulează hash-ul unei parole cu SHA256 (fără bcrypt). Afișează că hash-ul are 64 caractere:\n```\n64\n```", answer:"", starterCode:"", language:"python", expectedOutput:"64", difficulty:"medium" },
      { number:13, type:"coding", question:"Creează un CRUD complet simulat: crează user, citești, updatezi email, ștergi. Afișează starea finală:\n```\nsters\n```", answer:"", starterCode:"", language:"python", expectedOutput:"sters", difficulty:"medium" },
      { number:14, type:"coding", question:"Validează un model Pydantic User cu email invalid și afișează:\n```\nEmail invalid\n```", answer:"", starterCode:"", language:"python", expectedOutput:"Email invalid", difficulty:"medium" },
      { number:15, type:"coding", question:"Simulează rate limiting: un user face 5 request-uri, limita e 3. Afișează câte au reușit:\n```\n3\n```", answer:"", starterCode:"", language:"python", expectedOutput:"3", difficulty:"medium" },
    ],
  },
];

async function main() {
  console.log("Fixing Python advanced lessons...");
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({ where: { lessonId: fix.lessonId, number: { gte: 6 } } });
    await prisma.task.createMany({ data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId })) });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
