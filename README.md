# ⚡ Disposable Email & Domain Validator Micro-API

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Serverless-orange?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Binance Pay](https://img.shields.io/badge/Binance%20Pay-UID%201049392123-F0B90B.svg?style=flat-square&logo=binance&logoColor=white)](#-pro-unlimited-api-key--binance-pay)
[![CI Tests](https://github.com/Shokun123/disposable-email-validator-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Shokun123/disposable-email-validator-api/actions)

> **Ultra-fast (< 5ms), zero-dependency Serverless & Node.js API to detect disposable burner emails, fake registrations, and fraud domains.**  
> Protect your SaaS signup funnel from spam users, duplicate free trial abusers, and disposable inbox providers (Mailinator, 10MinuteMail, TempMail, GuerrillaMail).

---

## 🚀 Quick Start (Up in 30 Seconds)

### Run with Node.js
```bash
git clone https://github.com/Shokun123/disposable-email-validator-api.git
cd disposable-email-validator-api
npm start
# API available at http://localhost:3000
```

### Deploy to Cloudflare Workers (100k Free Requests/day)
```bash
npx wrangler deploy src/worker.js
```

---

## 📡 API Endpoint & Sample Output

### `GET /v1/verify?email=spammer@mailinator.com`

```json
{
  "email": "spammer@mailinator.com",
  "valid": false,
  "disposable": true,
  "user": "spammer",
  "domain": "mailinator.com",
  "reason": "Known temporary/disposable burner email service",
  "riskScore": "CRITICAL",
  "verifiedAt": "2026-09-30T20:55:00.000Z",
  "tier": "COMMUNITY_FREE"
}
```

---

## 💎 Pro Unlimited API Key & Binance Pay

The **Community Free Tier** allows up to 100 requests/day per IP.

### 🌟 Pro Features ($15 USDT Lifetime / Unlimited):
* **Zero Rate Limits:** Unlimited API calls.
* **Deep MX Record Resolution & DNS Verification.**
* **Custom Enterprise Whitelist / Blacklist Configuration.**

### How to Activate Pro:
1. Send **$15 USDT** via **Binance Pay** to:
   - **Binance UID:** `1049392123`
   - **Username:** `User-79a91`
   - **Networks:** BNB Smart Chain (BEP20) or Polygon Network.
2. Pass your Binance TxID or Pay ID as the `X-Api-Key` header:
   ```bash
   curl -H "X-Api-Key: 1049392123" "https://your-api.workers.dev/v1/verify?email=test@company.com"
   ```

---

## 🌐 The Shokun123 Developer Suite

* ⚡ **[Binance Pay SaaS Starter](https://github.com/Shokun123/binance-pay-saas-starter)** — Micro-SaaS Boilerplate with zero-fee crypto checkout.
* 🎯 **[Awesome CursorRules & Agent Skills](https://github.com/Shokun123/awesome-cursorrules-agent-skills)** — Curated production .cursorrules and agent skills.
* 🏛️ **[Awesome System Architecture](https://github.com/Shokun123/awesome-system-architecture-ai)** — Curated system design blueprints and AI prompts.
* 🐳 **[Docker Backup Relay](https://github.com/Shokun123/docker-backup-relay)** — Automated database backup & AES-256 encrypted relay in Docker.
* 💻 **[AI Commit Generator for VS Code](https://github.com/Shokun123/vscode-ai-commit-generator)** — Conventional commit generator for VS Code.
* 🔍 **[AI PR Code Reviewer Action](https://github.com/Shokun123/ai-pr-reviewer-action)** — GitHub Action for secret leak prevention and OWASP audits.
* 🗺️ **[Google Maps B2B Lead Extractor](https://github.com/Shokun123/google-maps-b2b-lead-scraper)** — High-performance Apify Actor for automated B2B lead generation.
* 🛡️ **[LeadRescue AI](https://shokun123.github.io/leadrescue-ai/)** — Interactive Speed-to-Lead conversion audit & lead routing.

---

## 📄 License

Distributed under the **MIT License**. Free for open-source developers.
