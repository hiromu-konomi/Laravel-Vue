<?php

namespace App\Http\Controllers;

use App\Models\ExCategory;
use Illuminate\Http\Request;

class ExCategoriesController extends Controller
{
    public function index() {
        return ExCategory::all();
    }

    public function store(Request $request) {
        return ExCategory::create($request->all());
    }

    public function destroy(ExCategory $exCategory) {
        $exCategory->delete();
        return $exCategory;
    }
}
