/**
 * 👑 QUEEN BELLA MD V1.0.1
 * LOADER - Fetches core bot from private repo
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ==========================================
// 🔐 LOAD USER CONFIG
// ==========================================

let config = {};
try {
    config = require('./config.js');
    console.log('✅ Config loaded successfully!');
} catch (e) {
    console.log('❌ Config file not found!');
    console.log('📝 Please create config.js with your Session ID');
    process.exit(1);
}

if (!config.sessionId) {
    console.log('❌ No Session ID found in config.js!');
    console.log('📱 Get your Session ID from pairing site');
    console.log('📝 Add it to config.js and restart.');
    process.exit(1);
}

// ==========================================
// 🔐 HIDDEN BOT URL (PRIVATE REPO)
// ==========================================

const BOT_URL = 'https://raw.githubusercontent.com/queenbellabots-cloud/Queen-bella-core/refs/heads/main/bot.js';

// ==========================================
// 📥 DOWNLOAD AND RUN
// ==========================================

function downloadBot() {
    console.log('👑 Loading QUEEN BELLA MD...');
    
    https.get(BOT_URL, (res) => {
        let data = '';
        
        res.on('data', (chunk) => data += chunk);
        
        res.on('end', () => {
            if (data && data.length > 100) {
                console.log('✅ Bot loaded successfully!');
                console.log('🚀 Starting QUEEN BELLA MD...');
                global.__config = config;
                eval(data);
            } else {
                console.log('❌ Failed to load bot. Retrying...');
                setTimeout(downloadBot, 5000);
            }
        });
        
    }).on('error', (err) => {
        console.log('❌ Download error:', err.message);
        console.log('🔄 Retrying in 5 seconds...');
        setTimeout(downloadBot, 5000);
    });
}

downloadBot();