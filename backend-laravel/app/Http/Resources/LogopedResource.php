<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogopedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='logoped';
    public function toArray(Request $request):array
    {
        //return parent::toArray($request);

        return [
            'id' => $this->resource->id,
            'ime'=> $this->resource->ime,
            'prezime'=>$this->resource->prezime,
            'broj_telefona'=>$this->resource->broj_telefona
        ];
    }
}
