import { access, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const aetherRoot = resolve(siteRoot, '../aether-site');
const aetherStyles = resolve(aetherRoot, 'styles');
const siteStyles = resolve(siteRoot, 'src/styles');

const files = [
  ['foundation.css', resolve(siteStyles, 'global.css')],
  ...['minimal', 'magazine', 'terminal', 'cyber', 'island', 'wilds', 'persona']
    .map((theme) => [`themes/${theme}.css`, resolve(siteStyles, `themes/${theme}.css`)]),
];

try {
  await access(aetherStyles);
} catch {
  console.error(`找不到 Aether：${aetherRoot}`);
  console.error('请将 aether-site 放在 W.Site 同级目录后重试。');
  process.exitCode = 1;
}

if (!process.exitCode) {
  for (const [source, target] of files) {
    await cp(resolve(aetherStyles, source), target);
  }
  console.log(`已从 Aether 同步 ${files.length} 个样式文件。`);
}
