<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tweet;
use App\Models\Like;

class LikeController extends Controller
{
    // Like a tweet
    public function store(Tweet $tweet)
    {
        $tweet->likes()->firstOrCreate(['user_id' => auth()->id()]);

        return response()->json(['message' => 'Liked']);
    }

    // Unlike a tweet
    public function destroy(Tweet $tweet)
    {
        $tweet->likes()->where('user_id', auth()->id())->delete();

        return response()->json(['message' => 'Unliked']);
    }
}
