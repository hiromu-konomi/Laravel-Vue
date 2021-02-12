<?php

namespace Tests\Unit;

use App\Models\Income;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Tests\CreatesApplication;

class IncomeTest extends TestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public function test_example()
    {
        for($i = 0 ; $i < 10 ; $i ++) {
            Income::factory()->create();
        }
        $count = Income::get()->count();
        $income = Income::find(rand(1, $count));
        $data = $income->toArray();
        print_r($data);

        $this->assertDatabaseHas('incomes', $data);

        $income->delete();
        $this->assertDatabaseMissing('incomes', $data);
    }
}
