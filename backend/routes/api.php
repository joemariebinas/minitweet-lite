<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\LikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Register new user
Route::post('/register', [UserController::class, 'register']);

// Login user
Route::post('/login', [AuthController::class, 'login']);



Route::middleware('auth:sanctum')->group(function () {

    //Logout user
    Route::post('/logout', [AuthController::class, 'logout']);

    // Get current logged-in user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Tweets CRUD (can also use apiResource)
    Route::get('/tweets', [TweetController::class, 'index']);
    Route::post('/tweets', [TweetController::class, 'store']);
    Route::get('/tweets/{tweet}', [TweetController::class, 'show']);      // optional
    Route::put('/tweets/{tweet}', [TweetController::class, 'update']);   // optional
    Route::delete('/tweets/{tweet}', [TweetController::class, 'destroy']); // optional

    // Like / Unlike Tweets
    Route::post('/tweets/{tweet}/like', [LikeController::class, 'store']);
    Route::delete('/tweets/{tweet}/like', [LikeController::class, 'destroy']);

});



