<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'ex_category_name',
        'ex_category_color',
        'user_id',
    ];

    public $timestamps = false;
}
