import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { PerfilesService } from 'src/app/services/perfiles.service';

@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.component.html',
  styleUrls: ['./detalle-perfil.component.css'],
})

export class DetallePerfilComponent implements OnInit {
  username: string = '';
  perfil!: UserInterface;

  constructor(
    private route: ActivatedRoute,
    private userService: PerfilesService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getUser();
  }

  /**
   * Esta funcion obtiene el detalle del usuario mediante el parametro de la ruta
   */
  getUser() {
    this.route.params.subscribe((params) => {
      this.userService.getUserDetalles(params['username'])
        .then((user) => {
          this.perfil = user;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  /**
   * Redirige a la lista de usuarios
   */
  redirectToPerfiles() {
    this.router.navigate(['/listaPerfiles']);
  }
}
