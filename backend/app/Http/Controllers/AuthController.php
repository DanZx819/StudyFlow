<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
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
}
