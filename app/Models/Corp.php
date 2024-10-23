<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Corp extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'diplome_min_requis_id', 'description'];

    public function diplomeMinRequis()
    {
        return $this->belongsTo(Diplome::class, 'diplome_min_requis_id');
    }

    public function categories()
    {
        return $this->hasMany(Categorie::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }
    public function servicesRendus()
    {
        return $this->hasMany(ServiceRendu::class);
    }
}
