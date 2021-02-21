<?php

namespace Database\Seeders;

use App\Models\Campaign;
use Illuminate\Database\Seeder;

class CampaignsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Campaign::create([
            'user_id' => 1,
            'name' => 'Test Campaign',
            'date' => '2021-02-19',
            'daily_budget' => 100,
            'total_budget' => 1000
        ]);
    }
}
