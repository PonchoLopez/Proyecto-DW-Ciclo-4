import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {


    fgValidador1: FormGroup = this.fb.group({
      'id': ['', [Validators.required]],
      'cedula': ['', [Validators.required]],
      'nombre': ['', [Validators.required]],
      'apellidos': ['', [Validators.required]],
      'correo': ['', [Validators.required]],
      'celular': ['', [Validators.required]],
      'recaptcha':['',[Validators.required]] 
    });
    
  siteKey: string="";

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private router: Router) { 
      this.siteKey="6LfRUZMdAAAAACb4qBfxCTGl77sUcs47FlRxQ604";
    }
      
  ngOnInit(): void {
  }

  GuardarPersona(){
    let id = this.fgValidador1.controls["id"].value;
    let cedula = this.fgValidador1.controls["cedula"].value;
    let nombre= this.fgValidador1.controls["nombre"].value;
    let apellidos = this.fgValidador1.controls["apellidos"].value;
    let correo = this.fgValidador1.controls["correo"].value;
    let celular = this.fgValidador1.controls["celular"].value;
    let p = new ModeloPersona();
    p.id = id;
    p.cedula = cedula;
    p.nombre = nombre;
    p.apellidos = apellidos;
    p.correo = correo;
    p.celular = celular;
    this.servicioPersona.CrearPersona(cedula, nombre, apellidos, correo, celular).subscribe((datos: ModeloPersona) =>{
      alert("persona registrada correctamente");
      this.router.navigate(["/seguridad/identificacion"]);
    }, (error: any) =>{
      alert("error registrando la persona");
    }) 
  }
}
