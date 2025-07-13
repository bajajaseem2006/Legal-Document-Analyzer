# API Setup Guide for Indian Legal Document Analyzer

## Quick Start

Your AI agents integration issue has been resolved! I've created the missing JavaScript files that your HTML application was trying to load. Now you need to configure your API keys to enable all the AI features.

## What Was Missing

Your `lda.html` file was trying to load:
1. `api-integrations.js` ✅ **Now Created**
2. `setup-api-keys.js` ✅ **Now Created**

These files implement all the AI functionality for your legal document analyzer.

## Required API Keys

### 1. OpenAI API Key (Recommended - Primary AI Service)
- **Purpose**: Document summarization, legal Q&A, semantic search
- **How to get**:
  1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
  2. Sign up or log in
  3. Create a new API key
  4. Copy the key (starts with `sk-`)

### 2. Google Translate API Key (Required for Translation)
- **Purpose**: Multi-language translation features
- **How to get**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing one
  3. Enable the "Cloud Translation API"
  4. Go to "Credentials" → "Create credentials" → "API key"
  5. Copy the API key

### 3. Anthropic Claude API Key (Optional - Alternative to OpenAI)
- **Purpose**: Alternative AI service for summarization and Q&A
- **How to get**:
  1. Go to [Anthropic Console](https://console.anthropic.com/)
  2. Sign up or log in
  3. Create a new API key
  4. Copy the key

## Setting Up Your API Keys

### Option 1: Environment Variables (Recommended for Production)

1. **Copy your API keys from your desktop `.env` folder to this project:**
   ```bash
   # Navigate to your project directory
   cd /workspace
   
   # Copy your .env file from desktop (adjust path as needed)
   cp ~/Desktop/.env .env
   
   # Or create a new .env file
   cp .env.example .env
   ```

2. **Edit the `.env` file with your actual keys:**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Add your keys:**
   ```env
   OPENAI_API_KEY=sk-your-actual-openai-key-here
   GOOGLE_TRANSLATE_API_KEY=your-google-translate-key-here
   ANTHROPIC_API_KEY=your-anthropic-key-here
   ```

### Option 2: Direct Configuration (for Development/Testing)

You can also set the keys directly in the `setup-api-keys.js` file:

```javascript
// In setup-api-keys.js, replace the empty strings:
const API_CONFIG = {
    OPENAI: {
        API_KEY: 'sk-your-actual-openai-key-here',
        // ... rest of config
    },
    GOOGLE_TRANSLATE: {
        API_KEY: 'your-google-translate-key-here',
        // ... rest of config
    }
};
```

**⚠️ Warning**: Don't commit actual API keys to version control!

### Option 3: Browser Console (Temporary Testing)

For quick testing, you can set keys in browser console:

```javascript
// Open browser console (F12) and run:
setAPIKeys({
    openai: 'sk-your-openai-key',
    googleTranslate: 'your-google-key'
});
```

## Testing Your Setup

1. **Start a local server** (required for API calls):
   ```bash
   # Option 1: Python
   python3 -m http.server 8000
   
   # Option 2: Node.js
   npx http-server -p 8000
   
   # Option 3: PHP
   php -S localhost:8000
   ```

2. **Open your browser**:
   ```
   http://localhost:8000/lda.html
   ```

3. **Test AI features**:
   - Upload a document
   - Try document summarization
   - Ask a legal question in the chat
   - Test translation features
   - Perform semantic search

## Features Now Available

With properly configured API keys, your application will have:

✅ **AI-Powered Document Summarization**
- Multiple summary types (comprehensive, executive, key points, timeline)
- Customizable length (short, medium, long)
- Legal-focused analysis

✅ **Legal Q&A Assistant**
- Interactive chat with AI
- Indian law expertise
- Context-aware responses

✅ **Multi-language Translation**
- Support for 6+ Indian languages
- Professional legal translation
- Copy and export functionality

✅ **Semantic Search**
- AI-powered document search
- Legal precedent finding
- Case law references

## Troubleshooting

### Common Issues:

1. **"API key not configured" warnings**
   - Check your `.env` file exists and has the correct keys
   - Verify API keys are valid and not expired
   - Make sure you're serving the file via HTTP (not file://)

2. **CORS errors**
   - Always serve via HTTP server, not by opening file directly
   - Some APIs may require additional CORS configuration

3. **API rate limits**
   - OpenAI has usage limits based on your plan
   - Google Translate has quotas that may need billing enabled

4. **Translation not working**
   - Ensure Google Cloud Translation API is enabled
   - Check that billing is set up for your Google Cloud project

### Getting API Credits:

- **OpenAI**: New accounts get $5 free credits, then pay-per-use
- **Google Translate**: First 500K characters/month are free
- **Anthropic**: New accounts get free credits, then pay-per-use

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** in production
3. **Rotate API keys** regularly
4. **Monitor API usage** to prevent unexpected charges
5. **Set up usage alerts** in your API dashboards

## Next Steps

1. ✅ Configure your API keys (follow steps above)
2. ✅ Test all features with sample documents
3. ✅ Deploy to your preferred hosting platform
4. ✅ Set up proper domain and SSL for production use

Your Indian Legal Document Analyzer is now fully functional with AI integration! 🎉

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API keys are correctly formatted
3. Test with smaller documents first
4. Check API service status pages for outages

The application will gracefully fall back to demonstration mode if APIs are unavailable, so you can still test the UI without active API keys.