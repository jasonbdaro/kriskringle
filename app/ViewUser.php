<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ViewUser extends Model
{
    protected $table = 'view_users';
    protected $casts = [
    	'has_pick' => 'boolean',
    	'current_season' => 'boolean',
    	'current_round' => 'boolean',
        'user_id' => 'integer',
        'season_id' => 'integer',
        'round_id' => 'integer',
    ];
    protected $appends = ['updated_ago'];

    public function getUpdatedAgoAttribute()
    {
        return Carbon::parse($this->attributes['updated'])
            ->diffForHumans();
    }

}
