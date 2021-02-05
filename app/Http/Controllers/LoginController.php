<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $keyword_email = $request -> email;

        $query = User::query();
        $users = $query -> where('email', '=', $keyword_email) -> get();

        if($users != null){
            return $users;
        }else {
            $message = "メールアドレスまたはパスワードが違います";
            return $message;
        }

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