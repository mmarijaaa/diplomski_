<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Paket;
use App\Models\User;
use App\Models\Roditelj;
use App\Models\Pacijent;
use App\Models\Tretman;
use App\Models\PaketiPacijent;

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
        $logoped1->broj_telefona = '060/1111-111';
        $logoped1->gmail_link = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new';
        $logoped1->save(); 

        $logoped2 = new User;
        $logoped2->ime = 'Ana';
        $logoped2->prezime = 'Pesić';
        $logoped2->korisnicko_ime = 'ana_pesic';
        $logoped2->email = 'ana.pesic@gmail.com';
        $logoped2->password = 'anapesic';
        $logoped2->broj_telefona = '060/2222-222';
        $logoped2->gmail_link = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new';
        $logoped2->save(); 

        $logoped3 = new User;
        $logoped3->ime = 'Milica';
        $logoped3->prezime = 'Jovanović';
        $logoped3->korisnicko_ime = 'milica_jovanovic';
        $logoped3->email = 'milica.jovanovic@gmail.com';
        $logoped3->password = 'milicajovanovic';
        $logoped3->broj_telefona = '060/3333-333';
        $logoped3->gmail_link = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new';
        $logoped3->save(); 

        //Roditelji
        $roditelj1 = new Roditelj;
        $roditelj1->ime = 'Mira';
        $roditelj1->prezime = 'Antić';
        $roditelj1->korisnicko_ime = 'miraantic';
        $roditelj1->email = 'mira@gmail.com';
        $roditelj1->password = 'miraantic123';
        $roditelj1->broj_telefona = '060/1111-222';
        $roditelj1->id_logopeda = 2;
        $roditelj1->save();

        $roditelj2 = new Roditelj;
        $roditelj2->ime = 'Sandra';
        $roditelj2->prezime = 'Novaković';
        $roditelj2->korisnicko_ime = 'sandranovakovic';
        $roditelj2->email = 'sandra@gmail.com';
        $roditelj2->password = 'sandranovakovic123'; 
        $roditelj2->broj_telefona = '060/1111-222';
        $roditelj2->id_logopeda = 2;
        $roditelj2->save();

        // $roditelj3 = new Roditelj;
        // $roditelj3->ime = 'Sanja';
        // $roditelj3->prezime = 'Petrović';
        // $roditelj3->korisnicko_ime = 'sanjapetrovic';
        // $roditelj3->email = 'sanja@gmail.com';
        // $roditelj3->password = 'sanjapetrovic123'; 
        // $roditelj3->broj_telefona = '060/1111-222';
        // $roditelj3->id_logopeda = 2;
        // $roditelj3->save();

        //Pacijenti
        $pacijent1 = new Pacijent;
        $pacijent1->ime = 'Nemanja';
        $pacijent1->prezime = 'Novaković';
        $pacijent1->uzrast = 8;
        $pacijent1->poremecaj = 'Disleksija'; 
        $pacijent1->id_roditelja = 2;
        $pacijent1->id_logopeda = 2;
        $pacijent1->id_paketa = 3;
        $pacijent1->save();

        $pacijent2 = new Pacijent;
        $pacijent2->ime = 'Aleksandra';
        $pacijent2->prezime = 'Novaković';
        $pacijent2->uzrast = 6;
        $pacijent2->poremecaj = 'Afazija'; 
        $pacijent2->id_roditelja = 2;
        $pacijent2->id_logopeda = 2;
        $pacijent2->id_paketa = 2;
        $pacijent2->save();

        $pacijent3 = new Pacijent;
        $pacijent3->ime = 'Jovana';
        $pacijent3->prezime = 'Antić';
        $pacijent3->uzrast = 3;
        $pacijent3->poremecaj = 'Artikulacija'; 
        $pacijent3->id_roditelja = 1;
        $pacijent3->id_logopeda = 2;
        $pacijent3->id_paketa = 4;
        $pacijent3->save();

        // $pacijent3 = new Pacijent;
        // $pacijent3->ime = 'Aleksa';
        // $pacijent3->prezime = 'Petrovic';
        // $pacijent3->uzrast = 7;
        // $pacijent3->poremecaj = 'Disgrafija'; 
        // $pacijent3->id_roditelja = 3;
        // $pacijent3->id_logopeda = 2;
        // $pacijent3->id_paketa = 3;
        // $pacijent3->save();

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

        //Paket pacijenta
        $pp = new PaketiPacijent;
        $pp->naziv_paketa = 'Paket 1 - 4 tretmana';
        $pp->datum_od = '2023-12-25'; 
        $pp->datum_do = '2024-01-25'; 
        $pp->id_pacijenta = 2; 
        $pp->id_logopeda = 2;
        $pp->zavrsen = 1;
        $pp->save();

        $pp1 = new PaketiPacijent;
        $pp1->naziv_paketa = 'Paket 2 - 8 tretmana';
        $pp1->datum_od = '2024-03-05'; 
        $pp1->datum_do = '2024-04-05'; 
        $pp1->id_pacijenta = 2; 
        $pp1->id_logopeda = 2;
        $pp1->zavrsen = 0;
        $pp1->save();
        
        $pp2 = new PaketiPacijent;
        $pp2->naziv_paketa = 'Paket 3 - 12 tretmana';
        $pp2->datum_od = '2024-03-10';
        $pp2->datum_do = '2024-04-10';
        $pp2->id_pacijenta = 1;
        $pp2->id_logopeda = 2;
        $pp2->zavrsen = 0;
        $pp2->save(); 

        $pp3 = new PaketiPacijent;
        $pp3->naziv_paketa = 'Paket 3 - 12 tretmana';
        $pp3->datum_od = '2024-01-08';
        $pp3->datum_do = '2024-02-08';
        $pp3->id_pacijenta = 3;
        $pp3->id_logopeda = 2;
        $pp3->zavrsen = 1;  
        $pp3->save(); 

        $pp4 = new PaketiPacijent;
        $pp4->naziv_paketa = 'Paket 4 - 18 tretmana';
        $pp4->datum_od = '2024-03-16';
        $pp4->datum_do = '2024-04-16';
        $pp4->id_pacijenta = 3;
        $pp4->id_logopeda = 2;  
        $pp4->zavrsen = 0;
        $pp4->save(); 

        $pp5 = new PaketiPacijent;
        $pp5->naziv_paketa = 'Paket 1 - 4 tretmana';
        $pp5->datum_od = '2023-11-20'; 
        $pp5->datum_do = '2024-12-20'; 
        $pp5->id_pacijenta = 2; 
        $pp5->id_logopeda = 2;
        $pp5->zavrsen = 1;
        $pp5->save();

        //Tretmani

        //paket pacijenta 2 pacijent 2
        $terapija1 = new Tretman;
        $terapija1->datum_tretmana = '2024-03-06';
        $terapija1->vreme_tretmana = '14h';
        $terapija1->sadrzaj_tretmana = 'kratak opis prvog tretmana';
        $terapija1->id_logopeda = 2;
        $terapija1->id_pacijenta = 2;
        $terapija1->id_paketa = 2;
        $terapija1->id_paketa_pacijenta = 2;
        $terapija1->save(); 
 
        $terapija2 = new Tretman;
        $terapija2->datum_tretmana = '2024-03-07';
        $terapija2->vreme_tretmana = '15h';
        $terapija2->sadrzaj_tretmana = 'radjeno je to i to';
        $terapija2->id_logopeda = 2;
        $terapija2->id_pacijenta = 2;
        $terapija2->id_paketa = 2;
        $terapija2->id_paketa_pacijenta = 2;
        $terapija2->save(); 

        $terapija3 = new Tretman;
        $terapija3->datum_tretmana = '2024-03-16';
        $terapija3->vreme_tretmana = '14h';
        $terapija3->id_logopeda = 2;
        $terapija3->id_pacijenta = 2;
        $terapija3->id_paketa = 2;
        $terapija3->id_paketa_pacijenta = 2;
        $terapija3->save(); 


        //paket pacijenta 3 pacijent 1
        $terapija4 = new Tretman;
        $terapija4->datum_tretmana = '2024-03-12';
        $terapija4->vreme_tretmana = '17h';
        $terapija4->sadrzaj_tretmana = 'sledeci put treba da se uradi to i to';
        $terapija4->id_logopeda = 2;
        $terapija4->id_pacijenta = 1;
        $terapija4->id_paketa = 3;
        $terapija4->id_paketa_pacijenta = 3;
        $terapija4->save(); 

        $terapija5 = new Tretman;
        $terapija5->datum_tretmana = '2024-03-15';
        $terapija5->vreme_tretmana = '18h';
        $terapija5->id_logopeda = 2;
        $terapija5->id_pacijenta = 1;
        $terapija5->id_paketa = 3;
        $terapija5->id_paketa_pacijenta = 3;
        $terapija5->save(); 


        //paket pacijenta 6 pacijent 2
        $terapija6 = new Tretman;
        $terapija6->datum_tretmana = '2023-11-25';
        $terapija6->vreme_tretmana = '14h';
        $terapija6->sadrzaj_tretmana = 'kratak opis prvog tretmana';
        $terapija6->id_logopeda = 2;
        $terapija6->id_pacijenta = 2;
        $terapija6->id_paketa = 1;
        $terapija6->id_paketa_pacijenta = 6;
        $terapija6->save(); 
 
        $terapija7 = new Tretman;
        $terapija7->datum_tretmana = '2023-11-30';
        $terapija7->vreme_tretmana = '15h';
        $terapija7->sadrzaj_tretmana = 'radjeno je to i to';
        $terapija7->id_logopeda = 2;
        $terapija7->id_pacijenta = 2;
        $terapija7->id_paketa = 1;
        $terapija7->id_paketa_pacijenta = 6;
        $terapija7->save(); 

        $terapija8 = new Tretman;
        $terapija8->datum_tretmana = '2023-12-10';
        $terapija8->vreme_tretmana = '14h';
        $terapija8->id_logopeda = 2;
        $terapija8->id_pacijenta = 2;
        $terapija8->id_paketa = 1;
        $terapija8->id_paketa_pacijenta = 6;
        $terapija8->save(); 

        $terapija9 = new Tretman;
        $terapija9->datum_tretmana = '2023-12-18';
        $terapija9->vreme_tretmana = '14h';
        $terapija9->id_logopeda = 2;
        $terapija9->id_pacijenta = 2;
        $terapija9->id_paketa = 1;
        $terapija9->id_paketa_pacijenta = 6;
        $terapija9->save(); 


        //paket pacijenta 1 pacijent 2
        $terapija10 = new Tretman;
        $terapija10->datum_tretmana = '2023-12-28';
        $terapija10->vreme_tretmana = '14h';
        $terapija10->sadrzaj_tretmana = 'kratak opis prvog tretmana';
        $terapija10->id_logopeda = 2;
        $terapija10->id_pacijenta = 2;
        $terapija10->id_paketa = 1;
        $terapija10->id_paketa_pacijenta = 1;
        $terapija10->save(); 
 
        $terapija11 = new Tretman;
        $terapija11->datum_tretmana = '2024-01-05';
        $terapija11->vreme_tretmana = '15h';
        $terapija11->sadrzaj_tretmana = 'radjeno je to i to';
        $terapija11->id_logopeda = 2;
        $terapija11->id_pacijenta = 2;
        $terapija11->id_paketa = 1;
        $terapija11->id_paketa_pacijenta = 1;
        $terapija11->save();

        $terapija12 = new Tretman;
        $terapija12->datum_tretmana = '2024-01-10';
        $terapija12->vreme_tretmana = '14h';
        $terapija12->sadrzaj_tretmana = 'domaci zadatak za sledeci tretman';
        $terapija12->id_logopeda = 2;
        $terapija12->id_pacijenta = 2;
        $terapija12->id_paketa = 1;
        $terapija12->id_paketa_pacijenta = 1;
        $terapija12->save(); 
 
        $terapija13 = new Tretman;
        $terapija13->datum_tretmana = '2024-01-17';
        $terapija13->vreme_tretmana = '15h';
        $terapija13->sadrzaj_tretmana = 'radjena je artikulacija';
        $terapija13->id_logopeda = 2;
        $terapija13->id_pacijenta = 2;
        $terapija13->id_paketa = 1;
        $terapija13->id_paketa_pacijenta = 1;
        $terapija13->save();

        
        //paket pacijenta 5 pacijent 3
        $terapija14 = new Tretman;
        $terapija14->datum_tretmana = '2023-12-28';
        $terapija14->vreme_tretmana = '19h';
        $terapija14->sadrzaj_tretmana = 'kratak opis prvog tretmana, atrikulacija';
        $terapija14->id_logopeda = 2;
        $terapija14->id_pacijenta = 3;
        $terapija14->id_paketa = 4;
        $terapija14->id_paketa_pacijenta = 4;
        $terapija14->save(); 
 
        $terapija15 = new Tretman;
        $terapija15->datum_tretmana = '2024-01-05';
        $terapija15->vreme_tretmana = '20h';
        $terapija15->sadrzaj_tretmana = 'domaci za sledeci tretman';
        $terapija15->id_logopeda = 2;
        $terapija15->id_pacijenta = 3;
        $terapija15->id_paketa = 4;
        $terapija15->id_paketa_pacijenta = 4;
        $terapija15->save();

    }
}
