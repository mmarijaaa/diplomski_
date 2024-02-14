<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tretman extends Model
{
    use HasFactory;

    protected $fillable = [
        'datum_tretmana',
        'vreme_tretmana',
        'naziv_tretmana',
        'redni_broj_tretmana',
        'sadrzaj_tretmana',
        'id_pacijenta',
        'id_logopeda',
        'id_paketa',
        'id_paketa_pacijenta'
    ];

     //jedan tretman pripada samo jednom logopedu
     public function logoped(){
        return $this->belongsTo(User::class, 'id_logopeda');
    }

    //jedan tretman pripada samo jednom pacijentu
     public function pacijent(){
        return $this->belongsTo(Pacijent::class, 'id_pacijenta'); 
    }

    //jedan tretman pripada samo jednom paketu ???????
    public function paket(){
        return $this->belongsTo(Paket::class, 'id_paketa');
    }

    //jedan tretman pripada samo jednom paketu pacijenta
    public function paketPacijent(){ 
        return $this->belongsTo(PaketiPacijent::class, 'id_paketa_pacijenta'); 
    }


}
