<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;

class IncomesController extends Controller
{
    public function store(Request $request) {
        return Income::create($request->all());
    }

    public function index(){
        return Income::all();
    }

    public function destroy(Income $income) {
        $income->delete();
        return $income;
    }
}
