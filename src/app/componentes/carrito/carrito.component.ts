import { Component, Input, OnInit } from '@angular/core';
import { CestaService } from '../../services/cesta.service';
import { cestaItem } from '../../interfaces/cestaItem';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor(private cestaServ:CestaService) { }

  @Input() productos: cestaItem[] = []
  
  ngOnInit(): void {
    this.productos = this.cestaServ.getProductos();
    //console.log('THIS PRODUCTOS',this.productos);
  }

  deleteItem(cestaItem:cestaItem){
    
    //quiero eliminar el elemento de la cesta
    this.guardarLocalStorage();
    this.cestaServ.deleteProductToArray(cestaItem)
  }

  guardarLocalStorage(){
    const arrayCesta = this.cestaServ.getProductos();
    console.log('STRINGIFIED ARRAYCESTA', JSON.stringify(arrayCesta));
    localStorage.setItem('arrayCesta', JSON.stringify(arrayCesta))

}


}
