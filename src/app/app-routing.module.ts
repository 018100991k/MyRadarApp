//De Angular
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { IsloggedInGuard } from '@Guards/islogged-in.guard';
import { hasRoleGuard } from '@Guards/has-role.guard';

// Componentes
import { InicioComponent } from '@Components/inicio/inicio.component';
import { LoginComponent } from '@Components/login/login.component';
import { RegistrarUsuarioComponent } from '@Components/registrar-usuario/registrar-usuario.component';
import { RestablecerPasswordComponent } from '@Components/restablecer-password/restablecer-password.component';
import { VerificarCorreoComponent } from '@Components/verificar-correo/verificar-correo.component';
import { DashboardComponent } from '@Components/dashboard/dashboard.component';
import { DashboardAdminComponent } from '@Components/dashboard-admin/dashboard-admin.component';
import { DashboardPartnerComponent } from '@Components/dashboard-partner/dashboard-partner.component';
import { AgregarUsuarioComponent } from '@Components/agregar-usuario/agregar-usuario.component';
import { SimuladorComponent } from '@Components/simulador/simulador.component';
import { UbicanosComponent } from '@Components/ubicanos/ubicanos.component';
import { EditarUsuarioComponent } from '@Components/editar-usuario/editar-usuario.component';
import { FiltrosComponent } from '@Components/filtros/filtros.component';
import { AdministrarUsuariosComponent } from '@Components/administrar-usuarios/administrar-usuarios.component';
import { AdministrarArchivosComponent } from '@Components/administrar-archivos/administrar-archivos.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'restablecer-password', component: RestablecerPasswordComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'addUser', component: AgregarUsuarioComponent },
  { path: 'editUser', component: EditarUsuarioComponent },
  { path: 'editUser/:usuarioID', component: EditarUsuarioComponent },
  { path: 'simulador', component: SimuladorComponent },
  { path: 'ubicanos', component: UbicanosComponent },
  { path: 'filtrar', component: FiltrosComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canMatch: [hasRoleGuard],
    data: { allowedRoles: ['admin'] },
    children: [
      {
        path: 'admin',
        component: AdministrarUsuariosComponent,
      },
      { path: 'filtrar', component: FiltrosComponent },
      { path: 'adminDocs', component: AdministrarArchivosComponent },
    ],
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardAdminComponent,
  //   canMatch: [IsloggedInGuard, hasRoleGuard],
  //   data: { allowedRoles: ['admin'] },
  // },
  {
    path: 'dashboard',
    component: DashboardPartnerComponent,
    canMatch: [hasRoleGuard],
    data: { allowedRoles: ['soc'] },
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
