import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../enviroments/environment';

@Injectable({providedIn: 'root'})

export class AuthService{

private supabase: SupabaseClient;

  constructor() {
    // URL Y API KEY DE SUPABASE IMPORTADAS DE ENVIRONMENT
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
}