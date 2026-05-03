<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudySession extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'routine_slot_id', 'started_at', 'completed_at'];

    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function routineSlot()
    {
        return $this->belongsTo(RoutineSlot::class);
    }
}
