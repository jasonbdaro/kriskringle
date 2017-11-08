<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;
use Carbon\Carbon;

class Round extends Model
{
	protected $fillable = ['name', 'description', 'season_id', 'current'];

	protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	protected $casts = [
		'current' => 'boolean',
		'season_id' => 'integer',
	];

	public function lists()
	{
		return $this->hasMany('App\Wish');
	}

	public function getCreatedAtAttribute($value)
	{
		return Carbon::parse($value)->format('m/d/Y');
	}

	public function getUpdatedAtAttribute($value)
	{
		return Carbon::parse($value)->format('m/d/Y');
	}

	public function isValid($data = array(''))
	{
		$validate = Validator::make($data, [
			'name' => 'sometimes|required|min:2|max:50',
			'description' => 'sometimes|required|min:5|max:300',
			'season_id' => 'sometimes|required|integer',
			'current' => 'sometimes|nullable|integer',
		]);

		if ($validate->fails()) {
			return array($validate->errors());
		}
		return true;
	}
}
