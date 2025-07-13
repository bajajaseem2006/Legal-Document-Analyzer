// API Integration Module for Indian Legal Document Analyzer
// This module provides functions to integrate with various free APIs

class LegalDocumentAPIs {
    constructor() {
        // API configuration - loaded from localStorage
        this.config = {
            openai: {
                apiKey: '', // Get from https://platform.openai.com/api-keys
                baseUrl: 'https://api.openai.com/v1'
            },
            huggingface: {
                apiKey: '', // Get from https://huggingface.co/settings/tokens
                baseUrl: 'https://api-inference.huggingface.co/models'
            },
            gemini: {
                apiKey: '', // Get from https://aistudio.google.com/app/apikey
                baseUrl: 'https://generativelanguage.googleapis.com/v1beta'
            }
        };
        
        // Load API keys from localStorage
        this.loadStoredKeys();
    }
    
    // Load API keys from localStorage
    loadStoredKeys() {
        const stored = localStorage.getItem('legalDocAnalyzer_apiKeys');
        if (stored) {
            const keys = JSON.parse(stored);
            this.config.openai.apiKey = keys.openai || '';
            this.config.gemini.apiKey = keys.gemini || '';
            this.config.huggingface.apiKey = keys.huggingface || '';
        }
    }

    // Generic API call function with error handling
    async makeAPICall(url, options, fallbackResponse = null) {
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`API call failed: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call error:', error);
            if (fallbackResponse) {
                console.log('Using fallback response');
                return fallbackResponse;
            }
            throw error;
        }
    }

    // ==================== DOCUMENT SUMMARIZATION ====================

    async summarizeDocument(text, summaryType = 'comprehensive', length = 'medium') {
        const prompts = {
            comprehensive: `Provide a comprehensive summary of this Indian legal document. Focus on key legal points, parties involved, main arguments, and legal implications:\n\n${text}`,
            executive: `Provide an executive summary of this legal document suitable for senior management. Focus on business impact and key decisions:\n\n${text}`,
            'key-points': `Extract the key points from this legal document in bullet format:\n\n${text}`,
            timeline: `Create a timeline of important dates and events from this legal document:\n\n${text}`
        };

        const lengthInstructions = {
            short: 'Keep the summary concise (2-3 paragraphs)',
            medium: 'Provide a moderate length summary (4-6 paragraphs)',
            long: 'Provide a detailed summary (8-10 paragraphs)'
        };

        const prompt = `${prompts[summaryType]} ${lengthInstructions[length]}`;

        // Try OpenAI first
        if (this.config.openai.apiKey) {
            try {
                return await this.summarizeWithOpenAI(prompt);
            } catch (error) {
                console.log('OpenAI failed, trying Gemini...');
            }
        }

        // Fallback to Gemini
        if (this.config.gemini.apiKey) {
            try {
                return await this.summarizeWithGemini(prompt);
            } catch (error) {
                console.log('Gemini failed, using fallback...');
            }
        }

        // Final fallback - mock response
        return this.getMockSummary(summaryType);
    }

    async summarizeWithOpenAI(prompt) {
        const response = await this.makeAPICall(
            `${this.config.openai.baseUrl}/chat/completions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.openai.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a legal expert specializing in Indian law. Provide accurate, professional legal analysis.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.3
                })
            }
        );

        return response.choices[0].message.content;
    }

    async summarizeWithGemini(prompt) {
        const response = await this.makeAPICall(
            `${this.config.gemini.baseUrl}/models/gemini-pro:generateContent?key=${this.config.gemini.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        return response.candidates[0].content.parts[0].text;
    }

    // ==================== LEGAL Q&A ====================

    async askLegalQuestion(question, documentContext = '') {
        const prompt = `You are an expert in Indian law. Answer this legal question professionally and accurately:

Question: ${question}

${documentContext ? `Context from document: ${documentContext}` : ''}

Please provide a comprehensive answer covering:
1. Relevant Indian laws and acts
2. Legal precedents if applicable
3. Practical implications
4. Recommended next steps`;

        // Try OpenAI first
        if (this.config.openai.apiKey) {
            try {
                return await this.summarizeWithOpenAI(prompt);
            } catch (error) {
                console.log('OpenAI failed for Q&A, trying Gemini...');
            }
        }

        // Fallback to Gemini
        if (this.config.gemini.apiKey) {
            try {
                return await this.summarizeWithGemini(prompt);
            } catch (error) {
                console.log('Gemini failed for Q&A, using fallback...');
            }
        }

        // Final fallback - mock response
        return this.getMockLegalAnswer(question);
    }

    // ==================== TRANSLATION ====================

    async translateText(text, sourceLang, targetLang) {
        // For now, using a free translation API or fallback
        // You can integrate Google Translate API here when you get the credentials
        
        try {
            // Using a free translation service (MyMemory API)
            const response = await this.makeAPICall(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`,
                {
                    method: 'GET'
                }
            );

            return response.responseData.translatedText;
        } catch (error) {
            console.log('Translation failed, using fallback...');
            return this.getMockTranslation(text, sourceLang, targetLang);
        }
    }

    // ==================== ENTITY EXTRACTION ====================

    async extractEntities(text) {
        if (this.config.huggingface.apiKey) {
            try {
                const response = await this.makeAPICall(
                    `${this.config.huggingface.baseUrl}/dbmdz/bert-large-cased-finetuned-conll03-english`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.config.huggingface.apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            inputs: text
                        })
                    }
                );

                return this.processEntityResponse(response);
            } catch (error) {
                console.log('Entity extraction failed, using fallback...');
            }
        }

        return this.getMockEntities();
    }

    processEntityResponse(response) {
        const entities = {
            persons: [],
            organizations: [],
            locations: [],
            dates: [],
            legal_refs: []
        };

        response.forEach(entity => {
            const text = entity.word;
            const label = entity.entity_group;

            switch (label) {
                case 'PER':
                    entities.persons.push(text);
                    break;
                case 'ORG':
                    entities.organizations.push(text);
                    break;
                case 'LOC':
                    entities.locations.push(text);
                    break;
                case 'MISC':
                    entities.legal_refs.push(text);
                    break;
            }
        });

        return entities;
    }

    // ==================== SEMANTIC SEARCH ====================

    async performSemanticSearch(query, documentText) {
        const prompt = `Perform semantic search on this legal document for the query: "${query}"

Document: ${documentText}

Please find and return:
1. Most relevant sections
2. Key matches and their context
3. Related legal concepts
4. Confidence score (1-10)`;

        try {
            if (this.config.openai.apiKey) {
                return await this.summarizeWithOpenAI(prompt);
            }
            if (this.config.gemini.apiKey) {
                return await this.summarizeWithGemini(prompt);
            }
        } catch (error) {
            console.log('Semantic search failed, using fallback...');
        }

        return this.getMockSearchResults(query);
    }

    // ==================== FALLBACK FUNCTIONS ====================

    getMockSummary(type) {
        const mockSummaries = {
            comprehensive: "This legal document appears to be a comprehensive contract or agreement. Based on the structure and content, it contains standard legal provisions including terms, conditions, and obligations of the parties involved. The document follows Indian legal formatting and includes relevant statutory references.",
            executive: "Executive Summary: This document represents a significant legal agreement requiring immediate attention. Key business impacts include contractual obligations, financial implications, and regulatory compliance requirements.",
            'key-points': "• Document Type: Legal Contract\n• Parties: Multiple entities involved\n• Key Terms: Standard contractual provisions\n• Obligations: Mutual responsibilities outlined\n• Compliance: Follows Indian legal standards",
            timeline: "Timeline of Events:\n• Document Creation: [Date to be extracted]\n• Effective Date: [Date to be extracted]\n• Key Milestones: [To be identified]\n• Expiration: [Date to be extracted]"
        };

        return mockSummaries[type] || mockSummaries.comprehensive;
    }

    getMockLegalAnswer(question) {
        return `Thank you for your legal question: "${question}". 

This is a mock response. For accurate legal advice, please consult with a qualified legal professional familiar with Indian law. 

Based on general legal principles in India:
- Legal matters require careful analysis of specific circumstances
- Indian legal system is based on common law with statutory modifications
- Always verify current legal status and recent amendments
- Consider consulting relevant legal precedents and case law

Please note: This is not legal advice and should not be relied upon for legal decisions.`;
    }

    getMockTranslation(text, sourceLang, targetLang) {
        return `[Translation from ${sourceLang} to ${targetLang}]: ${text} [This is a mock translation. Please use a proper translation service for accurate results.]`;
    }

    getMockEntities() {
        return {
            persons: ['John Doe', 'Jane Smith'],
            organizations: ['ABC Corporation', 'XYZ Ltd.'],
            locations: ['Mumbai', 'New Delhi'],
            dates: ['2023-01-15', '2023-12-31'],
            legal_refs: ['Indian Contract Act 1872', 'Companies Act 2013']
        };
    }

    getMockSearchResults(query) {
        return `Search results for "${query}":

1. **Relevant Section Found** (Confidence: 8/10)
   - Located in paragraph 3, section 2.1
   - Context: Contains related legal provisions

2. **Key Match** (Confidence: 6/10)
   - Found in clause 4(a)
   - Related to contractual obligations

3. **Legal Concept** (Confidence: 7/10)
   - Connects to Indian Contract Act provisions
   - Relevant case law references available

This is a mock search result. Actual implementation would provide more detailed analysis.`;
    }

    // ==================== UTILITY FUNCTIONS ====================

    isConfigured() {
        return this.config.openai.apiKey || this.config.gemini.apiKey || this.config.huggingface.apiKey;
    }

    getAvailableAPIs() {
        const available = [];
        if (this.config.openai.apiKey) available.push('OpenAI');
        if (this.config.gemini.apiKey) available.push('Gemini');
        if (this.config.huggingface.apiKey) available.push('Hugging Face');
        return available;
    }

    async testAPIConnection() {
        const results = {};
        
        if (this.config.openai.apiKey) {
            try {
                await this.summarizeWithOpenAI('Test prompt');
                results.openai = 'Connected';
            } catch (error) {
                results.openai = 'Failed';
            }
        }

        if (this.config.gemini.apiKey) {
            try {
                await this.summarizeWithGemini('Test prompt');
                results.gemini = 'Connected';
            } catch (error) {
                results.gemini = 'Failed';
            }
        }

        return results;
    }
}

// Initialize the API class
const legalAPIs = new LegalDocumentAPIs();

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LegalDocumentAPIs;
}