<?php

namespace Tests\Unit;

use App\Models\InCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Tests\CreatesApplication;

class InCategoryTest extends TestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public function testBasicTest()
    {
        for($i = 0 ; $i < 10 ; $i ++) {
            InCategory::factory()->create();
        }
        $count = InCategory::get()->count();
        $inCategory = InCategory::find(rand(1, $count));
        $data = $inCategory->toArray();
        print_r($data);

        $this->assertDatabaseHas('in_categories', $data);

        $inCategory->delete();
        $this->assertDatabaseMissing('in_categories', $data);
    }
}
