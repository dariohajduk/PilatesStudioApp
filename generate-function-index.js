const glob = require('glob');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, 'src');
const outputMarkdown = path.resolve(__dirname, 'FUNCTION_INDEX.md');
const outputJson = path.resolve(__dirname, 'function-index.json');

const githubRepoUrl = 'https://github.com/dariohajduk/PilatesStudioApp/blob/main';
const vscodeBasePath = path.resolve(__dirname);

const includeFolders = ['components', 'pages', 'services', 'utils'];

const minimalMode = process.argv.includes('--minimal');

// Regex חדש: תופס גם מתודות באובייקט, useCallback, אנונימיות
const functionRegex = /(?:(function\s+)?(\w+)\s*\(|const\s+(\w+)\s*=\s*(?:async\s*)?\(?[^\)]*\)?\s*=>|(\w+)\s*:\s*\(?[^\)]*\)?\s*=>)/g;

const files = glob.sync(`${projectRoot}/**/*.{js,jsx,ts,tsx}`).filter(f =>
  includeFolders.some(folder => f.includes(path.join('src', folder)))
);

const functions = [];

files.forEach((filePath) => {
  const relativePath = path.relative(__dirname, filePath);
  const fileName = path.basename(filePath).replace(/\.[^.]+$/, '');
  const content = fs.readFileSync(filePath, 'utf-8').split('\n');
  let fileChanged = false;

  content.forEach((line, index) => {
    const match = functionRegex.exec(line);
    if (match) {
      const rawName = match[2] || match[3] || match[4];
      const functionName = rawName || `anonymous_${fileName}_L${index + 1}`;

      // תיאור
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

      // תיעוד JSDoc אם חסר
      if (!description && !minimalMode) {
        const jsdoc = [
          '/**',
          ` * TODO: תאר את הפונקציה ${functionName}`,
          ' */'
        ];
        content.splice(index, 0, ...jsdoc);
        description = '---';
        fileChanged = true;
      }

      if (minimalMode && !description) return;

      functions.push({
        name: functionName,
        file: relativePath.replace(/\\/g, '/'),
        line: index + 1,
        description
      });
    }
    functionRegex.lastIndex = 0; // reset for next line
  });

  if (fileChanged) {
    fs.writeFileSync(filePath, content.join('\n'), 'utf-8');
  }
});

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

console.log(`✓ נוצרו FUNCTION_INDEX.md ו־function-index.json (${functions.length} פונקציות)${minimalMode ? ' [MINIMAL MODE]' : ''}`);
