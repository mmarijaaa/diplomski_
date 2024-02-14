<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TretmanResource3 extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='tretmani';

    public function toArray(Request $request): array
    {
        //return parent::toArray($request);

        return [
            'naziv_tretmana' => $this->resource->naziv_tretmana,
            'redni_broj_tretmana' => $this->resource->redni_broj_tretmana,
            'datum_tretmana' => $this->resource->datum_tretmana,  
            'vreme_tretmana' => $this->resource->vreme_tretmana,
            'sadrzaj_tretmana' => $this->resource->sadrzaj_tretmana,   
        ]; 
    }
}
