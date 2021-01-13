<?php

namespace Database\Seeders;

use App\Models\InCategory;
use Illuminate\Database\Seeder;

class InCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            InCategory::create([
                'in_category_name' => 'in_category_name'.$i,
                'in_category_color' => 'in_category_color'.$i,
                'user_id' => 'user_id'.$i,
            ]);
        }
    }
}
