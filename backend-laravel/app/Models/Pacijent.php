<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pacijent extends Model
{
    use HasFactory;

    protected $fillable = [
        'ime',
        'prezime',
        'uzrast',
        'poremecaj',
        'id_roditelja',
        'id_logopeda',
        'id_paketa',
    ];

    //jedan pacijent pripada samo jednom logopedu
    public function logoped(){
        return $this->belongsTo(User::class, 'id_logopeda');
    }

    //jedan pacijent pripada samo jednom roditelju
    public function roditelj(){
        return $this->belongsTo(Roditelj::class, 'id_roditelja'); 
    }

    //jedan pacijent odabrao je samo jedan paket
    public function paket(){
        return $this->belongsTo(Paket::class, 'id_paketa');
    }

}
