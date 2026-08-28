import { access, cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const aetherRoot = resolve(siteRoot, '../aether-themes');
const aetherStyles = resolve(aetherRoot, 'styles');
const aetherScripts = resolve(aetherRoot, 'scripts');
const siteStyles = resolve(siteRoot, 'src/styles');
const siteScripts = resolve(siteRoot, 'src/scripts');

const styleFiles = [
  ['foundation.css', resolve(siteStyles, 'global.css')],
  ...['minimal', 'magazine', 'terminal', 'cyber', 'island', 'wilds', 'persona']
    .map((theme) => [`themes/${theme}.css`, resolve(siteStyles, `themes/${theme}.css`)]),
];

const scriptFiles = [
  ['persona-titles.js', resolve(siteScripts, 'aether-persona-titles.js')],
  ['markup.js', resolve(siteScripts, 'aether-markup.js')],
];

try {
  await access(aetherStyles);
  await access(aetherScripts);
} catch {
  console.error(`找不到 Aether：${aetherRoot}`);
  console.error('请将 aether-themes 放在 W.Site 同级目录后重试。');
  process.exitCode = 1;
}

if (!process.exitCode) {
  for (const [source, target] of styleFiles) {
    await cp(resolve(aetherStyles, source), target);
  }
  await mkdir(siteScripts, { recursive: true });
  for (const [source, target] of scriptFiles) {
    await cp(resolve(aetherScripts, source), target);
  }
  console.log(`已从 Aether 同步 ${styleFiles.length} 个样式文件、${scriptFiles.length} 个脚本。`);
}
