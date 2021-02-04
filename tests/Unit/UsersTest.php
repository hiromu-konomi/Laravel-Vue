<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Tests\CreatesApplication;

class UsersTest extends TestCase
{
    use CreatesApplication;
    use RefreshDatabase;

    public function testBasicTest() {
        for($i = 0; $i < 10; $i++) {
            User::factory() -> create();
        }
        $count = User::get()->count();
        $user = User::find(rand(1, $count));
        $data = $user -> toArray();
        print_r($data);

        $this -> assertDatabaseHas('user', $data);

        $user -> delete();
        $this -> assertDatabaseMissing('user', $data);
    }

}
