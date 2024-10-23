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
        Schema::create('contrats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employe_id');
            $table->string('type'); // EFA, Stagiaire, Titulaire, etc.
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->unsignedBigInteger('nouveau_service_id')->nullable(); // S'il y a un changement de service.
            $table->timestamps();
            $table->foreign('employe_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('nouveau_service_id')->references('id')->on('services')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contrats');
    }
};
