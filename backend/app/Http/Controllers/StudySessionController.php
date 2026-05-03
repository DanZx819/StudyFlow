<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudySessionRequest;
use App\Models\StudySession;
use App\Models\RoutineSlot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StudySessionController extends Controller
{
    // Listar sessões do dia
    public function index(Request $request)
    {
        $sessoes = StudySession::where('user_id', $request->user()->id)
            ->whereDate('started_at', Carbon::today())
            ->with('routineSlot.subject')
            ->get();

        return response()->json($sessoes);
    }

    // Estatísticas de desempenho
    public function stats(Request $request)
    {
        $userId = $request->user()->id;

        // Sessões completadas nos últimos 7 dias (por dia)
        $ultimos7Dias = StudySession::where('user_id', $userId)
            ->whereNotNull('completed_at')
            ->where('started_at', '>=', Carbon::now()->subDays(7)->startOfDay())
            ->selectRaw('DATE(started_at) as data, COUNT(*) as total')
            ->groupBy('data')
            ->orderBy('data')
            ->get();

        // Tempo total estudado (em minutos) nos últimos 7 dias por dia
        $tempoPorDia = StudySession::where('user_id', $userId)
            ->whereNotNull('completed_at')
            ->where('started_at', '>=', Carbon::now()->subDays(7)->startOfDay())
            ->selectRaw('DATE(started_at) as data, SUM(EXTRACT(EPOCH FROM (completed_at - started_at)) / 60) as minutos')
            ->groupBy('data')
            ->orderBy('data')
            ->get();

        // Sessões por matéria (top 5)
        $porMateria = StudySession::where('study_sessions.user_id', $userId)
            ->whereNotNull('study_sessions.completed_at')
            ->join('routine_slots', 'study_sessions.routine_slot_id', '=', 'routine_slots.id')
            ->join('subjects', 'routine_slots.subject_id', '=', 'subjects.id')
            ->selectRaw('subjects.title as materia, COUNT(*) as total')
            ->groupBy('subjects.title')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        // Totais gerais
        $totalSessoes = StudySession::where('user_id', $userId)
            ->whereNotNull('completed_at')
            ->count();

        $totalMinutos = StudySession::where('user_id', $userId)
            ->whereNotNull('completed_at')
            ->selectRaw('COALESCE(SUM(EXTRACT(EPOCH FROM (completed_at - started_at)) / 60), 0) as total')
            ->value('total');

        $totalMaterias = StudySession::where('study_sessions.user_id', $userId)
            ->whereNotNull('study_sessions.completed_at')
            ->join('routine_slots', 'study_sessions.routine_slot_id', '=', 'routine_slots.id')
            ->distinct('routine_slots.subject_id')
            ->count('routine_slots.subject_id');

        return response()->json([
            'sessoes_por_dia' => $ultimos7Dias,
            'tempo_por_dia' => $tempoPorDia,
            'por_materia' => $porMateria,
            'total_sessoes' => $totalSessoes,
            'total_minutos' => round($totalMinutos ?? 0),
            'total_materias' => $totalMaterias,
            'sequencia' => $request->user()->sequencia,
        ]);
    }

    // Iniciar sessão de estudo
    public function start(StudySessionRequest $request)
    {
        $slot = RoutineSlot::findOrFail($request->routine_slot_id);

        // Verifica se o slot pertence ao usuário
        if ($slot->routine->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Verifica se já existe uma sessão ativa para este slot hoje
        $sessaoExistente = StudySession::where('user_id', $request->user()->id)
            ->where('routine_slot_id', $slot->id)
            ->whereDate('started_at', Carbon::today())
            ->first();

        if ($sessaoExistente) {
            return response()->json(['error' => 'Sessão já iniciada para este horário hoje.'], 422);
        }

        $sessao = StudySession::create([
            'user_id' => $request->user()->id,
            'routine_slot_id' => $slot->id,
            'started_at' => Carbon::now(),
        ]);

        return response()->json($sessao->load('routineSlot.subject'), 201);
    }

    // Completar sessão de estudo
    public function complete(Request $request, int $id)
    {
        $sessao = StudySession::findOrFail($id);

        if ($sessao->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($sessao->completed_at) {
            return response()->json(['error' => 'Sessão já foi completada.'], 422);
        }

        $sessao->update([
            'completed_at' => Carbon::now(),
        ]);

        // Incrementa a streak do usuário
        $user = $request->user();
        $user->increment('sequencia');

        return response()->json([
            'sessao' => $sessao->load('routineSlot.subject'),
            'sequencia' => $user->sequencia,
        ]);
    }
}
