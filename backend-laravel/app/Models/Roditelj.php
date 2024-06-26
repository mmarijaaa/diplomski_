<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Roditelj extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ime',
        'prezime',
        'korisnicko_ime',
        'email',
        'password',
        'broj_telefona',
        'id_logopeda'
    ];

     //jedan roditelj ima vise dece/pacijenata
     public function pacijent() {
        return $this->hasMany(Pacijent::class);  
    }

    //jedan roditelj pripada samo jednom logopedu
    public function logoped(){
        return $this->belongsTo(User::class, 'id_logopeda'); 
    }

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
}
