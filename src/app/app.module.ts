import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

/************************* COMPONENTS ************************************** */
import { OpcionesComponent } from './opciones/opciones.component';
import { LoginBoComponent } from './login-bo/login-bo.component';
import { ClienteJuridicoComponent } from './cliente-juridico/cliente-juridico.component';
import { ClienteNaturalComponent } from './cliente-natural/cliente-natural.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CreditosComponent } from './creditos/creditos.component';
import { NuevaCuentaComponent } from './nueva-cuenta/nueva-cuenta.component';
import { NuevoCreditoComponent } from './nuevo-credito/nuevo-credito.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { TransaccionCanceladaComponent } from './transaccion-cancelada/transaccion-cancelada.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OpcionesComponent,
    LoginBoComponent,
    ClienteJuridicoComponent,
    ClienteNaturalComponent,
    CreditosComponent,
    ClientesComponent,
    CuentasComponent,
    NuevaCuentaComponent,
    NuevoCreditoComponent,
    RegistrarseComponent,
    TransaccionCanceladaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
