<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController\LogopedController;    
use App\Http\Controllers\AuthController\RoditeljController;    
use App\Http\Controllers\PacijentController;    
use App\Http\Controllers\TretmanController;    
use App\Http\Controllers\PaketController;
use App\Http\Controllers\PaketiPacijentController;
use App\Http\Controllers\ZahtevController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('/register', [LogopedController::class, 'register']);
Route::post('/login', [LogopedController::class, 'login']);   


Route::group(['middleware'=> ['auth:sanctum']], function() {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });
    
    //logoped 
    Route::get('/logoped/{id_logopeda}', [LogopedController::class, 'logoped']);

    //kreiranje roditelja
    Route::post('/kreirajRoditelja', [RoditeljController::class, 'create']);  

    //kreiranje pacijenta
    Route::post('/kreirajPacijenta/{id_roditelja}/{id_paketa}',[PacijentController::class, 'create']);

    //lista pacijenata odredjenog logopeda
    Route::get('/logopedListaPacijenata/{id_logopeda}', [PacijentController::class, 'lista']);

    //izmena pacijenta
    Route::put('/izmenaPacijenta/{id_pacijenta}', [PacijentController::class, 'update']);

    //brisanje pacijenta
    Route::delete('/brisanjePacijenta/{id_pacijenta}', [PacijentController::class, 'delete']); 

    //roditelj pacijenta
    Route::get('/roditeljPacijenta/{id_roditelja_pacijenta}', [RoditeljController::class, 'get']); 

    //paket pacijenta
    Route::get('/paketPacijenta/{id_paketa_pacijenta}', [PaketController::class, 'get']); 

    //lista odraDJenih tretmana odredjenog pacijenta
    Route::get('/listaTretmanaOdradjenih/{id_pacijenta}', [TretmanController::class, 'listaOdradjenih']);

    //lista zakazanih tretmana odredjenog pacijenta 
    Route::get('/listaTretmanaZakazanih/{id_pacijenta}', [TretmanController::class, 'listaZakazanih']); 

    //lista danasnjih tretmana odredjenog pacijenta ???????
    Route::get('/listaTretmanaDanasnjih/{id_pacijenta}', [TretmanController::class, 'listaDanasnjih']);   

    //dodavanje sadrzaja tretmana
    Route::put('/dodajSadrzaj/{id_tretmana}', [TretmanController::class, 'update']);

    //lista roditelja logopeda
    Route::get('/listaRoditeljaLogopeda/{id_logopeda}', [RoditeljController::class, 'lista']); 
    
    //lista roditelja
    Route::get('/listaRoditelja', [RoditeljController::class, 'lista2']); 

    //lista pacijenata odredjenog roditelja
    Route::get('/listaDece/{id_roditelja}', [PacijentController::class, 'listaR']); 

    //izmena roditelja
    Route::put('/izmenaRoditelja/{id_roditelja}', [RoditeljController::class, 'update']); 

    //brisanje roditelja
    Route::delete('/brisanjeRoditelja/{id_roditelja}', [RoditeljController::class, 'delete']); 

    //kreiranje zahteva
    Route::post('/kreirajZahtev', [ZahtevController::class, 'create']);   

    //lista zahteva
    Route::get('/zahteviLogopeda', [ZahtevController::class, 'zahtevi']);  

    //kreiranje paketa pacijenta
    Route::post('/kreirajNoviPaket', [PaketiPacijentController::class, 'create']); 

    //lista paketa pacijenta
    Route::get('/paketiPacijentaLogoped', [PaketiPacijentController::class, 'paketi']);  

    //log out logopeda
    Route::post('/logout', [LogopedController::class, 'logout']);
});

//************************************************************************************************************

Route::post('/loginroditelj', [RoditeljController::class, 'login']);   

Route::group(['middleware'=> ['auth:sanctum','abilities:roditelj']], function() {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    //roditelj pacijenta
    Route::get('/roditelj/{id_roditelja}', [RoditeljController::class, 'getR']); 

    //kreiranje tretmana 
    Route::post('/kreiranjeTretmana/{id_logopeda}/{id_pacijenta}/{id_paketa}/{redni_broj_tretmana}', [TretmanController::class, 'create']); 

    //lista svih tretmana odredjenog pacijenta
    Route::get('/listaTretmana/{id_pacijenta}', [TretmanController::class, 'lista']);

    //lista svih tretmana odredjenog logopeda
    Route::get('/listaTretmanaLogoped/{id_logopeda}', [TretmanController::class, 'listaLogoped']); 

    //lista odrajdenih tretmana odredjenog pacijenta
    Route::get('/listaTretmanaOdradjenih/{id_pacijenta}', [TretmanController::class, 'listaOdradjenih']);

    //lista zakazanih tretmana odredjenog pacijenta 
    Route::get('/listaTretmanaZakazanih/{id_pacijenta}', [TretmanController::class, 'listaZakazanih']);

    //lista pacijenata odredjenog roditelja
    Route::get('/listaDece/{id_roditelja}', [PacijentController::class, 'listaR']);

    //paket pacijenta
    Route::get('/paketPacijenta/{id_paketa_pacijenta}', [PaketController::class, 'get']);  

    //izmena paketa pacijenta 
    Route::put('/izmenaPaketaPacijenta/{id_pacijenta}/{id_paketa}', [PacijentController::class, 'updatePaket']);

    //brisanje tretmana pacijenta 
    Route::delete('/brisanjeTretmana/{id_pacijenta}', [TretmanController::class, 'delete']); 

    //pacijent prema id pacijenta 
    Route::get('/pacijent/{id_pacijenta}', [PacijentController::class, 'pacijent']);

    //logoped 
    Route::get('/logoped/{id_logopeda}', [LogopedController::class, 'logoped']); 

    //lista paketa pacijenta
    Route::get('/paketiPacijentaRoditelj', [PaketiPacijentController::class, 'paketi']);   

    //log out logopeda
    Route::post('/logoutRoditelja', [RoditeljController::class, 'logout']);
});


 