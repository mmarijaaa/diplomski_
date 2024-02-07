<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\LogopedResource;
use App\Http\Resources\RoditeljResource;
use App\Http\Resources\PaketResource;

class ZahtevObnovaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'tip_zahteva' => $this->resource->tip_zahteva,
            'odobren' => $this->resource->odobren,
            'pregledan' => $this->resource->pregledan,
            'logopedP'=> new LogopedResource($this->resource->logopedP), 
            'pacijent'=> new PacijentResource($this->resource->pacijent),
            'roditelj'=> new RoditeljResource($this->resource->roditelj), 
        ];
    }
}
