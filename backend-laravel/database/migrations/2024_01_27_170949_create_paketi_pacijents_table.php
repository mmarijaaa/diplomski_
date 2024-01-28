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
        Schema::create('paketi_pacijents', function (Blueprint $table) {
            $table->id();
            $table->string('naziv_paketa');
            $table->integer('broj_tretmana');
            $table->dateTime('datum_od');
            $table->dateTime('datum_do');
            $table->foreignId('id_pacijenta');  
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paketi_pacijents');
    }
};
