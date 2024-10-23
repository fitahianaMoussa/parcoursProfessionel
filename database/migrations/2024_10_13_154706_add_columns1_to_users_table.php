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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'corps_id')) {
                $table->unsignedBigInteger('corps_id')->nullable(); // Ajout de la colonne corps_id
                $table->foreign('corps_id')->references('id')->on('corps')->onDelete('set null');
            }
        
            if (!Schema::hasColumn('users', 'categorie_id')) {
                $table->unsignedBigInteger('categorie_id')->nullable(); // Ajout de la colonne categorie_id
                $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('set null');
            }
        
            if (!Schema::hasColumn('users', 'grade_actuel_id')) {
                $table->unsignedBigInteger('grade_actuel_id')->nullable(); // Ajout de la colonne grade_actuel_id
                $table->foreign('grade_actuel_id')->references('id')->on('grades')->onDelete('set null');
            }
        
            if (!Schema::hasColumn('users', 'echelon_actuel_id')) {
                $table->unsignedBigInteger('echelon_actuel_id')->nullable(); // Ajout de la colonne echelon_actuel_id
                $table->foreign('echelon_actuel_id')->references('id')->on('echelons')->onDelete('set null');
            }
        
            if (!Schema::hasColumn('users', 'service_id')) {
                $table->unsignedBigInteger('service_id')->nullable(); // Ajout de la colonne service_id
                $table->foreign('service_id')->references('id')->on('services')->onDelete('set null');
            }
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropForeign(['corps_id']);
            $table->dropForeign(['categorie_id']);
            $table->dropForeign(['grade_actuel_id']);
            $table->dropForeign(['echelon_actuel_id']);
            $table->dropForeign(['service_id']);
            $table->dropColumn(['corps_id', 'categorie_id', 'grade_actuel_id', 'echelon_actuel_id', 'service_id']);
        });
    }
};
