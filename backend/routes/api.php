<?php

use App\Http\Controllers\Employees\EmployeesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('employees')->controller(EmployeesController::class)->group(function () {
    Route::get('/', 'index')->name('employees.index');
    Route::get('/{id}/default-value-for-form', 'getDefaultValueForForm')->name('employees.default-value-for-form');
    Route::get('/{id}', 'show')->name('employees.show');
    Route::post('/store', 'store')->name('employees.store');
    Route::put('/{id}/update', 'update')->name('employees.update');
    Route::delete('/{id}/destroy', 'destroy')->name('employees.destroy');
    Route::post('/set-active', 'setActive')->name('employees.set-active');
    Route::post('/set-inactive', 'setInactive')->name('employees.set-inactive');
    Route::post('/{id}/upload-identity-card', 'uploadIdentityCard')->name('employees.upload-identity-card');
});
