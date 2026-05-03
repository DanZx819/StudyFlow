<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\StudySession;
use Illuminate\Console\Command;
use Carbon\Carbon;

class CheckStreakCommand extends Command
{
    protected $signature = 'streak:check';
    protected $description = 'Verifica se os usuários estudaram ontem e zera a streak de quem não estudou';

    public function handle(): void
    {
        $ontem = Carbon::yesterday();
        $diaDaSemana = $ontem->dayOfWeek;

        // Usuários que tinham rotina ontem
        $usuarios = User::whereHas('routines', function ($query) use ($diaDaSemana) {
            $query->where('day_of_week', $diaDaSemana);
        })->get();

        $zerados = 0;

        foreach ($usuarios as $usuario) {
            // Verifica se completou pelo menos uma sessão ontem
            $estudouOntem = StudySession::where('user_id', $usuario->id)
                ->whereDate('started_at', $ontem)
                ->whereNotNull('completed_at')
                ->exists();

            if (!$estudouOntem) {
                $usuario->update(['sequencia' => 0]);
                $zerados++;
            }
        }

        $this->info("Streak verificada: {$zerados} usuário(s) perderam a sequência.");
    }
}
