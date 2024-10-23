<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Echelon extends Model
{
    use HasFactory;
    
    protected $fillable = ['grade_id', 'numero', 'duree_minimale_avancement'];

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }
}
