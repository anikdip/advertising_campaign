<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserRegisterTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegisterSuccessfully()
    {
        $this->withoutExceptionHandling();
        $register = [
            'name' => 'Test2',
            'email' => 'test2@email.com',
            'password' => 'test2Pass',
            'c_password' => 'test2Pass'
        ];

        $this->json('POST', 'api/register', $register)
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

    public function testRequireNameEmailAndPassword()
    {
        $this->withoutExceptionHandling();
        $this->json('POST', 'api/register')
            ->assertStatus(200)
            ->assertJson([
                'success' => false,
                'message' => 'Validation Error.',
                'data' => [
                    'name' => ['The name field is required.'],
                    'email' => ['The email field is required.'],
                    'password' => ['The password field is required.'],
                    'c_password' => ['The c password field is required.']
                ],
                'status' => 422
            ]);
    }

    public function testRequirePasswordConfirmation()
    {
        $this->withoutExceptionHandling();
        $register = [
            'name' => 'Test2',
            'email' => 'test2@email.com',
            'password' => 'test2Pass',
            'c_password' => 'test2Pass2'
        ];

        $this->json('POST', 'api/register', $register)
            ->assertStatus(200)
            ->assertJson([
                'success' => false,
                'message' => 'Validation Error.',
                'data' => [
                    'c_password' => ['The c password and password must match.']
                ],
                'status' => 422
            ]);
    }
}
