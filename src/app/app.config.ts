import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // <--Proveedor de animaciones
import { provideHttpClient } from '@angular/common/http'; // <--Recomendado para peticiones HTTP

// 1. IMPORTAR EL SERVICIO (RUTA DESDE app.config.ts)
import { CitasService } from './features/citas/data/citas.service'; 
import { routes } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    // --- PROVEEDORES DE feature/EP-03-Agenda-Citas ---
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    
    // --- PROVEEDORES AUTH-004 ---
    provideAnimations(), // Necesario para Angular Material
    provideHttpClient(), // Para peticiones HTTP

    // REGISTRo DEL SERVICIO
    CitasService, 

    // Opcional para más adelante: provideBrowserGlobalErrorListeners()
  ]
};