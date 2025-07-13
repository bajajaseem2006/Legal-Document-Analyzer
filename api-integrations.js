// API Integrations for Indian Legal Document Analyzer
// This file contains all AI service integrations

class LegalAPIs {
    constructor() {
        this.openaiApiKey = null;
        this.googleCloudApiKey = null;
        this.huggingFaceApiKey = null;
        this.geminiApiKey = null;
        this.googleProjectId = null;
        this.isConfigured = false;
    }

    // Initialize API keys from environment or user input
    async initialize(apiKeys) {
        this.openaiApiKey = apiKeys.openai;
        this.googleCloudApiKey = apiKeys.googleCloud;
        this.huggingFaceApiKey = apiKeys.huggingFace;
        this.geminiApiKey = apiKeys.gemini;
        this.googleProjectId = apiKeys.googleProjectId;
        
        this.isConfigured = !!(this.openaiApiKey || this.geminiApiKey);
        console.log('Legal APIs initialized:', this.isConfigured ? 'Ready' : 'Not configured');
        
        return this.isConfigured;
    }

    // Document Summarization using OpenAI or Gemini
    async summarizeDocument(documentText, summaryType = 'comprehensive', summaryLength = 'medium') {
        if (!this.isConfigured) {
            return this.getMockSummary(summaryType);
        }

        try {
            const prompt = this.buildSummarizationPrompt(documentText, summaryType, summaryLength);
            
            if (this.openaiApiKey) {
                return await this.callOpenAI(prompt, 'gpt-4');
            } else if (this.geminiApiKey) {
                return await this.callGemini(prompt);
            }
        } catch (error) {
            console.error('Summarization error:', error);
            return this.getMockSummary(summaryType);
        }
    }

    // Legal Question Answering
    async askLegalQuestion(question, documentContext = '') {
        if (!this.isConfigured) {
            return this.getMockLegalResponse(question);
        }

        try {
            const prompt = this.buildLegalQAPrompt(question, documentContext);
            
            if (this.openaiApiKey) {
                return await this.callOpenAI(prompt, 'gpt-4');
            } else if (this.geminiApiKey) {
                return await this.callGemini(prompt);
            }
        } catch (error) {
            console.error('Legal Q&A error:', error);
            return this.getMockLegalResponse(question);
        }
    }

