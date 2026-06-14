# PRP Master Template & Annotations

## Optimized AI-Native Template
Use this structure for all Stage 4 outputs. It is designed to be "Surgically Actionable" for both human and AI developers.

```markdown
# PRP — [Feature Name]

## 1. Governance & Traceability
- **PRP ID:** PRP-[ID]
- **Feature ID:** F-[XX]
- **Linked Requirements:** [e.g., US-01, FR-02]
- **Status:** Draft / Approved
- **Priority:** P0 / P1 / P2

## 2. Technical Vision
### Overview
[Brief description of the feature's purpose.]

### User Flow
1. **Entry:** [How the user starts]
2. **Action:** [What the user does]
3. **Reaction:** [How the system responds]
4. **Success:** [The final state]

## 3. Technical Design
### Data Contract (API / DTO)
[JSON schema for request/response]

### Database Schema Changes
- **Table:** [name]
- **New Columns:** [name, type]
- **Indexes:** [required indexes]

### State Transitions
`Initial State` → `Trigger` → `Final State`

## 4. Codebase Integration (Surgical Plan)
### Files to Create
- `path/to/new_file` - [Purpose]

### Files to Modify
- `path/to/existing_file` - [Specific logic to inject]

### Existing Patterns to Follow
- **Logic Pattern:** [e.g., Action Pattern, Service Layer]
- **UI Pattern:** [e.g., Shared components, Design System rules]
- **Test Pattern:** [e.g., Pest/Vitest benchmarks]

## 5. Robustness & Verification
### Edge Cases & Error States
| Scenario | System Response | UI Feedback |
| :--- | :--- | :--- |

### Acceptance Criteria (BDD Style)
- [ ] **Given** [context], **When** [action], **Then** [outcome].

## 6. Research & References
- **Technology Choice:** [Rationale]
- **Reference Code:** [Link to file or external URL]
```

---

## 1. Governance: The Audit Trail
The Governance block ensures that every line of code can be traced back to a Business Requirement (BRD) or User Story (PRD). This is vital for impact analysis when requirements change.

---

## 2. User Flows: "Developer-Ready"
A user flow must be written so that a developer who has never spoken to the PM can implement it.

❌ **Weak:** "User logs in and sees the dashboard."
✅ **Strong:**
1. User lands on `/login` — sees email + password fields.
2. On submit, POST `/api/auth/login` — 200 returns JWT, 401 shows inline error "Invalid credentials".
3. On success, redirect to `/dashboard` with the JWT stored in `httpOnly` cookie.

---

## 3. Surgical Planning: Guiding the AI
The "Codebase Integration" section is what makes a PRP "AI-Native." By specifying **Existing Patterns to Follow**, you prevent the AI from reinventing logic and ensure it adheres to the project's architectural style (e.g., using `app/Actions` in Laravel or `composables/` in Nuxt).

---

## 4. Edge Cases Checklist
Use these as prompts to identify hidden complexity:
- What happens if the network drops mid-action?
- What if the user submits twice quickly (double-click)?
- What if required data is missing or malformed?
- What if the user has insufficient permissions?
- What are the empty state / zero-data scenarios?

---

## 5. API / Data Contract Example
```json
{
  "endpoint": "POST /api/reports/generate",
  "auth": "Bearer JWT",
  "request": {
    "date_range": { "from": "2024-01-01", "to": "2024-03-31" },
    "format": "pdf | csv"
  },
  "response_200": {
    "job_id": "uuid",
    "status": "queued"
  }
}
```

---

## 6. Acceptance Criteria: BDD Style
Format: **Given** [context] **When** [action] **Then** [outcome]

- [ ] Given a logged-in user, when they click "Generate Report", then a loading spinner appears within 200ms.
- [ ] Given an invalid date range, when the user submits, then a field-level error is displayed without page reload.
