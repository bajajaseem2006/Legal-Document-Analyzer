# Free API Keys Guide for Indian Legal Document Analyzer

## 🚀 Essential Free APIs for Your Project

### 1. OpenAI API (For AI Summarization & Q&A)
**Free Tier**: $5 free credits for new users
- **Sign up**: https://platform.openai.com/signup
- **Features**: GPT-3.5/4 for document summarization, legal Q&A
- **Usage**: 
  - Go to https://platform.openai.com/api-keys
  - Create new secret key
  - Save as: `sk-...` (starts with sk-)

### 2. Google Translate API (For Multi-language Support)
**Free Tier**: 500,000 characters/month
- **Sign up**: https://cloud.google.com/translate
- **Setup**:
  1. Go to Google Cloud Console
  2. Create new project
  3. Enable Translate API
  4. Create service account key
  5. Download JSON credentials file

### 3. Hugging Face API (For NLP Tasks)
**Free Tier**: 1,000 requests/month
- **Sign up**: https://huggingface.co/join
- **Features**: Entity extraction, sentiment analysis, text classification
- **Usage**:
  - Go to https://huggingface.co/settings/tokens
  - Create new token
  - Save as: `hf_...`

### 4. Google Cloud Document AI (For Document Analysis)
**Free Tier**: 1,000 pages/month
- **Sign up**: https://cloud.google.com/document-ai
- **Features**: Document intelligence, text extraction from PDFs, form parsing
- **Usage**:
  1. Create Google Cloud account
  2. Enable Document AI API
  3. Create service account and download JSON key

### 5. Gemini API (Google's AI)
**Free Tier**: 60 requests/minute
- **Sign up**: https://ai.google.dev/
- **Features**: Alternative to OpenAI for text generation
- **Usage**:
  - Go to https://aistudio.google.com/app/apikey
  - Create API key

### 6. Anthropic Claude API (Alternative AI)
**Free Tier**: $5 free credits
- **Sign up**: https://console.anthropic.com/
- **Features**: Advanced reasoning, legal document analysis

## 🔧 Quick Setup Instructions

### Step 1: Get Your API Keys
1. Sign up for the services above
2. Get your API keys/tokens
3. Store them securely (never commit to git)

### Step 2: Environment Setup
Create a `.env` file in your project root:
```
OPENAI_API_KEY=sk-your-openai-key-here
GOOGLE_TRANSLATE_KEY=your-google-key-here
HUGGINGFACE_API_KEY=hf_your-huggingface-key-here
GOOGLE_CLOUD_PROJECT_ID=your-project-id-here
GOOGLE_CLOUD_DOCUMENT_AI_KEY=path-to-your-service-account-key.json
GEMINI_API_KEY=your-gemini-key-here
```

### Step 3: Security Best Practices
- Never commit API keys to version control
- Use environment variables or secure vaults
- Rotate keys regularly
- Monitor usage to avoid rate limits

## 📊 API Usage Recommendations

### For Document Summarization:
- **Primary**: OpenAI GPT-3.5 Turbo (cost-effective)
- **Backup**: Gemini Pro (free tier)
- **Alternative**: Hugging Face BART/T5 models

### For Translation:
- **Primary**: Google Translate API
- **Alternative**: Google Cloud Translation API (same company, different service tier)

### For Entity Extraction:
- **Primary**: Hugging Face NER models
- **Alternative**: Google Cloud Natural Language API

### For Document Processing:
- **Primary**: Google Cloud Document AI
- **Alternative**: Google Cloud Vision API (for OCR)

## 🚨 Important Notes

1. **Rate Limits**: All free APIs have rate limits - implement proper error handling
2. **Fallbacks**: Always have backup APIs or cached responses
3. **Monitoring**: Track your usage to avoid unexpected charges
4. **Compliance**: Ensure APIs comply with legal document privacy requirements
5. **Local Alternatives**: Consider local models for sensitive documents

## 🔗 Useful Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Translate API Docs](https://cloud.google.com/translate/docs)
- [Hugging Face API Docs](https://huggingface.co/docs/api-inference)
- [Google Cloud Document AI Docs](https://cloud.google.com/document-ai/docs)

## 🎯 Next Steps

1. Sign up for the APIs you need
2. Get your API keys
3. I'll help you integrate them into your code
4. Test with small documents first
5. Scale up gradually

**Ready to integrate? Let me know which APIs you'd like to start with!**