    // Text Translation using Google Translate API
    async translateText(text, sourceLang, targetLang) {
        if (!this.googleCloudApiKey) {
            return this.getMockTranslation(text, targetLang);
        }

        try {
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.googleCloudApiKey}`, {
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

            const data = await response.json();
            if (data.data && data.data.translations) {
                return data.data.translations[0].translatedText;
            }
        } catch (error) {
            console.error('Translation error:', error);
        }
        
        return this.getMockTranslation(text, targetLang);
    }

    // Semantic Search using embeddings
    async performSemanticSearch(query, documentText) {
        if (!this.isConfigured) {
            return this.getMockSearchResults(query);
        }

        try {
            // Use OpenAI embeddings for semantic search
            if (this.openaiApiKey) {
                const embedding = await this.getTextEmbedding(query);
                // In a full implementation, you'd store document embeddings and find similar ones
                return this.findSimilarContent(query, documentText);
            }
        } catch (error) {
            console.error('Semantic search error:', error);
        }
        
        return this.getMockSearchResults(query);
    }

    // Legal Entity Extraction using Google Cloud Natural Language
    async extractLegalEntities(text) {
        if (!this.googleCloudApiKey) {
            return this.getMockEntities(text);
        }

        try {
            const response = await fetch(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${this.googleCloudApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document: {
                        content: text,
                        type: 'PLAIN_TEXT'
                    },
                    encodingType: 'UTF8'
                })
            });

            const data = await response.json();
            return this.processEntities(data.entities || []);
        } catch (error) {
            console.error('Entity extraction error:', error);
            return this.getMockEntities(text);
        }
    }

    // OpenAI API Call
    async callOpenAI(prompt, model = 'gpt-4') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.openaiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert in Indian law and legal document analysis. Provide accurate, professional responses focused on Indian legal context.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Gemini API Call
    async callGemini(prompt) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are an expert in Indian law and legal document analysis. ${prompt}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2000,
                }
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // Get text embeddings using OpenAI
    async getTextEmbedding(text) {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.openaiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'text-embedding-ada-002',
                input: text
            })
        });

        const data = await response.json();
        return data.data[0].embedding;
    }

    // Helper method to build summarization prompts
    buildSummarizationPrompt(text, type, length) {
        const lengthMap = {
            'short': '1-2 paragraphs',
            'medium': '3-4 paragraphs',
            'long': '5-6 paragraphs'
        };

        const typeInstructions = {
            'comprehensive': 'Provide a comprehensive overview covering all major legal points, parties involved, key provisions, and implications.',
            'executive': 'Create an executive summary focusing on key decisions, outcomes, and business implications.',
            'keypoints': 'Extract and list the most important legal points, clauses, and provisions in bullet format.',
            'timeline': 'Create a chronological timeline of events, dates, and legal proceedings mentioned in the document.'
        };

        return `Analyze the following Indian legal document and provide a ${type} summary in ${lengthMap[length] || 'medium detail'}:

${typeInstructions[type]}

Document:
${text.substring(0, 4000)} ${text.length > 4000 ? '...(truncated)' : ''}

Please ensure your response is professional, accurate, and suitable for legal professionals.`;
    }

    // Helper method to build legal Q&A prompts
    buildLegalQAPrompt(question, context) {
        return `As an expert in Indian law, please answer the following legal question. Use the provided document context if relevant.

Question: ${question}

${context ? `Document Context: ${context.substring(0, 2000)}` : ''}

Please provide a detailed, accurate response based on Indian legal principles and precedents.`;
    }

    // Process Google Cloud entities for legal context
    processEntities(entities) {
        return entities.map(entity => ({
            name: entity.name,
            type: entity.type,
            salience: entity.salience,
            mentions: entity.mentions.map(mention => ({
                text: mention.text.content,
                type: mention.type
            }))
        }));
    }

    // Find similar content in document (simple implementation)
    findSimilarContent(query, documentText) {
        const sentences = documentText.split(/[.!?]+/);
        const queryWords = query.toLowerCase().split(' ');
        
        const results = sentences
            .map((sentence, index) => ({
                text: sentence.trim(),
                score: this.calculateSimilarity(sentence.toLowerCase(), queryWords),
                position: index
            }))
            .filter(result => result.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
            
        return results;
    }

    calculateSimilarity(text, queryWords) {
        let score = 0;
        queryWords.forEach(word => {
            if (text.includes(word)) {
                score += 1;
            }
        });
        return score / queryWords.length;
    }

    // Mock responses for when APIs are not configured
    getMockSummary(type) {
        const summaries = {
            'comprehensive': 'This appears to be a legal document that requires AI analysis. Please configure your API keys to enable AI-powered summarization. The document contains legal text that would benefit from professional legal analysis.',
            'executive': 'Executive Summary: This document requires AI analysis to provide accurate legal insights. Please configure your OpenAI or Gemini API keys to enable this feature.',
            'keypoints': '• API configuration required for legal analysis\n• Document contains legal content\n• Professional AI analysis needed\n• Configure OpenAI or Gemini keys to proceed',
            'timeline': 'Timeline analysis requires AI configuration. Please set up your API keys to enable chronological analysis of legal events.'
        };
        return summaries[type] || summaries['comprehensive'];
    }

    getMockLegalResponse(question) {
        return `Thank you for your legal question: "${question}". To provide accurate legal advice based on Indian law, I need to be configured with AI API keys. Please set up your OpenAI or Gemini API keys to enable the legal Q&A feature. Once configured, I can provide detailed responses about Indian legal matters including contract law, property law, criminal law, and more.`;
    }

    getMockTranslation(text, targetLang) {
        const langNames = {
            'hi': 'Hindi',
            'ta': 'Tamil',
            'bn': 'Bengali',
            'te': 'Telugu',
            'mr': 'Marathi',
            'gu': 'Gujarati'
        };
        return `[Translation to ${langNames[targetLang] || targetLang} requires Google Translate API configuration. Please set up your Google Cloud API key to enable translation features.]`;
    }

    getMockSearchResults(query) {
        return [
            {
                text: `Search results for "${query}" require AI configuration. Please set up your API keys to enable semantic search.`,
                score: 1.0,
                position: 0
            }
        ];
    }

    getMockEntities(text) {
        return [
            {
                name: "API Configuration Required",
                type: "ORGANIZATION",
                salience: 1.0,
                mentions: [{
                    text: "Please configure Google Cloud Natural Language API",
                    type: "PROPER"
                }]
            }
        ];
    }
}

// Global instance
window.legalAPIs = new LegalAPIs();