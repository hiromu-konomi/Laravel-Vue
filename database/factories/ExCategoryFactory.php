<?php

namespace Database\Factories;

use App\Models\ExCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExCategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ExCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'ex_category_name' => $this->faker->text(45),
            'ex_category_color' => $this->faker->colorName,
            'user_id' => User::factory(),
        ];
    }
}
