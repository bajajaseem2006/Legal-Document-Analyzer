// api-integrations.js
// AI API Integrations for Indian Legal Document Analyzer

// Main API object that will be used by the HTML application
const legalAPIs = {
    
    // OpenAI/ChatGPT Integration for Legal Q&A
    async askLegalQuestion(question, documentContext = '') {
        try {
            if (!API_CONFIG.OPENAI.API_KEY && !API_CONFIG.ANTHROPIC.API_KEY) {
                throw new Error('No API key configured for Q&A service');
            }

            const prompt = `You are an expert in Indian law. Please provide a detailed answer to the following legal question. 
            ${documentContext ? `Context from uploaded document: ${documentContext.substring(0, 1000)}...` : ''}
            
            Question: ${question}
            
            Please provide a comprehensive answer that includes:
            1. Relevant Indian laws and acts
            2. Legal precedents if applicable
            3. Practical implications
            4. Actionable advice
            
            Answer:`;

            // Try OpenAI first, then Anthropic
            if (API_CONFIG.OPENAI.API_KEY) {
                return await this._callOpenAI(prompt, 'chat');
            } else if (API_CONFIG.ANTHROPIC.API_KEY) {
                return await this._callAnthropic(prompt);
            }
            
        } catch (error) {
            console.error('Error in askLegalQuestion:', error);
            return this._getFallbackLegalResponse(question);
        }
    },

    // Document Summarization using AI
    async summarizeDocument(documentText, summaryType = 'comprehensive', summaryLength = 'medium') {
        try {
            if (!API_CONFIG.OPENAI.API_KEY && !API_CONFIG.ANTHROPIC.API_KEY) {
                throw new Error('No API key configured for summarization service');
            }

            const lengthInstructions = {
                'short': 'in 2-3 concise paragraphs',
                'medium': 'in 4-6 detailed paragraphs',
                'long': 'in a comprehensive analysis with multiple sections'
            };

            const typeInstructions = {
                'comprehensive': 'Provide a comprehensive summary covering all key aspects',
                'executive': 'Focus on executive-level insights and key decisions',
                'keypoints': 'Extract and list the most important key points',
                'timeline': 'Present events and decisions in chronological order'
            };

            const prompt = `You are an expert legal document analyst specializing in Indian law. 
            Please analyze the following legal document and provide a ${summaryType} summary ${lengthInstructions[summaryLength]}.

            ${typeInstructions[summaryType]}

            Document to analyze:
            ${documentText.substring(0, 4000)}...

            Please structure your summary with:
            1. Document Type and Overview
            2. Key Legal Issues
            3. Important Parties Involved
            4. Critical Dates and Deadlines
            5. Legal Implications
            6. Actionable Items (if any)

            Summary:`;

            // Try OpenAI first, then Anthropic
            if (API_CONFIG.OPENAI.API_KEY) {
                return await this._callOpenAI(prompt, 'summarization');
            } else if (API_CONFIG.ANTHROPIC.API_KEY) {
                return await this._callAnthropic(prompt);
            }

        } catch (error) {
            console.error('Error in summarizeDocument:', error);
            return this._getFallbackSummary(summaryType, summaryLength);
        }
    },

    // Text Translation using Google Translate API
    async translateText(text, sourceLang, targetLang) {
        try {
            if (!API_CONFIG.GOOGLE_TRANSLATE.API_KEY) {
                throw new Error('Google Translate API key not configured');
            }

            const response = await fetch(`${API_CONFIG.GOOGLE_TRANSLATE.BASE_URL}?key=${API_CONFIG.GOOGLE_TRANSLATE.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang,
                    target: targetLang,
                    format: 'text'
                })
            });

            if (!response.ok) {
                throw new Error(`Translation API error: ${response.status}`);
            }

            const data = await response.json();
            return data.data.translations[0].translatedText;

        } catch (error) {
            console.error('Error in translateText:', error);
            return this._getFallbackTranslation(text, sourceLang, targetLang);
        }
    },

    // Semantic Search using AI
    async performSemanticSearch(query, documentText) {
        try {
            if (!API_CONFIG.OPENAI.API_KEY && !API_CONFIG.ANTHROPIC.API_KEY) {
                throw new Error('No API key configured for semantic search');
            }

            const prompt = `You are an AI legal research assistant specializing in Indian law. 
            Based on the following document content, please perform a semantic search for: "${query}"

            Document content:
            ${documentText.substring(0, 3000)}...

            Please provide:
            1. Relevant sections that match the search query
            2. Legal concepts and terms related to the query
            3. Any applicable Indian laws or acts mentioned
            4. Case law references if any
            5. Practical implications

            Search Results:`;

            // Try OpenAI first, then Anthropic
            if (API_CONFIG.OPENAI.API_KEY) {
                return await this._callOpenAI(prompt, 'search');
            } else if (API_CONFIG.ANTHROPIC.API_KEY) {
                return await this._callAnthropic(prompt);
            }

        } catch (error) {
            console.error('Error in performSemanticSearch:', error);
            return this._getFallbackSearchResults(query);
        }
    },

    // Private method to call OpenAI API
    async _callOpenAI(prompt, type = 'general') {
        const response = await fetch(`${API_CONFIG.OPENAI.BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_CONFIG.OPENAI.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: API_CONFIG.OPENAI.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert legal AI assistant specializing in Indian law and legal document analysis.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: API_CONFIG.OPENAI.MAX_TOKENS,
                temperature: API_CONFIG.OPENAI.TEMPERATURE
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    },

    // Private method to call Anthropic Claude API
    async _callAnthropic(prompt) {
        const response = await fetch(`${API_CONFIG.ANTHROPIC.BASE_URL}/messages`, {
            method: 'POST',
            headers: {
                'x-api-key': API_CONFIG.ANTHROPIC.API_KEY,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: API_CONFIG.ANTHROPIC.MODEL,
                max_tokens: 2000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
    },

    // Fallback responses when APIs are not available
    _getFallbackLegalResponse(question) {
        return `I understand you're asking about: "${question}"

This is a demonstration response. To get AI-powered legal advice, please configure your API keys.

For questions about Indian law, I recommend consulting:
1. The Indian Constitution
2. Relevant acts like the Indian Contract Act, 1872
3. The Indian Penal Code, 1860
4. The Code of Civil Procedure, 1908
5. Recent Supreme Court and High Court judgments

Please consult with a qualified legal professional for specific legal advice.`;
    },

    _getFallbackSummary(summaryType, summaryLength) {
        return `**Document Summary (${summaryType} - ${summaryLength})**

This is a demonstration summary. To get AI-powered document analysis, please configure your OpenAI or Anthropic API keys.

**Key Points:**
- Document analysis requires active AI integration
- Legal document summarization helps identify crucial information
- Professional legal review is always recommended

**Next Steps:**
1. Configure your API keys in the setup-api-keys.js file
2. Ensure proper API access and billing
3. Test with your legal documents

For production use, please set up proper API credentials.`;
    },

    _getFallbackTranslation(text, sourceLang, targetLang) {
        const sampleTranslations = {
            'en-hi': 'यह एक नमूना अनुवाद है। वास्तविक अनुवाद के लिए Google Translate API कॉन्फ़िगर करें।',
            'en-ta': 'இது ஒரு மாதிரி மொழிபெயர்ப்பு. உண்மையான மொழிபெயர்ப்பிற்கு Google Translate API ஐ கட்டமைக்கவும்.',
            'en-bn': 'এটি একটি নমুনা অনুবাদ। প্রকৃত অনুবাদের জন্য Google Translate API কনফিগার করুন।',
            'en-te': 'ఇది ఒక నమూనా అనువాదం. వాస్తవ అనువాదం కోసం Google Translate API ని కాన్ఫిగర్ చేయండి।',
            'en-mr': 'हे एक नमुना भाषांतर आहे. वास्तविक भाषांतरासाठी Google Translate API कॉन्फिगर करा.',
            'en-gu': 'આ એક નમૂનો અનુવાદ છે. વાસ્તવિક અનુવાદ માટે Google Translate API ને ગોઠવો.'
        };

        const langKey = `${sourceLang}-${targetLang}`;
        return sampleTranslations[langKey] || `Sample translation. Please configure Google Translate API for actual translation. Original text: ${text}`;
    },

    _getFallbackSearchResults(query) {
        return `**Semantic Search Results for: "${query}"**

This is a demonstration search result. To get AI-powered semantic search, please configure your API keys.

**Sample Legal References:**
1. **Indian Contract Act, 1872** - Relevant sections for contract-related queries
2. **Indian Penal Code, 1860** - For criminal law matters
3. **Constitution of India** - For constitutional law questions
4. **Transfer of Property Act, 1882** - For property law issues

**Recommended Actions:**
- Configure OpenAI or Anthropic API for advanced semantic search
- Consult legal databases like Manupatra or SCC Online
- Review recent Supreme Court and High Court judgments

For accurate legal research, please use professional legal databases and consult qualified lawyers.`;
    }
};

// Initialize API validation on load
document.addEventListener('DOMContentLoaded', function() {
    if (typeof API_CONFIG !== 'undefined') {
        const isValid = validateAPIKeys();
        if (!isValid) {
            console.warn('API keys not properly configured. Some features will use demonstration mode.');
        }
    }
});

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = legalAPIs;
}