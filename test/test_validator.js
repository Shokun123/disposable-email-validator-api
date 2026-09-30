import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, validateProApiKey } from '../src/validator.js';

test('Disposable Email Validator API - Core Tests', async (t) => {
  await t.test('detects legitimate corporate and personal emails', () => {
    const res = validateEmail('founder@stripe.com');
    assert.equal(res.valid, true);
    assert.equal(res.disposable, false);
    assert.equal(res.domain, 'stripe.com');
    assert.equal(res.riskScore, 'LOW');
  });

  await t.test('detects known temporary burner domains', () => {
    const res1 = validateEmail('spammer123@mailinator.com');
    assert.equal(res1.valid, false);
    assert.equal(res1.disposable, true);
    assert.equal(res1.riskScore, 'CRITICAL');

    const res2 = validateEmail('bot@10minutemail.com');
    assert.equal(res2.valid, false);
    assert.equal(res2.disposable, true);
  });

  await t.test('rejects malformed and empty emails', () => {
    const res = validateEmail('not-an-email');
    assert.equal(res.valid, false);
  });

  await t.test('validates Pro API keys and Binance Pay UID', () => {
    assert.equal(validateProApiKey('EMVAL-PRO-ALPHA-1234'), true);
    assert.equal(validateProApiKey('1049392123'), true); // Binance UID
    assert.equal(validateProApiKey(''), false);
    assert.equal(validateProApiKey('invalid'), false);
  });
});
