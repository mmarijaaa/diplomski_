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
        Schema::create('pacijents', function (Blueprint $table) {
            $table->id(); 
            $table->string('ime');
            $table->string('prezime');
            $table->integer('uzrast');
            $table->string('poremecaj');
            $table->foreignId('id_roditelja')->default(100);
            $table->foreignId('id_logopeda')->default(100);
            $table->foreignId('id_paketa')->default(100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacijents');
    }
};
