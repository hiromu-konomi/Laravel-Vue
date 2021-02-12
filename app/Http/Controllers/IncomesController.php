<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IncomesController extends Controller
{
    public function index(int $userId){
        $query = DB::table('incomes');
        $query -> select('incomes.id', 'income_name', 'income_price', 'income_date', 'in_category_id', 'in_categories.in_category_name', 'in_categories.in_category_color');
        $query -> join('in_categories', 'incomes.in_category_id', '=', 'in_categories.id');
        $incomes = $query -> where('in_categories.user_id', $userId) -> get();
        return json_encode(['incomes' => $incomes]);
    }

    public function store(Request $request) {
        return Income::create($request->all());
    }

    public function destroy(Income $income) {
        $income->delete();
        return $income;
    }
}
