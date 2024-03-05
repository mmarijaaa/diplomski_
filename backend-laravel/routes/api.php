<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController\LogopedController;    
use App\Http\Controllers\AuthController\RoditeljController;    
use App\Http\Controllers\PacijentController;    
use App\Http\Controllers\Pacijent2Controller;    
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

//kreiranje pregleda
Route::post('/kreiranjePregleda', [TretmanController::class, 'createPregled']); 

//lista svih zakazanih tretmana 
Route::get('/listaSvihZakazanih', [TretmanController::class, 'listaSvihZakazanih']); 



Route::group(['middleware'=> ['auth:sanctum']], function() {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    }); 
    
    //logoped 
    Route::get('/logoped/{id_logopeda}', [LogopedController::class, 'logoped']);
    Route::resource('sviLogopedi', LogopedController::class);   

    //kreiranje roditelja
    Route::post('/kreirajRoditelja', [RoditeljController::class, 'create']);  

    //kreiranje pacijenta
    Route::post('/kreirajPacijenta/{id_roditelja}/{id_paketa}',[PacijentController::class, 'create']);

    //lista pacijenata odredjenog logopeda
    Route::get('/logopedListaPacijenata/{id_logopeda}', [PacijentController::class, 'lista']);
    Route::get('paci/{id}', [PacijentController::class, 'show']);
    Route::get('paci', [PacijentController::class, 'index']); 
    Route::resource('pacijent', PacijentController::class); 
    Route::resource('paclog', PacijentController::class);
    Route::resource('svipac', Pacijent2Controller::class);

    Route::resource('pacijent', PacijentController::class); 

    //izmena pacijenta
    Route::put('/izmenaPacijenta/{id_pacijenta}', [PacijentController::class, 'update']);

    //izmena paketa pacijenta
    Route::put('/izmenaPaketaPacijenta/{id_pacijenta}/{id_paketa}', [PacijentController::class, 'updatePaket']);

    //brisanje pacijenta
    Route::delete('/brisanjePacijenta/{id_pacijenta}', [PacijentController::class, 'delete']); 

    //roditelj pacijenta
    Route::get('/roditeljPacijenta/{id_roditelja_pacijenta}', [RoditeljController::class, 'get']); 

    //paket pacijenta
    Route::get('/paketPacijenta/{id_paketa_pacijenta}', [PaketController::class, 'get']); 

    //lista odraDJenih tretmana odredjenog pacijenta
    Route::get('/listaTretmanaOdradjenih/{id_pacijenta}/{id_pak_pac}', [TretmanController::class, 'listaOdradjenih']);

    //lista zakazanih tretmana odredjenog pacijenta 
    Route::get('/listaTretmanaZakazanih/{id_pacijenta}/{id_pak_pac}', [TretmanController::class, 'listaZakazanih']); 

    //lista danasnjih tretmana odredjenog pacijenta ???????
    Route::get('/listaTretmanaDanasnjih/{id_pacijenta}', [TretmanController::class, 'listaDanasnjih']);
    
    //lista zakazanih logoped
    Route::get('/listaTretmanaLogoped/{id_logoped}', [TretmanController::class, 'listaZakazanihLogoped']);

    //lista zakazanih logoped
    Route::get('/listaTretmanaLog/{id_logoped}', [TretmanController::class, 'listaZakazanihLogoped2']);

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

    //kreiranje tretmana 
    Route::post('/kreiranjeTretmanaL/{id_logopeda}/{id_pacijenta}/{id_paketa}/{redni_broj_tretmana}', [TretmanController::class, 'create']); 

    //lista pregleda logopeda
    Route::get('/listaPregleda', [TretmanController::class, 'preglediLogoped']);

    //kreiranje zahteva nov pacijent
    Route::post('/kreirajZahtev/{id_lk}/{id_lp}/{id_pac}/{id_rod}', [ZahtevController::class, 'create']); 
    
    //kreiranje zahteva obnova paketa
    Route::post('/kreirajZahtevObnova/{id_lp}/{id_pac}/{id_rod}', [ZahtevController::class, 'create2']); 

    //lista zahteva
    Route::get('/zahteviLogopeda/{id_logopeda}', [ZahtevController::class, 'zahtevi']);  
    Route::resource('sviZahtevi', ZahtevController::class);

    //kreiranje paketa pacijenta
    Route::post('/kreirajNoviPaket/{naziv_paketa}/{id_pacijenta}/{id_logopeda}', [PaketiPacijentController::class, 'create']); 

    //izmena paketa pacijenta
    Route::put('/izmeniTrenutniPaket/{id_pak_pac}', [PaketiPacijentController::class, 'update']);  

    //lista paketa pacijenta
    Route::get('/paketiPacijentaLogoped/{id_pacijenta}', [PaketiPacijentController::class, 'paketi']);  

    //lista paketa zavrsenih
    Route::get('/paketiZavrseni/{id_pacijenta}', [PaketiPacijentController::class, 'paketiZavrseni']); 

    //paket trenutni 
    Route::get('/paketTrenutni/{id_pacijenta}', [PaketiPacijentController::class, 'paketTrenutni']); 

    //izmena zahteva da bude pregledan
    Route::put('/zahtevOdobren/{id_zahteva}', [ZahtevController::class, 'updateO']);  

    //kreiranje tretmana od strane logopeda
    Route::post('/kreiranjeTretmana/{id_logopeda}/{id_pacijenta}/{id_paketa}/{redni_broj_tretmana}/{id_paketa_pacijenta}', [TretmanController::class, 'create']); 

    //brisanje tretmana pacijenta 
    Route::delete('/brisanjeTretmana/{id_tretmana}', [TretmanController::class, 'delete']); 

    //log out logopeda
    Route::post('/logout', [LogopedController::class, 'logout']); 

    //paketi proba 
    Route::get('/pak', [PaketController::class, 'get2']); 
});

