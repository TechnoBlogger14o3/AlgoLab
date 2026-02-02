import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const indexPath = join(distPath, 'index.html');

let html = readFileSync(indexPath, 'utf-8');

// Fix asset paths to include base path
html = html.replace(/src="\/assets\//g, 'src="/AlgoLab/assets/');
html = html.replace(/href="\/assets\//g, 'href="/AlgoLab/assets/');

writeFileSync(indexPath, html, 'utf-8');
console.log('Fixed asset paths in index.html');
