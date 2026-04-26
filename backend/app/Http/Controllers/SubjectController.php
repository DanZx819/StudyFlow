<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function update(SubjectRequest $request, $id){
    
        $subject = Subject::findOrFail($id);

        if($subject->user_id !== $request->user()->id){
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validated();

        if($request->hasFile('image')){
            if($subject->image){
                Storage::disk('public')->delete($subject->image);
            }

            $path = $request->file('image')->store('subjects', 'public');
            $data['image'] = $path;
        }

        $subject->update($data);
        
        //Gerar a URL da IMG novafsa
        $subject->imageUrl = asset('storage/' . $subject->image);

        return response()->json($subject);

    }

    public function destroy(Request $request, $id){

        $subject = Subject::findOrFail($id);

        if($subject->user_id !== $request->user()->id){
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        if($subject->image){
            Storage::disk('public')->delete($subject->image);
        }

        $subject->delete();

        return response()->json(null, 204);
    }
}
