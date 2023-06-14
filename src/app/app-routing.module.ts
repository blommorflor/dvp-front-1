import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPerfilesComponent } from './components/lista-perfiles/lista-perfiles.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetallePerfilComponent } from './components/detalle-perfil/detalle-perfil.component';
import { ScoreGuard } from './guards/score-guard.guard.';
import { AccesoDenegadoComponent } from './components/acceso-denegado/acceso-denegado.component';

const routes: Routes = [
  { path: '', redirectTo: 'listaPerfiles', pathMatch: 'full' },
  { path: 'listaPerfiles', component: ListaPerfilesComponent },
  { path: 'perfil-detalle/:username/:score', component: DetallePerfilComponent, canActivate: [ScoreGuard] },
  { path: 'acceso-denegado', component: AccesoDenegadoComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
