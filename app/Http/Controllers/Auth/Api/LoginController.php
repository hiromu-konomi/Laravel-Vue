<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\{DB};

class LoginController extends Controller
{
    public function login(Request $request)
    {

        $data = DB::transaction(function () use ($request) {
            $keyword_email = $request -> input('email');

            $query = User::query();
            $users = $query -> where('email', $keyword_email) -> get();

                // $message = "メールアドレスまたはパスワードが違います";
                return $user = json_encode(['user' => $users]);

                // return compact('user', 'message');

        });
        return $data;

        // if (Auth::attempt($users)) {
        //     return response()->json(['message' => 'Login successful'], 200);
        // }

        // throw ValidationException::withMessages([
        //     'email' => ['The provided credentials are incorrect'],
        // ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out'], 200);
    }
}