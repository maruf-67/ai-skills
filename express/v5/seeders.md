# Database Seeding

## Orchestration

Seeders are orchestrated by `src/seeders/index.ts`. This script allows running all seeders or targeting specific ones via command-line arguments.

### Running Seeders

- **All Seeders**:
  ```bash
  npm run seed
  # or
  tsx src/seeders/index.ts
  ```

- **Specific Seeder**:
  ```bash
  tsx src/seeders/index.ts UserSeeder
  ```

## Seeder Implementation

Seeders are idempotent functions that populate the database with initial data.

### Pattern (`src/seeders/userSeeder.ts`)

1. **Connect**: Checks for active connection or connects to `MONGO_URI`.
2. **Check Existence**: Queries by unique keys (e.g., email) to prevent duplicates.
3. **Update or Create**:
   - If exists: Updates fields if they differ (e.g., role/status).
   - If new: Creates the document.
4. **Logging**: Logs created, updated, and skipped counts.

### Example

```typescript
const seedUsers = async () => {
    // ... connection logic ...
    
    for (const userData of usersData) {
        const existing = await User.findOne({ email: userData.email });
        
        if (existing) {
            // Idempotent update logic
            continue;
        }
        
        await User.create(userData);
    }
};
```

## Available Seeders

- `UserSeeder`: Creates admin/default users.
- `CategorySeeder`: Populates initial categories.
- `TagSeeder`: Populates default tags.
- `DepartmentSeeder`: Populates departments.
