import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getNominados()
      .subscribe(
        (data) => {
          console.log(data);
          this.juegos = data;
        });
  }

  votar(juego: Game){
    console.log(juego.id);
    this.gameService.votarJuego(juego.id)
    .subscribe((data: any) => {

      if (data.ok){
        Swal.fire({
          icon: 'success',
          title: data.mensaje,
          showConfirmButton: true,
          timer: 1500
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.mensaje,
        })
      }
      console.log(data);
    });
  }

}
