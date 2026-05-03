<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Routine extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'day_of_week', 'name'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function slots()
    {
        return $this->hasMany(RoutineSlot::class);
    }
}
