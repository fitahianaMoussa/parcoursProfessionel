<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arrete extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type', 
        'num_arrete', 
        'date_arrete', 
        'type_avancement', 
        'type_reclassement',
    ];

    /**
     * Get the services rendus related to the arrete.
     */
    public function servicesRendus()
    {
        return $this->hasMany(ServiceRendu::class);
    }
}
