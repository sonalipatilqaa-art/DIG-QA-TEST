import { chromium } from 'playwright';
import 'dotenv/config';
import path from 'path';

async function generateAuth() {
    // 1. Launch with httpCredentials to bypass native dialogs immediately
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        httpCredentials: {
            username: process.env.LOGIN_USER || 'tomsmith',
            password: process.env.LOGIN_PASS || 'SuperSecretPassword!'
        }
    });

    const page = await context.newPage();

    try {
        console.log('🚀 Navigating to login page...');
        await page.goto('https://the-internet.herokuapp.com/login');

        // 2. Fill the HTML Form (specific to login.feature)
        await page.fill('#username', process.env.LOGIN_USER || 'tomsmith');
        await page.fill('#password', process.env.LOGIN_PASS || 'SuperSecretPassword!');
        await page.click('button[type="submit"]');

        // 3. Wait for success
        await page.waitForURL('**/secure');
        
        // 4. Save the "Golden State"
        await context.storageState({ path: 'auth.json' });
        console.log('✅ Success! auth.json generated.');

    } catch (error) {
        console.error('❌ Auth generation failed:', error.message);
    } finally {
        await browser.close();
    }
}

generateAuth();