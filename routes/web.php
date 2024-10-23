<?php

use App\Http\Controllers\AvancementController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\CorpController;
use App\Http\Controllers\DiplomeController;
use App\Http\Controllers\EchelonController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReclassementController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceRenduController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('categories', CategorieController::class);
    Route::resource('diplomes', DiplomeController::class);
    Route::resource('corps', CorpController::class);
    Route::resource('grades', GradeController::class);
    Route::resource('echelons', EchelonController::class);
    Route::resource('reclassements', ReclassementController::class);
    Route::resource('avancements', AvancementController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('contrats', ContratController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('serviceRendu',ServiceRenduController::class);
});

require __DIR__.'/auth.php';
