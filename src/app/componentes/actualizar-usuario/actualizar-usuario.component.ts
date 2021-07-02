import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CrearUsuarioModel } from 'src/app/interface/crear-usuario.model';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  formulario: FormGroup;
  id: any;

  constructor( private service: UsuariosService, private fb: FormBuilder, private router: Router, 
    private rutaActiva: ActivatedRoute ) {

    const _id = this.rutaActiva.snapshot.paramMap.get('id');
    this.id = _id;
    if ( _id != null) {
      this.service.getUsuarioId(_id)
      .subscribe( resp => {
        const usuario = resp['usuarios'];
        this.cargarInformacion(usuario);
      });
    }

  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: [],
      correo: [],
      password: [],
      rol: []
    });
  }

  cargarInformacion( data: any ) {
    if ( data.length > 0 ) {
      console.log(data);
      this.formulario.controls.nombre.setValue(data[0].nombre);
      this.formulario.controls.correo.setValue(data[0].correo);
      this.formulario.controls.password.setValue(data[0].contraseña);
      this.formulario.controls.rol.setValue(data[0].rol);
    }
  }

  guardar() {
    if( this.formulario.status == 'VALID' ){
      const info = this.formulario.value;
      
      const usuario : CrearUsuarioModel = {
        nombre: info.nombre,
        correo: info.correo,
        password: info.password,
        rol: info.rol,
        no_control: '18330509'
      };
      
      
      this.service.putUsuario( this.id, usuario ).subscribe( res => {
        this.router.navigate(['tablaUsuarios']);
      });
    }
  }


}
