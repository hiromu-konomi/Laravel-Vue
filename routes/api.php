<?php

use App\Http\Controllers\ExpendsController;
use App\Http\Controllers\IncomesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/incomes', [IncomesController::class, 'index']);
Route::get('/expends', [ExpendsController::class, 'index']);

Route::post('/expends', [ExpendsController::class, 'store']);
Route::post('/incomes', [IncomesController::class, 'store']);


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/login', 'LoginController@login');
// Route::post('/logout', 'LoginController@logout');
