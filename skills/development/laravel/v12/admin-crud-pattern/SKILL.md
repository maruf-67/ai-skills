---
name: admin-crud-pattern
version: "1.0.0"
description: "Generates admin CRUD files following the established Inventory pattern. Activates when adding CRUD operations, controllers, routes, DTOs, Orchestrators, or Form Requests to existing Modules. Triggers on /ai-os:laravel-admin-crud-pattern."
---

# Admin Module CRUD Pattern

This skill enforces the consistent CRUD pattern used in the Inventory module. Use this when adding CRUD functionality to **existing modules** - it does not create new modules.

## Mandates
- **Existing Modules Only**: This skill does NOT create new modules. Use `php artisan module:make` for that.
- **Consistent Patterns**: All generated files must follow the layered architecture defined below.
- **Dependency Injection**: Use constructor property promotion in controllers.
- **Error Handling**: Wrap all orchestrator calls in try-catch, return `JsonResponse::error($exception)`.
- **Transactions**: Wrap create/update operations in `DB::transaction()`.

## Architecture Overview

Every admin module follows this layered architecture:

```
Module/
├── routes/admin/
│   └── {resources}.php          # Route definitions
├── app/
│   ├── Http/
│   │   ├── Controllers/Admin/
│   │   │   └── {Resource}Controller.php
│   │   └── Requests/Admin/
│   │       └── {Resource}Request.php
│   ├── DTOs/
│   │   └── {Resource}Data.php
│   ├── Orchestrator/
│   │   └── {Resource}Orchestrator.php
│   ├── Models/
│   │   └── {Resource}.php
│   └── Presenters/
│       └── {Resource}Pres.php   # Optional
└── resources/views/
    └── admins/
        └── {resource}/
            ├── index.vue
            ├── create.vue
            ├── edit.vue
            └── show.vue
```

## 1. Routes Pattern

File: `routes/admin/{resources}.php`

```php
<?php

use Illuminate\Support\Facades\Route;
use Modules\{Module}\Http\Controllers\Admin\{Resource}Controller;

Route::prefix('{resources}')->name('admin.{resources}.')->group(function () {
    Route::get('/', [{Resource}Controller::class, 'index'])->name('index');
    Route::get('/data', [{Resource}Controller::class, 'indexData'])->name('data');
    Route::get('/form-data', [{Resource}Controller::class, 'formData'])->name('form-data');
    Route::get('/create', [{Resource}Controller::class, 'create'])->name('create');
    Route::post('/', [{Resource}Controller::class, 'store'])->name('store');
    Route::get('/{id}', [{Resource}Controller::class, 'show'])->name('show');
    Route::get('/{id}/edit', [{Resource}Controller::class, 'edit'])->name('edit');
    Route::patch('/{id}', [{Resource}Controller::class, 'update'])->name('update');
    Route::delete('/{id}', [{Resource}Controller::class, 'destroy'])->name('destroy');
});
```

## 2. Controller Pattern

File: `app/Http/Controllers/Admin/{Resource}Controller.php`

```php
<?php

namespace Modules\{Module}\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\{Module}\DTOs\{Resource}Data;
use Modules\{Module}\Http\Requests\Admin\{Resource}Request;
use Modules\{Module}\Orchestrator\{Resource}Orchestrator;
use Rowjat\ArtisanServe\Facades\ArtisanApp;
use Rowjat\ArtisanServe\Support\JsonResponse;
use Throwable;

class {Resource}Controller extends Controller
{
    public function __construct(protected {Resource}Orchestrator ${resource}Orchestrator) {}

    public function index(Request $request)
    {
        return ArtisanApp::viewMake(title: '{Resources}', page_id: '{module}.{resources}.{resources}')
            ->setBreadcrumb(key: '{module}', name: '{Module}')
            ->setBreadcrumb(key: '{resources}', name: '{Resources}')
            ->view('{module}::admins.{resource}.index');
    }

    public function indexData()
    {
        try {
            return $this->{resource}Orchestrator->getData();
        } catch (Exception $exception) {
            return JsonResponse::error($exception);
        }
    }

    public function formData(Request $request)
    {
        try {
            $data = $this->{resource}Orchestrator->getFormData(scope: $request->scope, id: $request->id);
            return JsonResponse::success($data);
        } catch (Exception $exception) {
            return JsonResponse::error($exception);
        }
    }

    public function create()
    {
        return ArtisanApp::viewMake(title: 'New {Resource}', page_id: '{module}.{resources}.{resources}')
            ->setBreadcrumb(key: '{module}', name: '{Module}')
            ->setBreadcrumb(key: 'new', name: 'New {Resource}')
            ->view('{module}::admins.{resource}.create');
    }

    public function store({Resource}Request $request): Response
    {
        try {
            $this->{resource}Orchestrator->create({Resource}Data::fromInput($request->data));
            return JsonResponse::success(msg: '');
        } catch (Exception $exception) {
            return JsonResponse::error($exception);
        }
    }

    public function edit($id)
    {
        return ArtisanApp::viewMake(title: 'Edit {Resource}', page_id: '{module}.{resources}.{resources}')
            ->setBreadcrumb(key: '{module}', name: '{Module}')
            ->setBreadcrumb(key: 'edit', name: 'Edit {Resource}')
            ->view('{module}::admins.{resource}.edit', ['id' => $id]);
    }

    public function show($id)
    {
        return ArtisanApp::viewMake(title: 'View {Resource}', page_id: '{module}.{resources}.{resources}')
            ->setBreadcrumb(key: '{module}', name: '{Module}')
            ->setBreadcrumb(key: 'show', name: 'View {Resource}')
            ->view('{module}::admins.{resource}.show', ['id' => $id]);
    }

    public function destroy($id)
    {
        try {
            $this->{resource}Orchestrator->delete($id);
            return JsonResponse::success(msg: '{Resource} deleted successfully');
        } catch (Exception $exception) {
            return JsonResponse::error($exception);
        }
    }

    public function update({Resource}Request $request, $id)
    {
        try {
            $this->{resource}Orchestrator->update($id, {Resource}Data::fromInput($request->data));
            return JsonResponse::success(msg: '');
        } catch (Exception $exception) {
            return JsonResponse::error($exception);
        }
    }
}
```

