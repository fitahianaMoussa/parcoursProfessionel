<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAvancementRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employe_id' => 'required|exists:users,id',
            'ancien_grade_id' => 'required|exists:grades,id',
            'nouveau_grade_id' => 'required|exists:grades,id',
            'ancien_echelon_id' => 'required|exists:echelons,id',
            'nouvel_echelon_id' => 'required|exists:echelons,id',
            'date_avancement' => 'required|date',
            'motif' => 'required|string|max:255',
        ];
    }
}
