import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';





@Injectable({ providedIn: 'root' })
export class AuthService {

//crea la instancia de Supabase con URL y clave pública.
private supabase: SupabaseClient;

//almacena la sesión actual y permite que componentes se suscriban para reaccionar a cambios de sesión.
private session$ = new BehaviorSubject<Session | null>(null);
private isAuthenticated$ = new BehaviorSubject<boolean>(false);

// Observable público para el estado de autenticación
get authState(): Observable<boolean> {
  return this.isAuthenticated$.asObservable();
}



constructor() {
  this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  // Comprobar si hay un usuario en localStorage al iniciar
  const userStr = localStorage.getItem('usuario');
  if (userStr) {
    this.isAuthenticated$.next(true);
  }

  // Recuperar sesión de Supabase
  this.supabase.auth.getSession().then(({ data }) => {
    this.session$.next(data.session ?? null);
  });

  // Escuchar cambios en la sesión
  this.supabase.auth.onAuthStateChange((_event, session) => {
    this.session$.next(session);
  });
}


// Método con auth para login de clientes con email y password.Pero antes hay que configurar Supabase Auth para permitir este método.
/*async loginCliente(email: string, password: string) {
  try {
    // Validar login con Supabase Auth
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      return { success: false, message: 'Correo o contraseña incorrectos' };
    }

    const userAuth = data.user;

    // Buscar datos extras del usuario en tu tabla
    const { data: userExtra, error: errorExtra } = await this.supabase
      .from('usuario_prueba')
      .select('*')
      .eq('email', email)
      .single();

    if (errorExtra || !userExtra) {
      console.warn('Usuario autenticado pero no encontrado en usuario_prueba');
      return {
        success: true,
        message: 'Login correcto pero faltan datos adicionales',
        user: userAuth
      };
    }

    // Guardar datos completos en localStorage
    localStorage.setItem('usuario', JSON.stringify(userExtra));

    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      user: userExtra,
      session: data.session
    };

  } catch (err: any) {
    return {
      success: false,
      message: 'Error inesperado al iniciar sesión'
    };
  }
}
*/

async loginCliente(email: string, password: string) {
  try {
    // Buscar el usuario con email y password coincidentes
    const { data, error } = await this.supabase
      .from('usuario_prueba')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single(); // Garantiza un solo resultado

    if (error || !data) {
      return {
        success: false,
        message: 'Correo o contraseña incorrectos'
      };
    }

    // Guardar usuario en LocalStorage
    localStorage.setItem('usuario', JSON.stringify(data));

    // Actualizar el estado de autenticación
    this.isAuthenticated$.next(true);

    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      user: data
    };

  } catch (err: any) {
    console.error('Error al iniciar sesión:', err.message);
    return {
      success: false,
      message: 'Error inesperado en el login'
    };
  }
}

async logout() {
  try {
    // Limpiar localStorage
    localStorage.removeItem('usuario');
    
    // Actualizar el estado de autenticación
    this.isAuthenticated$.next(false);
    
    return {
      success: true,
      message: 'Sesión cerrada correctamente'
    };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return {
      success: false,
      message: 'Error al cerrar sesión'
    };
  }
}

}
