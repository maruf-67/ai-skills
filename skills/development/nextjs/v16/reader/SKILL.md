---
name: reader
description: "Digital Library reader module \u2014 EPUB (epub.js), PDF (pdfjs-dist),\
  \ TTS (EasySpeech), annotations, security. Use when implementing or modifying the\
  \ ebook reader."
type: Skill
title: reader
resource: file:///home/almaruf67/Codes/ai-skills/skills/development/nextjs/v16/reader/SKILL.md
tags:
- development
- nextjs
- v16
- reader
timestamp: '2026-06-29T19:13:46Z'
---

# Reader Module — Digital Library

## Architecture

```
read/[slug]/page.tsx (Server Component)
  │
  ├── Loads book details + determines format (epub|pdf)
  ├── Guards paid content (cookie check)
  └── Renders <ReaderView>
        │
        ├── initReader()
        │     ├── GET playback token (signed time-limited URL)
        │     ├── GET reading progress (resume position)
        │     ├── GET annotations (notes/highlights)
        │     └── SET location (deep-link or progress)
        │
        ├── loadMedia()
        │     ├── FETCH media_url → arrayBuffer → Blob
        │     └── URL.createObjectURL(blob) → mediaObjectUrl
        │
        ├── startReadingSession()
        │     ├── POST reading-sessions/start
        │     └── setInterval (60s) → ping
        │
        ├── EPUB: <ReactReader rendition={getRendition}>
        │     ├── epub.js backed, flow='scrolled', continuous
        │     ├── themes (font, size, colors)
        │     ├── security hooks (contextmenu, keydown)
        │     ├── selection handler → SelectionToolbar
        │     └── locationChanged → CFI tracking, progress save
        │
        └── PDF: <LightweightPdfViewer>
              ├── pdfjs-dist document → canvas per page
              ├── Text layer overlay for selection
              ├── IntersectionObserver lazy loading
              └── Zoom, outline, search, invert colors
```

## EPUB Rendering

### Libraries
- **react-reader** (v3+) — React wrapper for epub.js
- **epub.js** (v0.3.93) — Core EPUB parsing and rendering

### Configuration
```tsx
<ReactReader
  url={mediaObjectUrl}
  title={book.title}
  loadingComponent={<LoadingSpinner />}
  getRendition={setRendition}
  locationChanged={onLocationChanged}
  tocChanged={onTocChanged}
/>
```

- `flow: 'scrolled'`, `manager: 'continuous'`, `spread: 'none'`
- Content loaded via **Blob URL** (`URL.createObjectURL`) — hides backend path
- Book data fetched as `arrayBuffer` → `Blob`

### Theme Overrides
Injected via `rendition.themes.default()`:
- Selection colors (varies by dark/light mode)
- Highlight/note CSS classes (`.reader-highlight`, `.reader-note`)
- Body styles: padding, `user-select`, letter-spacing, line-height
- Heading styles with serif fonts

### Reader Settings (`ReaderSettings.tsx`)
| Setting | Range |
|---------|-------|
| Theme | Light / Dark |
| Font Size | 50% – 200% |
| Font Family | Nunito / Serif / Sans / Mono |

## PDF Rendering

### Library
- **pdfjs-dist** — PDF.js, custom canvas rendering (no native PDF plugin)

### Implementation (`LightweightPdfViewer.tsx`)
- Worker: `/pdf.worker.min.js`
- Pages render to `<canvas>` with text layer overlay for selection
- **Virtualized**: IntersectionObserver (threshold 0.1, rootMargin 100%)
- **Cache**: LRU cache (`usePdfCache.ts`), max 8 pages, 10-min TTL, HiDPI-aware
- **Features**: Zoom (50-300%), outline/TOC, text search with navigation, color inversion

## Text-to-Speech (TTS)

### Architecture
```
TtsControlBar (draggable floating)
  → useTtsStore (Zustand state machine)
    → speechService (EasySpeech singleton)
      → Web Speech API (SpeechSynthesis)
```

### State Machine
```
idle → playing ⇄ paused → playing → stopped | completed
```
- **playLoop()**: async generator iterating paragraphs, calls `speechService.speak(text)` each
- **Cancellation guard**: Uses `playbackRunId` + `playbackCancelled` flag to prevent stale loops

