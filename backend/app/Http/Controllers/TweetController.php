<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tweet;

class TweetController extends Controller
{
    // Get all tweets
    public function index()
    {
        $tweets = Tweet::with('user')
            ->withCount('likes') // total likes
            ->get()
            ->map(function($tweet) {
                // Check if current user liked this tweet
                $tweet->liked_by_user = $tweet->likes()->where('user_id', auth()->id())->exists();
                return $tweet;
            });

        return response()->json($tweets);
    }

    // Create a new tweet
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:280',
        ]);

        $tweet = Tweet::create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        $tweet->load('user');

        return response()->json($tweet);
    }
}
