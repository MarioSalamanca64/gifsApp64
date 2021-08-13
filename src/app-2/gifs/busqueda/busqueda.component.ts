import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',

})
export class BusquedaComponent {
  /*esto se hace para no importar en ngforms ya que solo es solo un input*/ 
  /*es un decorador que busca en el HTML desde su classe sus etiquetas id referencia local 
  afuera del parentecis es como se llama la clase
  ! es para desirle a agular que confie en nostros y que si el elemento existe y siempre contendra algo
  ! not null operation select
  <HTMLInputElement> hay que espesificar en este caso que es un input no se importa ya biene por defecto
  ya con eso puedes susar funciones como value focus select*/
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsService:GifsService){}

  buscar(){
    //nativeElement es propio de node o angular para pedir mudulos de js pero debes de pedirlos con @viewchild
    const valor = this.txtBuscar.nativeElement.value;
    //usas el injectable
    this.gifsService.buscarGifs(valor);
    //con esto almomento de darenter se quieta el texto 
    this.txtBuscar.nativeElement.value = '';
    
  }

  /*  //para buscar que elementoes es ElementRef
   buscar(termino:string){
    console.log (this.txtBuscar);
  }
  */
} 
