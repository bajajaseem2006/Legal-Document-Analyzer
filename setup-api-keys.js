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

    // Google Gemini Configuration
    GEMINI: {
        API_KEY: process.env.GEMINI_API_KEY || '', // Set your Gemini API key
        MODEL: 'gemini-1.5-pro', // Latest Gemini model
        BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
        MAX_TOKENS: 2000,
        TEMPERATURE: 0.3
    },

    // Google Translate Configuration
    GOOGLE_TRANSLATE: {
        API_KEY: process.env.GOOGLE_TRANSLATE_API_KEY || '', // Set your Google Translate API key
        BASE_URL: 'https://translation.googleapis.com/language/translate/v2'
    },

    // Google Cloud Document AI Configuration
    GOOGLE_DOCUMENT_AI: {
        API_KEY: process.env.GOOGLE_DOCUMENT_AI_API_KEY || '', // Set your Document AI API key
        PROJECT_ID: process.env.GOOGLE_PROJECT_ID || 'your-project-id',
        LOCATION: process.env.GOOGLE_LOCATION || 'us', // us, eu, asia
        PROCESSOR_ID: process.env.DOCUMENT_AI_PROCESSOR_ID || 'your-processor-id',
        BASE_URL: 'https://documentai.googleapis.com/v1'
    },

    // Google Cloud Natural Language API Configuration
    GOOGLE_NATURAL_LANGUAGE: {
        API_KEY: process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY || '', // Set your Natural Language API key
        BASE_URL: 'https://language.googleapis.com/v1'
    },

    // Anthropic Claude Configuration (Alternative to OpenAI)
    ANTHROPIC: {
        API_KEY: process.env.ANTHROPIC_API_KEY || '', // Set your Anthropic API key
        MODEL: 'claude-3-sonnet-20240229',
        BASE_URL: 'https://api.anthropic.com/v1'
    },

    // Hugging Face Configuration (For specialized legal models)
    HUGGINGFACE: {
        API_KEY: process.env.HUGGINGFACE_API_KEY || '', // Set your Hugging Face API key
        BASE_URL: 'https://api-inference.huggingface.co/models',
        LEGAL_MODEL: 'nlpaueb/legal-bert-base-uncased', // Specialized legal model
        SUMMARIZATION_MODEL: 'facebook/bart-large-cnn',
        NER_MODEL: 'dbmdz/bert-large-cased-finetuned-conll03-english'
    }
};

