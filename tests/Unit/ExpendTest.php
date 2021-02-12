<?php

namespace Tests\Unit;

use App\Models\Expend;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Tests\CreatesApplication;

class ExpendTest extends TestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public function testBasicTest()
    {
        for($i = 0 ; $i < 10 ; $i ++) {
            Expend::factory()->create();
        }
        $count = Expend::get()->count();
        $expend = Expend::find(rand(1, $count));
        $data = $expend->toArray();
        print_r($data);

        $this->assertDatabaseHas('expends', $data);

        $expend->delete();
        $this->assertDatabaseMissing('expends', $data);
    }
}
