<?php

namespace App\Http\Resources\Employees;

use App\Helpers\StorageHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            'identity_card_url' => $this->identity_card_filename ?
                StorageHelper::getUrlSorage('/identity-card/' . $this->identity_card_filename) :
                null
        ];
    }
}
