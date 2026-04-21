---
name: laravel-v13-ai-integration
description: Advanced LLM integration using Prism. Use this for generating medical advice, structured data, and handling multi-modal LLM tasks.
---

# Laravel v13 AI Integration (Prism)

This skill provides optimized patterns for the `prism-php/prism` library.

## Generation Patterns

### 1. Text Generation (Advice/Summaries)
Use for free-form clinical advice or chat responses.
```php
$response = Prism::text()
    ->using('groq', 'llama-3.3-70b-versatile')
    ->withMessages([
        new SystemMessage($systemPrompt),
        new UserMessage($userInput)
    ])
    ->withMaxTokens(1024)
    ->generate();
```

### 2. Structured Data (Future-Proofing)
When Prism supports structured output, prefer schema-based generation for diagnostics.

## Prompt Engineering & Safety
- **Medical Grounding**: Always inject patient vitals and history into the `SystemMessage`.
- **Language Hybridity**: Explicitly handle Bangla/English hybrid requirements for prescription instructions.
- **Refusal Protocol**: Maintain strict boundaries to prevent non-medical usage.

## Queueing & Performance
- **Async Jobs**: Always dispatch AI tasks to the queue (e.g., `GeneratePrescriptionAdvice`).
- **Rate Limiting**: Use `RateLimited('groq')` middleware in Jobs to prevent 429 errors.
