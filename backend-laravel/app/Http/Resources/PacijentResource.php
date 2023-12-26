<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PacijentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap='pacijent';

    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        return [
            //'id_pacijenta'=>$this->resource->id_pacijenta,
            'ime'=>$this->resource->ime,
            'prezime'=>$this->resource->prezime,
            'uzrast'=>$this->resource->uzrast,
            'poremecaj'=>$this->resource->poremecaj,
            'id_roditelja'=>$this->resource->id_roditelja,
            'id_logopeda'=>$this->id_logopeda,
            'id_paketa'=>$this->id_paketa  
        ];
    }
}
