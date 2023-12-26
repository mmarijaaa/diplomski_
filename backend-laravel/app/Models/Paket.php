<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    use HasFactory;

    //jedan paket moze koristiti vise pacijenata
    public function pacijent() {
        return $this->hasMany(Pacijent::class);  
    }

    //jedan paket ima odredjeni broj tretmana
    public function tretman() {
        return $this->hasMany(Tretman::class);
    }

}
