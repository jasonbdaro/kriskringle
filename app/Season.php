<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;
use Carbon\Carbon;

class Season extends Model
{
	protected $fillable = ['name', 'current', 'lock'];

	protected $dates = ['created_at', 'updated_at', 'deleted_at'];

	protected $casts = [
		'current' => 'boolean', 
		'lock' => 'boolean'
	];

	public function getCreatedAtAttribute($value)
	{
		return Carbon::parse($value)->format('m/d/Y');
	}

	public function getUpdatedAtAttribute($value)
	{
		return Carbon::parse($value)->format('m/d/Y');
	}

	public function rounds()
	{
		return $this->hasMany('App\Round');
	}

	public function isValid($data = array(''))
	{
		$validate = Validator::make($data, [
			'name' => 'sometimes|required|unique:seasons|min:2|max:50',
			'current' => 'sometimes|nullable|integer',
			'lock' => 'sometimes|nullable|integer',
		]);

		if ($validate->fails()) {
			return array($validate->errors());
		}
		return true;
	}
}