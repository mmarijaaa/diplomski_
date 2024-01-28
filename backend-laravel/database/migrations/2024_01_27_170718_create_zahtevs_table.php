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
        Schema::create('zahtevs', function (Blueprint $table) {
            $table->id();
            $table->string('tip_zahteva');
            $table->integer('odobren');
            $table->integer('pregledan');
            $table->foreignId('id_logopeda'); 
            $table->foreignId('id_pacijenta'); 
            $table->foreignId('id_roditelja'); 
            $table->string('info_zahteva');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zahtevs');
    }
};