### Sentence Splitting
- Paragraphs split at sentence boundaries for granular speech
- Prevents mid-sentence breaks on pause/resume
- Keeps utterances within Chrome's ~15-second speech limit

### DOM Element Tracking for Highlight
1. `refreshDomElementsRef()` — queries EPUB iframe DOM for `p, li, blockquote, h1-h6, [role="paragraph"]`
2. `segmentToElementRef` — maps sentence index → parent DOM element index
3. `highlightAndScroll(idx)` — applies background-color + `scrollIntoView`

### Auto-Advance on Chapter End
- EPUB: `handleTtsComplete` → `goToNextChapterRef.current()` with `autoStartTtsRef = true`
- PDF: `autoStartTtsRef` + scroll to next page + 800ms timeout → restart TTS

### Files
- `src/services/tts/speechService.ts` — EasySpeech wrapper (102 lines)
- `src/store/useTtsStore.ts` — Zustand TTS store (340 lines)
- `src/components/reader/tts/TtsControlBar.tsx` — Draggable control bar (320 lines)
- `src/hooks/useWordTiming.ts` — Word timing logic (88 lines)

## Annotations (Highlights & Notes)

### Storage
- **CFI-based**: Highlights stored as epub.js CFI references
- **Format**: `body = "Selected Text[NOTE]User Note"` (parsed on load)
- **Rendering**: `rendition.annotations.add('highlight', cfi, ...)`, note icons as SVG overlays

### API Endpoints
```
GET    /v1/front/media/epub-books/{id}/annotations      → list
POST   /v1/front/media/epub-books/{id}/annotations      → create/update
DELETE /v1/front/media/epub-books/{id}/annotations/{aid} → delete
```

### SelectionToolbar
Floating toolbar on text selection: highlight colors (4), add note, copy, remove highlight.

## Reader Security

### Layers
| Layer | Status | Implementation |
|-------|--------|----------------|
| Content Delivery | Partial | Blob URLs hide backend path |
| Client Deterrents | Done | Right-click blocked, keyboard shortcuts blocked (Ctrl+S/P/U, Ctrl+Shift+I/J/C, F12), print CSS `display:none` |
| Environment | Partial | Iframe sandbox `allow-scripts allow-same-origin` |

### Security Code
```ts
// Block right-click
doc.addEventListener('contextmenu', (e) => e.preventDefault());

// Block Save/Print/DevTools
doc.addEventListener('keydown', (e) => {
    if ((isCmdOrCtrl && ['s','p','u'].includes(key)) ||
        (isCmdOrCtrl && isShift && ['i','j','c'].includes(key)) ||
        e.key === 'F12') e.preventDefault();
});
```

## Reading Progress & Sessions

### API
```
GET  /v1/front/media/epub-books/{id}/reading-progress     → get position
PUT  /v1/front/media/epub-books/{id}/reading-progress     → save position
POST /v1/front/media/reading-sessions/start                → start (+ heartbeat)
POST /v1/front/media/reading-sessions/ping                 → keep-alive (60s)
POST /v1/front/media/reading-sessions/{id}/end             → end (on unmount)
```

### Progress Tracking
- EPUB: `locationChanged` → CFI → debounced save
- PDF: page change → debounced save
- Resumes from saved position on re-entry

## Key Files
- `src/components/features/reader/ReaderView.tsx` — Main orchestrator (1630 lines)
- `src/components/features/reader/LightweightPdfViewer.tsx` — PDF renderer (697 lines)
- `src/components/features/reader/hooks/usePdfCache.ts` — PDF page cache (157 lines)
- `src/components/features/reader/components/ReaderHeader.tsx` (207 lines), `ReaderFooter.tsx` (96 lines), `ReaderSettings.tsx` (102 lines), `ReaderTOC.tsx` (152 lines), `ReaderNotes.tsx` (178 lines), `ReaderSearch.tsx` (91 lines), `SelectionToolbar.tsx` (116 lines)
- `src/services/reader.service.ts` — Reader API service (260 lines)
- `src/lib/schemas/reader.schema.ts` — Zod schemas (55 lines)
- `docs/reader_security_plan.md` — Security documentation (96 lines)
- `src/lib/sanitizer.ts` — DOMPurify wrapper for XSS prevention
