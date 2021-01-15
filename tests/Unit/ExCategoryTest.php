<?php

namespace Tests\Unit;

use App\Models\ExCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Tests\CreatesApplication;

class ExCategoryTest extends TestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public function testBasicTest()
    {
        for($i = 0 ; $i < 10 ; $i ++) {
            ExCategory::factory()->create();
        }
        $count = ExCategory::get()->count();
        $exCategory = ExCategory::find(rand(1, $count));
        $data = $exCategory->toArray();
        print_r($data);

        $this->assertDatabaseHas('ex_categories', $data);

        $exCategory->delete();
        $this->assertDatabaseMissing('ex_categories', $data);
    }
}
