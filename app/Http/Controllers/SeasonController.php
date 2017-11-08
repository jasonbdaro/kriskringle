<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Season;

class SeasonController extends Controller
{
    //

	protected $_table;
	protected $_name;
	protected $_primary;
	protected $_columns;

	public function __construct(Season $season)
	{
		$this->_table = $season;
		$this->_name = $this->_table->getTable();
		$this->_primary = $season->getKeyName();
		$this->_columns = \Schema::getColumnListing($this->_name);
	}

	public function getData()
	{
		$seasons = $this->_table::orderBy('created_at', 'DESC')->get();
		return response()->json($seasons);
	}

	public function getRounds(Request $request)
	{
		$rounds = $this->_table::findOrFail($request->input($this->_primary))->rounds()
			->orderBy('created_at', 'DESC')->get();
		return response()->json($rounds);
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
			$this->_updateCurrent($params['current']);
		}

		try {
			$result = $this->_table::create($params);
			return response()->json(array(
				'data' => $this->getData(), 
				'target' => $result
			));
		} catch (\Exception $e) {
			return response()->json(array('error' => 
				array('messages' => 'Unable to add new data. ' . $e->getMessage()))
			);
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
			$this->_updateCurrent($params['current']);
		}

		try {
			$target = $this->_table::where($this->_primary, $params[$this->_primary]);
			$result = $target->update($params);
			return response()->json(array(
				'data' => $this->getData(), 
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

	protected function _updateCurrent($current = '')
	{
		if ($current === 1) {
			$this->_table::whereNull('current')
				->orWhere('current', 1)
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