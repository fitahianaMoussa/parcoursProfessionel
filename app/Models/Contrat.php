<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrat extends Model
{
    use HasFactory;

    protected $fillable = ['employe_id', 'type', 'date_debut', 'date_fin', 'nouveau_service_id'];

    public function employe()
    {
        return $this->belongsTo(User::class);
    }

    public function nouveauService()
    {
        return $this->belongsTo(Service::class, 'nouveau_service_id');
    }
}
