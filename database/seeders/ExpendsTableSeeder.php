<?php

namespace Database\Seeders;

use App\Models\Expend;
use Illuminate\Database\Seeder;

class ExpendsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            Expend::create([
                'expend_name' => 'expend_name'.$i,
                'expend_price' => 'expend_price'.$i,
                'expend_date' => 'expend_date'.$i,
                'user_id' => 'user_id'.$i,
                'ex_category_id' => 'ex_category_id'.$i,
            ]);
        }
    }
}
