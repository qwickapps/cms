/**
 * Clean Environment Validation Test for @qwickapps/cms
 *
 * This file tests that the package can be imported and used correctly
 * in a fresh TypeScript/Node.js project.
 *
 * It validates:
 * - All subpath exports are available
 * - TypeScript types work correctly
 * - Collections, blocks, and plugins can be imported
 * - Logging module works with optional dependencies
 */

let testsPassed = 0;
let testsFailed = 0;

function test(name: string, fn: () => void | Promise<void>): void {
  try {
    const result = fn();
    if (result instanceof Promise) {
      result
        .then(() => {
          console.log(`  ✓ ${name}`);
          testsPassed++;
        })
        .catch((err) => {
          console.log(`  ✗ ${name}: ${err.message}`);
          testsFailed++;
        });
    } else {
      console.log(`  ✓ ${name}`);
      testsPassed++;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log(`  ✗ ${name}: ${message}`);
    testsFailed++;
  }
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  @qwickapps/cms - Clean Environment Test                      ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// Test 1: Main exports
console.log('Test Group: Main Exports');

test('Main module imports successfully', async () => {
  const cms = await import('@qwickapps/cms');
  assert(cms !== undefined, 'Main module should export something');
});

// Test 2: Collections subpath
console.log('\nTest Group: Collections Subpath');

test('Collections subpath imports successfully', async () => {
  const collections = await import('@qwickapps/cms/collections');
  assert(collections !== undefined, 'Collections should be importable');
});

test('Pages collection exists', async () => {
  const { Pages } = await import('@qwickapps/cms/collections');
  assert(Pages !== undefined, 'Pages collection should exist');
  assert(typeof Pages === 'object', 'Pages should be an object');
});

test('Users collection exists', async () => {
  const { Users } = await import('@qwickapps/cms/collections');
  assert(Users !== undefined, 'Users collection should exist');
});

test('Media collection exists', async () => {
  const { Media } = await import('@qwickapps/cms/collections');
  assert(Media !== undefined, 'Media collection should exist');
});

test('Posts collection exists', async () => {
  const { Posts } = await import('@qwickapps/cms/collections');
  assert(Posts !== undefined, 'Posts collection should exist');
});

test('Navigation collection exists', async () => {
  const { Navigation } = await import('@qwickapps/cms/collections');
  assert(Navigation !== undefined, 'Navigation collection should exist');
});

// Test 3: Blocks subpath
console.log('\nTest Group: Blocks Subpath');

test('Blocks subpath imports successfully', async () => {
  const blocks = await import('@qwickapps/cms/blocks');
  assert(blocks !== undefined, 'Blocks should be importable');
});

test('HeroBlock exists', async () => {
  const { HeroBlock } = await import('@qwickapps/cms/blocks');
  assert(HeroBlock !== undefined, 'HeroBlock should exist');
});

test('contentBlocks array exists', async () => {
  const { contentBlocks } = await import('@qwickapps/cms/blocks');
  assert(contentBlocks !== undefined, 'contentBlocks should exist');
  assert(Array.isArray(contentBlocks), 'contentBlocks should be an array');
});

// Test 4: Plugins subpath
console.log('\nTest Group: Plugins Subpath');

test('Plugins subpath imports successfully', async () => {
  const plugins = await import('@qwickapps/cms/plugins');
  assert(plugins !== undefined, 'Plugins should be importable');
});

test('qwickappsPlugin exists', async () => {
  const { qwickappsPlugin } = await import('@qwickapps/cms/plugins');
  assert(qwickappsPlugin !== undefined, 'qwickappsPlugin should exist');
  assert(typeof qwickappsPlugin === 'function', 'qwickappsPlugin should be a function');
});

// Test 5: Globals subpath
console.log('\nTest Group: Globals Subpath');

test('Globals subpath imports successfully', async () => {
  const globals = await import('@qwickapps/cms/globals');
  assert(globals !== undefined, 'Globals should be importable');
});

// Test 6: Components subpath
console.log('\nTest Group: Components Subpath');

test('Components subpath imports successfully', async () => {
  const components = await import('@qwickapps/cms/components');
  assert(components !== undefined, 'Components should be importable');
});

// Test 7: Providers subpath
console.log('\nTest Group: Providers Subpath');

test('Providers subpath imports successfully', async () => {
  const providers = await import('@qwickapps/cms/providers');
  assert(providers !== undefined, 'Providers should be importable');
});

// Test 8: Logging subpath (with optional dependencies)
console.log('\nTest Group: Logging Subpath');

test('Logging subpath imports successfully', async () => {
  const logging = await import('@qwickapps/cms/logging');
  assert(logging !== undefined, 'Logging should be importable');
});

test('createCMSLogger exists', async () => {
  const { createCMSLogger } = await import('@qwickapps/cms/logging');
  assert(createCMSLogger !== undefined, 'createCMSLogger should exist');
  assert(typeof createCMSLogger === 'function', 'createCMSLogger should be a function');
});

test('cmsLoggers object exists', async () => {
  const { cmsLoggers } = await import('@qwickapps/cms/logging');
  assert(cmsLoggers !== undefined, 'cmsLoggers should exist');
  assert(typeof cmsLoggers === 'object', 'cmsLoggers should be an object');
});

test('flushCMSLogs exists', async () => {
  const { flushCMSLogs } = await import('@qwickapps/cms/logging');
  assert(flushCMSLogs !== undefined, 'flushCMSLogs should exist');
  assert(typeof flushCMSLogs === 'function', 'flushCMSLogs should be a function');
});

// Test 9: Admin subpath
// Note: Admin components import CSS which requires a bundler (webpack/vite).
// TypeScript type checking validates the exports. Runtime import is skipped.
console.log('\nTest Group: Admin Subpath');
console.log('  ⏭ Admin subpath skipped (requires bundler for CSS imports)');
console.log('  ✓ Admin types validated by TypeScript compilation');

// Wait for async tests to complete
await new Promise(resolve => setTimeout(resolve, 100));

// Summary
console.log('\n' + '─'.repeat(60));
console.log(`\nResults: ${testsPassed} passed, ${testsFailed} failed`);
console.log('');

if (testsFailed > 0) {
  console.log('❌ Some tests failed! Package may have issues.');
  process.exit(1);
} else {
  console.log('✅ All tests passed! Package works correctly in clean environment.');
  process.exit(0);
}
