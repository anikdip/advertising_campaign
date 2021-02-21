<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\Campaign as CampaignResource;

class CampaignController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = Auth::user()->id;
        $campaigns = Campaign::where('user_id', $user_id)->get();

        return $this->sendResponse(CampaignResource::collection($campaigns), 'Campaigns retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'date' => 'required|date',
            'daily_budget' => 'required|numeric',
            'total_budget' => 'required|numeric'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $campaign = new Campaign();
        $campaign->user_id = Auth::user()->id;
        $campaign->name = $request->name;
        $campaign->date = $request->date;
        $campaign->daily_budget = $request->daily_budget;
        $campaign->total_budget = $request->total_budget;
        $campaign->save();

        return $this->sendResponse(new CampaignResource($campaign), 'Campaign created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user_id = Auth::user()->id;
        $campaign = Campaign::find($id);

        if (is_null($campaign)) {
            return $this->sendError('Campaign not found.');
        }

        $campaign_data = Campaign::where('id', $campaign->id)
            ->where('user_id', $user_id)
            ->get();

        if(count($campaign_data)>0) {
            return $this->sendResponse(new CampaignResource($campaign), 'Campaign retrieved successfully.');
        }
        else{
            return $this->sendError('You are not authorised to edit this campaign', [], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Campaign $campaign)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'date' => 'required|date',
            'daily_budget' => 'required|numeric',
            'total_budget' => 'required|numeric'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user_id = Auth::user()->id;
        $campaign_data = Campaign::where('id', $campaign->id)
            ->where('user_id', $user_id)
            ->get();

        if(count($campaign_data)>0) {
            $campaign->user_id = Auth::user()->id;
            $campaign->name = $input['name'];
            $campaign->date = $input['date'];
            $campaign->daily_budget = $input['daily_budget'];
            $campaign->total_budget = $input['total_budget'];
            $campaign->save();

            return $this->sendResponse(new CampaignResource($campaign), 'Campaign updated successfully.');
        }
        else{
            return $this->sendError('You are not authorised to edit this campaign', [], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campaign $campaign)
    {
        $user_id = Auth::user()->id;
        $campaign_data = Campaign::where('id', $campaign->id)
                                ->where('user_id', $user_id)
                                ->get();

        if(count($campaign_data)>0) {
            $campaign->delete();
            return $this->sendResponse([], 'Campaign deleted successfully.');
        }
        else{
            return $this->sendError('You are not authorised to delete this campaign', [], 401);
        }
    }
}