## 3. Form Request Pattern

File: `app/Http/Requests/Admin/{Resource}Request.php`

```php
<?php

namespace Modules\{Module}\Http\Requests\Admin;

use App\Http\Requests\FormRequest;
use Modules\{Module}\DTOs\{Resource}Data;

class {Resource}Request extends FormRequest
{
    public function authorize(): bool { return true; }

    protected function prepareForValidation(): void
    {
        $this->merge([/* 'field' => $this->field ?? default_value, */]);
    }

    public function rules(): array
    {
        $rules = [/* 'field' => 'required|string|max:255', */];
        switch ($this->method()) {
            case 'PATCH': break;
            case 'POST':  break;
        }
        return $rules;
    }

    protected function passedData(): array
    {
        return ['id' => $this->id, 'data' => new {Resource}Data()->toArray()];
    }
}
```

## 4. DTO Pattern

```php
<?php
namespace Modules\{Module}\DTOs;

class {Resource}Data
{
    public function __construct(/* public string $field, */) {}

    public static function fromInput(array $data): self
    {
        return new self(/* field: $data['field'] ?? default, */);
    }

    public function toArray(): array
    {
        return [/* 'column_name' => $this->field, */];
    }
}
```

## 5. Orchestrator Pattern

```php
<?php
namespace Modules\{Module}\Orchestrator;

use App\Contracts\Orchestrator;
use Exception;
use Illuminate\Support\Facades\DB;
use Modules\{Module}\DTOs\{Resource}Data;
use Modules\{Module}\Models\{Resource};
use Throwable;

class {Resource}Orchestrator extends Orchestrator
{
    public function find($id): ?{Resource}
    {
        return {Resource}::where('id', $id)->first();
    }

    /** @throws Throwable */
    public function create({Resource}Data $data): {Resource}
    {
        return DB::transaction(fn () => {Resource}::create($data->toArray()));
    }

    /** @throws Throwable */
    public function update($id, {Resource}Data $data): {Resource}
    {
        $model = $this->find($id) ?? throw new \Illuminate\Database\Eloquent\ModelNotFoundException;
        return DB::transaction(fn () => tap($model)->update($data->toArray()));
    }

    /** @throws Exception */
    public function delete($id): bool
    {
        $model = $this->find($id) ?? throw new \Illuminate\Database\Eloquent\ModelNotFoundException;
        return $model->delete();
    }
}
```

## Key Conventions

1. **Naming**: Singular `{Resource}` for Controller, DTO, Orchestrator, Request; plural `{resources}` for routes and views.
2. **Dependency Injection**: Constructor property promotion in controllers.
3. **Error Handling**: Wrap all orchestrator calls in try-catch, return `JsonResponse::error($exception)`.
4. **Success Responses**: `JsonResponse::success(msg: '')` for mutations, `JsonResponse::success($data)` for data retrieval.
5. **Data Flow**: Request → FormRequest → Controller → Orchestrator → Model.
6. **Transactions**: Wrap create/update in `DB::transaction()`.

## Usage

This skill activates when:
- Adding CRUD operations to **existing** modules in `Modules/` directory.
- User mentions "add CRUD", "generate admin CRUD", or specifies a resource within an existing module.
- User explicitly says "use admin-crud-pattern skill".

**Note**: This skill does NOT create new modules. Use `php artisan module:make` for new modules.
