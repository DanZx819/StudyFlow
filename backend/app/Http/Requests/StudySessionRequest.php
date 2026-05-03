<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudySessionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'routine_slot_id' => 'required|exists:routine_slots,id',
        ];
    }

    public function messages(): array
    {
        return [
            'routine_slot_id.required' => 'O horário de estudo é obrigatório.',
            'routine_slot_id.exists' => 'O horário de estudo selecionado não existe.',
        ];
    }
}
