<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\{Context};

use App\Http\Controllers\API\BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class {Model}Controller extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        try {
            // Fetch data
            return $this->sendResponse($data, 'Data retrieved successfully');
        } catch (\Throwable $e) {
            return $this->sendError('Failed to retrieve data', ['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        // Validation logic
        // Service call
        return $this->sendResponse($result, 'Resource created successfully', 201);
    }
}
