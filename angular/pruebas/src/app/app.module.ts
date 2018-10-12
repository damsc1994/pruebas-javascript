import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ModuleProvider, RoutingModule } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { CamaraComponent } from './components/camara/camara.component';
import { HttpModule } from '@angular/http';
import { PaypalComponent } from './components/paypal/paypal.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CamaraComponent,
    PaypalComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    WebcamModule,
    HttpModule,
    FormsModule
  ],
  providers: [ ModuleProvider ],
  bootstrap: [AppComponent]
})
export class AppModule { }
