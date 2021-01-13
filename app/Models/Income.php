<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;

    protected $fillable = [
        'income_name',
        'income_price',
        'income_date',
        'user_id',
        'in_category_id',
    ];

    public $timestamps = false;
}
