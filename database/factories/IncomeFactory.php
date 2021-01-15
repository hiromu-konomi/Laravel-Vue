<?php

namespace Database\Factories;

use App\Models\InCategory;
use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class IncomeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Income::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'income_name' => $this->faker->text(45),
            'income_price' => $this->faker->randomNumber(),
            'income_date' => $this->faker->date(),
            'user_id' => User::factory(),
            'in_category_id' => InCategory::factory(),
        ];
    }
}
