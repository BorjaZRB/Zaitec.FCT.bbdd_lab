import { ApplicationConfig, LOCALE_ID, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'; // <--- Combinado: ZoneChangeDetection, LOCALE_ID, importProvidersFrom
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // <--- AÑADIDO: Tu proveedor de HTTP

// Dependencias de Calendario (de DEV)
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';

// Importación única del servicio de citas 
import { CitasService } from './features/citas/data/citas.service';

// Configuración de Localización (de DEV)
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    // --- PROVEEDORES BASE (Mantenemos la optimización de AUTH-003) ---
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(),
    
    // Configuración de Calendario y Locale (de DEV)
    { provide: LOCALE_ID, useValue: 'es' },
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
    ),

    // --- PROVEEDORES ESENCIALES (EP-02) ---
    provideHttpClient(), // <--- Necesario para Supabase
    CitasService,        // <--- Servicio de citas
  ]
};