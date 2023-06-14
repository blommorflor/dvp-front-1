import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PerfilesService } from 'src/app/services/perfiles.service';
import { PerfilInterface } from 'src/app/interfaces/perfile.interface';
import { FormControl, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-lista-perfiles',
  templateUrl: './lista-perfiles.component.html',
  styleUrls: ['./lista-perfiles.component.css'],
})

export class ListaPerfilesComponent implements OnInit {

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: | ElementRef<HTMLCanvasElement> | undefined;

  chart!: Chart;
  guard: boolean = true;
  error: string = '';
  cargando: boolean = false;
  perfiles: PerfilInterface[] = [];
  ultimoBuscado: string | null = localStorage.getItem('username');

  usernameForm: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern(/^(?!doublevpartners).*$/i),
  ]);

  constructor(
    private perfilesService: PerfilesService
  ) {}

  ngOnInit(): void {
    // Verifica segun el localStorage el ultimo perfil que se buscó para permanecer el resultado
    if (this.ultimoBuscado) {
      this.searchPerfiles(this.ultimoBuscado);
    }
    Chart.register(...registerables);
  }

  /**
   * Esta funcion es llamada cuando se busca desde el botón del input
   */
  buscarDesdeForm() {
    localStorage.setItem('username', this.usernameForm.value);
    this.searchPerfiles(this.usernameForm.value);
  }

  /**
   * Esta funcion hace un llamado al service y mediante el parametro del username
   * retornará los usuarios que coincidan
   * @param username
   */
  searchPerfiles(username: string): void {
    this.cargando = true;
    this.perfiles = [];
    this.destroyChart();

    this.perfilesService.searchUsers(username).subscribe({
      next: (perfiles) => {
        this.perfiles = perfiles.slice(0, 10);
      },
      error: () => {
        this.error = 'Algo ha salido mal';
      },
      complete: () => {
        this.cargando = false;
        if (this.chartCanvas) {
          this.createChart();
        }
      },
    });
  }

  /**
   * Esta funcion crea el grafico de los followers de los usuarios
   */
  createChart() {
    const ctx = this.chartCanvas?.nativeElement.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.perfiles.map((p) => p.login),
          datasets: [
            {
              label: 'Followers',
              data: this.perfiles.map((p) => p.followers),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  /**
   * Destruye el grafico para poder volver a ingresar nuevos datos
   */
  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  closeErrorDialog() {
    this.error = '';
  }
}
