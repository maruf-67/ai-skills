---
name: angular-developer
description: "Generates Angular code and provides architectural guidance. Trigger when creating projects, components, or services, or for best practices on reactivity (signals, linkedSignal, resource), forms, dependency injection, routing, SSR, accessibility (ARIA), animations, styling (component styles, Tailwind CSS), testing, or CLI tooling."
type: Skill
title: angular-developer
resource: file:///home/almaruf67/Codes/ai-os/ECC/skills/angular-developer/SKILL.md
tags:
- ecc
- frontend
timestamp: '2026-08-03T21:09:41Z'
---

# Angular Developer Guidelines

## When to Activate

- Working in any Angular project or codebase
- Creating or scaffolding a new Angular project, application, or library
- Generating components, services, directives, pipes, guards, or resolvers
- Implementing reactivity with Angular Signals, `linkedSignal`, or `resource`
- Working with Angular forms (signal forms, reactive forms, or template-driven)
- Setting up dependency injection, routing, lazy loading, or route guards
- Adding accessibility (ARIA), animations, or component styling
- Writing or debugging Angular-specific tests (unit, component harness, E2E)
- Configuring Angular CLI tooling or the Angular MCP server

1. Always analyze the project's Angular version before providing guidance, as best practices and available features can vary significantly between versions. If creating a new project with Angular CLI, do not specify a version unless prompted by the user.

2. When generating code, follow Angular's style guide and best practices for maintainability and performance. Use the Angular CLI for scaffolding components, services, directives, pipes, and routes to ensure consistency.

3. Once you finish generating code, run `ng build` to ensure there are no build errors. If there are errors, analyze the error messages and fix them before proceeding. Do not skip this step, as it is critical for ensuring the generated code is correct and functional.

## Creating New Projects

If no guidelines are provided by the user, use these defaults when creating a new Angular project:

1. Use the latest stable version of Angular unless the user specifies otherwise.
2. Prefer Signal Forms for new projects only when the target Angular version supports them. [Find out more](references/signal-forms.md).

**Execution Rules for `ng new`:**
When asked to create a new Angular project, you must determine the correct execution command by following these strict steps:

**Step 1: Check for an explicit user version.**

- **IF** the user requests a specific version (e.g., Angular 15), bypass local installations and strictly use `npx`.
- **Command:** `npx @angular/cli@<requested_version> new <project-name>`

**Step 2: Check for an existing Angular installation.**

- **IF** no specific version is requested, run `ng version` in the terminal to check if the Angular CLI is already installed on the system.
- **IF** the command succeeds and returns an installed version, use the local/global installation directly.
- **Command:** `ng new <project-name>`

**Step 3: Fallback to Latest.**

- **IF** no specific version is requested AND the `ng version` command fails (indicating no Angular installation exists), you must use `npx` to fetch the latest version.
- **Command:** `npx @angular/cli@latest new <project-name>`

## Components

When working with Angular components, consult the following references based on the task:

- **Fundamentals**: Anatomy, metadata, core concepts, and template control flow (@if, @for, @switch). Read [components.md](references/components.md)
- **Inputs**: Signal-based inputs, transforms, and model inputs. Read [inputs.md](references/inputs.md)
- **Outputs**: Signal-based outputs and custom event best practices. Read [outputs.md](references/outputs.md)
- **Host Elements**: Host bindings and attribute injection. Read [host-elements.md](references/host-elements.md)

If you require deeper documentation not found in the references above, read the documentation at `https://angular.dev/guide/components`.

## Reactivity and Data Management

When managing state and data reactivity, use Angular Signals and consult the following references:

- **Signals Overview**: Core signal concepts (`signal`, `computed`), reactive contexts, and `untracked`. Read [signals-overview.md](references/signals-overview.md)
- **Dependent State (`linkedSignal`)**: Creating writable state linked to source signals. Read [linked-signal.md](references/linked-signal.md)
- **Async Reactivity (`resource`)**: Fetching asynchronous data directly into signal state. Read [resource.md](references/resource.md)
- **Side Effects (`effect`)**: Logging, third-party DOM manipulation (`afterRenderEffect`), and when NOT to use effects. Read [effects.md](references/effects.md)

## Forms

In most cases for new apps, **prefer signal forms**. When making a forms decision, analyze the project and consider the following guidelines:

- If the application version supports Signal Forms and this is a new form, **prefer signal forms**.
- For older applications or existing forms, match the application's current form strategy.

- **Signal Forms**: Use signals for form state management. Read [signal-forms.md](references/signal-forms.md)
- **Template-driven forms**: Use for simple forms. Read [template-driven-forms.md](references/template-driven-forms.md)
- **Reactive forms**: Use for complex forms. Read [reactive-forms.md](references/reactive-forms.md)

## Dependency Injection

When implementing dependency injection in Angular, follow these guidelines:

- **Fundamentals**: Overview of Dependency Injection, services, and the `inject()` function. Read [di-fundamentals.md](references/di-fundamentals.md)
- **Creating and Using Services**: Creating services, the `providedIn: 'root'` option, and injecting into components or other services. Read [creating-services.md](references/creating-services.md)
- **Defining Dependency Providers**: Automatic vs manual provision, `InjectionToken`, `useClass`, `useValue`, `useFactory`, and scopes. Read [defining-providers.md](references/defining-providers.md)
- **Injection Context**: Where `inject()` is allowed, `runInInjectionContext`, and `assertInInjectionContext`. Read [injection-context.md](references/injection-context.md)
- **Hierarchical Injectors**: The `EnvironmentInjector` vs `ElementInjector`, resolution rules, modifiers (`optional`, `skipSelf`), and `providers` vs `viewProviders`. Read [hierarchical-injectors.md](references/hierarchical-injectors.md)

## Angular Aria

When building accessible custom components for any of the following patterns: Accordion, Listbox, Combobox, Menu, Tabs, Toolbar, Tree, Grid, consult the following reference:

- **Angular Aria Components**: Building headless, accessible components (Accordion, Listbox, Combobox, Menu, Tabs, Toolbar, Tree, Grid) and styling ARIA attributes. Read [angular-aria.md](references/angular-aria.md)

## Routing

When implementing navigation in Angular, consult the following references:

- **Define Routes**: URL paths, static vs dynamic segments, wildcards, and redirects. Read [define-routes.md](references/define-routes.md)
- **Route Loading Strategies**: Eager vs lazy loading, and context-aware loading. Read [loading-strategies.md](references/loading-strategies.md)
- **Show Routes with Outlets**: Using `<router-outlet>`, nested outlets, and named outlets. Read [show-routes-with-outlets.md](references/show-routes-with-outlets.md)
- **Navigate to Routes**: Declarative navigation with `RouterLink` and programmatic navigation with `Router`. Read [navigate-to-routes.md](references/navigate-to-routes.md)
- **Control Route Access with Guards**: Implementing `CanActivate`, `CanMatch`, and other guards for security. Read [route-guards.md](references/route-guards.md)
- **Data Resolvers**: Pre-fetching data before route activation with `ResolveFn`. Read [data-resolvers.md](references/data-resolvers.md)
- **Router Lifecycle and Events**: Chronological order of navigation events and debugging. Read [router-lifecycle.md](references/router-lifecycle.md)
- **Rendering Strategies**: CSR, SSG (Prerendering), and SSR with hydration. Read [rendering-strategies.md](references/rendering-strategies.md)
- **Route Transition Animations**: Enabling and customizing the View Transitions API. Read [route-animations.md](references/route-animations.md)

If you require deeper documentation or more context, visit the [official Angular Routing guide](https://angular.dev/guide/routing).

## Styling and Animations

When implementing styling and animations in Angular, consult the following references:

- **Using Tailwind CSS with Angular**: Integrating Tailwind CSS into Angular projects. Read [tailwind-css.md](references/tailwind-css.md)
- **Angular Animations**: Using native CSS (recommended) or the legacy DSL for dynamic effects. Read [angular-animations.md](references/angular-animations.md)
- **Styling components**: Best practices for component styles and encapsulation. Read [component-styling.md](references/component-styling.md)

## Testing

When writing or updating tests, consult the following references based on the task:

- **Fundamentals**: Best practices for unit testing, async patterns, and `TestBed`. Read [testing-fundamentals.md](references/testing-fundamentals.md)
- **Component Harnesses**: Standard patterns for robust component interaction. Read [component-harnesses.md](references/component-harnesses.md)
- **Router Testing**: Using `RouterTestingHarness` for reliable navigation tests. Read [router-testing.md](references/router-testing.md)
- **End-to-End (E2E) Testing**: Best practices for E2E tests with Cypress or Playwright. Read [e2e-testing.md](references/e2e-testing.md)

## Tooling

When working with Angular tooling, consult the following references:

- **Angular CLI**: Creating applications, generating code (components, routes, services), serving, and building. Read [cli.md](references/cli.md)
- **Angular MCP Server**: Available tools, configuration, and experimental features. Read [mcp.md](references/mcp.md)

## Anti-Patterns

- Using `null` or `undefined` as initial signal form field values — use `''`, `0`, or `[]` instead
- Accessing form field state flags without calling the field first: `form.field.valid()` — use `form.field().valid()`
- Starting new forms with older form APIs when the target Angular version supports Signal Forms
- Setting `min`, `max`, `value`, `disabled`, or `readonly` HTML attributes on `[formField]` inputs — define these as schema rules instead
- Calling `inject()` outside an injection context — use `runInInjectionContext` when needed
- Using `effect()` for derived state that should use `computed()`
- Referencing `$parent.$index` in nested `@for` loops — Angular does not support `$parent`; use `let outerIdx = $index` instead

## Related Skills

- `tdd-workflow` — test-driven development workflow applicable to Angular components and services
- `security-review` — security checklist for web applications including Angular-specific concerns
- `frontend-patterns` — general frontend patterns for context on React/Next.js approaches

## Reference: angular-animations

# Angular Animations

When animating elements in Angular, **first analyze the project's Angular version** in `package.json`.
For modern applications (**Angular v20.2 and above**), prefer using native CSS with `animate.enter` and `animate.leave`. For older applications, you may need to use the deprecated `@angular/animations` package.

## 1. Native CSS Animations (v20.2+ Recommended)

Modern Angular provides `animate.enter` and `animate.leave` to animate elements as they enter or leave the DOM. They apply CSS classes at the appropriate times.

### `animate.enter` and `animate.leave`

Use these directly on elements to apply CSS classes during the enter or leave phase. Angular automatically removes the enter classes when the animation completes. For `animate.leave`, Angular waits for the animation to finish before removing the element from the DOM.

`animate.enter` example:

```html
@if (isShown()) {
<div class="enter-container" animate.enter="enter-animation">
  <p>The box is entering.</p>
</div>
}
```

```css
/* Ensure you have a starting style if using transitions instead of keyframes */
.enter-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
}
.enter-container p {
  margin: 0;
}
.enter-animation {
  animation: slide-fade 1s;
}
@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

_Note: `animate.leave` may be added to child elements being removed._

### Event Bindings and Third-party Libraries

You can bind to `(animate.enter)` and `(animate.leave)` to call functions or use JS libraries like GSAP.

```html
@if(show()) {
<div (animate.leave)="onLeave($event)">...</div>
}
```

```ts
import { AnimationCallbackEvent } from '@angular/core';

onLeave(event: AnimationCallbackEvent) {
  // Custom animation logic here
  // CRITICAL: You MUST call animationComplete() when done so Angular removes the element!
  event.animationComplete();
}
```

## 2. Advanced CSS Animations

CSS offers robust tools for advanced animation sequences.

### Animating State and Styles

Toggle CSS classes on elements using property binding to trigger transitions.

```html
<div [class.open]="isOpen">...</div>
```

```css
div {
  transition: height 0.3s ease-out;
  height: 100px;
}
div.open {
  height: 200px;
}
```

### Animating Auto Height

You can use `css-grid` to animate to auto height.

```css
.container {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s;
}
.container.open {
  grid-template-rows: 1fr;
}
.container > div {
  overflow: hidden;
}
```

### Staggering and Parallel Animations

- **Staggering**: Use `animation-delay` or `transition-delay` with different values for items in a list.
- **Parallel**: Apply multiple animations in the `animation` shorthand (e.g., `animation: rotate 3s, fade-in 2s;`).

### Programmatic Control

Retrieve animations directly using standard Web APIs:

```ts
const animations = element.getAnimations();
animations.forEach((anim) => anim.pause());
```

## 3. Legacy Animations DSL (Deprecated)

For older projects (pre v20.2 or where `@angular/animations` is already heavily used), you use the component metadata DSL.

**Important:** Do not mix legacy animations and `animate.enter`/`leave` in the same component.

### Setup

```ts
bootstrapApplication(App, {
  providers: [provideAnimationsAsync()],
});
```

### Defining Transitions

```ts
import {signal} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  animations: [
    trigger('openClose', [
      state('open', style({opacity: 1})),
      state('closed', style({opacity: 0})),
      transition('open <=> closed', [animate('0.5s')]),
    ]),
  ],
  template: `<div [@openClose]="isOpen() ? 'open' : 'closed'">...</div>`,
})
export class OpenClose {
  isOpen = signal(true);
}
```


## Reference: angular-aria

# Angular Aria

Angular Aria (`@angular/aria`) is a collection of headless, accessible directives that implement common WAI-ARIA patterns. These directives handle keyboard interactions, ARIA attributes, focus management, and screen reader support.

**As an AI Agent, your role is to provide the HTML structure and CSS styling**, while the directives handle the complex accessibility logic.

## Styling Headless Components

Because Angular Aria components are headless, they do not come with default styles. You **must** use CSS to style different states based on the ARIA attributes or structural classes the directives automatically apply.

Common ARIA attributes to target in CSS:

- `[aria-expanded="true"]` / `[aria-expanded="false"]`
- `[aria-selected="true"]`
- `[aria-disabled="true"]`
- `[aria-current="page"]` (for navigation)

---

**CRITICAL**: Before using this package, it must be installed via the package manager. Confirm that it has been installed in the project. Use `npm install @angular/aria` to install if necessary.

## 1. Accordion

Organizes related content into expandable/collapsible sections.

**Usage:** The Accordion is a layout component designed to organize content into logical groups that users can expand one at a time to reduce scrolling on content-heavy pages. Use it for FAQs, long forms, or progressive disclosure of information, but avoid it for primary navigation or scenarios where users must view multiple sections of content simultaneously.

**Imports:** `import { AccordionContent, AccordionGroup, AccordionPanel, AccordionTrigger } from '@angular/aria/accordion';`

**Directives:** `ngAccordionGroup`, `ngAccordionTrigger`, `ngAccordionPanel`, `ngAccordionContent` (for lazy loading).

```ts
@Component({
  selector: 'app-cmp',
  imports: [AccordionContent, AccordionGroup, AccordionPanel, AccordionTrigger],
  template: `...`,
  styles: [],
})
export class App {
  protected readonly title = signal('angular-app');
}
```

```html
<div ngAccordionGroup [multiExpandable]="false">
  <div class="accordion-item">
    <button ngAccordionTrigger panelId="panel-1" class="accordion-header">
      Section 1
      <span class="icon">▼</span>
    </button>
    <div ngAccordionPanel panelId="panel-1" class="accordion-panel">
      <ng-template ngAccordionContent>
        <p>Lazy loaded content here.</p>
      </ng-template>
    </div>
  </div>
