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
            $table->dateTime('datum_od')->nullable();
            $table->dateTime('datum_do')->nullable();
            $table->foreignId('id_pacijenta');  
            $table->foreignId('id_logopeda'); 
            $table->integer('zavrsen')->default(0);
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
