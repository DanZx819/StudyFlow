<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\StudySessionController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware("auth:sanctum")->group(function(){
    //Rotas de Matérias 

    Route::apiResource('subjects', SubjectController::class);
    //Logout

    Route::post("/logout", [AuthController::class, 'logout']);

    Route::apiResource('rotinas', RoutineController::class);

    // Sessões de estudo
    Route::get('/sessoes/stats', [StudySessionController::class, 'stats']);
    Route::get('/sessoes', [StudySessionController::class, 'index']);
    Route::post('/sessoes/iniciar', [StudySessionController::class, 'start']);
    Route::patch('/sessoes/{id}/completar', [StudySessionController::class, 'complete']);
});


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);
