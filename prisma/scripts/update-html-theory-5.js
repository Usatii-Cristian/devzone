"use strict";
require("dotenv").config({ path: ".env" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
const UPDATES = [
  {
    lesson: "26. Web Components — Custom Elements și Shadow DOM",
    title: "Ce sunt Web Components?",
    content: `**Web Components** este un set de standarde web care permit crearea de **elemente HTML custom, reutilizabile și încapsulate**, funcționând nativ în browser fără biblioteci externe.

**Cele 4 tehnologii Web Components:**
• **Custom Elements** — definești tag-uri HTML proprii: \`<my-button>\`, \`<user-card>\`
• **Shadow DOM** — encapsulare DOM și CSS; stilurile nu "scapă" în exterior
• **HTML Templates** — \`<template>\` și \`<slot>\` pentru markup inert, reutilizabil
• **ES Modules** — import/export nativ pentru a distribui componente

**De ce Web Components?**
• Funcționează în **orice framework** (React, Vue, Angular) sau fără framework
• **Zero dependențe** — doar browser nativ
• **Encapsulare reală** — CSS scoped, DOM izolat
• **Interoperabilitate** — o dată scris, folosit oriunde

**Custom Element minimal:**
\`\`\`html
<my-greeting name="Cristi"></my-greeting>

<script>
class MyGreeting extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || 'World';
    this.innerHTML = \`<h2>Salut, \${name}!</h2>\`;
  }
}
customElements.define('my-greeting', MyGreeting);
</script>
\`\`\`

**Lifecycle callbacks esențiale:**
• \`connectedCallback()\` — elementul a fost adăugat în DOM
• \`disconnectedCallback()\` — elementul a fost scos din DOM
• \`attributeChangedCallback(name, old, new)\` — un atribut s-a schimbat
• \`adoptedCallback()\` — mutat în alt document

**Browser support:** Toate browserele moderne (Chrome, Firefox, Safari, Edge) suportă Web Components nativ. Polyfill-uri disponibile pentru browsere vechi via \`@webcomponents/webcomponentsjs\`.

**Când să folosești Web Components:**
• Design systems cross-framework (componente UI partajate între echipe)
• Widget-uri embed (chat widget, social share button)
• Micro-frontend architecture
• Componente ce trebuie să funcționeze independent de framework

**Comparație cu React/Vue:**
Web Components nu înlocuiesc React sau Vue — sunt complementare. React/Vue sunt **frameworks de aplicație** (state management, routing, ecosistem), iar Web Components sunt **standard de browser** pentru componente izolate.`
  },
  {
    lesson: "26. Web Components — Custom Elements și Shadow DOM",
    title: "Shadow DOM — Encapsulare CSS",
    content: `**Shadow DOM** este un subtree DOM separat, atașat unui element, cu **scoping CSS complet** — stilurile definite înăuntru nu afectează documentul principal și invers.

**Cum funcționează Shadow DOM:**
\`\`\`javascript
class StyledCard extends HTMLElement {
  connectedCallback() {
    // attachShadow creează un shadow root izolat
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = \`
      <style>
        /* Acest CSS NU afectează pagina principală */
        :host {
          display: block;
          border: 2px solid #3b82f6;
          border-radius: 8px;
          padding: 16px;
          font-family: sans-serif;
        }
        h2 { color: #1e40af; margin: 0 0 8px; }
        p  { color: #6b7280; line-height: 1.6; }
      </style>
      <h2><slot name="title">Default Title</slot></h2>
      <p><slot>Default content...</slot></p>
    \`;
  }
}
customElements.define('styled-card', StyledCard);
\`\`\`

**Utilizare în HTML:**
\`\`\`html
<styled-card>
  <span slot="title">Web Components sunt tari!</span>
  Shadow DOM oferă encapsulare reală a stilurilor CSS.
</styled-card>
\`\`\`

**mode: 'open' vs 'closed':**
• **open** — \`element.shadowRoot\` accesibil din JavaScript extern
• **closed** — \`element.shadowRoot\` returnează \`null\`; mai mult control, dar limitează DevTools

**:host și :host-context:**
\`\`\`css
/* Stilizează elementul container (custom element-ul însuși) */
:host { display: block; }
:host(.featured) { background: gold; }

/* Stil bazat pe contextul părinte */
:host-context(.dark-theme) { color: white; }
\`\`\`

**CSS Custom Properties traversează Shadow DOM:**
\`\`\`css
/* pagina principală */
styled-card { --card-color: #3b82f6; }

/* înăuntrul shadow DOM */
:host { border-color: var(--card-color, black); }
\`\`\`
Aceasta este metoda standard de **tematizare** a Web Components din exterior.

**::part() — stilizare selectivă din exterior:**
\`\`\`javascript
// în componentă: marchează elementul cu part=""
shadow.innerHTML = \`<button part="btn">Click</button>\`;

// în CSS-ul paginii principale:
styled-card::part(btn) { background: red; }
\`\`\`

**Slots — distribuția conținutului:**
• **\`<slot>\`** — named și default; conținutul este proiectat din light DOM în shadow DOM
• Conținutul din \`<slot>\` rămâne în light DOM (document principal), doar **vizual** apare în shadow
• \`::slotted(selector)\` — stilizează conținut slotted din interiorul shadow DOM

**Debugging Shadow DOM:** Chrome/Firefox DevTools arată shadow trees sub elementul host, cu sufix \`#shadow-root (open)\`.`
  }
];
async function main() {
  let updated = 0, notFound = 0;
  for (const item of UPDATES) {
    const lessons = await p.lesson.findMany({ where: { title: item.lesson, module: { slug: "html" } } });
    if (!lessons.length) { console.log("! Lec: " + item.lesson); notFound++; continue; }
    const theory = await p.theory.findFirst({ where: { title: item.title, lessonId: { in: lessons.map(l => l.id) } } });
    if (!theory) { console.log("! Teo: " + item.title); notFound++; continue; }
    await p.theory.update({ where: { id: theory.id }, data: { content: item.content } });
    console.log("✓ " + item.title + ": " + theory.content.length + " → " + item.content.length);
    updated++;
  }
  console.log("\nDone: " + updated + " updated, " + notFound + " not found");
  await p.$disconnect();
}
main().catch(e => { console.error(e); p.$disconnect(); process.exit(1); });
