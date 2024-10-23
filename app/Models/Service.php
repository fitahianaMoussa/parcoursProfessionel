<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    
    protected $fillable = ['nom', 'corps_id', 'responsable_id', 'description'];

    public function corps()
    {
        return $this->belongsTo(Corp::class);
    }

    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    public function employes()
    {
        return $this->hasMany(User::class);
    }

    public function servicesRendus()
    {
        return $this->hasMany(ServiceRendu::class);
    }
}
