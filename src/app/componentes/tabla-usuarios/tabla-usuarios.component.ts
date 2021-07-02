import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor( private service: UsuariosService, private router: Router) {
    this.service.getUsuario().subscribe( res => {
      this.usuarios = res['usuarios'];
      console.log(this.usuarios);
    });
  }

  ngOnInit(): void {
    
  }

  actualizar( item: any ) {
    console.log('Actualizando');
    console.log(this.usuarios[item]);
  }

  eliminar( item: any ) {
    console.log('Eliminando');
    const _id = this.usuarios[item]._id;

    console.log(_id);
    if (confirm('¿Estas seguro de eliminar este registro?')) {
      console.log('Acepto');
      this.service.deleteUsuario( _id ).subscribe( res => {
      console.log(res);
      this.router.navigate(['tablaUsuarios'])
      });
    }   
  }

}
