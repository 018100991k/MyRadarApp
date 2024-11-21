import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* modulos */
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* firebase */
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

/* componentes */
import { AppComponent } from './app.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrarUsuarioComponent } from './Components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './Components/verificar-correo/verificar-correo.component';
import { RestablecerPasswordComponent } from './Components/restablecer-password/restablecer-password.component';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { enviroments } from 'src/Enviroments/enviroments';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { DashboardPartnerComponent } from './Components/dashboard-partner/dashboard-partner.component';
import { AdministrarUsuariosComponent } from './Components/administrar-usuarios/administrar-usuarios.component';
import { AgregarUsuarioComponent } from './Components/agregar-usuario/agregar-usuario.component';
import { SimuladorComponent } from './Components/simulador/simulador.component';
import { UbicanosComponent } from './Components/ubicanos/ubicanos.component';
import { EditarUsuarioComponent } from './Components/editar-usuario/editar-usuario.component';
import { FiltrosComponent } from './Components/filtros/filtros.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AdministrarArchivosComponent } from './Components/administrar-archivos/administrar-archivos.component';
import { UCarruselImgComponent } from './Components/ucarrusel-img/ucarrusel-img.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RestablecerPasswordComponent,
    SpinnerComponent,
    DashboardComponent,
    DashboardAdminComponent,
    DashboardPartnerComponent,
    AdministrarUsuariosComponent,
    AgregarUsuarioComponent,
    SimuladorComponent,
    UbicanosComponent,
    EditarUsuarioComponent,
    FiltrosComponent,
    SidebarComponent,
    NavbarComponent,
    AdministrarArchivosComponent,
    UCarruselImgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Agrega FormsModule aquí
    // Inicializa AngularFire con tu configuración de Firebase

    AngularFireModule.initializeApp(enviroments.firebaseConfig),
    provideFirebaseApp(() => initializeApp(enviroments.firebaseConfig)), // Agrega el proveedor de la aplicación de Firebase
    provideStorage(() => getStorage()), // Agrega el proveedor de almacenamiento
    provideAuth(() => getAuth()),
    AngularFirestoreModule, // Agrega el módulo AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
