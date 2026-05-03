<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoutineSlot extends Model
{
    use HasFactory;

    protected $fillable = ['routine_id', 'subject_id', 'start_time', 'end_time'];

    public function routine()
    {
        return $this->belongsTo(Routine::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function studySessions()
    {
        return $this->hasMany(StudySession::class);
    }
}
