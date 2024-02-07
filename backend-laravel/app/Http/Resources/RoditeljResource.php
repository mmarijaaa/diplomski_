<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\LogopedResource;

class RoditeljResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='roditelj';

    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'id' => $this->resource->id,
            'ime'=> $this->resource->ime,
            'prezime'=>$this->resource->prezime,
            'logoped'=> new LogopedResource($this->resource->logoped),
        ];
    }
}