// Validation function to check if required API keys are configured
function validateAPIKeys() {
    const missingKeys = [];
    const availableAI = [];
    
    // Check AI services for text generation
    if (API_CONFIG.OPENAI.API_KEY) availableAI.push('OpenAI');
    if (API_CONFIG.GEMINI.API_KEY) availableAI.push('Gemini');
    if (API_CONFIG.ANTHROPIC.API_KEY) availableAI.push('Anthropic');
    if (API_CONFIG.HUGGINGFACE.API_KEY) availableAI.push('Hugging Face');
    
    if (availableAI.length === 0) {
        missingKeys.push('At least one AI service (OpenAI, Gemini, Anthropic, or Hugging Face)');
    }
    
    // Check specific service keys
    if (!API_CONFIG.GOOGLE_TRANSLATE.API_KEY) {
        missingKeys.push('Google Translate API key (for translation)');
    }
    
    if (missingKeys.length > 0) {
        console.warn('Missing API keys:', missingKeys);
        console.log('Available AI services:', availableAI);
        return false;
    }
    
    console.log('✅ API Keys validated successfully');
    console.log('Available AI services:', availableAI);
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
            API_CONFIG.GEMINI.API_KEY = process.env.GEMINI_API_KEY || API_CONFIG.GEMINI.API_KEY;
            API_CONFIG.GOOGLE_TRANSLATE.API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || API_CONFIG.GOOGLE_TRANSLATE.API_KEY;
            API_CONFIG.GOOGLE_DOCUMENT_AI.API_KEY = process.env.GOOGLE_DOCUMENT_AI_API_KEY || API_CONFIG.GOOGLE_DOCUMENT_AI.API_KEY;
            API_CONFIG.GOOGLE_DOCUMENT_AI.PROJECT_ID = process.env.GOOGLE_PROJECT_ID || API_CONFIG.GOOGLE_DOCUMENT_AI.PROJECT_ID;
            API_CONFIG.GOOGLE_NATURAL_LANGUAGE.API_KEY = process.env.GOOGLE_NATURAL_LANGUAGE_API_KEY || API_CONFIG.GOOGLE_NATURAL_LANGUAGE.API_KEY;
            API_CONFIG.ANTHROPIC.API_KEY = process.env.ANTHROPIC_API_KEY || API_CONFIG.ANTHROPIC.API_KEY;
            API_CONFIG.HUGGINGFACE.API_KEY = process.env.HUGGINGFACE_API_KEY || API_CONFIG.HUGGINGFACE.API_KEY;
            
        } catch (error) {
            console.log('dotenv not available or .env file not found');
        }
    }
    
    // If running in browser, try to get from localStorage (for development only!)
    if (typeof window !== 'undefined') {
        API_CONFIG.OPENAI.API_KEY = localStorage.getItem('OPENAI_API_KEY') || API_CONFIG.OPENAI.API_KEY;
        API_CONFIG.GEMINI.API_KEY = localStorage.getItem('GEMINI_API_KEY') || API_CONFIG.GEMINI.API_KEY;
        API_CONFIG.GOOGLE_TRANSLATE.API_KEY = localStorage.getItem('GOOGLE_TRANSLATE_API_KEY') || API_CONFIG.GOOGLE_TRANSLATE.API_KEY;
        API_CONFIG.GOOGLE_DOCUMENT_AI.API_KEY = localStorage.getItem('GOOGLE_DOCUMENT_AI_API_KEY') || API_CONFIG.GOOGLE_DOCUMENT_AI.API_KEY;
        API_CONFIG.GOOGLE_NATURAL_LANGUAGE.API_KEY = localStorage.getItem('GOOGLE_NATURAL_LANGUAGE_API_KEY') || API_CONFIG.GOOGLE_NATURAL_LANGUAGE.API_KEY;
        API_CONFIG.ANTHROPIC.API_KEY = localStorage.getItem('ANTHROPIC_API_KEY') || API_CONFIG.ANTHROPIC.API_KEY;
        API_CONFIG.HUGGINGFACE.API_KEY = localStorage.getItem('HUGGINGFACE_API_KEY') || API_CONFIG.HUGGINGFACE.API_KEY;
    }
    
    return validateAPIKeys();
}

// Function to set API keys programmatically (for development)
function setAPIKeys(keys) {
    if (keys.openai) API_CONFIG.OPENAI.API_KEY = keys.openai;
    if (keys.gemini) API_CONFIG.GEMINI.API_KEY = keys.gemini;
    if (keys.googleTranslate) API_CONFIG.GOOGLE_TRANSLATE.API_KEY = keys.googleTranslate;
    if (keys.googleDocumentAI) API_CONFIG.GOOGLE_DOCUMENT_AI.API_KEY = keys.googleDocumentAI;
    if (keys.googleNaturalLanguage) API_CONFIG.GOOGLE_NATURAL_LANGUAGE.API_KEY = keys.googleNaturalLanguage;
    if (keys.anthropic) API_CONFIG.ANTHROPIC.API_KEY = keys.anthropic;
    if (keys.huggingface) API_CONFIG.HUGGINGFACE.API_KEY = keys.huggingface;
    if (keys.googleProjectId) API_CONFIG.GOOGLE_DOCUMENT_AI.PROJECT_ID = keys.googleProjectId;
    
    // Store in localStorage for browser environment (development only!)
    if (typeof window !== 'undefined') {
        if (keys.openai) localStorage.setItem('OPENAI_API_KEY', keys.openai);
        if (keys.gemini) localStorage.setItem('GEMINI_API_KEY', keys.gemini);
        if (keys.googleTranslate) localStorage.setItem('GOOGLE_TRANSLATE_API_KEY', keys.googleTranslate);
        if (keys.googleDocumentAI) localStorage.setItem('GOOGLE_DOCUMENT_AI_API_KEY', keys.googleDocumentAI);
        if (keys.googleNaturalLanguage) localStorage.setItem('GOOGLE_NATURAL_LANGUAGE_API_KEY', keys.googleNaturalLanguage);
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