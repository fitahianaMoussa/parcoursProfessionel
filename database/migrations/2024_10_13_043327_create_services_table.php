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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->unsignedBigInteger('corps_id');
            $table->unsignedBigInteger('responsable_id')->nullable(); 
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('corps_id')->references('id')->on('corps')->onDelete('cascade');
            $table->foreign('responsable_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
