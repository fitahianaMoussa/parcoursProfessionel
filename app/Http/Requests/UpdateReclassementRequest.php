<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReclassementRequest extends FormRequest
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
            'ancienne_categorie_id' => 'required|exists:categories,id',
            'nouvelle_categorie_id' => 'required|exists:categories,id',
            'date_reclassement' => 'required|date',
            'motif' => 'required|string|max:255',
        ];
    }
}
