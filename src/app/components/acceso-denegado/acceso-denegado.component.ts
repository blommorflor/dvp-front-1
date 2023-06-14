import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso-denegado',
  templateUrl: './acceso-denegado.component.html',
  styleUrls: ['./acceso-denegado.component.css']
})
export class AccesoDenegadoComponent {
  
  constructor(private router: Router) { }

  redirectToPerfiles(): void {
    this.router.navigate(['/listaPerfiles']);
  }
}
