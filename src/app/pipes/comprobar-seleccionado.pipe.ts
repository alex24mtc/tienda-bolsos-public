import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comprobarSeleccionado'
})
export class ComprobarSeleccionadoPipe implements PipeTransform {

  transform(elementosFavoritos: string[], ...filtrosAplicar: unknown[]): unknown {

    //los args son los parametros que vas a necesitar para devolver el parametro deseado

    // const arrayDeTodosLosFavoritos;
    // const elIdDeEsteProducto;
    
    let arrayDeElementosFavoritos = elementosFavoritos;
    let productoUrl = filtrosAplicar[0] as string;
    let favorito = filtrosAplicar[1];
    console.log('PARAMETROS DEL PIPE', {
    arrayDeElementosFavoritos, productoUrl
    })
    
    
    return ( arrayDeElementosFavoritos.indexOf(productoUrl) >= 0 ) ? favorito : !favorito
    }

}
