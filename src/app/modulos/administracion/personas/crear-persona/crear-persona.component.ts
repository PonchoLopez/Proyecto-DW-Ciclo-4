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

    fgValidador: FormGroup = this.fb.group({
      'id': ['', [Validators.required]],
      'cedula': ['', [Validators.required]],
      'nombre': ['', [Validators.required]],
      'apellidos': ['', [Validators.required]],
      'correo': ['', [Validators.required]],
      'celular': ['', [Validators.required]],
    });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private router: Router) { }
      
  ngOnInit(): void {
  }

  GuardarPersona(){
    let id = this.fgValidador.controls["id"].value;
    let cedula = this.fgValidador.controls["cedula"].value;
    let nombre= this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let celular = this.fgValidador.controls["celular"].value;
    let p = new ModeloPersona();
    p.id = id;
    p.cedula = cedula;
    p.nombre = nombre;
    p.apellidos = apellidos;
    p.correo = correo;
    p.celular = celular;
    this.servicioPersona.CrearPersona(p).subscribe((datos: ModeloPersona) =>{
      alert("persona registrada correctamente");
      this.router.navigate(["/administracion/personas"]);
    }, (error: any) =>{
      alert("error registrando la persona");
    }) 
  }
}
