<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zahtev extends Model
{
    use HasFactory;

    protected $fillable = [
        'tip_zahteva',
        'odobren',
        'pregledan',
        'id_logopeda',
        'id_pacijenta',
        'id_roditelja', 
        'info_pacijenta',
        'info_roditelja'
    ];

    //jedan zahtev pripada samo jednom roditelju 
    //ukoliko je zahtev za obnovu/promenu paketa
    public function roditelj(){
        return $this->belongsTo(Roditelj::class, 'id_roditelja'); 
    }

    //jedan zahtev pripada samo jednom pacijentu 
    //ukoliko je zahtev za obnovu/promenu paketa
    public function pacijent(){
        return $this->belongsTo(Pacijent::class, 'id_pacijenta'); 
    }

    //jedan zahtev pripada samo jednom logopedu koji prima zahtev
    public function logoped(){    
        return $this->belongsTo(User::class, 'id_logopeda');
    }
}
