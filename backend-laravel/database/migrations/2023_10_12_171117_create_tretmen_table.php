<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tretmen', function (Blueprint $table) {
            $table->id();
            $table->dateTime('datum_tretmana');
            $table->string('vreme_tretmana');
            $table->string('naziv_tretmana')->default('Tretman'); 
            $table->integer('redni_broj_tretmana');
            $table->string('sadrzaj_tretmana')->default(' ');
            $table->foreignId('id_logopeda'); 
            $table->foreignId('id_pacijenta');
            $table->foreignId('id_paketa');
            $table->foreignId('id_paketa_pacijenta');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tretmen');
    }
};
