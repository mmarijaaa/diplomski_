<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\LogopedResource;

class LogopedController extends Controller
{
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(), [
            'ime'=>'required|string|max:100',
            'prezime'=>'required|string|max:100',
            'korisnicko_ime'=>'required|string|max:100',
            'email'=>'required|string|max:100|email|unique:users',
            'password'=>'required|string|min:6',
            'broj_telefona'=>'required|integer|min:5'
        ]); 

        if($validator->fails())
            return response()->json($validator->errors());

        $user=User::create([
            'ime'=>$request->ime,
            'prezime'=>$request->prezime,
            'korisnicko_ime'=>$request->korisnicko_ime,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'broj_telefona'=>$request->broj_telefona

        ]);

        $user->save();

        $token=$user->createToken('auth_token')->plainTextToken;

        return response()->json(['success'=>true, 'data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer']);
    }

    public function login(Request $request)
    {
        $validator=Validator::make($request->all(), [
            'korisnicko_ime'=>'required|string|max:100',
            'password'=>'required|string|min:6|max:20'
        ]);

        // if($validator->fails())
        //     return response()->json($validator->errors());

       if(!Auth::attempt($request->only('korisnicko_ime', 'password'))) {
            if($request['korisnicko_ime']=='' && $request['password']=='') {
            return response()->json(['success'=>false, 'korisnicko_ime'=>'Unesite korisnicko ime', 'password'=>'Unesite lozinku']);
            }
            if($request['korisnicko_ime']=='' && strlen($request['password'])<6) {
                return response()->json(['success'=>false, 'password'=>'Broj karaktera mora biti veći od 6']);
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
        
        $user=User::where('korisnicko_ime', $request['korisnicko_ime'])->firstOrFail();
        $token=$user->createToken('auth_token')->plainTextToken;
        $user_id = $user->id;
        return response()->json(['success'=>true, 'access_token'=>$token, 'token_type'=>'Bearer', 'user_id'=> $user_id]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return['message'=>"Uspesno ste izlogovani."];
    }

    public function logoped($id_logopeda) {
        $logoped = User::get()->where('id',$id_logopeda);  
        if(is_null($logoped)) { 
            return response()->json("Logopeda nema");
        }
        return response()->json(['success'=>true, 'logoped'=>$logoped]);
        //return new LogopedResource($logoped);  
    }

    public function index() {
        $logo = User::all();
        return LogopedResource::collection($logo); 
    }
    public function show($id) {
        $log = User::find($id);
        if(is_null($log)) {
            return response()->json("Logopeda nema");
        }
        return response()->json(['success'=>true, new LogopedResource($log)]); 
    }

    //************************************************************************************* 
    //LISTA SVIH LOGOPEDA
    public function lista() {
        $logopedi = User::all();
        if(is_null($logopedi)) {
            return response()->json("Logopeda nema");
        }
        return new LogopedResource($logopedi);   
    } 
}
