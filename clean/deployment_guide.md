# Aria Clean Service &bull; Production Deployment Guide

This guide provides technical instructions for configuring the DNS infrastructure and securing email deliverability for **Aria Clean Service** (operating at `ariacleanservice.com`).

---

## 1. Custom Domain Routing (DNS Configuration)

To route your apex domain (`ariacleanservice.com`) and standard subdomains (`www.ariacleanservice.com`) safely from your domain registrar (e.g., Google Domains, GoDaddy, Cloudflare) to your host servers, establish the following primary records:

| Record Type | Host / Name | Value / Destination | TTL | Description |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (Apex) | `199.36.158.100` *(Example Host IP)* | `3600` | Points the root domain to the platform edge servers. |
| **A** | `@` (Apex) | `199.36.158.101` *(Secondary Backup)* | `3600` | Configures secondary high-availability redundant routing. |
| **CNAME** | `www` | `ariacleanservice.com.` | `3600` | Canonical alias mapping WWW queries to the apex domain. |

---

## 2. Secure Email Deliverability & Anti-Spam Records

To guarantee your automated customer receipts and transactional concierge notifications are not routed to spam folders, establish these authentications in your DNS records. These records authorize Google Workspace & Resend to dispatch mail on behalf of `@ariacleanservice.com`.

### A. Sender Policy Framework (SPF Record)
This record specifies which mail servers are permitted to send email from `@ariacleanservice.com` to prevent phishing, authorizing both Google Workspace and Resend (SES):

- **Type:** `TXT`
- **Host / Name:** `@`
- **Value:** `v=spf1 include:amazonses.com include:_spf.google.com ~all`

### B. Domain-based Message Authentication, Reporting, and Conformance (DMARC Policy)
This record instructs hosting mailboxes how to handle incoming mail that fails SPF or DKIM checks, strictly securing client engagement:

- **Type:** `TXT`
- **Host / Name:** `_dmarc`
- **Value:** `v=DMARC1; p=quarantine; pct=100; rua=mailto:contact@ariacleanservice.com`

---

## 3. Server Deployment Verification Checklist

1. **Verify Environment Variables:** Ensure that the production environment exposes the required `ADMIN_SECRET_KEY` and `RESEND_API_KEY` to protect administrative interfaces.
2. **Review Honeypot Active Status:** Confirm that `website_aria_verification` remains deployed in the public contact widget forms to prevent bulk spam robot scripts.
3. **Execute Build Commands:** Perform production bundles with `npm run build` to output optimized SPA and standalone back-end bundles sequentially.
