<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Roditelj;
use App\Models\Paket;
use App\Models\User;
use App\Models\Pacijent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PacijentResource; 
use App\Http\Resources\LogopedPacijentResource;
use App\Http\Resources\RoditeljPacijentResource;

class PacijentController extends Controller 
{
    //************************************************************************************* 
    //KREIRANJE PACIJENTA
    public function create(Request $request, $id_roditelja, $id_paketa) {

        $validator=Validator::make($request->all(), [
            'ime'=>'required|string|max:100',
            'prezime'=>'required|string|max:100',
            'uzrast'=>'required|integer|min:3|max:15', 
            'poremecaj'=>'required|string|max:100'
        ]); 

        if($validator->fails()) 
            return response()->json(['success'=> false, 'poruka'=>'Popunite sva polja!', $validator->errors()]);

        $pacijent = Pacijent::create([
            'ime'=>$request->ime,
            'prezime'=>$request->prezime,
            'uzrast'=>$request->uzrast,
            'poremecaj'=>$request->poremecaj,
            'id_roditelja'=>$id_roditelja,
            'id_logopeda'=>Auth::user()->id,
            'id_paketa'=>$id_paketa,
        ]); 

        return response()->json(['success'=>true, new PacijentResource($pacijent)]);
        //return new PacijentResource($pacijent);   
    }

    //************************************************************************************* 
    //LISTA PACIJENATA PREMA LOGOPEDU
    public function lista($id_logopeda) {
        $pacijenti = Pacijent::get()->where('id_logopeda',$id_logopeda);
        if(is_null($pacijenti)) {
            return response()->json("Pacijenata nema");
        }
        return new LogopedPacijentResource($pacijenti); 
    }

    //************************************************************************************* 
    //LISTA PACIJENATA PREMA RODITELJU
    public function listaR($id_roditelja) {
        $pacijenti = Pacijent::get()->where('id_roditelja',$id_roditelja);
        if(is_null($pacijenti)) {
            return response()->json("Pacijenata nema");
        }
        return new RoditeljPacijentResource($pacijenti);  
    } 

    //************************************************************************************* 
    //IZMENA PACIJENTA
    public function update(Request $request, $id_pacijenta) {
        
        $validator=Validator::make($request->all(), [
            'ime'=>'required|string|max:100',
            'prezime'=>'required|string|max:100',
            'uzrast'=>'required|integer|min:3|max:15', 
            'poremecaj'=>'required|string|max:100'
        ]); 

        if($validator->fails()){
            return response()->json(['success'=> false, $validator->errors()]);
        }

        $pacijent=Pacijent::find($id_pacijenta);

        $pacijent->ime = $request->ime;
        $pacijent->prezime = $request->prezime;
        $pacijent->uzrast = $request->uzrast;
        $pacijent->poremecaj = $request->poremecaj;
        //$pacijent->id_paketa=$request->id_paketa;

        $pacijent->save();

        //return response()->json(['success'=>true,'Pacijent uspesno azuriran.', $pacijent]); 
        //return response()->json(['success'=>true,'Pacijent uspesno azuriran.', new PacijentResource($pacijent)]);  
        return new PacijentResource($pacijent); 

    }

     //************************************************************************************* 
    //IZMENA PAKETA PACIJENTA
    public function updatePaket(Request $request, $id_pacijenta, $id_paketa) {
        
        $validator=Validator::make($request->all(), [
            'id_paketa'=>'',
        ]); 

        if($validator->fails()){
            return response()->json(['success'=> false, $validator->errors()]);
        }

        $pacijent=Pacijent::find($id_pacijenta);

        $pacijent->id_paketa = $id_paketa; 

        $pacijent->save();

        return new PacijentResource($pacijent); 

    }

    //************************************************************************************* 
    //BRISANJE PACIJENTA
    public function delete($id_pacijenta){
        $pacijent=Pacijent::find($id_pacijenta);
        $pacijent->delete();
        return response()->json('Pacijent uspesno obrisan'); 
    }
}
