<?php

namespace App\Http\Controllers;

use App\Models\Zahtev;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ZahtevResource; 


class ZahtevController extends Controller
{

    //************************************************************************************* 
    //KREIRANJE ZAHTEVA NOV PACIJENT
    public function create(Request $request, $id_logopeda_kreira, $id_logopeda_prima, $id_pacijenta, $id_roditelja) {

        $validator=Validator::make($request->all(), [
            'tip_zahteva' => '',
            'odobren' => '', 
            'pregledan' => '',
            'info_pacijenta' => 'string',
            'info_roditelja' => 'string'
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $zahtev = Zahtev::create([
            'tip_zahteva' => "Zahtev za novog pacijenta", 
            'odobren' => 0,  
            'pregledan' => 0, 
            'id_logopeda_kreira'=>$id_logopeda_kreira,
            'id_logopeda_prima'=>$id_logopeda_prima,
            'id_pacijenta'=>$id_pacijenta,
            'id_roditelja'=>$id_roditelja,
            'info_pacijenta' => $request->info_pacijenta,
            'info_roditelja' => $request->info_roditelja    
        ]); 

        return response()->json(['success'=>true, new ZahtevResource($zahtev)]);
    }

    //************************************************************************************* 
    //KREIRANJE ZAHTEVA OBNOVA PAKETA
    public function create2(Request $request, $id_logopeda_prima, $id_pacijenta, $id_roditelja) {

        $validator=Validator::make($request->all(), [
            'tip_zahteva' => '',
            'odobren' => '', 
            'pregledan' => '',
            'info_pacijenta' => 'string',
            'info_roditelja' => 'string'
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $zahtev = Zahtev::create([
            'tip_zahteva' => "Zahtev za obnovu paketa", 
            'odobren' => 0,  
            'pregledan' => 0, 
            'id_logopeda_kreira'=>0,
            'id_logopeda_prima'=>$id_logopeda_prima,
            'id_pacijenta'=>$id_pacijenta,
            'id_roditelja'=>$id_roditelja,
            'info_pacijenta' =>  $request->info_pacijenta,
            'info_roditelja' => '' 
        ]); 

        return response()->json(['success'=>true, new ZahtevResource($zahtev)]);
    }

    //************************************************************************************* 
    //LISTA ZAHTEVA LOGOPEDA
    public function zahtevi($id_logopeda_prima) {
        $zahtevi = Zahtev::get()->where('id_logopeda_prima',$id_logopeda_prima); 
        if(is_null($zahtevi)) {
            return response()->json("Zahteva nema");
        }
        return new ZahtevResource($zahtevi);    
        //return ZahtevResource::collection($zahtevi);   

    }
    
    public function show($id) { 
        $zah = Zahtev::where('id_logopeda_prima',$id)->get();
        return ZahtevResource::collection($zah);    
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create3()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    // public function show(Zahtev $zahtev)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Zahtev $zahtev)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zahtev $zahtev)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zahtev $zahtev)
    {
        //
    }
}
