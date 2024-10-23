<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reclassement extends Model
{
    use HasFactory;

    protected $fillable = [
        'employe_id',
        'ancienne_categorie_id',
        'nouvelle_categorie_id',
        'date_reclassement',
        'motif',
    ];

    public function employe()
    {
        return $this->belongsTo(User::class);
    }

    public function ancienCategorie() 
    {
        return $this->belongsTo(Categorie::class, 'ancienne_categorie_id'); 
    }

    public function nouvelleCategorie() 
    {
        return $this->belongsTo(Categorie::class, 'nouvelle_categorie_id'); 
    }
}
