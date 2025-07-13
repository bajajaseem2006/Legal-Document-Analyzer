// Setup Script for Indian Legal Document Analyzer API Keys
// This script helps users configure their API keys for the application

class APISetup {
    constructor() {
        this.apiKeys = {
            openai: '',
            gemini: '',
            huggingface: '',
            azure: '',
            anthropic: ''
        };
        
        this.loadStoredKeys();
    }

    // Load API keys from localStorage
    loadStoredKeys() {
        const stored = localStorage.getItem('legalDocAnalyzer_apiKeys');
        if (stored) {
            this.apiKeys = { ...this.apiKeys, ...JSON.parse(stored) };
        }
    }

    // Save API keys to localStorage
    saveKeys() {
        localStorage.setItem('legalDocAnalyzer_apiKeys', JSON.stringify(this.apiKeys));
    }

    // Set up API keys interactively
    async setupAPIKeys() {
        console.log('🚀 Setting up API Keys for Indian Legal Document Analyzer');
        console.log('===============================================');
        
        const setupSteps = [
            {
                key: 'openai',
                name: 'OpenAI API Key',
                url: 'https://platform.openai.com/api-keys',
                description: 'For AI-powered summarization and legal Q&A',
                format: 'sk-...'
            },
            {
                key: 'gemini',
                name: 'Google Gemini API Key',
                url: 'https://aistudio.google.com/app/apikey',
                description: 'Backup AI service for text generation',
                format: 'AI...'
            },
            {
                key: 'huggingface',
                name: 'Hugging Face API Key',
                url: 'https://huggingface.co/settings/tokens',
                description: 'For entity extraction and NLP tasks',
                format: 'hf_...'
            }
        ];

        for (const step of setupSteps) {
            console.log(`\n📋 Setting up ${step.name}`);
            console.log(`   Purpose: ${step.description}`);
            console.log(`   Get key from: ${step.url}`);
            console.log(`   Format: ${step.format}`);
            
            const key = prompt(`Enter your ${step.name} (leave blank to skip):`);
            if (key && key.trim()) {
                this.apiKeys[step.key] = key.trim();
                console.log(`   ✅ ${step.name} configured successfully`);
            } else {
                console.log(`   ⏭️  ${step.name} skipped`);
            }
        }

        this.saveKeys();
        console.log('\n🎉 API Key setup complete!');
        console.log('Your keys are stored locally and will be used by the application.');
        
        return this.apiKeys;
    }

    // Test API connections
    async testConnections() {
        console.log('\n🔧 Testing API Connections...');
        
        const testResults = {};
        
        // Test OpenAI
        if (this.apiKeys.openai) {
            try {
                const response = await fetch('https://api.openai.com/v1/models', {
                    headers: {
                        'Authorization': `Bearer ${this.apiKeys.openai}`
                    }
                });
                testResults.openai = response.ok ? 'Connected ✅' : 'Failed ❌';
            } catch (error) {
                testResults.openai = 'Failed ❌';
            }
        } else {
            testResults.openai = 'Not configured ⚠️';
        }

        // Test Gemini
        if (this.apiKeys.gemini) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKeys.gemini}`);
                testResults.gemini = response.ok ? 'Connected ✅' : 'Failed ❌';
            } catch (error) {
                testResults.gemini = 'Failed ❌';
            }
        } else {
            testResults.gemini = 'Not configured ⚠️';
        }

        // Test Hugging Face
        if (this.apiKeys.huggingface) {
            try {
                const response = await fetch('https://api-inference.huggingface.co/models/bert-base-uncased', {
                    headers: {
                        'Authorization': `Bearer ${this.apiKeys.huggingface}`
                    }
                });
                testResults.huggingface = response.ok ? 'Connected ✅' : 'Failed ❌';
            } catch (error) {
                testResults.huggingface = 'Failed ❌';
            }
        } else {
            testResults.huggingface = 'Not configured ⚠️';
        }

        console.log('\n📊 Connection Test Results:');
        console.log(`   OpenAI: ${testResults.openai}`);
        console.log(`   Gemini: ${testResults.gemini}`);
        console.log(`   Hugging Face: ${testResults.huggingface}`);

        return testResults;
    }

    // Get current API configuration
    getConfig() {
        return this.apiKeys;
    }

    // Clear all stored keys
    clearKeys() {
        this.apiKeys = {
            openai: '',
            gemini: '',
            huggingface: '',
            azure: '',
            anthropic: ''
        };
        localStorage.removeItem('legalDocAnalyzer_apiKeys');
        console.log('🧹 All API keys cleared');
    }

    // Update the LegalDocumentAPIs class with stored keys
    updateAPIClass() {
        if (window.legalAPIs) {
            window.legalAPIs.config.openai.apiKey = this.apiKeys.openai;
            window.legalAPIs.config.gemini.apiKey = this.apiKeys.gemini;
            window.legalAPIs.config.huggingface.apiKey = this.apiKeys.huggingface;
            console.log('🔄 API class updated with stored keys');
        }
    }

    // Show setup instructions
    showInstructions() {
        console.log(`
🎯 Quick Setup Guide for Indian Legal Document Analyzer
=====================================================

1. GETTING API KEYS:
   
   🔑 OpenAI (Recommended)
   - Go to: https://platform.openai.com/signup
   - Create account and get $5 free credits
   - Generate API key from dashboard
   
   🔑 Google Gemini (Free Alternative)
   - Go to: https://ai.google.dev/
   - Sign up with Google account
   - Create API key (60 requests/minute free)
   
   🔑 Hugging Face (For NLP)
   - Go to: https://huggingface.co/join
   - Create account
   - Generate token from settings

2. SETUP PROCESS:
   - Run: apiSetup.setupAPIKeys()
   - Enter your API keys when prompted
   - Keys are stored locally for security

3. TESTING:
   - Run: apiSetup.testConnections()
   - Verify all APIs are working

4. USAGE:
   - Upload legal documents
   - Use AI-powered summarization
   - Ask legal questions
   - Translate documents
   - Perform semantic search

For help, visit: https://github.com/yourusername/legal-document-analyzer
        `);
    }
}

// Initialize the setup class
const apiSetup = new APISetup();

// Auto-load keys when page loads
document.addEventListener('DOMContentLoaded', () => {
    apiSetup.updateAPIClass();
    
    // Show setup button in UI
    const setupButton = document.createElement('button');
    setupButton.textContent = '⚙️ Setup API Keys';
    setupButton.className = 'export-btn';
    setupButton.style.position = 'fixed';
    setupButton.style.bottom = '20px';
    setupButton.style.right = '20px';
    setupButton.style.zIndex = '1000';
    setupButton.onclick = () => apiSetup.setupAPIKeys();
    
    document.body.appendChild(setupButton);
});

// Export for use in browser
if (typeof window !== 'undefined') {
    window.apiSetup = apiSetup;
}