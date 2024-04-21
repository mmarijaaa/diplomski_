<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaketiPacijent extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv_paketa',
        'datum_od',
        'datum_do',
        'id_pacijenta',
        'id_logopeda',
        'zavrsen'
    ];

    //jedan paket pacijenta pripada samo jednom pacijentu
    public function pacijent(){
        return $this->belongsTo(Pacijent::class, 'id_pacijenta'); 
    }

    //jedan paket pacijenta pripada samo jednom logopedu
    public function logoped(){
        return $this->belongsTo(User::class, 'id_logopeda'); 
    }

    //u okviru jednig paketa postoji vise tretmana
    public function tretman() {
        return $this->hasMany(Tretman::class);
    }
}
