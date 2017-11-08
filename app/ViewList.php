<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ViewList extends Model
{
	protected $table = 'view_lists';
	// protected $casts = [
	//  	'has_pick' => 'boolean',
	//  	'current_season' => 'boolean',
	//  	'current_round' => 'boolean',
	//    'user_id' => 'integer',
	//    'season_id' => 'integer',
	//    'round_id' => 'integer',
 //   ];

   // public function getUpdatedAttribute($value)
   // {
   // 	return Carbon::parse($value)->diffForHumans();
   // }
}
