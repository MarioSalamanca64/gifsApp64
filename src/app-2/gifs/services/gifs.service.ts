import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  //root es global para toda la app de angular 
  providedIn: 'root'
})

export class GifsService {
  //es el codigo que me dio la pagina de gifs para conectar la api
  private apiKey     :string = 'o9tuaDZd79SgjbnMcDg5wKxN0whcp0JI';

  private servicioUrl:string = 'http://api.giphy.com/v1/gifs';
  
  //cambios en timepo real por eso se pone el _
  private _historial: string[] = [];
  
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }
  //el constructor solo se ejecuta una vez 
  constructor(private http: HttpClient){
     //parse hace que devuelva el objeto a su forma original
     //si el historial no existe regresa un areglo vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //gifs guardados
    this.resultados = JSON.parse(localStorage.getItem('gif')!) || [];

  //forma tradicional getItem es recoje un string si no es null
  /*
  if(localStorage.getItem('historial')){
    //parse hace que devuelva el objeto a su forma original
    this._historial = JSON.parse( localStorage.getItem('historial')! );
  }
  */ 

  }

  //= '' -- espara obligar a que siempre tenga un valor
  buscarGifs(query:string = ''){
    //trim() elimina los espacios en blanco de ambos lados de una cadena.
    //toLOcaleLowerCase() es para que sean puras minusculas
    query = query.trim().toLocaleLowerCase();
    
    //includes si tiene o incluye lo que pongas en el argumento regresa un boolean
    //si no lo incluye en tonces muestralo se insertara si no existe
    //en este caso es para que no puedas meter palbras repetidas
    if(!this._historial.includes(query)){

    //El método unshift () agrega uno o más elementos al comienzo de una matriz y devuelve la nueva longitud de la matriz.
    //agrega elementos a un aray tanbien 
    this._historial.unshift(query);
    
    //splice hace que entre elementos en el array asta el 10 y despues los elimine
    this._historial = this._historial.splice(0,20);

    //localStorage espara que la informacion persita y quede gurdada en la memoria del navegador
    //setItem pide dos parametros en forma de un string
    //stringify llamar un objeto y lo trasforma en string -- guarda las busquedas en asidebar
    localStorage.setItem('historial', JSON.stringify(this._historial));
    
    }
    /*http://api.giphy.com/v1/gifs/search?api_key=o9tuaDZd79SgjbnMcDg5wKxN0whcp0JI&q=${ query }&limit=21
      trasformacion de la url para hacerla mas optima usando el httpparams
    */
    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','20')
          .set('q',query);

    //http es el nombre que biene del constructor y solo es de angular
    //<SearchGifsResponse> biene de la interface y dice que lo que pongas lusca como los elemetos del objeto
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
     /*subcribe tendra la resolucion del get y pertence a angular*/    
    .subscribe( ( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
    //guardar los gifs local se guardo por que tiene que estar en los resultados
    localStorage.setItem('gif',JSON.stringify(this.resultados));
    });

    //peticion http de forma normal en javascript
    /*fetch('http://api.giphy.com/v1/gifs/search?api_key=o9tuaDZd79SgjbnMcDg5wKxN0whcp0JI&q=pokemon&limit=10')
    .then(resp =>{
      resp.json().then(data => {console.log(data);
      })
    })*/

    //otanbien 
    /*async buscarGifs(query:string = ''){

    const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=o9tuaDZd79SgjbnMcDg5wKxN0whcp0JI&q=pokemon&limit=10')
    conts data = await resp.json();
    console.log(data);
    }
    */ 
  }
  
}
