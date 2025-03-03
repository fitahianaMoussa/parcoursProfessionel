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
        Schema::create('echelons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('grade_id');
            $table->integer('numero');
            $table->integer('duree_minimale_avancement')->nullable(); // En années
            $table->timestamps();
            $table->foreign('grade_id')->references('id')->on('grades')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('echelons');
    }
};
