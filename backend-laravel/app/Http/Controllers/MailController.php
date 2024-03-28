<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function posaljiMejl(Request $request, $pos, $prim, $rod, $kime, $loz)
    {
        // $posiljalac = $request->input('email');
        // $primalac = $request->input('email'); 
        $template = "emails.proba";

        Mail::to($prim)->send(new SendMail($pos, $prim, $template, $rod, $kime, $loz));

        return response()->json(['message' => 'Email poslat roditelju', 'success'=>'true'], 200);
    }
}
