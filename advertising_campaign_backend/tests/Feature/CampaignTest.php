<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testCampaignRequireFields()
    {
        $this->withoutExceptionHandling();

        $user = ['email' => 'test@email.com',
            'password' => 'testPass'
        ];

        Auth::attempt($user);
        $token = Auth::user()->createToken('AdvertisingCampaign')->accessToken;
        $headers = ['Authorization' => "Bearer $token"];

        $campaign = [
            'name' => null,
            'date' => null,
            'daily_budget' => null,
            'total_budget' => null
        ];

        $this->json('POST', 'api/campaigns', $campaign, $headers)
            ->assertStatus(200)
            ->assertJson([
                'success' => false,
                'message' => 'Validation Error.',
                'data' => [
                    'name' => ['The name field is required.'],
                    'date' => ['The date field is required.'],
                    'daily_budget' => ['The daily budget field is required.'],
                    'total_budget' => ['The total budget field is required.']
                ],
                'status' => 422
            ]);
    }

    public function testCampaignSuccessfully()
    {
        $this->withoutExceptionHandling();

        $user = ['email' => 'test@email.com',
            'password' => 'testPass'
        ];

        Auth::attempt($user);
        $token = Auth::user()->createToken('AdvertisingCampaign')->accessToken;
        $headers = ['Authorization' => "Bearer $token"];

        $campaign = [
            'name' => 'Test2 Campaign',
            'date' => '2021-02-20',
            'daily_budget' => 100,
            'total_budget' => 1000
        ];

        $this->json('POST', 'api/campaigns', $campaign, $headers)
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'user_id',
                    'name',
                    'date',
                    'daily_budget',
                    'total_budget',
                    'created_at',
                    'updated_at'
                ],
                'message',
            ]);
    }

    public function testCampaignGetAll()
    {
        $this->withoutExceptionHandling();

        $user = ['email' => 'test@email.com',
            'password' => 'testPass'
        ];

        Auth::attempt($user);
        $token = Auth::user()->createToken('AdvertisingCampaign')->accessToken;
        $headers = ['Authorization' => "Bearer $token"];

        $this->json('GET', 'api/campaigns', [], $headers)
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data',
                'message',
            ]);
    }

    public function testCampaignUpdateSuccessfully()
    {
        $this->withoutExceptionHandling();

        $user = ['email' => 'test@email.com',
            'password' => 'testPass'
        ];

        Auth::attempt($user);
        $token = Auth::user()->createToken('AdvertisingCampaign')->accessToken;
        $headers = ['Authorization' => "Bearer $token"];

        $campaign = [
            'name' => 'Test2 Campaign',
            'date' => '2021-02-20',
            'daily_budget' => 100,
            'total_budget' => 1000
        ];

        $response = $this->json('POST', 'api/campaigns', $campaign, $headers);
        $id = $response->original['data']['id'];

        $campaign = [
            'name' => 'Test2 Campaign Test',
            'date' => '2021-02-20',
            'daily_budget' => 100,
            'total_budget' => 1000
        ];

        $this->json('PUT', 'api/campaigns/'.$id, $campaign, $headers)
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'user_id',
                    'name',
                    'date',
                    'daily_budget',
                    'total_budget',
                    'created_at',
                    'updated_at'
                ],
                'message',
            ]);
    }

    public function testCampaignGetById()
    {
        $this->withoutExceptionHandling();

        $user = ['email' => 'test@email.com',
            'password' => 'testPass'
        ];

        Auth::attempt($user);
        $token = Auth::user()->createToken('AdvertisingCampaign')->accessToken;
        $headers = ['Authorization' => "Bearer $token"];

        $campaign = [
            'name' => 'Test2 Campaign',
            'date' => '2021-02-20',
            'daily_budget' => 100,
            'total_budget' => 1000
        ];

        $response = $this->json('POST', 'api/campaigns', $campaign, $headers);
        $id = $response->original['data']['id'];

        $this->json('GET', 'api/campaigns/'.$id, [], $headers)
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'user_id',
                    'name',
                    'date',
                    'daily_budget',
                    'total_budget',
                    'created_at',
                    'updated_at'
                ],
                'message',
            ]);
    }

    public function testCampaignDelete()
    {
        $this->withoutExceptionHandling();

        $user = ['email' => 'test@email.com',
            'password' => 'testPass'
        ];

        Auth::attempt($user);
        $token = Auth::user()->createToken('AdvertisingCampaign')->accessToken;
        $headers = ['Authorization' => "Bearer $token"];

        $campaign = [
            'name' => 'Test2 Campaign',
            'date' => '2021-02-20',
            'daily_budget' => 100,
            'total_budget' => 1000
        ];

        $response = $this->json('POST', 'api/campaigns', $campaign, $headers);
        $id = $response->original['data']['id'];

        $this->json('DELETE', 'api/campaigns/'.$id, [], $headers)
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [],
                'message',
            ]);
    }
}
