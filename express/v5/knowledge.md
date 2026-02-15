# Knowledge Module

## Overview

The `knowledge` module (`src/modules/knowledge`) is a complex feature handling content management with support for rich media and access control.

## Service Architecture (`knowledge.service.ts`)

### Content Handling
- **File Types**: Supports HTML, MD, PDF, DOCX, and ZIP.
- **ZIP Processing**: 
  - Extracts ZIPs to `storage/public/knowledge/<slug>/`.
  - Finds the entry HTML file.
  - **Asset Rewriting**: Parses HTML content to rewrite relative asset URLs (images, css) to point to the API's asset serving endpoints.

### Access Control
- **Validation**: Uses `validateContentAccess` (shared service) to check User Role vs Knowledge `allowedUsers`, `isPublic`, and `created_by`.
- **Filtering**: `listKnowledge` aggregation pipeline applies access control filters at the database level for performance.

### Notifications
- **Creation**: Sends `ACCESS_GRANTED` notifications to `allowedUsers`.
- **Updates**: 
  - Notifies `created_by` if updated by another admin.
  - Notifies newly added `allowedUsers`.

## Content Serving

- **Public**: `getPublicKnowledgeContent(slug)` - No auth required.
- **Private**: `getKnowledgeContent(id, userId, role)` - Validates access.
- **Assets**: `getZipAssetContent` serves individual files from extracted ZIPs, preventing path traversal.

## Aggregation & Pipelines

The module uses sophisticated aggregation utilities (`src/common/utils/aggregation.ts`) to build pipelines for listing content:
- `buildLookupStage`: For populating refs (Departments, Tags, Users).
- `buildContentPipeline`: Composes match, sort, pagination, and access control stages.
