<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'categorie_id', 'duree_minimale_avancement'];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function echelons()
    {
        return $this->hasMany(Echelon::class);
    }

    public function avancements()
    {
        return $this->hasMany(Avancement::class, 'ancien_grade_id');
    }

    public function nouveauAvancements()
    {
        return $this->hasMany(Avancement::class, 'nouveau_grade_id');
    }
}
