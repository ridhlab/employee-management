<?php

namespace App\Http\Controllers\Employees;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employees\SetActiveInactiveRequest;
use App\Http\Requests\Employees\StoreEmployeeRequest;
use App\Http\Requests\Employees\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Shared\ApiResponser;
use Illuminate\Support\Facades\DB;

class EmployeesController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return ApiResponser::successResponser($employees, ApiResponser::generateMessageGetIndex('employee'));
    }

    public function getDefaultValueForForm($id)
    {
        $employees = Employee::findOrFail($id);
        return ApiResponser::successResponser($employees, ApiResponser::generateMessageGetIndex('employee'));
    }

    public function show($id)
    {
        $employees = Employee::findOrFail($id);
        return ApiResponser::successResponser($employees, ApiResponser::generateMessageGetIndex('employee'));
    }

    public function store(StoreEmployeeRequest $request)
    {
        $employee = new Employee();
        $employee->fullname = $request->validated()['fullname'];
        $employee->nip = $request->validated()['nip'];
        $employee->year_birthdate = $request->validated()['year_birthdate'];
        $employee->address = $request->validated()['address'] ?? null;
        $employee->phone = $request->validated()['phone'] ?? null;
        $employee->religion = $request->validated()['religion'] ?? null;
        $employee->save();
        return ApiResponser::successResponser(null, ApiResponser::generateMessageStore('employee'));
    }

    public function update($id, UpdateEmployeeRequest $request)
    {
        $employee = Employee::findOrFail($id);
        $employee->fullname = $request->validated()['fullname'];
        $employee->nip = $request->validated()['nip'];
        $employee->year_birthdate = $request->validated()['year_birthdate'];
        $employee->address = $request->validated()['address'] ?? null;
        $employee->phone = $request->validated()['phone'] ?? null;
        $employee->religion = $request->validated()['religion'] ?? null;
        $employee->save();
        return ApiResponser::successResponser(null, ApiResponser::generateMessageUpdate('employee'));
    }

    public function destroy($id)
    {
        Employee::destroy($id);
        return ApiResponser::successResponser(null, ApiResponser::generateMessageDestroy('employee'));
    }

    public function setActive(SetActiveInactiveRequest $request)
    {
        try {
            $ids = $request->validated()['ids'];
            DB::beginTransaction();
            foreach ($ids as $id) {
                $employee = Employee::findOrFail($id);
                $employee->activate_status = true;
                $employee->save();
            }
            DB::commit();
            return ApiResponser::successResponser(null, ApiResponser::generateMessageSetActiveStatus('employee'));
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function setInactive(SetActiveInactiveRequest $request)
    {
        try {
            $ids = $request->validated()['ids'];
            DB::beginTransaction();
            foreach ($ids as $id) {
                $employee = Employee::findOrFail($id);
                $employee->activate_status = false;
                $employee->save();
            }
            DB::commit();
            return ApiResponser::successResponser(null, ApiResponser::generateMessageSetInactiveStatus('employee'));
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
