const glob = require('glob');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, 'src');
const outputMarkdown = path.resolve(__dirname, 'FUNCTION_INDEX.md');
const outputJson = path.resolve(__dirname, 'function-index.json');

// כתובת GitHub ו־VS Code
const githubRepoUrl = 'https://github.com/dariohajduk/PilatesStudioApp/blob/main';
const vscodeBasePath = path.resolve(__dirname); // בסיס לקישור VS Code

// סינון קבצים לפי תיקיות רלוונטיות
const includeFolders = ['components', 'pages', 'services', 'utils'];

const functionRegex = /(export\s+)?(async\s+)?(function\s+|const\s+|let\s+|var\s+)?(\w+)\s*=?\s*\(([^)]*)\)\s*=>?[\s{]/g;

const files = glob.sync(`${projectRoot}/**/*.{js,jsx,ts,tsx}`).filter(f =>
  includeFolders.some(folder => f.includes(path.join('src', folder)))
);

const functions = [];

files.forEach((filePath) => {
  const relativePath = path.relative(__dirname, filePath);
  const content = fs.readFileSync(filePath, 'utf-8').split('\n');
  let fileChanged = false;

  content.forEach((line, index) => {
    const match = line.match(functionRegex);
    if (match) {
      const functionName = match[4];
      const params = match[6]?.split(',').map(p => p.trim()).filter(Boolean) || [];

      // חיפוש תיאור קיים
      let description = '';
      let lookback = index - 1;

      while (lookback >= 0) {
        const prevLine = content[lookback].trim();
        if (prevLine.startsWith('//')) {
          description = prevLine.replace(/^\/\/\s?/, '');
          break;
        } else if (prevLine.startsWith('/**')) {
          const comments = [];
          while (lookback >= 0 && !content[lookback].includes('*/')) {
            comments.unshift(content[lookback].replace(/^\/?\*+/, '').trim());
            lookback--;
          }
          description = comments.join(' ');
          break;
        } else if (prevLine === '') {
          lookback--;
        } else {
          break;
        }
      }

      // אם אין תיאור – נוסיף JSDoc אוטומטי
      if (!description) {
        const jsdoc = [
          '/**',
          ` * TODO: תאר את הפונקציה ${functionName}`,
          ...params.map(p => ` * @param {any} ${p}`),
          ' */'
        ];
        content.splice(index, 0, ...jsdoc);
        description = '---';
        fileChanged = true;
      }

      functions.push({
        name: functionName,
        file: relativePath.replace(/\\/g, '/'),
        line: index + 1,
        params,
        description
      });
    }
  });

  if (fileChanged) {
    fs.writeFileSync(filePath, content.join('\n'), 'utf-8');
  }
});

// Markdown generation
const mdContent = `# תוכן עניינים של פונקציות בפרויקט

> נוצר אוטומטית. אל תערוך ידנית.

${functions.map(fn => {
  const githubLink = `${githubRepoUrl}/${fn.file}#L${fn.line}`;
  const vscodeLink = `vscode://file/${path.join(vscodeBasePath, fn.file)}:${fn.line}`;
  return `- **${fn.name}** – ${fn.description}\n  - [GitHub](${githubLink}) | [VS Code](${vscodeLink})`;
}).join('\n\n')}
`;

fs.writeFileSync(outputMarkdown, mdContent, 'utf-8');
fs.writeFileSync(outputJson, JSON.stringify(functions, null, 2), 'utf-8');

console.log('✓ FUNCTION_INDEX.md ו־function-index.json נוצרו, והקבצים עודכנו עם JSDoc במידת הצורך.');
