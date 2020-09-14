import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: Game[] = [];
  constructor(private http: HttpClient) {

   }

   getNominados(){

    if (this.juegos.length > 0){// Esto para recargar lo que ya se tiene del servicio y no recargar la pagina
      // No tenemos juegos jsjsjsjsjs
      console.log('Desde caché');
      return of(this.juegos);
    }
    else{
      console.log('Desde internet');
      return this.http.get<Game[]>(`${environment.url}/api/goty`)
      .pipe(tap( juegos => this.juegos = juegos));
    }
   }

   votarJuego(id: string){
      return this.http.post(`${environment.url}/api/goty/${id}`,{})
      .pipe(
        catchError(err =>{
          return of(err.error)
        })
        )
   }
}
