import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url= 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  // CrearPersona(cedula: string ,nombre: string , apellidos: string, correo: string, celular: string):Observable<ModeloPersona>{
  //   return this.http.post("http://localhost:3000/personas",{
  //     cedula: cedula,
  //     nombre: nombre,
  //     apellidos: apellidos,
  //     correo: correo,
  //     celular: celular
  //   },
  //   {
  //     headers: new HttpHeaders()
  //   })

  // }

  //ObtenerRegistros(): Observable<ModeloPersona[]>{
  //return this.http.get<ModeloPersona[]>(`${this.url}/personas`);
  //}

  CrearPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.post<ModeloPersona>(`${this.url}/personas`, persona,  )
   
  
  }

}
