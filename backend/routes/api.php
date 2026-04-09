<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware("auth:sanctum")->group(function(){
    //Rotas de Matérias 

    Route::get("/subjects", [SubjectController::class, 'index']);
    Route::post("/subjects", [SubjectController::class, 'store']);

    //Logout

    Route::post("/logout", [AuthController::class, 'logout']);
});


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);
