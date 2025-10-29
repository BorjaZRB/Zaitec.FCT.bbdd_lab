import { Injectable } from '@angular/core';
// Importa las dependencias necesarias de Supabase y RxJS
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
// BehaviorSubject permite manejar el estado de la sesión de usuario de forma reactiva.
import { BehaviorSubject } from 'rxjs';
// Importa la configuración del entorno para obtener la URL y clave de Supabase.
import { environment } from '../../../environments/environments/environments';





@Injectable({ providedIn: 'root' })
export class AuthService {

//crea la instancia de Supabase con URL y clave pública.
private supabase: SupabaseClient;

//almacena la sesión actual y permite que componentes se suscriban para reaccionar a cambios de sesión.
private session$ = new BehaviorSubject<Session | null>(null);



constructor() {
this.supabase = createClient(environment.supabaseUrl,
environment.supabaseAnonKey);

// Recuperar sesión ya existente al iniciar la app
//  al inicio: recupera sesión guardada (por ejemplo, en localStorage o en el cliente
// Supabase) para mantener el usuario logueado al recargar la página.
this.supabase.auth.getSession().then(({ data }) => {
this.session$.next(data.session ?? null);
});


// Escuchar cambios en la sesión (login, logout, refresh), listener que dispara cuando el usuario hace login, logout o
// cuando el token se refresca.
this.supabase.auth.onAuthStateChange((_event, session) => {
this.session$.next(session);
});
}


// Método para login de clientes con email y password.
async loginCliente(email: string, password: string) {
  const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });


  //Mensaje que indica si el login fue correcto o si hubo un error.
  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: 'Inicio de sesión exitoso',
    user: data.user,
    session: data.session,
  };
}


}
