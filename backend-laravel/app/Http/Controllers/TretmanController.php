<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tretman;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TretmanResource; 


class TretmanController extends Controller
{
    //************************************************************************************* 
    //LISTA SVIH TRETMANA PREMA PACIJENTU
    public function lista($id_pacijenta) {
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return new TretmanResource($tretmani);  
    } 

    //************************************************************************************* 
    //KREIRANJE TRETMANA - ZAKAZIVANJE TRETMANA
    public function create(Request $request, $id_logopeda, $id_pacijenta, $id_paketa, $redni_broj_tretmana) {

        $validator=Validator::make($request->all(), [
            'datum_tretmana' => 'required',
            'vreme_tretmana' => 'required|string',
            'naziv_tretmana' => 'string',
            'redni_broj_tretmana' => '',
            'sadrzaj_tretmana' => 'string'
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $tretman = Tretman::create([
            'datum_tretmana' => $request->datum_tretmana,
            'vreme_tretmana' => $request->vreme_tretmana,
            'naziv_tretmana' => 'Tretman',
            'redni_broj_tretmana' => $redni_broj_tretmana, 
            'sadrzaj_tretmana' => '',
            'id_pacijenta'=>$id_pacijenta,
            'id_logopeda'=>$id_logopeda,
            'id_paketa'=>$id_paketa,
        ]); 

        return new TretmanResource($tretman);
    }

    //************************************************************************************* 
    //DODAVANJE SADRZAJA TRETMANU OD STRANE LOGOPEDA
    public function update(Request $request, $id_tretmana) {

        $validator=Validator::make($request->all(), [
            // 'datum_tretmana' => 'required',
            // 'vreme_tretmana' => 'required|string',
            // 'naziv_tretmana' => 'string',
            // 'redni_broj_tretmana' => ''
            'sadrzaj_tretmana' => 'string'
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $tretman = Tretman::find($id_tretmana);

        // $tretman->datum_tretmana = $request->datum_tretmana;
        // $tretman->vreme_tretmana = $request->vreme_tretmana;
        // $tretman->naziv_tretmana = $request->naziv_tretmana;
        // $tretman->redni_broj_tretmana = $request->redni_broj_tretmana;
        $tretman->sadrzaj_tretmana = $request->sadrzaj_tretmana;

        $tretman->save();

        return response()->json(['success'=>true,'Tretmanu uspesno dodat sadrzaj.', $tretman]); 
    }

    //************************************************************************************* 
    //LISTA ODRADJENIH TRETMANA PREMA PACIJENTU
    public function listaOdradjenih($id_pacijenta) {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta)->where('datum_tretmana','<',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return new TretmanResource($tretmani);  
    } 

    //************************************************************************************* 
    //LISTA ZAKAZANIH TRETMANA PREMA PACIJENTU
    public function listaZakazanih($id_pacijenta) {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta)->where('datum_tretmana','>',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return new TretmanResource($tretmani);  
    } 

    //************************************************************************************* 
    //LISTA DANASNJIH TRETMANA PREMA PACIJENTU ???????
    public function listaDanasnjih($id_pacijenta) {
        $currentDate = gmdate('Y-m-d'); 
        $datum_tretmana = Tretman::get('datum_tretmana');
        $datum = $datum_tretmana->format('Y-m-d'); 
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta)->where($datum ,'=',$currentDate); 
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema"); 
        }
        return new TretmanResource($tretmani);  
    } 

    //************************************************************************************* 
    //LISTA TRETMANA PREMA LOGOPEDU
    public function listaLogoped($id_logopeda) {
        $tretmani = Tretman::get()->where('id_logopeda',$id_logopeda);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return new TretmanResource($tretmani);   
    }

    //************************************************************************************* 
    //BRISANJE TRETMANA PACIJENTA
    public function delete($id_pacijenta) {
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta);
        foreach($tretmani as $t) {
            $t->delete(); 
        }
        return response()->json('Tretmani uspesno obrisani');  
    }

}