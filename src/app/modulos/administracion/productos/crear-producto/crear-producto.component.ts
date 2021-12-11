import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    //'id': ['', [Validators.required]],
    'nombre': ["", [Validators.required]],
    'precio': ["", [Validators.required]],
    'imagen': ["", [Validators.required]],
    'marca': ["", [Validators.required]],
    'color': ["", [Validators.required]],
    'cilindraje': ["", [Validators.required]]
  });
  
  

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router) { 
      
    }

  ngOnInit(): void {
    
  }

  GuardarProducto(){
    //let id = this.fgValidador.controls["id"].value;
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let imagen = this.fgValidador.controls["imagen"].value;
    let marca = this.fgValidador.controls["marca"].value;
    let color = this.fgValidador.controls["color"].value;
    let cilindraje = this.fgValidador.controls["cilindraje"].value;
    let p = new ModeloProducto();
    //p.id= id;
    p.nombre= nombre;
    p.precio= precio;
    p.imagen= imagen;
    p.marca= marca;
    p.color= color;
    p.cilindraje= cilindraje;
    this.servicioProducto.CrearProducto(p).subscribe((datos: ModeloProducto)=>{
      alert("Producto almacenado correctamente");
      this.router.navigate(["/administracion/buscar-producto"]);
    }, (error: any) =>{
      alert("Error almacenando el producto");
    })
  }
}
