import assert from 'node:assert/strict';
import test from 'node:test';

import { getFooterInitialState, shouldFetchFooter } from '../dist/nextjs/footerInitialData.js';

test('uses server-provided footer data without a client fetch', () => {
  const footer = { name: 'Main Footer', sections: [{ title: 'Company' }] };

  assert.deepEqual(getFooterInitialState({ settings: { siteName: 'Example' }, footer }), {
    footerData: footer,
    loading: false,
  });
  assert.equal(shouldFetchFooter({ settings: { siteName: 'Example' }, footer }), false);
});

test('retains client fetch fallback when server data is omitted', () => {
  assert.deepEqual(getFooterInitialState(), { footerData: null, loading: true });
  assert.equal(shouldFetchFooter(), true);
});
