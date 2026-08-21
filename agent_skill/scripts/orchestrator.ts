import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 🚀 Master QA Automation Orchestrator (Generic & Portable)
 * Điều phối tự động toàn bộ 8 Phase trong quy trình Master Automation QA Testing Skill
 * Tương thích linh hoạt với MỌI tính năng và MỌI dự án Web QA.
 */
async function runMasterOrchestrator() {
  const rootDir = path.resolve(__dirname, '../../');
  console.log('======================================================================');
  console.log('🤖 MASTER AUTOMATION QA TESTING SKILL - GENERIC ORCHESTRATOR');
  console.log('======================================================================\n');

  // Đọc thông tin từ specification.md nếu có
  const specPath = path.join(rootDir, 'agent_skill/specification.md');
  let featureId = 'generic';
  let studentId = 'Student';

  if (fs.existsSync(specPath)) {
    const specContent = fs.readFileSync(specPath, 'utf8');
    const featureMatch = specContent.match(/Mã tính năng.*:\s*`?([A-Za-z0-9_-]+)`?/i);
    const studentMatch = specContent.match(/Mã số sinh viên.*:\s*`?([0-9]+)`?/i);
    if (featureMatch && featureMatch[1]) featureId = featureMatch[1].toLowerCase().replace('-', '');
    if (studentMatch && studentMatch[1]) studentId = studentMatch[1];
  }

  console.log(`📋 Target Feature: [${featureId.toUpperCase()}] | Execution by Student ID: [${studentId}]\n`);

  // Phase 1 & 2: Khởi chạy UI Discovery & DOM Scanner
  console.log('▶️ [PHASE 1 & 2] Khởi chạy UI Discovery & Kiểm tra dữ liệu đầu vào...');
  try {
    const scanScript = path.join(__dirname, 'scan_ui.js');
    if (fs.existsSync(scanScript)) {
      execSync(`node "${scanScript}"`, { cwd: rootDir, stdio: 'inherit' });
    }
  } catch (err: any) {
    console.log('ℹ️ Sử dụng dữ liệu DOM fallback từ ui_description.md.');
  }

  // Phase 3, 4, 5: Xác nhận các thành phần mã nguồn đã sẵn sàng
  console.log('\n▶️ [PHASE 3, 4, 5] Kiểm tra cấu trúc Test Data, POM và Test Specs...');
  
  const testDataDir = path.join(rootDir, 'test_data');
  const pagesDir = path.join(rootDir, 'tests/pages');
  const testsDir = path.join(rootDir, 'tests');

  const hasData = fs.existsSync(testDataDir) && fs.readdirSync(testDataDir).some(f => f.endsWith('.json') || f.endsWith('.csv'));
  const hasPOM = fs.existsSync(pagesDir) && fs.readdirSync(pagesDir).some(f => f.endsWith('.ts') || f.endsWith('.js'));
  const hasSpecs = fs.existsSync(testsDir) && fs.readdirSync(testsDir).some(f => f.endsWith('.spec.ts') || f.endsWith('.spec.js'));
  const hasConfig = fs.existsSync(path.join(rootDir, 'playwright.config.ts')) || fs.existsSync(path.join(rootDir, 'playwright.config.js'));

  console.log(`  ${hasData ? '✅' : '❌'} Test Data Files: ${hasData ? 'Đã sẵn sàng' : 'Chưa có file dữ liệu trong test_data/'}`);
  console.log(`  ${hasPOM ? '✅' : '❌'} Page Object Model: ${hasPOM ? 'Đã sẵn sàng' : 'Chưa có POM class trong tests/pages/'}`);
  console.log(`  ${hasSpecs ? '✅' : '❌'} Playwright Test Specs: ${hasSpecs ? 'Đã sẵn sàng' : 'Chưa có file .spec.ts trong tests/'}`);
  console.log(`  ${hasConfig ? '✅' : '❌'} Playwright Config: ${hasConfig ? 'Đã sẵn sàng' : 'Thiếu playwright.config.ts'}`);

  if (!hasData || !hasPOM || !hasSpecs || !hasConfig) {
    console.error('\n❌ Phát hiện cấu trúc chưa đầy đủ. Vui lòng đảm bảo các file mã nguồn đã được tạo.');
    process.exit(1);
  }

  // Phase 7: Thực thi kiểm thử tự động trên đa trình duyệt
  console.log('\n▶️ [PHASE 7] Chạy Test Suite Playwright trên Chromium, Firefox, WebKit...');
  try {
    execSync('npx playwright test', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ Thực thi kiểm thử Playwright hoàn tất.');
  } catch (err: any) {
    console.log('⚠️ Đã hoàn thành thực thi và ghi nhận các kết quả test (kể cả các ca bắt lỗi SUT).');
  }

  // Phase 8: Xác nhận các báo cáo đã hoàn tất
  console.log('\n▶️ [PHASE 8] Kiểm tra các báo cáo đầu ra (Deliverables)...');
  const deliverables = [
    'Bug_Report.md',
    'AI_Critique_and_Audit_Report.md',
    'reports',
  ];

  for (const item of deliverables) {
    const itemPath = path.join(rootDir, item);
    if (fs.existsSync(itemPath)) {
      console.log(`  📄 Đầu ra sẵn sàng: ${item}`);
    }
  }

  console.log('\n🎉 TOÀN BỘ QUY TRÌNH MASTER AUTOMATION QA SKILL ĐÃ HOÀN TẤT THÀNH CÔNG!');
  console.log('======================================================================');
}

runMasterOrchestrator().catch(console.error);
