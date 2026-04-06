<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $user = User::create([   
        ...$request->validated(), 
        'password' => Hash::make($request['password'])
        ]);

        return response()->json($user, 201);
    }

    public function login(LoginRequest $request){
        $user = User::where('email', $request['email'])->first();

        if(!$user || !Hash::check($request['password'], $user->password)){
            return response()->json([
                'message' => 'Credenciais inválidas'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
