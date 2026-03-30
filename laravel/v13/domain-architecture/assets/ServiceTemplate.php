<?php

declare(strict_types=1);

namespace App\Domains\{Domain}\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class {Domain}Service
{
    public function __construct()
    {
        // Dependencies
    }

    /**
     * Example domain operation with transaction.
     */
    public function create(array $data): mixed
    {
        return DB::transaction(function () use ($data) {
            try {
                // Domain logic here
            } catch (\Throwable $e) {
                Log::error("Failed to create {Domain}: " . $e->getMessage());
                throw $e;
            }
        });
    }
}
