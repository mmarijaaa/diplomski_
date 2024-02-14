<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaketiPacijentResource2 extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='paketi';

    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'id'=> $this->resource->id,
            'naziv_paketa' => $this->resource->naziv_paketa,
            'datum_od' => $this->resource->datum_od,
            'datum_do' => $this->resource->datum_do,
            'zavrsen' => $this->resource->zavrsen
        ];
    }
}
