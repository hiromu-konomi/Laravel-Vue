<?php

namespace Database\Seeders;

use App\Models\ExCategory;
use Illuminate\Database\Seeder;

class ExCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            ExCategory::create([
                'ex_category_name' => 'ex_category_name'.$i,
                'ex_category_color' => 'ex_category_color'.$i,
                'user_id' => 'user_id'.$i,
            ]);
        }
    }
}
