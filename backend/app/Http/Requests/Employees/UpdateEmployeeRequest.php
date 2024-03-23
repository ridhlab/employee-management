<?php

namespace App\Http\Requests\Employees;

use App\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class UpdateEmployeeRequest extends FormRequest
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
    public function rules(Request $request): array
    {
        $id = $request->route('id');
        $employee = Employee::findOrFail($id);
        return [
            'fullname' => 'string|required',
            'nip' => 'digits:4|required|unique:employees,nip,' . $employee->id,
            'year_birthdate' => 'integer|required',
            'address' => 'string',
            'phone' => 'digits_between:9,14',
            'religion' => 'in:islam,kristen,katolik,hindu,buddha,konghuchu',
        ];
    }
}
