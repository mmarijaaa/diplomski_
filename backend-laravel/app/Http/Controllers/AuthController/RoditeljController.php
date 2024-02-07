<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use App\Models\Roditelj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RoditeljResource; 

class RoditeljController extends Controller
{
    //***********************************************************************
    //KREIRANJE RODITELJA
    public function create(Request $request)
    {
        $validator=Validator::make($request->all(), [
            'ime'=>'required|string|max:100',
            'prezime'=>'required|string|max:100',
            'korisnicko_ime'=>'required|string|max:100|unique:users',
            'email'=>'required|string|max:100|email|unique:users',
            'password'=>'required|string|min:6',
            'broj_telefona'=>'required|string|min:11|max:12'
        ]); 

        if($validator->fails()) 
            // $ime = $request['ime'];
            // $prezime = $request['prezime'];
            // $korisnicko_ime = $request['korisnicko_ime'];
            // $email = $request['email'];
            // $password = $request['password'];
            // $broj_telefona = $request['broj_telefona'];

            // if($ime=='' && $prezime=='' && $korisnicko_ime=='' && $email=='' && $password=='' && $broj_telefona=='') {
            //     return response()->json(['success'=>false, 'poruka'=>'Nisu sva polja popunjena!']);
            // }
           
            return response()->json(['success'=>false, 'poruka'=>'Popunite sva polja!', $validator->errors()]);

        $user=Roditelj::create([
            'ime'=>$request->ime,
            'prezime'=>$request->prezime,
            'korisnicko_ime'=>$request->korisnicko_ime,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'broj_telefona'=>$request->broj_telefona,
            'id_logopeda'=>Auth::user()->id 
        ]);

        $user->save();

        $token=$user->createToken('auth_token')->plainTextToken;
        $roditelj_id = $user->id;

        return response()->json(['success'=>true, 'data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer', 'roditelj_id'=>$roditelj_id]);
    }

    //**************************************************************************
    //PRIJAVA RODITELJA
    public function login(Request $request)
    {
        $validator=Validator::make($request->all(), [
            'korisnicko_ime'=>'required|string|max:100',
            'password'=>'required|string|min:6|max:20'
        ]);

        // if($validator->fails())
        //     return response()->json($validator->errors());

       if(!Auth::guard('roditelj')->attempt($request->only('korisnicko_ime', 'password'))) {
        if($request['korisnicko_ime']=='' && $request['password']=='') {
            return response()->json(['success'=>false, 'korisnicko_ime'=>'Unesite korisnicko ime', 'password'=>'Unesite lozinku']);
            }
            if($request['korisnicko_ime']=='' && strlen($request['password'])<6) {
                return response()->json(['success'=>false, 'korisnicko_ime'=>'Unesite korisnicko ime', 'password'=>'Broj karaktera mora biti veći od 6']);
            }
            if($request['korisnicko_ime']=='') {
                return response()->json(['success'=>false, 'korisnicko_ime'=>'Unesite korisnicko ime']);
            } 
            if($request['password']=='') {
                return response()->json(['success'=>false, 'password'=>'Unesite lozinku']);
            } 
            if(strlen($request['password'])<6) {
                return response()->json(['success'=>false, 'password'=>'Broj karaktera mora biti veći od 6']);
            } 
       
            return response()->json(['success'=>false, 'korisnicko_ime'=>'Korisnciko ime ili lozinka nisu odgovarajuci', 'password'=>'Korisnciko ime ili lozinka nisu odgovarajuci']); 
       }
             
        
        $user=Roditelj::where('korisnicko_ime', $request['korisnicko_ime'])->firstOrFail();
        $token=$user->createToken('auth_token')->plainTextToken;
        $user_id = $user->id;
        return response()->json(['success'=>true, 'access_token'=>$token, 'token_type'=>'Bearer', 'roditelj_user_id'=> $user_id]);
    }

    //****************************************************************************
    //ODJAVA RODITELJA
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return['message'=>"Uspesno ste se izlogovali."];
    }

    //****************************************************************************
    //RODITELJ PO PACIJENTU
    public function get($id_roditelja_pacijenta) {
        $roditelj = Roditelj::get()->where('id',$id_roditelja_pacijenta);
        if(is_null($roditelj)) {
            return response()->json("Roditelja nema");
        }
        return new RoditeljResource($roditelj);   
    } 

    //****************************************************************************
    //RODITELJ PO ID-JU
    public function getR($id_roditelja) {
        $roditelj = Roditelj::get()->where('id',$id_roditelja);
        if(is_null($roditelj)) {
            return response()->json("Roditelja nema");
        }
        return new RoditeljResource($roditelj);   
    } 

    //****************************************************************************
    //LISTA RODITELJA LOGOPEDA
    public function lista($id_logopeda) { 
        $roditelji = Roditelj::get()->where('id_logopeda',$id_logopeda); 
        if(is_null($roditelji)) { 
            return response()->json("Roditelja nema");
        }
        return new RoditeljResource($roditelji);   
    } 

    //****************************************************************************
    //LISTA RODITELJA
    public function lista2() { 
        $roditelji = Roditelj::get(); 
        if(is_null($roditelji)) { 
            return response()->json("Roditelja nema");
        }
        return new RoditeljResource($roditelji);   
    } 

    //****************************************************************************
    //IZMENA RODITELJA
    public function update(Request $request, $id_roditelja) {

        $validator=Validator::make($request->all(), [
            'ime'=>'required|string|max:100',
            'prezime'=>'required|string|max:100',
            'korisnicko_ime'=>'required|string|max:100',
            'email'=>'required|string|max:100|email|unique:users',
            'broj_telefona'=>'required|string|min:11|max:12'
        ]); 


        if($validator->fails()){
            return response()->json(['success'=> false, $validator->errors()]);
        }

        $roditelj=Roditelj::find($id_roditelja); 

        $roditelj->ime = $request->ime;
        $roditelj->prezime = $request->prezime;
        $roditelj->korisnicko_ime = $request->korisnicko_ime;
        $roditelj->email = $request->email;
        $roditelj->broj_telefona = $request->broj_telefona; 

        $roditelj->save();
    
        return new RoditeljResource($roditelj);  
    }


    //****************************************************************************
    //BRISANJE RODITELJA
    public function delete($id_roditelja){
        $roditelj=Roditelj::find($id_roditelja); 
        $roditelj->delete();
        return response()->json('Roditelj uspesno obrisan'); 
    }

    //RESURS PRIKAZA RODITELJA

    public function index() {
        $roditelji = Roditelj::all();
        return RoditeljResource::collection($roditelji);  
    }
    public function show($id) {
        $rod = Roditelj::find($id);
        if(is_null($rod)) {
            return response()->json("Roditelja nema");
        }
        return response()->json(['success'=>true, new RoditeljResource($rod)]); 
    }
}
