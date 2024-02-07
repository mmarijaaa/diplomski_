<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PaketResource;
use App\Models\Paket;
use Illuminate\Suppert\Facades\DB;


class PaketController extends Controller
{
    //****************************************************************************
    //PAKET PO PACIJENTU
    public function get($id_paketa_pacijenta) {
        $paket = Paket::get()->where('id',$id_paketa_pacijenta);
        if(is_null($paket)) {
            return response()->json("Paketa nema");
        }
        return new PaketResource($paket);   
    } 

    public function get2() {
        $paketi = DB::table('pakets')->select('naziv_paketa','cena_paketa')->get();
        return response()->json($paketi); 
    }
}
