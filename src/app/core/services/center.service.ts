import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Tipo de Datos
export interface Center {
    id_centro: number;
    nombre: string;
    direccion: string;
    telefono: string;
    coordinadorId: number; 
}

// Datos simulados
const MOCK_CENTERS: Center[] = [
    { id_centro: 1, nombre: 'Centro Uno (Sur)', direccion: 'Av. Andalucía, 10', telefono: '954-123-456', coordinadorId: 10 },
    { id_centro: 2, nombre: 'Centro Dos (Norte)', direccion: 'C/ Gran Vía, 5', telefono: '912-345-678', coordinadorId: 20 }
];

@Injectable({
    providedIn: 'root'
})
export class CenterService {
    
    constructor() { }

    public getAllCenters(): Observable<Center[]> {
        return of(MOCK_CENTERS);
    }
}