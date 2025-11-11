<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\TweetController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/tweets', [TweetController::class, 'index']);
    Route::post('/tweets', [TweetController::class, 'store']);
    Route::post('/tweets/{tweet}/like', [LikeController::class, 'store']);
    Route::delete('/tweets/{tweet}/like', [LikeController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login']);