</div>
```

**Styling Strategy:**
Target the `[aria-expanded]` attribute on the trigger to rotate icons, and style the panel visibility.

```css
.accordion-header[aria-expanded='true'] .icon {
  transform: rotate(180deg);
}

/* The panel directive handles DOM removal, but you can style the transition */
.accordion-panel {
  padding: 1rem;
  border-top: 1px solid #ccc;
}
```

---

## 2. Listbox

A foundational directive for displaying a list of options. Used for visible selection lists (not dropdowns).

**Usage:** Visible selectable lists (single or multi-select).

**Imports:** `import {Listbox, Option} from '@angular/aria/listbox';`

**Directives:** `ngListbox`, `ngOption`.

```ts
@Component({
  selector: 'app-cmp',
  imports: [Listbox, Option],
  template: `...`,
  styles: [],
})
export class App {
  protected readonly title = signal('angular-app');
}
```

```html
<!-- horizontal or vertical orientation -->
<ul ngListbox [(values)]="selectedItems" orientation="horizontal" [multi]="true">
  <li ngOption value="apple" class="option">Apple</li>
  <li ngOption value="banana" class="option">Banana</li>
</ul>
```

**Styling Strategy:**
Target `[aria-selected="true"]` for selected state and `:focus-visible` or `[data-active]` for the focused item (Angular Aria uses roving tabindex or activedescendant).

```css
.option {
  padding: 8px;
  cursor: pointer;
}
.option[aria-selected='true'] {
  background: #e0f7fa;
  font-weight: bold;
}
/* Focus state managed by aria */
.option:focus-visible {
  outline: 2px solid blue;
}
```

---

## 3. Combobox, Select, and Multiselect

These patterns combine `ngCombobox` with a popup containing an `ngListbox`.

- **Combobox**: Text input + popup (used for Autocomplete).
- **Select**: Readonly Combobox + single-select Listbox.
- **Multiselect**: Readonly Combobox + multi-select Listbox.

**Usage:** The Combobox is a low-level primitive directive that synchronizes a text input with a popup, serving as the foundational logic for autocomplete, select, and multiselect patterns. Use it specifically for building custom filtering, unique selection requirements, or specialized input-to-popup coordination that deviates from standard, documented components.

**Imports:**

```
  import {Combobox, ComboboxInput, ComboboxPopupContainer} from '@angular/aria/combobox';
  import {Listbox, Option} from '@angular/aria/listbox';
```

**Directives:** `ngCombobox`, `ngComboboxInput`, `ngComboboxPopupContainer`, `ngListbox`, `ngOption`.

```html
<!-- Example: Standard Select -->
<div ngCombobox [readonly]="true">
  <button ngComboboxInput class="select-trigger">
    {{ selectedValue() || 'Choose an option' }}
  </button>

  <ng-template ngComboboxPopupContainer>
    <ul ngListbox [(values)]="selectedValue" class="dropdown-menu">
      <li ngOption value="option1">Option 1</li>
      <li ngOption value="option2">Option 2</li>
    </ul>
  </ng-template>
</div>
```

**Styling Strategy:**
Style the popup container to look like a dropdown floating above content (often paired with CDK Overlay).

```css
.select-trigger {
  width: 200px;
  padding: 8px;
  text-align: left;
}
.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

---

## 4. Menu and Menubar

For actions, commands, and context menus (not for form selection).

**Usage:** The Menubar is a high-level navigation pattern designed for building desktop-style application command bars (e.g., File, Edit, View) that stay persistent across an interface. It is best utilized for organizing complex commands into logical top-level categories with full horizontal keyboard support, but it should be avoided for simple standalone action lists or mobile-first layouts where horizontal space is constrained.

**Imports:** `import {MenuBar, Menu, MenuContent, MenuItem} from '@angular/aria/menu';`

**Directives:** `ngMenuBar`, `ngMenu`, `ngMenuItem`, `ngMenuTrigger`.

```html
<!-- Menubar Example -->
<ul ngMenuBar class="menubar">
  <li ngMenuItem value="file">
    <button ngMenuTrigger [menu]="fileMenu">File</button>
  </li>
</ul>

<ul ngMenu #fileMenu="ngMenu" class="menu">
  <li ngMenuItem value="new">New</li>
  <li ngMenuItem value="open">Open</li>
</ul>
```

**Styling Strategy:**
Use flexbox for the menubar. Hide/show submenus based on the trigger's state.

```css
.menubar {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
}
.menu {
  background: white;
  border: 1px solid #ccc;
  padding: 5px 0;
}
.menu li {
  padding: 5px 15px;
  cursor: pointer;
}
```

---

## 5. Tabs

Layered content sections where only one panel is visible.

**Usage:** The Tabs component is used to organize related content into distinct, navigable sections, allowing users to switch between categories or views without leaving the page. It is ideal for settings panels, multi-topic documentation, or dashboards, but should be avoided for sequential workflows (steppers) or when navigation involves more than 7–8 sections.

**Imports:** `import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';`

**Directives:** `ngTabs`, `ngTabList`, `ngTab`, `ngTabPanel`, `ngTabContent`.

```html
<div ngTabs>
  <ul ngTabList class="tab-list">
    <li ngTab value="profile" class="tab-btn">Profile</li>
    <li ngTab value="security" class="tab-btn">Security</li>
  </ul>

  <div ngTabPanel value="profile" class="tab-panel">
    <ng-template ngTabContent>Profile Settings</ng-template>
  </div>
  <div ngTabPanel value="security" class="tab-panel">
    <ng-template ngTabContent>Security Settings</ng-template>
  </div>
</div>
```

**Styling Strategy:**
Target `[aria-selected="true"]` on the tab buttons.

```css
.tab-list {
  display: flex;
  border-bottom: 2px solid #ccc;
  list-style: none;
  padding: 0;
}
.tab-btn {
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.tab-btn[aria-selected='true'] {
  border-bottom-color: blue;
  font-weight: bold;
}
.tab-panel {
  padding: 20px;
}
```

---

## 6. Toolbar

Groups related controls (like text formatting).

**Usage:** The Toolbar is an organizational component designed to group frequently accessed, related controls into a single logical container. It is best used to enhance keyboard efficiency (via arrow-key navigation) and visual structure for workflows requiring repeated actions, such as text formatting or media controls.

**Imports:** `import {Toolbar, ToolbarWidget, ToolbarWidgetGroup} from '@angular/aria/toolbar';`

**Directives:** `ngToolbar`, `ngToolbarWidget`, `ngToolbarWidgetGroup`.

```html
<div ngToolbar class="toolbar">
  <div ngToolbarWidgetGroup [multi]="true" role="group" aria-label="Formatting">
    <button ngToolbarWidget value="bold" class="tool-btn">B</button>
    <button ngToolbarWidget value="italic" class="tool-btn">I</button>
  </div>
</div>
```

**Styling Strategy:**
Target `[aria-pressed="true"]` (for toggle buttons) or `[aria-checked="true"]` (for radio groups) within the toolbar.

```css
.toolbar {
  display: flex;
  gap: 5px;
  padding: 8px;
  background: #f5f5f5;
}
.tool-btn {
  padding: 5px 10px;
  border: 1px solid #ccc;
}
.tool-btn[aria-pressed='true'],
.tool-btn[aria-checked='true'] {
  background: #ddd;
}
```

---

## 7. Tree

Displays hierarchical data (file systems, nested nav).

**Usage:** The Tree component is designed for navigating and displaying deeply nested, hierarchical data structures like file systems, organization charts, or complex site architectures. It should be used specifically for multi-level relationships where users need to expand or collapse branches, but it should be avoided for flat lists, data tables, or simple selection menus.

**Imports:** `import {Tree, TreeItem, TreeItemGroup} from '@angular/aria/tree';`

**Directives:** `ngTree`, `ngTreeItem`, `ngTreeGroup`.

```html
<ul ngTree class="tree">
  <li ngTreeItem value="documents">
    <span class="tree-label">Documents</span>
    <ul ngTreeGroup class="tree-group">
      <li ngTreeItem value="resume">Resume.pdf</li>
    </ul>
  </li>
</ul>
```

**Styling Strategy:**
Target `[aria-expanded]` to show/hide children or rotate chevron icons. Use `padding-left` on nested groups to show hierarchy.

```css
.tree,
.tree-group {
  list-style: none;
  padding-left: 20px;
}
.tree-label::before {
  content: '> ';
  display: inline-block;
  transition: transform 0.2s;
}
li[aria-expanded='true'] > .tree-label::before {
  transform: rotate(90deg);
}
```

## 8. Grid

A two-dimensional interactive collection of cells enabling navigation via arrow keys.

**Usage:** Data tables, calendars, spreadsheets, and layout patterns for interactive elements.
**Directives:** `ngGrid`, `ngGridRow`, `ngGridCell`, `ngGridCellWidget`.

```html
<table ngGrid [multi]="true" [enableSelection]="true" class="grid-table">
  <tr ngGridRow>
    <th ngGridCell role="columnheader">Name</th>
    <th ngGridCell role="columnheader">Status</th>
  </tr>
  <tr ngGridRow>
    <td ngGridCell>Project A</td>
    <td ngGridCell [(selected)]="isSelected">
      <button ngGridCellWidget (activated)="onActivate()">Active</button>
    </td>
  </tr>
</table>
```

**Styling Strategy:**
Target `[aria-selected="true"]` for selected cells and `:focus-visible` for the active cell (roving tabindex) or `[aria-activedescendant]` on the container.

```css
.grid-table {
  border-collapse: collapse;
}
[ngGridCell] {
  padding: 8px;
  border: 1px solid #ddd;
}
[ngGridCell][aria-selected='true'] {
  background: #e3f2fd;
}
/* Focus state managed by roving tabindex */
[ngGridCell]:focus-visible {
  outline: 2px solid #2196f3;
  outline-offset: -2px;
}
```

## General Rules for Agents

1. **Never use native HTML elements like `<select>`** when asked to implement these specific Aria patterns. Use the `ng*` directives.
2. **Handle CSS manually**: Remember that `Angular Aria` does NOT provide styles. You must write the CSS, targeting the native ARIA attributes (`aria-expanded`, `aria-selected`, etc.) that the directives automatically toggle.
3. **Lazy Loading**: Always use the provided structural directives (`ngAccordionContent`, `ngTabContent`) inside `ng-template` for heavy content panels to ensure they are lazily rendered.


## Reference: cli

# Angular CLI Guide for Agents

The Angular CLI (`ng`) is the primary tool for managing an Angular workspace. Always prefer CLI commands over manual file creation or generic `npm` commands when modifying project structure or adding Angular-specific dependencies.

## 1. Managing Dependencies

**ALWAYS use `ng add` for Angular libraries** instead of `npm install`. `ng add` installs the package AND runs initialization schematics (e.g., configuring `angular.json`, updating root providers).

```bash
ng add @angular/material
ng add tailwindcss
ng add @angular/fire
```

To update the application and its dependencies (which automatically runs code migrations):

```bash
ng update @angular/core@<latest or specific version> @angular/cli<latest or specific version>
```

## 2. Generating Code (`ng generate` or `ng g`)

Always use the CLI to generate code to ensure it adheres to Angular standards and updates necessary configuration files automatically.

| Target       | Command               | Notes                                                                                          |
| :----------- | :-------------------- | :--------------------------------------------------------------------------------------------- |
| Component    | `ng g c path/to/name` | Generates a component. Use `--inline-style` (`-s`) or `--inline-template` (`-t`) if requested. |
| Service      | `ng g s path/to/name` | Generates an `@Injectable({providedIn: 'root'})` service.                                      |
| Directive    | `ng g d path/to/name` | Generates a directive.                                                                         |
| Pipe         | `ng g p path/to/name` | Generates a pipe.                                                                              |
| Guard        | `ng g g path/to/name` | Generates a functional route guard.                                                            |
| Environments | `ng g environments`   | Scaffolds `src/environments/` and updates `angular.json` with file replacements.               |

_Note: There is no command to generate a single route definition. Generate a component, then manually add it to the `Routes` array in `app.routes.ts`._

## 3. Development Server & Proxying

Start the local development server with hot-module replacement (HMR):

```bash
ng serve
```

### Backend API Proxying

To proxy API requests during development (e.g., rerouting `/api` to a local Node server):

1. Create `src/proxy.conf.json`:
   ```json
   {
     "/api/**": {"target": "http://localhost:3000", "secure": false}
   }
   ```
2. Update `angular.json` under the `serve` target:
   ```json
   "serve": {
     "builder": "@angular/build:dev-server",
     "options": { "proxyConfig": "src/proxy.conf.json" }
   }
   ```

## 4. Building the Application

Compile the application into an output directory (default: `dist/<project-name>/browser`). Modern Angular uses the `@angular/build:application` builder (esbuild-based).

```bash
ng build
```

- `ng build` defaults to the production configuration, which enables Ahead-of-Time (AOT) compilation, minification, and tree-shaking.
- Target specific configurations defined in `angular.json` using `--configuration`: `ng build --configuration=staging`.

## 5. Testing

- **Unit Tests**: Run `ng test` to execute unit tests via the configured test runner (e.g., Karma or Vitest).
- **End-to-End (E2E)**: Run `ng e2e`. If no E2E framework is configured, the CLI will prompt to install one (Cypress, Playwright, Puppeteer, etc.).

## 6. Deployment

To deploy an application, you must first add a deployment builder, then run the deploy command:

```bash
# Example for Firebase
ng add @angular/fire
ng deploy
```


## Reference: component-harnesses

# Testing with Component Harnesses

