import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  token: String = "";
  url= 'http://localhost:3000'

  constructor(private http: HttpClient,
    private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
   }



  ObtenerRegistros(): Observable<ModeloPersona[]>{
  return this.http.get<ModeloPersona[]>(`${this.url}/personas`);
  }

  CrearPersona(cedula: string, nombre: string, apellidos: string, correo: string, celular: string): Observable<ModeloPersona>{
    return this.http.post<ModeloPersona>(`${this.url}/personas`, {
      cedula: cedula, 
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      celular: celular
    });
  }

  ActualizarPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.put<ModeloPersona>(`http://localhost:3000/personas/${persona.id}`, persona, {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarPersona(id: string): Observable<ModeloPersona>{
    return this.http.delete(`http://localhost:3000/personas/${id}`, {
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
  ObtenerRegistroPorId(id:string):Observable<ModeloPersona>{
    return this.http.get<ModeloPersona>(`http://localhost:3000/personas/${id}`);
  }
}
