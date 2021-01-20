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
            Expend::factory()->create();
        }
    }
}
