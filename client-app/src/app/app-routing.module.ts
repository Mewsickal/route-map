import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusMapComponent } from './status-map/status-map.component';
import { VehicleStatusComponent } from './vehicle-status/vehicle-status.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

const routes: Routes = [
  { path: 'statusmap', component: StatusMapComponent },
  { path: 'vehiclestatus/:id', component: VehicleStatusComponent },
  { path: 'addvehicle', component: VehicleDetailsComponent },
  { path: '', redirectTo: '/statusmap', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