Component harnesses are the standard, preferred way to interact with components in tests. They provide a robust, user-centric API that makes tests less brittle and easier to read by insulating them from changes to a component's internal DOM structure.

## Why Use Harnesses?

- **Robustness:** Tests don't break when you refactor a component's internal HTML or CSS classes.
- **Readability:** Tests describe interactions from a user's perspective (e.g., `button.click()`, `slider.getValue()`) instead of through DOM queries (`fixture.nativeElement.querySelector(...)`).
- **Reusability:** The same harness can be used in both unit tests and E2E tests.

Angular Material provides a test harness for every component in its library.

## Using a Harness in a Unit Test

The `TestbedHarnessEnvironment` is the entry point for using harnesses in unit tests.

### Example: Testing with a `MatButtonHarness`

```ts
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MyButtonContainerComponent} from './my-button-container.component';

describe('MyButtonContainerComponent', () => {
  let fixture: ComponentFixture<MyButtonContainerComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyButtonContainerComponent, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyButtonContainerComponent);
    // Create a harness loader for the component's fixture
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should find a button with specific text', async () => {
    // Load the harness for a MatButton with the text "Submit"
    const submitButton = await loader.getHarness(MatButtonHarness.with({text: 'Submit'}));

    // Use the harness API to interact with the component
    expect(await submitButton.isDisabled()).toBe(false);
    await submitButton.click();

    // ... assertions
  });
});
```

### Key Concepts

1. **`HarnessLoader`**: An object used to find and create harness instances. Get a loader for your component's fixture using `TestbedHarnessEnvironment.loader(fixture)`.

2. **`loader.getHarness(HarnessClass)`**: Asynchronously finds and returns a harness instance for the first matching component.

3. **`HarnessClass.with({ ... })`**: Many harnesses provide a static `with` method that returns a `HarnessPredicate`. This allows you to filter and find components based on their properties, like text, selector, or disabled state. Always use this to precisely target the component you want to test.

4. **Harness API:** Once you have a harness instance, use its methods (e.g., `.click()`, `.getText()`, `.getValue()`) to interact with the component. These methods automatically handle waiting for async operations and change detection.


## Reference: component-styling

# Component Styling

Angular components can define styles that apply specifically to their template, enabling encapsulation and modularity.

## Defining Styles

Styles can be defined inline or in separate files.

```ts
@Component({
  selector: 'app-photo',
  // Inline styles
  styles: `
    img {
      border-radius: 50%;
    }
  `,
  // OR external file
  styleUrl: 'photo.component.css',
})
export class Photo {}
```

## View Encapsulation

Every component has a view encapsulation setting that determines how styles are scoped.

| Mode                            | Behavior                                                                                      |
| :------------------------------ | :-------------------------------------------------------------------------------------------- |
| `Emulated` (Default)            | Scopes styles to the component using unique HTML attributes. Global styles can still leak in. |
| `ShadowDom`                     | Uses the browser's native Shadow DOM API to isolate styles completely.                        |
| `None`                          | Disables encapsulation. Component styles become global.                                       |
| `ExperimentalIsolatedShadowDom` | Strictly guarantees that only the component's styles apply.                                   |

### Usage

```ts
import { ViewEncapsulation } from '@angular/core';

@Component({
  ...,
  encapsulation: ViewEncapsulation.None,
})
export class GlobalStyled {}
```

## Special Selectors

### `:host`

Targets the component's host element (the element matching the component's selector).

```css
:host {
  display: block;
  border: 1px solid black;
}
```

### `:host-context()`

Targets the host element based on some condition in its ancestry.

```css
/* Apply styles if any ancestor has the 'theme-dark' class */
:host-context(.theme-dark) {
  background-color: #333;
}
```

### `::ng-deep`

Disables view encapsulation for a specific rule, allowing it to "leak" into child components.
**Note: The Angular team strongly discourages the use of `::ng-deep`.** It is supported only for backwards compatibility.

## Styles in Templates

You can use `<style>` elements directly in a component's template. View encapsulation rules still apply.

```html
<style>
  .dynamic-class {
    color: red;
  }
</style>
<div class="dynamic-class">Hello</div>
```

## External Styles

Using `<link>` or `@import` in CSS is treated as external styles. **External styles are not affected by emulated view encapsulation.**


## Reference: components

# Components

Angular components are the fundamental building blocks of an application. Each component consists of a TypeScript class with behaviors, an HTML template, and a CSS selector.

## Component Definition

Use the `@Component` decorator to define a component's metadata.

```ts
@Component({
  selector: 'app-profile',
  template: `
    <img src="profile.jpg" alt="Profile photo" />
    <button (click)="save()">Save</button>
  `,
  styles: `
    img {
      border-radius: 50%;
    }
  `,
})
export class Profile {
  save() {
    /* ... */
  }
}
```

## Metadata Options

- `selector`: The CSS selector that identifies this component in templates.
- `template`: Inline HTML template (preferred for small templates).
- `templateUrl`: Path to an external HTML file.
- `styles`: Inline CSS styles.
- `styleUrl` / `styleUrls`: Path(s) to external CSS file(s).
- `imports`: Lists the components, directives, or pipes used in this component's template.

## Using Components

To use a component, add it to the `imports` array of the consuming component and use its selector in the template.

```ts
@Component({
  selector: 'app-root',
  imports: [Profile],
  template: `<app-profile />`,
})
export class App {}
```

## Template Control Flow

Angular uses built-in blocks for conditional rendering and loops.

### Conditional Rendering (`@if`)

Use `@if` to conditionally show content. You can include `@else if` and `@else` blocks.

```html
@if (user.isAdmin) {
<admin-dashboard />
} @else if (user.isModerator) {
<mod-dashboard />
} @else {
<standard-dashboard />
}
```

**Result aliasing**: Save the result of the expression for reuse.

```html
@if (user.settings(); as settings) {
<p>Theme: {{ settings.theme }}</p>
}
```

### Loops (`@for`)

The `@for` block iterates over collections. The `track` expression is **required** for performance and DOM reuse.

```html
<ul>
  @for (item of items(); track item.id; let i = $index, total = $count) {
  <li>{{ i + 1 }}/{{ total }}: {{ item.name }}</li>
  } @empty {
  <li>No items to display.</li>
  }
</ul>
```

**Implicit Variables**: `$index`, `$count`, `$first`, `$last`, `$even`, `$odd`.

### Switching Content (`@switch`)

The `@switch` block renders content based on a value. It uses strict equality (`===`) and has **no fallthrough**.

```html
@switch (status()) { @case ('loading') { <app-spinner /> } @case ('error') { <app-error-msg /> }
@case ('success') { <app-data-grid /> } @default {
<p>Unknown status</p>
} }
```

**Exhaustive Type Checking**: Use `@default never;` to ensure all cases of a union type are handled.

```html
@switch (state) { @case ('on') { ... } @case ('off') { ... } @default never; // Errors if a new
state like 'standby' is added }
```

## Core Concepts

- **Host Element**: The DOM element that matches the component's selector.
- **View**: The DOM rendered by the component's template inside the host element.
- **Standalone**: By default, components are standalone (since Angular 19, `standalone: true` is default). For older versions, `standalone: true` must be explicit or the component must be part of an `NgModule`.
- **Component Tree**: Angular applications are structured as a tree of components, where each component can host child components.
- **Component Naming**: Do not add suffixes the `Component` suffix for Component classes (e.g., AppComponent) unless the project has been configured to use that naming configuration.


## Reference: creating-services

# Creating and Using Services

Services in Angular are reusable pieces of code that handle data fetching, business logic, or state management that multiple components or other services need to access.

## Creating a Service

You can generate a service using the Angular CLI:

```bash
ng generate service my-data
```

Or you can manually create a TypeScript class and decorate it with `@Injectable()`.

```ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasicDataStore {
  private data: string[] = [];

  addData(item: string): void {
    this.data.push(item);
  }

  getData(): string[] {
    return [...this.data];
  }
}
```

### The `providedIn: 'root'` Option

Using `providedIn: 'root'` is the recommended approach for most services. It tells Angular to:

- **Create a single instance (singleton)** for the entire application.
- **Make it available everywhere** automatically, without needing to list it in any `providers` array.
- **Enable tree-shaking**, meaning the service is only included in the final JavaScript bundle if it is actually injected somewhere.

## Injecting a Service

Once a service is created, you can inject it into components, directives, or other services using the `inject()` function.

### Injecting into a Component

```ts
import {Component, inject} from '@angular/core';
import {BasicDataStore} from './basic-data-store.service';

@Component({
  selector: 'app-example',
  template: `
    <div>
      <p>Data items: {{ dataStore.getData().length }}</p>
      <button (click)="dataStore.addData('New Item')">Add Item</button>
    </div>
  `,
})
export class Example {
  // Inject the service as a class field
  dataStore = inject(BasicDataStore);
}
```

### Injecting into Another Service

Services can inject other services in the exact same way.

```ts
import {Injectable, inject} from '@angular/core';
import {AdvancedDataStore} from './advanced-data-store.service';

@Injectable({
  providedIn: 'root',
})
export class BasicDataStore {
  // Injecting another service
  private advancedDataStore = inject(AdvancedDataStore);

  private data: string[] = [];

  getData(): string[] {
    // Combine data from this service and the injected service
    return [...this.data, ...this.advancedDataStore.getData()];
  }
}
```

## Advanced Service Patterns

While `providedIn: 'root'` covers most scenarios, you may sometimes need:

- **Component-specific instances**: If a component needs its own isolated instance of a service, provide it directly in the component's `@Component({ providers: [MyService] })` array.
- **Factory providers**: For dynamic creation.
- **Value providers**: For injecting configuration objects.


## Reference: data-resolvers

# Data Resolvers

Data resolvers fetch data before a route activates, ensuring components have the necessary data upon rendering.

## Creating a Resolver

Implement the `ResolveFn` type.

```ts
export const userResolver: ResolveFn<User> = (route, state) => {
  const userService = inject(UserService);
  const id = route.paramMap.get('id')!;
  return userService.getUser(id);
};
```

## Configuring the Route

Add the resolver under the `resolve` key.

```ts
{
  path: 'user/:id',
  component: UserProfile,
  resolve: {
    user: userResolver
  }
}
```

## Accessing Resolved Data

### 1. Via `ActivatedRoute` (Traditional)

```ts
private route = inject(ActivatedRoute);
data = toSignal(this.route.data);
user = computed(() => this.data().user);
```

### 2. Via Component Inputs (Modern)

Enable `withComponentInputBinding()` in `provideRouter` to pass resolved data directly to `@Input` or `input()`.

```ts
// app.config.ts
provideRouter(routes, withComponentInputBinding());

// component.ts
user = input.required<User>();
```

## Error Handling

Navigation is blocked if a resolver fails.

- Use `withNavigationErrorHandler` for global handling.
- Use `catchError` within the resolver to return a `RedirectCommand` or fallback data.

```ts
return userService
  .get(id)
  .pipe(catchError(() => of(new RedirectCommand(router.parseUrl('/error')))));
```

## Best Practices

- **Keep it lightweight**: Fetch only critical data.
- **Provide feedback**: Listen to router events to show a global loading bar during navigation, as the UI stays on the old page until the resolver finishes.


## Reference: define-routes

# Define Routes

Routes are objects that define which component should render for a specific URL path.

## Basic Configuration

Define routes in a `Routes` array and provide them using `provideRouter` in your `appConfig`.

```ts
// app.routes.ts
export const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'admin', component: AdminPage},
];

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

## URL Paths

- **Static**: Matches an exact string (e.g., `'admin'`).
- **Route Parameters**: Dynamic segments prefixed with a colon (e.g., `'user/:id'`).
- **Wildcard**: Matches any URL using `**`. Useful for "Not Found" pages. **Always place at the end of the array.**

## Matching Strategy

Angular uses a **first-match wins** strategy. Specific routes must come before less specific ones.

## Redirects

Use `redirectTo` to point one path to another.

```ts
{ path: 'articles', redirectTo: '/blog' },
{ path: 'blog', component: Blog },
```

## Page Titles

Associate titles with routes for accessibility. Titles can be static or dynamic (via `ResolveFn` or a custom `TitleStrategy`).

```ts
{ path: 'home', component: Home, title: 'Home Page' }
```

## Route Data and Providers

- **Static Data**: Attach metadata using the `data` property.
- **Route Providers**: Scope dependencies to a specific route and its children using the `providers` array.

## Nested (Child) Routes

Define sub-views using the `children` property. Parent components must include a `<router-outlet />`.

```ts
{
  path: 'product/:id',
  component: Product,
  children: [
    { path: 'info', component: ProductInfo },
    { path: 'reviews', component: ProductReviews },
  ],
}
```


## Reference: defining-providers

# Defining Dependency Providers

Angular offers automatic and manual ways to provide dependencies to its Dependency Injection (DI) system.

## Automatic Provision

The most common way to provide a service is using `providedIn: 'root'` on an `@Injectable()`.

### InjectionToken

Use `InjectionToken` for non-class dependencies (configuration objects, functions, primitives). An `InjectionToken` can also be automatically provided.

```ts
import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({apiUrl: 'https://api.example.com'}),
});
```

## Manual Provision

You use the `providers` array when a service lacks `providedIn`, when you want a new instance for a specific component, or when configuring runtime values.

```ts
@Component({
  providers: [
    // Shorthand for { provide: LocalService, useClass: LocalService }
    LocalService,

    // useClass: Swap implementations
    {provide: Logger, useClass: BetterLogger},

    // useValue: Provide static values
    {provide: API_URL_TOKEN, useValue: 'https://api.example.com'},

    // useFactory: Generate value dynamically
    {
      provide: ApiClient,
      useFactory: (http = inject(HttpClient)) => new ApiClient(http),
    },

    // useExisting: Create an alias
    {provide: OldLogger, useExisting: NewLogger},

    // multi: Provide multiple values for the same token as an array
    {provide: INTERCEPTOR_TOKEN, useClass: AuthInterceptor, multi: true},
  ],
})
export class Example {}
```

## Scopes of Providers

- **Application Bootstrap**: Global singletons. Use for HTTP clients, logging, or app-wide config.
- **Component/Directive**: Isolated instances. Use for component-specific state or forms. Services are destroyed when the component is destroyed.
- **Route**: Feature-specific services loaded only with specific routes.

## Library Pattern: `provide*` functions

Library authors should export functions that return provider arrays to encapsulate configuration:

```ts
export function provideAnalytics(config: AnalyticsConfig): Provider[] {
  return [{provide: ANALYTICS_CONFIG, useValue: config}, AnalyticsService];
}
```


## Reference: di-fundamentals

# Dependency Injection (DI) Fundamentals

Dependency Injection (DI) is a design pattern used to organize and share code across an application by allowing you to "inject" features into different parts. This improves code maintainability, scalability, and testability.

## How DI Works in Angular

There are two primary ways code interacts with Angular's DI system:

1. **Providing**: Making values (objects, functions, primitives) available to the DI system.
2. **Injecting**: Asking the DI system for those values.

Angular components, directives, and services automatically participate in DI.

## Services

A **service** is the most common way to share data and functionality across an application. It is a TypeScript class decorated with `@Injectable()`.

### Creating a Service

Use the `providedIn: 'root'` option in the `@Injectable` decorator to make the service a singleton available throughout the entire application. This is the recommended approach for most services.

```ts
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes this a singleton available everywhere
})
export class AnalyticsLogger {
  trackEvent(category: string, value: string) {
    console.log('Analytics event logged:', {category, value});
  }
}
```

Common uses for services include:

- Data clients (API calls)
- State management
- Authentication and authorization
- Logging and error handling
- Utility functions

## Injecting Dependencies

Use Angular's `inject()` function to request dependencies.

### The `inject()` Function

You can use the `inject()` function to get an instance of a service (or any other provided token).

```ts
import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AnalyticsLogger} from './analytics-logger.service';