//************************************************************************************************************

Route::post('/loginroditelj', [RoditeljController::class, 'login']);   

Route::group(['middleware'=> ['auth:sanctum','abilities:roditelj']], function() {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    //roditelj pacijenta
    Route::get('/roditelj/{id_roditelja}', [RoditeljController::class, 'getR']); 
    Route::resource('sviRoditelji', RoditeljController::class); 

    //kreiranje tretmana 
    Route::post('/kreiranjeTretmana/{id_logopeda}/{id_pacijenta}/{id_paketa}/{redni_broj_tretmana}/{id_paketa_pacijenta}', [TretmanController::class, 'create']); 

    //lista svih tretmana odredjenog pacijenta
    Route::get('/listaTretmana/{id_pacijenta}', [TretmanController::class, 'lista']);

    //lista svih tretmana odredjenog pacijenta
    Route::get('/listaTret/{id_pacijenta}/{id_pak_pac}', [TretmanController::class, 'listaSvi']);

    //lista svih tretmana odredjenog logopeda
    Route::get('/listaTretmanaLogoped/{id_logopeda}', [TretmanController::class, 'listaLogoped']); 

    //lista odraDJenih tretmana odredjenog pacijenta
    Route::get('/listaTretmanaOdradjenih/{id_pacijenta}/{id_pak_pac}', [TretmanController::class, 'listaOdradjenih']);

    //lista zakazanih tretmana odredjenog pacijenta 
    Route::get('/listaTretmanaZakazanih/{id_pacijenta}/{id_pak_pac}', [TretmanController::class, 'listaZakazanih']); 
 
    //lista zakazanih tretmana odredjenog pacijenta drugi resurs
    Route::get('/listaTretmanaZak/{id_pacijenta}/{id_pak_pac}', [TretmanController::class, 'listaZakazanih2']); 
 
    //lista pacijenata odredjenog roditelja
    Route::get('/listaDece/{id_roditelja}', [PacijentController::class, 'listaR']);

    //paket pacijenta
    Route::get('/paketPacijenta/{id_paketa_pacijenta}', [PaketController::class, 'get']);  

    //izmena paketa pacijenta 
    Route::put('/izmenaPaketaPacijenta/{id_pacijenta}/{id_paketa}', [PacijentController::class, 'updatePaket']);

    //brisanje tretmana pacijenta 
    Route::delete('/brisanjeTretmana/{id_tretmana}', [TretmanController::class, 'delete']); 

    //pacijent prema id pacijenta 
    Route::get('/pacijent/{id_pacijenta}', [PacijentController::class, 'pacijent']); 
    Route::get('paci/{id}', [PacijentController::class, 'show']);
    Route::get('paci', [PacijentController::class, 'index']); 
    Route::resource('pacijent', PacijentController::class); 

    //logoped 
    Route::get('/logoped/{id_logopeda}', [LogopedController::class, 'logoped']); 

    //lista svih logopeda 
    Route::get('/listaLogopeda', [LogopedController::class, 'lista']);

    //lista paketa pacijenta
    Route::get('/paketiPacijentaRoditelj', [PaketiPacijentController::class, 'paketi']);  
    
    //lista paketa pacijenta
    Route::get('/paketiPacijentaLogoped/{id_pacijenta}', [PaketiPacijentController::class, 'paketi']);  

    //lista paketa zavrsenih
    Route::get('/paketiZavrseni/{id_pacijenta}', [PaketiPacijentController::class, 'paketiZavrseni']); 

    //paket trenutni
    Route::get('/paketTrenutni/{id_pacijenta}', [PaketiPacijentController::class, 'paketTrenutni']); 

    //kreiranje zahteva nov pacijent
    Route::post('/kreirajZahtev/{id_lk}/{id_lp}/{id_pac}/{id_rod}', [ZahtevController::class, 'create']); 
    
    //kreiranje zahteva obnova paketa
    Route::post('/kreirajZahtevObnova/{id_lp}/{id_pac}/{id_rod}/{zahtev}', [ZahtevController::class, 'create2']);

    //izvlacenje zahteva koji nije pregledan
    Route::get('/zahtevNepregledan/{id_rod}', [ZahtevController::class, 'zahtevAlert']); 

    //izmena zahteva da bude pregledan
    Route::put('/zahtevPregledan/{id_zahteva}', [ZahtevController::class, 'updateP']);  

    //log out logopeda
    Route::post('/logoutRoditelja', [RoditeljController::class, 'logout']);
}); 


 