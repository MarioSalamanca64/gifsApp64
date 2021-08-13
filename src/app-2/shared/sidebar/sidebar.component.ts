import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  //gifsService es del service 
  //historial del sidebar
  get historial(){
    return this.gifsService.historial;
  }
 
  constructor(private gifsService:GifsService){}

  buscar(termino:string){
     this.gifsService.buscarGifs(termino);
  }

}
