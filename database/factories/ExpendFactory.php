<?php

namespace Database\Factories;

use App\Models\ExCategory;
use App\Models\Expend;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpendFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Expend::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'expend_name' => $this->faker->text(45),
            'expend_price' => $this->faker->randomNumber(),
            'expend_date' => $this->faker->date(),
            'user_id' => User::factory(),
            'ex_category_id' => ExCategory::factory(),
        ];
    }
}
