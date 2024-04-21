<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZahtevResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='zahtevi';
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'tip_zahteva' => $this->resource->tip_zahteva,
            'odobren' => $this->resource->odobren,
            'pregledan' => $this->resource->pregledan,
            'logoped'=> new LogopedResource($this->resource->logoped),
            'pacijent'=> new PacijentResource($this->resource->pacijent),
            'roditelj'=> new RoditeljResource($this->resource->roditelj),
            'info_pacijenta' => $this->resource->info_pacijenta,
            'info_roditelja' => $this->resource->info_roditelja, 
        ];
    }
}
