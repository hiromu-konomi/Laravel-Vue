<?php

namespace App\Http\Controllers;

use App\Models\ExCategory;
use Illuminate\Http\Request;

class ExCategoriesController extends Controller
{
    public function index(int $userId) {
        $query = ExCategory::query();
        $exCategories = $query -> where('user_id', $userId) -> get();
        return json_encode(['exCategories' => $exCategories]);
    }

    public function store(Request $request) {
        return ExCategory::create($request->all());
    }

    public function show(ExCategory $exCategory) {
        return $exCategory;
    }

    public function destroy(ExCategory $exCategory) {
        $exCategory->delete();
        return $exCategory;
    }
}
