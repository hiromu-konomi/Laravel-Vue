<?php

namespace App\Http\Controllers;

use App\Models\InCategory;
use Illuminate\Http\Request;

class InCategoriesController extends Controller
{
    public function index(int $userId) {
        $query = InCategory::query();
        $inCategories = $query -> where('user_id', $userId) -> get();
        return json_encode(['inCategories' => $inCategories]);
    }

    public function store(Request $request) {
        return InCategory::create($request->all());
    }

    public function show(InCategory $inCategory) {
        return $inCategory;
    }

    public function destroy(InCategory $inCategory) {
        $inCategory->delete();
        return $inCategory;
    }
}
