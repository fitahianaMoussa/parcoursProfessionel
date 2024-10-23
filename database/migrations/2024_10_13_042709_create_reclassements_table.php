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
        Schema::create('reclassements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employe_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ancienne_categorie_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('nouvelle_categorie_id')->constrained('categories')->onDelete('cascade');
            $table->date('date_reclassement');
            $table->string('motif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reclassements');
    }
};
