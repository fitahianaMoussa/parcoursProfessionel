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
        Schema::create('poste_budgetaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom_poste');
            $table->string('code_poste')->unique();
            $table->decimal('budget_alloue', 15, 2);
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poste_budgetaires');
    }
};
