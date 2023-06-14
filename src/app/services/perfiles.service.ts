import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PerfilInterface } from '../interfaces/perfile.interface';
import { environment } from 'src/environments/environment';
import { DataInterface } from '../interfaces/data.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PerfilesService {
  private url: string = environment.URL_API;
  private token: string = environment.TOKEN;

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  /**
   * Esta funcion genera un llamado a la API y retorna todos los perfiles con su detalle
   * @param username
   */
  searchUsers(username: string): Observable<PerfilInterface[]> {
    const apiUrl = `${this.url}search/users?q=${username}`;

    const headers = this.headers;

    return this.http
      .get<DataInterface<PerfilInterface[]>>(apiUrl, { headers })
      .pipe(
        map((data) => data.items),
        mergeMap((users: PerfilInterface[]) => {
          const requests = users.map((user) =>
            this.getUserDetalles(user.login, user.score)
          );

          return forkJoin(requests).pipe(
            map((detalle: UserInterface[]) => {
              return detalle;
            })
          );
        })
      );
  }

  /**
   * Esta funcion genera un llamado a la API y retorna el detalle de un perfil
   * @param username
   * @param score ?
   */
  getUserDetalles(username: string, score?: number): Promise<UserInterface> {
    const headers = this.headers;
    const apiUrl = `${this.url}users/${username}`;

    return new Promise((resolve, reject) => {
      this.http.get<UserInterface>(apiUrl, { headers }).subscribe(
        (data) => {
          if (score) {
            data.score = score;
          }
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
