const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  {
    lessonId: "69fb25c0a7657a7d121f066e",
    name: "3. Display și Position",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `display` care face elementul să nu mai fie vizibil:\n```css\n.ascuns {\n  display: ___;\n}\n```",
        answer: "none", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `position` pentru poziționare față de viewport (nu se mișcă la scroll):\n```css\n.navbar {\n  position: ___;\n  top: 0;\n}\n```",
        answer: "fixed", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `position` pentru un element care se ancorează la un ancestor:\n```css\n.tooltip {\n  position: ___;\n  top: -30px;\n  left: 0;\n}\n```",
        answer: "absolute", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `display` care combină inline cu posibilitatea de a seta width/height:\n```css\n.buton {\n  display: ___;\n  width: 100px;\n  height: 40px;\n}\n```",
        answer: "inline-block", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `position` care se comportă ca `relative` până când scrollul îl atinge:\n```css\n.header-sticky {\n  position: ___;\n  top: 0;\n}\n```",
        answer: "sticky", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipDisplay` care primește un tag HTML (`'div'`, `'span'`, `'img'`) și returnează tipul default de display: `'block'` pentru div, `'inline'` pentru span, `'inline'` pentru img. Testează cu `'div'`.",
        starterCode: "function tipDisplay(tag) {\n  // scrie codul aici\n}\n\nconsole.log(tipDisplay('div'));",
        language: "javascript", expectedOutput: "block", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `pozitiiCSS` care returnează array-ul cu valorile `position` din CSS. Afișează lungimea.",
        starterCode: "function pozitiiCSS() {\n  return ['static', 'relative', 'absolute', 'fixed', 'sticky'];\n}\n\nconsole.log(pozitiiCSS().length);",
        language: "javascript", expectedOutput: "5", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `estePositioned` care returnează `true` dacă `position` nu este `'static'`. Testează cu `'relative'`.",
        starterCode: "function estePositioned(pos) {\n  // scrie codul aici\n}\n\nconsole.log(estePositioned('relative'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `zIndexValid` care returnează `true` dacă z-index funcționează (elementul are position != static). Testează cu `('absolute', 10)`.",
        starterCode: "function zIndexValid(position, zIndex) {\n  // scrie codul aici\n}\n\nconsole.log(zIndexValid('absolute', 10));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `displayValues` care returnează array-ul `['block', 'inline', 'inline-block', 'flex', 'grid', 'none']` și afișează al patrulea element.",
        starterCode: "function displayValues() {\n  // scrie codul aici\n}\n\nconsole.log(displayValues()[3]);",
        language: "javascript", expectedOutput: "flex", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b2ef0ec7fc9c03a6745",
    name: "10. Pseudo-elemente (::before, ::after)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-elementul pentru conținut înaintea elementului:\n```css\n.titlu:::before {\n  content: '★ ';\n}\n```\nRăspunde cu pseudo-elementul (fără `::`).",
        answer: "before", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea obligatorie pentru `::before` și `::after`:\n```css\n.element::after {\n  ___: '';\n}\n```",
        answer: "content", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-elementul care selectează prima linie dintr-un paragraf:\n```css\np::___-line {\n  font-weight: bold;\n}\n```",
        answer: "first", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-elementul pentru textul selectat de utilizator:\n```css\np:::___ {\n  background: yellow;\n  color: black;\n}\n```",
        answer: "selection", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-elementul care stilizează placeholder-ul unui input:\n```css\ninput::___ {\n  color: #aaa;\n  font-style: italic;\n}\n```",
        answer: "placeholder", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `pseudoElemente` care returnează array-ul cu pseudo-elementele CSS. Afișează primul element (cu `::`).",
        starterCode: "function pseudoElemente() {\n  return ['::before', '::after', '::first-line', '::first-letter', '::selection', '::placeholder'];\n}\n\nconsole.log(pseudoElemente()[0]);",
        language: "javascript", expectedOutput: "::before", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `necesitaContent` care returnează `true` dacă pseudo-elementul este `'::before'` sau `'::after'`. Testează cu `'::after'`.",
        starterCode: "function necesitaContent(pe) {\n  // scrie codul aici\n}\n\nconsole.log(necesitaContent('::after'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `contentValori` care returnează array-ul cu tipuri de valori pentru `content`: `['string', 'url', 'counter', 'attr', 'none']`. Afișează al doilea.",
        starterCode: "function contentValori() {\n  // scrie codul aici\n}\n\nconsole.log(contentValori()[1]);",
        language: "javascript", expectedOutput: "url", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteInline` care returnează `true` dacă pseudo-elementul `::before`/`::after` este implicit `inline`. Returnează direct `true`.",
        starterCode: "function esteInline() {\n  // ::before și ::after sunt inline implicit\n  // scrie codul aici\n}\n\nconsole.log(esteInline());",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarPseudo` care returnează numărul de pseudo-elemente standard CSS (before, after, first-line, first-letter, selection, placeholder, marker = 7). Afișează rezultatul.",
        starterCode: "function numarPseudo() {\n  // scrie codul aici\n}\n\nconsole.log(numarPseudo());",
        language: "javascript", expectedOutput: "7", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b2ff0ec7fc9c03a674e",
    name: "11. Specificitate și cascadă",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează specificitatea unui selector de ID (format a,b,c):\n```\n#titlu { } → specificitate: ___, 0, 0\n```",
        answer: "1", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează specificitatea unui selector de clasă (format a,b,c):\n```\n.activ { } → specificitate: 0, ___, 0\n```",
        answer: "1", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează cuvântul cheie care forțează o proprietate să câștige cascada:\n```css\n.element {\n  color: red ___;\n}\n```",
        answer: "!important", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează originea CSS cu cea mai mare prioritate în cascadă:\n```\nOriginea cu cea mai mare prioritate: ___ stylesheet\n```",
        answer: "author", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează selectorul cu specificitate 0,0,1:\n```css\n___ {\n  font-size: 16px;\n}\n```",
        answer: "p", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `specificitateMaiMare` care primește două specificități ca string `'a,b,c'` și returnează care e mai mare. Testează cu `('1,0,0', '0,2,3')`.",
        starterCode: "function specificitateMaiMare(s1, s2) {\n  const p = s => s.split(',').map(Number);\n  const [a1,b1,c1] = p(s1);\n  const [a2,b2,c2] = p(s2);\n  if (a1 !== a2) return a1 > a2 ? s1 : s2;\n  if (b1 !== b2) return b1 > b2 ? s1 : s2;\n  return c1 >= c2 ? s1 : s2;\n}\n\nconsole.log(specificitateMaiMare('1,0,0', '0,2,3'));",
        language: "javascript", expectedOutput: "1,0,0", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `calcSpecificitate` care primește un selector simplu și returnează specificitatea ca `'a,b,c'`. Returnează `'1,0,0'` pentru `'#id'`, `'0,1,0'` pentru `'.cls'`, `'0,0,1'` pentru `'p'`. Testează cu `'#id'`.",
        starterCode: "function calcSpecificitate(sel) {\n  // scrie codul aici\n}\n\nconsole.log(calcSpecificitate('#id'));",
        language: "javascript", expectedOutput: "1,0,0", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `ordineCascada` care returnează array-ul cu ordinea de prioritate în cascadă (de la cea mai mică): `['browser', 'user', 'author', 'important']`. Afișează ultima.",
        starterCode: "function ordineCascada() {\n  // scrie codul aici\n}\n\nconst o = ordineCascada();\nconsole.log(o[o.length-1]);",
        language: "javascript", expectedOutput: "important", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteImportant` care returnează `true` dacă o declarație CSS conține `'!important'`. Testează cu `'color: red !important'`.",
        starterCode: "function esteImportant(declaratie) {\n  // scrie codul aici\n}\n\nconsole.log(esteImportant('color: red !important'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipSelector` care primește un selector și returnează `'id'`, `'clasa'`, `'element'` sau `'universal'`. Testează cu `'.nav'`.",
        starterCode: "function tipSelector(sel) {\n  if (sel.startsWith('#')) return 'id';\n  if (sel.startsWith('.')) return 'clasa';\n  if (sel === '*') return 'universal';\n  return 'element';\n}\n\nconsole.log(tipSelector('.nav'));",
        language: "javascript", expectedOutput: "clasa", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b30f0ec7fc9c03a6757",
    name: "12. Selectori avansați",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează combinatorul pentru un descendent direct:\n```css\nul ___ li {\n  color: blue;\n}\n```",
        answer: ">", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează selectorul de atribut care selectează elementele cu atribut `href` care începe cu `https`:\n```css\na[href___=\"https\"] {\n  color: green;\n}\n```",
        answer: "^", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează selectorul de atribut care selectează href-urile care se termină cu `.pdf`:\n```css\na[href___=\".pdf\"] {\n  color: red;\n}\n```",
        answer: "$", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează combinatorul pentru fratele imediat următor:\n```css\nh2 ___ p {\n  margin-top: 0;\n}\n```",
        answer: "+", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează selectorul `:nth-child` pentru elementele pare:\n```css\nli:nth-child(___) {\n  background: #f0f0f0;\n}\n```",
        answer: "even", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `combinatori` care returnează array-ul cu cei 4 combinatori CSS: `[' ', '>', '+', '~']`. Afișează al doilea.",
        starterCode: "function combinatori() {\n  // scrie codul aici\n}\n\nconsole.log(combinatori()[1]);",
        language: "javascript", expectedOutput: ">", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `selectorAtribut` care primește un atribut și o valoare și returnează selectorul CSS. Testează cu `('type', 'text')`.",
        starterCode: "function selectorAtribut(attr, val) {\n  // scrie codul aici\n}\n\nconsole.log(selectorAtribut('type', 'text'));",
        language: "javascript", expectedOutput: "[type=\"text\"]", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `nthChild` care primește un număr și returnează selectorul `:nth-child`. Testează cu `3`.",
        starterCode: "function nthChild(n) {\n  // scrie codul aici\n}\n\nconsole.log(nthChild(3));",
        language: "javascript", expectedOutput: ":nth-child(3)", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipCombinator` care primește un combinator (`' '`, `'>'`, `'+'`, `'~'`) și returnează numele: `'descendent'`, `'copil direct'`, `'frate imediat'`, `'frati urmatori'`. Testează cu `'>'`.",
        starterCode: "function tipCombinator(c) {\n  const map = {' ': 'descendent', '>': 'copil direct', '+': 'frate imediat', '~': 'frati urmatori'};\n  // scrie codul aici\n}\n\nconsole.log(tipCombinator('>'));",
        language: "javascript", expectedOutput: "copil direct", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `selectoriPseudoClase` care returnează numărul de pseudo-clase CSS comune (hover, focus, active, visited, first-child, last-child, nth-child, not = 8). Afișează rezultatul.",
        starterCode: "function selectoriPseudoClase() {\n  // scrie codul aici\n}\n\nconsole.log(selectoriPseudoClase());",
        language: "javascript", expectedOutput: "8", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b33f0ec7fc9c03a6769",
    name: "14. Border și box-shadow",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea shorthand pentru border:\n```css\n.card {\n  ___: 2px solid #333;\n}\n```",
        answer: "border", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru rotunjirea colțurilor:\n```css\n.buton {\n  ___: 8px;\n}\n```",
        answer: "border-radius", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru umbra cutiei:\n```css\n.card {\n  ___: 0 4px 8px rgba(0,0,0,0.2);\n}\n```",
        answer: "box-shadow", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează stilul border pentru linie punctată:\n```css\n.divider {\n  border-top: 1px ___ #ccc;\n}\n```",
        answer: "dotted", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează cuvântul cheie pentru umbra interioară:\n```css\n.input {\n  box-shadow: ___ 0 2px 5px rgba(0,0,0,0.3);\n}\n```",
        answer: "inset", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `stiluriBorder` care returnează array-ul cu stilurile border. Afișează primul.",
        starterCode: "function stiluriBorder() {\n  return ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none'];\n}\n\nconsole.log(stiluriBorder()[0]);",
        language: "javascript", expectedOutput: "solid", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `borderShorthand` care primește grosimea, stilul și culoarea și returnează valoarea shorthand. Testează cu `(2, 'solid', '#333')`.",
        starterCode: "function borderShorthand(grosime, stil, culoare) {\n  // scrie codul aici\n}\n\nconsole.log(borderShorthand(2, 'solid', '#333'));",
        language: "javascript", expectedOutput: "2px solid #333", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `cercCSS` care returnează `'50%'` ca valoarea border-radius pentru a face un element cerc perfect. Afișează rezultatul.",
        starterCode: "function cercCSS() {\n  // scrie codul aici\n}\n\nconsole.log(cercCSS());",
        language: "javascript", expectedOutput: "50%", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `boxShadowUmbra` care primește offset-x, offset-y și blur și returnează valoarea box-shadow fără culoare. Testează cu `(0, 4, 8)`.",
        starterCode: "function boxShadowUmbra(x, y, blur) {\n  // scrie codul aici\n}\n\nconsole.log(boxShadowUmbra(0, 4, 8));",
        language: "javascript", expectedOutput: "0px 4px 8px", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarProprietatiBorder` care returnează câte proprietăți individuale de border există (border-top, bottom, left, right, radius, style, color, width = 8). Afișează rezultatul.",
        starterCode: "function numarProprietatiBorder() {\n  // scrie codul aici\n}\n\nconsole.log(numarProprietatiBorder());",
        language: "javascript", expectedOutput: "8", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b34f0ec7fc9c03a6772",
    name: "15. Background avansat și gradients",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru gradientul liniar:\n```css\n.hero {\n  background: ___(to right, #ff6b6b, #4ecdc4);\n}\n```",
        answer: "linear-gradient", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru gradientul radial:\n```css\n.spot {\n  background: ___(circle, #fff, #000);\n}\n```",
        answer: "radial-gradient", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea care controlează repetarea imaginii de fundal:\n```css\n.pattern {\n  background-___: no-repeat;\n}\n```",
        answer: "repeat", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea care scalează imaginea de fundal să acopere tot elementul:\n```css\n.cover {\n  background-size: ___;\n}\n```",
        answer: "cover", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea care fixează imaginea de fundal relativ la viewport:\n```css\n.parallax {\n  background-___: fixed;\n}\n```",
        answer: "attachment", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `gradientLiniar` care primește două culori și returnează valoarea CSS. Testează cu `('#ff0000', '#0000ff')`.",
        starterCode: "function gradientLiniar(c1, c2) {\n  // scrie codul aici\n}\n\nconsole.log(gradientLiniar('#ff0000', '#0000ff'));",
        language: "javascript", expectedOutput: "linear-gradient(#ff0000, #0000ff)", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `backgroundSize` care returnează array-ul cu valorile `background-size`. Afișează primul.",
        starterCode: "function backgroundSize() {\n  return ['cover', 'contain', 'auto', '100%', '50% 50%'];\n}\n\nconsole.log(backgroundSize()[0]);",
        language: "javascript", expectedOutput: "cover", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `gradientUnghiuri` care primește un unghi și returnează `'linear-gradient(Xdeg, ...)'`. Testează cu `45`.",
        starterCode: "function gradientUnghiuri(unghi) {\n  // scrie codul aici\n}\n\nconsole.log(gradientUnghiuri(45));",
        language: "javascript", expectedOutput: "linear-gradient(45deg, ...)", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `backgroundPosition` care returnează array-ul cu pozițiile predefinite: `['top', 'bottom', 'left', 'right', 'center']`. Afișează ultimul.",
        starterCode: "function backgroundPosition() {\n  // scrie codul aici\n}\n\nconst p = backgroundPosition();\nconsole.log(p[p.length-1]);",
        language: "javascript", expectedOutput: "center", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tiputriGradient` care returnează array-ul cu tipurile de gradient CSS: `['linear-gradient', 'radial-gradient', 'conic-gradient', 'repeating-linear-gradient']`. Afișează lungimea.",
        starterCode: "function tiputriGradient() {\n  // scrie codul aici\n}\n\nconsole.log(tiputriGradient().length);",
        language: "javascript", expectedOutput: "4", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b36f0ec7fc9c03a677b",
    name: "16. Transitions",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea shorthand pentru tranziție:\n```css\n.buton {\n  ___: background-color 0.3s ease;\n}\n```",
        answer: "transition", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează timing function-ul pentru tranziție lentă la început și la sfârșit:\n```css\n.element {\n  transition: all 0.5s ___;\n}\n```",
        answer: "ease-in-out", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru durata tranziției:\n```css\n.link {\n  transition-___: 0.3s;\n}\n```",
        answer: "duration", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru întârzierea tranziției:\n```css\n.popup {\n  transition-delay: ___;\n  transition: opacity 0.5s;\n}\n```",
        answer: "0.2s", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea care aplică tranziția pe toate proprietățile:\n```css\n.card:hover {\n  transition: ___ 0.3s ease;\n}\n```",
        answer: "all", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `timingFunctions` care returnează array-ul cu timing functions CSS. Afișează primul.",
        starterCode: "function timingFunctions() {\n  return ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];\n}\n\nconsole.log(timingFunctions()[0]);",
        language: "javascript", expectedOutput: "ease", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `transitionShorthand` care primește proprietate, durată și timing și returnează valoarea CSS. Testează cu `('color', '0.3s', 'ease')`.",
        starterCode: "function transitionShorthand(prop, dur, timing) {\n  // scrie codul aici\n}\n\nconsole.log(transitionShorthand('color', '0.3s', 'ease'));",
        language: "javascript", expectedOutput: "color 0.3s ease", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteTransitionabila` care returnează `true` dacă o proprietate CSS este animabilă (`'color'`, `'opacity'`, `'transform'`, `'background'`). Testează cu `'opacity'`.",
        starterCode: "function esteTransitionabila(prop) {\n  // scrie codul aici\n}\n\nconsole.log(esteTransitionabila('opacity'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `msToSeconds` care convertește milisecunde în secunde cu sufixul `s`. Testează cu `300`.",
        starterCode: "function msToSeconds(ms) {\n  // scrie codul aici\n}\n\nconsole.log(msToSeconds(300));",
        language: "javascript", expectedOutput: "0.3s", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `proprietatiTransition` care returnează array-ul celor 4 proprietăți individuale de tranziție. Afișează prima.",
        starterCode: "function proprietatiTransition() {\n  return ['transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'];\n}\n\nconsole.log(proprietatiTransition()[0]);",
        language: "javascript", expectedOutput: "transition-property", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b37f0ec7fc9c03a6784",
    name: "17. Transform (translate, rotate, scale, skew)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează funcția transform pentru a muta un element 50px la dreapta:\n```css\n.element {\n  transform: ___(50px, 0);\n}\n```",
        answer: "translate", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează funcția transform pentru rotire:\n```css\n.sageata {\n  transform: ___(45deg);\n}\n```",
        answer: "rotate", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează funcția transform pentru mărire la dublu:\n```css\n.zoom {\n  transform: ___(2);\n}\n```",
        answer: "scale", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează funcția transform pentru deformare pe axa X:\n```css\n.italic-effect {\n  transform: ___X(20deg);\n}\n```",
        answer: "skew", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea care definește originea transformării:\n```css\n.card {\n  transform-___: top left;\n}\n```",
        answer: "origin", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `functiiTransform` care returnează array-ul cu funcțiile transform 2D. Afișează primul element.",
        starterCode: "function functiiTransform() {\n  return ['translate', 'rotate', 'scale', 'skew', 'matrix'];\n}\n\nconsole.log(functiiTransform()[0]);",
        language: "javascript", expectedOutput: "translate", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `transformRotate` care primește un unghi și returnează valoarea CSS. Testează cu `90`.",
        starterCode: "function transformRotate(unghi) {\n  // scrie codul aici\n}\n\nconsole.log(transformRotate(90));",
        language: "javascript", expectedOutput: "rotate(90deg)", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `transformTranslate` care primește x și y (px) și returnează valoarea CSS. Testează cu `(50, -20)`.",
        starterCode: "function transformTranslate(x, y) {\n  // scrie codul aici\n}\n\nconsole.log(transformTranslate(50, -20));",
        language: "javascript", expectedOutput: "translate(50px, -20px)", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `transformScale` care primește un factor și returnează valoarea CSS. Testează cu `1.5`.",
        starterCode: "function transformScale(factor) {\n  // scrie codul aici\n}\n\nconsole.log(transformScale(1.5));",
        language: "javascript", expectedOutput: "scale(1.5)", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `combinaTransform` care primește array de transformări și returnează valoarea CSS combinată. Testează cu `['rotate(45deg)', 'scale(2)']`.",
        starterCode: "function combinaTransform(arr) {\n  // scrie codul aici\n}\n\nconsole.log(combinaTransform(['rotate(45deg)', 'scale(2)']));",
        language: "javascript", expectedOutput: "rotate(45deg) scale(2)", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b38f0ec7fc9c03a678d",
    name: "18. Animații cu @keyframes",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează regula CSS pentru definirea animației:\n```css\n@___ fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n```",
        answer: "keyframes", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea care specifică numele animației:\n```css\n.element {\n  animation-___: fadeIn;\n}\n```",
        answer: "name", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru numărul de repetări al animației:\n```css\n.rotire {\n  animation-___: infinite;\n}\n```",
        answer: "iteration-count", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea care oprește animația pe ultimul frame:\n```css\n.slide-in {\n  animation-fill-mode: ___;\n}\n```",
        answer: "forwards", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea pentru animație inversă alternativă:\n```css\n.puls {\n  animation-direction: alternate-___;\n}\n```",
        answer: "reverse", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `animationShorthand` care primește numele și durata și returnează valoarea shorthand CSS. Testează cu `('fadeIn', '1s')`.",
        starterCode: "function animationShorthand(name, dur) {\n  // scrie codul aici\n}\n\nconsole.log(animationShorthand('fadeIn', '1s'));",
        language: "javascript", expectedOutput: "fadeIn 1s", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `proprietatiAnimation` care returnează array-ul celor 8 proprietăți animation individuale. Afișează prima.",
        starterCode: "function proprietatiAnimation() {\n  return ['animation-name','animation-duration','animation-timing-function','animation-delay','animation-iteration-count','animation-direction','animation-fill-mode','animation-play-state'];\n}\n\nconsole.log(proprietatiAnimation()[0]);",
        language: "javascript", expectedOutput: "animation-name", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `fillModeDescriere` care primește un fill-mode și returnează descrierea: `'none'→'fara efect'`, `'forwards'→'pastreaza final'`, `'backwards'→'aplica initial'`. Testează cu `'forwards'`.",
        starterCode: "function fillModeDescriere(mode) {\n  const map = {none: 'fara efect', forwards: 'pastreaza final', backwards: 'aplica initial', both: 'ambele'};\n  // scrie codul aici\n}\n\nconsole.log(fillModeDescriere('forwards'));",
        language: "javascript", expectedOutput: "pastreaza final", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `durataTotala` care calculează durata totală a unei animații (durată * iterații). Testează cu `(2, 3)`.",
        starterCode: "function durataTotala(dur, iter) {\n  // scrie codul aici — returnează secondele totale ca string 'Xs'\n}\n\nconsole.log(durataTotala(2, 3));",
        language: "javascript", expectedOutput: "6s", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `keyframeSteps` care primește un array de procente și returnează câte keyframe-uri are animația. Testează cu `[0, 25, 50, 75, 100]`.",
        starterCode: "function keyframeSteps(arr) {\n  // scrie codul aici\n}\n\nconsole.log(keyframeSteps([0, 25, 50, 75, 100]));",
        language: "javascript", expectedOutput: "5", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b3bf0ec7fc9c03a679f",
    name: "20. Clip-path și mask",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru decuparea unui element:\n```css\n.decupat {\n  ___: polygon(50% 0%, 100% 100%, 0% 100%);\n}\n```",
        answer: "clip-path", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează funcția clip-path pentru un cerc:\n```css\n.cerc {\n  clip-path: ___(50%, at 50% 50%);\n}\n```",
        answer: "circle", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează funcția clip-path pentru un dreptunghi inset:\n```css\n.drept {\n  clip-path: ___(10px 20px 30px 40px);\n}\n```",
        answer: "inset", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru masca unui element:\n```css\n.mascat {\n  ___-image: url('mask.png');\n}\n```",
        answer: "mask", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează funcția clip-path pentru elipsă:\n```css\n.elipsa {\n  clip-path: ___(60% 40%, at center);\n}\n```",
        answer: "ellipse", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `clipPathForme` care returnează array-ul cu funcțiile clip-path. Afișează prima.",
        starterCode: "function clipPathForme() {\n  return ['polygon', 'circle', 'ellipse', 'inset', 'path'];\n}\n\nconsole.log(clipPathForme()[0]);",
        language: "javascript", expectedOutput: "polygon", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `clipPathCerc` care primește un procent și returnează valoarea CSS clip-path circle. Testează cu `50`.",
        starterCode: "function clipPathCerc(r) {\n  // scrie codul aici\n}\n\nconsole.log(clipPathCerc(50));",
        language: "javascript", expectedOutput: "circle(50%)", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `triunghi` care returnează valoarea polygon clip-path pentru un triunghi. Afișează rezultatul.",
        starterCode: "function triunghi() {\n  // scrie codul aici\n}\n\nconsole.log(triunghi());",
        language: "javascript", expectedOutput: "polygon(50% 0%, 100% 100%, 0% 100%)", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarPunctePoligon` care primește un string polygon și returnează numărul de puncte. Testează cu `'polygon(50% 0%, 100% 100%, 0% 100%)'`.",
        starterCode: "function numarPunctePoligon(str) {\n  // scrie codul aici — numără câte perechi de valori există\n}\n\nconsole.log(numarPunctePoligon('polygon(50% 0%, 100% 100%, 0% 100%)'));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `clipVsClipPath` care returnează `'modern'` dacă proprietatea este `'clip-path'`, altfel `'vechi'`. Testează cu `'clip-path'`.",
        starterCode: "function clipVsClipPath(prop) {\n  // scrie codul aici\n}\n\nconsole.log(clipVsClipPath('clip-path'));",
        language: "javascript", expectedOutput: "modern", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b3cf0ec7fc9c03a67a8",
    name: "21. Object-fit, aspect-ratio",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `object-fit` care acoperă tot spațiul fără deformare:\n```css\nimg {\n  width: 100%;\n  height: 200px;\n  object-fit: ___;\n}\n```",
        answer: "cover", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `object-fit` care păstrează tot conținutul vizibil:\n```css\nimg {\n  object-fit: ___;\n}\n```",
        answer: "contain", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru raportul de aspect:\n```css\n.video-wrap {\n  ___: 16 / 9;\n}\n```",
        answer: "aspect-ratio", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `object-fit` care deformează imaginea să umple exact:\n```css\nimg {\n  object-fit: ___;\n}\n```",
        answer: "fill", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a poziționa conținutul în cadrul object-fit:\n```css\nimg {\n  object-fit: cover;\n  object-___: center top;\n}\n```",
        answer: "position", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `valoriObjectFit` care returnează array-ul cu valorile `object-fit`. Afișează prima.",
        starterCode: "function valoriObjectFit() {\n  return ['fill', 'contain', 'cover', 'none', 'scale-down'];\n}\n\nconsole.log(valoriObjectFit()[0]);",
        language: "javascript", expectedOutput: "fill", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `aspectRatioCSS` care primește lățimea și înălțimea și returnează valoarea `aspect-ratio`. Testează cu `(16, 9)`.",
        starterCode: "function aspectRatioCSS(w, h) {\n  // scrie codul aici\n}\n\nconsole.log(aspectRatioCSS(16, 9));",
        language: "javascript", expectedOutput: "16 / 9", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `inaltime` care calculează înălțimea unui element cu aspect-ratio 16:9 și lățimea dată. Testează cu `320`.",
        starterCode: "function inaltime(w) {\n  // scrie codul aici — 16:9\n}\n\nconsole.log(inaltime(320));",
        language: "javascript", expectedOutput: "180", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `deformare` care returnează `true` dacă `object-fit` este `'fill'` (deformează imaginea). Testează cu `'fill'`.",
        starterCode: "function deformare(val) {\n  // scrie codul aici\n}\n\nconsole.log(deformare('fill'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `raportAspect` care primește numerele unui raport și returnează valoarea zecimală rotunjită la 2 zecimale. Testează cu `(16, 9)`.",
        starterCode: "function raportAspect(w, h) {\n  // scrie codul aici\n}\n\nconsole.log(raportAspect(16, 9));",
        language: "javascript", expectedOutput: "1.78", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b3df0ec7fc9c03a67b1",
    name: "22. Container queries",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a defini un container CSS:\n```css\n.sidebar {\n  ___-type: inline-size;\n}\n```",
        answer: "container", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa container query:\n```css\n@___ (min-width: 300px) {\n  .card { flex-direction: row; }\n}\n```",
        answer: "container", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a numi un container:\n```css\n.sidebar {\n  container-type: inline-size;\n  container-___: sidebar;\n}\n```",
        answer: "name", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează unitatea de container query echivalentă cu 1% din lățimea containerului:\n```css\n.card {\n  font-size: 2___;\n}\n```",
        answer: "cqw", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `container-type` care monitorizează și lățimea și înălțimea:\n```css\n.box {\n  container-type: ___;\n}\n```",
        answer: "size", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `containerTypes` care returnează array-ul cu valorile `container-type`. Afișează primul.",
        starterCode: "function containerTypes() {\n  return ['normal', 'size', 'inline-size'];\n}\n\nconsole.log(containerTypes()[0]);",
        language: "javascript", expectedOutput: "normal", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `diferentaCQvsMedia` care returnează `'container'` dacă responsivitatea este față de container, sau `'viewport'` dacă e față de ecran. Testează cu `'container'`.",
        starterCode: "function diferentaCQvsMedia(tip) {\n  // scrie codul aici\n}\n\nconsole.log(diferentaCQvsMedia('container'));",
        language: "javascript", expectedOutput: "container", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `cqUnits` care returnează array-ul cu unitățile de container query: `['cqw', 'cqh', 'cqi', 'cqb', 'cqmin', 'cqmax']`. Afișează lungimea.",
        starterCode: "function cqUnits() {\n  // scrie codul aici\n}\n\nconsole.log(cqUnits().length);",
        language: "javascript", expectedOutput: "6", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `containerQuery` care primește o lățime minimă și returnează sintaxa `@container (min-width: Xpx)`. Testează cu `400`.",
        starterCode: "function containerQuery(minW) {\n  // scrie codul aici\n}\n\nconsole.log(containerQuery(400));",
        language: "javascript", expectedOutput: "@container (min-width: 400px)", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `suportCQ` care returnează `'suportat din 2023'` ca informație despre suportul browser pentru Container Queries. Afișează rezultatul.",
        starterCode: "function suportCQ() {\n  // scrie codul aici\n}\n\nconsole.log(suportCQ());",
        language: "javascript", expectedOutput: "suportat din 2023", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b3ff0ec7fc9c03a67ba",
    name: "23. CSS layers (@layer)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează regula CSS pentru declararea unui layer:\n```css\n@___ base, components, utilities;\n```",
        answer: "layer", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa pentru a adăuga stiluri într-un layer:\n```css\n@layer ___ {\n  p { color: blue; }\n}\n```",
        answer: "base", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Stilurile din afara layerelor au ce prioritate față de cele din layere?\n```\nStilurie fără @layer au prioritate ___ decât cele din layer.\n```",
        answer: "mai mare", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa pentru un layer anonim (o singură regulă):\n```css\n@layer {\n  h1 { ___ : 2rem; }\n}\n```",
        answer: "font-size", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează comanda pentru importul unui CSS în layer:\n```css\n@import 'reset.css' ___(reset);\n```",
        answer: "layer", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `ordineLayers` care primește un array de layer-uri și returnează cel cu prioritate mai mare (ultimul declarat câștigă). Testează cu `['base', 'components', 'utilities']`.",
        starterCode: "function ordineLayers(arr) {\n  // scrie codul aici — ultimul are prioritate mai mare\n}\n\nconsole.log(ordineLayers(['base', 'components', 'utilities']));",
        language: "javascript", expectedOutput: "utilities", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `layerPrioritate` care primește un index și numărul total de layere și returnează `'prioritate inalta'` dacă e ultimul, altfel `'prioritate scazuta'`. Testează cu `(2, 3)`.",
        starterCode: "function layerPrioritate(idx, total) {\n  // scrie codul aici — index 0-based, total = count\n}\n\nconsole.log(layerPrioritate(2, 3));",
        language: "javascript", expectedOutput: "prioritate inalta", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarLayere` care primește un string CSS și returnează de câte ori apare `'@layer'`. Testează cu `'@layer base; @layer utils; @layer base { p{} }'`.",
        starterCode: "function numarLayere(css) {\n  // scrie codul aici\n}\n\nconsole.log(numarLayere('@layer base; @layer utils; @layer base { p{} }'));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `avantajLayer` care returnează principalul avantaj al `@layer` ca string: `'control cascada fara importanta'`. Afișează rezultatul.",
        starterCode: "function avantajLayer() {\n  // scrie codul aici\n}\n\nconsole.log(avantajLayer());",
        language: "javascript", expectedOutput: "control cascada fara importanta", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `layereStandard` care returnează array-ul cu 3 layer-uri comune. Afișează al doilea.",
        starterCode: "function layereStandard() {\n  return ['reset', 'base', 'components'];\n}\n\nconsole.log(layereStandard()[1]);",
        language: "javascript", expectedOutput: "base", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b40f0ec7fc9c03a67c3",
    name: "24. Scroll snap și sticky",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru activarea scroll snap pe container:\n```css\n.galerie {\n  ___-type: x mandatory;\n  overflow-x: scroll;\n}\n```",
        answer: "scroll-snap", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a defini punctul snap al unui element copil:\n```css\n.slide {\n  scroll-snap-___: start;\n}\n```",
        answer: "align", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea scroll-snap-type care forțează oprirea pe un element:\n```css\n.galerie {\n  scroll-snap-type: x ___;\n}\n```",
        answer: "mandatory", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `position: sticky` care face elementul să rămână vizibil la scroll:\n```css\n.header {\n  position: ___;\n  top: 0;\n}\n```",
        answer: "sticky", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea scroll-snap-type pentru axă verticală:\n```css\n.pagini {\n  scroll-snap-type: ___ mandatory;\n}\n```",
        answer: "y", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `snapAlignValues` care returnează array-ul cu valorile `scroll-snap-align`. Afișează primul.",
        starterCode: "function snapAlignValues() {\n  return ['none', 'start', 'end', 'center'];\n}\n\nconsole.log(snapAlignValues()[0]);",
        language: "javascript", expectedOutput: "none", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scrollSnapType` care primește o axă și un tip și returnează valoarea CSS. Testează cu `('x', 'mandatory')`.",
        starterCode: "function scrollSnapType(axa, tip) {\n  // scrie codul aici\n}\n\nconsole.log(scrollSnapType('x', 'mandatory'));",
        language: "javascript", expectedOutput: "x mandatory", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `diferentaStickyFixed` care primește `'sticky'` sau `'fixed'` și returnează `'relativ la parinte'` sau `'relativ la viewport'`. Testează cu `'sticky'`.",
        starterCode: "function diferentaStickyFixed(tip) {\n  // scrie codul aici\n}\n\nconsole.log(diferentaStickyFixed('sticky'));",
        language: "javascript", expectedOutput: "relativ la parinte", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarSlide` care calculează indexul slide-ului vizibil dată fiind poziția de scroll și lățimea unui slide. Testează cu `(960, 320)`.",
        starterCode: "function numarSlide(scrollPos, slideWidth) {\n  // scrie codul aici — returnează indexul (0-based)\n}\n\nconsole.log(numarSlide(960, 320));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `snapProximity` care returnează `'proximity'` ca valoarea scroll-snap-type mai permisivă (față de `'mandatory'`). Afișează rezultatul.",
        starterCode: "function snapProximity() {\n  // scrie codul aici\n}\n\nconsole.log(snapProximity());",
        language: "javascript", expectedOutput: "proximity", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a021b41f0ec7fc9c03a67cc",
    name: "25. Mini proiect — Pagina stilizată",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează variabila CSS pentru culoarea principală:\n```css\n:root {\n  ___primary: #3490dc;\n}\n```",
        answer: "--", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează funcția pentru a folosi o variabilă CSS:\n```css\n.buton {\n  background-color: ___(--primary);\n}\n```",
        answer: "var", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru layout cu Flexbox:\n```css\n.nav {\n  ___: flex;\n  justify-content: space-between;\n}\n```",
        answer: "display", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează media query pentru ecrane mai mici de 768px:\n```css\n@media (max-___: 768px) {\n  .nav { flex-direction: column; }\n}\n```",
        answer: "width", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru spațiere internă uniformă:\n```css\n.card {\n  ___: 1.5rem;\n}\n```",
        answer: "padding", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `variabila` care primește un nume și returnează sintaxa variabilei CSS. Testează cu `'primary'`.",
        starterCode: "function variabila(name) {\n  // scrie codul aici\n}\n\nconsole.log(variabila('primary'));",
        language: "javascript", expectedOutput: "--primary", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `varCSS` care primește un nume și returnează `var(--NAME)`. Testează cu `'color'`.",
        starterCode: "function varCSS(name) {\n  // scrie codul aici\n}\n\nconsole.log(varCSS('color'));",
        language: "javascript", expectedOutput: "var(--color)", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `breakpoints` care returnează array-ul cu breakpoint-urile standard: `[576, 768, 992, 1200]`. Afișează al doilea.",
        starterCode: "function breakpoints() {\n  // scrie codul aici\n}\n\nconsole.log(breakpoints()[1]);",
        language: "javascript", expectedOutput: "768", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `mediaQuery` care primește o lățime maximă și returnează `'@media (max-width: Xpx)'`. Testează cu `768`.",
        starterCode: "function mediaQuery(w) {\n  // scrie codul aici\n}\n\nconsole.log(mediaQuery(768));",
        language: "javascript", expectedOutput: "@media (max-width: 768px)", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `sistemDesign` care returnează array-ul cu elementele unui sistem de design CSS: `['variabile', 'tipografie', 'culori', 'spatiere', 'componente']`. Afișează lungimea.",
        starterCode: "function sistemDesign() {\n  // scrie codul aici\n}\n\nconsole.log(sistemDesign().length);",
        language: "javascript", expectedOutput: "5", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08cebd999573855635c850",
    name: "26. CSS Subgrid",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `grid-template-columns` pentru subgrid:\n```css\n.copil {\n  grid-column: 1 / -1;\n  display: grid;\n  grid-template-columns: ___;\n}\n```",
        answer: "subgrid", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea `grid-template-rows` pentru subgrid pe rânduri:\n```css\n.copil {\n  grid-row: span 3;\n  grid-template-rows: ___;\n}\n```",
        answer: "subgrid", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Ce proprietate definește coloanele gridului parinte folosit de subgrid?\n```css\n.parinte {\n  display: grid;\n  grid-template-columns: repeat(3, ___fr);\n}\n```",
        answer: "1", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează funcția grid-template pentru coloane egale:\n```css\n.grid {\n  grid-template-columns: ___(4, 1fr);\n}\n```",
        answer: "repeat", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează unitatea flexibilă din Grid:\n```css\n.grid {\n  grid-template-columns: 1___ 2___ 1___;\n}\n```",
        answer: "fr", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `subgridDescriere` care returnează `'mosteneste coloanele parintelui'` ca descriere a subgrid. Afișează rezultatul.",
        starterCode: "function subgridDescriere() {\n  // scrie codul aici\n}\n\nconsole.log(subgridDescriere());",
        language: "javascript", expectedOutput: "mosteneste coloanele parintelui", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `coloaneFr` care primește un număr și returnează `'repeat(N, 1fr)'`. Testează cu `4`.",
        starterCode: "function coloaneFr(n) {\n  // scrie codul aici\n}\n\nconsole.log(coloaneFr(4));",
        language: "javascript", expectedOutput: "repeat(4, 1fr)", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `gridSpan` care primește un număr și returnează `'span N'`. Testează cu `3`.",
        starterCode: "function gridSpan(n) {\n  // scrie codul aici\n}\n\nconsole.log(gridSpan(3));",
        language: "javascript", expectedOutput: "span 3", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarColoane` care primește un string `repeat(N, 1fr)` și extrage N. Testează cu `'repeat(4, 1fr)'`.",
        starterCode: "function numarColoane(str) {\n  // scrie codul aici — extrage primul număr din repeat(N, ...)\n}\n\nconsole.log(numarColoane('repeat(4, 1fr)'));",
        language: "javascript", expectedOutput: "4", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `avantajSubgrid` care returnează principalul avantaj: `'aliniere perfecta cu parintele'`. Afișează rezultatul.",
        starterCode: "function avantajSubgrid() {\n  // scrie codul aici\n}\n\nconsole.log(avantajSubgrid());",
        language: "javascript", expectedOutput: "aliniere perfecta cu parintele", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08cec0999573855635c864",
    name: "27. Selectori Moderni — :has(), :is(), :where(), :not()",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-clasa care selectează un parinte dacă conține un anumit copil:\n```css\n.card:___(img) {\n  border: 2px solid blue;\n}\n```",
        answer: "has", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-clasa pentru a combina mai mulți selectori cu specificitate egală cu cel mai specific:\n```css\n:___(h1, h2, h3) {\n  font-family: sans-serif;\n}\n```",
        answer: "is", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-clasa care combină selectori cu specificitate 0:\n```css\n:___(h1, h2, h3) {\n  margin: 0;\n}\n```",
        answer: "where", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-clasa pentru a exclude anumite elemente:\n```css\nli:___(first-child) {\n  border-top: 1px solid #ccc;\n}\n```",
        answer: "not", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-clasa `:has()` pentru a selecta formulare cu input invalid:\n```css\nform:___(input:invalid) {\n  border: 2px solid red;\n}\n```",
        answer: "has", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `selectoriModerni` care returnează array-ul cu pseudo-clasele CSS moderne. Afișează prima.",
        starterCode: "function selectoriModerni() {\n  return [':has()', ':is()', ':where()', ':not()'];\n}\n\nconsole.log(selectoriModerni()[0]);",
        language: "javascript", expectedOutput: ":has()", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `specificitate` care primește `':is()'` sau `':where()'` și returnează `'ridicata'` sau `'zero'`. Testează cu `':where()'`.",
        starterCode: "function specificitate(ps) {\n  // scrie codul aici\n}\n\nconsole.log(specificitate(':where()'));",
        language: "javascript", expectedOutput: "zero", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `isSelector` care primește un array de selectori și returnează sintaxa `:is()`. Testează cu `['h1', 'h2', 'h3']`.",
        starterCode: "function isSelector(arr) {\n  // scrie codul aici\n}\n\nconsole.log(isSelector(['h1', 'h2', 'h3']));",
        language: "javascript", expectedOutput: ":is(h1, h2, h3)", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `notSelector` care primește un selector și returnează sintaxa `:not()`. Testează cu `':first-child'`.",
        starterCode: "function notSelector(sel) {\n  // scrie codul aici\n}\n\nconsole.log(notSelector(':first-child'));",
        language: "javascript", expectedOutput: ":not(:first-child)", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `selectorParinte` care returnează `':has()'` ca primul selector CSS care selectează un parinte. Afișează rezultatul.",
        starterCode: "function selectorParinte() {\n  // scrie codul aici\n}\n\nconsole.log(selectorParinte());",
        language: "javascript", expectedOutput: ":has()", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08cec3999573855635c878",
    name: "28. Design System cu CSS",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează unde se definesc variabilele CSS globale:\n```css\n___root {\n  --color-primary: #3490dc;\n  --spacing-base: 1rem;\n}\n```",
        answer: ":", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea shorthand pentru font:\n```css\nbody {\n  ___: 16px/1.5 'Inter', sans-serif;\n}\n```",
        answer: "font", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru scala tipografică:\n```css\nh1 { font-___: 2.5rem; }\nh2 { font-___: 2rem; }\n```",
        answer: "size", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează unitatea de măsură recomandată pentru spacing în design systems:\n```css\n.card {\n  padding: 1.5___;\n}\n```",
        answer: "rem", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează selectorul pentru stiluri de reset CSS:\n```css\n*, *::before, *:::after {\n  box-___: border-box;\n}\n```",
        answer: "sizing", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scalaSpacing` care primește un număr n și returnează `n * 0.25rem` ca string. Testează cu `4`.",
        starterCode: "function scalaSpacing(n) {\n  // scrie codul aici\n}\n\nconsole.log(scalaSpacing(4));",
        language: "javascript", expectedOutput: "1rem", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `componente` care returnează array-ul cu componentele unui design system: `['button', 'input', 'card', 'modal', 'nav']`. Afișează lungimea.",
        starterCode: "function componente() {\n  // scrie codul aici\n}\n\nconsole.log(componente().length);",
        language: "javascript", expectedOutput: "5", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `culoareSemantica` care primește un tip (`'succes'`, `'eroare'`, `'avertizare'`) și returnează culoarea hex. Testează cu `'succes'`.",
        starterCode: "function culoareSemantica(tip) {\n  const map = {succes: '#22c55e', eroare: '#ef4444', avertizare: '#f59e0b'};\n  // scrie codul aici\n}\n\nconsole.log(culoareSemantica('succes'));",
        language: "javascript", expectedOutput: "#22c55e", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scalaTipografica` care returnează array-ul cu dimensiunile de font în rem: `[0.75, 0.875, 1, 1.25, 1.5, 2, 2.5, 3]`. Afișează al treilea element.",
        starterCode: "function scalaTipografica() {\n  // scrie codul aici\n}\n\nconsole.log(scalaTipografica()[2]);",
        language: "javascript", expectedOutput: "1", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tokenCSS` care primește un tip și o valoare și returnează declarația variabilei CSS. Testează cu `('primary', '#3490dc')`.",
        starterCode: "function tokenCSS(tip, val) {\n  // scrie codul aici\n}\n\nconsole.log(tokenCSS('primary', '#3490dc'));",
        language: "javascript", expectedOutput: "--primary: #3490dc", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08cec6999573855635c88c",
    name: "29. Container Queries Avansate și @scope",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează regula pentru a limita stilurile la un anumit scope:\n```css\n@___ (.card) {\n  p { color: blue; }\n}\n```",
        answer: "scope", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa `@scope` cu limita de excludere:\n```css\n@scope (.card) ___ (.card__footer) {\n  p { font-size: 0.9rem; }\n}\n```",
        answer: "to", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează container-type pentru a răspunde la lățimea și înălțimea containerului:\n```css\n.widget {\n  container-type: ___;\n}\n```",
        answer: "size", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează unitatea container query pentru înălțime (1% din înălțimea containerului):\n```css\n.element {\n  height: 50___;\n}\n```",
        answer: "cqh", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa container query cu nume:\n```css\n@container ___(min-width: 400px) {\n  .card { display: flex; }\n}\n```",
        answer: "sidebar", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scopeDescriere` care returnează `'CSS scoped la un context'` ca descriere a `@scope`. Afișează rezultatul.",
        starterCode: "function scopeDescriere() {\n  // scrie codul aici\n}\n\nconsole.log(scopeDescriere());",
        language: "javascript", expectedOutput: "CSS scoped la un context", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `containerNamed` care primește un nume și o condiție și returnează sintaxa `@container`. Testează cu `('sidebar', 'min-width: 400px')`.",
        starterCode: "function containerNamed(name, cond) {\n  // scrie codul aici\n}\n\nconsole.log(containerNamed('sidebar', 'min-width: 400px'));",
        language: "javascript", expectedOutput: "@container sidebar (min-width: 400px)", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `cqUnitatii` care returnează array-ul complet cu unitățile container query. Afișează prima.",
        starterCode: "function cqUnitatii() {\n  return ['cqw', 'cqh', 'cqi', 'cqb', 'cqmin', 'cqmax'];\n}\n\nconsole.log(cqUnitatii()[0]);",
        language: "javascript", expectedOutput: "cqw", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `esteContainerQuery` care returnează `true` dacă un string conține `'@container'`. Testează cu `'@container sidebar (min-width: 400px)'`.",
        starterCode: "function esteContainerQuery(str) {\n  // scrie codul aici\n}\n\nconsole.log(esteContainerQuery('@container sidebar (min-width: 400px)'));",
        language: "javascript", expectedOutput: "true", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `avantajScope` care returnează principalul avantaj al `@scope`: `'stiluri izolate fara conflicte'`. Afișează rezultatul.",
        starterCode: "function avantajScope() {\n  // scrie codul aici\n}\n\nconsole.log(avantajScope());",
        language: "javascript", expectedOutput: "stiluri izolate fara conflicte", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a08cec9999573855635c8a0",
    name: "30. Mini Proiect CSS — Landing Page Completă",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru culorile și dimensiunile custom ale paginii:\n```css\n:root {\n  ___primary: #6366f1;\n  ___font-base: 1rem;\n}\n```",
        answer: "--", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru layout hero cu Flexbox:\n```css\n.hero {\n  display: flex;\n  ___-content: center;\n  ___-items: center;\n}\n```",
        answer: "justify", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează media query pentru mobile-first:\n```css\n@media (___-width: 768px) {\n  .grid { grid-template-columns: 1fr; }\n}\n```",
        answer: "max", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru spațiu între elementele grid:\n```css\n.grid {\n  display: grid;\n  ___: 2rem;\n}\n```",
        answer: "gap", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru animația butonului la hover:\n```css\n.cta:hover {\n  ___: translateY(-2px);\n  transition: transform 0.2s;\n}\n```",
        answer: "transform", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `sectiuniLanding` care returnează array-ul cu secțiunile unei landing page. Afișează prima.",
        starterCode: "function sectiuniLanding() {\n  return ['hero', 'features', 'pricing', 'testimonials', 'cta', 'footer'];\n}\n\nconsole.log(sectiuniLanding()[0]);",
        language: "javascript", expectedOutput: "hero", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `culoaraPrimara` care primește o temă (`'light'`, `'dark'`) și returnează culoarea primară corespunzătoare. Testează cu `'light'`.",
        starterCode: "function culoaraPrimara(tema) {\n  const culori = {light: '#6366f1', dark: '#818cf8'};\n  // scrie codul aici\n}\n\nconsole.log(culoaraPrimara('light'));",
        language: "javascript", expectedOutput: "#6366f1", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `gridLayout` care primește numărul de coloane și returnează valoarea `grid-template-columns`. Testează cu `3`.",
        starterCode: "function gridLayout(n) {\n  // scrie codul aici\n}\n\nconsole.log(gridLayout(3));",
        language: "javascript", expectedOutput: "repeat(3, 1fr)", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `contrastColor` care primește o culoare (`'light'` sau `'dark'`) și returnează culoarea de contrast pentru text. Testează cu `'dark'`.",
        starterCode: "function contrastColor(bg) {\n  // scrie codul aici\n}\n\nconsole.log(contrastColor('dark'));",
        language: "javascript", expectedOutput: "#ffffff", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarProprietatiCSS` care returnează câte proprietăți CSS sunt folosite frecvent în landing pages (color, background, padding, margin, display, font-size, border-radius, box-shadow = 8). Afișează rezultatul.",
        starterCode: "function numarProprietatiCSS() {\n  // scrie codul aici\n}\n\nconsole.log(numarProprietatiCSS());",
        language: "javascript", expectedOutput: "8", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b2059384b94515fcf6e3",
    name: "31. CSS Houdini API",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru înregistrarea unui CSS Paint Worklet:\n```js\nCSS.paintWorklet.___('my-painter', class { paint(ctx) {} });\n```",
        answer: "addModule", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează funcția CSS pentru folosirea unui paint worklet:\n```css\n.element {\n  background: ___(my-painter);\n}\n```",
        answer: "paint", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru înregistrarea unei proprietăți CSS custom cu tip:\n```js\nCSS.___Property('--my-color', { syntax: '<color>', inherits: false });\n```",
        answer: "register", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa CSS alternativă pentru înregistrarea proprietății:\n```css\n@property --my-color {\n  syntax: '<___>';\n  inherits: false;\n  initial-value: blue;\n}\n```",
        answer: "color", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează tipul worklet pentru animații personalizate:\n```js\nanimationWorklet.addModule('animation-___r.js');\n```",
        answer: "worke", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `houdiniApis` care returnează array-ul cu API-urile Houdini. Afișează primul.",
        starterCode: "function houdiniApis() {\n  return ['CSS Paint API', 'CSS Layout API', 'CSS Animation Worklet', 'CSS Properties API', 'CSS Parser API'];\n}\n\nconsole.log(houdiniApis()[0]);",
        language: "javascript", expectedOutput: "CSS Paint API", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `propertyCSS` care primește un nume și un tip și returnează sintaxa `@property`. Testează cu `('--my-color', '<color>')`.",
        starterCode: "function propertyCSS(name, syntax) {\n  // scrie codul aici\n}\n\nconsole.log(propertyCSS('--my-color', '<color>'));",
        language: "javascript", expectedOutput: "@property --my-color { syntax: '<color>'; }", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `houdiniDescriere` care returnează `'API pentru extensii CSS de nivel jos'` ca descriere Houdini. Afișează rezultatul.",
        starterCode: "function houdiniDescriere() {\n  // scrie codul aici\n}\n\nconsole.log(houdiniDescriere());",
        language: "javascript", expectedOutput: "API pentru extensii CSS de nivel jos", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `suportHoudini` care returnează `'suport limitat'` ca status al suportului Houdini în browsere. Afișează rezultatul.",
        starterCode: "function suportHoudini() {\n  // scrie codul aici\n}\n\nconsole.log(suportHoudini());",
        language: "javascript", expectedOutput: "suport limitat", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipuriSyntax` care returnează array-ul cu tipurile de sintaxă pentru `@property`: `['<color>', '<length>', '<number>', '<percentage>', '<integer>']`. Afișează al treilea.",
        starterCode: "function tipuriSyntax() {\n  // scrie codul aici\n}\n\nconsole.log(tipuriSyntax()[2]);",
        language: "javascript", expectedOutput: "<number>", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b2089384b94515fcf6f7",
    name: "32. View Transitions API",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a declanșa o View Transition:\n```js\ndocument.___(async () => {\n  // modificare DOM\n});\n```",
        answer: "startViewTransition", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-elementul pentru elementul vechi în tranziție:\n```css\n::view-transition-___(*) {\n  animation-duration: 0.3s;\n}\n```",
        answer: "old", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-elementul pentru elementul nou în tranziție:\n```css\n::view-transition-___(*) {\n  animation: slideIn 0.5s;\n}\n```",
        answer: "new", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea CSS pentru a numi un element pentru View Transition:\n```css\n.card {\n  view-transition-___: my-card;\n}\n```",
        answer: "name", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează pseudo-elementul rădăcină pentru View Transitions:\n```css\n::view-transition-___(root) {\n  animation-duration: 0.5s;\n}\n```",
        answer: "group", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `viewTransitionSteps` care returnează array-ul cu pașii unei View Transition: `['snapshot-old', 'dom-update', 'snapshot-new', 'animate']`. Afișează primul.",
        starterCode: "function viewTransitionSteps() {\n  // scrie codul aici\n}\n\nconsole.log(viewTransitionSteps()[0]);",
        language: "javascript", expectedOutput: "snapshot-old", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `viewTransitionDescriere` care returnează `'animatii intre stari DOM'` ca descriere. Afișează rezultatul.",
        starterCode: "function viewTransitionDescriere() {\n  // scrie codul aici\n}\n\nconsole.log(viewTransitionDescriere());",
        language: "javascript", expectedOutput: "animatii intre stari DOM", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `pseudoElementeVT` care returnează array-ul cu pseudo-elementele View Transition. Afișează primul cu `::`.",
        starterCode: "function pseudoElementeVT() {\n  return ['::view-transition', '::view-transition-group', '::view-transition-image-pair', '::view-transition-old', '::view-transition-new'];\n}\n\nconsole.log(pseudoElementeVT()[0]);",
        language: "javascript", expectedOutput: "::view-transition", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `suportVTA` care returnează `'Chrome 111+'` ca informație de suport. Afișează rezultatul.",
        starterCode: "function suportVTA() {\n  // scrie codul aici\n}\n\nconsole.log(suportVTA());",
        language: "javascript", expectedOutput: "Chrome 111+", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `viewTransitionName` care primește un element și returnează `'view-transition-name: ELEMENT'`. Testează cu `'card'`.",
        starterCode: "function viewTransitionName(el) {\n  // scrie codul aici\n}\n\nconsole.log(viewTransitionName('card'));",
        language: "javascript", expectedOutput: "view-transition-name: card", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b20a9384b94515fcf70b",
    name: "33. Scroll-Driven Animations",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a lega o animație de scroll:\n```css\n.element {\n  animation: fadeIn linear;\n  animation-___: scroll();\n}\n```",
        answer: "timeline", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează funcția pentru timeline bazat pe vizibilitatea elementului:\n```css\n.card {\n  animation-timeline: ___(card-scope);\n}\n```",
        answer: "view", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a defini scope-ul unui scroll timeline:\n```css\n.container {\n  scroll-timeline-___: my-timeline;\n}\n```",
        answer: "name", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează keyword-ul pentru scroll pe axa verticală:\n```css\n.element {\n  animation-timeline: scroll(root ___);\n}\n```",
        answer: "block", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează proprietatea pentru a controla range-ul animației:\n```css\n.element {\n  animation-range: entry ___ exit 100%;\n}\n```",
        answer: "0%", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scrollTimeline` care returnează `'scroll()'` ca valoarea animation-timeline pentru scroll. Afișează rezultatul.",
        starterCode: "function scrollTimeline() {\n  // scrie codul aici\n}\n\nconsole.log(scrollTimeline());",
        language: "javascript", expectedOutput: "scroll()", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `tipuriTimeline` care returnează array-ul cu tipurile de animation-timeline: `['auto', 'scroll()', 'view()']`. Afișează ultima.",
        starterCode: "function tipuriTimeline() {\n  // scrie codul aici\n}\n\nconst t = tipuriTimeline();\nconsole.log(t[t.length-1]);",
        language: "javascript", expectedOutput: "view()", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `procentScroll` care primește pixeli scrollati și înălțimea totală și returnează procentul. Testează cu `(500, 2000)`.",
        starterCode: "function procentScroll(scrolled, total) {\n  // scrie codul aici\n}\n\nconsole.log(procentScroll(500, 2000));",
        language: "javascript", expectedOutput: "25", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `animationRange` care primește entry și exit și returnează valoarea `animation-range`. Testează cu `('0%', '100%')`.",
        starterCode: "function animationRange(entry, exit) {\n  // scrie codul aici\n}\n\nconsole.log(animationRange('0%', '100%'));",
        language: "javascript", expectedOutput: "entry 0% exit 100%", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `suportSDA` care returnează `'Chrome 115+'` ca informație de suport pentru Scroll-Driven Animations. Afișează rezultatul.",
        starterCode: "function suportSDA() {\n  // scrie codul aici\n}\n\nconsole.log(suportSDA());",
        language: "javascript", expectedOutput: "Chrome 115+", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b20d9384b94515fcf71f",
    name: "34. Cascade Layers si @scope avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează ordinea de declarare a layerelor (primul declarat are prioritate MAI MICĂ):\n```css\n@layer reset, ___, utilities;\n```",
        answer: "base", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa pentru stiluri imbricate în layer:\n```css\n@layer components {\n  @layer ___  {\n    .btn { background: blue; }\n  }\n}\n```",
        answer: "button", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa pentru accesarea unui sub-layer:\n```css\n@layer components.button {\n  .btn:___ { background: darkblue; }\n}\n```",
        answer: "hover", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa `@scope` pentru a viza doar titluri dintr-un card:\n```css\n@scope (.card) {\n  ___ { color: navy; }\n}\n```",
        answer: "h2", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează selectorul special pentru rădăcina scope-ului:\n```css\n@scope (.card) {\n  ___ { background: white; }\n}\n```",
        answer: ":scope", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `layerImbricat` care primește parinte și copil și returnează sintaxa layerului imbricat. Testează cu `('components', 'button')`.",
        starterCode: "function layerImbricat(parinte, copil) {\n  // scrie codul aici\n}\n\nconsole.log(layerImbricat('components', 'button'));",
        language: "javascript", expectedOutput: "components.button", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `prioritateLayers` care primește un array de layere și returnează care are cea mai mare prioritate (ultimul). Testează cu `['reset', 'base', 'utils']`.",
        starterCode: "function prioritateLayers(arr) {\n  // scrie codul aici\n}\n\nconsole.log(prioritateLayers(['reset', 'base', 'utils']));",
        language: "javascript", expectedOutput: "utils", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `scopeRoot` care returnează selectorul pentru rădăcina unui scope. Afișează rezultatul.",
        starterCode: "function scopeRoot() {\n  // scrie codul aici — returnează ':scope'\n}\n\nconsole.log(scopeRoot());",
        language: "javascript", expectedOutput: ":scope", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarSubLayere` care primește un string `'a.b.c'` și returnează numărul de niveluri de imbricare. Testează cu `'components.button.primary'`.",
        starterCode: "function numarSubLayere(str) {\n  // scrie codul aici\n}\n\nconsole.log(numarSubLayere('components.button.primary'));",
        language: "javascript", expectedOutput: "3", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `cazUzScope` care returnează `'stilizare izolata componente'` ca principalul caz de utilizare al `@scope`. Afișează rezultatul.",
        starterCode: "function cazUzScope() {\n  // scrie codul aici\n}\n\nconsole.log(cazUzScope());",
        language: "javascript", expectedOutput: "stilizare izolata componente", answer: "", options: []
      }
    ]
  },
  {
    lessonId: "6a09b20f9384b94515fcf733",
    name: "35. CSS Color Level 5 si Display P3",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează funcția de culoare perceptiv uniformă:\n```css\n.element {\n  color: ___(70% 0.15 200);\n}\n```",
        answer: "oklch", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează funcția de culoare din același spațiu perceptiv (versiunea cartesiană):\n```css\n.element {\n  color: ___(70% -0.1 0.15);\n}\n```",
        answer: "oklab", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează funcția pentru culori din spațiul Display P3:\n```css\n.element {\n  color: ___(display-p3 1 0.5 0);\n}\n```",
        answer: "color", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează funcția pentru mixul de culori:\n```css\n.element {\n  background: color-___(blue 50%, red 50%);\n}\n```",
        answer: "mix", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează funcția pentru culoare relativă (bazată pe o altă culoare):\n```css\n.element {\n  color: oklch(___ oklch-color l c h);\n}\n```",
        answer: "from", options: [], starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `spatiiCuloare` care returnează array-ul cu spațiile de culoare CSS moderne. Afișează primul.",
        starterCode: "function spatiiCuloare() {\n  return ['oklch', 'oklab', 'lch', 'lab', 'display-p3', 'srgb'];\n}\n\nconsole.log(spatiiCuloare()[0]);",
        language: "javascript", expectedOutput: "oklch", answer: "", options: []
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `oklchCuloare` care primește luminozitate (L), croma (C) și unghi (H) și returnează valoarea CSS. Testează cu `(70, 0.15, 200)`.",
        starterCode: "function oklchCuloare(l, c, h) {\n  // scrie codul aici\n}\n\nconsole.log(oklchCuloare(70, 0.15, 200));",
        language: "javascript", expectedOutput: "oklch(70% 0.15 200)", answer: "", options: []
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `avantajOklch` care returnează `'perceptiv uniform'` ca principal avantaj al oklch. Afișează rezultatul.",
        starterCode: "function avantajOklch() {\n  // scrie codul aici\n}\n\nconsole.log(avantajOklch());",
        language: "javascript", expectedOutput: "perceptiv uniform", answer: "", options: []
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `colorMix` care primește două culori și returnează sintaxa `color-mix()`. Testează cu `('blue', 'red')`.",
        starterCode: "function colorMix(c1, c2) {\n  // scrie codul aici\n}\n\nconsole.log(colorMix('blue', 'red'));",
        language: "javascript", expectedOutput: "color-mix(in oklch, blue, red)", answer: "", options: []
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Scrie o funcție `numarFunctiiCuloare` care returnează numărul de funcții moderne de culoare CSS (oklch, oklab, lch, lab, color, color-mix, color-contrast = 7). Afișează rezultatul.",
        starterCode: "function numarFunctiiCuloare() {\n  // scrie codul aici\n}\n\nconsole.log(numarFunctiiCuloare());",
        language: "javascript", expectedOutput: "7", answer: "", options: []
      }
    ]
  }
];

async function main() {
  console.log("Fixing CSS lessons...");
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({ where: { lessonId: fix.lessonId, number: { gte: 6 } } });
    await prisma.task.createMany({ data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId })) });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