@Component({
  selector: 'app-navbar',
  template: `<a href="#" (click)="navigateToDetail($event)">Detail Page</a>`,
})
export class Navbar {
  // Injecting dependencies using class field initializers
  private router = inject(Router);
  private analytics = inject(AnalyticsLogger);

  navigateToDetail(event: Event) {
    event.preventDefault();
    this.analytics.trackEvent('navigation', '/details');
    this.router.navigate(['/details']);
  }
}
```

### Where can `inject()` be used? (Injection Context)

You can call `inject()` in an **injection context**. The most common injection contexts are during the construction of a component, directive, or service.

Valid places to call `inject()`:

1. **Class field initializers** (Recommended)
2. **Constructor body**
3. **Route guards and resolvers** (which are executed in an injection context)
4. **Factory functions** used in providers

```typescript
import {Component, Directive, Injectable, inject, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// 1. In a Component (Field Initializer & Constructor)
@Component({
  /*...*/
})
export class Example {
  private service1 = inject(MyService); // Valid field initializer

  private service2: MyService;
  constructor() {
    this.service2 = inject(MyService); // Valid constructor body
  }
}

// 2. In a Directive
@Directive({
  /*...*/
})
export class MyDirective {
  private element = inject(ElementRef); // Valid field initializer
}

// 3. In a Service
@Injectable({providedIn: 'root'})
export class MyService {
  private http = inject(HttpClient); // Valid field initializer
}

// 4. In a Route Guard (Functional)
export const authGuard = () => {
  const auth = inject(AuthService); // Valid route guard
  return auth.isAuthenticated();
};
```


## Reference: e2e-testing

# End-to-End (E2E) Testing

Use E2E tests to cover critical user journeys in a real browser. Prefer the framework already configured in the Angular workspace, such as Cypress or Playwright.

## Running E2E Tests

Check `package.json` and `angular.json` for the project-specific command. Common patterns include:

```shell
npm run e2e
pnpm e2e
ng e2e
```

When the app must be built or served first, use the existing project scripts instead of inventing a parallel test entrypoint.

## Test Structure

- Keep E2E specs close to the configured test framework, such as `cypress/e2e/` or `e2e/`.
- Put reusable login/setup helpers in the framework support directory.
- Keep fixtures explicit and small enough that each test can explain the user state it depends on.

### Cypress Example

```typescript
describe('Login flow', () => {
  it('redirects to dashboard on valid credentials', () => {
    cy.visit('/login');
    cy.get('[data-cy=email]').type('user@example.com');
    cy.get('[data-cy=password]').type('password123');
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### Playwright Example

```typescript
import {expect, test} from '@playwright/test';

test('redirects to dashboard on valid credentials', async ({page}) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', {name: 'Sign in'}).click();
  await expect(page).toHaveURL(/dashboard/);
});
```

## Best Practices

- Prefer accessible locators (`getByRole`, `getByLabel`) or stable `data-*` attributes.
- Avoid selectors that depend on CSS classes, DOM depth, or incidental text.
- Wait for specific UI states, routes, or network responses instead of arbitrary sleeps.
- Keep smoke tests short and reserve full workflow coverage for the highest-value paths.


## Reference: effects

# Side Effects with `effect` and `afterRenderEffect`

In Angular, an **effect** is an operation that runs whenever one or more signal values it tracks change.

## When to use `effect`

Effects are intended for syncing signal state to imperative, non-signal APIs.

**Valid Use Cases:**

- Logging analytics.
- Syncing state to `localStorage` or `sessionStorage`.
- Performing custom rendering to a `<canvas>` or 3rd-party charting library.

**CRITICAL RULE: DO NOT use effects to propagate state.**
If you find yourself using `.set()` or `.update()` on a signal _inside_ an effect to keep two signals in sync, you are making a mistake. This causes `ExpressionChangedAfterItHasBeenChecked` errors and infinite loops. **Always use `computed()` or `linkedSignal()` for state derivation.**

## Basic Usage

Effects execute asynchronously during the change detection process. They always run at least once.

```ts
import { Component, signal, effect } from '@angular/core';

@Component({...})
export class Example {
  count = signal(0);

  constructor() {
    // Effect must be created in an injection context (e.g., a constructor)
    effect((onCleanup) => {
      console.log(`Count changed to ${this.count()}`);

      const timer = setTimeout(() => console.log('Timer finished'), 1000);

      // Cleanup function runs before the next execution, or when destroyed
      onCleanup(() => clearTimeout(timer));
    });
  }
}
```

## DOM Manipulation with `afterRenderEffect`

Standard `effect` runs _before_ Angular updates the DOM. If you need to manually inspect or modify the DOM based on a signal change (e.g., integrating a 3rd party UI library), use `afterRenderEffect`.

`afterRenderEffect` runs after Angular has finished rendering the DOM.

### Render Phases

To prevent reflows (forced layout thrashing), `afterRenderEffect` forces you to divide your DOM reads and writes into specific phases.

```ts
import { Component, afterRenderEffect, viewChild, ElementRef } from '@angular/core';

@Component({...})
export class Chart {
  canvas = viewChild.required<ElementRef>('canvas');

  constructor() {
    afterRenderEffect({
      // 1. Read from the DOM
      earlyRead: () => {
        return this.canvas().nativeElement.getBoundingClientRect().width;
      },
      // 2. Write to the DOM (receives the result of the previous phase)
      write: (width) => {
        // NEVER read from the DOM in the write phase.
        setupChart(this.canvas().nativeElement, width);
      }
    });
  }
}
```

**Available Phases (executed in this order):**

1. `earlyRead`
2. `write` (Never read here)
3. `mixedReadWrite` (Avoid if possible)
4. `read` (Never write here)

_Note: `afterRenderEffect` only runs on the client, never during Server-Side Rendering (SSR)._


## Reference: hierarchical-injectors

# Hierarchical Injectors

Angular's dependency injection system is hierarchical, meaning services can be scoped to different levels of the application.

## Types of Injector Hierarchies

1. **`EnvironmentInjector` Hierarchy**: Configured via `@Injectable({ providedIn: 'root' })` or `ApplicationConfig.providers` during bootstrap. These are global singletons.
2. **`ElementInjector` Hierarchy**: Created implicitly at each DOM element. Configured via the `providers` or `viewProviders` array in `@Component()` or `@Directive()`.

## Resolution Rules

When a dependency is requested, Angular resolves it in two phases:

1. It searches up the **`ElementInjector`** tree, starting from the requesting component/directive up to the root element.
2. If not found, it searches the **`EnvironmentInjector`** tree, starting from the closest environment injector up to the root.
3. If still not found, it throws an error (unless marked optional).

## Resolution Modifiers

You can alter how Angular searches for a dependency using the options object in `inject()`:

- **`optional`**: If the dependency isn't found, return `null` instead of throwing an error.
- **`self`**: Only check the current `ElementInjector`. Do not look up the parent tree.
- **`skipSelf`**: Start searching in the parent `ElementInjector`, skipping the current element.
- **`host`**: Stop searching when reaching the host component's view boundary.

```ts
@Component({...})
export class Example {
  // Returns null if not found instead of crashing
  optionalService = inject(MyService, { optional: true });

  // Skips this component's providers, looks at parent
  parentService = inject(ParentService, { skipSelf: true });
}
```

## `providers` vs `viewProviders`

When providing a service at the component level:

- **`providers`**: The service is available to the component, its view (template), and any **projected content** (`<ng-content>`).
- **`viewProviders`**: The service is available to the component and its view, but **NOT** to projected content. Use this to isolate services from content passed in by consumers.


## Reference: host-elements

# Component Host Elements

The **host element** is the DOM element that matches a component's selector. The component's template renders inside this element.

## Binding to the Host Element

Use the `host` property in the `@Component` decorator to bind properties, attributes, styles, and events to the host element. This is the **preferred approach** over legacy decorators.

```ts
@Component({
  selector: 'custom-slider',
  host: {
    'role': 'slider', // Static attribute
    '[attr.aria-valuenow]': 'value', // Attribute binding
    '[class.active]': 'isActive()', // Class binding
    '[style.color]': 'color()', // Style binding
    '[tabIndex]': 'disabled ? -1 : 0', // Property binding
    '(keydown)': 'onKeyDown($event)', // Event binding
  },
})
export class CustomSlider {
  value = 0;
  disabled = false;
  isActive = signal(false);
  color = signal('blue');

  onKeyDown(event: KeyboardEvent) {
    /* ... */
  }
}
```

## Legacy Decorators

`@HostBinding` and `@HostListener` are supported for backwards compatibility but should be avoided in new code.

```ts
export class CustomSlider {
  @HostBinding('tabIndex')
  get tabIndex() {
    return this.disabled ? -1 : 0;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    /* ... */
  }
}
```

## Binding Collisions

If both the component (host binding) and the consumer (template binding) bind to the same property:

1. **Static vs Static**: The instance (consumer) binding wins.
2. **Static vs Dynamic**: The dynamic binding wins.
3. **Dynamic vs Dynamic**: The component's host binding wins.

## Injecting Host Attributes

Use `HostAttributeToken` with the `inject` function to read static attributes from the host element at construction time.

```ts
import {Component, HostAttributeToken, inject} from '@angular/core';

@Component({
  selector: 'app-btn',
  template: `<ng-content />`,
})
export class AppButton {
  // Throws error if 'type' is missing unless injected with { optional: true }
  type = inject(new HostAttributeToken('type'));
}
```

Usage:

```html
<app-btn type="primary">Click Me</app-btn>
```


## Reference: injection-context

# Injection Context

The `inject()` function can only be used when code is executing within an **injection context**.

## Where is an Injection Context Available?

An injection context is automatically available in:

1. **Field initializers** of classes instantiated by DI (`@Injectable`, `@Component`, `@Directive`, `@Pipe`).
2. **Constructors** of classes instantiated by DI.
3. **Factory functions** specified in `useFactory` or `InjectionToken` configurations.
4. **Functional APIs** executed by Angular (e.g., functional route guards, resolvers, interceptors).

```ts
@Component({...})
export class Example {
  // Valid: Field initializer
  private router = inject(Router);

  constructor() {
    // Valid: Constructor
    const http = inject(HttpClient);
  }

  onClick() {
    // Invalid: Not an injection context
    // const auth = inject(AuthService);
  }
}
```

## `runInInjectionContext`

If you need to run a function within an injection context (often needed for dynamic component creation or testing), use `runInInjectionContext`. This requires access to an existing injector (like `EnvironmentInjector` or `Injector`).

```ts
import {Injectable, inject, EnvironmentInjector, runInInjectionContext} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MyService {
  private injector = inject(EnvironmentInjector);

  doSomethingDynamic() {
    runInInjectionContext(this.injector, () => {
      // Now valid to use inject() here
      const router = inject(Router);
    });
  }
}
```

## `assertInInjectionContext`

Use `assertInInjectionContext` in utility functions to guarantee they are called from a valid context. It throws a clear error if not.

```ts
import {assertInInjectionContext, inject, ElementRef} from '@angular/core';

export function injectNativeElement<T extends Element>(): T {
  assertInInjectionContext(injectNativeElement);
  return inject(ElementRef).nativeElement;
}
```


## Reference: inputs

# Inputs

Inputs allow data to flow from a parent component to a child component. Angular recommends using the signal-based `input` API for modern applications.

## Signal-based Inputs

Declare inputs using the `input()` function. This returns an `InputSignal`.

```ts
import {Component, input, computed} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `<p>User: {{ name() }} ({{ age() }})</p>`,
})
export class User {
  // Optional input with default value
  name = input('Guest');

  // Required input
  age = input.required<number>();

  // Inputs are reactive signals
  label = computed(() => `Name: ${this.name()}`);
}
```

### Usage in Template

```html
<app-user [name]="userName" [age]="25" />
```

## Configuration Options

The `input` function accepts a config object:

- **Alias**: Change the property name used in templates.
- **Transform**: Modify the value before it reaches the component.

```ts
import { input, booleanAttribute } from '@angular/core';

@Component({...})
export class CustomButton {
  // Alias example
  label = input('', { alias: 'btnLabel' });

  // Transform example using built-in helper
  disabled = input(false, { transform: booleanAttribute });
}
```

## Model Inputs (Two-Way Binding)

Use `model()` to create an input that supports two-way data binding.

```ts
@Component({
  selector: 'custom-counter',
  template: `<button (click)="increment()">+</button>`,
})
export class CustomCounter {
  value = model(0);

  increment() {
    this.value.update((v) => v + 1);
  }
}
```

### Usage

```html
<!-- Two-way binding with a signal -->
<custom-counter [(value)]="mySignal" />

<!-- Two-way binding with a plain property -->
<custom-counter [(value)]="myProperty" />
```

## Decorator-based Inputs (@Input)

The legacy API remains supported but is not recommended for new code.

```ts
import { Component, Input } from '@angular/core';

@Component({...})
export class Legacy {
  @Input({ required: true }) value = 0;
  @Input({ transform: trimString }) label = '';
}
```

## Best Practices

- **Prefer Signals**: Use `input()` instead of `@Input()` for better reactivity and type safety.
- **Required Inputs**: Use `input.required()` for mandatory data to get build-time errors.
- **Pure Transforms**: Ensure input transform functions are pure and statically analyzable.
- **Avoid Collisions**: Do not use input names that collide with standard DOM properties (e.g., `id`, `title`).


## Reference: linked-signal

# Dependent State with `linkedSignal`

The `linkedSignal` function lets you create writable state that is intrinsically linked to some other state. It is perfect for state that needs a default value derived from an input or another signal, but can still be independently modified by the user.

If the source state changes, the `linkedSignal` resets to a new computed value.

## Basic Usage

When you only need to recompute based on a source, pass a computation function. `linkedSignal` works like `computed`, but the resulting signal is writable (you can call `.set()` or `.update()` on it).

```ts
import { Component, signal, linkedSignal } from '@angular/core';

@Component({...})
export class ShippingMethodPicker {
  shippingOptions = signal(['Ground', 'Air', 'Sea']);

  // Defaults to the first option.
  // If shippingOptions changes, selectedOption resets to the new first option.
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  changeShipping(index: number) {
    // We can still manually update this signal!
    this.selectedOption.set(this.shippingOptions()[index]);
  }
}
```

## Advanced Usage: Accounting for Previous State

Sometimes, when the source state changes, you want to preserve the user's manual selection if it is still valid. To do this, use the object syntax providing `source` and `computation`.

The `computation` function receives the new value of the source, and a `previous` object containing the previous source value and the previous `linkedSignal` value.

```ts
interface ShippingMethod { id: number; name: string; }

@Component({...})
export class ShippingMethodPicker {
  shippingOptions = signal<ShippingMethod[]>([
    {id: 0, name: 'Ground'}, {id: 1, name: 'Air'}, {id: 2, name: 'Sea'}
  ]);

  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    source: this.shippingOptions,
    computation: (newOptions, previous) => {
      // If the newly loaded options still contain the user's previously
      // selected option, keep it selected. Otherwise, reset to the first option.
      return newOptions.find(opt => opt.id === previous?.value.id) ?? newOptions[0];
    }
  });
}
```

### When to use `linkedSignal` vs `computed` vs `effect`

- Use `computed`: When state is **strictly** derived from other state and should never be manually updated.
- Use `linkedSignal`: When state is derived from other state, but the user **must** be able to override or manually update it.
- **Never** use `effect` to sync one piece of state to another. That is an anti-pattern. Use `computed` or `linkedSignal` instead.


## Reference: loading-strategies

# Route Loading Strategies

Angular supports two main strategies for loading routes and components to balance initial load time and navigation responsiveness.

## Eager Loading

Components are bundled into the initial JavaScript payload and are available immediately.

```ts
{ path: 'home', component: Home }
```

- **Pros**: Seamless transitions.
- **Cons**: Increases initial bundle size.

## Lazy Loading

Components or routes are loaded only when the user navigates to them. This creates separate JavaScript "chunks".

### Lazy Loading Components

Use `loadComponent` to fetch the component on demand.

```ts
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)`,
}
```

### Lazy Loading Child Routes

Use `loadChildren` to fetch a set of routes.

```ts
{
  path: 'settings',
  loadChildren: () => import('./settings/settings.routes'),
}
```

## Injection Context and Lazy Loading

Loader functions run within the **injection context** of the current route. This allows you to call `inject()` to make context-aware loading decisions.

```ts
{
  path: 'dashboard',
  loadComponent: () => {
    const flags = inject(FeatureFlags);
    return flags.isPremium
      ? import('./premium-dashboard')
      : import('./basic-dashboard');
  },
}
```

## Recommendation

- Use **Eager Loading** for the primary landing pages.
- Use **Lazy Loading** for all other feature areas to keep the initial bundle small.


## Reference: mcp

# Angular CLI MCP Server

The Angular CLI includes a Model Context Protocol (MCP) server that enables AI assistants (like Cursor, Gemini CLI, JetBrains AI, etc.) to interact directly with the Angular CLI. It provides tools for code generation, modernizing code, fetching examples, and running builds/tests.

## Available Tools (Default)

When the MCP server is enabled, AI agents have access to the following tools:

| Name                        | Description                                                                                               |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `ai_tutor`                  | Launches an interactive AI-powered Angular tutor.                                                         |
| `find_examples`             | Finds authoritative, best-practice code examples for modern Angular features.                             |
| `get_best_practices`        | Retrieves the Angular Best Practices Guide (crucial for standalone components, typed forms, etc.).        |
| `list_projects`             | Lists all applications and libraries in the workspace by reading `angular.json`.                          |
| `onpush_zoneless_migration` | Analyzes code and provides a plan to migrate it to `OnPush` change detection (prerequisite for zoneless). |
| `search_documentation`      | Searches the official documentation at `https://angular.dev`.                                             |

## Experimental Tools

Some tools must be enabled explicitly using the `--experimental-tool` (or `-E`) flag.

| Name                       | Description                                                              |
| :------------------------- | :----------------------------------------------------------------------- |
| `build`                    | Performs a one-off build using `ng build`.                               |
| `devserver.start`          | Asynchronously starts a dev server (`ng serve`). Returns immediately.    |
| `devserver.stop`           | Stops the dev server.                                                    |
| `devserver.wait_for_build` | Returns the logs of the most recent build in a running dev server.       |
| `e2e`                      | Executes end-to-end tests.                                               |
| `modernize`                | Performs code migrations to align with latest best practices and syntax. |
| `test`                     | Runs the project's unit tests.                                           |

## Configuration

To use the MCP server, you configure your host environment (IDE or CLI) to run `npx @angular/cli mcp`.

### Antigravity IDE

Create a file named `.antigravity/mcp.json` in your project's root:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

### Gemini CLI

Create `.gemini/settings.json` in the project root:

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

### Cursor

Create `.cursor/mcp.json` in the project root (or globally at `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

### VS Code

Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "angular-cli": {
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
```

## Command Options

You can pass arguments to the MCP server in the `args` array of your configuration:

- `--read-only`: Only registers tools that do not modify the project.
- `--local-only`: Only registers tools that do not require an internet connection.
- `--experimental-tool` (`-E`): Enables specific experimental tools (e.g., `-E build`, `-E devserver`).

Example for read-only mode with experimental tools enabled:

```json
"args": ["-y", "@angular/cli", "mcp", "--read-only", "-E", "build", "-E", "modernize"]
```


## Reference: navigate-to-routes

# Navigate to Routes

Angular provides both declarative and programmatic ways to navigate between routes.

## Declarative Navigation (`RouterLink`)

Use the `RouterLink` directive on anchor elements.

```ts
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active-link">Dashboard</a>
      <a [routerLink]="['/user', userId]">Profile</a>
    </nav>
  `,
})
export class Nav {
  userId = '123';
}
```

- **Absolute Paths**: Start with `/` (e.g., `/settings`).
- **Relative Paths**: No leading `/`. Use `../` to go up a level.

## Programmatic Navigation (`Router`)

Inject the `Router` service to navigate via TypeScript code.

### `router.navigate()`

Uses an array of commands.

```ts
private router = inject(Router);
private route = inject(ActivatedRoute);

// Standard navigation
this.router.navigate(['/profile']);

// With parameters
this.router.navigate(['/search'], {
  queryParams: { q: 'angular' },
  fragment: 'results'
});

// Relative navigation
this.router.navigate(['edit'], { relativeTo: this.route });
```

### `router.navigateByUrl()`

Uses a string path. Ideal for absolute navigation or full URLs.

```ts
this.router.navigateByUrl('/products/123?view=details');

// Replace current entry in history
this.router.navigateByUrl('/login', {replaceUrl: true});
```

## URL Parameters

- **Route Params**: Part of the path (e.g., `/user/123`).
- **Query Params**: After the `?` (e.g., `/search?q=query`).
- **Matrix Params**: Scoped to a segment (e.g., `/products;category=books`).


## Reference: outputs

# Outputs (Custom Events)

Outputs allow a child component to emit custom events that a parent component can listen to. Angular recommends using the new `output()` function for modern applications.

## Function-based outputs

Declare outputs using the `output()` function. This returns an `OutputEmitterRef`.

```ts
import {Component, output} from '@angular/core';

@Component({
  selector: 'custom-slider',
  template: `<button (click)="changeValue(50)">Set to 50</button>`,
})
export class CustomSlider {
  // Output without event data
  panelClosed = output<void>();

  // Output with event data (number)
  valueChanged = output<number>();

  changeValue(newValue: number) {
    this.valueChanged.emit(newValue);
  }
}
```

### Usage in Template

Bind to the output event using parentheses `()`. If the event emits data, access it using the special `$event` variable.

```html
<custom-slider (panelClosed)="savePanelState()" (valueChanged)="logValue($event)" />
```

## Configuration Options

The `output` function accepts a config object to specify an alias.

```ts
@Component({...})
export class CustomSlider {
  // The event is named 'valueChanged' in the template,
  // but accessed as 'changed' in the component class.
  changed = output<number>({ alias: 'valueChanged' });
}
```

## Programmatic Subscription

When creating components dynamically, you can subscribe to outputs programmatically:

```ts
const componentRef = viewContainerRef.createComponent(CustomSlider);

const subscription = componentRef.instance.valueChanged.subscribe((val) => {
  console.log('Value changed:', val);
});

// Clean up manually if needed (Angular cleans up destroyed components automatically)
subscription.unsubscribe();
```

## Decorator-based Outputs (@Output)

The legacy API uses the `@Output()` decorator with an `EventEmitter`. It remains supported but is not recommended for new code.

```ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({...})
export class LegacyExample {
  @Output() valueChanged = new EventEmitter<number>();

  // With alias
  @Output('customEventName') changed = new EventEmitter<void>();
}
```

## Best Practices

- **Prefer `output()`**: Use the function-based `output()` instead of `@Output()` and `EventEmitter`.
- **Naming**: Use `camelCase` for output names. Avoid prefixing with `on` (e.g., use `valueChanged` instead of `onValueChanged`).
- **No DOM Bubbling**: Angular custom events do not bubble up the DOM tree like native events.
- **Avoid Collisions**: Do not choose names that collide with native DOM events (like `click` or `submit`).


## Reference: reactive-forms

# Reactive Forms

Reactive forms provide a model-driven approach to handling form inputs. They are built around observable streams and provide synchronous access to the data model, making them more scalable and testable than template-driven forms.

## Core Classes

Reactive forms are built using these fundamental classes from `@angular/forms`:

- `FormControl`: Manages the value and validity of an individual input.
- `FormGroup`: Manages a group of controls (an object-like structure).
- `FormArray`: Manages a numerically indexed array of controls.
- `FormBuilder`: A service that provides factory methods for creating control instances.

## Setup

Import `ReactiveFormsModule` into your component.

```ts
import {Component, inject} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-editor.component.html',
})
export class ProfileEditor {
  private fb = inject(FormBuilder);

  // Using FormBuilder for concise definition
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
    }),
    aliases: this.fb.array([this.fb.control('')]),
  });

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
```

## Template Binding

Use directives to bind the model to the view:

- `[formGroup]`: Binds a `FormGroup` to a `<form>` or `<div>`.
- `formControlName`: Binds a named control within a group to an input.
- `formGroupName`: Binds a nested `FormGroup`.
- `formArrayName`: Binds a nested `FormArray`.
- `[formControl]`: Binds a standalone `FormControl`.

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="firstName" />

  <div formGroupName="address">
    <input type="text" formControlName="street" />
  </div>

  <div formArrayName="aliases">
    @for (alias of aliases.controls; track $index) {
    <input type="text" [formControlName]="$index" />
    }
  </div>

  <button type="submit" [disabled]="!profileForm.valid">Submit</button>
</form>
```

