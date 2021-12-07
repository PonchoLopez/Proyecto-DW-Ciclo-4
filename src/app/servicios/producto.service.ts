import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';
import { SeguridadService } from './seguridad.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //;
  token: String = "";
  
  constructor(private http:HttpClient, 
    private seguridadServicio: SeguridadService) {
      this.token = this.seguridadServicio.ObtenerToken();
    }
  ObtenerRegistros():Observable<ModeloProducto[]>{
    return this.http.get<ModeloProducto[]>("http://localhost:3000/vehiculos")
  }

  CrearProducto(vehiculo:ModeloProducto): Observable<ModeloProducto>{
    return this.http.post("http://localhost:3000/vehiculos", vehiculo, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarProducto(vehiculo:ModeloProducto): Observable<ModeloProducto>{
    return this.http.put<ModeloProducto>(`http://localhost:3000/vehiculos/${vehiculo.id}`, vehiculo, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarProducto(id: string): Observable<any>{
    return this.http.delete("http://localhost:3000/vehiculos/{id}", {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ObtenerRegistroPorId(id:string):Observable<ModeloProducto>{
    return this.http.get<ModeloProducto>(`http://localhost:3000/vehiculos/${id}`);
  }

}
