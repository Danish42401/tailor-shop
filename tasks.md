# 📋 Tasks for Codebase Improvement

This file contains all tasks derived from the plan.md. Mark tasks as completed as you progress.

---

## 🔴 Phase 1: Critical Security Fixes

### Task 1.1: Fix XSS Vulnerability in ProductDetailClient
- [ ] Install DOMPurify: `npm install isomorphic-dompurify`
- [ ] Create `lib/sanitize.ts` utility file
- [ ] Create `components/ui/SafeHtml.tsx` component
- [ ] Replace `dangerouslySetInnerHTML` with SafeHtml in ProductDetailClient.tsx:333
- [ ] Test that HTML descriptions render correctly
- [ ] Verify malicious scripts are stripped

**Files to modify:**
- `app/[locale]/products/[slug]/ProductDetailClient.tsx`
- New: `lib/sanitize.ts`
- New: `components/ui/SafeHtml.tsx`

---

### Task 1.2: Remove Exposed API Key from .env.example
- [ ] Open `.env.example`
- [ ] Replace real Resend API key with placeholder
- [ ] Add helpful comment
- [ ] Verify no other secrets exposed

**Before:**
```env
RESEND_API_KEY=re_X7y5Drfd_MeWdCAM5JSYfPErcZGCf3FUo
```

**After:**
```env
RESEND_API_KEY=your_resend_api_key_here  # Get from https://resend.com
```

---

### Task 1.3: Fix Hardcoded Fallback Email
- [ ] Open `lib/email/resend.ts`
- [ ] Remove hardcoded fallback email
- [ ] Add error throw for missing env var
- [ ] Update error message

**Files to modify:**
- `lib/email/resend.ts`

---

## 🟠 Phase 2: API & Input Validation

### Task 2.1: Create Validation Schemas
- [ ] Create `lib/validation.ts`
- [ ] Define CartItem schema with Zod
- [ ] Define CheckoutFormValues schema with Zod
- [ ] Define OrderRequest schema
- [ ] Export all schemas

**New file:** `lib/validation.ts`

---

### Task 2.2: Add Input Validation to Order API
- [ ] Open `app/api/order/route.ts`
- [ ] Import validation schemas
- [ ] Add request body validation
- [ ] Return 400 with error details if validation fails
- [ ] Add proper error handling

**Files to modify:**
- `app/api/order/route.ts`

---

### Task 2.3: Add Rate Limiting
- [ ] Install rate limiting: `npm install @upstash/ratelimit @upstash/redis`
- [ ] Create `lib/rateLimit.ts` utility
- [ ] Configure rate limits (5 requests per minute for order, 1 per hour for daily-summary)
- [ ] Apply to order API route
- [ ] Apply to daily-summary API route
- [ ] Return 429 status with retry-after header

**New file:** `lib/rateLimit.ts`
**Files to modify:**
- `app/api/order/route.ts`
- `app/api/daily-summary/route.ts`

---

### Task 2.4: Fix Empty Catch Block in CheckoutClient
- [ ] Open `app/[locale]/checkout/CheckoutClient.tsx`
- [ ] Add error logging: `console.error('Order email failed:', err)`
- [ ] Add user feedback (toast or alert)
- [ ] Consider adding retry logic
- [ ] Test error scenario

**Files to modify:**
- `app/[locale]/checkout/CheckoutClient.tsx`

---

## 🟡 Phase 3: Bug Fixes & Code Quality

### Task 3.1: Fix Phone Validation for International Support
- [ ] Open `components/checkout/CheckoutForm.tsx`
- [ ] Change phone validation regex
- [ ] Support international formats
- [ ] Add helper text
- [ ] Test with various phone formats

**Options:**
- Option A: Generic validation (min 8, max 15 chars)
- Option B: Support specific countries (UAE + International)
- Option C: Use libphonenumber-js library

**Files to modify:**
- `components/checkout/CheckoutForm.tsx`

---

### Task 3.2: Fix Race Condition in Cart Store
- [ ] Open `store/cartStore.ts`
- [ ] Review addItem logic
- [ ] Ensure proper state updates
- [ ] Consider using immer middleware
- [ ] Test rapid add-to-cart clicks

**Files to modify:**
- `store/cartStore.ts`

---

### Task 3.3: Fix useEffect Cleanup in SearchModal
- [ ] Open `components/search/SearchModal.tsx`
- [ ] Add timeout ref
- [ ] Clear timeout in cleanup function
- [ ] Test rapid open/close of search

**Files to modify:**
- `components/search/SearchModal.tsx`

---

### Task 3.4: Fix Cloudinary URL Parsing
- [ ] Open `lib/cloudinary.ts`
- [ ] Add try-catch around URL parsing
- [ ] Better fallback handling
- [ ] Add URL validation
- [ ] Test with various URL formats

**Files to modify:**
- `lib/cloudinary.ts`

---

### Task 3.5: Remove Unused Import
- [ ] Open `app/[locale]/products/[slug]/ProductDetailClient.tsx`
- [ ] Remove `Image from 'next/image'` import
- [ ] Run `npm run lint` to check for other unused imports
- [ ] Fix any other lint issues found

**Files to modify:**
- `app/[locale]/products/[slug]/ProductDetailClient.tsx`

---

### Task 3.6: Fix Missing Dependencies in useEffect
- [ ] Run `npm run lint` or check React warnings
- [ ] Fix missing dependencies in useEffect hooks
- [ ] Test affected components

