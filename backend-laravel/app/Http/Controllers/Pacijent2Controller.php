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

class Pacijent2Controller extends Controller
{
    public function show($id) { 
        $pac = Pacijent::where('id_logopeda',$id)->get();
        return PacijentResource::collection($pac);   
    }
}