## Accessing Controls

Use getters for easy access to controls, especially for `FormArray`.

```ts
get aliases() {
  return this.profileForm.get('aliases') as FormArray;
}

addAlias() {
  this.aliases.push(this.fb.control(''));
}
```

## Updating Values

- `patchValue()`: Updates only the specified properties. Fails silently on structural mismatches.
- `setValue()`: Replaces the entire model. Strictly enforces the form structure.

```ts
updateProfile() {
  this.profileForm.patchValue({
    firstName: 'Nancy',
    address: { street: '123 Drew Street' }
  });
}
```

## Unified Change Events

Modern Angular (v18+) provides a single `events` observable on all controls to track value, status, pristine, touched, reset, and submit events.

```ts
import {ValueChangeEvent, StatusChangeEvent} from '@angular/forms';

this.profileForm.events.subscribe((event) => {
  if (event instanceof ValueChangeEvent) {
    console.log('New value:', event.value);
  }
});
```

## Manual State Management

- `markAsTouched()` / `markAllAsTouched()`: Useful for showing validation errors on submit.
- `markAsDirty()` / `markAsPristine()`: Tracks if the value has been modified.
- `updateValueAndValidity()`: Manually triggers recalculation of value and status.
- Options `{ emitEvent: false }` or `{ onlySelf: true }` can be passed to most methods to control propagation.


## Reference: rendering-strategies

# Rendering Strategies

Angular supports multiple rendering strategies to optimize for SEO, performance, and interactivity.

## 1. Client-Side Rendering (CSR)

**Default Strategy.** Content is rendered entirely in the browser.

- **Use case**: Interactive dashboards, internal tools.
- **Pros**: Simplest to configure, low server cost.
- **Cons**: Poor SEO, slower initial content visibility (must wait for JS).

## 2. Static Site Generation (SSG / Prerendering)

Content is pre-rendered into static HTML files at **build time**.

- **Use case**: Marketing pages, blogs, documentation.
- **Pros**: Fastest initial load, excellent SEO, CDN-friendly.
- **Cons**: Requires rebuild for content updates, not for user-specific data.

## 3. Server-Side Rendering (SSR)

Content is rendered on the server for the **initial request**. Subsequent navigations happen client-side (SPA style).

- **Use case**: E-commerce product pages, news sites, personalized dynamic content.
- **Pros**: Excellent SEO, fast initial content visibility.
- **Cons**: Requires a server (Node.js), higher server cost/latency.

## Hydration

Hydration is the process of making server-rendered HTML interactive in the browser.

- **Full Hydration**: The entire app becomes interactive at once.
- **Incremental Hydration**: (Advanced) Parts become interactive as needed using `@defer` blocks.
- **Event Replay**: Captures and replays user events that happened before hydration finished.

## Decision Matrix

| Requirement                     | Strategy             |
| :------------------------------ | :------------------- |
| **SEO + Static Content**        | SSG                  |
| **SEO + Dynamic Content**       | SSR                  |
| **No SEO + High Interactivity** | CSR                  |
| **Mixed**                       | Hybrid (Route-based) |


