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
use App\Http\Resources\TretmanResource2; 
use App\Http\Resources\TretmanResource3; 
use App\Http\Resources\TretmanResource4; 
use App\Http\Resources\PregledResource; 

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

    public function listaSvi($id_pacijenta, $id_paketa_pacijenta) {
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta)
                                ->where('id_paketa_pacijenta', $id_paketa_pacijenta);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return TretmanResource4::collection($tretmani);  
    } 


    //************************************************************************************* 
    //KREIRANJE TRETMANA - ZAKAZIVANJE TRETMANA
    public function create(Request $request, $id_logopeda, $id_pacijenta, $id_paketa, $redni_broj_tretmana, $id_paketa_pacijenta) {

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
            'id_paketa_pacijenta'=>$id_paketa_pacijenta
        ]); 

        //return new TretmanResource($tretman);
        return response()->json(['success'=>true, new TretmanResource($tretman)]);
    }

    //************************************************************************************* 
    //KREIRANJE PREGLEDA
    public function createPregled(Request $request) {

        $validator=Validator::make($request->all(), [
            'datum_tretmana' => 'required',
            'vreme_tretmana' => 'required|string',
            'naziv_tretmana' => 'string',
            'redni_broj_tretmana' => '',
            'sadrzaj_tretmana' => 'required|string'
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $tretman = Tretman::create([
            'datum_tretmana' => $request->datum_tretmana,
            'vreme_tretmana' => $request->vreme_tretmana,
            'naziv_tretmana' => 'Pregled',
            'redni_broj_tretmana' => 0, 
            'sadrzaj_tretmana' => $request->sadrzaj_tretmana,
            'id_pacijenta'=>0,
            'id_logopeda'=>0,
            'id_paketa'=>0,
            'id_paketa_pacijenta'=>0 
        ]); 

        return response()->json(['success'=>true, new TretmanResource($tretman)]);
        //return new TretmanResource($tretman); 
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
    public function listaOdradjenih($id_pacijenta, $id_paketa_pacijenta) {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta)
                                ->where('id_paketa_pacijenta', $id_paketa_pacijenta)
                                ->where('datum_tretmana','<',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        //return new TretmanResource($tretmani);  
        return TretmanResource3::collection($tretmani);
    }

    //************************************************************************************* 
    //LISTA SVIH ZAKAZANIH TRETMANA 
    public function listaSvihZakazanih() {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('datum_tretmana','>',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return TretmanResource3::collection($tretmani);   
    } 

    //************************************************************************************* 
    //LISTA ZAKAZANIH TRETMANA PREMA PACIJENTU
    public function listaZakazanih($id_pacijenta, $id_paketa_pacijenta) {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta) 
                                ->where('id_paketa_pacijenta', $id_paketa_pacijenta)
                                ->where('datum_tretmana','>',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        //return new TretmanResource($tretmani);  
        return TretmanResource3::collection($tretmani);   
    } 

     //************************************************************************************* 
    //LISTA ZAKAZANIH TRETMANA PREMA PACIJENTU sa drugim resursom
    public function listaZakazanih2($id_pacijenta, $id_paketa_pacijenta) {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('id_pacijenta',$id_pacijenta) 
                                ->where('id_paketa_pacijenta', $id_paketa_pacijenta)
                                ->where('datum_tretmana','>',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        //return new TretmanResource($tretmani);  
        return TretmanResource4::collection($tretmani);    
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
        //return new TretmanResource($tretmani);
        return TretmanResource2::collection($tretmani);
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
    //LISTA PREGLEDA PREMA LOGOPEDU
    public function preglediLogoped() {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $pregledi = Tretman::get()->where('naziv_tretmana','Pregled')
                                    ->where('datum_tretmana','>',$currentDate); 
        if(is_null($pregledi)) {
            return response()->json("Pregleda nema");
        }
        return PregledResource::collection($pregledi);      
    }

    //************************************************************************************* 
    //LISTA ZAKAZANIH TRETMANA PREMA LOGOPEDU
    public function listaZakazanihLogoped($id_logopeda) {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('id_logopeda',$id_logopeda)->where('datum_tretmana','>',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return TretmanResource2::collection($tretmani);  
    } 

    //************************************************************************************* 
    //LISTA ZAKAZANIH TRETMANA PREMA LOGOPEDU drugi resurs
    public function listaZakazanihLogoped2($id_logopeda) {
        $timestamp = time();
        $currentDate = gmdate('Y-m-d', $timestamp); 
        $tretmani = Tretman::get()->where('id_logopeda',$id_logopeda)->where('datum_tretmana','>',$currentDate);
        if(is_null($tretmani)) {
            return response()->json("Tretmana nema");
        }
        return TretmanResource4::collection($tretmani);  
    } 

    //************************************************************************************* 
    //BRISANJE TRETMANA PACIJENTA
    public function delete($id_tretmana) {
        $tretman = Tretman::find($id_tretmana);
        $tretman->delete();
        return response()->json('Tretman uspesno obrisan');  
    }

}
