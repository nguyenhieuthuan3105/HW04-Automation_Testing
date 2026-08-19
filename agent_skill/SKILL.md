---
name: eshop-automation-qa
description: Automated QA Testing Agent Skill for E-commerce Web Applications using Playwright, Page Object Model (POM), and Data-Driven JSON testing suites.
---

# EShop Automation QA Testing Skill

A specialized skill designed for QA engineers and AI coding assistants to conduct robust, data-driven End-to-End automation testing on e-commerce platforms.

## 🎯 Purpose & Capabilities

1. **Data-Driven Test Execution**: Parses structured test cases from `test_data/*.json` without hardcoded parameters.
2. **Page Object Model (POM) Architecture**: Modularizes UI interaction locators and methods across user storefront and admin backoffice.
3. **Multi-Role & Cross-Tab Automation**: Orchestrates realistic user order placements and admin state transitions (`pending` -> `confirmed` -> `shipping` -> `delivered` -> `canceled`).
4. **Resilient Browser Interaction**: Enforces Client-side routing clicks over full page reloads to preserve in-memory cart states.
5. **Anti-Cheat Compliance & Reporting**: Automatically stamps reports with Student ID watermark and generates HTML execution traces.

## 📁 Standard Directory Structure

```text
├── test_data/                # Structured JSON test datasets
│   ├── fr02_login_data.json
│   ├── fr08_checkout_data.json
│   └── fr13_dashboard_data.json
├── tests/
│   ├── pages/                # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── AdminPage.ts
│   ├── fr02_login.spec.ts
│   ├── fr08_checkout.spec.ts
│   └── fr13_dashboard.spec.ts
├── reports/                  # Playwright HTML execution reports
│   └── html_report/
└── playwright.config.ts      # Multi-browser & Metadata configuration
```

## 🛠️ Usage Workflow

### 1. Test Data Generation
Format all test cases with unambiguous fields: `id`, `category`, `name`, `payload`/`inputs`, and `expected` assertion targets.

### 2. Page Object Model Design
- Use robust locators prioritizing `getByRole`, `getByText`, or unique input positions.
- Provide explicit action methods (`login()`, `addProductWithQuantity()`, `advanceFirstOrderTo()`).
- Encapsulate DOM evaluation helpers for complex assertions (e.g. bounding box overflow checks).

### 3. Assertion Strategy
Always implement a minimum of 3 distinct Playwright assertion types:
- URL verification: `await expect(page).toHaveURL(...)`
- Visibility: `await expect(locator).toBeVisible()`
- Text/Content matching: `expect(actualText).toMatch(/pattern/)`
- Client-side validation: `expect(isValid).toBe(false)`
- CSS Box Layout: `expect(isOverflowing).toBe(false)`

### 4. Running Multi-Browser Tests
```bash
# Run all tests across Chromium, Firefox, WebKit
npx playwright test

# Run specific feature in interactive UI Mode
npx playwright test tests/fr02_login.spec.ts --ui
```
