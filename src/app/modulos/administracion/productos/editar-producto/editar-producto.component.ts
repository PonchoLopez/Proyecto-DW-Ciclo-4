import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

    id:string="";
    fgValidador:FormGroup=this.fb.group({
      'nombre': ["", [Validators.required]],
      'precio': ["", [Validators.required]],
      'imagen': ["", [Validators.required]],
      'marca': ["", [Validators.required]],
      'color': ["", [Validators.required]],
      'cilindraje': ["", [Validators.required]],
      'id': ["", [Validators.required]]
    })
    constructor(private fb: FormBuilder,
      private servicioProducto: ProductoService,
      private router: Router,
      private route:ActivatedRoute) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params["id"];
      this.BuscarProducto();
    }
  
    EditarProducto(){
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
      p.id=this.id;
      this.servicioProducto.ActualizarProducto(p).subscribe((datos: ModeloProducto)=>{
        alert("Producto editado correctamente");
        this.router.navigate(["/administracion/buscar-producto"]);
      }, (error: any) =>{
        alert("Error en la edición del producto");
      })
    }

    BuscarProducto(){
      this.servicioProducto.ObtenerRegistroPorId(this.id).subscribe((datos:ModeloProducto)=>{
        this.fgValidador.controls['nombre'].setValue(datos.nombre);

        this.fgValidador.controls['precio'].setValue((datos.precio));
        this.fgValidador.controls['imagen'].setValue(datos.imagen);
        this.fgValidador.controls['marca'].setValue(datos.marca);
        this.fgValidador.controls['color'].setValue(datos.color);
        this.fgValidador.controls['cilindraje'].setValue(datos.cilindraje);
        this.fgValidador.controls['id'].setValue(datos.id);

  
      },(error:any)=>{
        alert ("el producto no existe!");
      })
    }
  }
  