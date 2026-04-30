# Graph Report - .  (2026-04-26)

## Corpus Check
- Corpus is ~5,505 words - fits in a single context window. You may not need a graph.

## Summary
- 62 nodes · 34 edges · 10 communities detected
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_WhatsApp Order Flow|WhatsApp Order Flow]]
- [[_COMMUNITY_Project Metadata & Strategy|Project Metadata & Strategy]]
- [[_COMMUNITY_Data Fetching (Google Sheets)|Data Fetching (Google Sheets)]]
- [[_COMMUNITY_Cart State Management|Cart State Management]]
- [[_COMMUNITY_Main App Layout|Main App Layout]]
- [[_COMMUNITY_Root Configuration|Root Configuration]]
- [[_COMMUNITY_AI Agent Rules|AI Agent Rules]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]

## God Nodes (most connected - your core abstractions)
1. `Kids Choice Boutique Dubai` - 6 edges
2. `generateWhatsAppLink()` - 4 edges
3. `loadData()` - 3 edges
4. `handleSubmit()` - 3 edges
5. `handleWhatsAppOrder()` - 3 edges
6. `LayoutContent()` - 3 edges
7. `useCart()` - 3 edges
8. `getProductsFromSheet()` - 3 edges
9. `RootLayout()` - 2 edges
10. `ClientLayout()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Branding` --references--> `Kids Choice Boutique Dubai`  [INFERRED]
  public/next.svg → README.md
- `Vercel Branding` --references--> `Kids Choice Boutique Dubai`  [INFERRED]
  public/vercel.svg → README.md
- `LayoutContent()` --calls--> `useCart()`  [INFERRED]
  C:\Users\Danish\Desktop\kids-choice-boutique\src\components\features\ClientLayout.tsx → C:\Users\Danish\Desktop\kids-choice-boutique\src\context\CartContext.tsx
- `Global Cart State Refactor` --implements--> `Kids Choice Boutique Dubai`  [INFERRED]
  GEMINI.md → README.md
- `loadData()` --calls--> `getProductsFromSheet()`  [INFERRED]
  C:\Users\Danish\Desktop\kids-choice-boutique\src\app\catalog\page.tsx → C:\Users\Danish\Desktop\kids-choice-boutique\src\lib\data-service.ts

## Communities

### Community 0 - "WhatsApp Order Flow"
Cohesion: 0.22
Nodes (3): handleWhatsAppOrder(), handleSubmit(), generateWhatsAppLink()

### Community 1 - "Project Metadata & Strategy"
Cohesion: 0.25
Nodes (8): Global Cart State Refactor, Cloudflare Pages Migration, Robust CSV Parser Restoration, Next.js Branding, Kids Choice Boutique Dubai, Mobile-First App UI Pattern, WhatsApp Bespoke Order Engine, Vercel Branding

### Community 2 - "Data Fetching (Google Sheets)"
Cohesion: 0.33
Nodes (3): getProductsFromSheet(), parseCSVLine(), loadData()

### Community 3 - "Cart State Management"
Cohesion: 0.67
Nodes (2): CartProvider(), useCart()

### Community 4 - "Main App Layout"
Cohesion: 0.67
Nodes (2): ClientLayout(), LayoutContent()

### Community 5 - "Root Configuration"
Cohesion: 0.67
Nodes (1): RootLayout()

### Community 6 - "AI Agent Rules"
Cohesion: 1.0
Nodes (2): Next.js Version Warning, Claude Agents Reference

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (1): File Icon

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (1): Globe/Web Icon

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (1): Browser Window Icon

## Knowledge Gaps
- **11 isolated node(s):** `Next.js Version Warning`, `Claude Agents Reference`, `Global Cart State Refactor`, `Robust CSV Parser Restoration`, `WhatsApp Bespoke Order Engine` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Cart State Management`** (4 nodes): `CartContext.tsx`, `CartProvider()`, `useCart()`, `CartContext.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Main App Layout`** (4 nodes): `ClientLayout.tsx`, `ClientLayout()`, `LayoutContent()`, `ClientLayout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Configuration`** (3 nodes): `layout.tsx`, `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AI Agent Rules`** (2 nodes): `Next.js Version Warning`, `Claude Agents Reference`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `File Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `Globe/Web Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `Browser Window Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 3 inferred relationships involving `Kids Choice Boutique Dubai` (e.g. with `Global Cart State Refactor` and `Next.js Branding`) actually correct?**
  _`Kids Choice Boutique Dubai` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `generateWhatsAppLink()` (e.g. with `handleSubmit()` and `handleWhatsAppOrder()`) actually correct?**
  _`generateWhatsAppLink()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Next.js Version Warning`, `Claude Agents Reference`, `Global Cart State Refactor` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._