## Reference: resource

# Async Reactivity with `resource`

> [!IMPORTANT]
> The `resource` API is currently experimental in Angular.

A `Resource` incorporates asynchronous data fetching into Angular's signal-based reactivity. It executes an async loader function whenever its dependencies change, exposing the status and result as synchronous signals.

## Basic Usage

The `resource` function accepts an options object with two main properties:

1. `params`: A reactive computation (like `computed`). When signals read here change, the resource re-fetches.
2. `loader`: An async function that fetches data based on the parameters.

```ts
import { Component, resource, signal, computed } from '@angular/core';

@Component({...})
export class UserProfile {
  userId = signal('123');

  userResource = resource({
    // Reactively tracking userId
    params: () => ({ id: this.userId() }),

    // Executes whenever params change
    loader: async ({ params, abortSignal }) => {
      const response = await fetch(`/api/users/${params.id}`, { signal: abortSignal });
      if (!response.ok) throw new Error('Network error');
      return response.json();
    }
  });

  // Use the resource value in computed signals
  userName = computed(() => {
    if (this.userResource.hasValue()) {
      return this.userResource.value()?.name;
    } else {
      return 'Loading...';
    }
  });
}
```

## Aborting Requests

If the `params` signal changes while a previous loader is still running, the `Resource` will attempt to abort the outstanding request using the provided `abortSignal`. **Always pass `abortSignal` to your `fetch` calls.**

## Reloading Data

You can imperatively force the resource to re-run the loader without the params changing by calling `.reload()`.

```ts
this.userResource.reload();
```

## Resource Status Signals

The `Resource` object provides several signals to read its current state:

- `value()`: The resolved data, or `undefined`.
- `hasValue()`: Type-guard boolean. `true` if a value exists.
- `isLoading()`: Boolean indicating if the loader is currently running.
- `error()`: The error thrown by the loader, or `undefined`.
- `status()`: A string constant representing the exact state (`'idle'`, `'loading'`, `'resolved'`, `'error'`, `'reloading'`, `'local'`).

## Local Mutation

You can optimistically update the resource's value directly. This changes the status to `'local'`.

```ts
this.userResource.value.set({name: 'Optimistic Update'});
```

## Reactive Data Fetching with `httpResource`

If you are using Angular's `HttpClient`, prefer using `httpResource`. It is a specialized wrapper that leverages the Angular HTTP stack (including interceptors) while providing the same signal-based resource API.


## Reference: route-animations

# Route Transition Animations

Angular Router supports the browser's **View Transitions API** for smooth visual transitions between routes.

## Enabling View Transitions

Add `withViewTransitions()` to your router configuration.

```ts
provideRouter(routes, withViewTransitions());
```

This is a **progressive enhancement**. In browsers that don't support the API, the router will still work but without the transition animation.

## How it Works

1. Browser takes a screenshot of the old state.
2. Router updates the DOM (activates new component).
3. Browser takes a screenshot of the new state.
4. Browser animates between the two states.

## Customizing with CSS

Transitions are customized in **global CSS files** (not component-scoped CSS).

Use the `::view-transition-old()` and `::view-transition-new()` pseudo-elements.

```css
/* Example: Cross-fade + Slide */
::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
}
::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in;
}
```

## Advanced Control

Use `onViewTransitionCreated` to skip transitions or customize behavior based on the navigation context.

```ts
withViewTransitions({
  onViewTransitionCreated: ({transition, from, to}) => {
    // Skip animation for specific routes
    if (to.url === '/no-animation') {
      transition.skipTransition();
    }
  },
});
```

## Best Practices

- **Global Styles**: Always define transition animations in `styles.css` to avoid view encapsulation issues.
- **View Transition Names**: Assign unique `view-transition-name` to elements that should transition smoothly across routes (e.g., a header image).


## Reference: route-guards

# Route Guards

Route guards control whether a user can navigate to or leave a route.

## Types of Guards

- **`CanActivate`**: Can the user access this route? (e.g., Auth check).
- **`CanActivateChild`**: Can the user access children of this route?
- **`CanDeactivate`**: Can the user leave this route? (e.g., Unsaved changes).
- **`CanMatch`**: Should this route even be considered for matching? (e.g., Feature flags). If it returns `false`, the router continues checking other routes.

## Creating a Guard

Guards are typically functional since Angular 15.

```ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login
  return router.parseUrl('/login');
};
```

## Applying Guards

Add them to the route configuration as an array. They execute in order.

```ts
{
  path: 'admin',
  component: Admin,
  canActivate: [authGuard],
  canActivateChild: [adminChildGuard],
  canDeactivate: [unsavedChangesGuard]
}
```

## Return Values

- `boolean`: `true` to allow, `false` to block.
- `UrlTree` or `RedirectCommand`: Redirect to a different route.
- `Observable` or `Promise`: Resolves to the above types.

## Security Note

**Client-side guards are NOT a substitute for server-side security.** Always verify permissions on the server.


## Reference: router-lifecycle

# Router Lifecycle and Events

Angular Router emits events through the `Router.events` observable, allowing you to track the navigation lifecycle from start to finish.

## Common Router Events (Chronological)

1. **`NavigationStart`**: Navigation begins.
2. **`RoutesRecognized`**: Router matches the URL to a route.
3. **`GuardsCheckStart` / `End`**: Evaluation of `canActivate`, `canMatch`, etc.
4. **`ResolveStart` / `End`**: Data resolution phase (fetching data via resolvers).
5. **`NavigationEnd`**: Navigation completed successfully.
6. **`NavigationCancel`**: Navigation canceled (e.g., guard returned `false`).
7. **`NavigationError`**: Navigation failed (e.g., error in resolver).

## Subscribing to Events

Inject the `Router` and filter the `events` observable.

```ts
import {Router, NavigationStart, NavigationEnd} from '@angular/router';

export class MyService {
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((event) => {
      console.log('Navigated to:', event.url);
    });
  }
}
```

## Debugging

Enable detailed console logging of all routing events during application bootstrap.

```ts
provideRouter(routes, withDebugTracing());
```

## Common Use Cases

- **Loading Indicators**: Show a spinner when `NavigationStart` fires and hide it on `NavigationEnd`/`Cancel`/`Error`.
- **Analytics**: Track page views by listening for `NavigationEnd`.
- **Scroll Management**: Respond to `Scroll` events for custom scroll behavior.


## Reference: router-testing

# Testing with the RouterTestingHarness

When testing components that involve routing, it is crucial **not to mock the Router or related services**. Instead, use the `RouterTestingHarness`, which provides a robust and reliable way to test routing logic in an environment that closely mirrors a real application.

Using the harness ensures you are testing the actual router configuration, guards, and resolvers, leading to more meaningful tests.

## Setting Up for Router Testing

The `RouterTestingHarness` is the primary tool for testing routing scenarios. You also need to provide your test routes using the `provideRouter` function in your `TestBed` configuration.

### Example Setup

```ts
import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {Dashboard} from './dashboard.component';
import {HeroDetail} from './hero-detail.component';

describe('Dashboard Component Routing', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    // 1. Configure TestBed with test routes
    await TestBed.configureTestingModule({
      providers: [
        // Use provideRouter with your test-specific routes
        provideRouter([
          {path: '', component: Dashboard},
          {path: 'heroes/:id', component: HeroDetail},
        ]),
      ],
    }).compileComponents();

    // 2. Create the RouterTestingHarness
    harness = await RouterTestingHarness.create();
  });
});
```

### Key Concepts

1. **`provideRouter([...])`**: Provide a test-specific routing configuration. This should include the routes necessary for the component-under-test to function correctly.
2. **`RouterTestingHarness.create()`**: Asynchronously creates and initializes the harness and performs an initial navigation to the root URL (`/`).

## Writing Router Tests

Once the harness is created, you can use it to drive navigation and make assertions on the state of the router and the activated components.

### Example: Testing Navigation

```ts
it('should navigate to a hero detail when a hero is selected', async () => {
  // 1. Navigate to the initial component and get its instance
  const dashboard = await harness.navigateByUrl('/', Dashboard);

  // Suppose the dashboard has a method to select a hero
  const heroToSelect = {id: 42, name: 'Test Hero'};
  dashboard.selectHero(heroToSelect);

  // Wait for stability after the action that triggers navigation
  await harness.fixture.whenStable();

  // 2. Assert on the URL
  expect(harness.router.url).toEqual('/heroes/42');

  // 3. Get the activated component after navigation
  const heroDetail = await harness.getHarness(HeroDetail);

  // 4. Assert on the state of the new component
  expect(await heroDetail.componentInstance.hero.name).toBe('Test Hero');
});

it('should get the activated component directly', async () => {
  // Navigate and get the component instance in one step
  const dashboardInstance = await harness.navigateByUrl('/', Dashboard);

  expect(dashboardInstance).toBeInstanceOf(Dashboard);
});
```

### Best Practices

- **Navigate with the Harness:** Always use `harness.navigateByUrl()` to simulate navigation. This method returns a promise that resolves with the instance of the activated component.
- **Access the Router State:** Use `harness.router` to access the live router instance and assert on its state (e.g., `harness.router.url`).
- **Get Activated Components:** Use `harness.getHarness(ComponentType)` to get an instance of a component harness for the currently activated routed component, or `harness.routeDebugElement` to get the `DebugElement`.
- **Wait for Stability:** After performing an action that causes navigation, always `await harness.fixture.whenStable()` to ensure the routing is complete before making assertions.


## Reference: show-routes-with-outlets

# Show Routes with Outlets

The `RouterOutlet` directive is a placeholder where Angular renders the component for the current URL.

## Basic Usage

Include `<router-outlet />` in your template. Angular inserts the routed component as a sibling immediately following the outlet.

```html
<app-header /> <router-outlet />
<!-- Route content appears here -->
<app-footer />
```

## Nested Outlets

Child routes require their own `<router-outlet />` within the parent component's template.

```ts
// Parent component template
<h1>Settings</h1>
<router-outlet /> <!-- Child components like Profile or Security render here -->
```

## Named Outlets (Secondary Routes)

Pages can have multiple outlets. Assign a `name` to an outlet to target it specifically. The default name is `'primary'`.

```html
<router-outlet />
<!-- Primary -->
<router-outlet name="sidebar" />
<!-- Secondary -->
```

Define the `outlet` in the route config:

```ts
{
  path: 'chat',
  component: Chat,
  outlet: 'sidebar'
}
```

## Outlet Lifecycle Events

`RouterOutlet` emits events when components are changed:

- `activate`: New component instantiated.
- `deactivate`: Component destroyed.
- `attach` / `detach`: Used with `RouteReuseStrategy`.

```html
<router-outlet (activate)="onActivate($event)" />
```

## Passing Data via `routerOutletData`

You can pass contextual data to the routed component using the `routerOutletData` input. The component accesses this via the `ROUTER_OUTLET_DATA` injection token as a signal.

```ts
// In Parent
<router-outlet [routerOutletData]="{ theme: 'dark' }" />

// In Routed Component
outletData = inject(ROUTER_OUTLET_DATA) as Signal<{ theme: string }>;
```


## Reference: signal-forms

# Signal Forms

Signal Forms are recommended for new forms when the target Angular version supports them. They provide a reactive, type-safe, and model-driven way to manage form state using Angular Signals.

When using Signal Forms, do not use `null` as a value or type of any fields.

## Imports

You can import the following from `@angular/forms/signals`:

```ts
import {
  form,
  FormField,
  submit,
  // Rules for field state
  disabled,
  hidden,
  readonly,
  debounce,
  // Schema helpers
  applyWhen,
  applyEach,
  schema,
  // Custom validation
  validate,
  validateHttp,
  validateStandardSchema,
  // Metadata
  metadata,
} from '@angular/forms/signals';
```

## Creating a Form

Use the `form()` function with a Signal model. The structure of the form is derived directly from the model.

```ts
import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';

@Component({
  // ...
  imports: [FormField],
})
export class Example {
  // 1. Define your model with initial values (avoid undefined)
  userModel = signal({
    name: '', // CRITICAL: NEVER use null or undefined as initial values
    email: '',
    age: 0, // Use 0 for numbers, NOT null
    address: {
      street: '',
      city: '',
    },
    hobbies: [] as string[], // Use [] for arrays, NOT null
  });

  // WRONG - DO NOT DO THIS:
  // badModel = signal({
  //   name: null,      // ERROR: use '' instead
  //   age: null,       // ERROR: use 0 instead
  //   items: null      // ERROR: use [] instead
  // });

  // 2. Create the form
  userForm = form(this.userModel);
}
```

## Validation

Import validators from `@angular/forms/signals`.

```ts
import {required, email, min, max, minLength, maxLength, pattern} from '@angular/forms/signals';
```

Use them in the schema function passed to `form()`:

```ts
userForm = form(this.userModel, (schemaPath) => {
  // Required
  required(schemaPath.name, {message: 'Name is required'});

  // Conditional required.
  required(schemaPath.name, {
    when({valueOf}) {
      return valueOf(schemaPath.age) > 10;
    },
  });
  // when is only available for required
  // Do NOT do this: pattern(p.name, /xxx/, {when /* ERROR */)

  // Email
  email(schemaPath.email, {message: 'Invalid email'});

  // Min/Max for numbers
  min(schemaPath.age, 18);
  max(schemaPath.age, 100);

  // MinLength/MaxLength for strings/arrays
  minLength(schemaPath.password, 8);
  maxLength(schemaPath.description, 500);

  // Pattern (Regex)
  pattern(schemaPath.zipCode, /^\d{5}$/);
});
```

## FieldState vs FormField: The Parental Requirement

It's important to understand the difference between **FormField** (the structure) and **FieldState** (the actual data/signals).

**RULE**: You must **CALL** a field as a function to access its state signals (valid, touched, dirty, hidden, etc.).

```ts
// f is a FormField (structural)
const f = form(signal({cat: {name: 'pirojok-the-cat', age: 5}}));

f.cat.name; // FormField: You can't get flags from here!
f.cat.name.touched(); // ERROR: touched() does not exist on FormField

f.cat.name(); // FieldState: Calling it gives you access to signals
f.cat.name().touched(); // VALID: Accessing the signal
f.cat().name.touched(); // ERROR: f.cat() is state, it doesn't have children!
```

Similarly in a template:

