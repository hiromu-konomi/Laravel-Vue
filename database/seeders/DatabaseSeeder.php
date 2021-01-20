<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
        $this->call(ExpendsTableSeeder::class);
        $this->call(IncomesTableSeeder::class);
        $this->call(ExCategoriesTableSeeder::class);
        $this->call(InCategoriesTableSeeder::class);
    }
}
