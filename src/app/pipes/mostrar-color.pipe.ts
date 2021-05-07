import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Pipe({
  name: 'mostrarColor'
})
export class MostrarColorPipe implements PipeTransform {

  transform(value: Producto, ...args: unknown[]): unknown {
    if(args[0] === 'todos'){
      return value.img[0]
      }else{
      return `${value.url}_${args[0]}.jpeg`
  
  }

}

}
