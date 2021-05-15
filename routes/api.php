<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\v1\QuestionsController;
use App\Http\Controllers\Api\v1\TestsController;
use App\Http\Controllers\Api\v1\TestingController;
use App\Http\Controllers\Api\v1\ResultController;
use App\Http\Controllers\Api\v1\TaskController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::resource('questions', QuestionsController::class);
    Route::resource('tests', TestsController::class);
//    Route::resource('testing', TestingController::class);
    Route::resource('result', ResultController::class);
});

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {

        // Below mention routes are public, user can access those without any restriction.
        // Create New User
        Route::post('register', 'App\Http\Controllers\AuthController@register');
        // Login User
        Route::post('login', 'App\Http\Controllers\AuthController@login');

        // Refresh the JWT Token
        Route::get('refresh', 'App\Http\Controllers\AuthController@refresh');

        // Below mention routes are available only for the authenticated users.
        Route::middleware('auth:api')->group(function () {
            // Get user info
            Route::get('user', 'App\Http\Controllers\AuthController@user');
            // Logout user from application
            Route::post('logout', 'App\Http\Controllers\AuthController@logout');
        });
    });
});


//Route::resource('result', ResultController::class);
