<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'diplome_min_requis_id', 'description'];

    public function diplomeMinRequis()
    {
        return $this->belongsTo(Diplome::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function servicesRendus()
    {
        return $this->hasMany(ServiceRendu::class);
    }
}
