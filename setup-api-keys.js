// setup-api-keys.js
// API Configuration for Indian Legal Document Analyzer

// API Keys Configuration
// IMPORTANT: Never commit real API keys to version control!
// These should be loaded from environment variables or a secure .env file

const API_CONFIG = {
    // OpenAI Configuration
    OPENAI: {
        API_KEY: process.env.OPENAI_API_KEY || '', // Set your OpenAI API key here
        MODEL: 'gpt-4', // or 'gpt-3.5-turbo' for lower cost
        BASE_URL: 'https://api.openai.com/v1',
        MAX_TOKENS: 2000,
        TEMPERATURE: 0.3 // Lower temperature for more focused legal responses
    },

    // Google Translate Configuration
    GOOGLE_TRANSLATE: {
        API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY || '', // Set your Google Translate API key
        BASE_URL: 'https://translation.googleapis.com/language/translate/v2'
    },

    // Anthropic Claude Configuration (Alternative to OpenAI)
    ANTHROPIC: {
        API_KEY: process.env.ANTHROPIC_API_KEY || '', // Set your Anthropic API key
        MODEL: 'claude-3-sonnet-20240229',
        BASE_URL: 'https://api.anthropic.com/v1'
    },

    // Hugging Face Configuration (For open-source models)
    HUGGINGFACE: {
        API_KEY: process.env.HUGGINGFACE_API_KEY || '', // Set your Hugging Face API key
        BASE_URL: 'https://api-inference.huggingface.co/models'
    }
};

// Validation function to check if required API keys are configured
function validateAPIKeys() {
    const missingKeys = [];
    
    if (!API_CONFIG.OPENAI.API_KEY && !API_CONFIG.ANTHROPIC.API_KEY) {
        missingKeys.push('OpenAI or Anthropic API key (for summarization and Q&A)');
    }
    
    if (!API_CONFIG.GOOGLE_TRANSLATE.API_KEY) {
        missingKeys.push('Google Translate API key (for translation)');
    }
    
    if (missingKeys.length > 0) {
        console.warn('Missing API keys:', missingKeys);
        return false;
    }
    
    return true;
}

// Function to load API keys from environment or .env file
function loadAPIKeys() {
    // If running in Node.js environment with dotenv
    if (typeof require !== 'undefined') {
        try {
            require('dotenv').config();
            
            // Update config with environment variables
            API_CONFIG.OPENAI.API_KEY = process.env.OPENAI_API_KEY || API_CONFIG.OPENAI.API_KEY;
            API_CONFIG.GOOGLE_TRANSLATE.API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || API_CONFIG.GOOGLE_TRANSLATE.API_KEY;
            API_CONFIG.ANTHROPIC.API_KEY = process.env.ANTHROPIC_API_KEY || API_CONFIG.ANTHROPIC.API_KEY;
            API_CONFIG.HUGGINGFACE.API_KEY = process.env.HUGGINGFACE_API_KEY || API_CONFIG.HUGGINGFACE.API_KEY;
            
        } catch (error) {
            console.log('dotenv not available or .env file not found');
        }
    }
    
    // If running in browser, try to get from localStorage (for development only!)
    if (typeof window !== 'undefined') {
        API_CONFIG.OPENAI.API_KEY = localStorage.getItem('OPENAI_API_KEY') || API_CONFIG.OPENAI.API_KEY;
        API_CONFIG.GOOGLE_TRANSLATE.API_KEY = localStorage.getItem('GOOGLE_TRANSLATE_API_KEY') || API_CONFIG.GOOGLE_TRANSLATE.API_KEY;
        API_CONFIG.ANTHROPIC.API_KEY = localStorage.getItem('ANTHROPIC_API_KEY') || API_CONFIG.ANTHROPIC.API_KEY;
        API_CONFIG.HUGGINGFACE.API_KEY = localStorage.getItem('HUGGINGFACE_API_KEY') || API_CONFIG.HUGGINGFACE.API_KEY;
    }
    
    return validateAPIKeys();
}

// Function to set API keys programmatically (for development)
function setAPIKeys(keys) {
    if (keys.openai) API_CONFIG.OPENAI.API_KEY = keys.openai;
    if (keys.googleTranslate) API_CONFIG.GOOGLE_TRANSLATE.API_KEY = keys.googleTranslate;
    if (keys.anthropic) API_CONFIG.ANTHROPIC.API_KEY = keys.anthropic;
    if (keys.huggingface) API_CONFIG.HUGGINGFACE.API_KEY = keys.huggingface;
    
    // Store in localStorage for browser environment (development only!)
    if (typeof window !== 'undefined') {
        if (keys.openai) localStorage.setItem('OPENAI_API_KEY', keys.openai);
        if (keys.googleTranslate) localStorage.setItem('GOOGLE_TRANSLATE_API_KEY', keys.googleTranslate);
        if (keys.anthropic) localStorage.setItem('ANTHROPIC_API_KEY', keys.anthropic);
        if (keys.huggingface) localStorage.setItem('HUGGINGFACE_API_KEY', keys.huggingface);
    }
    
    console.log('API keys updated successfully');
    return validateAPIKeys();
}

// Initialize API keys on load
loadAPIKeys();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, validateAPIKeys, loadAPIKeys, setAPIKeys };
}