# SEO 功能使用指南

## 已实施的 SEO 功能

### 1. Google Search Console 验证 ✅
**文件位置:** `/public/google664199751d1f6894.html`

**使用方法:**
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加你的网站 `https://www.mypinjamcredit.com`
3. 选择 "HTML 文件" 验证方法
4. Google 会自动验证该文件
5. 验证成功后，你可以查看：
   - 搜索性能数据
   - 索引覆盖率
   - 移动可用性
   - Core Web Vitals

### 2. FAQ Schema (FAQPage) ✅
**文件位置:** `/src/app/[locale]/faq/page.tsx`

**功能:**
- 自动生成 FAQ 结构化数据
- 帮助 Google 在搜索结果中显示 FAQ rich snippets
- 提高点击率（CTR）

**效果预览:**
搜索结果中可能显示：
```
MyPinjam Credit - FAQ
▼ How long does the application process take?
  Our online application takes just 5-10 minutes...
▼ What are the basic eligibility criteria?
  You must be: (1) A Malaysian citizen...
```

### 3. 面包屑导航 + BreadcrumbList Schema ✅
**文件位置:** `/src/components/Breadcrumbs.tsx`

**功能:**
- 所有页面自动显示面包屑导航
- 生成 BreadcrumbList 结构化数据
- 帮助 Google 理解网站结构

**显示位置:**
- 显示在每个页面内容顶部（主页除外）
- 例如：Home > Products > Personal Loan

**SEO 好处:**
- 改善用户体验
- 降低跳出率
- 在搜索结果中显示面包屑路径

### 4. Review Schema 支持 ✅
**文件位置:** `/src/components/ReviewSchema.tsx`

**使用方法:**
```tsx
import { ReviewSchema } from '@/components/ReviewSchema';

const reviews = [
  {
    author: 'Ahmad bin Ali',
    rating: 5,
    reviewBody: 'Excellent service! Fast approval and competitive rates.',
    datePublished: '2025-01-15'
  },
  {
    author: 'Siti Nurhaliza',
    rating: 4.5,
    reviewBody: 'Professional team, helpful throughout the process.',
    datePublished: '2025-01-10'
  }
];

// 在页面中添加
<ReviewSchema reviews={reviews} />
```

**效果:**
- 在搜索结果中显示星级评分
- 显示评价数量
- 提高信任度和点击率

### 5. Open Graph 图片 ✅
**文件位置:** `/src/app/[locale]/opengraph-image.tsx`

**功能:**
- 动态生成 1200x630 社交媒体分享图片
- 包含品牌信息和统计数据
- 在 Facebook、LinkedIn、Twitter 分享时显示

**预览:**
```
┌─────────────────────────────┐
│   MyPinjam Credit           │
│   Howard Loan Advisor       │
│                             │
│   5000+      RM 100M+  4.9  │
│   Customers  Funded    Rating│
└─────────────────────────────┘
```

### 6. 优化的 Sitemap ✅
**文件位置:** `/src/app/sitemap.ts`

**改进:**
- 主页：每日更新频率
- 博客：每周更新频率
- 其他页面：每月更新频率
- 包含所有语言版本（EN/MS）
- 正确的优先级设置

**访问:** `https://www.mypinjamcredit.com/sitemap.xml`

### 7. 完整的 Meta 标签 ✅
每个页面都包含：
- Title (针对 SEO 优化)
- Description
- Canonical URL
- Language alternates (hreflang)
- Open Graph tags
- Twitter Card tags
- Robots meta

### 8. 结构化数据 ✅
已实施的 Schema.org 类型：
- **FinancialService** (主页)
- **Organization** (全局)
- **FAQPage** (FAQ 页面)
- **BreadcrumbList** (所有页面)
- **Review/AggregateRating** (当添加评价时)

---

## 如何验证 SEO 实施

### 1. 使用 Google Rich Results Test
1. 访问：https://search.google.com/test/rich-results
2. 输入页面 URL
3. 查看检测到的结构化数据

### 2. 使用 Schema Markup Validator
1. 访问：https://validator.schema.org/
2. 输入页面 URL 或粘贴代码
3. 验证结构化数据格式

### 3. 检查 Meta 标签
在浏览器中：
1. 右键点击 > 查看页面源代码
2. 搜索 `<meta` 查看所有 meta 标签
3. 搜索 `application/ld+json` 查看结构化数据

### 4. 使用浏览器扩展
推荐扩展：
- **META SEO Inspector** (Chrome)
- **SEO Meta in 1 Click** (Chrome/Firefox)
- **Structured Data Testing Tool**

---

## 下一步行动

### 立即可做：
1. ✅ 在 Google Search Console 验证网站
2. 📝 添加真实的客户评价到网站
3. 📸 优化所有图片的 alt 文本
4. ✍️ 开始创建博客内容

### 本月内完成：
1. 📝 创建 5-10 篇博客文章
2. 🗺️ 创建 Google 我的商家资料
3. 📧 收集更多客户评价
4. 🔗 建立本地引用链接

### 持续优化：
1. 每周监控 Google Search Console
2. 每月分析搜索性能
3. 定期更新内容
4. 持续收集评价

---

## 监控 SEO 表现

### Google Search Console 关键指标：
- **点击次数** - 多少人点击了你的网站
- **展示次数** - 你的网站在搜索中显示了多少次
- **点击率 (CTR)** - 点击次数 ÷ 展示次数
- **平均排名** - 你的网站在搜索结果中的平均位置
- **索引覆盖率** - 哪些页面被 Google 索引
- **Core Web Vitals** - 页面性能指标

### 目标设定：
- CTR > 3%（首月）
- CTR > 5%（3个月后）
- 平均排名 < 10（进入首页）
- Core Web Vitals 全绿

---

## 常见问题

### Q: 多久能看到 SEO 效果？
A: 通常需要 3-6 个月。Google 需要时间爬取、索引和排名你的网站。

### Q: 如何添加更多评价？
A: 使用 `ReviewSchema` 组件：
```tsx
const customerReviews = [
  // 添加你的评价数据
];
<ReviewSchema reviews={customerReviews} />
```

### Q: 面包屑导航可以自定义吗？
A: 可以！编辑 `/src/components/Breadcrumbs.tsx` 自定义显示逻辑和样式。

### Q: 如何检查结构化数据是否正确？
A: 使用 Google Rich Results Test: https://search.google.com/test/rich-results

---

## 技术支持

如果遇到问题或需要进一步优化：
1. 检查 Google Search Console 的错误报告
2. 使用 Schema 验证工具
3. 查看 Next.js 文档：https://nextjs.org/docs/app/building-your-application/optimizing/metadata
4. 参考 Schema.org 文档：https://schema.org/
