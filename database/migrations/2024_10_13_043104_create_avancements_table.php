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
        Schema::create('avancements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employe_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ancien_grade_id')->constrained('grades')->onDelete('cascade');
            $table->foreignId('nouveau_grade_id')->constrained('grades')->onDelete('cascade');
            $table->foreignId('ancien_echelon_id')->constrained('echelons')->onDelete('cascade');
            $table->foreignId('nouvel_echelon_id')->constrained('echelons')->onDelete('cascade');
            $table->date('date_avancement');
            $table->string('motif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avancements');
    }
};
