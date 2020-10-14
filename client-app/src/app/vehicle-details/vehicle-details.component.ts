import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusService } from '../status.service';
import { Vehicle } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent {
  vehicleForm = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private statusService: StatusService,
    private router: Router) { }

  onSubmit() {
    let name = this.vehicleForm.value.name;
    if (name == null) {
      return;
    }
    let vehicle: Vehicle = {
      id: 1,
      name: name,
      statuses: null
    };

    this.statusService.createVehicle(vehicle)
      .subscribe();

    this.router.navigate(['/statusmap']);

  }
}