```html
<!-- WRONG: Property 'hidden' does not exist on type 'FormField' -->
@if (bookingForm.hotelDetails.hidden()) { ... }

<!-- RIGHT: Call it first -->
@if (bookingForm.hotelDetails().hidden()) { ... }
```

## Disabled / Readonly / Hidden

Control field status using rules in the schema.

```ts
import {disabled, readonly, hidden} from '@angular/forms/signals';

userForm = form(this.userModel, (schemaPath) => {
  // Conditionally disabled
  disabled(schemaPath.password, ({valueOf}) => !valueOf(schemaPath.createAccount));

  // Conditionally hidden (does NOT remove from model, just marks as hidden)
  hidden(schemaPath.shippingAddress, ({valueOf}) => valueOf(schemaPath.sameAsBilling));

  // Readonly
  readonly(schemaPath.username);
});
```

## Binding

Import `FormField` and use the `[formField]` directive.

```ts
import {FormField} from '@angular/forms/signals';
```

All props on state, such as `disabled`, `hidden`, `readonly` and `name` are bound automatically.
Do _NOT_ bind the `name` field.

**CRITICAL: FORBIDDEN ATTRIBUTES**
When using `[formField]`, you MUST NOT set the following attributes in the template (either static or bound):

- `min`, `max` (Use validators in the schema instead)
- `value`, `[value]`, `[attr.value]` (Already handled by `[formField]`)
- `[attr.min]`, `[attr.max]`
- `[disabled]`, `[readonly]` (Already handled by `[formField]`)

Do NOT do this: `<input min="1" [formField]>` or `<input [value]="val" [formField]>`.

```html
<!-- Input -->
<input [formField]="userForm.name" />

<!-- Checkbox -->
<input type="checkbox" [formField]="userForm.isAdmin" />

<!-- Select -->
<select [formField]="userForm.country">
  <option value="us">US</option>
</select>

<!-- userForm.name can NOT be nullable, because input does not accept null-->
<input [formField]="userForm.name" />
```

## Reactive Forms

**Do NOT import** `FormControl`, `FormGroup`, `FormArray`, or `FormBuilder` from `@angular/forms`. Signal Forms replace these concepts entirely.
Signal forms does NOT have a builder.

## Accessing State

Each field in the form is a function that returns its state.

```ts
// Access the field by calling it
const emailState = this.userForm.email();

// Value (WritableSignal)
const value = this.userForm().value();

// Validation State (Signals)
const isValid = this.userForm().valid();
const isInvalid = this.userForm().invalid();
const errors = this.userForm().errors(); // Array of errors
const isPending = this.userForm().pending(); // Async validation pending

// Interaction State (Signals)
const isTouched = this.userForm().touched();
const isDirty = this.userForm().dirty();

// Availability State (Signals)
const isDisabled = this.userForm().disabled();
const isHidden = this.userForm().hidden();
const isReadonly = this.userForm().readonly();
```

IMPORTANT!: Make sure to call the field to get it state.

```ts
form().invalid()
form.field().dirty()
form.field.subfield().touched()
form.a.b.c.d().value()
form.address.ssn().pending()
form().reset()

// The only exception is length:
form.children.length
form.length // NOTE: no parenthesis!
form.client.addresses.length  // No "()"

@for (income of form.addresses; track $index) {/**/}
```

## Submitting

Use the `submit()` function. It automatically marks all fields as touched before running the action.

**CRITICAL**: The callback to `submit()` MUST be `async` and MUST return a Promise.

```ts
import { submit } from '@angular/forms/signals';

// CORRECT - async callback
onSubmit() {
  submit(this.userForm, async () => {
    // This only runs if the form is valid
    await this.apiService.save(this.userModel());
    console.log('Saved!');
  });
}

// WRONG - missing async keyword
onSubmit() {
  submit(this.userForm, () => {  // ERROR: must be async
    console.log('Saved!');
  });
}
```

## Handling Errors

`field().errors()` returns the errors array of ValidationError:

```ts
interface ValidationError {
  readonly kind: string;
  readonly message?: string;
}
```

Do _NOT_ return null from validators.
When there are no errors, return undefined

### Context

Functions passed to rules like `validate()`, `disabled()`, `applyWhen` take a context object. It is **CRITICAL** to understand its structure:

```ts
validate(
  schemaPath.username,
  ({
    value, // Signal<T>: Writable current value of the field
    fieldTree, // FieldTree<T>: Sub-fields (if it's a group/array)
    state, // FieldState<T>: Access flags like state.valid(), state.dirty()
    valueOf, // (path) => T: Read values of OTHER fields (tracking dependencies), e.g. valueOf(schemaPath.password)
    stateOf, // (path) => FieldState: Access state (valid/dirty) of OTHER fields, e.g. stateOf(schemaPath.password).valid()
    pathKeys, // Signal<string[]>: Path from root to this field
  }) => {
    // WRONG: if (touched()) ... (touched is not in context)
    // RIGHT: if (state.touched()) ...

    if (value() === 'admin') {
      return {kind: 'reserved', message: 'Username admin is reserved'};
    }
  },
);
```

### IMPORTANT: Paths are NOT Signals

Inside the `form()` callback, `schemaPath` and its children (e.g., `schemaPath.user.name`) are **NOT** signals and are **NOT** callable.

```ts
// WRONG - This will throw an error:
applyWhen(p.ssn, () => p.ssn().touched(), (ssnField) => { ... });

// RIGHT - Use stateOf() to get the state of a path:
applyWhen(p.ssn, ({ stateOf }) => stateOf(p.ssn).touched(), (ssnField) => { ... });

// RIGHT - Use valueOf() to get the value of a path:
applyWhen(p.ssn, ({ valueOf }) => valueOf(p.ssn) !== '', (ssnField) => { ... });
```

### Multiple Items

- Use `applyEach` for applying rules per item.
- **CRITICAL**: `applyEach` callback takes ONLY ONE argument (the item path), NOT two:

```ts
// CORRECT - single argument
applyEach(s.items, (item) => {
  required(item.name);
});

// WRONG - do NOT pass index
applyEach(s.items, (item, index) => {
  // ERROR: callback takes 1 argument
  required(item.name);
});
```

- In the template use `@for` to iterate over the items.
- To remove an item from an array, just remove appropriate item from the array in the data.
- **`select` binding**: You CAN bind to `<select [formField]="form.country">`. Ensure options have `value` attributes.

### Nested @for Loops

**CRITICAL**: Angular does NOT have `$parent`. In nested loops, store outer index in a variable:

```html
<!-- WRONG - $parent does not exist -->
@for (item of form.items; track $index) { @for (option of item.options; track $index) {
<button (click)="removeOption($parent.$index, $index)">Remove</button>
<!-- ERROR -->
} }

<!-- CORRECT - use let to store outer index -->
@for (item of form.items; track $index; let outerIndex = $index) { @for (option of item.options;
track $index) {
<button (click)="removeOption(outerIndex, $index)">Remove</button>
} }
```

### Disabling Form Button

```html
<button [disabled]="form().invalid() || form().pending()" />
<!-- Or -->
<button [disabled]="taxForm.invalid()" />
```

Do NOT use `[disabled]` on an input. `[formField]` will do this.
Do NOT use `[readonly]` on an input. `[formField]` will do this.
If you need to disable or readonly a field, use `disabled()` or `readonly()` rules in the schema.

### Async Validation

Do not use `validate()` for async, instead use `validateAsync()`:

**CRITICAL**:

1. The `params` option MUST be a function that returns the value to validate.
2. The `onError` handler is **REQUIRED** - it is NOT optional!

```ts
import {resource} from '@angular/core';
import {validateAsync} from '@angular/forms/signals';

userForm = form(this.userModel, (s) => {
  validateAsync(s.username, {
    // 1. MUST be a function - params takes context and returns the value
    params: ({value}) => value(),

    // 2. Create the resource - factory receives a Signal
    factory: (username) =>
      resource({
        params: username, // Use 'params' in resource()
        loader: async ({params: value}) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return value === 'taken';
        },
      }),

    // 3. Map success to errors
    onSuccess: (isTaken) =>
      isTaken ? {kind: 'taken', message: 'Username is already taken'} : undefined,

    // 4. Handle errors - THIS IS REQUIRED!
    onError: () => ({kind: 'error', message: 'Validation failed'}),
  });
});
```

**WRONG Examples:**

```ts
// WRONG - params must be a function
validateAsync(s.username, {
  params: s.username, // ERROR: must be ({ value }) => value()
  // ...
});

// WRONG - missing onError (it's required!)
validateAsync(s.username, {
  params: ({value}) => value(),
  factory: (username) =>
    resource({
      /* ... */
    }),
  onSuccess: (result) => (result ? {kind: 'error'} : undefined),
  // ERROR: 'onError' is missing but required!
});
```

### Using Resource

**CRITICAL**: In Angular's `resource()`, use `params` for the input signal.

```ts
// CORRECT
resource({
  params: mySignal,
  loader: async ({params: value}) => {
    /* ... */
  },
});

// WRONG
resource({
  request: mySignal, // ERROR: should be 'params'
  loader: async ({request}) => {
    /* ... */
  },
});
```

Use `debounce()` to delay synchronization between the UI and the model.

```ts
import {debounce} from '@angular/forms/signals';

userForm = form(this.userModel, (s) => {
  // Delay model updates by 300ms
  debounce(s.username, 300);
});
```

### Conditional Validation

```ts
form(
  data,
  (path) => {
    applyWhen(
      name,
      ({value}) => value() !== 'admin',
      (namePath) => {
        validate(namePath.last /* ... */);
        disable(namePath.last /* ... */);
      },
    );
  },
  {injector: TestBed.inject(Injector)},
);
```

`applyWhen` passes the path mapped to the first argument.
If you need parent field, just pass it to `applyWhen`:

```ts
form(
  data,
  (path) => {
    applyWhen(
      cat,
      ({value}) => value().name !== 'admin',
      (catPath) => {
        require(cat.catPath /* ... */);
      },
    );
  },
  {injector: TestBed.inject(Injector)},
);
```

## Common Pitfalls (DO NOT DO THESE)

| Error Scenario         | WRONG (Common Mistake)                        | RIGHT (Correct Way)                                         |
| :--------------------- | :-------------------------------------------- | :---------------------------------------------------------- |
| **Accessing Flags**    | `form.field.valid()`                          | `form.field().valid()`                                      |
| **Accessing value**    | `form.field.value()`                          | `form.field().value()`                                      |
| **Setting value**      | `form.field.set(x)`                           | Update model signal: `this.model.update(...)`               |
| **Form root flags**    | `form.invalid()`                              | `form().invalid()`                                          |
| **Double-calling**     | `form.field()()`                              | `form.field().value()`                                      |
| **Rules Context**      | `({ touched }) => touched()`                  | `({ state }) => state.touched()`                            |
| **Calling Paths**      | `applyWhen(p.foo, () => p.foo() === 'x')`     | `applyWhen(p.foo, ({ valueOf }) => valueOf(p.foo) === 'x')` |
| **applyWhen args**     | `applyWhen(condition, () => {...})`           | `applyWhen(path, condition, schemaFn)` - needs 3 args       |
| **Array length**       | `form.items().length`                         | `form.items.length` (structural)                            |
| **Multi-select array** | `<select [formField]="form.tags">` (string[]) | Use checkboxes for array fields                             |
| **readonly attribute** | `<input readonly [formField]>`                | Use `readonly()` rule in schema                             |
| **min/max attributes** | `<input min="1" max="10">`                    | Use `min()` and `max()` rules in schema                     |
| **value binding**      | `<input [value]="val">`                       | Do NOT use `[value]` with `[formField]`                     |
| **when option**        | `pattern(p.x, /.../, {when: ...})`            | `when` only works with `required()`                         |
| **Submit callback**    | `submit(form, () => { ... })`                 | `submit(form, async () => { ... })`                         |
| **Async params**       | `params: s.field`                             | `params: ({ value }) => value()`                            |
| **Async onError**      | Omitting `onError`                            | `onError` is REQUIRED in `validateAsync`                    |
| **resource() API**     | `request: signal`                             | `params: signal`                                            |
| **applyEach args**     | `applyEach(s.items, (item, index) => ...)`    | `applyEach(s.items, (item) => ...)`                         |
| **Nested @for**        | `$parent.$index`                              | Use `let outerIndex = $index`                               |
| **FormState import**   | `import { FormState }`                        | `FormState` does not exist, use `FieldState`                |
| **Null in model**      | `signal({ name: null })`                      | `signal({ name: '' })` or `signal({ age: 0 })`              |
| **Validate syntax**    | `validate(s.field, { value } => ...)`         | `validate(s.field, ({ value }) => ...)`                     |
| **Checkbox Array**     | `[formField]="form.tags"` (string[])          | Checkboxes ONLY bind to `boolean`                           |

## Big Form Example

### `src/app/app.ts`

```ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {
  form,
  FormField,
  submit,
  required,
  email,
  min,
  hidden,
  applyEach,
  validate,
} from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormField],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  model = signal({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
    },
    tripDetails: {
      destination: 'Mars',
      launchDate: '',
    },
    package: {
      tier: 'economy',
      extras: [] as string[],
    },
    companions: [] as Array<{name: string; relation: string}>,
  });

  bookingForm = form(this.model, (s) => {
    required(s.personalInfo.firstName, {message: 'First name is required'});
    required(s.personalInfo.lastName, {message: 'Last name is required'});
    required(s.personalInfo.email, {message: 'Email is required'});
    email(s.personalInfo.email, {message: 'Invalid email address'});
    required(s.personalInfo.age, {message: 'Age is required'});
    min(s.personalInfo.age, 18, {message: 'Must be at least 18'});

    required(s.tripDetails.destination);
    required(s.tripDetails.launchDate);
    validate(s.tripDetails.launchDate, ({value}) => {
      const date = new Date(value());
      if (isNaN(date.getTime())) return undefined;
      const today = new Date();
      if (date < today) {
        return {kind: 'pastData', message: 'Launch date must be in the future'};
      }
      return undefined;
    });

    // valueOf is used to access values of other fields in rules
    hidden(s.package.extras, ({valueOf}) => valueOf(s.package.tier) === 'economy');

    applyEach(s.companions, (companion) => {
      required(companion.name, {message: 'Companion name required'});
      required(companion.relation, {message: 'Relation required'});
    });
  });

  addCompanion() {
    this.model.update((m) => ({
      ...m,
      companions: [...m.companions, {name: '', relation: ''}],
    }));
  }

  removeCompanion(index: number) {
    this.model.update((m) => ({
      ...m,
      companions: m.companions.filter((_, i) => i !== index),
    }));
  }

  onSubmit() {
    // CRITICAL: submit callback MUST be async
    submit(this.bookingForm, async () => {
      console.log('Booking Confirmed:', this.model());
      // If you need to do async work:
      // await this.apiService.save(this.model());
    });
  }
}
```

