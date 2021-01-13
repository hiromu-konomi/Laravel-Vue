<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expend extends Model
{
    use HasFactory;

    protected $fillable = [
        'expend_name',
        'expend_price',
        'expend_date',
        'user_id',
        'ex_category_id',
    ];

    public $timestamps = false;
}
