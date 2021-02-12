<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\{DB};

class LoginController extends Controller
{
    public function login(Request $request)
    {

        $data = DB::transaction(function () use ($request) {
            $keyword_email = $request -> input('email');

            $query = User::query();
            $user = $query -> where('email', $keyword_email) -> get();

                return json_encode(['user' => $user]);

        });
        return $data;
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out'], 200);
    }
}