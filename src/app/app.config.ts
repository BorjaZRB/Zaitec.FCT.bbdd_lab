import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // NECESARIO
import { provideHttpClient } from '@angular/common/http'; // NECESARIO

import { routes } from './app.routes'; 

// Importación única del servicio de citas (Se elimina el duplicado)
import { CitasService } from './features/citas/data/citas.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // --- PROVEEDORES BASE (Mantenemos la optimización de AUTH-003) ---
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    
    // --- PROVEEDORES ESENCIALES AÑADIDOS EN AUTH-004 ---
    // (provideAnimations resuelve problemas de rendering y provideHttpClient es para API)
    provideAnimations(), 
    provideHttpClient(), 

    // --- REGISTRO DEL SERVICIO DE CITAS ---
    CitasService, 

    // Si tu compañero tenía este, puedes añadirlo de vuelta:
    // provideBrowserGlobalErrorListeners(), 
  ]
};