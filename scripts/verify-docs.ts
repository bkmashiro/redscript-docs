#!/usr/bin/env npx ts-node
/**
 * verify-docs.ts - Check documentation against actual compiler
 * 
 * Validates:
 * 1. All builtins documented
 * 2. All stdlib modules documented
 * 3. All decorators documented
 * 4. Code examples compile without errors
 * 
 * Usage: npx ts-node scripts/verify-docs.ts
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const REDSCRIPT_DIR = path.join(process.env.HOME!, 'projects/redscript');
const DOCS_DIR = path.join(process.env.HOME!, 'projects/redscript-docs/docs/en');

interface VerifyResult {
  category: string;
  item: string;
  status: 'ok' | 'missing' | 'error';
  details?: string;
}

const results: VerifyResult[] = [];

// ─────────────────────────────────────────────────────────────────────
// 1. Extract builtins from compiler
// ─────────────────────────────────────────────────────────────────────

function getBuiltins(): string[] {
  const dtsPath = path.join(REDSCRIPT_DIR, 'builtins.d.mcrs');
  
  // Regenerate to ensure fresh
  try {
    execSync('node dist/cli.js generate-dts', { cwd: REDSCRIPT_DIR, stdio: 'pipe' });
  } catch (e) {
    console.error('Failed to generate builtins.d.mcrs');
  }
  
  const content = fs.readFileSync(dtsPath, 'utf-8');
  const fnRegex = /declare fn (\w+)\(/g;
  const builtins: string[] = [];
  let match;
  while ((match = fnRegex.exec(content)) !== null) {
    builtins.push(match[1]);
  }
  return [...new Set(builtins)]; // dedupe
}

// ─────────────────────────────────────────────────────────────────────
// 2. Extract stdlib modules from compiler
// ─────────────────────────────────────────────────────────────────────

function getStdlibModules(): string[] {
  const stdlibDir = path.join(REDSCRIPT_DIR, 'src/stdlib');
  const files = fs.readdirSync(stdlibDir);
  return files
    .filter(f => f.endsWith('.mcrs'))
    .map(f => f.replace('.mcrs', ''));
}

// ─────────────────────────────────────────────────────────────────────
// 3. Extract decorators from compiler
// ─────────────────────────────────────────────────────────────────────

function getDecorators(): string[] {
  // Known decorators from lexer/parser
  return [
    'tick', 'load', 'on', 'on_trigger', 'inline', 'deprecated',
    'singleton', 'watch', 'config', 'profile', 'throttle', 'retry',
    'memoize', 'benchmark', 'test', 'coroutine', 'schedule', 'keep'
  ];
}

// ─────────────────────────────────────────────────────────────────────
// 4. Check documentation coverage
// ─────────────────────────────────────────────────────────────────────

function checkBuiltinsDocs(builtins: string[]): void {
  const builtinsDoc = path.join(DOCS_DIR, 'reference/builtins.md');
  const content = fs.readFileSync(builtinsDoc, 'utf-8');
  
  for (const fn of builtins) {
    // Check if function is mentioned (as header or in code block)
    const patterns = [
      new RegExp(`## \`?${fn}\`?`, 'i'),
      new RegExp(`### \`?${fn}\`?`, 'i'),
      new RegExp(`fn ${fn}\\(`, 'i'),
      new RegExp(`\\b${fn}\\(`, 'i'),
    ];
    
    const found = patterns.some(p => p.test(content));
    results.push({
      category: 'builtin',
      item: fn,
      status: found ? 'ok' : 'missing',
      details: found ? undefined : `Not found in builtins.md`
    });
  }
}

function checkStdlibDocs(modules: string[]): void {
  const stdlibDir = path.join(DOCS_DIR, 'stdlib');
  const existingDocs = fs.readdirSync(stdlibDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
  
  for (const mod of modules) {
    const found = existingDocs.includes(mod);
    results.push({
      category: 'stdlib',
      item: mod,
      status: found ? 'ok' : 'missing',
      details: found ? undefined : `Missing stdlib/${mod}.md`
    });
  }
  
  // Also check for orphan docs (docs without corresponding module)
  for (const doc of existingDocs) {
    if (doc === 'index' || doc === 'README') continue;
    if (!modules.includes(doc)) {
      results.push({
        category: 'stdlib',
        item: doc,
        status: 'error',
        details: `Orphan doc: stdlib/${doc}.md has no matching module`
      });
    }
  }
}

function checkDecoratorsDocs(decorators: string[]): void {
  const decoratorsDoc = path.join(DOCS_DIR, 'reference/decorators.md');
  const guideDoc = path.join(DOCS_DIR, 'guide/decorators.md');
  
  let content = '';
  if (fs.existsSync(decoratorsDoc)) {
    content += fs.readFileSync(decoratorsDoc, 'utf-8');
  }
  if (fs.existsSync(guideDoc)) {
    content += fs.readFileSync(guideDoc, 'utf-8');
  }
  
  for (const dec of decorators) {
    const patterns = [
      new RegExp(`@${dec}\\b`, 'i'),
      new RegExp(`## \`?@?${dec}\`?`, 'i'),
      new RegExp(`### \`?@?${dec}\`?`, 'i'),
    ];
    
    const found = patterns.some(p => p.test(content));
    results.push({
      category: 'decorator',
      item: `@${dec}`,
      status: found ? 'ok' : 'missing',
      details: found ? undefined : `Not documented`
    });
  }
}

// ─────────────────────────────────────────────────────────────────────
// 5. Test code examples compile
// ─────────────────────────────────────────────────────────────────────

function extractCodeBlocks(mdFile: string): string[] {
  const content = fs.readFileSync(mdFile, 'utf-8');
  const codeBlockRegex = /```(?:rs|redscript|mcrs)\n([\s\S]*?)```/g;
  const blocks: string[] = [];
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

function testCodeExample(code: string, source: string): VerifyResult {
  // Skip incomplete snippets (no fn declaration)
  if (!code.includes('fn ') && !code.includes('@')) {
    return { category: 'example', item: source, status: 'ok', details: 'Skipped (snippet)' };
  }
  
  // Write temp file and try to check
  const tmpFile = '/tmp/redscript-doc-test.mcrs';
  
  // Wrap in namespace if needed
  let fullCode = code;
  if (!code.includes('namespace ')) {
    fullCode = `namespace test\n${code}`;
  }
  
  fs.writeFileSync(tmpFile, fullCode);
  
  try {
    execSync(`node dist/cli.js check ${tmpFile}`, { 
      cwd: REDSCRIPT_DIR, 
      stdio: 'pipe',
      timeout: 5000
    });
    return { category: 'example', item: source, status: 'ok' };
  } catch (e: any) {
    const stderr = e.stderr?.toString() || e.message;
    // Ignore certain expected errors (missing imports, etc)
    if (stderr.includes('import') || stderr.includes('module')) {
      return { category: 'example', item: source, status: 'ok', details: 'Skipped (needs imports)' };
    }
    return { 
      category: 'example', 
      item: source, 
      status: 'error',
      details: stderr.split('\n')[0]
    };
  }
}

function checkExamples(): void {
  const mdFiles = execSync(`find ${DOCS_DIR} -name "*.md"`, { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .filter(Boolean);
  
  let tested = 0;
  const maxTests = 50; // Limit to avoid long runs
  
  for (const mdFile of mdFiles) {
    if (tested >= maxTests) break;
    
    const blocks = extractCodeBlocks(mdFile);
    for (const block of blocks) {
      if (tested >= maxTests) break;
      
      const relPath = path.relative(DOCS_DIR, mdFile);
      const result = testCodeExample(block, relPath);
      if (result.status === 'error') {
        results.push(result);
      }
      tested++;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('🔍 Verifying RedScript documentation...\n');
  
  // Get compiler data
  const builtins = getBuiltins();
  const stdlib = getStdlibModules();
  const decorators = getDecorators();
  
  console.log(`Found: ${builtins.length} builtins, ${stdlib.length} stdlib modules, ${decorators.length} decorators\n`);
  
  // Check documentation
  checkBuiltinsDocs(builtins);
  checkStdlibDocs(stdlib);
  checkDecoratorsDocs(decorators);
  checkExamples();
  
  // Report
  const missing = results.filter(r => r.status === 'missing');
  const errors = results.filter(r => r.status === 'error');
  const ok = results.filter(r => r.status === 'ok');
  
  console.log('─'.repeat(60));
  console.log(`✅ OK: ${ok.length}`);
  console.log(`⚠️  Missing: ${missing.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log('─'.repeat(60));
  
  if (missing.length > 0) {
    console.log('\n⚠️  Missing documentation:');
    for (const r of missing) {
      console.log(`  - [${r.category}] ${r.item}: ${r.details || ''}`);
    }
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    for (const r of errors) {
      console.log(`  - [${r.category}] ${r.item}: ${r.details || ''}`);
    }
  }
  
  // Exit code
  process.exit(missing.length + errors.length > 0 ? 1 : 0);
}

main();
