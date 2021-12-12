import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  id: string="";
  fgValidador:FormGroup=this.fb.group({
    'cedula': ["",[Validators.required]],
    'nombre': ["",[Validators.required]],
    'apellidos': ["",[Validators.required]],
    'correo': ["",[Validators.required]],
    'celular': ["",[Validators.required]],
    'id': ["",[Validators.required]] 
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private router: Router,
    private route:ActivatedRoute) { }
      
  ngOnInit(): void {
    this.id= this.route.snapshot.params["id"];
    this.BuscarPersona();
  }

  EditarPersona(){
    //let id = this.fgValidador.controls["id"].value;
    let cedula = this.fgValidador.controls["cedula"].value;
    let nombre= this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let celular = this.fgValidador.controls["celular"].value;
    let p = new ModeloPersona();
    p.id = this.id;
    p.cedula = cedula;
    p.nombre = nombre;
    p.apellidos = apellidos;
    p.correo = correo;
    p.celular = celular;
     
    this.servicioPersona.ActualizarPersona(p).subscribe((datos: ModeloPersona) =>{
      alert("datos personales editados correctamente");
      this.router.navigate(["/administracion/buscar-persona"]);
    }, (error: any) =>{
      alert("error editando sus datos");
    }
  )
}

BuscarPersona(){
  this.servicioPersona.ObtenerRegistroPorId(this.id).subscribe((datos:ModeloPersona)=>{
    this.fgValidador.controls['cedula'].setValue(datos.cedula);
    this.fgValidador.controls['nombre'].setValue(datos.nombre);
    this.fgValidador.controls['apellidos'].setValue(datos.apellidos);
    this.fgValidador.controls['correo'].setValue(datos.correo);
    this.fgValidador.controls['celular'].setValue(datos.celular);
    this.fgValidador.controls['id'].setValue(datos.id);
    
  },(error:any)=>{
    alert("la persona no existe");
  })
}

}
