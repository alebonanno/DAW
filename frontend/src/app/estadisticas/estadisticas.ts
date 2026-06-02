import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesListadoApiClient } from '../proyectos/clientes/listado/clientes-listado-api-client';
import { Template } from '../template/template';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, Template],
  templateUrl: './estadisticas.html',
  styleUrls: ['./estadisticas.css']
})

export class Estadisticas {

  estadisticas: any;
  private cdr = inject(ChangeDetectorRef);

  constructor(private api: ClientesListadoApiClient) {}

  ngOnInit() {
    this.api.getEstadisticas().subscribe({
      next: (data) => {
        console.log('OK:', data);
        this.estadisticas = data;
        // Para forzar refresh de la UI.
        this.cdr.detectChanges();
      }
    });
  }
}