<?php

namespace App\Http\Controllers\Employees;

use App\Helpers\StorageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Employees\SetActiveInactiveRequest;
use App\Http\Requests\Employees\StoreEmployeeRequest;
use App\Http\Requests\Employees\UpdateEmployeeRequest;
use App\Http\Resources\Employees\EmployeeDetailResource;
use App\Models\Employee;
use App\Shared\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmployeesController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return ApiResponser::successResponser($employees, ApiResponser::generateMessageGetIndex('employee'));
    }

    public function getDefaultValueForForm($id)
    {
        $employee = Employee::findOrFail($id);
        return ApiResponser::successResponser(
            new EmployeeDetailResource($employee),
            ApiResponser::generateMessageGetIndex('employee')
        );
    }

    public function show($id)
    {
        $employee = Employee::findOrFail($id);
        return ApiResponser::successResponser(
            new EmployeeDetailResource($employee),
            ApiResponser::generateMessageGetIndex('employee')
        );
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
        return ApiResponser::successResponser($employee, ApiResponser::generateMessageStore('employee'));
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

    public function uploadIdentityCard($id, Request $request)
    {
        try {
            $request->validate(['identity_card' => 'required|max:5128|mimes:jpg,png']);
            DB::beginTransaction();
            $identityCardFile = $request->file('identity_card');
            if ($identityCardFile) {
                $employee = Employee::findOrFail($id);
                $fileExist = !!$employee->identity_card_filename;
                if ($fileExist) {
                    $fileExistInPublic = (file_exists(public_path('storage/identity-card/' . $employee->identity_card_filename)));
                    if (!$fileExistInPublic) {
                        throw new HttpException(500, 'Internal server error');
                    }
                    File::delete(public_path('storage/identity-card/' . $employee->identity_card_filename));
                }
                $filename  = StorageHelper::generateNewFileName($identityCardFile->getClientOriginalName());
                Storage::disk('public')->put('identity-card/' . $filename, file_get_contents($identityCardFile));
                $employee->identity_card_filename =  $filename;

                $employee->save();
                DB::commit();
                return ApiResponser::successResponser(null, 'Success uploaded identity card');
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return ApiResponser::errorResponse('Upload KTP gagal. File maksimal 5mb dan berekstensi jpg atau png ');
        }
    }
}
