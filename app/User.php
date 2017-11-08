<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Validator;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        // 'password',
    ];

    protected $casts = ['is_admin' => 'boolean'];

    public function isValid($data = array(''))
    {
        $validate = Validator::make($data, [
            'name' => 'sometimes|required|unique:users|min:4|max:50',
            'username' => 'sometimes|required|unique:users|min:4|max:25',
            'password' => 'sometimes|required|min:4|max:25|confirmed',
            'password_confirmation' => 'sometimes|required|same:password'
        ]);

        if ($validate->fails()) {
            return $validate->errors();
        }
        return true;
    }

    public function lists()
    {
      return $this->hasMany('App\List', 'user_parent_id');
    }
}
