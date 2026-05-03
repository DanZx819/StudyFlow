<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoutineRequest;
use App\Models\Routine;
use Illuminate\Http\Request;

class RoutineController extends Controller
{
    public function index(Request $request){
        $rotinas = $request->user()->routines()->with('slots.subject')->latest()->get();

        return response()->json($rotinas);
    }
    public function store(RoutineRequest $request){
        $dados = $request->validated();

        $dados['user_id'] = $request->user()->id;

        $routine = Routine::create($dados);
        $routine->slots()->createMany($dados['slots']);

        return response()->json($routine->load('slots'), 201);
    }

    public function update(RoutineRequest $request, int $id){
        $rotina = Routine::findOrFail($id);

        if($rotina->user_id !== $request->user()->id){
            return response()->json(["error" => "Unauthorized"], 403);
        }

        $dados = $request->validated();

        $rotina->update($dados);
        $rotina->slots()->delete();
        $rotina->slots()->createMany($dados['slots']);

        return response()->json($rotina->load('slots'));

    }

    public function destroy(Request $request, int $id){
        $rotina = Routine::findOrFail($id);

        if($rotina->user_id !== $request->user()->id){
            return response()->json(["error" => "Unauthorized"], 403);
        }

        $rotina->delete();

        return response()->json(null, 204);
    }
}

