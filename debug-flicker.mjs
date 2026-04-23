import { chromium, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = '/tmp/flicker-frames';

// Create screenshots directory
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function debugFlicker() {
  console.log('Starting flicker debug on Android Chrome (Pixel 7)...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.createContext({
    ...devices['Pixel 7'],
  });
  
  const page = await context.newPage();

  try {
    console.log('\n1. Navigating to https://www.mypinjamcredit.com/ms...');
    const response = await page.goto('https://www.mypinjamcredit.com/ms', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log(`Page status: ${response?.status()}`);
    console.log('Page loaded. Waiting 3 extra seconds for delayed components...');
    await page.waitForTimeout(3000);
    
    // Get viewport info
    const viewport = page.viewportSize();
    console.log(`Viewport: ${viewport.width}x${viewport.height}`);
    
    // Screenshot at various scroll positions
    console.log('\n2. Taking screenshots at scroll positions 0, 100, 200, 300, 400, 500, 600, 700, 800px...');
    const scrollPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800];
    
    for (const pos of scrollPositions) {
      await page.evaluate((scroll) => {
        window.scrollTo(0, scroll);
      }, pos);
      
      await page.waitForTimeout(100); // Settle after scroll
      
      const filename = `scroll-${pos}px.png`;
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, filename) });
      console.log(`  Captured: ${filename}`);
    }
    
    // Multi-frame captures at the same scroll position to detect flicker
    console.log('\n3. Taking 5 consecutive frames at scroll=200px (200ms apart) to detect non-scroll repaints...');
    await page.evaluate(() => {
      window.scrollTo(0, 200);
    });
    
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(200);
      const filename = `flicker-at-scroll200-frame${i}.png`;
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, filename) });
      console.log(`  Captured: ${filename}`);
    }
    
    // Dump animation/transition info and fixed elements
    console.log('\n4. Analyzing animations, transitions, and fixed/sticky elements...');
    const analysis = await page.evaluate(() => {
      const result = {
        animations: [],
        transitions: [],
        fixedElements: [],
        stickyElements: [],
        paintEntries: [],
        animatingElements: [],
        elementsWithBackdropFilter: []
      };
      
      // Get all elements and check their computed styles
      const allElements = document.querySelectorAll('*');
      
      allElements.forEach((el, idx) => {
        const style = window.getComputedStyle(el);
        const animation = style.animation;
        const transition = style.transition;
        const position = style.position;
        const backdropFilter = style.backdropFilter;
        
        if (animation && animation !== 'none') {
          result.animations.push({
            selector: el.className || el.tagName,
            animation: animation,
            element: el.tagName,
            textContent: el.textContent?.substring(0, 50) || ''
          });
        }
        
        if (transition && transition !== 'none') {
          result.transitions.push({
            selector: el.className || el.tagName,
            transition: transition,
            element: el.tagName,
            textContent: el.textContent?.substring(0, 50) || ''
          });
        }
        
        if (position === 'fixed') {
          result.fixedElements.push({
            selector: el.className || el.tagName,
            element: el.tagName,
            zIndex: style.zIndex,
            backdropFilter: style.backdropFilter,
            textContent: el.textContent?.substring(0, 30) || ''
          });
        }
        
        if (position === 'sticky') {
          result.stickyElements.push({
            selector: el.className || el.tagName,
            element: el.tagName,
            textContent: el.textContent?.substring(0, 30) || ''
          });
        }

        if (backdropFilter && backdropFilter !== 'none') {
          result.elementsWithBackdropFilter.push({
            selector: el.className || el.tagName,
            element: el.tagName,
            backdropFilter: backdropFilter,
            position: position,
            textContent: el.textContent?.substring(0, 30) || ''
          });
        }
      });
      
      // Get paint timing entries
      if (performance.getEntriesByType) {
        result.paintEntries = performance.getEntriesByType('paint').map(e => ({
          name: e.name,
          startTime: e.startTime,
          duration: e.duration
        }));
      }
      
      // Get animation frames/requestanimationframe activity
      const getAnimations = () => {
        try {
          return document.getAnimations().map(anim => ({
            id: anim.id,
            playState: anim.playState,
            effect: anim.effect ? anim.effect.getTiming ? JSON.stringify(anim.effect.getTiming()) : 'timing' : 'no effect'
          }));
        } catch (e) {
          return [];
        }
      };
      
      result.animatingElements = getAnimations();
      
      return result;
    });
    
    console.log('\nAnimations found:');
    if (analysis.animations.length > 0) {
      analysis.animations.forEach(a => {
        console.log(`  - ${a.element} (${a.selector}): ${a.animation}`);
      });
    } else {
      console.log('  None');
    }
    
    console.log('\nTransitions found:');
    if (analysis.transitions.length > 0) {
      analysis.transitions.forEach(t => {
        console.log(`  - ${t.element} (${t.selector}): ${t.transition}`);
      });
    } else {
      console.log('  None');
    }
    
    console.log('\nFixed positioned elements:');
    if (analysis.fixedElements.length > 0) {
      analysis.fixedElements.forEach(f => {
        console.log(`  - ${f.element} (${f.selector}): zIndex=${f.zIndex}, backdropFilter=${f.backdropFilter}`);
      });
    } else {
      console.log('  None');
    }

    console.log('\nElements with backdrop-filter:');
    if (analysis.elementsWithBackdropFilter.length > 0) {
      analysis.elementsWithBackdropFilter.forEach(f => {
        console.log(`  - ${f.element} (${f.selector}): ${f.backdropFilter} (position=${f.position})`);
      });
    } else {
      console.log('  None');
    }
    
    console.log('\nSticky positioned elements:');
    if (analysis.stickyElements.length > 0) {
      analysis.stickyElements.forEach(s => {
        console.log(`  - ${s.element} (${s.selector})`);
      });
    } else {
      console.log('  None');
    }
    
    console.log('\nPaint entries:');
    if (analysis.paintEntries.length > 0) {
      analysis.paintEntries.forEach(p => {
        console.log(`  - ${p.name} at ${p.startTime}ms`);
      });
    } else {
      console.log('  None');
    }
    
    console.log('\nActive Web Animations:');
    if (analysis.animatingElements.length > 0) {
      analysis.animatingElements.forEach(a => {
        console.log(`  - Animation: ${a.playState}`);
      });
    } else {
      console.log('  None');
    }
    
    // Save detailed analysis
    fs.writeFileSync(
      path.join(SCREENSHOTS_DIR, 'analysis.json'),
      JSON.stringify(analysis, null, 2)
    );
    
    console.log('\n5. Checking for React rerenders and style changes during scroll...');
    
    // Monitor mutations at scroll position 200
    await page.goto('https://www.mypinjamcredit.com/ms', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const mutationData = await page.evaluate(async () => {
      return new Promise((resolve) => {
        const mutations = [];
        const observer = new MutationObserver((list) => {
          for (const mutation of list) {
            mutations.push({
              type: mutation.type,
              target: mutation.target.tagName,
              className: mutation.target.className,
              subtree: mutation.subtree,
              attributeName: mutation.attributeName,
              count: mutation.addedNodes.length + mutation.removedNodes.length
            });
          }
        });
        
        observer.observe(document.body, {
          subtree: true,
          attributes: true,
          characterData: false,
          childList: true,
          attributeFilter: ['style', 'class']
        });
        
        window.scrollTo(0, 200);
        
        setTimeout(() => {
          observer.disconnect();
          resolve(mutations.slice(0, 30)); // First 30 mutations
        }, 2000);
      });
    });
    
    console.log('\nDOM mutations during scroll to 200px (first 30):');
    mutationData.forEach(m => {
      console.log(`  - ${m.type} on ${m.className || m.target} (attr: ${m.attributeName})`);
    });
    
    fs.writeFileSync(
      path.join(SCREENSHOTS_DIR, 'mutations.json'),
      JSON.stringify(mutationData, null, 2)
    );
    
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await context.close();
    await browser.close();
    console.log(`\nScreenshots saved to: ${SCREENSHOTS_DIR}`);
  }
}

debugFlicker().catch(console.error);
