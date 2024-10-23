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
        Schema::create('corps', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->unsignedBigInteger('diplome_min_requis_id');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->foreign('diplome_min_requis_id')->references('id')->on('diplomes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('corps');
    }
};
