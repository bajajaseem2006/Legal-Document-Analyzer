# API Integration Guide - Indian Legal Document Analyzer

## 🚀 Overview

Your Indian Legal Document Analyzer now has **real API integrations** that replace the mock data with actual AI-powered features. This guide will help you set up and use these integrations.

## 📋 What's Been Integrated

### ✅ Features Now Using Real APIs:
1. **AI-Powered Document Summarization** - Uses OpenAI GPT-3.5/4 or Google Gemini
2. **Legal Q&A Assistant** - Intelligent responses using AI models
3. **Multi-language Translation** - Real translation services
4. **Semantic Search** - AI-powered document search
5. **Entity Extraction** - Uses Hugging Face NLP models

### 🔧 Files Added/Modified:
- `api-integrations.js` - Main API integration module
- `setup-api-keys.js` - Interactive setup script
- `lda.html` - Updated with real API calls
- `free_api_keys_guide.md` - Comprehensive API key guide
- `.env.example` - Environment configuration template

## 🎯 Quick Start (3 Steps)

### Step 1: Get Free API Keys
Choose at least one of these free services:

1. **OpenAI** (Recommended) - $5 free credits
   - Sign up: https://platform.openai.com/signup
   - Go to API Keys section
   - Create new secret key

2. **Google Gemini** (Free Alternative) - 60 requests/minute
   - Sign up: https://ai.google.dev/
   - Create API key from dashboard

3. **Hugging Face** (For NLP) - 1,000 requests/month
   - Sign up: https://huggingface.co/join
   - Generate token from settings

4. **Google Cloud Document AI** (For Document Processing) - 1,000 pages/month
   - Sign up: https://cloud.google.com/document-ai
   - Enable Document AI API and get service account key

### Step 2: Configure API Keys
Open your legal document analyzer and:

1. Click the "⚙️ Setup API Keys" button (bottom right)
2. Enter your API keys when prompted
3. Keys are stored locally in your browser

**Or manually in browser console:**
```javascript
// Open browser console (F12) and run:
apiSetup.setupAPIKeys()
```

### Step 3: Test the Integration
```javascript
// Test API connections
apiSetup.testConnections()

// Check available APIs
legalAPIs.getAvailableAPIs()
```

## 🔑 API Key Setup Details

### OpenAI Setup:
1. Visit https://platform.openai.com/signup
2. Create account (get $5 free credits)
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy key (starts with `sk-`)

### Google Gemini Setup:
1. Visit https://ai.google.dev/
2. Sign in with Google account
3. Go to "Get API key" → "Create API key"
4. Copy key (starts with `AI`)

### Hugging Face Setup:
1. Visit https://huggingface.co/join
2. Create account
3. Go to Settings → Access Tokens
4. Create new token
5. Copy token (starts with `hf_`)

## 🚀 How to Use the Features

### 1. Document Summarization
- Upload a legal document
- Select document from dropdown
- Choose summary type (comprehensive, executive, key-points, timeline)
- Click "Generate Summary"
- **Now uses real AI** instead of mock data!

### 2. Legal Q&A
- Type your legal question in the chat
- **AI analyzes** your question with document context
- Get professional legal responses
- Works with Indian legal system knowledge

### 3. Translation
- Enter text to translate
- Select source and target languages
- Click "Translate"
- **Uses real translation APIs** for accuracy

### 4. Semantic Search
- Enter search query
- Select search type and jurisdiction
- Get **AI-powered search results** from your document

## 🛠️ Technical Implementation

### API Integration Architecture:
```
lda.html (UI) → api-integrations.js (API Layer) → External APIs
                     ↓
              setup-api-keys.js (Configuration)
                     ↓
              localStorage (Secure Storage)
```

### Fallback System:
- If API fails → Try backup API (OpenAI → Gemini)
- If all APIs fail → Use enhanced mock responses
- Always graceful degradation

### Security:
- API keys stored in browser localStorage
- No keys sent to external servers
- Client-side encryption recommended for production

## 📊 API Usage Limits

| Service | Free Tier | Rate Limit |
|---------|-----------|------------|
| OpenAI GPT-3.5 | $5 credits | 3 RPM |
| Google Gemini | Free | 60 RPM |
| Hugging Face | Free | 1,000/month |
| MyMemory Translate | Free | 1,000/day |
| Google Cloud Document AI | 1,000 pages/month | 600 RPM |

## 🔧 Troubleshooting

### Common Issues:

1. **"API key not configured"**
   - Run `apiSetup.setupAPIKeys()` in console
   - Check key format (OpenAI: `sk-`, Gemini: `AI`, HF: `hf_`)

2. **"API call failed"**
   - Check internet connection
   - Verify API key is valid
   - Check rate limits

3. **"Using offline mode"**
   - This is normal! App works without APIs
   - Configure keys for enhanced features

### Debug Commands:
```javascript
// Check current configuration
legalAPIs.getConfig()

// Test specific API
legalAPIs.testAPIConnection()

// Clear all keys
apiSetup.clearKeys()

// Show setup instructions
apiSetup.showInstructions()
```

## 💡 Pro Tips

1. **Start with OpenAI** - Best results for legal documents
2. **Use Gemini as backup** - Good free alternative
3. **Test with small documents first** - Avoid rate limits
4. **Monitor usage** - Check API dashboards regularly
5. **Keep keys secure** - Never share or commit to git

## 🎨 UI Enhancements

### New Visual Features:
- ✨ Typing indicators for AI responses
- 🔄 Loading states with spinners
- ⚠️ Fallback notices when APIs unavailable
- 🎯 Enhanced result formatting
- 📊 API status indicators

### Improved User Experience:
- Real-time error handling
- Graceful degradation
- Responsive loading states
- Copy/export functionality
- Voice synthesis for translations

## 🚀 Next Steps

1. **Get your API keys** from the services above
2. **Run the setup** using the built-in wizard
3. **Test the features** with sample documents
4. **Gradually increase usage** as you get familiar
5. **Consider upgrading** to paid plans for heavy usage

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Gemini API Guide](https://ai.google.dev/docs)
- [Hugging Face API Docs](https://huggingface.co/docs/api-inference)
- [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php)
- [Google Cloud Document AI Docs](https://cloud.google.com/document-ai/docs)
- [Google Cloud Natural Language API](https://cloud.google.com/natural-language/docs)

## 🆘 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API keys are correctly formatted
3. Test with the debug commands provided
4. Review the troubleshooting section above

---

**🎉 Congratulations!** Your legal document analyzer now has real AI-powered features. The days of mock data are over - welcome to the future of legal document analysis!

**Remember:** Always keep your API keys secure and never commit them to version control.