const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * 🛠️ Agent Skill Script: Automated UI Discovery & DOM Scanner (Generic)
 */

async function scanPage(url) {
  console.log(`\n🔍 [UI SCANNER] Đang quét giao diện tại: ${url}...`);
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const pageTitle = await page.title();
    console.log(`📄 Tiêu đề trang: "${pageTitle}"`);

    const elements = await page.evaluate(() => {
      const list = [];

      // 1. Quét thẻ Input & Form Controls
      document.querySelectorAll('input, select, textarea').forEach((el) => {
        const tagName = el.tagName.toUpperCase();
        const type = el.type || 'text';
        const name = el.name || '';
        const placeholder = el.placeholder || '';
        const id = el.id || '';
        const isRequired = el.required ? 'Bắt buộc (required)' : 'Tùy chọn';

        let suggested = `page.locator('${tagName.toLowerCase()}[name="${name}"]')`;
        if (placeholder) {
          suggested = `page.getByPlaceholder('${placeholder}')`;
        } else if (name) {
          suggested = `page.locator('${tagName.toLowerCase()}[name="${name}"]')`;
        } else if (id) {
          suggested = `page.locator('#${id}')`;
        }

        list.push({
          type: `${tagName} (${type})`,
          tagName,
          inputType: type,
          name,
          id,
          placeholder,
          suggestedLocator: suggested,
          behaviorNote: `${isRequired}, kiểm tra định dạng và dữ liệu đầu vào`,
        });
      });

      // 2. Quét thẻ Button & Action Controls
      document.querySelectorAll('button, input[type="submit"], [role="button"]').forEach((el) => {
        const text = el.textContent?.trim() || el.value || '';
        list.push({
          type: 'Button / Action Element',
          tagName: el.tagName,
          text,
          suggestedLocator: text ? `page.getByRole('button', { name: /${text}/i })` : `page.locator('button')`,
          behaviorNote: 'Kích hoạt hành động hoặc gửi dữ liệu form',
        });
      });

      // 3. Quét các thẻ Alert / Error / Toast Notification
      document.querySelectorAll('.alert, [role="alert"], .error, .toast, .alert-danger, .alert-success').forEach((el) => {
        const text = el.textContent?.trim() || '';
        const className = el.className || '';
        list.push({
          type: 'Alert / Toast Notification',
          tagName: el.tagName,
          text,
          suggestedLocator: el.getAttribute('role') === 'alert' ? `page.getByRole('alert')` : `page.locator('.${className.split(' ')[0]}')`,
          behaviorNote: 'Xuất hiện khi có thông báo thành công, lỗi validation hoặc cảnh báo hệ thống',
        });
      });

      // 4. Quét các thẻ Hyperlink điều hướng
      document.querySelectorAll('a[href]').forEach((el) => {
        const text = el.textContent?.trim() || '';
        const href = el.getAttribute('href') || '';
        if (text && href && !href.startsWith('#')) {
          list.push({
            type: 'Hyperlink (Navigation)',
            tagName: 'A',
            text,
            suggestedLocator: `page.getByRole('link', { name: /${text}/i })`,
            behaviorNote: `Điều hướng nội bộ (Client-side routing) tới ${href}`,
          });
        }
      });

      return list;
    });

    console.log(`✅ Phát hiện ${elements.length} phần tử tương tác.`);
    console.table(elements.map((e) => ({ Type: e.type, Locator: e.suggestedLocator, Text: e.text || e.placeholder || '' })));

    await browser.close();
    return { url, title: pageTitle, elements };
  } catch (err) {
    console.warn(`⚠️ Không thể kết nối tới ${url} (${err.message}). Sử dụng cấu trúc DOM mẫu trong ui_description.md.`);
    if (browser) await browser.close();
    return null;
  }
}

async function runUIDiscovery() {
  const rootDir = path.resolve(__dirname, '../../');
  const specPath = path.join(rootDir, 'agent_skill/specification.md');
  const urlsToScan = new Set();

  // 1. Nhận URL từ tham số CLI
  const cliUrls = process.argv.slice(2).filter((arg) => arg.startsWith('http://') || arg.startsWith('https://'));
  cliUrls.forEach((u) => urlsToScan.add(u));

  // 2. Đọc URL từ specification.md
  if (urlsToScan.size === 0 && fs.existsSync(specPath)) {
    const specContent = fs.readFileSync(specPath, 'utf8');
    const urlMatches = specContent.match(/https?:\/\/[^\s`")\]]+/g);
    if (urlMatches) {
      urlMatches.forEach((u) => {
        if (!u.includes('localhost:3000')) {
          urlsToScan.add(u);
        }
      });
    }
  }

  // 3. Fallback mặc định
  if (urlsToScan.size === 0) {
    urlsToScan.add('http://localhost:5173');
    urlsToScan.add('http://localhost:5174');
  }

  console.log('===========================================================');
  console.log('🤖 AI AGENT SKILL: BẮT ĐẦU QUY TRÌNH PHASE 2 - UI DISCOVERY');
  console.log(`🎯 Danh sách URL mục tiêu: ${Array.from(urlsToScan).join(', ')}`);
  console.log('===========================================================');

  for (const url of urlsToScan) {
    await scanPage(url);
  }

  console.log('\n✨ Quy trình UI Discovery hoàn tất!');
}

if (require.main === module) {
  runUIDiscovery().catch(console.error);
}

module.exports = { scanPage, runUIDiscovery };
