<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RoutineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'day_of_week' => 'required|integer|between:0,6',
            'slots' => 'required|array',
            'slots.*.subject_id' => 'required|exists:subjects,id',
            'slots.*.start_time' => 'required|date_format:H:i',
            'slots.*.end_time' => 'required|date_format:H:i',


        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome da rotina é obrigatório.',
            'name.string' => 'O nome da rotina deve ser um texto.',
            'name.max' => 'O nome da rotina deve ter no máximo 100 caracteres.',
            'day_of_week.required' => 'O dia da semana é obrigatório.',
            'day_of_week.integer' => 'O dia da semana deve ser um número inteiro.',
            'day_of_week.between' => 'O dia da semana deve ser entre 0 (domingo) e 6 (sábado).',
            'slots.required' => 'É necessário adicionar pelo menos um horário.',
            'slots.array' => 'Os horários devem ser enviados como uma lista.',
            'slots.*.subject_id.required' => 'A matéria é obrigatória para cada horário.',
            'slots.*.subject_id.exists' => 'A matéria selecionada não existe.',
            'slots.*.start_time.required' => 'O horário de início é obrigatório.',
            'slots.*.start_time.date_format' => 'O horário de início deve estar no formato HH:MM.',
            'slots.*.end_time.required' => 'O horário de término é obrigatório.',
            'slots.*.end_time.date_format' => 'O horário de término deve estar no formato HH:MM.',
        ];
    }
}
