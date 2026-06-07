const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  {
    lessonId: "69fb777b023e09d08efe05e1",
    name: "5. Setup și instalare",
    tasks: [
      // fillblank #6-10
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează comanda pentru a inițializa un proiect Node.js nou:\n```\n___ init -y\n```",
        answer: "npm", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează directiva CSS pentru a importa utilitățile de bază Tailwind:\n```css\n@tailwind ___;\n```",
        answer: "utilities", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează câmpul din tailwind.config.js care specifică fișierele scanate:\n```js\nmodule.exports = { ___ : ['./src/**/*.{js,jsx}'] }\n```",
        answer: "content", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează comanda de instalare Tailwind CSS ca dependință de dezvoltare:\n```\nnpm install -D tailwindcss postcss ___\n```",
        answer: "autoprefixer", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează directiva CSS pentru componente Tailwind:\n```css\n@tailwind ___;\n```",
        answer: "components", starterCode: "", language: "javascript", expectedOutput: ""
      },
      // coding #11-15
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu cele 3 directive Tailwind obligatorii și afișează-le cu console.log, câte una pe linie.",
        answer: "const directive = ['@tailwind base', '@tailwind components', '@tailwind utilities'];\ndirective.forEach(d => console.log(d));",
        starterCode: "", language: "javascript",
        expectedOutput: "@tailwind base\n@tailwind components\n@tailwind utilities"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un obiect care reprezintă configurația Tailwind. Afișează valoarea câmpului 'content' ca JSON cu console.log.\n```js\nconst config = { content: ['./src/**/*.{js,jsx,ts,tsx}'], theme: {}, plugins: [] };\n```",
        answer: "const config = { content: ['./src/**/*.{js,jsx,ts,tsx}'], theme: {}, plugins: [] };\nconsole.log(JSON.stringify(config.content));",
        starterCode: "", language: "javascript",
        expectedOutput: '["./src/**/*.{js,jsx,ts,tsx}"]'
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Creează un array cu extensiile de fișiere acceptate de Tailwind (js, jsx, ts, tsx, html) și afișează câte extensii sunt cu console.log.",
        answer: "const ext = ['js', 'jsx', 'ts', 'tsx', 'html'];\nconsole.log(ext.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log comanda npx pentru a genera fișierul tailwind.config.js.",
        answer: "console.log('npx tailwindcss init');",
        starterCode: "", language: "javascript",
        expectedOutput: "npx tailwindcss init"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Ai un string cu calea unui fișier CSS. Verifică dacă include '@tailwind utilities' și afișează true sau false cu console.log.\n```js\nconst css = '@tailwind base;\\n@tailwind components;\\n@tailwind utilities;';\n```",
        answer: "const css = '@tailwind base;\\n@tailwind components;\\n@tailwind utilities;';\nconsole.log(css.includes('@tailwind utilities'));",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      }
    ]
  },
  {
    lessonId: "69fb777d023e09d08efe05ed",
    name: "6. Colors și Background",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa Tailwind pentru fundal albastru intens (500):\n```html\n<div class=\"bg-___-500\">Albastru</div>\n```",
        answer: "blue", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru text alb în Tailwind:\n```html\n<div class=\"___-white\">Text</div>\n```",
        answer: "text", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru gradient de la stânga la dreapta:\n```html\n<div class=\"bg-gradient-to-___\">Gradient</div>\n```",
        answer: "r", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru opacitate 75% în Tailwind:\n```html\n<div class=\"opacity-___\">Element</div>\n```",
        answer: "75", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru culoare de start a gradientului:\n```html\n<div class=\"bg-gradient-to-r from-blue-500 ___-red-500\">Gradient</div>\n```",
        answer: "to", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu 5 clase Tailwind de background-color (bg-*) și afișează-le sortate alfabetic cu console.log, câte una pe linie.",
        answer: "const classes = ['bg-blue-500', 'bg-green-300', 'bg-red-700', 'bg-slate-100', 'bg-yellow-400'];\nclasses.sort().forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-blue-500\nbg-green-300\nbg-red-700\nbg-slate-100\nbg-yellow-400"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de culori Tailwind. Filtrează doar clasele care conțin '500' și afișează câte sunt cu console.log.\n```js\nconst cols = ['bg-blue-500', 'bg-red-700', 'text-green-500', 'bg-slate-900', 'text-yellow-500'];\n```",
        answer: "const cols = ['bg-blue-500', 'bg-red-700', 'text-green-500', 'bg-slate-900', 'text-yellow-500'];\nconsole.log(cols.filter(c => c.includes('500')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește un string cu clasele pentru gradient (bg-gradient-to-r, from-purple-500, to-pink-500) separate prin spațiu și afișează-l cu console.log.",
        answer: "const grad = ['bg-gradient-to-r', 'from-purple-500', 'to-pink-500'].join(' ');\nconsole.log(grad);",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-gradient-to-r from-purple-500 to-pink-500"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele Tailwind pentru toate intensitățile de albastru: bg-blue-100, bg-blue-200, ..., bg-blue-900 (pasul 100).",
        answer: "for (let i = 1; i <= 9; i++) { console.log('bg-blue-' + i * 100); }",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-blue-100\nbg-blue-200\nbg-blue-300\nbg-blue-400\nbg-blue-500\nbg-blue-600\nbg-blue-700\nbg-blue-800\nbg-blue-900"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log clasa completă Tailwind pentru un fundal cu opacitate 50% pe albastru-500 (format: bg-blue-500/50).",
        answer: "const color = 'blue';\nconst intensity = 500;\nconst opacity = 50;\nconsole.log(`bg-${color}-${intensity}/${opacity}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-blue-500/50"
      }
    ]
  },
  {
    lessonId: "69fb777f023e09d08efe05f9",
    name: "7. Typography (text)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa Tailwind pentru text extra-large:\n```html\n<p class=\"text-___\">Titlu</p>\n```",
        answer: "xl", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru text bold:\n```html\n<p class=\"font-___\">Bold</p>\n```",
        answer: "bold", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru aliniere text la centru:\n```html\n<p class=\"text-___\">Centrat</p>\n```",
        answer: "center", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru spațierea relaxată între linii:\n```html\n<p class=\"leading-___\">Text</p>\n```",
        answer: "relaxed", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru spațiere largă între litere:\n```html\n<p class=\"tracking-___\">Litere</p>\n```",
        answer: "wide", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu dimensiunile de text Tailwind de la xs la 4xl și afișează câte dimensiuni există cu console.log.",
        answer: "const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'];\nconsole.log(sizes.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "8"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase CSS. Filtrează doar clasele legate de font (încep cu 'font-') și afișează-le cu console.log, câte una pe linie.\n```js\nconst cls = ['text-xl', 'font-bold', 'text-center', 'font-semibold', 'leading-relaxed', 'font-light'];\n```",
        answer: "const cls = ['text-xl', 'font-bold', 'text-center', 'font-semibold', 'leading-relaxed', 'font-light'];\ncls.filter(c => c.startsWith('font-')).forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "font-bold\nfont-semibold\nfont-light"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește clasa de text Tailwind pentru titlu dintr-un obiect config și afișeaz-o cu console.log.\n```js\nconst cfg = { prefix: 'text', size: '2xl' };\n```",
        answer: "const cfg = { prefix: 'text', size: '2xl' };\nconsole.log(`${cfg.prefix}-${cfg.size}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "text-2xl"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log toate valorile valide ale clasei font-weight Tailwind: thin, extralight, light, normal, medium, semibold, bold, extrabold, black.",
        answer: "['thin','extralight','light','normal','medium','semibold','bold','extrabold','black'].forEach(w => console.log('font-' + w));",
        starterCode: "", language: "javascript",
        expectedOutput: "font-thin\nfont-extralight\nfont-light\nfont-normal\nfont-medium\nfont-semibold\nfont-bold\nfont-extrabold\nfont-black"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Verifică dacă string-ul 'text-center font-bold text-xl' conține toate cele 3 clase necesare unui titlu centrat și afișează true sau false cu console.log.",
        answer: "const s = 'text-center font-bold text-xl';\nconst needed = ['text-center', 'font-bold', 'text-xl'];\nconsole.log(needed.every(c => s.includes(c)));",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      }
    ]
  },
  {
    lessonId: "6a021c0cf0ec7fc9c03a6cec",
    name: "10. Grid avansat (placement, span)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un element care ocupă 2 coloane în grid:\n```html\n<div class=\"col-___-2\">Larg</div>\n```",
        answer: "span", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un grid cu 3 coloane:\n```html\n<div class=\"grid grid-cols-___\">Grid</div>\n```",
        answer: "3", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru a porni un element din coloana 2:\n```html\n<div class=\"col-start-___\">Start</div>\n```",
        answer: "2", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un element care ocupă 2 rânduri:\n```html\n<div class=\"row-___-2\">Înalt</div>\n```",
        answer: "span", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru numărul de coloane din grid (valoarea 12):\n```html\n<div class=\"grid grid-cols-___\">12 coloane</div>\n```",
        answer: "12", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele col-span de la 1 la 6, câte una pe linie.",
        answer: "for (let i = 1; i <= 6; i++) { console.log('col-span-' + i); }",
        starterCode: "", language: "javascript",
        expectedOutput: "col-span-1\ncol-span-2\ncol-span-3\ncol-span-4\ncol-span-5\ncol-span-6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de elemente grid cu proprietatea span. Calculează suma totală a span-urilor și afișeaz-o cu console.log.\n```js\nconst items = [{span:2},{span:1},{span:3},{span:1},{span:2},{span:3}];\n```",
        answer: "const items = [{span:2},{span:1},{span:3},{span:1},{span:2},{span:3}];\nconsole.log(items.reduce((s,i) => s + i.span, 0));",
        starterCode: "", language: "javascript",
        expectedOutput: "12"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasa completă pentru un element care pornește din coloana 2 și ocupă 3 coloane (format: 'col-start-2 col-span-3').",
        answer: "const start = 2;\nconst span = 3;\nconsole.log(`col-start-${start} col-span-${span}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "col-start-2 col-span-3"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log câte coloane complete de 12 pot fi formate din elemente cu span-urile: [4, 4, 4, 3, 3, 6].\n```js\nconst spans = [4, 4, 4, 3, 3, 6];\n```",
        answer: "const spans = [4, 4, 4, 3, 3, 6];\nconsole.log(Math.floor(spans.reduce((a,b)=>a+b,0) / 12));",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Creează un array cu clasele grid pentru coloane de la grid-cols-1 la grid-cols-12 și afișează doar cele pare (grid-cols-2, 4, 6, 8, 10, 12) cu console.log, câte una pe linie.",
        answer: "for (let i = 2; i <= 12; i += 2) { console.log('grid-cols-' + i); }",
        starterCode: "", language: "javascript",
        expectedOutput: "grid-cols-2\ngrid-cols-4\ngrid-cols-6\ngrid-cols-8\ngrid-cols-10\ngrid-cols-12"
      }
    ]
  },
  {
    lessonId: "6a021c0df0ec7fc9c03a6cf3",
    name: "11. Borders și Border Radius",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa Tailwind pentru border de 2px:\n```html\n<div class=\"border-___\">Element</div>\n```",
        answer: "2", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru culoarea border gri-300:\n```html\n<div class=\"border border-___-300\">Element</div>\n```",
        answer: "gray", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru colțuri foarte rotunjite (xl):\n```html\n<div class=\"rounded-___\">Card</div>\n```",
        answer: "xl", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru ring (outline) de 2px:\n```html\n<button class=\"ring-___\">Buton</button>\n```",
        answer: "2", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru colțuri complet rotunde (cerc):\n```html\n<div class=\"rounded-___\">Avatar</div>\n```",
        answer: "full", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu toate variantele de rounded Tailwind (none, sm, md, lg, xl, 2xl, 3xl, full) și afișează câte sunt cu console.log.",
        answer: "const r = ['rounded-none','rounded-sm','rounded','rounded-md','rounded-lg','rounded-xl','rounded-2xl','rounded-3xl','rounded-full'];\nconsole.log(r.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "9"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase CSS. Filtrează clasele care încep cu 'border-' și afișează-le cu console.log, câte una pe linie.\n```js\nconst cls = ['border-2','rounded-xl','border-gray-300','ring-2','border-t-4','p-4'];\n```",
        answer: "const cls = ['border-2','rounded-xl','border-gray-300','ring-2','border-t-4','p-4'];\ncls.filter(c => c.startsWith('border-')).forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "border-2\nborder-gray-300\nborder-t-4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește clasa de border pentru fiecare latură (t, r, b, l) cu grosimea 2 și afișeaz-o cu console.log, câte una pe linie.",
        answer: "['t','r','b','l'].forEach(side => console.log(`border-${side}-2`));",
        starterCode: "", language: "javascript",
        expectedOutput: "border-t-2\nborder-r-2\nborder-b-2\nborder-l-2"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log clasele ring pentru intensitățile 1, 2, 4, 8, câte una pe linie.",
        answer: "[1,2,4,8].forEach(v => console.log('ring-' + v));",
        starterCode: "", language: "javascript",
        expectedOutput: "ring-1\nring-2\nring-4\nring-8"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Verifică dacă clasa 'border-2 border-blue-500 rounded-lg' este completă (conține border-width, border-color și rounded) și afișează true sau false cu console.log.",
        answer: "const s = 'border-2 border-blue-500 rounded-lg';\nconst ok = /border-\\d/.test(s) && /border-[a-z]+-\\d+/.test(s) && /rounded/.test(s);\nconsole.log(ok);",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      }
    ]
  },
  {
    lessonId: "6a021c0ef0ec7fc9c03a6cfa",
    name: "12. Spacing și sizing avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru padding uniform de 4 unități:\n```html\n<div class=\"___-4\">Element</div>\n```",
        answer: "p", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru centrare orizontală automată:\n```html\n<div class=\"mx-___\">Container</div>\n```",
        answer: "auto", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru lățime 100%:\n```html\n<div class=\"w-___\">Full width</div>\n```",
        answer: "full", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru înălțime minimă ecran complet:\n```html\n<div class=\"min-h-___\">Page</div>\n```",
        answer: "screen", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru spațiu orizontal de 4 unități între copii:\n```html\n<div class=\"flex space-x-___\">...</div>\n```",
        answer: "4", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele de padding (p-1 până la p-8) câte una pe linie.",
        answer: "for (let i = 1; i <= 8; i++) { console.log('p-' + i); }",
        starterCode: "", language: "javascript",
        expectedOutput: "p-1\np-2\np-3\np-4\np-5\np-6\np-7\np-8"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase de spacing. Calculează suma valorilor numerice extrase din clase de tip p-N și afișeaz-o cu console.log.\n```js\nconst cls = ['p-2','m-4','p-6','px-3','p-1'];\n```",
        answer: "const cls = ['p-2','m-4','p-6','px-3','p-1'];\nconst sum = cls.filter(c => /^p-\\d+$/.test(c)).reduce((a,c) => a + parseInt(c.split('-')[1]), 0);\nconsole.log(sum);",
        starterCode: "", language: "javascript",
        expectedOutput: "9"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele px și py pentru padding asimetric (px-6, py-4).",
        answer: "const x = 6, y = 4;\nconsole.log(`px-${x} py-${y}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "px-6 py-4"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Creează un array cu clasele de lățime fracționată Tailwind: w-1/2, w-1/3, w-2/3, w-1/4, w-3/4 și afișează-le cu console.log, câte una pe linie.",
        answer: "['w-1/2','w-1/3','w-2/3','w-1/4','w-3/4'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "w-1/2\nw-1/3\nw-2/3\nw-1/4\nw-3/4"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log câte clase de margin există în array (încep cu 'm').\n```js\nconst spacing = ['p-4','m-2','px-6','my-3','mx-auto','py-2','mt-4','mb-6'];\n```",
        answer: "const spacing = ['p-4','m-2','px-6','my-3','mx-auto','py-2','mt-4','mb-6'];\nconsole.log(spacing.filter(c => c.startsWith('m')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a021c0ff0ec7fc9c03a6d01",
    name: "13. Typography plugin (@tailwindcss/typography)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa principală pentru plugin-ul typography:\n```html\n<article class=\"___\">Conținut</article>\n```",
        answer: "prose", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru dimensiunea mare a prose:\n```html\n<article class=\"prose prose-___\">Text</article>\n```",
        answer: "lg", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru tema slate a prose:\n```html\n<article class=\"prose prose-___\">Text</article>\n```",
        answer: "slate", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează comanda npm pentru a instala plugin-ul typography:\n```\nnpm install -D @tailwindcss/___\n```",
        answer: "typography", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează câmpul din tailwind.config.js pentru a adăuga plugin-uri:\n```js\nmodule.exports = { ___ : [require('@tailwindcss/typography')] }\n```",
        answer: "plugins", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu variantele de dimensiune prose (sm, base, lg, xl, 2xl) și afișează-le cu prefix 'prose-' cu console.log, câte una pe linie.",
        answer: "['sm','base','lg','xl','2xl'].forEach(s => console.log('prose-' + s));",
        starterCode: "", language: "javascript",
        expectedOutput: "prose-sm\nprose-base\nprose-lg\nprose-xl\nprose-2xl"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un string de clase. Verifică dacă include clasa 'prose' și afișează true sau false cu console.log.\n```js\nconst cls = 'prose prose-lg prose-slate max-w-none';\n```",
        answer: "const cls = 'prose prose-lg prose-slate max-w-none';\nconsole.log(cls.split(' ').includes('prose'));",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasa completă pentru un articol prose, large, cu tema zinc (format: 'prose prose-lg prose-zinc').",
        answer: "const size = 'lg';\nconst theme = 'zinc';\nconsole.log(`prose prose-${size} prose-${theme}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "prose prose-lg prose-zinc"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log temele de culoare disponibile pentru prose: slate, gray, zinc, neutral, stone, red, orange, amber.",
        answer: "['slate','gray','zinc','neutral','stone','red','orange','amber'].forEach(t => console.log('prose-' + t));",
        starterCode: "", language: "javascript",
        expectedOutput: "prose-slate\nprose-gray\nprose-zinc\nprose-neutral\nprose-stone\nprose-red\nprose-orange\nprose-amber"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Numără câte clase din array sunt clase prose și afișează numărul cu console.log.\n```js\nconst cls = ['prose','prose-lg','max-w-none','prose-slate','font-bold','prose-invert'];\n```",
        answer: "const cls = ['prose','prose-lg','max-w-none','prose-slate','font-bold','prose-invert'];\nconsole.log(cls.filter(c => c === 'prose' || c.startsWith('prose-')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a021c10f0ec7fc9c03a6d08",
    name: "14. Forms plugin și design formulare",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa din forms plugin pentru un input text stilizat:\n```html\n<input class=\"form-___\" type=\"text\">\n```",
        answer: "input", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa din forms plugin pentru un select stilizat:\n```html\n<select class=\"form-___\">...</select>\n```",
        answer: "select", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa din forms plugin pentru un checkbox stilizat:\n```html\n<input type=\"checkbox\" class=\"form-___\">\n```",
        answer: "checkbox", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează comanda npm pentru a instala plugin-ul forms:\n```\nnpm install -D @tailwindcss/___\n```",
        answer: "forms", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa Tailwind pentru a face un input complet larg:\n```html\n<input class=\"form-input w-___\">\n```",
        answer: "full", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu tipurile de câmpuri suportate de forms plugin (input, select, textarea, checkbox, radio, range) și afișează-le cu prefix 'form-' cu console.log, câte una pe linie.",
        answer: "['input','select','textarea','checkbox','radio','range'].forEach(t => console.log('form-' + t));",
        starterCode: "", language: "javascript",
        expectedOutput: "form-input\nform-select\nform-textarea\nform-checkbox\nform-radio\nform-range"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase CSS pentru un form. Afișează cu console.log câte clase sunt specifice forms plugin (încep cu 'form-').\n```js\nconst cls = ['form-input','w-full','rounded-md','form-select','border-gray-300','form-checkbox','p-2'];\n```",
        answer: "const cls = ['form-input','w-full','rounded-md','form-select','border-gray-300','form-checkbox','p-2'];\nconsole.log(cls.filter(c => c.startsWith('form-')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasa completă pentru un input de form: form-input, w-full, rounded-md, border-gray-300 (separate prin spațiu).",
        answer: "console.log('form-input w-full rounded-md border-gray-300');",
        starterCode: "", language: "javascript",
        expectedOutput: "form-input w-full rounded-md border-gray-300"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele pentru stările unui input (normal, focus, disabled): 'form-input', 'focus:ring-2', 'disabled:opacity-50', câte una pe linie.",
        answer: "['form-input','focus:ring-2','disabled:opacity-50'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "form-input\nfocus:ring-2\ndisabled:opacity-50"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu clasele pentru 3 tipuri de input și afișează numărul de proprietăți cu console.log.\n```js\nconst formClasses = { text: 'form-input', select: 'form-select', check: 'form-checkbox' };\n```",
        answer: "const formClasses = { text: 'form-input', select: 'form-select', check: 'form-checkbox' };\nconsole.log(Object.keys(formClasses).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021c12f0ec7fc9c03a6d16",
    name: "16. Dark Mode",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa Tailwind pentru fundal dark mode:\n```html\n<div class=\"bg-white dark:bg-gray-___\">Element</div>\n```",
        answer: "900", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru text alb în dark mode:\n```html\n<p class=\"text-black dark:text-___\">Text</p>\n```",
        answer: "white", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează strategia de dark mode bazată pe clasă în tailwind.config.js:\n```js\nmodule.exports = { darkMode: '___' }\n```",
        answer: "class", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează prefixul Tailwind pentru stiluri active în modul întunecat:\n```html\n<div class=\"___:bg-gray-900\">Dark</div>\n```",
        answer: "dark", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează strategia de dark mode automată bazată pe preferința sistemului:\n```js\ndarkMode: 'media' // sau alternativa: darkMode: '___'\n```",
        answer: "class", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu 5 perechi dark mode (light/dark) și afișează câte perechi există cu console.log.\n```js\nconst pairs = [['bg-white','dark:bg-gray-900'],['text-black','dark:text-white'],['border-gray-200','dark:border-gray-700'],['bg-gray-100','dark:bg-gray-800'],['text-gray-900','dark:text-gray-100']];\n```",
        answer: "const pairs = [['bg-white','dark:bg-gray-900'],['text-black','dark:text-white'],['border-gray-200','dark:border-gray-700'],['bg-gray-100','dark:bg-gray-800'],['text-gray-900','dark:text-gray-100']];\nconsole.log(pairs.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase CSS. Filtrează clasele dark mode (încep cu 'dark:') și afișează-le cu console.log, câte una pe linie.\n```js\nconst cls = ['bg-white','dark:bg-gray-900','text-black','dark:text-white','p-4','dark:border-gray-700'];\n```",
        answer: "const cls = ['bg-white','dark:bg-gray-900','text-black','dark:text-white','p-4','dark:border-gray-700'];\ncls.filter(c => c.startsWith('dark:')).forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "dark:bg-gray-900\ndark:text-white\ndark:border-gray-700"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasa dark mode pentru un card (bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100).",
        answer: "console.log('bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100');",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log dacă string-ul de clase conține atât versiunea light cât și dark pentru background.\n```js\nconst cls = 'bg-white dark:bg-gray-900 text-black dark:text-white';\n```",
        answer: "const cls = 'bg-white dark:bg-gray-900 text-black dark:text-white';\nconst hasLight = cls.includes('bg-white');\nconst hasDark = cls.includes('dark:bg-');\nconsole.log(hasLight && hasDark);",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Numără câte clase dark: există în string și afișează numărul cu console.log.\n```js\nconst classes = 'bg-white dark:bg-gray-900 p-4 dark:text-white rounded-lg dark:border-gray-700 text-black dark:ring-2';\n```",
        answer: "const classes = 'bg-white dark:bg-gray-900 p-4 dark:text-white rounded-lg dark:border-gray-700 text-black dark:ring-2';\nconsole.log(classes.split(' ').filter(c => c.startsWith('dark:')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  },
  {
    lessonId: "6a021c13f0ec7fc9c03a6d1d",
    name: "17. Flexbox avansat",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un element care crește să ocupe spațiul disponibil:\n```html\n<div class=\"flex-___\">Crește</div>\n```",
        answer: "grow", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un element care nu se micșorează:\n```html\n<div class=\"flex-shrink-___\">Fix</div>\n```",
        answer: "0", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru wrap în flexbox:\n```html\n<div class=\"flex flex-___\">Elemente</div>\n```",
        answer: "wrap", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru spațiu de 4 unități între elemene flex:\n```html\n<div class=\"flex gap-___\">Items</div>\n```",
        answer: "4", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru aliniere pe axa secundară (centru):\n```html\n<div class=\"flex items-___\">Items</div>\n```",
        answer: "center", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu toate variantele justify-content Tailwind (start, end, center, between, around, evenly) și afișează-le cu prefix 'justify-' cu console.log, câte una pe linie.",
        answer: "['start','end','center','between','around','evenly'].forEach(v => console.log('justify-' + v));",
        starterCode: "", language: "javascript",
        expectedOutput: "justify-start\njustify-end\njustify-center\njustify-between\njustify-around\njustify-evenly"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase flexbox. Afișează cu console.log câte clase sunt pentru gap (încep cu 'gap-').\n```js\nconst cls = ['flex','gap-4','items-center','gap-x-2','justify-between','gap-y-6','flex-wrap'];\n```",
        answer: "const cls = ['flex','gap-4','items-center','gap-x-2','justify-between','gap-y-6','flex-wrap'];\nconsole.log(cls.filter(c => c.startsWith('gap-')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasa pentru un container flex centrată pe ambele axe.",
        answer: "console.log('flex items-center justify-center');",
        starterCode: "", language: "javascript",
        expectedOutput: "flex items-center justify-center"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log variantele de flex-direction Tailwind: flex-row, flex-row-reverse, flex-col, flex-col-reverse, câte una pe linie.",
        answer: "['flex-row','flex-row-reverse','flex-col','flex-col-reverse'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "flex-row\nflex-row-reverse\nflex-col\nflex-col-reverse"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele order-1 până la order-6, câte una pe linie.",
        answer: "for (let i = 1; i <= 6; i++) { console.log('order-' + i); }",
        starterCode: "", language: "javascript",
        expectedOutput: "order-1\norder-2\norder-3\norder-4\norder-5\norder-6"
      }
    ]
  },
  {
    lessonId: "6a021c14f0ec7fc9c03a6d24",
    name: "18. Stări avansate (hover, focus, group, peer)",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează prefixul pentru stiluri aplicate la hover pe un grup părinte:\n```html\n<div class=\"group\"><span class=\"___-hover:text-blue-500\">Text</span></div>\n```",
        answer: "group", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează prefixul pentru stiluri aplicate când un peer (frate) este checked:\n```html\n<input type=\"checkbox\" class=\"peer\"><label class=\"___-checked:text-green-500\">Label</label>\n```",
        answer: "peer", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează varianta pentru focus-within:\n```html\n<div class=\"focus-___:ring-2\">Container</div>\n```",
        answer: "within", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează prefixul pentru stiluri la hover simplu:\n```html\n<button class=\"___:bg-blue-600\">Buton</button>\n```",
        answer: "hover", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează varianta pentru stiluri la focus:\n```html\n<input class=\"___:ring-2 ___:ring-blue-500\">\n```",
        answer: "focus", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu variantele de stări Tailwind (hover, focus, active, disabled, visited, checked) și afișează-le cu console.log, câte una pe linie.",
        answer: "['hover','focus','active','disabled','visited','checked'].forEach(s => console.log(s + ':'));",
        starterCode: "", language: "javascript",
        expectedOutput: "hover:\nfocus:\nactive:\ndisabled:\nvisited:\nchecked:"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase. Filtrează clasele care conțin variante de stare (au ':') și afișează câte sunt cu console.log.\n```js\nconst cls = ['bg-blue-500','hover:bg-blue-700','text-white','focus:ring-2','rounded','group-hover:opacity-75','p-4'];\n```",
        answer: "const cls = ['bg-blue-500','hover:bg-blue-700','text-white','focus:ring-2','rounded','group-hover:opacity-75','p-4'];\nconsole.log(cls.filter(c => c.includes(':')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasa completă pentru un buton cu hover și focus (bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300).",
        answer: "console.log('bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300');",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log variantele responsive Tailwind: sm, md, lg, xl, 2xl cu prefix de breakpoint (format: 'sm:', 'md:' etc.), câte una pe linie.",
        answer: "['sm','md','lg','xl','2xl'].forEach(bp => console.log(bp + ':'));",
        starterCode: "", language: "javascript",
        expectedOutput: "sm:\nmd:\nlg:\nxl:\n2xl:"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Numără câte clase group-hover: există în string și afișează numărul cu console.log.\n```js\nconst s = 'group-hover:opacity-75 group-hover:translate-x-1 hover:bg-blue-500 group-hover:scale-105';\n```",
        answer: "const s = 'group-hover:opacity-75 group-hover:translate-x-1 hover:bg-blue-500 group-hover:scale-105';\nconsole.log(s.split(' ').filter(c => c.startsWith('group-hover:')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021c15f0ec7fc9c03a6d2b",
    name: "19. Mini proiect — Componente reale",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa Tailwind pentru un card cu umbră medie:\n```html\n<div class=\"rounded-xl shadow-___\">Card</div>\n```",
        answer: "md", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru o navbar sticky:\n```html\n<nav class=\"___-top-0 bg-white\">Nav</nav>\n```",
        answer: "sticky", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un overlay modal cu fundal semi-transparent:\n```html\n<div class=\"fixed inset-0 bg-black bg-opacity-___\">Modal</div>\n```",
        answer: "50", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru z-index mare al modalului:\n```html\n<div class=\"fixed z-___\">Modal</div>\n```",
        answer: "50", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru umbra cardului la hover:\n```html\n<div class=\"shadow-md hover:shadow-___\">Card</div>\n```",
        answer: "xl", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu clasele pentru un card Tailwind (rounded-xl, shadow-md, bg-white, p-6, hover:shadow-xl) și afișează-le cu console.log, câte una pe linie.",
        answer: "['rounded-xl','shadow-md','bg-white','p-6','hover:shadow-xl'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "rounded-xl\nshadow-md\nbg-white\np-6\nhover:shadow-xl"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de componente UI. Afișează cu console.log câte componente au clasa 'fixed'.\n```js\nconst components = ['navbar sticky top-0','modal fixed z-50','tooltip absolute','sidebar fixed left-0','dropdown absolute'];\n```",
        answer: "const components = ['navbar sticky top-0','modal fixed z-50','tooltip absolute','sidebar fixed left-0','dropdown absolute'];\nconsole.log(components.filter(c => c.includes('fixed')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "2"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele pentru un buton primar Tailwind (bg-blue-600, text-white, px-4, py-2, rounded-lg, hover:bg-blue-700).",
        answer: "console.log('bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700');",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele de shadow Tailwind: shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl, câte una pe linie.",
        answer: "['shadow-sm','shadow','shadow-md','shadow-lg','shadow-xl','shadow-2xl'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "shadow-sm\nshadow\nshadow-md\nshadow-lg\nshadow-xl\nshadow-2xl"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu 3 componente UI (card, navbar, modal) și afișează numărul de componente cu console.log.",
        answer: "const ui = { card: 'rounded-xl shadow-md bg-white p-6', navbar: 'sticky top-0 bg-white shadow-sm', modal: 'fixed inset-0 z-50 flex items-center justify-center' };\nconsole.log(Object.keys(ui).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a021c16f0ec7fc9c03a6d32",
    name: "20. Customizare și design system",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează directiva CSS v4 pentru configurare:\n```css\n@___ tailwindcss;\n```",
        answer: "import", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează directiva pentru tema customizată în CSS v4:\n```css\n@___ {\n  --color-brand: #3b82f6;\n}\n```",
        answer: "theme", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează variabila CSS pentru culoarea de brand în Tailwind:\n```css\n@theme {\n  ---color-brand: #3b82f6;\n}\n```\n(Hint: folosești prefix dublu de cratimă)",
        answer: "--color-brand", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează în tailwind.config.js cheia pentru culori custom:\n```js\nmodule.exports = { theme: { extend: { ___: { brand: '#3b82f6' } } } }\n```",
        answer: "colors", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează secțiunea din config pentru extinderea temei (nu înlocuire):\n```js\nmodule.exports = { theme: { ___: { colors: {} } } }\n```",
        answer: "extend", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un obiect cu culorile unui design system (primary, secondary, accent, background, text) și afișează cheile cu console.log, câte una pe linie.",
        answer: "const ds = { primary: '#3b82f6', secondary: '#6b7280', accent: '#f59e0b', background: '#ffffff', text: '#111827' };\nObject.keys(ds).forEach(k => console.log(k));",
        starterCode: "", language: "javascript",
        expectedOutput: "primary\nsecondary\naccent\nbackground\ntext"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un obiect de culori custom. Generează și afișează cu console.log clasele Tailwind bg- pentru fiecare culoare.\n```js\nconst colors = { primary: true, secondary: true, accent: true, muted: true };\n```",
        answer: "const colors = { primary: true, secondary: true, accent: true, muted: true };\nObject.keys(colors).forEach(c => console.log('bg-' + c));",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-primary\nbg-secondary\nbg-accent\nbg-muted"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log variabilele CSS pentru un design system (--color-primary, --color-secondary, --color-accent), câte una pe linie.",
        answer: "['primary','secondary','accent'].forEach(c => console.log('--color-' + c));",
        starterCode: "", language: "javascript",
        expectedOutput: "--color-primary\n--color-secondary\n--color-accent"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log câte culori custom sunt definite în obiectul de tema.\n```js\nconst theme = { extend: { colors: { brand: '#3b82f6', danger: '#ef4444', success: '#22c55e', warning: '#f59e0b' } } };\n```",
        answer: "const theme = { extend: { colors: { brand: '#3b82f6', danger: '#ef4444', success: '#22c55e', warning: '#f59e0b' } } };\nconsole.log(Object.keys(theme.extend.colors).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasa Tailwind pentru culoarea de brand în format text-brand-500.",
        answer: "const colorName = 'brand';\nconst intensity = 500;\nconsole.log(`text-${colorName}-${intensity}`);",
        starterCode: "", language: "javascript",
        expectedOutput: "text-brand-500"
      }
    ]
  },
  {
    lessonId: "6a08cffc999573855635cf89",
    name: "22. Glassmorphism și efecte moderne UI",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru blur mediu de fundal:\n```html\n<div class=\"backdrop-blur-___\">Glass</div>\n```",
        answer: "md", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru fundal alb cu 20% opacitate:\n```html\n<div class=\"bg-white/___\">Glass</div>\n```",
        answer: "20", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru filtru backdrop:\n```html\n<div class=\"___ backdrop-blur-md\">Glass</div>\n```",
        answer: "backdrop-filter", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează intensitatea blur-ului backdrop pentru efect glassmorphism pronunțat:\n```html\n<div class=\"backdrop-blur-___\">Glass intensiv</div>\n```",
        answer: "xl", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru border semi-transparent:\n```html\n<div class=\"border border-white/___\">Glass card</div>\n```",
        answer: "30", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu clasele pentru un card glassmorphism și afișează-le cu console.log, câte una pe linie.",
        answer: "['backdrop-blur-md','bg-white/20','border','border-white/30','rounded-xl','shadow-xl'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "backdrop-blur-md\nbg-white/20\nborder\nborder-white/30\nrounded-xl\nshadow-xl"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase. Filtrează clasele cu opacitate (conțin '/') și afișează câte sunt cu console.log.\n```js\nconst cls = ['bg-white/20','text-black','border-white/30','backdrop-blur-md','bg-blue-500/50','rounded-xl'];\n```",
        answer: "const cls = ['bg-white/20','text-black','border-white/30','backdrop-blur-md','bg-blue-500/50','rounded-xl'];\nconsole.log(cls.filter(c => c.includes('/')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele complete pentru glassmorphism: backdrop-filter, backdrop-blur-md, bg-white/10, border-white/20.",
        answer: "console.log('backdrop-filter backdrop-blur-md bg-white/10 border-white/20');",
        starterCode: "", language: "javascript",
        expectedOutput: "backdrop-filter backdrop-blur-md bg-white/10 border-white/20"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele backdrop-blur de la sm la xl: backdrop-blur-sm, backdrop-blur, backdrop-blur-md, backdrop-blur-lg, backdrop-blur-xl, câte una pe linie.",
        answer: "['backdrop-blur-sm','backdrop-blur','backdrop-blur-md','backdrop-blur-lg','backdrop-blur-xl'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "backdrop-blur-sm\nbackdrop-blur\nbackdrop-blur-md\nbackdrop-blur-lg\nbackdrop-blur-xl"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log valorile de opacitate (10, 20, 30, 40, 50) ca clase bg-white/ cu console.log, câte una pe linie.",
        answer: "[10,20,30,40,50].forEach(o => console.log(`bg-white/${o}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-white/10\nbg-white/20\nbg-white/30\nbg-white/40\nbg-white/50"
      }
    ]
  },
  {
    lessonId: "6a08cfff999573855635cf9d",
    name: "23. Scroll, Overflow și Interacțiuni",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru a ascunde conținutul care depășește elementul:\n```html\n<div class=\"overflow-___\">Content</div>\n```",
        answer: "hidden", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru scroll smooth:\n```html\n<html class=\"scroll-___\">\n```",
        answer: "smooth", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru overflow orizontal cu scroll:\n```html\n<div class=\"overflow-x-___\">Tabel</div>\n```",
        answer: "auto", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru a tăia textul care depășește (cu ellipsis):\n```html\n<p class=\"truncate overflow-___\">Text lung...</p>\n```",
        answer: "hidden", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru scroll snap pe axa X:\n```html\n<div class=\"snap-x snap-___\">Slider</div>\n```",
        answer: "mandatory", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu variantele de overflow Tailwind (hidden, auto, scroll, visible, clip) și afișează-le cu prefix 'overflow-' cu console.log, câte una pe linie.",
        answer: "['hidden','auto','scroll','visible','clip'].forEach(v => console.log('overflow-' + v));",
        starterCode: "", language: "javascript",
        expectedOutput: "overflow-hidden\noverflow-auto\noverflow-scroll\noverflow-visible\noverflow-clip"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase CSS. Filtrează clasele legate de overflow și afișează câte sunt cu console.log.\n```js\nconst cls = ['overflow-hidden','scroll-smooth','overflow-x-auto','p-4','overflow-y-scroll','truncate','w-full'];\n```",
        answer: "const cls = ['overflow-hidden','scroll-smooth','overflow-x-auto','p-4','overflow-y-scroll','truncate','w-full'];\nconsole.log(cls.filter(c => c.startsWith('overflow-')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele pentru un container cu scroll vertical (overflow-y-auto, max-h-96, scroll-smooth).",
        answer: "console.log('overflow-y-auto max-h-96 scroll-smooth');",
        starterCode: "", language: "javascript",
        expectedOutput: "overflow-y-auto max-h-96 scroll-smooth"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log clasele pentru scroll snap: snap-x, snap-y, snap-both, snap-mandatory, snap-proximity, câte una pe linie.",
        answer: "['snap-x','snap-y','snap-both','snap-mandatory','snap-proximity'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "snap-x\nsnap-y\nsnap-both\nsnap-mandatory\nsnap-proximity"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Verifică dacă string-ul de clase conține atât overflow-hidden cât și truncate și afișează true sau false cu console.log.\n```js\nconst cls = 'w-full overflow-hidden truncate text-sm text-gray-700';\n```",
        answer: "const cls = 'w-full overflow-hidden truncate text-sm text-gray-700';\nconsole.log(cls.includes('overflow-hidden') && cls.includes('truncate'));",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      }
    ]
  },
  {
    lessonId: "6a08d002999573855635cfb1",
    name: "24. Dashboard Admin cu Tailwind",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un sidebar fix pe stânga:\n```html\n<aside class=\"fixed left-0 top-0 h-full w-___\">Sidebar</aside>\n```",
        answer: "64", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru conținut principal cu margin-left pentru sidebar:\n```html\n<main class=\"ml-___\">Content</main>\n```",
        answer: "64", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru un grid de 4 coloane pentru stats cards:\n```html\n<div class=\"grid grid-cols-___\">Stats</div>\n```",
        answer: "4", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru card de statistică cu fundal alb și umbră:\n```html\n<div class=\"bg-white rounded-xl p-6 shadow-___\">Stat</div>\n```",
        answer: "sm", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru grid responsive care trece de la 1 la 4 coloane la lg:\n```html\n<div class=\"grid grid-cols-1 lg:grid-cols-___\">Dashboard</div>\n```",
        answer: "4", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu 4 stat cards (title, value) și afișează cu console.log fiecare în format 'title: value', câte una pe linie.",
        answer: "const stats = [{title:'Users',value:1250},{title:'Revenue',value:'$48k'},{title:'Orders',value:385},{title:'Growth',value:'12%'}];\nstats.forEach(s => console.log(`${s.title}: ${s.value}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "Users: 1250\nRevenue: $48k\nOrders: 385\nGrowth: 12%"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array cu clasele sidebar-ului. Afișează cu console.log câte clase sunt de poziționare (fixed, absolute, relative, sticky).\n```js\nconst cls = ['fixed','left-0','top-0','h-full','w-64','bg-gray-900','text-white','overflow-y-auto'];\n```",
        answer: "const cls = ['fixed','left-0','top-0','h-full','w-64','bg-gray-900','text-white','overflow-y-auto'];\nconst pos = ['fixed','absolute','relative','sticky'];\nconsole.log(cls.filter(c => pos.includes(c)).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "1"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele pentru un header de dashboard (flex, items-center, justify-between, bg-white, shadow-sm, px-6, py-4).",
        answer: "console.log('flex items-center justify-between bg-white shadow-sm px-6 py-4');",
        starterCode: "", language: "javascript",
        expectedOutput: "flex items-center justify-between bg-white shadow-sm px-6 py-4"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele responsive pentru grid de dashboard: grid-cols-1, sm:grid-cols-2, lg:grid-cols-4, câte una pe linie.",
        answer: "['grid-cols-1','sm:grid-cols-2','lg:grid-cols-4'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "grid-cols-1\nsm:grid-cols-2\nlg:grid-cols-4"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu clasele pentru componentele principale ale unui dashboard și afișează cheile cu console.log, câte una pe linie.",
        answer: "const dashboard = { sidebar: 'fixed left-0 top-0 h-full w-64', header: 'flex items-center justify-between', main: 'ml-64 p-6', statsGrid: 'grid grid-cols-4 gap-4' };\nObject.keys(dashboard).forEach(k => console.log(k));",
        starterCode: "", language: "javascript",
        expectedOutput: "sidebar\nheader\nmain\nstatsGrid"
      }
    ]
  },
  {
    lessonId: "6a08d008999573855635cfd9",
    name: "26. Proiect Final — Landing Page cu Tailwind",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru secțiunea hero cu înălțime ecran complet:\n```html\n<section class=\"min-h-___\">Hero</section>\n```",
        answer: "screen", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru container centrat cu lățime maximă:\n```html\n<div class=\"max-w-7xl mx-___\">Container</div>\n```",
        answer: "auto", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru secțiune responsivă cu padding vertical mare:\n```html\n<section class=\"py-___\">Section</section>\n```",
        answer: "20", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru text de titlu hero extra-mare:\n```html\n<h1 class=\"text-___\">Titlu</h1>\n```",
        answer: "6xl", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru layout responsive care afișează coloane la md:\n```html\n<div class=\"flex flex-col md:flex-___\">Layout</div>\n```",
        answer: "row", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu secțiunile unei landing page (hero, features, pricing, testimonials, cta, footer) și afișează câte secțiuni are cu console.log.",
        answer: "const sections = ['hero','features','pricing','testimonials','cta','footer'];\nconsole.log(sections.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de secțiuni cu clasa lor principală. Afișează cu console.log fiecare în format 'section: class', câte una pe linie.\n```js\nconst secs = [{name:'hero',cls:'min-h-screen'},{name:'features',cls:'py-20'},{name:'pricing',cls:'bg-gray-50 py-20'}];\n```",
        answer: "const secs = [{name:'hero',cls:'min-h-screen'},{name:'features',cls:'py-20'},{name:'pricing',cls:'bg-gray-50 py-20'}];\nsecs.forEach(s => console.log(`${s.name}: ${s.cls}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "hero: min-h-screen\nfeatures: py-20\npricing: bg-gray-50 py-20"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele pentru un CTA button primar (bg-indigo-600, text-white, px-8, py-3, rounded-full, hover:bg-indigo-700, font-semibold).",
        answer: "console.log('bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 font-semibold');",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 font-semibold"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele de max-width Tailwind: max-w-sm, max-w-md, max-w-lg, max-w-xl, max-w-2xl, max-w-7xl, câte una pe linie.",
        answer: "['max-w-sm','max-w-md','max-w-lg','max-w-xl','max-w-2xl','max-w-7xl'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "max-w-sm\nmax-w-md\nmax-w-lg\nmax-w-xl\nmax-w-2xl\nmax-w-7xl"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu clasele pentru hero section și afișează numărul de proprietăți cu console.log.\n```js\nconst hero = { section: 'min-h-screen flex items-center', container: 'max-w-7xl mx-auto px-6', title: 'text-6xl font-bold', subtitle: 'text-xl text-gray-600', cta: 'bg-indigo-600 text-white px-8 py-3 rounded-full' };\n```",
        answer: "const hero = { section: 'min-h-screen flex items-center', container: 'max-w-7xl mx-auto px-6', title: 'text-6xl font-bold', subtitle: 'text-xl text-gray-600', cta: 'bg-indigo-600 text-white px-8 py-3 rounded-full' };\nconsole.log(Object.keys(hero).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a08d00a999573855635cfed",
    name: "27. Tailwind Plugins și Extindere Custom",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează funcția Tailwind pentru a crea un plugin custom:\n```js\nconst plugin = require('tailwindcss/___');\n```",
        answer: "plugin", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a adăuga componente în plugin:\n```js\nplugin(function({ ___ }) { addComponents({...}) })\n```",
        answer: "addComponents", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a adăuga stiluri de bază în plugin:\n```js\nplugin(function({ ___ }) { addBase({'*': { boxSizing: 'border-box' }}) })\n```",
        answer: "addBase", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează metoda pentru a adăuga utilities custom în plugin:\n```js\nplugin(function({ ___ }) { addUtilities({'.rotate-15': { transform: 'rotate(15deg)' }}) })\n```",
        answer: "addUtilities", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează câmpul din tailwind.config.js pentru a adăuga plugin-ul:\n```js\nmodule.exports = { ___: [require('./my-plugin')] }\n```",
        answer: "plugins", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu metodele disponibile în API-ul unui plugin Tailwind și afișează câte sunt cu console.log.",
        answer: "const api = ['addBase','addComponents','addUtilities','addVariant','matchComponents','matchUtilities','theme','config','e','prefix','corePlugins'];\nconsole.log(api.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "11"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de plugin-uri Tailwind. Afișează cu console.log câte sunt de la @tailwindcss (scoped).\n```js\nconst plugins = ['@tailwindcss/typography','@tailwindcss/forms','tailwindcss-animate','@tailwindcss/aspect-ratio','daisyui'];\n```",
        answer: "const plugins = ['@tailwindcss/typography','@tailwindcss/forms','tailwindcss-animate','@tailwindcss/aspect-ratio','daisyui'];\nconsole.log(plugins.filter(p => p.startsWith('@tailwindcss/')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log numele complet al pachetului npm pentru 3 plugin-uri oficiale Tailwind: typography, forms, aspect-ratio.",
        answer: "['typography','forms','aspect-ratio'].forEach(p => console.log('@tailwindcss/' + p));",
        starterCode: "", language: "javascript",
        expectedOutput: "@tailwindcss/typography\n@tailwindcss/forms\n@tailwindcss/aspect-ratio"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu 3 utilities custom și afișează cheile (clasele CSS) cu console.log, câte una pe linie.",
        answer: "const utils = { '.text-shadow': { textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }, '.rotate-15': { transform: 'rotate(15deg)' }, '.blur-4': { filter: 'blur(4px)' } };\nObject.keys(utils).forEach(k => console.log(k));",
        starterCode: "", language: "javascript",
        expectedOutput: ".text-shadow\n.rotate-15\n.blur-4"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Verifică dacă array-ul de plugin-uri conține @tailwindcss/typography și afișează true sau false cu console.log.\n```js\nconst plugins = ['@tailwindcss/typography','@tailwindcss/forms','tailwindcss-animate'];\n```",
        answer: "const plugins = ['@tailwindcss/typography','@tailwindcss/forms','tailwindcss-animate'];\nconsole.log(plugins.includes('@tailwindcss/typography'));",
        starterCode: "", language: "javascript",
        expectedOutput: "true"
      }
    ]
  },
  {
    lessonId: "6a08d00d999573855635d001",
    name: "28. Dark Mode Avansat în Tailwind",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea pentru darkMode bazat pe clasa HTML:\n```js\nmodule.exports = { darkMode: '___' }\n```",
        answer: "class", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează valoarea pentru darkMode bazat pe preferința sistemului:\n```js\nmodule.exports = { darkMode: '___' }\n```",
        answer: "media", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa care trebuie adăugată pe <html> pentru dark mode activ cu strategie 'class':\n```html\n<html class=\"___\">\n```",
        answer: "dark", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează media query pentru detectarea preferinței de dark mode:\n```js\nwindow.matchMedia('(prefers-color-scheme: ___)')\n```",
        answer: "dark", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează metoda localStorage pentru a salva tema:\n```js\nlocalStorage.setItem('theme', '___')\n```",
        answer: "dark", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Simulează toggle dark mode: dacă tema curentă este 'light' schimb-o în 'dark' și afișeaz-o cu console.log; altfel afișează 'light'.",
        answer: "let theme = 'light';\ntheme = theme === 'light' ? 'dark' : 'light';\nconsole.log(theme);",
        starterCode: "", language: "javascript",
        expectedOutput: "dark"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase cu versiuni dark. Afișează cu console.log câte clase au varianta dark: (sunt prefixate cu 'dark:').\n```js\nconst cls = ['bg-white','dark:bg-gray-900','text-gray-900','dark:text-gray-100','border','dark:border-gray-700','p-4','dark:shadow-none'];\n```",
        answer: "const cls = ['bg-white','dark:bg-gray-900','text-gray-900','dark:text-gray-100','border','dark:border-gray-700','p-4','dark:shadow-none'];\nconsole.log(cls.filter(c => c.startsWith('dark:')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele pentru un body cu dark mode complet (bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300).",
        answer: "console.log('bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300');",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log cele două strategii posibile de dark mode în Tailwind (class și media), câte una pe linie.",
        answer: "['class','media'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "class\nmedia"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Simulează salvarea preferinței de temă: creează un obiect cu cheile 'theme' și 'system' și afișează valoarea cheii 'theme' cu console.log.\n```js\nconst prefs = { theme: 'dark', system: false };\n```",
        answer: "const prefs = { theme: 'dark', system: false };\nconsole.log(prefs.theme);",
        starterCode: "", language: "javascript",
        expectedOutput: "dark"
      }
    ]
  },
  {
    lessonId: "6a08d010999573855635d015",
    name: "29. Animatii Avansate cu Tailwind",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru animație bounce:\n```html\n<div class=\"animate-___\">Bounce</div>\n```",
        answer: "bounce", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru animație de rotație continuă:\n```html\n<div class=\"animate-___\">Spinner</div>\n```",
        answer: "spin", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează directiva CSS pentru keyframes custom în Tailwind config:\n```js\nmodule.exports = { theme: { extend: { ___: { wiggle: { '0%, 100%': { transform: 'rotate(-3deg)' } } } } } }\n```",
        answer: "keyframes", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru tranziție pe toate proprietățile:\n```html\n<div class=\"transition-___\">Element</div>\n```",
        answer: "all", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru durată de tranziție 300ms:\n```html\n<div class=\"transition duration-___\">Element</div>\n```",
        answer: "300", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu animațiile built-in Tailwind (bounce, spin, ping, pulse, none) și afișează-le cu prefix 'animate-' cu console.log, câte una pe linie.",
        answer: "['bounce','spin','ping','pulse','none'].forEach(a => console.log('animate-' + a));",
        starterCode: "", language: "javascript",
        expectedOutput: "animate-bounce\nanimate-spin\nanimate-ping\nanimate-pulse\nanimate-none"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase de animație. Afișează cu console.log câte sunt animate- (built-in).\n```js\nconst cls = ['animate-bounce','transition-all','animate-spin','duration-300','animate-pulse','ease-in-out','animate-ping'];\n```",
        answer: "const cls = ['animate-bounce','transition-all','animate-spin','duration-300','animate-pulse','ease-in-out','animate-ping'];\nconsole.log(cls.filter(c => c.startsWith('animate-')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele pentru un buton cu tranziție (transition-all, duration-200, ease-in-out, hover:scale-105).",
        answer: "console.log('transition-all duration-200 ease-in-out hover:scale-105');",
        starterCode: "", language: "javascript",
        expectedOutput: "transition-all duration-200 ease-in-out hover:scale-105"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log duratele de tranziție Tailwind (75, 100, 150, 200, 300, 500, 700, 1000) ca clase duration-, câte una pe linie.",
        answer: "[75,100,150,200,300,500,700,1000].forEach(d => console.log('duration-' + d));",
        starterCode: "", language: "javascript",
        expectedOutput: "duration-75\nduration-100\nduration-150\nduration-200\nduration-300\nduration-500\nduration-700\nduration-1000"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log funcțiile de ease Tailwind: ease-linear, ease-in, ease-out, ease-in-out, câte una pe linie.",
        answer: "['ease-linear','ease-in','ease-out','ease-in-out'].forEach(e => console.log(e));",
        starterCode: "", language: "javascript",
        expectedOutput: "ease-linear\nease-in\nease-out\nease-in-out"
      }
    ]
  },
  {
    lessonId: "6a08d013999573855635d029",
    name: "30. Mini Proiect Tailwind — SaaS Dashboard",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru tabel responsive cu scroll orizontal:\n```html\n<div class=\"overflow-x-___\"><table>...</table></div>\n```",
        answer: "auto", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru header de tabel cu fundal gri:\n```html\n<thead class=\"bg-gray-___\">Header</thead>\n```",
        answer: "50", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru layout dashboard cu sidebar și conținut:\n```html\n<div class=\"flex h-___\">Dashboard</div>\n```",
        answer: "screen", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru badge de status verde:\n```html\n<span class=\"bg-green-100 text-green-___ rounded-full px-2 py-1\">Active</span>\n```",
        answer: "800", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru card de metrică cu bordură stânga colorată:\n```html\n<div class=\"border-l-4 border-l-blue-___\">Metric</div>\n```",
        answer: "500", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu 4 metrici SaaS (name, value, change) și afișează cu console.log fiecare în format 'name: value (change)', câte una pe linie.",
        answer: "const metrics = [{name:'MRR',value:'$12,400',change:'+8%'},{name:'Churn',value:'2.1%',change:'-0.3%'},{name:'NPS',value:'72',change:'+5'},{name:'DAU',value:'3,847',change:'+12%'}];\nmetrics.forEach(m => console.log(`${m.name}: ${m.value} (${m.change})`));",
        starterCode: "", language: "javascript",
        expectedOutput: "MRR: $12,400 (+8%)\nChurn: 2.1% (-0.3%)\nNPS: 72 (+5)\nDAU: 3,847 (+12%)"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de rânduri de tabel. Afișează cu console.log câte rânduri au statusul 'active'.\n```js\nconst rows = [{status:'active'},{status:'pending'},{status:'active'},{status:'inactive'},{status:'active'}];\n```",
        answer: "const rows = [{status:'active'},{status:'pending'},{status:'active'},{status:'inactive'},{status:'active'}];\nconsole.log(rows.filter(r => r.status === 'active').length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele pentru un badge de status activ (bg-green-100, text-green-800, rounded-full, px-3, py-1, text-xs, font-medium).",
        answer: "console.log('bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium');",
        starterCode: "", language: "javascript",
        expectedOutput: "bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele pentru rânduri de tabel alternate (even:bg-gray-50, odd:bg-white), câte una pe linie.",
        answer: "['even:bg-gray-50','odd:bg-white'].forEach(c => console.log(c));",
        starterCode: "", language: "javascript",
        expectedOutput: "even:bg-gray-50\nodd:bg-white"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu clasele pentru componentele unui tabel de date și afișează numărul de componente cu console.log.",
        answer: "const table = { wrapper: 'overflow-x-auto', table: 'w-full text-sm', thead: 'bg-gray-50 text-gray-700', tbody: 'divide-y divide-gray-200', row: 'hover:bg-gray-50 transition-colors' };\nconsole.log(Object.keys(table).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      }
    ]
  },
  {
    lessonId: "6a09bad2855b60bc2da6e016",
    name: "31. Tailwind CSS v4 — Noile funcții",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa de import CSS-first în Tailwind v4:\n```css\n@___ 'tailwindcss';\n```",
        answer: "import", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează directiva pentru theme în CSS-first config v4:\n```css\n@___ { --color-primary: #3b82f6; }\n```",
        answer: "theme", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează motorul de compilare nou în Tailwind v4:\n```\nnpm install tailwindcss @tailwindcss/___\n```",
        answer: "vite", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează plugin-ul Vite pentru Tailwind v4:\n```js\nimport tailwindcss from '@tailwindcss/___'\n```",
        answer: "vite", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează sintaxa pentru utility custom în v4:\n```css\n@___ .rotate-15 {\n  transform: rotate(15deg);\n}\n```",
        answer: "utility", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu noile funcții Tailwind v4 (css-first-config, lightning-css, vite-plugin, zero-config, container-queries) și afișează câte sunt cu console.log.",
        answer: "const features = ['css-first-config','lightning-css','vite-plugin','zero-config','container-queries'];\nconsole.log(features.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "5"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array cu schimbările majore din v3 la v4. Afișează cu console.log câte schimbări implică CSS (conțin cuvântul 'css').\n```js\nconst changes = ['css-first-config','js-config-removed','lightning-css','@import-syntax','vite-plugin','postcss-optional'];\n```",
        answer: "const changes = ['css-first-config','js-config-removed','lightning-css','@import-syntax','vite-plugin','postcss-optional'];\nconsole.log(changes.filter(c => c.includes('css')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log conținutul unui fișier CSS minim pentru Tailwind v4 (format: '@import tailwindcss;').",
        answer: "console.log('@import tailwindcss;');",
        starterCode: "", language: "javascript",
        expectedOutput: "@import tailwindcss;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log variabilele CSS de culoare generate de Tailwind v4 pentru blue-500, blue-600, blue-700, câte una pe linie.",
        answer: "['blue-500','blue-600','blue-700'].forEach(c => console.log('--color-' + c));",
        starterCode: "", language: "javascript",
        expectedOutput: "--color-blue-500\n--color-blue-600\n--color-blue-700"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect comparând v3 vs v4 și afișează cu console.log în format 'feature: v3 -> v4' pentru fiecare pereche, câte una pe linie.",
        answer: "const compare = { config: 'tailwind.config.js -> @theme{}', install: 'postcss-required -> vite-plugin', import: '@tailwind base -> @import tailwindcss' };\nObject.entries(compare).forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "config: tailwind.config.js -> @theme{}\ninstall: postcss-required -> vite-plugin\nimport: @tailwind base -> @import tailwindcss"
      }
    ]
  },
  {
    lessonId: "6a09bad5855b60bc2da6e02a",
    name: "32. shadcn/ui si Radix UI",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează comanda npx pentru a adăuga o componentă shadcn:\n```\nnpx shadcn-ui ___ button\n```",
        answer: "add", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează funcția utilitară pentru combinarea claselor în shadcn:\n```js\nimport { ___ } from '@/lib/utils'\n```",
        answer: "cn", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează pachetul npm de bază pentru Radix UI primitives:\n```\nnpm install @radix-ui/react-___\n```",
        answer: "dialog", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează librăria pe care se bazează cn() din shadcn:\n```js\nimport { clsx } from 'clsx';\nimport { twMerge } from '___';\n```",
        answer: "tailwind-merge", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează directorul unde shadcn copiază componentele:\n```\n/___/ui/button.tsx\n```",
        answer: "components", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu componentele shadcn cele mai comune (button, input, card, dialog, dropdown-menu, badge, avatar) și afișează câte sunt cu console.log.",
        answer: "const components = ['button','input','card','dialog','dropdown-menu','badge','avatar'];\nconsole.log(components.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "7"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează funcția cn() care concatenează clase și elimină duplicate. Afișează cu console.log rezultatul pentru ['px-4 py-2', 'bg-blue-500', 'px-4'].\n```js\nconst cn = (...args) => [...new Set(args.join(' ').split(' '))].join(' ');\n```",
        answer: "const cn = (...args) => [...new Set(args.join(' ').split(' '))].join(' ');\nconsole.log(cn('px-4 py-2', 'bg-blue-500', 'px-4'));",
        starterCode: "", language: "javascript",
        expectedOutput: "px-4 py-2 bg-blue-500"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log comanda npx pentru a inițializa shadcn în Next.js.",
        answer: "console.log('npx shadcn-ui@latest init');",
        starterCode: "", language: "javascript",
        expectedOutput: "npx shadcn-ui@latest init"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log comenzile npx pentru a adăuga 4 componente shadcn (button, card, dialog, input), câte una pe linie.",
        answer: "['button','card','dialog','input'].forEach(c => console.log('npx shadcn-ui add ' + c));",
        starterCode: "", language: "javascript",
        expectedOutput: "npx shadcn-ui add button\nnpx shadcn-ui add card\nnpx shadcn-ui add dialog\nnpx shadcn-ui add input"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu pachete Radix UI necesare pentru 3 componente și afișează numărul de pachete cu console.log.",
        answer: "const radix = { dialog: '@radix-ui/react-dialog', dropdown: '@radix-ui/react-dropdown-menu', tooltip: '@radix-ui/react-tooltip' };\nconsole.log(Object.keys(radix).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a09bad7855b60bc2da6e03e",
    name: "33. Animatii avansate cu Tailwind",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru tranziție pe toate proprietățile:\n```html\n<div class=\"transition-___\">Element</div>\n```",
        answer: "all", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru durată de 300ms:\n```html\n<div class=\"transition duration-___\">Element</div>\n```",
        answer: "300", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru timing function ease-in-out:\n```html\n<div class=\"transition ease-___-out\">Element</div>\n```",
        answer: "in", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru scalare la 110% la hover:\n```html\n<div class=\"hover:scale-___\">Zoom</div>\n```",
        answer: "110", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează clasa pentru translație pe axa Y la -4 la hover:\n```html\n<div class=\"hover:-translate-y-___\">Up</div>\n```",
        answer: "4", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu proprietățile care pot fi animate cu transition în Tailwind (none, all, colors, opacity, shadow, transform) și afișează câte sunt cu console.log.",
        answer: "const props = ['transition-none','transition-all','transition-colors','transition-opacity','transition-shadow','transition-transform'];\nconsole.log(props.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de clase de animație. Filtrează clasele hover: care includ transform (scale, translate, rotate) și afișează câte sunt cu console.log.\n```js\nconst cls = ['hover:scale-110','hover:bg-blue-700','hover:-translate-y-2','hover:rotate-6','hover:opacity-90','hover:shadow-xl'];\n```",
        answer: "const cls = ['hover:scale-110','hover:bg-blue-700','hover:-translate-y-2','hover:rotate-6','hover:opacity-90','hover:shadow-xl'];\nconst transforms = cls.filter(c => c.includes('scale') || c.includes('translate') || c.includes('rotate'));\nconsole.log(transforms.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log clasele complete pentru un card animat (transition-all, duration-300, ease-in-out, hover:-translate-y-2, hover:shadow-xl).",
        answer: "console.log('transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl');",
        starterCode: "", language: "javascript",
        expectedOutput: "transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Generează și afișează cu console.log clasele scale de la 50 la 150 în pași de 25 (scale-50, scale-75, scale-100, scale-125, scale-150), câte una pe linie.",
        answer: "[50,75,100,125,150].forEach(s => console.log('scale-' + s));",
        starterCode: "", language: "javascript",
        expectedOutput: "scale-50\nscale-75\nscale-100\nscale-125\nscale-150"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu 3 animații de intrare (fadeIn, slideUp, zoomIn) cu clasele lor și afișează numărul de animații cu console.log.",
        answer: "const animations = { fadeIn: 'opacity-0 animate-fadeIn', slideUp: 'translate-y-4 animate-slideUp', zoomIn: 'scale-95 animate-zoomIn' };\nconsole.log(Object.keys(animations).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      }
    ]
  },
  {
    lessonId: "6a09bada855b60bc2da6e052",
    name: "34. Performance si optimizare Tailwind",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează modul JIT în configurare Tailwind v3:\n```js\nmodule.exports = { mode: '___' }\n```",
        answer: "jit", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează câmpul pentru a specifica fișierele scanate de Tailwind:\n```js\nmodule.exports = { ___: ['./src/**/*.{js,jsx}'] }\n```",
        answer: "content", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează comanda CLI Tailwind pentru a construi CSS-ul optimizat:\n```\nnpx tailwindcss -i input.css -o output.css ___\n```",
        answer: "--minify", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează flag-ul CLI pentru watch mode Tailwind:\n```\nnpx tailwindcss -i input.css -o output.css ___\n```",
        answer: "--watch", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează strategia de purge în Tailwind v2 (înlocuită cu 'content' în v3):\n```js\nmodule.exports = { ___: ['./src/**/*.html'] }\n```",
        answer: "purge", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu tehnicile de optimizare Tailwind (jit-mode, content-config, minification, purging, caching, cdn) și afișează câte sunt cu console.log.",
        answer: "const techs = ['jit-mode','content-config','minification','purging','caching','cdn'];\nconsole.log(techs.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "6"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Simulează calculul dimensiunii bundle: ai 1500 clase generate, fiecare ~20 bytes. Fără purge = 1500*20, cu purge = 150 clase * 20 bytes. Afișează reducerea procentuală cu console.log.",
        answer: "const total = 1500 * 20;\nconst purged = 150 * 20;\nconst reduction = Math.round((1 - purged/total) * 100);\nconsole.log(reduction);",
        starterCode: "", language: "javascript",
        expectedOutput: "90"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log configurația content paths pentru un proiect Next.js (./pages/**/*.{js,jsx,ts,tsx}, ./components/**/*.{js,jsx,ts,tsx}, ./app/**/*.{js,jsx,ts,tsx}), câte una pe linie.",
        answer: "['./pages/**/*.{js,jsx,ts,tsx}','./components/**/*.{js,jsx,ts,tsx}','./app/**/*.{js,jsx,ts,tsx}'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "./pages/**/*.{js,jsx,ts,tsx}\n./components/**/*.{js,jsx,ts,tsx}\n./app/**/*.{js,jsx,ts,tsx}"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log ordinea corectă a pașilor pentru build optimizat Tailwind: scan-files, generate-css, purge-unused, minify, output, câte una pe linie.",
        answer: "['scan-files','generate-css','purge-unused','minify','output'].forEach(s => console.log(s));",
        starterCode: "", language: "javascript",
        expectedOutput: "scan-files\ngenerate-css\npurge-unused\nminify\noutput"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu statisticile unui build Tailwind optimizat și afișează cu console.log în format 'key: value', câte una pe linie.",
        answer: "const stats = { 'classes-before': 15000, 'classes-after': 180, 'size-before': '3.8MB', 'size-after': '12KB' };\nObject.entries(stats).forEach(([k,v]) => console.log(`${k}: ${v}`));",
        starterCode: "", language: "javascript",
        expectedOutput: "classes-before: 15000\nclasses-after: 180\nsize-before: 3.8MB\nsize-after: 12KB"
      }
    ]
  },
  {
    lessonId: "6a09badc855b60bc2da6e066",
    name: "35. Tailwind in Next.js — Proiect complet",
    tasks: [
      {
        number: 6, type: "fillblank", difficulty: "medium",
        question: "Completează fișierul de configurare Tailwind specific Next.js:\n```js\n// ___.config.js\nmodule.exports = { content: ['./app/**/*', './components/**/*'] }\n```",
        answer: "tailwind", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 7, type: "fillblank", difficulty: "medium",
        question: "Completează importul global CSS în Next.js (fișierul cu directivele @tailwind):\n```js\n// app/layout.js\nimport './___'\n```",
        answer: "globals.css", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 8, type: "fillblank", difficulty: "medium",
        question: "Completează câmpul content pentru a scana directorul app în Next.js:\n```js\ncontent: ['./___ /**/*.{js,jsx,ts,tsx}']\n```",
        answer: "app", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 9, type: "fillblank", difficulty: "medium",
        question: "Completează strategia darkMode recomandat în Next.js cu next-themes:\n```js\ndarkMode: '___'\n```",
        answer: "class", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 10, type: "fillblank", difficulty: "medium",
        question: "Completează pachetul pentru theme switching în Next.js cu Tailwind dark mode:\n```\nnpm install ___-themes\n```",
        answer: "next", starterCode: "", language: "javascript", expectedOutput: ""
      },
      {
        number: 11, type: "coding", difficulty: "medium",
        question: "Creează un array cu fișierele care trebuie incluse în content path pentru un proiect Next.js complet și afișează câte sunt cu console.log.",
        answer: "const paths = ['./app/**/*.{js,jsx,ts,tsx}','./pages/**/*.{js,jsx,ts,tsx}','./components/**/*.{js,jsx,ts,tsx}','./lib/**/*.{js,jsx,ts,tsx}'];\nconsole.log(paths.length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      },
      {
        number: 12, type: "coding", difficulty: "medium",
        question: "Ai un array de componente Next.js cu clasele lor Tailwind. Afișează cu console.log câte folosesc dark mode (conțin 'dark:').\n```js\nconst comps = ['bg-white dark:bg-gray-900','flex items-center','p-4 dark:text-white','rounded-xl','shadow-md dark:shadow-none'];\n```",
        answer: "const comps = ['bg-white dark:bg-gray-900','flex items-center','p-4 dark:text-white','rounded-xl','shadow-md dark:shadow-none'];\nconsole.log(comps.filter(c => c.includes('dark:')).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "3"
      },
      {
        number: 13, type: "coding", difficulty: "medium",
        question: "Construiește și afișează cu console.log conținutul minim al fișierului globals.css pentru Tailwind în Next.js (3 directive @tailwind), câte una pe linie.",
        answer: "['@tailwind base;','@tailwind components;','@tailwind utilities;'].forEach(d => console.log(d));",
        starterCode: "", language: "javascript",
        expectedOutput: "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
      },
      {
        number: 14, type: "coding", difficulty: "medium",
        question: "Afișează cu console.log pachetele necesare pentru Tailwind în Next.js (tailwindcss, postcss, autoprefixer), câte unul pe linie.",
        answer: "['tailwindcss','postcss','autoprefixer'].forEach(p => console.log(p));",
        starterCode: "", language: "javascript",
        expectedOutput: "tailwindcss\npostcss\nautoprefixer"
      },
      {
        number: 15, type: "coding", difficulty: "medium",
        question: "Construiește un obiect cu configurația completă Tailwind pentru Next.js și afișează numărul de chei cu console.log.",
        answer: "const config = { content: ['./app/**/*','./components/**/*'], theme: { extend: {} }, plugins: [], darkMode: 'class' };\nconsole.log(Object.keys(config).length);",
        starterCode: "", language: "javascript",
        expectedOutput: "4"
      }
    ]
  }
];

async function main() {
  for (const fix of FIXES) {
    const del = await prisma.task.deleteMany({
      where: { lessonId: fix.lessonId, number: { gte: 6 } }
    });
    await prisma.task.createMany({
      data: fix.tasks.map(t => ({ ...t, lessonId: fix.lessonId }))
    });
    console.log(`✓ ${fix.name} — deleted ${del.count}, created ${fix.tasks.length}`);
  }
  console.log("Done.");
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
