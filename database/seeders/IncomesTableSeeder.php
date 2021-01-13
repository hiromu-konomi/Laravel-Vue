<?php

namespace Database\Seeders;

use App\Models\Income;
use Illuminate\Database\Seeder;

class IncomesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            Income::create([
                'income_name' => 'income_name'.$i,
                'income_price' => 'income_price'.$i,
                'income_date' => 'income_date'.$i,
                'user_id' => 'user_id'.$i,
                'in_category_id' => 'in_category_id'.$i,
            ]);
        }
    }
}
