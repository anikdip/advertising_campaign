<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserLoginTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRequireEmailAndLogin()
    {
        $this->withoutExceptionHandling();
        $this->json('POST', 'api/login')
            ->assertStatus(200)
            ->assertJson([
                'success' => false,
                'message' => 'Validation Error.',
                'data' => [
                    'email' => ['The email field is required.'],
                    'password' => ['The password field is required.'],
                ],
                'status' => 422
            ]);;

    }

    public function testUserLoginSuccessfully()
    {
        $this->withoutExceptionHandling();
        $user = ['email' => 'test@email.com', 'password' => 'testPass'];
        $this->json('POST', 'api/login', $user)
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'token',
                    'name'
                ],
                'message',
            ]);
    }
}
