<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'in_category_name',
        'in_category_color',
        'user_id',
    ];

    public $timestamps = false;
}
