<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diplome extends Model
{
    use HasFactory;
    
    protected $fillable = ['nom', 'niveau'];

    public function corps()
    {
        return $this->hasMany(Corp::class);
    }

    public function categories()
    {
        return $this->hasMany(Categorie::class);
    }
    
}
