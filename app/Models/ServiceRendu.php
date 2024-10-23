<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRendu extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'poste_id',
        'service_id',
        'corps_id',
        'categorie_id',
        'arrete_id',
        'arrete_avancement_id',
        'arrete_reclassement_id',
        'date_debut',
        'date_fin',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function poste()
    {
        return $this->belongsTo(Poste::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function corps()
    {
        return $this->belongsTo(Corp::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function arrete()
    {
        return $this->belongsTo(Arrete::class, 'arrete_id');
    }

    public function arreteAvancement()
    {
        return $this->belongsTo(Arrete::class, 'arrete_avancement_id');
    }

    public function arreteReclassement()
    {
        return $this->belongsTo(Arrete::class, 'arrete_reclassement_id');
    }
}
