<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Paket;
use App\Models\User;
use App\Models\Roditelj;
use App\Models\Pacijent;
use App\Models\Tretman;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        //User::truncate(); 
        Roditelj::truncate(); 
        Paket::truncate(); 

        //Logopedi
        $logoped1 = new User;
        $logoped1->ime = 'Andrea';
        $logoped1->prezime = 'Kovacev';
        $logoped1->korisnicko_ime = 'andrea_kovacev';
        $logoped1->email = 'andrea.kovacev@gmail.com';
        $logoped1->password = 'andreakovacev';
        $logoped1->sifra_logopeda = '11111';
        $logoped1->save(); 

        $logoped2 = new User;
        $logoped2->ime = 'Ana';
        $logoped2->prezime = 'Pesic';
        $logoped2->korisnicko_ime = 'ana_pesic';
        $logoped2->email = 'ana.pesic@gmail.com';
        $logoped2->password = 'anapesic';
        $logoped2->sifra_logopeda = '22222';
        $logoped2->save(); 

        $logoped3 = new User;
        $logoped3->ime = 'Milica';
        $logoped3->prezime = 'Jovanovic';
        $logoped3->korisnicko_ime = 'milica_jovanovic';
        $logoped3->email = 'milica.jovanovic@gmail.com';
        $logoped3->password = 'milicajovanovic';
        $logoped3->sifra_logopeda = '33333';
        $logoped3->save(); 

        //Roditelji
        $roditelj1 = new Roditelj;
        $roditelj1->ime = 'Mira';
        $roditelj1->prezime = 'Miric';
        $roditelj1->korisnicko_ime = 'mira';
        $roditelj1->email = 'mira@gmail.com';
        $roditelj1->password = 'mira123';
        $roditelj1->broj_telefona = '060/1111-222';
        $roditelj1->id_logopeda = 1;
        $roditelj1->save();

        $roditelj2 = new Roditelj;
        $roditelj2->ime = 'Sandra';
        $roditelj2->prezime = 'Sandric';
        $roditelj2->korisnicko_ime = 'sandra';
        $roditelj2->email = 'sandra@gmail.com';
        $roditelj2->password = 'sandra123'; 
        $roditelj2->broj_telefona = '060/1111-222';
        $roditelj2->id_logopeda = 2;
        $roditelj2->save();

        //Pacijenti
        $pacijent1 = new Pacijent;
        $pacijent1->ime = 'Nemanja';
        $pacijent1->prezime = 'Sandric';
        $pacijent1->uzrast = 8;
        $pacijent1->poremecaj = 'Disleksija'; 
        $pacijent1->id_roditelja = 2;
        $pacijent1->id_logopeda = 2;
        $pacijent1->id_paketa = 3;
        $pacijent1->save();

        $pacijent2 = new Pacijent;
        $pacijent2->ime = 'Aleksandra';
        $pacijent2->prezime = 'Sandric';
        $pacijent2->uzrast = 6;
        $pacijent2->poremecaj = 'Afazija'; 
        $pacijent2->id_roditelja = 2;
        $pacijent2->id_logopeda = 2;
        $pacijent2->id_paketa = 2;
        $pacijent2->save();

        $pacijent3 = new Pacijent;
        $pacijent3->ime = 'Jovana';
        $pacijent3->prezime = 'Miric';
        $pacijent3->uzrast = 3;
        $pacijent3->poremecaj = 'Artikulacija'; 
        $pacijent3->id_roditelja = 1;
        $pacijent3->id_logopeda = 1;
        $pacijent3->id_paketa = 4;
        $pacijent3->save();

        //Paketi
        $paket1 = new Paket;
        $paket1->naziv_paketa = 'Paket1';
        $paket1->broj_tretmana = 4;
        $paket1->cena_paketa = '6.000,00 din';
        $paket1->save(); 

        $paket2 = new Paket;
        $paket2->naziv_paketa = 'Paket2';
        $paket2->broj_tretmana = 8;
        $paket2->cena_paketa = '12.000,00 din';
        $paket2->save(); 

        $paket3 = new Paket;
        $paket3->naziv_paketa = 'Paket3';
        $paket3->broj_tretmana = 12;
        $paket3->cena_paketa = '18.000,00 din';
        $paket3->save(); 

        $paket4 = new Paket;
        $paket4->naziv_paketa = 'Paket4';
        $paket4->broj_tretmana = 18;
        $paket4->cena_paketa = '27.000,00 din';
        $paket4->save(); 

        $paket5 = new Paket;
        $paket5->naziv_paketa = 'Paket5';
        $paket5->broj_tretmana = 24;
        $paket5->cena_paketa = '36.000,00 din';
        $paket5->save(); 

        //Tretmani
        $terapija1 = new Tretman;
        $terapija1->datum_tretmana = '2023-10-22';
        $terapija1->vreme_tretmana = '14h';
        $terapija1->redni_broj_tretmana = 1;
        $terapija1->sadrzaj_tretmana = 'kratak opis prvog tretmana';
        $terapija1->id_logopeda = 2;
        $terapija1->id_pacijenta = 1;
        $terapija1->id_paketa = 3;
        $terapija1->save(); 
 
        $terapija2 = new Tretman;
        $terapija2->datum_tretmana = '2023-10-25';
        $terapija2->vreme_tretmana = '15h';
        $terapija2->redni_broj_tretmana = 2;
        $terapija2->sadrzaj_tretmana = 'radjeno je to i to';
        $terapija2->id_logopeda = 2;
        $terapija2->id_pacijenta = 1;
        $terapija2->id_paketa = 3;
        $terapija2->save(); 

        $terapija3 = new Tretman;
        $terapija3->datum_tretmana = '2023-11-03';
        $terapija3->vreme_tretmana = '14h';
        $terapija3->redni_broj_tretmana = 3;
        $terapija3->id_logopeda = 2;
        $terapija3->id_pacijenta = 1;
        $terapija3->id_paketa = 3;
        $terapija3->save(); 

        $terapija4 = new Tretman;
        $terapija4->datum_tretmana = '2023-10-27';
        $terapija4->vreme_tretmana = '17h';
        $terapija4->redni_broj_tretmana = 1;
        $terapija4->sadrzaj_tretmana = 'sledeci put treba da se uradi to i to';
        $terapija4->id_logopeda = 2;
        $terapija4->id_pacijenta = 2;
        $terapija4->id_paketa = 2;
        $terapija4->save(); 

        $terapija5 = new Tretman;
        $terapija5->datum_tretmana = '2023-11-05';
        $terapija5->vreme_tretmana = '18h';
        $terapija5->redni_broj_tretmana = 2;
        $terapija5->id_logopeda = 2;
        $terapija5->id_pacijenta = 2;
        $terapija5->id_paketa = 2;
        $terapija5->save(); 

    }
}
