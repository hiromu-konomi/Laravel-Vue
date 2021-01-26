<?php

namespace App\Http\Controllers;

use App\Models\Expend;
use Illuminate\Http\Request;

class ExpendsController extends Controller
{
    public function index() {
        return Expend::all();
    }

    public function store(Request $request) {
        return Expend::create($request->all());
    }

    public function destroy(Expend $expend) {
        $expend->delete();
        return $expend;
    }
}
