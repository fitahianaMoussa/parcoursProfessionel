<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avancement extends Model
{
    use HasFactory;

    protected $fillable = [
        'employe_id',
        'ancien_grade_id',
        'nouveau_grade_id', 
        'ancien_echelon_id',
        'nouvel_echelon_id',
        'date_avancement',
        'motif',
    ];

    public function employe()
    {
        return $this->belongsTo(User::class);
    }

    public function ancienEchelon()
    {
        return $this->belongsTo(Echelon::class, 'ancien_echelon_id');
    }

    public function nouveauEchelon()
    {
        return $this->belongsTo(Echelon::class, 'nouvel_echelon_id');
    }


    public function ancienGrade()
    {
        return $this->belongsTo(Grade::class, 'ancien_grade_id');
    }

    public function nouveauGrade()
    {
        return $this->belongsTo(Grade::class, 'nouveau_grade_id');
    }
}
