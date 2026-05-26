const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function up(lessonContains, titleContains, content) {
  const lessons = await p.lesson.findMany({ where: { module: { slug: 'tailwind' }, title: { contains: lessonContains } } });
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: titleContains } } });
  if (!theory) { console.log(`NOT FOUND: ${lessonContains} / ${titleContains}`); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
}

async function run() {

await up('13. Typography plugin', 'Instalare', `**Instalarea și utilizarea @tailwindcss/typography** transformă conținut HTML simplu (Markdown rendered, CMS content, blog posts) în text frumos formatat cu o singură clasă: \`prose\`.

**Instalare**

\`\`\`bash
npm install -D @tailwindcss/typography
\`\`\`

\`\`\`js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
\`\`\`

**Utilizare de bază**

\`\`\`html
<!-- Aplică clasa prose pe containerul conținutului -->
<article class="prose lg:prose-xl mx-auto">
  <h1>Titlu articol</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

  <h2>Subtitlu</h2>
  <p>Mai mult text. <strong>Bold</strong> și <em>italic</em>.</p>

  <ul>
    <li>Item lista</li>
    <li>Alt item</li>
  </ul>

  <blockquote>O citat important</blockquote>

  <pre><code>const x = 42;</code></pre>
</article>
\`\`\`

**Mărimi disponibile**

\`\`\`html
<article class="prose prose-sm">    Tipografie mai mică  </article>
<article class="prose">              Default              </article>
<article class="prose prose-lg">     Mai mare             </article>
<article class="prose prose-xl">     Și mai mare          </article>
<article class="prose prose-2xl">    Foarte mare          </article>

<!-- Responsive — crește pe ecran mare -->
<article class="prose md:prose-lg lg:prose-xl mx-auto">
  Conținut adaptat la viewport
</article>
\`\`\`

**Dark mode**

\`\`\`html
<!-- prose-invert pentru dark mode -->
<article class="prose dark:prose-invert">
  Text automat adaptat pentru fundal închis
</article>

<!-- Cu max-width controlled -->
<article class="prose dark:prose-invert max-w-3xl mx-auto px-4">
  Articol blog modern, lizibil
</article>
\`\`\`

**Cu CMS sau Markdown renderer**

\`\`\`jsx
// React cu react-markdown
import ReactMarkdown from 'react-markdown';

function BlogPost({ content }) {
  return (
    <article className="prose lg:prose-lg dark:prose-invert mx-auto">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
\`\`\`

\`\`\`jsx
// Next.js cu MDX
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPage({ source }) {
  return (
    <article className="prose dark:prose-invert mx-auto px-4">
      <MDXRemote source={source} />
    </article>
  );
}
\`\`\`

**Container cu prose + alte tweak-uri**

\`\`\`html
<article class="prose prose-slate dark:prose-invert
                prose-headings:font-display
                prose-h1:text-4xl
                prose-a:text-indigo-600
                prose-code:bg-slate-100
                prose-pre:bg-slate-900
                mx-auto max-w-prose">
  <!-- Pasezi conținut markdown / CMS aici -->
</article>
\`\`\`

• **prose** este DOAR pentru conținut HTML "vanilla" (h1-h6, p, ul, etc.) — nu pentru componente custom
• Aplică pe **containerul exterior** — copiii moștenesc stilurile automat
• **max-w-prose** (65ch) este lățimea optimă pentru lectură — combinat cu prose dă cel mai bun rezultat`);

await up('13. Typography plugin', 'Variante', `**Variante și personalizare @tailwindcss/typography** îți permit să ajustezi orice element (titluri, link-uri, cod, listă) la stilul brandului — fără a scrie CSS custom.

**Variante de culoare**

\`\`\`html
<article class="prose prose-slate">Default (slate)</article>
<article class="prose prose-gray">Gray</article>
<article class="prose prose-zinc">Zinc</article>
<article class="prose prose-neutral">Neutral</article>
<article class="prose prose-stone">Stone</article>

<!-- Combinație cu dark mode -->
<article class="prose prose-slate dark:prose-invert">
  Lumina: slate; Întuneric: invertit
</article>
\`\`\`

**Customizare per element**

\`\`\`html
<!-- prose-{element}:{utility} — modifică un element specific -->
<article class="prose
                prose-headings:font-bold
                prose-headings:text-slate-900
                prose-h1:text-5xl
                prose-h2:text-3xl
                prose-h2:mt-12
                prose-p:leading-relaxed
                prose-a:text-indigo-600
                prose-a:no-underline
                prose-a:hover:underline
                prose-strong:text-slate-900
                prose-code:bg-slate-100
                prose-code:px-1
                prose-code:rounded
                prose-code:before:content-none
                prose-code:after:content-none
                prose-pre:bg-slate-900
                prose-pre:text-slate-100
                prose-blockquote:border-indigo-500
                prose-blockquote:bg-indigo-50
                prose-img:rounded-2xl
                prose-img:shadow-lg">
  Conținut articol
</article>
\`\`\`

**Configurare globală în tailwind.config.js**

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#334155',
            a: {
              color: '#4f46e5',
              fontWeight: '600',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            'h1, h2, h3, h4': {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '800',
              letterSpacing: '-0.025em',
            },
            code: {
              backgroundColor: '#f1f5f9',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
            },
            blockquote: {
              borderLeftColor: '#6366f1',
              backgroundColor: '#eef2ff',
              padding: '0.5rem 1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
          },
        },
        // Variante custom
        brand: {
          css: {
            '--tw-prose-headings': '#7c3aed',
            '--tw-prose-links': '#a855f7',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
\`\`\`

\`\`\`html
<!-- Folosește varianta custom -->
<article class="prose prose-brand">Conținut cu brand colors</article>
\`\`\`

**Pattern pentru blog real**

\`\`\`jsx
// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-12">
      <article className="prose prose-lg lg:prose-xl
                          prose-slate dark:prose-invert
                          prose-headings:font-display
                          prose-a:text-indigo-600 hover:prose-a:text-indigo-700
                          prose-img:rounded-2xl prose-img:shadow-2xl
                          prose-pre:bg-slate-900 prose-pre:rounded-2xl
                          mx-auto max-w-3xl px-4">
        <h1>Titlu articol</h1>
        <p className="lead">Lead paragraf cu stilare specială</p>
        {/* MDX sau Markdown content */}
      </article>
    </main>
  );
}
\`\`\`

**Variante răspunzătoare**

\`\`\`html
<!-- Schimbă culoarea la dark mode -->
<article class="prose prose-slate dark:prose-invert
                prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                prose-headings:text-slate-900 dark:prose-headings:text-white">
  Conținut adaptiv complet
</article>
\`\`\`

• **prose-{element}:{class}** pattern (Tailwind 3+) pentru customizare granulară fără CSS
• Configurarea **typography** în tailwind.config.js pentru personalizare permanentă
• **prose-invert** automat în dark mode; combinat cu **dark:prose-invert** sintactic perfect`);

await up('14. Forms plugin', '@tailwindcss/forms', `**@tailwindcss/forms** este plugin-ul oficial Tailwind pentru a oferi stiluri de bază consistente pentru input, select, textarea, checkbox și radio — eliminând stilurile native ale browserului.

**Instalare**

\`\`\`bash
npm install -D @tailwindcss/forms
\`\`\`

\`\`\`js
// tailwind.config.js
module.exports = {
  plugins: [require('@tailwindcss/forms')],
}
\`\`\`

**Două strategii: base sau class**

\`\`\`js
// Strategy 'base' (default) — aplică automat la toate input-urile
require('@tailwindcss/forms')

// Strategy 'class' — aplică doar la elementele cu clasa .form-input, .form-select etc.
require('@tailwindcss/forms')({ strategy: 'class' })
\`\`\`

**Cu strategia 'base' (recomandată pentru proiecte noi)**

\`\`\`html
<!-- Input-urile capătă stiluri uniforme automat -->
<input type="text" class="w-full">
<input type="email" class="w-full">
<select class="w-full">
  <option>Opțiune 1</option>
  <option>Opțiune 2</option>
</select>
<textarea class="w-full" rows="4"></textarea>
<input type="checkbox" class="w-4 h-4">
<input type="radio" class="w-4 h-4">

<!-- Stiluri unitare cross-browser, fără mai e nevoie de reset CSS -->
\`\`\`

**Customizare pe inputs cu Tailwind utilities**

\`\`\`html
<!-- Input modern, focus state -->
<input
  type="text"
  placeholder="Numele tău"
  class="w-full px-4 py-3 rounded-lg
         border-2 border-slate-200
         bg-white text-slate-900
         placeholder:text-slate-400
         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
         focus:outline-none
         dark:bg-slate-800 dark:border-slate-700 dark:text-white
         transition-colors">

<!-- Select stilizat -->
<select class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
               focus:outline-none">
  <option>-- Alege o opțiune --</option>
  <option>Opțiune 1</option>
</select>

<!-- Textarea -->
<textarea
  rows="4"
  placeholder="Mesajul tău..."
  class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
         focus:outline-none resize-y min-h-[120px]"></textarea>
\`\`\`

**Checkbox și radio modernizat**

\`\`\`html
<!-- Checkbox cu accent color -->
<label class="flex items-center gap-2 cursor-pointer">
  <input type="checkbox"
    class="w-5 h-5 rounded text-indigo-600
           focus:ring-2 focus:ring-indigo-500/30
           border-slate-300">
  <span class="text-slate-700">Sunt de acord cu termenii</span>
</label>

<!-- Radio group -->
<fieldset class="space-y-2">
  <legend class="text-sm font-medium text-slate-700 mb-2">Plan</legend>

  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="plan" value="free"
      class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
    <span>Free</span>
  </label>

  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="plan" value="pro" checked
      class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
    <span>Pro — 9.99/lună</span>
  </label>
</fieldset>
\`\`\`

**File input customizat**

\`\`\`html
<input type="file"
  class="block w-full text-sm text-slate-500
         file:mr-4 file:py-2 file:px-4
         file:rounded-full file:border-0
         file:text-sm file:font-bold
         file:bg-indigo-50 file:text-indigo-700
         hover:file:bg-indigo-100
         cursor-pointer">
\`\`\`

**Range slider**

\`\`\`html
<input type="range"
  class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer
         accent-indigo-600">
\`\`\`

**Disabled și read-only**

\`\`\`html
<input
  disabled
  value="Nu pot fi modificat"
  class="w-full px-4 py-2 rounded-lg border-2 border-slate-200
         disabled:bg-slate-100 disabled:text-slate-400
         disabled:cursor-not-allowed">

<input
  readonly
  value="Doar citire"
  class="w-full px-4 py-2 rounded-lg border-2 border-slate-200
         read-only:bg-slate-50 read-only:text-slate-600">
\`\`\`

• **@tailwindcss/forms** elimină inconsistențele cross-browser — bază solidă pentru customizare
• Cu strategia **'base'** nu mai ai nevoie de \`appearance-none\` și alte hack-uri
• **accent-{color}** modifică culoarea nativă a checkbox/radio/range — soluție cea mai simplă`);

await up('14. Forms plugin', 'Pattern formular', `**Pattern pentru formular complet** combină toate elementele Tailwind (input, validare, butoane, layout) într-un formular accesibil, frumos și production-ready.

**Structura HTML semantică**

\`\`\`html
<form class="space-y-6 max-w-md mx-auto bg-white dark:bg-slate-800
             rounded-2xl shadow-xl p-8">
  <div>
    <h2 class="text-2xl font-black text-slate-900 dark:text-white">
      Creează cont
    </h2>
    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
      Începe în 30 de secunde
    </p>
  </div>

  <!-- Field group: label + input + error -->
  <div>
    <label for="email" class="block text-sm font-bold text-slate-700
                              dark:text-slate-300 mb-1.5">
      Email <span class="text-red-500">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="ana@example.com"
      class="w-full px-4 py-3 rounded-xl border-2 border-slate-200
             dark:border-slate-700 dark:bg-slate-700/50 dark:text-white
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
             focus:outline-none text-sm">
    <p class="text-xs text-red-500 mt-1 hidden" id="email-error">
      Email invalid
    </p>
  </div>

  <!-- Password cu toggle visibility -->
  <div>
    <label for="password" class="block text-sm font-bold text-slate-700
                                 dark:text-slate-300 mb-1.5">
      Parolă
    </label>
    <div class="relative">
      <input
        type="password"
        id="password"
        name="password"
        required
        minlength="8"
        class="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-slate-200
               dark:border-slate-700 dark:bg-slate-700/50 dark:text-white
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
               focus:outline-none text-sm">
      <button type="button" aria-label="Arată parola"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400
               hover:text-slate-600 dark:hover:text-slate-200">
        👁️
      </button>
    </div>
    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
      Minim 8 caractere
    </p>
  </div>

  <!-- Select -->
  <div>
    <label for="country" class="block text-sm font-bold text-slate-700
                                dark:text-slate-300 mb-1.5">
      Țară
    </label>
    <select id="country" name="country"
      class="w-full px-4 py-3 rounded-xl border-2 border-slate-200
             dark:border-slate-700 dark:bg-slate-700/50
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
             focus:outline-none text-sm">
      <option value="">Alege țara</option>
      <option value="ro">România</option>
      <option value="md">Republica Moldova</option>
    </select>
  </div>

  <!-- Checkbox terms -->
  <label class="flex items-start gap-2 cursor-pointer">
    <input type="checkbox" required
      class="w-5 h-5 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500
             border-slate-300 dark:border-slate-600">
    <span class="text-sm text-slate-700 dark:text-slate-300">
      Am citit și sunt de acord cu
      <a href="/terms" class="text-indigo-600 hover:underline">Termenii</a>
    </span>
  </label>

  <!-- Submit cu loading state -->
  <button type="submit"
    class="w-full py-3.5 rounded-xl
           bg-gradient-to-r from-indigo-500 to-purple-600
           hover:opacity-90 active:scale-[0.98]
           text-white font-black text-sm
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-all shadow-lg">
    Creează cont
  </button>

  <!-- Footer -->
  <p class="text-center text-sm text-slate-500 dark:text-slate-400">
    Ai deja cont?
    <a href="/login" class="text-indigo-600 hover:underline font-semibold">
      Autentifică-te
    </a>
  </p>
</form>
\`\`\`

**Validare cu :invalid state**

\`\`\`html
<input
  type="email"
  required
  pattern=".+@.+\\..+"
  class="w-full px-4 py-3 rounded-xl border-2 border-slate-200
         invalid:border-red-300 invalid:bg-red-50
         valid:border-emerald-300 valid:bg-emerald-50
         focus:invalid:border-red-500 focus:invalid:ring-red-500/20
         focus:valid:border-emerald-500 focus:valid:ring-emerald-500/20
         focus:outline-none focus:ring-2 transition-colors">
\`\`\`

**Pattern field group reutilizabil (React)**

\`\`\`jsx
function FormField({ label, name, type = "text", error, required, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className={\`w-full px-4 py-3 rounded-xl border-2 \${
          error ? 'border-red-300 bg-red-50' : 'border-slate-200'
        } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm\`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
\`\`\`

• **space-y-6 pe form** pentru spațiere consistentă între field group-uri
• **labels semantice** cu \`htmlFor\` — accesibilitate + click pe label focalizează input
• **:invalid/:valid variants** pentru feedback vizual fără JavaScript`);

await up('15. Animații Tailwind', 'Animații built-in', `**Animații built-in în Tailwind** oferă o suită de animații gata de utilizat pentru cazuri comune — spinner, pulse, bounce, ping — fără a scrie keyframes custom.

**Animații standard**

\`\`\`html
<!-- spin — pentru spinner / loader -->
<svg class="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..."></path>
</svg>

<!-- ping — pulse effect cu fade out (ca un radar) -->
<span class="relative flex h-3 w-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full
               bg-rose-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
</span>

<!-- pulse — fade in/out subtle (pentru skeleton loading) -->
<div class="animate-pulse">
  <div class="h-4 bg-slate-200 rounded w-3/4"></div>
  <div class="h-4 bg-slate-200 rounded mt-2"></div>
  <div class="h-4 bg-slate-200 rounded w-1/2 mt-2"></div>
</div>

<!-- bounce — sare în sus și jos -->
<div class="animate-bounce w-8 h-8 bg-yellow-400 rounded-full"></div>

<!-- none — dezactivează animația (override) -->
<div class="animate-spin md:animate-none">Spin doar pe mobile</div>
\`\`\`

**Tranziții (transitions)**

\`\`\`html
<!-- Toate proprietățile -->
<button class="transition-all duration-300">
  Hover-mă pentru tranziții uniforme
</button>

<!-- Doar anumite proprietăți -->
<div class="transition-colors duration-200">  Doar culori   </div>
<div class="transition-opacity duration-500"> Doar opacity </div>
<div class="transition-transform duration-150">Doar transform</div>
<div class="transition-shadow duration-300">  Doar shadow  </div>

<!-- Durations -->
<div class="transition duration-75">  75ms (foarte rapid) </div>
<div class="transition duration-100"> 100ms              </div>
<div class="transition duration-150"> 150ms (rapid)      </div>
<div class="transition duration-200"> 200ms              </div>
<div class="transition duration-300"> 300ms (mediu)      </div>
<div class="transition duration-500"> 500ms              </div>
<div class="transition duration-700"> 700ms (încet)      </div>
<div class="transition duration-1000">1s (foarte încet)  </div>

<!-- Timing function -->
<div class="transition ease-linear">    Linear        </div>
<div class="transition ease-in">        Ease in       </div>
<div class="transition ease-out">       Ease out      </div>
<div class="transition ease-in-out">    Ease in-out   </div>
<div class="transition ease-[cubic-bezier(0.4,0,0.2,1)]">Custom</div>

<!-- Delay -->
<div class="transition delay-150">  150ms delay </div>
<div class="transition delay-300">  300ms delay </div>
\`\`\`

**Transform combinări**

\`\`\`html
<!-- Scale -->
<button class="hover:scale-110 active:scale-95 transition-transform duration-200">
  Crește la hover, micșorează la click
</button>

<!-- Rotate -->
<svg class="hover:rotate-180 transition-transform duration-500">...</svg>

<!-- Translate -->
<button class="hover:-translate-y-1 hover:shadow-xl transition-all">
  Ridică-te la hover (cu shadow boost)
</button>

<!-- Combinație complexă -->
<div class="hover:scale-105 hover:-translate-y-2 hover:rotate-2
            transition-all duration-300 ease-out cursor-pointer">
  Card cu effect multi-axial
</div>
\`\`\`

**Skeleton loading complet**

\`\`\`html
<!-- Pattern de skeleton pentru card de produs -->
<div class="bg-white rounded-2xl p-4 shadow animate-pulse">
  <div class="bg-slate-200 rounded-xl h-48 mb-4"></div>
  <div class="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
  <div class="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
  <div class="h-8 bg-slate-200 rounded w-24"></div>
</div>

<!-- Lista de skeleton items -->
<div class="space-y-3 animate-pulse">
  <div class="flex gap-3 items-center">
    <div class="w-12 h-12 bg-slate-200 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-slate-200 rounded w-1/3"></div>
      <div class="h-3 bg-slate-200 rounded w-2/3"></div>
    </div>
  </div>
  <!-- ... mai multe rânduri -->
</div>
\`\`\`

**Loader spinner stilizat**

\`\`\`html
<div class="flex items-center justify-center gap-3">
  <svg class="animate-spin h-5 w-5 text-indigo-600" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
    <path class="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
  </svg>
  <span class="text-slate-600">Se încarcă...</span>
</div>
\`\`\`

• **animate-pulse** este perfectă pentru skeleton loading (fără JavaScript)
• **transition-{property} duration-{N}** = baza tranzițiilor — propertyToTransition + duration
• **hover:scale-105** este truc subtle care face UI-ul "viu" — folosit peste tot în design modern`);

await up('15. Animații Tailwind', 'Animații custom', `**Animații custom în Tailwind** îți permit să creezi mișcări specifice brandului — keyframes proprii definite în tailwind.config.js sau direct cu CSS.

**Definire keyframes în tailwind.config.js**

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        // Fade in cu translate
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Shake — pentru erori
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':      { transform: 'translateX(-8px)' },
          '75%':      { transform: 'translateX(8px)' },
        },
        // Float — element care plutește
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        // Slide din dreapta
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        // Pulse colorat
        'pulse-blue': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
          '50%':      { boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' },
        },
        // Wiggle
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':      { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'fade-in-up':    'fade-in-up 0.5s ease-out',
        'shake':         'shake 0.4s ease-in-out',
        'float':         'float 3s ease-in-out infinite',
        'slide-in-right':'slide-in-right 0.3s ease-out',
        'pulse-blue':    'pulse-blue 2s infinite',
        'wiggle':        'wiggle 1s ease-in-out infinite',
      },
    },
  },
}
\`\`\`

**Utilizare**

\`\`\`html
<!-- Aplicare animație custom -->
<div class="animate-fade-in-up">Aper cu fade + translate</div>

<button class="animate-shake bg-red-500 text-white px-4 py-2 rounded">
  Eroare (shake)
</button>

<div class="animate-float w-16 h-16 bg-purple-500 rounded-full">
  Plutesc
</div>

<aside class="animate-slide-in-right">
  Sidebar care intră din dreapta
</aside>

<button class="animate-pulse-blue bg-blue-500 text-white px-4 py-2 rounded-full">
  Notificare (ripple)
</button>
\`\`\`

**Cu CSS direct (Tailwind 3+) folosind valori arbitrare**

\`\`\`html
<!-- Definire inline cu valori arbitrare -->
<div class="animate-[bounce_1s_infinite]">
  Bounce custom timing
</div>

<div class="animate-[spin_3s_linear_infinite]">
  Spin lent
</div>

<!-- Combinat cu transform-uri -->
<div class="hover:[transform:translateX(20px)_rotate(5deg)]
            transition-transform duration-300">
  Hover complex
</div>
\`\`\`

**Stagger animation (cascadă)**

\`\`\`jsx
// React — animații cu delay incremental
{items.map((item, idx) => (
  <div
    key={item.id}
    className="animate-fade-in-up"
    style={{ animationDelay: \`\${idx * 100}ms\` }}
  >
    {item.name}
  </div>
))}

// Sau cu Tailwind delay utilities
<div className="animate-fade-in-up [animation-delay:0ms]">Item 1</div>
<div className="animate-fade-in-up [animation-delay:100ms]">Item 2</div>
<div className="animate-fade-in-up [animation-delay:200ms]">Item 3</div>
\`\`\`

**Toast notification cu animație**

\`\`\`html
<div class="fixed bottom-4 right-4 animate-slide-in-right">
  <div class="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg
              flex items-center gap-2">
    <svg class="w-5 h-5">...</svg>
    <span class="font-semibold">Salvat cu succes!</span>
  </div>
</div>
\`\`\`

**Hover cu group pentru animații complexe**

\`\`\`html
<div class="group cursor-pointer">
  <div class="overflow-hidden rounded-2xl">
    <img class="group-hover:scale-110 transition-transform duration-500"
         src="...">
  </div>
  <h3 class="group-hover:text-indigo-600 transition-colors">
    Titlu (schimbă culoarea când părintele e hover)
  </h3>
  <p class="opacity-0 group-hover:opacity-100 transition-opacity">
    Apar la hover pe card
  </p>
</div>
\`\`\`

**Reduce motion pentru accesibilitate**

\`\`\`html
<!-- motion-safe: animații doar dacă utilizatorul NU a setat prefers-reduced-motion -->
<div class="motion-safe:animate-bounce">
  Sare doar pentru cei care nu au reduce-motion
</div>

<!-- motion-reduce: stiluri DOAR pentru cei cu reduce-motion -->
<div class="animate-spin motion-reduce:animate-none">
  Spin pentru toți, OPRIT pentru reduce-motion
</div>
\`\`\`

• **keyframes + animation** în config — pentru animații reutilizabile cu nume semantic
• **animate-[name_duration_easing_iteration]** = sintaxă inline cu valori arbitrare
• **motion-safe / motion-reduce** = accesibilitate obligatorie pentru animații constante`);

await up('16. Dark Mode', 'Dark mode cu Tailwind', `**Dark mode cu Tailwind** se activează cu strategia 'class' sau 'media' și permite stilizarea oricărui element pentru tema închisă cu prefixul \`dark:\`.

**Activare în tailwind.config.js**

\`\`\`js
// tailwind.config.js
module.exports = {
  // 'class' = Tailwind activează dark: când .dark există pe <html>
  // 'media' = bazat pe prefers-color-scheme al sistemului
  darkMode: 'class',
}
\`\`\`

**Utilizare de bază**

\`\`\`html
<!-- Pe <html> trebuie să fie clasa .dark pentru a activa dark mode -->
<html class="dark">
  <body>
    <!-- Acum toate dark: variants se aplică -->
    <div class="bg-white dark:bg-slate-900">
      Background alb în light, închis în dark
    </div>

    <p class="text-slate-700 dark:text-slate-200">
      Text închis în light, deschis în dark
    </p>

    <button class="bg-indigo-600 hover:bg-indigo-700
                   dark:bg-indigo-500 dark:hover:bg-indigo-600">
      Buton care adaptează nuanța
    </button>
  </body>
</html>
\`\`\`

**Pattern pentru fiecare element**

\`\`\`html
<!-- Backgrounds -->
<body class="bg-white dark:bg-slate-900">
<article class="bg-slate-50 dark:bg-slate-800">
<div class="bg-indigo-100 dark:bg-indigo-900/30">

<!-- Text colors — ierarhie -->
<h1 class="text-slate-900 dark:text-white">Titlu principal</h1>
<p class="text-slate-700 dark:text-slate-300">Body text</p>
<small class="text-slate-500 dark:text-slate-400">Meta info</small>

<!-- Borders -->
<div class="border border-slate-200 dark:border-slate-700">

<!-- Shadows (pot deveni mai vizibile pe fundal închis) -->
<div class="shadow-lg dark:shadow-2xl dark:shadow-slate-900/50">

<!-- Icons -->
<svg class="text-slate-500 dark:text-slate-400">...</svg>
\`\`\`

**Combinație cu hover, focus și alte variants**

\`\`\`html
<!-- dark: + hover: combinate -->
<a class="text-indigo-600 hover:text-indigo-700
          dark:text-indigo-400 dark:hover:text-indigo-300">
  Link care funcționează în ambele teme
</a>

<!-- Input cu states complete -->
<input class="
  bg-white dark:bg-slate-800
  border-slate-200 dark:border-slate-700
  text-slate-900 dark:text-white
  placeholder:text-slate-400 dark:placeholder:text-slate-500
  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
  dark:focus:ring-indigo-500/30
">
\`\`\`

**Componente reutilizabile**

\`\`\`html
<!-- Card adaptiv -->
<article class="bg-white dark:bg-slate-800
                rounded-2xl shadow-md hover:shadow-xl
                border border-slate-200/50 dark:border-slate-700/50
                p-6 transition-shadow">
  <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
    Titlu card
  </h3>
  <p class="text-slate-600 dark:text-slate-300">
    Conținut adaptat automat la temă
  </p>
</article>

<!-- Buton primary cu shadow color -->
<button class="bg-gradient-to-r from-indigo-500 to-purple-600
               hover:from-indigo-600 hover:to-purple-700
               text-white px-6 py-3 rounded-xl font-bold
               shadow-lg shadow-indigo-500/30
               dark:shadow-indigo-500/20
               transition-all">
  Buton CTA
</button>
\`\`\`

**Imagine sau ilustrație diferită per temă**

\`\`\`html
<!-- Două imagini, una vizibilă per temă -->
<img src="/logo-light.svg" class="block dark:hidden" alt="Logo light">
<img src="/logo-dark.svg" class="hidden dark:block" alt="Logo dark">

<!-- Cu next/image (Next.js) -->
<Image src="/logo-light.svg" className="block dark:hidden" alt="" width={120} height={40}/>
<Image src="/logo-dark.svg" className="hidden dark:block" alt="" width={120} height={40}/>
\`\`\`

**Palette pattern recomandat**

\`\`\`
Light mode:                  Dark mode:
─────────────                ────────────
bg:    white / slate-50      slate-900 / slate-950
card:  white                 slate-800
text:  slate-900             white
muted: slate-600             slate-300
border:slate-200             slate-700
accent: indigo-600           indigo-400 (mai deschis pe fundal închis)
\`\`\`

• **dark:** prefix funcționează pe ORICE utility class (bg, text, border, shadow, etc.)
• **Adaugă dark variants în paralel** cu light — \`bg-white dark:bg-slate-900\` într-un singur loc
• **darkMode: 'class'** > 'media' pentru control manual (toggle utilizator preferat)`);

await up('16. Dark Mode', 'Toggle manual', `**Toggle manual pentru dark mode** îți permite utilizatorul să aleagă tema explicit — light, dark sau system — cu persistență în localStorage și fără flash de tema greșită la load.

**Implementare React simplu**

\`\`\`jsx
// components/ThemeToggle.jsx
'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(newTheme) {
    const root = document.documentElement;
    const dark =
      newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }

  function setAndApply(newTheme) {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }

  return (
    <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
      <button onClick={() => setAndApply('light')}
        className={\`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm
          \${theme === 'light' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}\`}>
        <Sun className="w-4 h-4"/> Light
      </button>
      <button onClick={() => setAndApply('dark')}
        className={\`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm
          \${theme === 'dark' ? 'bg-slate-700 text-white' : 'text-slate-500'}\`}>
        <Moon className="w-4 h-4"/> Dark
      </button>
      <button onClick={() => setAndApply('system')}
        className={\`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm
          \${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500'}\`}>
        <Monitor className="w-4 h-4"/> Auto
      </button>
    </div>
  );
}
\`\`\`

**Inline script în layout.js (evită FOUC - Flash Of Unstyled Content)**

\`\`\`jsx
// app/layout.js (Next.js) — script INLINE înainte de hydration
export default function RootLayout({ children }) {
  const themeScript = \`
    (function() {
      try {
        const saved = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dark = saved === 'dark' || (saved === 'system' && systemDark) || (!saved && systemDark);
        if (dark) document.documentElement.classList.add('dark');
      } catch {}
    })();
  \`;

  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

**Cu next-themes (recomandat pentru Next.js)**

\`\`\`bash
npm install next-themes
\`\`\`

\`\`\`jsx
// app/providers.js
'use client';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
\`\`\`

\`\`\`jsx
// app/layout.js
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
\`\`\`

\`\`\`jsx
// Toggle cu next-themes
'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // evită hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800
                 hover:bg-slate-200 dark:hover:bg-slate-700">
      {theme === 'dark' ? <Sun/> : <Moon/>}
    </button>
  );
}
\`\`\`

**Switch animat (UI premium)**

\`\`\`jsx
function ThemeSwitch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={\`relative w-14 h-7 rounded-full transition-colors
        \${checked ? 'bg-indigo-600' : 'bg-slate-300'}\`}>
      <span className={\`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow
        transition-transform duration-300
        \${checked ? 'translate-x-7' : 'translate-x-0'}\`}/>
    </button>
  );
}
\`\`\`

**Tranziție smooth la schimbare temă**

\`\`\`css
/* app/globals.css */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
/* ATENȚIE: poate cauza overhead — folosește cu măsură */
\`\`\`

• **Inline script ÎN HEAD** evită flash de tema greșită (FOUC) — critic pentru UX
• **next-themes** rezolvă majoritatea cazurilor în Next.js — folosește dacă pleci de la zero
• **3 stări** (light/dark/system) > 2 stări — respectă preferința OS-ului`);

await up('17. Flexbox', 'Flex grow, shrink', `**Flex grow, shrink și basis** controlează cum se distribuie spațiul disponibil între elementele flex — esențial pentru layout-uri responsive și controlul precis al dimensiunilor.

**flex-grow — extinderea elementelor**

\`\`\`html
<!-- flex-grow controlează cât din spațiul rămas primește un element -->
<div class="flex gap-4">
  <div class="flex-grow-0 bg-blue-500 p-4">Fix (nu crește)</div>
  <div class="flex-grow bg-green-500 p-4">Cresc 1x</div>
  <div class="flex-grow bg-amber-500 p-4">Cresc 1x</div>
</div>

<!-- Cu valori custom -->
<div class="flex">
  <div class="grow">  flex-grow: 1 (umple tot ce rămâne) </div>
</div>

<!-- Distribuție proporțională -->
<div class="flex gap-2">
  <div class="grow basis-0 bg-blue-500 p-2">1x</div>
  <div class="grow-[2] basis-0 bg-green-500 p-2">2x</div>
  <div class="grow basis-0 bg-amber-500 p-2">1x</div>
  <!-- Verde primește dublu față de albastru și galben -->
</div>
\`\`\`

**flex-shrink — micșorarea elementelor**

\`\`\`html
<!-- shrink-0 = NU se micșorează niciodată (păstrează lățimea inițială) -->
<div class="flex">
  <img class="shrink-0 w-20 h-20 rounded-full" src="...">
  <div class="ml-4">
    <h3>Nume</h3>
    <p>Descriere lungă...</p>
  </div>
</div>

<!-- Default: shrink (toate elementele se micșorează la nevoie) -->
<div class="flex">
  <div class="shrink w-64">Se micșorează</div>
  <div class="shrink-0 w-32">NU se micșorează</div>
</div>

<!-- Pattern util: sidebar fix + main flexibil -->
<div class="flex h-screen">
  <aside class="shrink-0 w-64 bg-slate-100">Sidebar (NU micșorat)</aside>
  <main class="grow overflow-auto">Conținut</main>
</div>
\`\`\`

**flex-basis — dimensiunea inițială**

\`\`\`html
<!-- basis = width/height inițial înainte de grow/shrink -->
<div class="flex">
  <div class="basis-1/4 bg-blue-500">25%</div>
  <div class="basis-1/2 bg-green-500">50%</div>
  <div class="basis-1/4 bg-amber-500">25%</div>
</div>

<!-- Cu valori fixe -->
<div class="flex">
  <div class="basis-64 bg-slate-200">256px</div>
  <div class="basis-auto grow bg-white">Restul (umple)</div>
</div>

<!-- Cu valori arbitrare -->
<div class="flex">
  <div class="basis-[300px] shrink-0">Exact 300px</div>
  <div class="grow">Flex</div>
</div>
\`\`\`

**flex shorthand**

\`\`\`html
<!-- flex-1 = flex: 1 1 0% (grow 1, shrink 1, basis 0) -->
<div class="flex gap-4">
  <div class="flex-1 bg-blue-500 p-4">Egal 1</div>
  <div class="flex-1 bg-green-500 p-4">Egal 2</div>
  <div class="flex-1 bg-amber-500 p-4">Egal 3</div>
  <!-- Toate aceeași lățime, umplu containerul -->
</div>

<!-- flex-auto = flex: 1 1 auto (grow/shrink, basis = conținut) -->
<div class="flex gap-2">
  <button class="flex-auto px-4 py-2 bg-indigo-600 text-white rounded">
    Salvează
  </button>
  <button class="flex-auto px-4 py-2 bg-slate-200 rounded">
    Anulează
  </button>
</div>

<!-- flex-initial = flex: 0 1 auto (shrink only, NU grow) -->
<div class="flex">
  <div class="flex-initial">Conținut natural, se micșorează</div>
</div>

<!-- flex-none = flex: none (nici grow, nici shrink, basis = auto) -->
<div class="flex">
  <div class="flex-none w-32">Lățime fixă 128px</div>
  <div class="flex-1">Restul</div>
</div>
\`\`\`

**Pattern: header cu logo + nav + actions**

\`\`\`html
<header class="flex items-center gap-4 p-4 bg-white shadow-sm">
  <!-- Logo: fix -->
  <a href="/" class="shrink-0 flex items-center gap-2">
    <img src="/logo.png" class="w-8 h-8">
    <span class="font-black">DevZone</span>
  </a>

  <!-- Nav: crește pentru a umple spațiul -->
  <nav class="flex-1 flex justify-center gap-4">
    <a href="/courses">Cursuri</a>
    <a href="/pricing">Prețuri</a>
    <a href="/blog">Blog</a>
  </nav>

  <!-- Actions: fix la dreapta -->
  <div class="shrink-0 flex gap-2">
    <button class="px-4 py-2 text-indigo-600">Login</button>
    <button class="px-4 py-2 bg-indigo-600 text-white rounded">Sign up</button>
  </div>
</header>
\`\`\`

**Pattern: form row inline**

\`\`\`html
<div class="flex gap-2">
  <input type="email" placeholder="Email"
    class="flex-1 px-4 py-2 border rounded-lg">
  <button class="shrink-0 px-6 py-2 bg-indigo-600 text-white rounded-lg">
    Subscribe
  </button>
</div>
\`\`\`

• **flex-1** = trucul cel mai simplu pentru distribuție egală a spațiului
• **shrink-0** = "NU micșora niciodată" — util pentru avatar-uri, butoane fixe, sidebar-uri
• **grow + basis-0** = împarte spațiul total egal (vs grow + basis-auto care păstrează conținutul)`);

await up('17. Flexbox', 'Flex wrap si gap', `**Flex wrap și gap** rezolvă două probleme clasice în flexbox — cum se comportă elementele când nu încap pe un rând și cum controlezi spațiul între ele.

**flex-wrap**

\`\`\`html
<!-- nowrap (default) — totul pe un rând (poate cauza overflow) -->
<div class="flex flex-nowrap">
  <div class="w-48 bg-blue-500">Item 1</div>
  <div class="w-48 bg-green-500">Item 2</div>
  <div class="w-48 bg-amber-500">Item 3</div>
</div>

<!-- wrap — elementele se "rup" pe rânduri noi -->
<div class="flex flex-wrap">
  <div class="w-48 bg-blue-500">1</div>
  <div class="w-48 bg-green-500">2</div>
  <div class="w-48 bg-amber-500">3</div>
  <!-- Pe ecran mic: 1, 2 pe primul rând, 3 pe al doilea -->
</div>

<!-- wrap-reverse — rândurile încep de jos -->
<div class="flex flex-wrap-reverse">
  <div class="w-48">1 (jos)</div>
  <div class="w-48">2</div>
  <div class="w-48">3 (sus)</div>
</div>
\`\`\`

**gap — spațiu între elemente**

\`\`\`html
<!-- gap uniform pe ambele axe -->
<div class="flex flex-wrap gap-4">
  <div class="w-32 bg-blue-500">1</div>
  <div class="w-32 bg-green-500">2</div>
  <div class="w-32 bg-amber-500">3</div>
  <div class="w-32 bg-rose-500">4</div>
  <!-- Spațiu 16px între item-uri, atât orizontal cât și vertical -->
</div>

<!-- gap diferit pe axe -->
<div class="flex flex-wrap gap-x-8 gap-y-4">
  <!-- 32px orizontal, 16px vertical -->
</div>

<!-- gap responsiv -->
<div class="flex flex-wrap gap-2 sm:gap-4 lg:gap-8">
  <!-- crește pe ecrane mai mari -->
</div>
\`\`\`

**Tag cloud cu flex-wrap**

\`\`\`html
<div class="flex flex-wrap gap-2">
  <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
    JavaScript
  </span>
  <span class="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
    React
  </span>
  <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">
    TypeScript
  </span>
  <!-- ... mai multe taguri, se "rup" pe rânduri noi automat -->
</div>
\`\`\`

**Cards responsive cu flex-wrap**

\`\`\`html
<!-- Grid responsive bazat pe flex-wrap (alternativă la CSS Grid) -->
<div class="flex flex-wrap gap-4">
  <div class="flex-1 basis-64 bg-white rounded-2xl p-4 shadow">
    Card 1 — min 256px, crește dacă spațiu
  </div>
  <div class="flex-1 basis-64 bg-white rounded-2xl p-4 shadow">
    Card 2
  </div>
  <div class="flex-1 basis-64 bg-white rounded-2xl p-4 shadow">
    Card 3
  </div>
</div>
<!-- Pe ecran lat: 3 coloane. Pe ecran mic: 1-2 coloane (basis-64 forțează wrap) -->
\`\`\`

**Alignment cu flex-wrap**

\`\`\`html
<!-- align-content controlează spațierea ÎNTRE rânduri (doar la flex-wrap) -->
<div class="flex flex-wrap content-start h-64">  Start </div>
<div class="flex flex-wrap content-center h-64"> Centru </div>
<div class="flex flex-wrap content-end h-64">    End </div>
<div class="flex flex-wrap content-between h-64"> Distribuit cu spațiu </div>
<div class="flex flex-wrap content-around h-64">  Cu spațiu egal în jur </div>
<div class="flex flex-wrap content-evenly h-64">  Spațiu egal peste tot </div>
\`\`\`

**Pattern: gallery responsive**

\`\`\`html
<div class="flex flex-wrap gap-3">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <img src="..." class="w-32 h-32 object-cover rounded-lg">
  <!-- Se aliniază automat în rânduri cu gap consistent -->
</div>

<!-- Variantă cu aspect ratio garantat -->
<div class="flex flex-wrap gap-3">
  <img class="basis-32 grow aspect-square object-cover rounded-lg">
  <!-- ... -->
</div>
\`\`\`

**Pattern: avatar group cu overlap**

\`\`\`html
<!-- -space-x-3 = margin-left negativă = overlap -->
<div class="flex -space-x-3">
  <img class="w-10 h-10 rounded-full ring-2 ring-white" src="...">
  <img class="w-10 h-10 rounded-full ring-2 ring-white" src="...">
  <img class="w-10 h-10 rounded-full ring-2 ring-white" src="...">
  <div class="w-10 h-10 rounded-full bg-slate-200 ring-2 ring-white
              flex items-center justify-center text-xs font-bold">
    +12
  </div>
</div>
\`\`\`

**Anti-pattern de evitat**

\`\`\`html
<!-- GREȘIT — margin pe items (cauzează spațiu nedrept la wrap) -->
<div class="flex flex-wrap">
  <div class="m-2">Item 1</div>
  <div class="m-2">Item 2</div>
</div>

<!-- CORECT — gap pe container (uniform în orice direcție) -->
<div class="flex flex-wrap gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
\`\`\`

• **flex-wrap + gap** = combinația cea mai des folosită — layout responsive fără media queries
• **basis-N + flex-1** = trick pentru "min-width per item" în flex (similar minmax în grid)
• **gap > margin** — gestionează corect spațiul și nu apar margini "duble" la wrap`);

await up('18. Stări avansate', 'Group si group-hover', `**Group și group-hover** este unul dintre cele mai puternice features Tailwind — permite copiilor să răspundă la state-uri (hover, focus) ale părintelui — fără JavaScript.

**Pattern de bază**

\`\`\`html
<!-- Adaugi 'group' pe părinte, 'group-hover:' pe copii -->
<a href="#" class="group block p-6 bg-white rounded-2xl shadow
                   hover:shadow-xl transition-shadow">
  <h3 class="text-lg font-bold text-slate-900
             group-hover:text-indigo-600 transition-colors">
    Titlu (schimbă culoarea când hover pe card)
  </h3>
  <p class="text-slate-600 group-hover:text-slate-700">
    Descriere
  </p>
  <svg class="w-5 h-5 text-slate-400
              group-hover:text-indigo-600
              group-hover:translate-x-1
              transition-all">
    →
  </svg>
</a>
\`\`\`

**Group focus și group active**

\`\`\`html
<button class="group flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded">
  <span>Click me</span>
  <svg class="w-4 h-4
              group-active:rotate-12
              group-focus:scale-110
              group-hover:translate-x-1
              transition-transform">→</svg>
</button>
\`\`\`

**Card cu image zoom la hover**

\`\`\`html
<article class="group cursor-pointer">
  <!-- overflow-hidden pe wrapper pentru a tăia imaginea zoom-ată -->
  <div class="relative overflow-hidden rounded-2xl">
    <img src="..." class="w-full aspect-video object-cover
                          group-hover:scale-110
                          transition-transform duration-500">
    <!-- Overlay care apare la hover -->
    <div class="absolute inset-0 bg-black/50 opacity-0
                group-hover:opacity-100
                transition-opacity flex items-center justify-center">
      <button class="px-4 py-2 bg-white text-slate-900 rounded-lg font-bold">
        Vezi detalii
      </button>
    </div>
  </div>
  <h3 class="mt-3 font-bold group-hover:text-indigo-600 transition-colors">
    Titlu
  </h3>
</article>
\`\`\`

**Named groups (pentru group-uri imbricate)**

\`\`\`html
<!-- Tailwind 3+: poți denumi grupurile pentru a evita conflicte -->
<div class="group/card bg-white rounded-2xl p-6 shadow hover:shadow-xl">
  <h3 class="font-bold group-hover/card:text-indigo-600">Card title</h3>

  <button class="group/btn flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
    <span>Action</span>
    <svg class="group-hover/btn:translate-x-1
                group-hover/card:scale-110
                transition-all">→</svg>
  </button>
</div>
\`\`\`

**Reveal pe hover**

\`\`\`html
<!-- Element ascuns care apare la hover pe părinte -->
<div class="group relative bg-slate-100 rounded-xl p-6">
  <p>Conținut normal</p>

  <!-- Buton care apare doar la hover -->
  <button class="absolute top-2 right-2 opacity-0
                 group-hover:opacity-100
                 transition-opacity
                 p-2 bg-white rounded-full shadow">
    🗑️
  </button>
</div>
\`\`\`

**Group pe tot listă cu icon individual**

\`\`\`html
<ul class="space-y-2">
  <li class="group flex items-center gap-3 p-3 rounded-lg
             hover:bg-slate-100 cursor-pointer">
    <span class="w-2 h-2 rounded-full bg-slate-400
                 group-hover:bg-emerald-500
                 group-hover:scale-150
                 transition-all"></span>
    <span class="font-medium group-hover:text-slate-900">Item 1</span>
    <svg class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</svg>
  </li>
  <li class="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">
    ...
  </li>
</ul>
\`\`\`

**Dropdown menu**

\`\`\`html
<div class="group relative inline-block">
  <button class="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200">
    Menu ▾
  </button>

  <!-- Menu apare la hover/focus pe părinte -->
  <div class="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              z-10">
    <a class="block px-4 py-2 hover:bg-slate-50">Item 1</a>
    <a class="block px-4 py-2 hover:bg-slate-50">Item 2</a>
    <a class="block px-4 py-2 hover:bg-slate-50">Item 3</a>
  </div>
</div>
\`\`\`

**Combinația cu peer (vezi următoarea secțiune)**

\`\`\`html
<!-- group = părinte → copii; peer = sibling stânga → sibling dreapta -->
<div class="group hover:bg-slate-100">
  <input class="peer">
  <p class="group-hover:text-indigo-500 peer-focus:font-bold">
    Reactionează la AMBELE state-uri
  </p>
</div>
\`\`\`

• **group / group-hover** = trucul cel mai des folosit pentru cards interactive
• **Named groups** (group/name) când ai imbricări — evită conflicte între nivelele de group
• **Combinabil cu transform, opacity, color** pentru efecte premium fără JavaScript`);

await up('18. Stări avansate', 'Peer', `**Peer și state pentru sibling-uri** complementează group — permite unui element să reacționeze la state-ul SIBLING-ului anterior (de obicei input → label sau hint).

**Pattern de bază**

\`\`\`html
<!-- Adaugi 'peer' pe input, 'peer-*:' pe sibling-uri DUPĂ -->
<div class="flex flex-col">
  <input type="email" placeholder="Email"
    class="peer px-4 py-2 border rounded-lg
           focus:border-indigo-500 focus:outline-none">

  <!-- Hint reacționează la focus pe input (sibling anterior) -->
  <p class="text-xs text-slate-500
            peer-focus:text-indigo-600
            peer-focus:font-bold
            transition-colors mt-1">
    Va fi vizibil doar pentru tine
  </p>
</div>
\`\`\`

**Floating label pattern**

\`\`\`html
<!-- Label care "plutește" deasupra când input e focus sau are valoare -->
<div class="relative">
  <input
    type="text"
    id="name"
    placeholder=" "
    class="peer w-full px-4 pt-6 pb-2 border-2 border-slate-200 rounded-lg
           focus:border-indigo-500 focus:outline-none">

  <label for="name"
    class="absolute left-4 top-2 text-xs text-slate-500
           transition-all
           peer-placeholder-shown:top-1/2
           peer-placeholder-shown:-translate-y-1/2
           peer-placeholder-shown:text-base
           peer-placeholder-shown:text-slate-400
           peer-focus:top-2
           peer-focus:-translate-y-0
           peer-focus:text-xs
           peer-focus:text-indigo-600">
    Nume complet
  </label>
</div>
\`\`\`

**Validation state cu peer**

\`\`\`html
<div>
  <input type="email" required
    class="peer w-full px-4 py-2 border-2 border-slate-200 rounded-lg
           invalid:border-red-500
           valid:border-emerald-500
           focus:outline-none">

  <!-- Mesaj de eroare visible doar dacă input invalid -->
  <p class="hidden peer-invalid:block text-xs text-red-500 mt-1">
    Email invalid
  </p>

  <!-- Mesaj de success doar dacă valid -->
  <p class="hidden peer-valid:block text-xs text-emerald-600 mt-1">
    ✓ Email valid
  </p>
</div>
\`\`\`

**Checkbox cu label custom**

\`\`\`html
<label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" class="peer sr-only">
  <span class="w-12 h-6 bg-slate-300 rounded-full
               peer-checked:bg-emerald-500
               transition-colors
               relative
               peer-checked:after:translate-x-6
               after:absolute after:top-0.5 after:left-0.5
               after:w-5 after:h-5 after:rounded-full
               after:bg-white after:transition-transform">
  </span>
  <span class="ml-3 text-sm font-medium
               peer-checked:text-emerald-600">
    Activează notificările
  </span>
</label>
\`\`\`

**Radio cu styled labels**

\`\`\`html
<div class="grid grid-cols-3 gap-2">
  <label class="cursor-pointer">
    <input type="radio" name="plan" value="free" class="peer sr-only">
    <div class="p-4 rounded-xl border-2 border-slate-200 text-center
                peer-checked:border-indigo-500
                peer-checked:bg-indigo-50
                peer-checked:text-indigo-700
                hover:border-slate-300 transition-all">
      <div class="font-bold">Free</div>
      <div class="text-sm text-slate-500">0 RON/lună</div>
    </div>
  </label>

  <label class="cursor-pointer">
    <input type="radio" name="plan" value="pro" class="peer sr-only" checked>
    <div class="p-4 rounded-xl border-2 border-slate-200 text-center
                peer-checked:border-indigo-500
                peer-checked:bg-indigo-50">
      <div class="font-bold">Pro</div>
      <div class="text-sm">49 RON/lună</div>
    </div>
  </label>

  <label class="cursor-pointer">
    <input type="radio" name="plan" value="enterprise" class="peer sr-only">
    <div class="p-4 rounded-xl border-2 border-slate-200 text-center
                peer-checked:border-indigo-500
                peer-checked:bg-indigo-50">
      <div class="font-bold">Enterprise</div>
      <div class="text-sm">199 RON/lună</div>
    </div>
  </label>
</div>
\`\`\`

**Named peers (pentru imbricări)**

\`\`\`html
<!-- Tailwind 3+: poți denumi peer-urile -->
<div>
  <input class="peer/email" type="email">
  <input class="peer/pass" type="password">

  <p class="peer-focus/email:text-blue-500
            peer-focus/pass:text-purple-500">
    Reacționează diferit la fiecare input
  </p>
</div>
\`\`\`

**Reguli importante**

\`\`\`html
<!-- ✅ peer-* funcționează DOAR pe sibling-uri DUPĂ peer -->
<div>
  <input class="peer">
  <p class="peer-focus:font-bold">FUNCTIONEAZA</p>
</div>

<!-- ❌ peer-* NU funcționează înainte de peer -->
<div>
  <p class="peer-focus:font-bold">NU funcționează (e ÎNAINTE de input)</p>
  <input class="peer">
</div>

<!-- Soluție: schimbă ordinea DOM și reorder cu CSS dacă necesar -->
<div class="flex flex-col-reverse">
  <input class="peer">
  <label class="peer-focus:text-indigo-500">Label deasupra vizual, sub în DOM</label>
</div>
\`\`\`

• **peer** + **peer-focus / peer-checked / peer-invalid** = floating labels și styled inputs fără JS
• **sr-only** + label custom + peer-checked = checkbox/radio premium (toggle iOS style)
• **Direcția contează**: peer trebuie să fie ÎNAINTE de elementul care reacționează în DOM`);

  console.log('Done Tailwind script 3.');
  await p.$disconnect();
}

run().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
