<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(Request $request){
        $subjects = $request->user()->subjects()->latest()->get();
        
        return response()->json($subjects);
    }

    public function store(SubjectRequest $request){
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('subjects', 'public');
            $data['image'] = $path;
        }

        $data['user_id'] = $request->user()->id;

        $subject = Subject::create($data);

        $subject->imageUrl = asset('storage/' . $subject->image);

        return response()->json($subject, 201);

    }
}
