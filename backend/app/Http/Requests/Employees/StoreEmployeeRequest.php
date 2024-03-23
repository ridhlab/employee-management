<?php

namespace App\Http\Requests\Employees;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fullname' => 'string|required',
            'nip' => 'digits:4|required|unique:employees,nip',
            'year_birthdate' => 'integer|required',
            'address' => 'string',
            'phone' => 'digits_between:9,14',
            'religion' => 'in:islam,kristen,katolik,hindu,buddha,konghuchu',
        ];
    }
}
