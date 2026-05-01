---
name: cloudflare-sheets-ecommerce
description: A specialized skill for building and deploying high-performance, lightweight e-commerce websites using Next.js on Cloudflare Pages, with Google Sheets serving as the admin panel (headless CMS). This skill provides architectural patterns, zero-cache data fetching strategies, and Cloudflare-specific deployment configurations. Use this skill whenever a user wants to build a new store, connect a frontend to Google Sheets, or optimize a Sheets-to-Site storefront.
---

# cloudflare-sheets-ecommerce

This skill automates the creation of high-performance e-commerce sites leveraging Cloudflare's Edge network and Google Sheets for simple, real-time management.

## Mandatory Implementation Workflow
**ALWAYS use Plan Mode first.** 
Before writing any code or modifying files, you MUST create a detailed plan in the `plans/` directory. This plan should map out:
1. Data Schema (Google Sheet columns mapping).
2. Component Architecture.
3. Cloudflare Deployment configurations.
4. WhatsApp checkout logic.

## Core Technical Patterns

### 1. Cloudflare Pages Optimization (Official Best Practices)
- **Runtime:** Every server-side file (layouts, pages, APIs) must export `export const runtime = 'edge';`.
- **Compatibility Flags:** In Cloudflare Dashboard, always enable `nodejs_compat`. Ensure `compatibility_date` is at least `2022-11-30`.
- **Environment Variables:** Always set `NODE_VERSION` to `18` or higher (e.g., `18.18.0`).
- **Build Settings:**
  - **Build command:** `npx @cloudflare/next-on-pages@1`
  - **Output directory:** `.vercel/output/static`
- **Dependencies:** Install `@cloudflare/next-on-pages` as a dev dependency.

### 2. Google Sheets "Admin Panel" (Zero-Cache Strategy)
To avoid the 5-15 minute "Publish to Web" delay, use the **Google Visualization API** endpoint:
- **URL Pattern:** `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&sheet=SHEET_NAME`
- **Fetching:** Use `fetch()` with these headers to defeat Next.js and CDN caching:
  ```typescript
  const response = await fetch(URL, {
    method: 'GET',
    headers: { 'Accept': 'text/csv', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
    next: { revalidate: 0 } // Critical for Next.js 15+
  });
  ```

### 3. WhatsApp Checkout System
- **Cart Logic:** Maintain a global `CartContext` with `localStorage` persistence.
- **Checkout:** Generate a formatted WhatsApp message containing:
  - Product List (Name & Quantity).
  - Price Breakdown.
  - Total Estimate.
  - Deep links for direct product inquiries.

### 4. Robust CSV Parser Snippet
Always implement this pattern to handle commas within quoted descriptions:
```typescript
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      if (inQuotes && csvText[i+1] === '"') { currentCell += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      currentRow.push(currentCell.trim());
      if (currentRow.length > 0 && currentRow.some(cell => cell !== '')) rows.push(currentRow);
      currentRow = []; currentCell = '';
    } else { currentCell += char; }
  }
  if (currentCell || currentRow.length > 0) { currentRow.push(currentCell.trim()); rows.push(currentRow); }
  return rows;
}
```

## Success Criteria
- Deployment passes with `nodejs_compat` enabled.
- Website reflects Google Sheet updates in near real-time (bypassing standard pub cache).
- "Checkout" generates a perfectly formatted WhatsApp message with zero data loss.
