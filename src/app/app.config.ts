import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- AÑADIDO: NECESARIO para Material
import { provideHttpClient } from '@angular/common/http'; // <-- AÑADIDO: NECESARIO para llamadas (Supabase)

import { routes } from './app.routes';

// Importa el servicio de citas (necesario para el código que se fusiono en AUTH-004)
import { CitasService } from './features/citas/data/citas.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // --- Mantenemos los proveedores base originales creados AUTH-003---
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),

    // --- PROVEEDORES ESENCIALES FALTANTES ---
    provideAnimations(), // Corrige problemas de rendering y bordes de Material
    provideHttpClient(), // Habilita las llamadas HTTP/API

    // --- SERVICIOS GLOBALES ---
    CitasService, // Registrando el servicio de citas de tu compañero
    
    // ... otros providers que ya tuviera (ej., provideBrowserGlobalErrorListeners)
  ]
};
