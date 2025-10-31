/**
 * Google Indexing API - Batch URL Submission Script
 *
 * Prerequisites:
 * 1. Enable Google Indexing API in Google Cloud Console
 * 2. Create Service Account and download JSON key
 * 3. Add service account email to Google Search Console as owner
 * 4. Install: npm install googleapis
 *
 * Usage: node scripts/submit-to-google.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.mypinjamcredit.com';
const KEY_FILE_PATH = path.join(__dirname, 'service-account-key.json'); // You need to add this file

// All URLs to submit
const URLS_TO_SUBMIT = [
  // Homepage
  `${SITE_URL}/`,
  `${SITE_URL}/en`,
  `${SITE_URL}/ms`,

  // Main Pages - English
  `${SITE_URL}/en/about`,
  `${SITE_URL}/en/products`,
  `${SITE_URL}/en/reviews`,
  `${SITE_URL}/en/blog`,
  `${SITE_URL}/en/contact`,
  `${SITE_URL}/en/apply`,
  `${SITE_URL}/en/calculator`,
  `${SITE_URL}/en/faq`,

  // Main Pages - Malay
  `${SITE_URL}/ms/about`,
  `${SITE_URL}/ms/products`,
  `${SITE_URL}/ms/reviews`,
  `${SITE_URL}/ms/blog`,
  `${SITE_URL}/ms/contact`,
  `${SITE_URL}/ms/apply`,
  `${SITE_URL}/ms/calculator`,
  `${SITE_URL}/ms/faq`,

  // Blog Posts - New SEO Content
  `${SITE_URL}/en/blog/ctos-score-complete-guide-2025`,
  `${SITE_URL}/en/blog/tekun-loan-complete-guide-2025`,
  `${SITE_URL}/en/blog/estate-workers-loan-guide-2025`,
  `${SITE_URL}/en/blog/shopee-lazada-sellers-loan-guide-2025`,
  `${SITE_URL}/en/blog/restaurant-financing-complete-guide-2025`,

  // Add more blog posts here as needed
];

/**
 * Submit URL to Google Indexing API
 */
async function submitUrl(url, action = 'URL_UPDATED') {
  try {
    // Load service account key
    const key = JSON.parse(fs.readFileSync(KEY_FILE_PATH, 'utf8'));

    // Create JWT client
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/indexing'],
      null
    );

    // Authorize
    await jwtClient.authorize();

    // Create request
    const response = await google.indexing('v3').urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: url,
        type: action, // 'URL_UPDATED' or 'URL_DELETED'
      },
    });

    return { success: true, url, response: response.data };
  } catch (error) {
    return { success: false, url, error: error.message };
  }
}

/**
 * Batch submit all URLs
 */
async function batchSubmit() {
  console.log('🚀 Starting Google Indexing API batch submission...\n');
  console.log(`📊 Total URLs to submit: ${URLS_TO_SUBMIT.length}\n`);

  const results = {
    success: [],
    failed: [],
  };

  // Submit URLs one by one (with delay to avoid rate limits)
  for (let i = 0; i < URLS_TO_SUBMIT.length; i++) {
    const url = URLS_TO_SUBMIT[i];
    console.log(`[${i + 1}/${URLS_TO_SUBMIT.length}] Submitting: ${url}`);

    const result = await submitUrl(url);

    if (result.success) {
      console.log(`✅ Success: ${url}\n`);
      results.success.push(url);
    } else {
      console.log(`❌ Failed: ${url}`);
      console.log(`   Error: ${result.error}\n`);
      results.failed.push({ url, error: result.error });
    }

    // Delay 500ms between requests to avoid rate limits
    if (i < URLS_TO_SUBMIT.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUBMISSION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📈 Success Rate: ${((results.success.length / URLS_TO_SUBMIT.length) * 100).toFixed(2)}%`);

  if (results.failed.length > 0) {
    console.log('\n❌ Failed URLs:');
    results.failed.forEach(item => {
      console.log(`   - ${item.url}: ${item.error}`);
    });
  }

  console.log('\n✨ Done!\n');
}

/**
 * Check status of a URL
 */
async function checkUrlStatus(url) {
  try {
    const key = JSON.parse(fs.readFileSync(KEY_FILE_PATH, 'utf8'));

    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/indexing'],
      null
    );

    await jwtClient.authorize();

    const response = await google.indexing('v3').urlNotifications.getMetadata({
      auth: jwtClient,
      url: url,
    });

    console.log(`\n📊 Status for ${url}:`);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(`\n❌ Error checking status: ${error.message}`);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args[0] === 'check' && args[1]) {
  // Check status of specific URL
  checkUrlStatus(args[1]);
} else if (args[0] === 'submit' && args[1]) {
  // Submit single URL
  submitUrl(args[1]).then(result => {
    if (result.success) {
      console.log(`✅ Successfully submitted: ${args[1]}`);
    } else {
      console.log(`❌ Failed to submit: ${args[1]}`);
      console.log(`Error: ${result.error}`);
    }
  });
} else {
  // Batch submit all URLs
  batchSubmit();
}
