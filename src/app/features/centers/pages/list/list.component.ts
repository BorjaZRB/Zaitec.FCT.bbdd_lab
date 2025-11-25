import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs'; // <-- Importar 'of' para la inicialización
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 

// Importar el servicio y los tipos
import { CenterService, Center } from '../../../../core/services/center.service'; 
import { FormDialogComponent } from '../../components/form-dialog.component'; 

@Component({
    selector: 'app-list',
    standalone: true, 
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule
    ],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'], 
})

export class ListComponent implements OnInit {
    // Definición de las columnas que se mostrarán en la tabla
    displayedColumns: string[] = ['id_centro', 'nombre', 'direccion', 'telefono', 'acciones'];
    // CORRECCIÓN: Inicializar dataSource$ con un Observable de un array vacío (of([]))
    dataSource$: Observable<Center[]> = of([]); 
    // Inyección de dependencias
    constructor(
        private centerService: CenterService, 
        public dialog: MatDialog
    ) {}
    ngOnInit(): void {
        // Cargar los datos del servicio de forma asíncrona
        this.dataSource$ = this.centerService.getAllCenters();
    }
    // Método para abrir el modal de creación
    openCreateDialog() {
        this.dialog.open(FormDialogComponent, { 
            width: '600px', 
            data: { isEdit: false } 
        });
    }
    // Método para abrir el modal de edición
    editCenter(center: Center) {
        this.dialog.open(FormDialogComponent, { 
            width: '600px',
            data: { isEdit: true, center: center } 
        });
    }
}