# AI Integration Guide - Indian Legal Document Analyzer

## 🚀 Complete Setup Guide for Real AI Integration

This guide will help you integrate your Indian Legal Document Analyzer with real AI services including OpenAI GPT-4, Google Translate, and document processing APIs.

---

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- Valid API keys from service providers
- Basic understanding of API key security

---

## 🔑 API Keys Setup

### 1. OpenAI API Configuration

**Purpose**: Powers document summarization, legal Q&A, and document analysis

#### Getting Your OpenAI API Key:

1. **Sign up**: Go to [OpenAI Platform](https://platform.openai.com)
2. **Create Account**: Sign up with email or continue with Google/Microsoft
3. **Billing Setup**: Add payment method (required for API access)
4. **API Key**: Go to "API Keys" section and create new secret key
5. **Copy Key**: Starts with `sk-...` - keep this secure!

#### Recommended Models:
- **GPT-4**: Best quality, higher cost (~$0.03/1K tokens)
- **GPT-3.5 Turbo**: Good balance, lower cost (~$0.002/1K tokens)
- **GPT-4 Turbo**: Latest model, optimized performance

#### Cost Estimation:
- **Document Summary**: ~$0.10-0.50 per document
- **Legal Q&A**: ~$0.05-0.20 per question
- **Document Analysis**: ~$0.20-1.00 per document

### 2. Google Translate API Configuration

**Purpose**: Powers multi-language translation features

#### Getting Your Google Cloud API Key:

1. **Google Cloud Console**: Go to [Google Cloud Console](https://console.cloud.google.com)
2. **Create Project**: Create new project or select existing
3. **Enable API**: Enable "Cloud Translation API"
4. **Credentials**: Create credentials → API Key
5. **Restrict Key**: Restrict to Translation API for security
6. **Copy Key**: Starts with `AIza...`

#### Cost Estimation:
- **Translation**: $20 per 1M characters
- **Language Detection**: $20 per 1M characters
- **Typical Usage**: ~$0.01-0.05 per translation

### 3. Document Processing APIs (Optional)

**Purpose**: Advanced PDF/OCR processing

#### Azure Document Intelligence:
1. **Azure Portal**: Go to [Azure Portal](https://portal.azure.com)
2. **Create Resource**: Search "Document Intelligence"
3. **Get Keys**: Copy key and endpoint
4. **Cost**: ~$1-15 per 1,000 pages

#### AWS Textract:
1. **AWS Console**: Go to [AWS Console](https://console.aws.amazon.com)
2. **Textract Service**: Navigate to Amazon Textract
3. **IAM Setup**: Create IAM user with Textract permissions
4. **Access Keys**: Generate access key and secret
5. **Cost**: ~$1.50 per 1,000 pages

---

## ⚙️ Application Configuration

### Step 1: Open the Application

1. Save the `indian-legal-analyzer-ai.html` file
2. Open in your web browser
3. Navigate to the "API Configuration" tab (first tab)

### Step 2: Configure OpenAI

```javascript
// In the API Configuration tab:
1. Enter your OpenAI API Key: sk-...
2. Select Model: GPT-4 (recommended)
3. Click "Test Connection"
4. Wait for green "Connected successfully" status
```

### Step 3: Configure Google Translate

```javascript
// In the API Configuration tab:
1. Enter Google Cloud API Key: AIza...
2. Enter Project ID: your-project-id
3. Click "Test Connection"
4. Wait for green "Connected successfully" status
```

### Step 4: Test All Connections

Click "Test All Connections" to verify everything is working properly.

---

## 🎯 Feature Usage Guide

### 1. Document Upload & AI Analysis

**What it does**: Analyzes uploaded documents with AI to extract entities, dates, citations, and key themes.

**How to use**:
1. Go to "Document Upload" tab
2. Upload PDF, DOC, DOCX, or TXT files
3. AI automatically analyzes content
4. View comprehensive analysis results

**API Usage**: Uses OpenAI for document analysis (~1000-2000 tokens per document)

### 2. AI-Powered Summarization

**What it does**: Generates professional legal summaries with different focuses and lengths.

**How to use**:
1. Go to "Summarization" tab
2. Select summary type (Comprehensive, Executive, Key Points, etc.)
3. Choose length (Short, Medium, Long)
4. Select legal focus area
5. Click "Generate AI Summary"

**API Usage**: Uses OpenAI (~1500-3000 tokens per summary)

### 3. Legal Q&A Assistant

**What it does**: Provides expert legal advice and answers questions about Indian law.

**How to use**:
1. Go to "Legal Q&A" tab
2. Type your legal question
3. Get AI-powered responses with:
   - Relevant legal acts and sections
   - Applicable procedures
   - Case law references
   - Practical guidance

**API Usage**: Uses OpenAI (~500-1500 tokens per question)

### 4. AI-Powered Translation

**What it does**: Translates legal documents between English and Indian languages.

**How to use**:
1. Go to "Translation" tab
2. Select source and target languages
3. Enter text to translate
4. Click "Translate with AI"
5. Export or copy results

**API Usage**: Uses Google Translate API (~100-5000 characters per translation)

### 5. AI Legal Search

**What it does**: Provides comprehensive legal research using AI.

**How to use**:
1. Go to "Search & Analysis" tab
2. Enter search query
3. Select search type and jurisdiction
4. Click "Search with AI"
5. Get detailed legal research results

**API Usage**: Uses OpenAI (~1000-2000 tokens per search)

### 6. AI Document Viewer

**What it does**: Enhanced document viewing with AI-powered highlighting.

**How to use**:
1. Go to "Document Viewer" tab
2. Select uploaded document
3. Use AI highlighting features:
   - Entity Detection
   - Date Extraction
   - Citation Finder
   - Key Terms Analysis

**API Usage**: Uses OpenAI (~500-1000 tokens per highlighting operation)

---

## 🔒 Security Best Practices

### API Key Security

```javascript
// ✅ GOOD: Keys stored locally in browser
localStorage.setItem('openai_key', 'your-key');

// ❌ BAD: Don't share keys publicly
const API_KEY = 'sk-your-key-here'; // Never do this!

// ✅ GOOD: Use environment variables in production
const API_KEY = process.env.OPENAI_API_KEY;
```

### Security Recommendations:

1. **Never commit API keys** to version control
2. **Use environment variables** in production
3. **Rotate keys regularly** (monthly/quarterly)
4. **Set API usage limits** to prevent abuse
5. **Monitor API usage** regularly
6. **Use HTTPS** for all API calls
7. **Implement rate limiting** if serving multiple users

### Production Deployment Security:

```javascript
// Example secure configuration
const config = {
  openai: {
    key: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4',
    maxTokens: 2000,
    temperature: 0.7
  },
  google: {
    key: process.env.GOOGLE_API_KEY,
    projectId: process.env.GOOGLE_PROJECT_ID
  },
  rateLimiting: {
    requests: 100, // per hour
    tokens: 50000  // per hour
  }
};
```

---

## 💰 Cost Management

### Monthly Cost Estimation:

| Usage Level | OpenAI Cost | Google Translate | Total |
|-------------|-------------|------------------|-------|
| Light (10 docs/day) | $30-50 | $5-10 | $35-60 |
| Medium (50 docs/day) | $150-300 | $25-50 | $175-350 |
| Heavy (200 docs/day) | $600-1200 | $100-200 | $700-1400 |

### Cost Optimization Tips:

1. **Use GPT-3.5 Turbo** for simple tasks
2. **Implement caching** for repeated queries
3. **Set token limits** to prevent runaway costs
4. **Monitor usage** with API dashboards
5. **Use batch processing** where possible

### Setting Up Usage Limits:

```javascript
// OpenAI Usage Limits
const OPENAI_LIMITS = {
  maxTokensPerRequest: 2000,
  maxRequestsPerHour: 100,
  maxMonthlySpend: 500 // USD
};

// Google Translate Limits
const TRANSLATE_LIMITS = {
  maxCharsPerRequest: 10000,
  maxRequestsPerHour: 500,
  maxMonthlySpend: 100 // USD
};
```

---

## 🛠️ Troubleshooting

### Common Issues and Solutions:

#### 1. "Invalid API Key" Error
**Problem**: API key is incorrect or expired
**Solution**: 
- Check key format (OpenAI: `sk-...`, Google: `AIza...`)
- Verify key is active in respective dashboard
- Regenerate key if needed

#### 2. "Rate Limit Exceeded" Error
**Problem**: Too many API requests
**Solution**:
- Wait and retry
- Implement exponential backoff
- Upgrade API plan if needed

#### 3. "Insufficient Quota" Error
**Problem**: API quota exhausted
**Solution**:
- Check billing and add credits
- Review usage patterns
- Implement usage limits

#### 4. Translation Not Working
**Problem**: Google Translate API issues
**Solution**:
- Verify API is enabled in Google Cloud
- Check API key restrictions
- Ensure billing is set up

#### 5. CORS Errors
**Problem**: Browser blocking API calls
**Solution**:
- Use HTTPS for serving the app
- Implement proper backend proxy
- Use browser extensions for development

### Debug Mode:

```javascript
// Add to your console for debugging
window.DEBUG_MODE = true;

// This will log all API calls
function debugLog(message, data) {
  if (window.DEBUG_MODE) {
    console.log(`[DEBUG] ${message}`, data);
  }
}
```

---

## 🚀 Production Deployment

### For Production Use:

1. **Backend Implementation**: Move API calls to secure backend
2. **Database Integration**: Store documents and results
3. **User Authentication**: Implement login system
4. **Rate Limiting**: Prevent abuse
5. **Monitoring**: Track usage and performance
6. **Backup**: Regular data backups

### Sample Backend Architecture:

```javascript
// Express.js backend example
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/summarize', async (req, res) => {
  try {
    const { document, type, length } = req.body;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a legal assistant...' },
        { role: 'user', content: `Summarize: ${document}` }
      ],
      max_tokens: 2000
    });

    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 📊 Monitoring and Analytics

### Track Important Metrics:

1. **API Usage**: Requests per day/month
2. **Token Consumption**: Track costs
3. **Error Rates**: Monitor failures
4. **Response Times**: Performance metrics
5. **User Satisfaction**: Feature usage

### Monitoring Dashboard:

```javascript
// Simple usage tracking
const analytics = {
  trackApiCall: (service, tokens, success) => {
    const data = {
      service,
      tokens,
      success,
      timestamp: new Date().toISOString()
    };
    
    // Send to analytics service
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
};
```

---

## 🔄 Advanced Features

### 1. Custom Prompts

Customize AI responses for specific legal domains:

```javascript
const customPrompts = {
  contract: "As a contract law specialist in India, analyze the following...",
  criminal: "As a criminal law expert familiar with IPC and CrPC, examine...",
  property: "As a property law expert versed in Indian property acts, review..."
};
```

### 2. Document Templates

Create templates for common legal documents:

```javascript
const templates = {
  lease: "Generate a lease agreement template for...",
  will: "Create a will template according to Indian Succession Act...",
  power_of_attorney: "Draft a power of attorney as per Indian law..."
};
```

### 3. Legal Database Integration

Connect to legal databases for enhanced search:

```javascript
// Example integration with legal API
const legalSearch = async (query) => {
  const response = await fetch('https://api.legaldatabase.com/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LEGAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, jurisdiction: 'India' })
  });
  return response.json();
};
```

---

## 📞 Support and Resources

### Documentation Links:
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Translate API Documentation](https://cloud.google.com/translate/docs)
- [Azure Document Intelligence](https://docs.microsoft.com/azure/cognitive-services/form-recognizer/)
- [AWS Textract Documentation](https://docs.aws.amazon.com/textract/)

### Community Resources:
- [OpenAI Community Forum](https://community.openai.com)
- [Google Cloud Community](https://cloud.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/openai-api)

### Getting Help:
- Check error messages carefully
- Review API documentation
- Test with smaller inputs first
- Monitor API status pages
- Contact support if needed

---

## 🎉 Congratulations!

You now have a fully functional AI-integrated Indian Legal Document Analyzer! This powerful tool can:

- ✅ Analyze legal documents with AI
- ✅ Generate professional summaries
- ✅ Provide legal Q&A assistance
- ✅ Translate between multiple languages
- ✅ Perform intelligent legal research
- ✅ Highlight important document elements

Remember to monitor your usage, implement proper security measures, and gradually scale up as your needs grow.

**Happy Legal Analysis!** 🏛️⚖️🤖