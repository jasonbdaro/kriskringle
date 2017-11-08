<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wish extends Model
{
	protected $table = 'lists';

   protected $casts = [
		'user_parent_id' => 'integer',
		'round_id' => 'integer'
	];
}
