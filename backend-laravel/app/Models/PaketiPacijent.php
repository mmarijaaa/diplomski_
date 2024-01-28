<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaketiPacijent extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv_paketa',
        'broj_tretmana',
        'datum_od',
        'datum_do',
        'id_pacijenta'
    ];

    //jedan paket pacijenta pripada samo jednom pacijentu
    public function pacijent(){
        return $this->belongsTo(Pacijent::class, 'id_pacijenta'); 
    }
}
