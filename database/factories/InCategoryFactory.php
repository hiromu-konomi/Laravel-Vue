<?php

namespace Database\Factories;

use App\Models\InCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InCategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InCategory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'in_category_name' => $this->faker->text(45),
            'in_category_color' => $this->faker->colorName,
            'user_id' => User::factory(),
        ];
    }
}
