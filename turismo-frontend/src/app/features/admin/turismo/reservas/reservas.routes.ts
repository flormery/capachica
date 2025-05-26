import { Routes } from '@angular/router';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { ReservaFormComponent } from './reserva-form/reserva-form.component';
import { ReservaDetailComponent } from './reserva-detalles/reserva-detalles.component';
import { ReservaCalendarioComponent } from './reserva-calendario/reserva-calendario.component';
import { ReservaServicioComponent } from './reserva-servicio/reserva-servicio.component';

export const RESERVAS_ROUTES: Routes = [
  {
    path: '',
    component: ReservaListComponent
  },
  {
    path: 'create',
    component: ReservaFormComponent
  },
  {
    path: 'edit/:id',
    component: ReservaFormComponent
  },
  {
    path: 'detail/:id',
    component: ReservaDetailComponent
  },
  {
    path: 'calendario',
    component: ReservaCalendarioComponent
  },
  {
    path: 'servicio/:id',
    component: ReservaServicioComponent
  },
  {
    path: 'emprendedor/:id',
    component: ReservaListComponent
  }
];