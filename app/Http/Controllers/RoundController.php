<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Round;
use App\Season;

class RoundController extends Controller
{
    //

	protected $_table;
	protected $_name;
	protected $_primary;
	protected $_columns;

	public function __construct(Round $round, Season $season)
	{
		$this->_table = $round;
		$this->_parent_table = $season;
		$this->_name = $this->_table->getTable();
		$this->_primary = $round->getKeyName();
		$this->_columns = \Schema::getColumnListing($this->_name);
	}

	public function getData()
	{
		$rounds = $this->_table::orderBy('created_at', 'DESC')->get();
		return response()->json($rounds);
	}

	public function getDataByCurrentSeason()
	{
		$rounds = $this->_parent_table::where('current', 1)->first()
			->rounds()->orderBy('created_at')->get();
		return response()->json($rounds);
	}

	public function getCurrentData()
	{
		$round = $this->_parent_table::where('current', 1)->first()
			->rounds()->where('current', 1)->first();
		return response()->json($round);
	}

	public function create(Request $request)
	{
		$params = $this->_filterParams($request->all());

		$valid = $this->_table->isValid($params);

		if (is_array($valid)) {
			return response()->json($valid)
				->setStatusCode(500, 'Invalid Inputs');
		}

		if (isset($params['current'])) {
			$this->_updateCurrent($params['current'], $params['season_id']);
		}

		try {
			$result = $this->_table::create($params);
			return response()->json(array(
				'data' => response()->json(
					$this->_parent_table::findOrFail($params['season_id'])->rounds()
						->orderBy('created_at', 'DESC')->get()
				),
				'target' => $result
			));
		} catch (\Exception $e) {
			if ($e->getCode() == 23000) {
				return response()->json(array(0 => 
					array('messages' => array('The name has already been taken.')))
				)->setStatusCode(500, 'Invalid Inputs');
			} else {				
				return response()->json(array(0 => 
					array('messages' => array('Unable to add new data. ' . $e->getMessage())))
				)->setStatusCode(500, 'Invalid Inputs');
			}
		}
	}

	public function update(Request $request)
	{
		$params = $this->_filterParams($request->all());

		$valid = $this->_table->isValid($params);

		if (is_array($valid)) {
			return response()->json($valid)
				->setStatusCode(500, 'Invalid Inputs');
		}

		if (isset($params['current'])) {
			$this->_updateCurrent($params['current'], $params['season_id']);
		}

		try {
			$target = $this->_table::where($this->_primary, $params[$this->_primary]);
			$result = $target->update($params);
			return response()->json(array(
				'data' => response()->json(
					$this->_parent_table::findOrFail($params['season_id'])->rounds()
						->orderBy('created_at', 'DESC')->get()
				),
				'target' => $target->first()
			));
		} catch (\Exception $e) {
			return response()->json(array('error' => 
				array('messages' => 'Unable to add new data. ' . $e->getMessage()))
			);
		}
	}

	public function destroy(Request $request)
	{
		$data = $this->_table::find($request->input($this->_primary));
		$result = $data->delete();

		return response()->json($result);
	}

	protected function _updateCurrent($current = '', $season_id)
	{
		if ($current === 1) {
			$this->_table::whereNull('current')
				->orWhere('current', 1)
				->where('season_id', $season_id)
				->update(['current' => 0]);
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