import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PasarelaComponent } from './pages/pasarela/pasarela.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { HttpPageComponent } from './componentes/http-page/http-page.component';
import { AnimacionesComponent } from './componentes/animaciones/animaciones.component';

const routes: Routes = [
  // Pagina principal
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'pasarela',
    component: PasarelaComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    // es un url dinamico :id
    path: 'detalle-producto/:id',
    component: DetalleProductoComponent,
  },

  {
    path:'http-client',
    component:HttpPageComponent,

  },

  {
    path:'animaciones',
    component:AnimacionesComponent,

  },
  // si ponen cualquier url y va al final de las rutas
  {
    path: '**',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
