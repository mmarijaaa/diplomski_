<?php

namespace App\Http\Controllers;

use App\Models\Zahtev;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ZahtevController extends Controller
{

    //************************************************************************************* 
    //KREIRANJE ZAHTEVA
    public function create(Request $request, $id_logopeda, $id_pacijenta, $id_roditelja) {

        $validator=Validator::make($request->all(), [
            'tip_zahteva' => 'required|string',
            'odobren' => 'required|integer',
            'pregledan' => 'required|integer',
            'info_zahteva' => 'string'
        ]); 

        if($validator->fails())
        return response()->json(['success'=> false, $validator->errors()]);

        $zahtev = Zahtev::create([
            'tip_zahteva' => $request->tip_zahteva,
            'odobren' => 0,
            'pregledan' => 0,
            'id_logopeda'=>$id_logopeda,
            'id_pacijenta'=>$id_pacijenta,
            'id_roditelja'=>$id_roditelja,
            'info_zahteva' => ''
        ]); 

        return new ZahtevResource($zahtev);
    }

    //************************************************************************************* 
    //LISTA ZAHTEVA LOGOPEDA
    public function zahtevi($id_logopeda) {
        $zahtevi = Zahtev::get()->where('id_logopeda',$id_logopeda);
        if(is_null($zahtevi)) {
            return response()->json("Zahteva nema");
        }
        return new ZahtevResource($zahtevi);  
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
    public function create2()
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
    public function show(Zahtev $zahtev)
    {
        //
    }

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
