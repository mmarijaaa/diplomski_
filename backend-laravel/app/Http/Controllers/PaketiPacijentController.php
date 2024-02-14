<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PaketiPacijent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PaketiPacijentResource;
use App\Http\Resources\PaketiPacijentResource2;


class PaketiPacijentController extends Controller
{
    //************************************************************************************* 
    //KREIRANJE PAKETA PACIJENTA
    public function create(Request $request, $naziv_paketa, $id_pacijenta, $id_logopeda) {

        $validator=Validator::make($request->all(), [
            'naziv_paketa'=> '',
            'datum_od'=> '',
            'datum_do'=> '',
            'zavrsen'=>''
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $paketpacijenta = PaketiPacijent::create([
            'naziv_paketa'=>$naziv_paketa, 
            'datum_od'=>null, 
            'datum_do'=>null, 
            'id_pacijenta'=> $id_pacijenta,
            'id_logopeda'=> $id_logopeda,
            'zavrsen'=>0
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
        return PaketiPacijentResource2::collection($paketi);     
    }  

    //************************************************************************************* 
    //LISTA PAKETA LOGOPEDA
    public function paketiLogoped($id_logopeda) {
        $paketi = PaketiPacijent::get()->where('id_logopeda',$id_logopeda);
        if(is_null($paketi)) {
            return response()->json("Paketa nema");
        }
        return new PaketiPacijentResource($paketi);     
    }  


    //************************************************************************************* 
    //LISTA PAKETA ZAVRSENIH
    public function paketiZavrseni($id_pacijenta) {
        $paketi = PaketiPacijent::get()->where('id_pacijenta',$id_pacijenta)
                                        ->where('zavrsen',1);
        if(is_null($paketi)) {
            return response()->json("Paketa nema");
        }
        return PaketiPacijentResource2::collection($paketi);      
    } 

    //************************************************************************************* 
    //LISTA PAKETA TRENUTNIH
    public function paketTrenutni($id_pacijenta) {
        $paketi = PaketiPacijent::get()->where('id_pacijenta',$id_pacijenta)
                                        ->where('zavrsen',0); 
        if(is_null($paketi)) { 
            return response()->json("Paketa nema");
        }
        return PaketiPacijentResource2::collection($paketi);     
    } 
}
