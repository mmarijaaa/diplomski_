<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Paket;

class PaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //svaki put ce iznova uneti podatke
        Paket::truncate();

        /*Paket::create([
            'naziv_paketa' => 'Paket1',
            'broj_tretmana' => 4,
            'cena_paketa' => '6.000,00 din'
        ]);

        Paket::create([
            'naziv_paketa' => 'Paket2',
            'broj_tretmana' => 8,
            'cena_paketa' => '12.000,00 din'
        ]);

        Paket::create([
            'naziv_paketa' => 'Paket3',
            'broj_tretmana' => 12,
            'cena_paketa' => '18.000,00 din'
        ]);*/

        $paket1 = new Paket;
        $paket1->naziv_paketa = 'Paket1';
        $paket1->broj_tretmana = 4;
        $paket1->cena_paketa = '6.000,00 din';
        $paket1->save(); 

    }
}
