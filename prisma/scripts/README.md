# prisma/scripts — utilitare one-off

Scripturi de mentenanță, inspecție și populare a conținutului, rulate **manual** și
**ad-hoc** (nu fac parte din build sau din runtime-ul aplicației). Au fost mutate aici
din `prisma/` ca să țină rădăcina curată. Niciunul nu e importat de cod — fiecare
rulează standalone și își creează propriul `PrismaClient`.

## Cum se rulează
Din rădăcina proiectului (au nevoie de `DATABASE_URL`, unele și de `GOOGLE_AI_KEY`/`GROQ_*`):

```bash
node prisma/scripts/<nume-script>.js
```

> Seeding-ul principal NU e aici: a rămas la `prisma/seed.js` și se rulează cu
> `npm run seed`. El importă fișierele `prisma/seed-*.js`, care de aceea au rămas
> în `prisma/`.

## Categorii
- **`update-*-theory-*.js`** — completează/îmbunătățește textul de teorie per limbaj
  (C, C#, CSS, HTML, Java, JS, React, Tailwind). Sursa conținutului de teorie.
- **`fix-*.js`** — corecții punctuale aplicate datelor existente (task-uri, quiz-uri,
  dificultate, etc.).
- **`enhance-theory*.js` / `enhance-all-sequential.js`** — rescriu teoria prin LLM
  (Gemini/Groq).
- **`check-*.js` / `audit-*.js` / `verify-*.js` / `quality-check.js`** — rapoarte de
  inspecție (read-only) asupra calității conținutului.
- **`list-*.js` / `find-*.js` / `dump-*.js` / `get-lesson-ids.js`** — interogări de
  diagnosticare.
- **`manual-update-*.js` / `migrate-user-progress.js`** — actualizări/migrări manuale.
- **`fix-seed-backticks.js`** — utilitar care normalizează backtick-urile din fișierele
  de seed.

Sunt păstrate pentru a putea reconstrui/repara conținutul la nevoie. Pot fi șterse în
siguranță dacă nu mai e nevoie de re-rulare.
