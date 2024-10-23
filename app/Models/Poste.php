<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poste extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'description',
        'service_id',
    ];

    /**
     * Get the services rendus related to the poste.
     */
    public function servicesRendus()
    {
        return $this->hasMany(ServiceRendu::class);
    }

    /**
     * Get the service that the poste belongs to.
     */
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
