<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TretmanResource2 extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='tretmani';
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'naziv_tretmana' => $this->resource->naziv_tretmana,
            'datum_tretmana' => $this->resource->datum_tretmana,  
            'vreme_tretmana' => $this->resource->vreme_tretmana,
            'sadrzaj_tretmana' => $this->resource->sadrzaj_tretmana,
            'logoped'=> new LogopedResource($this->resource->logoped), 
            'pacijent'=> new PacijentResource($this->resource->pacijent), 
            'paketPacijent'=> new PaketiPacijentResource($this->resource->paketPacijent)    
        ]; 
    }
}
