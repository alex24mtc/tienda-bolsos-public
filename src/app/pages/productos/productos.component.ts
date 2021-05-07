import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { Filtro } from '../../interfaces/filtro';
import { CestaService } from '../../services/cesta.service';
import { FiltroColorService } from 'src/app/services/filtro-color.service';


@Component({
selector: 'app-productos',
templateUrl: './productos.component.html',
styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

productos: Producto[] = []
productosMostrar: Producto[] = []

elementosFavoritos = (localStorage.getItem('elementosFavoritos')   )     ?  localStorage.getItem('elementosFavoritos').split(',') :   [];//existe este elemento en el local storage ? Si existe me lo asignas en esta propiedad
mostrarFavoritos:boolean= true;
colorSeleccionado;
//si no existe le asignamos un empty array

//si existe el string, tendre que hacer algo hay un metodo aplicable a los strings,

constructor(
private db: AngularFirestore,
private router: Router,
private cestaServ: CestaService,
private filtro_Color:FiltroColorService


) {
    console.log('ELEMENTOS FAVORITOS AL INICIALIZAR',this.elementosFavoritos);
}

comprobarSiEstaSeleccionado(producto:Producto){     

    // (this.elementosFavoritos.index0f(producto.url) >= 0 )
    
        return (this.elementosFavoritos.indexOf(producto.url) >=0 );
    //quiero saber si este elemento esta dentro del array de favoritos y que si esta me digas TRUE
    
    //si no esta me devuelves un FALSE
    

    
    }
    
selectFavorite(producto: Producto){

   //cuando seleccione aqui, quiero invertir el estado de mostrarFavorito
    console.log('MOSTRAR FAVORITO ANTES',this.mostrarFavoritos);
   this.mostrarFavoritos = !this.mostrarFavoritos;
   console.log('MOSTRAR FAVORITO DESPUES',this.mostrarFavoritos);



    // (this.elementosFavoritos.index0f(producto.url) >= 0 )  ? null : this.elementosFavoritos.push(producto.url);
   //                   si se cumple esta condicion = null              no se cumple, se añade el valor con el push (se añade el indice)


   const comprovarSiEseElementoEstaDentro = this.elementosFavoritos.indexOf(producto.url);
   
   if (comprovarSiEseElementoEstaDentro >=0){

   }else{
    this.elementosFavoritos.push(producto.url);
   }

   localStorage.setItem('elementosFavoritos',this.elementosFavoritos.toString())

   console.log(this.elementosFavoritos);
}



deselectFavorite(producto){

//cuando seleccione aqui, quiero invertir el estado de mostrarFavorito
console.log('MOSTRAR FAVORITO ANTES',this.mostrarFavoritos);
this.mostrarFavoritos = !this.mostrarFavoritos;
console.log('MOSTRAR FAVORITO DESPUES',this.mostrarFavoritos);



//INPUTS

//Array de elementos favoritos

//producto que hay que desseleccionar, que se llama producto

const idProductoADeseleccionar = producto.url;

//1.    ['brooklyn','neceser-carpincho','billetera-hombre'];

const index = this.elementosFavoritos.indexOf(producto.url);

//2. eliminarlo si existe en el array

if(index >= 0 ){

    this.elementosFavoritos.splice( index, 1 );
    //elementosFavoritos
    localStorage.setItem('elementosFavoritos',this.elementosFavoritos.toString())

    console.log('elementos favoritos despues del splice',this.elementosFavoritos)
    //quiero que este array elementos,guardarlo en el localStorage


    // si el elemento esta en el array lo elimino
}else{

}

console.log(this.elementosFavoritos);

//RESULTADO

//quitar del array de productos favoritos un elemento


}




filtrarProductos(filtro: Filtro){
console.log('filtro que viene del hijo', filtro);
this.colorSeleccionado = filtro.color;
this.filtro_Color.set(filtro.color);
console.log('color',this.colorSeleccionado);


/// filtrar primero el texto
const arrayFiltrandoTexto = this.filtrarTexto( this.productos, filtro);

/// filtro el precio
const arrayFiltrandoPrecio = this.filtrarPrecio( arrayFiltrandoTexto, filtro);

/// filtro el color
const arrayFiltrandoColor = this.filtrarColor( arrayFiltrandoPrecio, filtro);
this.colorSeleccionado = filtro.color;

/// filtro el tipo
const arrayFiltrandoTipo = this.filtrarTipo( arrayFiltrandoColor, filtro);


this.productosMostrar = [... arrayFiltrandoTipo];


}




filtrarTexto(array: Producto[], filtro: Filtro) : Producto[]{


const texto = filtro.texto;

// no es verdad , o que no existe , o que es null, o que es false; -1, '', null, undefined,

if(! texto){
return array
} else {
return array.filter((producto: Producto)=>{
const nombre = producto.nombre.toLowerCase().trim()
return nombre.includes(texto.toLowerCase().trim());
})
}
}

filtrarPrecio(array: Producto[], filtro: Filtro): Producto[]{
console.log('FILTRO PRECIO', filtro)
const precioMaximo = filtro.precio.precioMaximo;
const precioMinimo = filtro.precio.precioMinimo;

return array.filter((producto: Producto)=>{
const precioDeEsteProducto = this.cestaServ.precioFinal(producto);
return ( precioDeEsteProducto > precioMinimo ) && ( precioDeEsteProducto < precioMaximo)
})
}

filtrarColor(array: Producto[], filtro: Filtro): Producto[]{

const color = filtro.color;
this.filtro_Color.set(filtro.color);

if( !color || ( color === 'todos' ) ){ // si el color es igual a 'todos'
return array // no apliques ningun filtro
}else{
return array.filter((producto: Producto)=>{
const arrayDeColoresDisponibles = producto.colores;

return arrayDeColoresDisponibles.includes(color)
})
}
}

mostrarColor(producto:Producto){
    if(this.colorSeleccionado === 'todos'){
    return producto.img[0]
    }else{
    return `${producto.url}_${this.colorSeleccionado}.jpeg`
    }
    }

filtrarTipo(array: Producto[], filtro: Filtro): Producto[]{
const tipo = filtro.tipo; // si el tipo es 'todos'
if( !tipo || (tipo === 'todos') ){ // no apliques ningun filtro
return array
}else{
return array.filter((producto:Producto)=>{
return producto.tipo === tipo
})
}
}

ngOnInit(): void {
this.db.collection('productos').valueChanges().subscribe(( res )=>{
this.productos = res as Producto[];
this.filtrarProductos({
precio:{
precioMaximo: localStorage.getItem('precioMaximo') ? parseInt(localStorage.getItem('precioMaximo')) : 0,
precioMinimo: localStorage.getItem('precioMinimo') ? parseInt(localStorage.getItem('precioMinimo')) : 100
},
tipo: localStorage.getItem('tipo') ? localStorage.getItem('tipo') : 'todos',
color: localStorage.getItem('color') ? localStorage.getItem('color') : 'todos',
texto: localStorage.getItem('texto') ? localStorage.getItem('texto') : null,
});

})

}

navegar(i){
console.log('navegar', i);
this.router.navigate([ 'detalle-producto', i ])
}

}