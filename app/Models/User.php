<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'corps_id',           // ID du corps
        'categorie_id',       // ID de la catégorie
        'grade_actuel_id',    // ID du grade actuel
        'echelon_actuel_id',  // ID de l'échelon actuel
        'service_id',         // ID du service
    ];
    

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isRH()
    {
        return $this->role === 'RH';
    }

    public function isEmploye()
    {
        return $this->role === 'employe';
    }

    public function reclassements()
    {
        return $this->hasMany(Reclassement::class);
    }

    public function avancements()
    {
        return $this->hasMany(Avancement::class);
    }

    public function corps()
    {
        return $this->belongsTo(Corp::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function gradeActuel()
    {
        return $this->belongsTo(Grade::class, 'grade_actuel_id');
    }

    public function echelonActuel()
    {
        return $this->belongsTo(Echelon::class, 'echelon_actuel_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function servicesRendus()
    {
        return $this->hasMany(ServiceRendu::class);
    }
}