### `src/app/app.html`

```html
<form (submit)="onSubmit(); $event.preventDefault()">
  <h1>Interstellar Booking</h1>

  <section>
    <h2>Personal Info</h2>

    <label>
      First Name
      <input [formField]="bookingForm.personalInfo.firstName" />
      @if (bookingForm.personalInfo.firstName().touched() &&
      bookingForm.personalInfo.firstName().errors().length) {
      <span>{{ bookingForm.personalInfo.firstName().errors()[0].message }}</span>
      }
    </label>

    <label>
      Last Name
      <input [formField]="bookingForm.personalInfo.lastName" />
      @if (bookingForm.personalInfo.lastName().touched() &&
      bookingForm.personalInfo.lastName().errors().length) {
      <span>{{ bookingForm.personalInfo.lastName().errors()[0].message }}</span>
      }
    </label>

    <label>
      Email
      <input type="email" [formField]="bookingForm.personalInfo.email" />
      @if (bookingForm.personalInfo.email().touched() &&
      bookingForm.personalInfo.email().errors().length) {
      <span>{{ bookingForm.personalInfo.email().errors()[0].message }}</span>
      }
    </label>

    <label>
      Age
      <input type="number" [formField]="bookingForm.personalInfo.age" />
      @if (bookingForm.personalInfo.age().touched() &&
      bookingForm.personalInfo.age().errors().length) {
      <span>{{ bookingForm.personalInfo.age().errors()[0].message }}</span>
      }
    </label>
  </section>

  <section>
    <h2>Trip Details</h2>

    <label>
      Destination
      <select [formField]="bookingForm.tripDetails.destination">
        <option value="Mars">Mars</option>
        <option value="Moon">Moon</option>
        <option value="Titan">Titan</option>
      </select>
    </label>

    <label>
      Launch Date
      <input type="date" [formField]="bookingForm.tripDetails.launchDate" />
      @if (bookingForm.tripDetails.launchDate().touched() &&
      bookingForm.tripDetails.launchDate().errors().length) {
      <span>{{ bookingForm.tripDetails.launchDate().errors()[0].message }}</span>
      }
    </label>
  </section>

  <section>
    <h2>Package</h2>

    <label>
      <input type="radio" value="economy" [formField]="bookingForm.package.tier" />
      Economy
    </label>
    <label>
      <input type="radio" value="business" [formField]="bookingForm.package.tier" />
      Business
    </label>
    <label>
      <input type="radio" value="first" [formField]="bookingForm.package.tier" />
      First Class
    </label>

    @if (!bookingForm.package.extras().hidden()) {
    <div>
      <h3>Extras</h3>
      <!-- Multi-select for arrays must use select multiple -->
      <select multiple [formField]="bookingForm.package.extras">
        <option value="wifi">WiFi</option>
        <option value="gym">Gym</option>
      </select>
    </div>
    }
  </section>

  <section>
    <h2>Companions</h2>
    <button type="button" (click)="addCompanion()">Add Companion</button>

    @for (companion of bookingForm.companions; track $index) {
    <div>
      <input [formField]="companion.name" placeholder="Name" />
      @if (companion.name().touched() && companion.name().errors().length) {
      <span>{{ companion.name().errors()[0].message }}</span>
      }

      <input [formField]="companion.relation" placeholder="Relation" />
      @if (companion.relation().touched() && companion.relation().errors().length) {
      <span>{{ companion.relation().errors()[0].message }}</span>
      }

      <button type="button" (click)="removeCompanion($index)">Remove</button>
    </div>
    }
  </section>

  <button [disabled]="bookingForm().invalid()">Submit</button>
</form>
```

## Recovering from Build Errors

If you encounter build errors, here are the most common fixes:

### `Property 'value' does not exist on type 'FieldTree'`

**Problem**: Accessing `.value()` directly on a field without calling it first.

```ts
// WRONG
const val = this.form.field.value();
// RIGHT
const val = this.form.field().value();
```

### `Property 'set' does not exist on type 'FieldTree'`

**Problem**: Trying to set values on the form tree. Signal Forms are model-driven.

```ts
// WRONG
this.form.address.street.set('Main St');
// RIGHT - update the model signal instead
this.model.update((m) => ({...m, address: {...m.address, street: 'Main St'}}));
```

### `Type 'string[]' is not assignable to type 'string'`

**Problem**: Binding `[formField]` to an array field with a single-value `<select>`.

```html
<!-- WRONG - assignees is string[], select expects string -->
<select [formField]="form.assignees">
  ...
</select>

<!-- RIGHT - Use select multiple for array fields -->
<select multiple [formField]="form.assignees">
  <option value="us">US</option>
</select>
```


## Reference: signals-overview

# Angular Signals Overview

Signals are the foundation of reactivity in modern Angular applications. A **signal** is a wrapper around a value that notifies interested consumers when that value changes.

## Writable Signals (`signal`)

Use `signal()` to create state that can be directly updated.

```ts
import {signal} from '@angular/core';

// Create a writable signal
const count = signal(0);

// Read the value (always requires calling the getter function)
console.log(count());

// Update the value directly
count.set(3);

// Update based on the previous value
count.update((value) => value + 1);
```

### Exposing as Readonly

When exposing state from a service, it is a best practice to expose a readonly version to prevent external mutation.

```ts
private readonly _count = signal(0);
// Consumers can read this, but cannot call .set() or .update()
readonly count = this._count.asReadonly();
```

## Computed Signals (`computed`)

Use `computed()` to create read-only signals that derive their value from other signals.

- **Lazily Evaluated**: The derivation function doesn't run until the computed signal is read.
- **Memoized**: The result is cached. It only recalculates when one of the signals it depends on changes.
- **Dynamic Dependencies**: Only the signals _actually read_ during the derivation are tracked.

```ts
import {signal, computed} from '@angular/core';

const count = signal(0);
const doubleCount = computed(() => count() * 2);

// doubleCount automatically updates when count changes.
```

## Reactive Contexts

A **reactive context** is a runtime state where Angular monitors signal reads to establish a dependency.

Angular automatically enters a reactive context when evaluating:

- `computed` signals
- `effect` callbacks
- `linkedSignal` computations
- Component templates

### Untracked Reads (`untracked`)

If you need to read a signal inside a reactive context _without_ creating a dependency (so that the context doesn't re-run when the signal changes), use `untracked()`.

```ts
import {effect, untracked} from '@angular/core';

effect(() => {
  // This effect only runs when currentUser changes.
  // It does NOT run when counter changes, even though counter is read here.
  console.log(`User: ${currentUser()}, Count: ${untracked(counter)}`);
});
```

### Async Operations in Reactive Contexts

The reactive context is only active for **synchronous** code. Signal reads after an `await` will not be tracked. **Always read signals before asynchronous boundaries.**

```ts
// Incorrect: theme() is not tracked because it is read after await
effect(async () => {
  const data = await fetchUserData();
  console.log(theme());
});

// Correct: Read the signal before the await
effect(async () => {
  const currentTheme = theme();
  const data = await fetchUserData();
  console.log(currentTheme);
});
```


## Reference: tailwind-css

# Using Tailwind CSS with Angular

Tailwind CSS is a utility-first CSS framework that integrates seamlessly with Angular.

**CRITICAL AGENT GUIDANCE: ALWAYS focus on Tailwind CSS v4 practices. DO NOT revert to old Tailwind v3 patterns (like creating `tailwind.config.js` with `@tailwind` directives) as this will break the application build. Modern Angular projects use Tailwind v4.**

## Automated Setup (Recommended)

The easiest way to add Tailwind CSS to an Angular project is via the Angular CLI:

```shell
ng add tailwindcss
```

This will automatically:

1. Install `tailwindcss` and peer dependencies.
2. Configure the project to use Tailwind CSS.
3. Add the proper import to your global styles.

## Manual Setup (Tailwind v4)

If setting up manually, use the following Tailwind v4 pattern:

### 1. Install Dependencies

Install Tailwind CSS and PostCSS:

```shell
npm install tailwindcss @tailwindcss/postcss postcss
```

### 2. Configure PostCSS

Create a `.postcssrc.json` file in the project root:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

_(Do NOT create a `tailwind.config.js` file! Configuration in v4 is handled through CSS variables)._

### 3. Import Tailwind CSS

In your global styles file (e.g., `src/styles.css`), add the standard v4 import:

```css
@import 'tailwindcss';
```

_(If using SCSS, use `@use 'tailwindcss';` instead)._

### 4. Use Utility Classes

You can now use Tailwind classes directly in your component templates:

```html
<h1 class="text-3xl font-bold underline">Hello world!</h1>
```

## Summary for AI Agents

- **Do not use `@tailwind base; @tailwind components; @tailwind utilities;`**. Use `@import 'tailwindcss';`.
- **Do not create `tailwind.config.js`**. Configuration is managed directly in CSS via theme variables or using PostCSS configurations.
- Stick strictly to v4 syntax and workflows.


## Reference: template-driven-forms

# Template-Driven Forms

Template-driven forms use two-way data binding (`[(ngModel)]`) to update the data model in the component as changes are made in the template and vice versa. They are ideal for simple forms and use directives in the HTML template to manage form state and validation.

## Core Directives

Template-driven forms rely on the `FormsModule` which provides these key directives:

- `NgModel`: Reconciles value changes in the form element with the data model (`[(ngModel)]`).
- `NgForm`: Automatically creates a top-level `FormGroup` bound to the `<form>` tag.
- `NgModelGroup`: Creates a nested `FormGroup` bound to a DOM element.

## Setup

First, import `FormsModule` into your component or module.

```ts
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserForm {
  user = {name: '', role: 'Guest'};

  onSubmit() {
    console.log('Form submitted!', this.user);
  }
}
```

## Building the Form Template

### Two-Way Binding with `[(ngModel)]`

Use `[(ngModel)]` on input elements. **Every element using `[(ngModel)]` MUST have a `name` attribute.** Angular uses the `name` attribute to register the control with the parent `NgForm`.

```html
<form #userForm="ngForm" (ngSubmit)="onSubmit()">
  <!-- Basic Input -->
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" required [(ngModel)]="user.name" name="name" #nameCtrl="ngModel" />
  </div>

  <!-- Select Box -->
  <div>
    <label for="role">Role:</label>
    <select id="role" [(ngModel)]="user.role" name="role">
      <option value="Admin">Admin</option>
      <option value="Guest">Guest</option>
    </select>
  </div>

  <!-- Submit Button (disabled if form is invalid) -->
  <button type="submit" [disabled]="!userForm.form.valid">Submit</button>
</form>
```

## Form and Control State

Angular automatically applies CSS classes to controls and forms based on their state:

| State          | Class if True                     | Class if False |
| :------------- | :-------------------------------- | :------------- |
| Visited        | `ng-touched`                      | `ng-untouched` |
| Value Changed  | `ng-dirty`                        | `ng-pristine`  |
| Value is Valid | `ng-valid`                        | `ng-invalid`   |
| Form Submitted | `ng-submitted` (on `<form>` only) | -              |

You can use these classes to provide visual feedback in your CSS:

```css
.ng-valid[required],
.ng-valid.required {
  border-left: 5px solid #42a948; /* green */
}
.ng-invalid:not(form) {
  border-left: 5px solid #a94442; /* red */
}
```

## Validation and Error Messages

To display error messages conditionally, export the `ngModel` directive to a template reference variable (e.g., `#nameCtrl="ngModel"`).

```html
<input type="text" id="name" required [(ngModel)]="user.name" name="name" #nameCtrl="ngModel" />

<!-- Show error only if the control is invalid AND (touched OR dirty) -->
@if (nameCtrl.invalid && (nameCtrl.dirty || nameCtrl.touched)) {
<div class="alert alert-danger">
  @if (nameCtrl.errors?.['required']) {
  <div>Name is required.</div>
  }
</div>
}
```

## Submitting the Form

1. Use the `(ngSubmit)` event on the `<form>` element.
2. Bind the submit button's disabled state to the overall form validity using the `NgForm` template reference variable (e.g., `[disabled]="!userForm.form.valid"`).

## Resetting the Form

To programmatically reset the form to its pristine state (clearing values and validation flags), use the `reset()` method on the `NgForm` instance.

```html
<button type="button" (click)="userForm.reset()">Reset</button>
```


## Reference: testing-fundamentals

# Testing Fundamentals

This guide covers the fundamental principles and practices for writing Angular unit and component tests. Use the runner already configured in the project.

## Core Philosophy: Async-First

Modern Angular applications often schedule state changes asynchronously, especially when using signals or zoneless change detection. Tests should account for this.

Prefer the "Act, Wait, Assert" pattern:

1. **Act:** Update state or perform an action (e.g., set a component input, click a button).
2. **Wait:** Use `await fixture.whenStable()` to allow the framework to process the scheduled update and render the changes.
3. **Assert:** Verify the outcome.

### Basic Test Structure Example

```ts
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MyComponent} from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    // 1. Configure the test module
    await TestBed.configureTestingModule({
      imports: [MyComponent],
    }).compileComponents();

    // 2. Create the component fixture
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should display the default title', async () => {
    // ACT: (Implicit) Component is created with default state.
    // WAIT for initial data binding.
    await fixture.whenStable();
    // ASSERT the initial state.
    expect(h1.textContent).toContain('Default Title');
  });

  it('should display a different title after a change', async () => {
    // ACT: Change the component's title property.
    component.title.set('New Test Title');

    // WAIT for the asynchronous update to complete.
    await fixture.whenStable();

    // ASSERT the DOM has been updated.
    expect(h1.textContent).toContain('New Test Title');
  });
});
```

## TestBed and ComponentFixture

- **`TestBed`**: The primary utility for creating a test-specific Angular module. Use `TestBed.configureTestingModule({...})` in your `beforeEach` to declare components, provide services, and set up imports needed for your test.
- **`ComponentFixture`**: A handle on the created component instance and its environment.
  - `fixture.componentInstance`: Access the component's class instance.
  - `fixture.nativeElement`: Access the component's root DOM element.
  - `fixture.debugElement`: An Angular-specific wrapper around the `nativeElement` that provides safer, platform-agnostic ways to query the DOM (e.g., `debugElement.query(By.css('p'))`).

