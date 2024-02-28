<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TretmanResource4 extends JsonResource
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
            'id'=>$this->resource->id,
            'datum_tretmana' => $this->resource->datum_tretmana,  
            'vreme_tretmana' => $this->resource->vreme_tretmana,  
        ]; 
    }
}
