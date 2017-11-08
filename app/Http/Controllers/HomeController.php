<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ViewUser;
use App\ViewList;
use App\Season;
use App\Round;
use App\User;
use App\Wish;
use DB;

class HomeController extends Controller
{
	protected $_table;

	public function __construct(ViewUser $view_user)
	{
		$this->_table = $view_user;
		$this->_season = new Season();
		$this->_round = new Round();
		$this->_lists = new ViewList();
		$this->_users = new User();
		$this->_wish = new Wish();
	}

	public function load(Request $request)
	{
		$id = $request->input('id');
		$current_season_id = 0;
		$current_round_id = 0;

		$view_users = $this->_table::where('current_season', 1)
			->where('current_round', 1)
			->orderBy('season_id')
			->get();

		$seasons = $this->_season::all();
		$rounds = $this->_round::all();

		if ($view_users) {
			$current_season_id = (int)$view_users[0]['season_id'];
			$current_round_id = (int)$view_users[0]['round_id'];
		}

		$_key = $this->_users::where('id', $id)->firstOrFail(['pick_key']);

		$arr = array(
			'view_users' => $view_users,
			'current_season_id' => $current_season_id,
			'current_round_id' => $current_round_id,
			'seasons' => $seasons,
			'rounds' => $rounds,
			'_key' => $_key->pick_key
		);

		return response()->json($arr);
	}

	public function get(Request $request)
	{
		$season = $request->input('season');
		$round = $request->input('round');
		$view_users = $this->_table::where('season_id', $season)
			->where('round_id', $round)
			->get();

		// $arr = array(
		// 	'view_users' => $view_users,
		// 	'current_season_id' => $season,
		// 	'current_round_id' => $round
		// );

		return response()->json($view_users);
	}

	public function pick(Request $request)
	{
		$id = $request->input('id');

		try {
			$sp = DB::select('CALL sp_pick(?);', array($id));
			$status = (int)$sp[0]->status;

			if ($status) {
				$view_users = $this->_table::where('current_season', 1)
					->where('current_round', 1)
					->orderBy('season_id')
					->get();

				$_key = $this->_users::where('id', $id)->firstOrFail(['pick_key']);

				return response()->json(array(
					'_data' => $view_users,
					'_key' => $_key->pick_key
				))->setStatusCode(200);
			} else {
				return response()->json($status)->setStatusCode(500);
			}
			
		} catch (\Exception $e) {
			return response()->json(array('error' => 
				array('messages' => 'Error. ' . $e->getMessage())))
			->setStatusCode(500);
		}
	}

	public function show(Request $request)
	{
		$key = $request->input('_key');
		$id = $this->_users::where('pick_key', $key)->firstOrFail(['id']);

		$current_season_id = 0;
		$current_round_id = 0;

		$view_users = $this->_table::where('current_season', 1)
			->where('current_round', 1)
			->orderBy('season_id')
			->get();

		$seasons = $this->_season::all();
		$rounds = $this->_round::all();

		if ($view_users) {
			$current_season_id = (int)$view_users[0]['season_id'];
			$current_round_id = (int)$view_users[0]['round_id'];
		}

		$result = $this->_lists::where('user_parent_id', $id->id)
			->where('season_id', $current_season_id)
			->where('round_id', $current_round_id)
			->select(DB::raw(
				'(SELECT name FROM users 
				WHERE id = decrypt_data(user_child_id)
				AND is_admin = 0) AS user_child_id'))
			->get();

		return response()->json($result[0]->user_child_id);
	}

	public function post(Request $request)
	{
		$id = $request->input('id');
		$text = $request->input('text');

		try {
			$current_round_id = $this->_season::where('current', 1)->firstOrFail()
				->rounds()->where('current', 1)->firstOrFail(['id']);

			$wish = $this->_wish::where('user_parent_id', $id)
				->where('round_id', $current_round_id->id)
				->update(['name' => $text]);

			$view_users = $this->_table::where('current_season', 1)
				->where('current_round', 1)
				->orderBy('season_id')
				->get();

			return response()->json($view_users)->setStatusCode(200);

		} catch (\Exception $e) {
			return response()->json(array('error' => 
				array('messages' => 'Error. ' . $e->getMessage())))
			->setStatusCode(500);
		}
	}
}
