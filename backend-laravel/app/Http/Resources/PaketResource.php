<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='paket';

    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'id'=> $this->resource->id,
            'naziv_paketa' => $this->resource->naziv_paketa,
            'broj_tretmana' => $this->resource->broj_tretmana
        ];
    }
}
