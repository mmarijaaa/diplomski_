<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PaketiPacijent;

class PaketiPacijentController extends Controller
{
    //************************************************************************************* 
    //KREIRANJE PAKETA PACIJENTA
    public function create(Request $request, $id_pacijenta) {

        $validator=Validator::make($request->all(), [
            'naziv_paketa'=> 'required|string',
            'broj_tretmana'=> 'integer',
            'datum_od'=> '',
            'datum_do'=> '',
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $paketpacijenta = PaketiPacijent::create([
            'naziv_paketa'=>$request->tip_zahteva, 
            'broj_tretmana'=>0,
            'datum_od'=>'0000-00-00 00:00:00',
            'datum_do'=>'0000-00-00 00:00:00', 
            'id_pacijenta'=>$id_pacijenta,
        ]); 

        return new PaketiPacijentResource($paketpacijenta);
    }

    //************************************************************************************* 
    //LISTA PAKETA PACIJENTA
    public function paketi($id_pacijenta) {
        $paketi = PaketiPacijent::get()->where('id_pacijenta',$id_pacijenta);
        if(is_null($paketi)) {
            return response()->json("Paketa nema");
        }
        return new PaketiPacijentResource($paketi);     
    }  
}
