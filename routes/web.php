<?php

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

use Illuminate\Http\Request;
use App\Season;

Route::get('/', function () {
    return view('index');
});

Route::get('users', 'UserController@getJoinedUsers');
Route::post('create-user', 'UserController@create');
Route::post('login', 'UserController@login');
Route::get('user-has-picked', 'UserController@hasPicked');
Route::get('user-get-secret', 'UserController@getSecret');

Route::get('seasons', 'SeasonController@getData');
Route::post('create-season', 'SeasonController@create');
Route::post('update-season', 'SeasonController@update');
Route::post('destroy-season', 'SeasonController@destroy');
Route::get('seasons-rounds', 'SeasonController@getRounds');

Route::get('rounds', 'RoundController@getData');
Route::get('rounds-current-season', 'RoundController@getDataByCurrentSeason');
Route::get('round-current', 'RoundController@getCurrentData');
Route::post('create-round', 'RoundController@create');
Route::post('update-round', 'RoundController@update');
Route::post('destroy-round', 'RoundController@destroy');

Route::get('home-load', 'HomeController@load');
Route::get('home-get', 'HomeController@get');
Route::post('pick', 'HomeController@pick');
Route::get('show', 'HomeController@show');
Route::post('post', 'HomeController@post');


Route::get('test', function() {
	$season = Season::where('current', 1)->first(['lock']);
	// var_dump($season->lock);
	return response()->json($season->lock);
});