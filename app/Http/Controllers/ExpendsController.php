<?php

namespace App\Http\Controllers;

use App\Models\Expend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpendsController extends Controller
{
    public function index(int $userId) {
        $query = DB::table('expends');
        $query -> select('expends.id', 'expend_name', 'expend_price', 'expend_date', 'ex_category_id', 'ex_categories.ex_category_name', 'ex_categories.ex_category_color');
        $query -> join('ex_categories', 'expends.ex_category_id', '=', 'ex_categories.id');
        $expends = $query -> where('ex_categories.user_id', $userId) -> get();
        return json_encode(['expends' => $expends]);
    }

    public function store(Request $request) {
        return Expend::create($request->all());
    }

    public function destroy(Expend $expend) {
        $expend->delete();
        return $expend;
    }
}
