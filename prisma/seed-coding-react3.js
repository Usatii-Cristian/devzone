const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasks = [
  {
    slug: 'react-portals',
    name: 'React Portal pentru modal',
    question: 'Scrie un component Modal care folosește ReactDOM.createPortal pentru a randa în document.body. Modalul să accepte props: isOpen, onClose, children.',
    language: 'javascript',
    starterCode: `import ReactDOM from 'react-dom';\n\nfunction Modal({ isOpen, onClose, children }) {\n  if (!isOpen) return null;\n  \n  return ReactDOM.createPortal(\n    <div className="modal-overlay" onClick={onClose}>\n      <div className="modal-content" onClick={e => e.stopPropagation()}>\n        {children}\n        <button onClick={onClose}>Închide</button>\n      </div>\n    </div>,\n    // target element\n  );\n}\n\nexport default Modal;`,
    expectedOutput: '',
  },
  {
    slug: 'react-forwardref',
    name: 'forwardRef pentru input custom',
    question: 'Creează un component CustomInput cu forwardRef care transmite ref-ul la elementul input nativ. Permite și className, placeholder, și un label opțional.',
    language: 'javascript',
    starterCode: `import { forwardRef } from 'react';\n\nconst CustomInput = forwardRef(function CustomInput({ label, className, ...props }, ref) {\n  return (\n    <div className="input-wrapper">\n      {label && <label>{label}</label>}\n      <input\n        ref={ref}\n        className={/* combină className-uri */}\n        {...props}\n      />\n    </div>\n  );\n});\n\nexport default CustomInput;`,
    expectedOutput: '',
  },
  {
    slug: 'react-storybook',
    name: 'Story pentru un Button component',
    question: 'Scrie o story Storybook pentru un Button component cu variantele: primary, secondary, destructive. Fiecare story să aibă args diferite.',
    language: 'javascript',
    starterCode: `// Button.stories.js\nimport Button from './Button';\n\nexport default {\n  title: 'Components/Button',\n  component: Button,\n  argTypes: {\n    variant: { control: 'select', options: ['primary', 'secondary', 'destructive'] },\n    children: { control: 'text' },\n  },\n};\n\nexport const Primary = {\n  args: { variant: 'primary', children: 'Click me' },\n};\n\n// adaugă Secondary și Destructive`,
    expectedOutput: '',
  },
  {
    slug: 'react-perf-memo',
    name: 'Optimizare cu React.memo și useMemo',
    question: 'Optimizează componenta ExpensiveList cu React.memo, și calculul filteredItems cu useMemo. List-ul afișează items filtrate după un search string.',
    language: 'javascript',
    starterCode: `import { memo, useMemo } from 'react';\n\nconst ExpensiveList = memo(function ExpensiveList({ items, searchTerm }) {\n  const filteredItems = useMemo(() => {\n    console.log('Filtrare...');\n    return items.filter(item =>\n      item.name.toLowerCase().includes(searchTerm.toLowerCase())\n    );\n  }, [/* dependencies */]);\n\n  return (\n    <ul>\n      {filteredItems.map(item => (\n        <li key={item.id}>{item.name}</li>\n      ))}\n    </ul>\n  );\n});\n\nexport default ExpensiveList;`,
    expectedOutput: '',
  },
  {
    slug: 'react-microfrontends',
    name: 'Module Federation concept',
    question: 'Scrie configurația webpack pentru Module Federation: un host app care consumă un remote "shop" care expune componenta ProductCard.',
    language: 'javascript',
    starterCode: `// webpack.config.js (host)\nconst { ModuleFederationPlugin } = require('webpack').container;\n\nmodule.exports = {\n  plugins: [\n    new ModuleFederationPlugin({\n      name: 'host',\n      remotes: {\n        shop: 'shop@http://localhost:3001/remoteEntry.js',\n      },\n      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },\n    }),\n  ],\n};`,
    expectedOutput: '',
  },
  {
    slug: 'react-native-intro',
    name: 'Component React Native de bază',
    question: 'Scrie un component React Native simplu: un card cu View, Text și TouchableOpacity. Stiluri cu StyleSheet.create(). La apăsare, afișează Alert.',
    language: 'javascript',
    starterCode: `import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';\n\nexport default function Card({ title, description }) {\n  const handlePress = () => {\n    Alert.alert('Titlu', title);\n  };\n\n  return (\n    <TouchableOpacity style={styles.card} onPress={handlePress}>\n      <Text style={styles.title}>{title}</Text>\n      <Text style={styles.desc}>{description}</Text>\n    </TouchableOpacity>\n  );\n}\n\nconst styles = StyleSheet.create({\n  card: {\n    // padding, borderRadius, backgroundColor, shadow\n  },\n  title: { /* fontSize, fontWeight */ },\n  desc: { /* fontSize, color */ },\n});`,
    expectedOutput: '',
  },
];

async function main() {
  console.log('Adăugare coding tasks React (remaining)...');
  let added = 0, skipped = 0;
  for (const t of tasks) {
    const lesson = await prisma.lesson.findFirst({ where: { slug: t.slug } });
    if (!lesson) { console.log(`  [skip] ${t.slug} — nu există`); skipped++; continue; }
    const existing = await prisma.task.findFirst({ where: { lessonId: lesson.id, type: 'coding' } });
    if (existing) { console.log(`  [skip] ${t.slug} — are deja coding`); skipped++; continue; }
    const maxTask = await prisma.task.findFirst({ where: { lessonId: lesson.id }, orderBy: { number: 'desc' } });
    const n = (maxTask?.number ?? 0) + 1;
    await prisma.task.create({
      data: {
        lessonId: lesson.id, number: n,
        name: t.name, question: t.question,
        options: [], answer: '',
        explanation: '',
        difficulty: 'medium',
        type: 'coding', language: t.language,
        starterCode: t.starterCode || '',
        expectedOutput: t.expectedOutput || '',
      },
    });
    console.log(`  [ok] ${t.slug}`);
    added++;
  }
  console.log(`\nGata: ${added} adăugate, ${skipped} sărite.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
