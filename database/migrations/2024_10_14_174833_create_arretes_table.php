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
        Schema::create('arretes', function (Blueprint $table) {
            $table->id();
            $table->string('type'); 
            $table->string('num_arrete');
            $table->date('date_arrete');
            $table->string('type_avancement')->nullable(); 
            $table->string('type_reclassement')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arretes');
    }
};
