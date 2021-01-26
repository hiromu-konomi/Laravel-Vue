<?php

namespace App\Http\Controllers;

use App\Models\InCategory;
use Illuminate\Http\Request;

class InCategoriesController extends Controller
{
    public function index() {
        return InCategory::all();
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
