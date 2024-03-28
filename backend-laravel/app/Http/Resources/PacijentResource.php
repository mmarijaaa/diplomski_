<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource; 
use App\Http\Resources\LogopedResource;
use App\Http\Resources\RoditeljResource;
use App\Http\Resources\PaketResource;
use App\Http\Resources\PaketiPacijentResource;

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
        return [
            'id'=>$this->resource->id, 
            'ime' => $this->resource->ime,
            'prezime' => $this->resource->prezime, 
            'uzrast' => $this->resource->uzrast,
            'poremecaj' => $this->resource->poremecaj,
            'roditelj'=> new RoditeljResource($this->resource->roditelj),
            'logoped'=> new LogopedResource($this->resource->logoped),
            'paket'=> new PaketResource($this->resource->paket),
        ];
    }
}
