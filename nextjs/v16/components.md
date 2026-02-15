# Component Architecture

## Organization (`src/components/`)

- **ui/**: Reusable, generic UI components (Buttons, Inputs, Modals). Similar to shadcn/ui.
- **layout/**: Layout components (Sidebar, Navbar, Footer).
- **features/**: Domain-specific components (e.g., `features/auth/LoginForm.tsx`).

## UI Component Pattern

Use `class-variance-authority` (CVA) for managing component variants.

### Example Button (`src/components/ui/Button.tsx`)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors...",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

// ForwardRef implementation...
```

## Client vs Server Components

- Use `'use client'` directive at the top of components that use hooks (`useState`, `useEffect`, `useRouter`).
- Prefer Server Components for fetching data in `page.tsx` or `layout.tsx` where possible (though this project relies heavily on client-side fetching via services in hooks/useEffect).
