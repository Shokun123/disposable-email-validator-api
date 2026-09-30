import { DISPOSABLE_DOMAINS } from '../data/disposable-domains.js';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return {
      email: '',
      valid: false,
      disposable: false,
      domain: '',
      reason: 'Empty or non-string email provided',
      riskScore: 'HIGH'
    };
  }

  const clean = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(clean)) {
    return {
      email: clean,
      valid: false,
      disposable: false,
      domain: '',
      reason: 'Invalid email syntax format',
      riskScore: 'HIGH'
    };
  }

  const parts = clean.split('@');
  const user = parts[0];
  const domain = parts[1];

  const isDisposable = DISPOSABLE_DOMAINS.has(domain);

  let riskScore = 'LOW';
  let reason = 'Valid format and domain';

  if (isDisposable) {
    riskScore = 'CRITICAL';
    reason = 'Known temporary/disposable burner email service';
  }

  return {
    email: clean,
    valid: !isDisposable,
    disposable: isDisposable,
    user,
    domain,
    reason,
    riskScore,
    verifiedAt: new Date().toISOString()
  };
}

export function validateProApiKey(apiKey) {
  if (!apiKey || typeof apiKey !== 'string') return false;
  const clean = apiKey.trim().toUpperCase();
  return clean.startsWith('EMVAL-PRO-') || clean.startsWith('BPS-PRO-') || /^[0-9]{8,12}$/.test(clean);
}