**Files to check:**
- `components/search/SearchModal.tsx`
- `components/cart/CartDrawer.tsx`
- Other components with useEffect

---

## 🟢 Phase 4: Performance Improvements

### Task 4.1: Optimize Product Data Loading
- [ ] Review `app/[locale]/layout.tsx`
- [ ] Consider caching strategy
- [ ] Use React.memo for SearchModal
- [ ] Optimize getAllProducts if needed
- [ ] Test performance impact

**Files to modify:**
- `app/[locale]/layout.tsx`
- `lib/products.ts` (if needed)

---

### Task 4.2: Add Image Optimization Fallback
- [ ] Open `lib/cloudinary.ts`
- [ ] Add error handler for invalid URLs
- [ ] Ensure fallback to placeholder works
- [ ] Test with broken URLs

**Files to modify:**
- `lib/cloudinary.ts`
- `components/ui/CloudinaryImage.tsx` (if exists)

---

### Task 4.3: Optimize Search Re-renders
- [ ] Open `components/search/SearchModal.tsx`
- [ ] Add debouncing to search input (300ms)
- [ ] Use useMemo for search results
- [ ] Optimize Fuse.js configuration
- [ ] Test search performance

**Files to modify:**
- `components/search/SearchModal.tsx`

---

## 🔵 Phase 5: Accessibility & Polish

### Task 5.1: Add Missing Form Labels
- [ ] Audit all form inputs in checkout
- [ ] Ensure each input has associated label
- [ ] Add aria-label where visible label isn't appropriate
- [ ] Test with screen reader

**Files to modify:**
- `components/checkout/CheckoutForm.tsx`
- Other form components

---

### Task 5.2: Improve Focus Management in Modals
- [ ] Review `CartDrawer.tsx`
- [ ] Review `SearchModal.tsx`
- [ ] Add focus trap using useFocusTrap hook or similar
- [ ] Return focus to trigger element on close
- [ ] Add focus-visible styles

**Files to modify:**
- `components/cart/CartDrawer.tsx`
- `components/search/SearchModal.tsx`

---

### Task 5.3: Audit Color Contrast
- [ ] Run Lighthouse accessibility audit
- [ ] Check color contrast ratios
- [ ] Adjust colors that fail WCAG AA (4.5:1 for text)
- [ ] Document color palette with contrast values

**Files to check:**
- `tailwind.config.ts`
- `app/globals.css`
- All component files

---

## ✅ Testing Phase

### Task 6.1: Unit Tests
- [ ] Test sanitization utility
- [ ] Test validation schemas
- [ ] Test cart store operations
- [ ] Run `npm run test`

---

### Task 6.2: Integration Tests
- [ ] Test checkout flow end-to-end
- [ ] Test API endpoints
- [ ] Test cart operations
- [ ] Test search functionality

---

### Task 6.3: E2E Tests
- [ ] Run `npm run test:e2e`
- [ ] Fix any failing tests
- [ ] Add tests for new validation
- [ ] Test on mobile viewport

---

### Task 6.4: Manual Testing Checklist
- [ ] Add product to cart (rapid clicks)
- [ ] Complete checkout flow
- [ ] Test search functionality
- [ ] Test mobile navigation
- [ ] Test dark mode toggle
- [ ] Test form validation errors
- [ ] Test API rate limiting
- [ ] Verify emails sent correctly

---

### Task 6.5: Security Verification
- [ ] Run `npm audit`
- [ ] Check for new vulnerabilities
- [ ] Verify XSS fix works
- [ ] Verify API key not exposed
- [ ] Test with security headers

---

## 📝 Documentation

### Task 7.1: Update CLAUDE.md
- [ ] Document new validation approach
- [ ] Add security best practices section
- [ ] Update testing instructions

**Files to modify:**
- `CLAUDE.md`

---

### Task 7.2: Create SECURITY.md (Optional)
- [ ] Document security considerations
- [ ] List environment variables
- [ ] Add security contact info

**New file:** `SECURITY.md` (optional)

---

## 🎉 Completion Checklist

- [ ] All Phase 1 tasks complete
- [ ] All Phase 2 tasks complete
- [ ] All Phase 3 tasks complete
- [ ] All Phase 4 tasks complete
- [ ] All Phase 5 tasks complete
- [ ] All tests passing
- [ ] No ESLint errors
- [ ] No TypeScript errors
- [ ] Manual testing complete
- [ ] Security audit clean
- [ ] Documentation updated

---

## 📊 Progress Tracker

| Phase | Tasks | Completed | Progress |
|-------|-------|-----------|----------|
| Phase 1: Security | 3 | 0 | 0% |
| Phase 2: API Validation | 4 | 0 | 0% |
| Phase 3: Bug Fixes | 6 | 0 | 0% |
| Phase 4: Performance | 3 | 0 | 0% |
| Phase 5: Accessibility | 3 | 0 | 0% |
| Testing | 5 | 0 | 0% |
| Documentation | 2 | 0 | 0% |
| **Total** | **26** | **0** | **0%** |

---

## 🚀 Quick Start Commands

```bash
# Install new dependencies
npm install isomorphic-dompurify @upstash/ratelimit @upstash/redis

# Run tests
npm run test

# Run lint
npm run lint

# Run dev server
npm run dev

# Run e2e tests
npm run test:e2e
```

---

*Last updated: Generated with plan.md*
