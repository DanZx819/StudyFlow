<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('routine_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('routine_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->foreignId('subject_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('routine_slots');
    }
};
