# Google Indexing API Setup Guide

## 📋 为什么要用Indexing API？

- ✅ **立即通知Google** - 不用等Google慢慢爬取（可能要几周）
- ✅ **批量提交** - 一次性提交所有URL（36个页面）
- ✅ **更快索引** - 通常24-48小时内被索引（vs 传统1-2周）
- ✅ **优先级更高** - Google会优先处理API提交的URL

---

## 🚀 设置步骤（大约15分钟）

### Step 1: 启用Google Indexing API

1. **访问Google Cloud Console:**
   - https://console.cloud.google.com/

2. **创建新项目（如果还没有）:**
   - 点击顶部项目选择器
   - 点击 "New Project"
   - 项目名称: `MyPinjam-SEO` 或任何名称
   - 点击 "Create"

3. **启用Indexing API:**
   - 在搜索框搜索: `Indexing API`
   - 点击 "Google Indexing API"
   - 点击 "Enable" 按钮

---

### Step 2: 创建Service Account

1. **进入IAM & Admin:**
   - 左侧菜单 → "IAM & Admin" → "Service Accounts"
   - 或访问: https://console.cloud.google.com/iam-admin/serviceaccounts

2. **创建Service Account:**
   - 点击 "+ CREATE SERVICE ACCOUNT"
   - Service account name: `indexing-api-bot`
   - Service account ID: `indexing-api-bot` (自动生成)
   - 点击 "CREATE AND CONTINUE"

3. **授予权限:**
   - Role: 选择 "Owner" (或者 "Service Account User")
   - 点击 "CONTINUE"
   - 点击 "DONE"

4. **创建密钥:**
   - 找到刚创建的service account
   - 点击右边的三个点 (⋮) → "Manage keys"
   - 点击 "ADD KEY" → "Create new key"
   - Key type: 选择 **JSON**
   - 点击 "CREATE"
   - **重要:** JSON文件会自动下载，保存好这个文件！

---

### Step 3: 添加Service Account到Google Search Console

这是**最重要的一步**！

1. **复制Service Account Email:**
   - 打开刚下载的JSON文件
   - 找到 `client_email` 字段
   - 复制这个email（例如: `indexing-api-bot@myproject.iam.gserviceaccount.com`）

2. **添加到Search Console:**
   - 登录 Google Search Console: https://search.google.com/search-console
   - 选择你的网站 (mypinjamcredit.com)
   - 左侧菜单 → "Settings" (设置)
   - 点击 "Users and permissions" (用户和权限)
   - 点击 "ADD USER"
   - 粘贴service account email
   - Permission level: 选择 **Owner**
   - 点击 "ADD"

**✅ 如果没做这步，脚本会失败！**

---

### Step 4: 安装依赖并配置

1. **安装googleapis:**
   ```bash
   cd /Users/User/project/hock/frontend
   npm install googleapis
   ```

2. **放置Service Account密钥文件:**
   - 将下载的JSON文件重命名为: `service-account-key.json`
   - 移动到: `/Users/User/project/hock/frontend/scripts/service-account-key.json`

   **重要安全提示:**
   ```bash
   # 添加到 .gitignore 避免上传到GitHub！
   echo "scripts/service-account-key.json" >> .gitignore
   ```

3. **验证文件路径:**
   ```bash
   ls scripts/service-account-key.json
   # 应该显示文件存在
   ```

---

### Step 5: 运行脚本

**批量提交所有URL:**
```bash
node scripts/submit-to-google.js
```

**提交单个URL:**
```bash
node scripts/submit-to-google.js submit https://www.mypinjamcredit.com/en/blog/ctos-score-complete-guide-2025
```

**检查URL索引状态:**
```bash
node scripts/submit-to-google.js check https://www.mypinjamcredit.com/en/blog/ctos-score-complete-guide-2025
```

---

## 📊 预期输出

成功运行后，你会看到：

```
🚀 Starting Google Indexing API batch submission...

📊 Total URLs to submit: 25

[1/25] Submitting: https://www.mypinjamcredit.com/
✅ Success: https://www.mypinjamcredit.com/

[2/25] Submitting: https://www.mypinjamcredit.com/en
✅ Success: https://www.mypinjamcredit.com/en

...

============================================================
📊 SUBMISSION SUMMARY
============================================================
✅ Successful: 25
❌ Failed: 0
📈 Success Rate: 100.00%

✨ Done!
```

---

## ⚠️ 常见错误和解决方法

### Error 1: "Cannot find module 'googleapis'"
**解决:**
```bash
npm install googleapis
```

### Error 2: "ENOENT: no such file or directory, open 'service-account-key.json'"
**解决:**
- 检查JSON文件是否在正确位置: `scripts/service-account-key.json`
- 检查文件名是否正确

### Error 3: "Permission denied" or "403 Forbidden"
**解决:**
- 确保service account email已添加到Google Search Console
- 确保权限是 "Owner"
- 等待5-10分钟让权限生效

### Error 4: "Quota exceeded"
**解决:**
- Indexing API有配额限制（每天200个URL）
- 脚本已经加了500ms延迟避免rate limit
- 如果还是超配额，分批次运行

---

## 📈 效果时间线

提交后：

- **立即:** Google收到通知
- **1-2小时:** Google开始爬取你的页面
- **24-48小时:** 大部分URL被索引
- **3-7天:** 开始在搜索结果中出现

**验证索引状态:**
```
在Google搜索: site:mypinjamcredit.com
```
会显示所有被索引的页面

---

## 🔄 日常使用

**什么时候要重新提交？**

✅ 发布新博客文章
✅ 更新重要页面内容
✅ 修改产品信息
✅ 添加新的Landing Page

**如何添加新URL？**

编辑 `scripts/submit-to-google.js`:
```javascript
const URLS_TO_SUBMIT = [
  // ... 现有URL

  // 添加新URL
  `${SITE_URL}/en/blog/your-new-blog-post`,
  `${SITE_URL}/en/locations/kuala-lumpur`,
];
```

然后重新运行脚本。

---

## 📞 需要帮助？

如果遇到问题：

1. 检查上述常见错误
2. 确认所有步骤都完成
3. 等待5-10分钟（权限需要时间生效）
4. 如果还是不行，告诉我错误信息！

---

## 🎯 总结

完成设置后，你可以：

✅ 批量提交所有36个URL到Google
✅ 新博客发布后立即通知Google
✅ 24-48小时内被索引（vs 传统1-2周）
✅ 更好的SEO表现

**记得:**
- Service account密钥不要上传到GitHub！
- 添加到 .gitignore
- 定期提交新内容
