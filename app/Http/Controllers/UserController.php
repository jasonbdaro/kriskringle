<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use App\Season;
use DB;

class UserController extends Controller
{

	protected $_table;
	protected $_name;
	protected $_primary;
	protected $_columns;

	public function __construct(User $user)
	{
		$this->_table = $user;
		$this->_name = $this->_table->getTable();
		$this->_primary = $user->getKeyName();
		$this->_columns = \Schema::getColumnListing($this->_name);
	}

	public function getJoinedUsers(Request $request)
	{
		$users = $this->_getUsers($request->input('id'), '');
		return response()->json($users);
	}

	public function hasPicked(Request $request)
	{
		$id = $request->input('id');
		return $this->_getUsers($id, $id)->picked;
	}

	public function getSecret(Request $request)
	{
		$query = DB::table('view_lists')
			->where('user_parent_id', $request->input('id'))
			->where('current_season', 1)
			->where('current_round', 1)
			->select('child_name')
			->first();
			
		if (empty($query))
			return '';

		return $query->child_name;
	}

	protected function _getUsers($user_id, $user_id2)
	{
		$users = $this->_table::where('is_admin', '=', 0);

		if ($user_id2 !== '') {
			$users->where('users.id', $user_id2);
		} else {
			$users->where('users.id', '<>', $user_id);
		}

		$users->leftJoin('lists', 'users.id', '=', 'lists.user_parent_id')
			->leftJoin('rounds', 'rounds.id', '=', 'lists.round_id')
			->leftJoin('seasons', 'seasons.id', '=', 'rounds.season_id')
			->select(
				'users.id',
				'users.name',
				DB::raw(
					'IF(
						lists.user_parent_id IS NOT NULL 
						AND lists.user_child_id IS NOT NULL
						AND seasons.current
						AND rounds.current, 
						1, 0 
					) AS picked'
				)
			)
			->orderBy('users.created_at', 'DESC');

		if ($user_id2 !== '') {
			return $users->first();
		} else {
			return $users->get();
		}
	}

	public function create(Request $request)
	{
		// $params = $this->_filterParams($request->all());

		$season = Season::where('current', 1)->first(['lock']);

		if ($season->lock) {
			return response()->json(
				array('error' => array('messages' => 'Unable to register.'))
			)->setStatusCode(499, 'Registration Failure');
		}

		$valid = $this->_table->isValid($request->all());

		if ($valid !== true) {
			return response()->json($valid)
				->setStatusCode(500, 'Invalid Inputs');
		}

		$user = $this->_table::create([
			'name' => $request->input('name'),
			'username' => $request->input('username'),
			'password' => bcrypt($request->input('password')),
		]);
		return response()->json($user, 200);
	}

	public function login(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'username' => 'required|string',
			'password' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors())
				->setStatusCode(500, 'Invalid Inputs');
		} else {
			$user = User::where('username', $request->input('username'))->first();
			if ($user) {
				$checkPassword = \Hash::check($request->input('password'), $user->password);
				// $checkPassword = $user->password === $request->input('password');
				if ($checkPassword) {
					return response()->json($user, 200);
				} else {
					return response()->json(
						array('error' => array('messages' => 'Invalid username or password.'))
					)->setStatusCode(499, 'Invalid Login Credentials');
				}
			} else {
				return response()->json(
					array('error' => array('messages' => 'Invalid username or password.'))
				)->setStatusCode(499, 'Invalid Login Credentials');
			}
		}
	}	

	protected function _filterParams($params = array(''))
	{
		foreach ($params as $key => $value) {
			if (!in_array($key, $this->_columns)) {
				unset($params[$key]);
			}
		}
		return $params;
	}
}