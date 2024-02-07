<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource; 
use App\Http\Resources\LogopedResource;
use App\Http\Resources\RoditeljResource;
use App\Http\Resources\PaketResource;

class PacijentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap='pacijenti';

    public function toArray(Request $request):array
    {
        //return parent::toArray($request);
        return [
            // 'id'=>$this->resource->id,
            'ime' => $this->resource->ime,
            'prezime' => $this->resource->prezime, 
            'uzrast' => $this->resource->uzrast,
            'poremecaj' => $this->resource->poremecaj,
            'roditelj'=> new RoditeljResource($this->resource->roditelj),
            // 'id_roditelja'=>new RoditeljResource($this->resource->id_roditelja),
            'logoped'=> new LogopedResource($this->resource->logoped),
            //'id_logopeda'=>new LogopedResource($this->resource->id_logopeda),
            'paket'=> new PaketResource($this->resource->paket)  
            // 'id_paketa'=>new PaketResource($this->resource->id_paketa)
        ];
    }
}
