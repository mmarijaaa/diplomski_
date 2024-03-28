<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaketiPacijentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='paketi';
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->resource->id,
            'naziv_paketa' => $this->resource->naziv_paketa,
            'datum_od' => $this->resource->datum_od,
            'datum_do' => $this->resource->datum_do,
            'pacijent'=> new PacijentResource($this->resource->pacijent), 
            'logoped'=> new LogopedResource($this->resource->logoped),
            'zavrsen' => $this->resource->zavrsen
        ];
    }
}
