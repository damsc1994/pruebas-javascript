import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CamaraComponent } from './components/camara/camara.component';
import { PaypalComponent } from './components/paypal/paypal.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'camara', component: CamaraComponent},
  {path: 'paypal', component: PaypalComponent},
  {path: '**', component: InicioComponent}
];


export const ModuleProvider: any[] = [];
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
