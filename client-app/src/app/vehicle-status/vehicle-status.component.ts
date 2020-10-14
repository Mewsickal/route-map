import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle, Status } from '../interfaces';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-vehicle-status',
  templateUrl: './vehicle-status.component.html',
  styleUrls: ['./vehicle-status.component.css']
})
export class VehicleStatusComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  vehicleStatus: Status[];
  vehicle: Vehicle;
  displayedColumns: string[] = ['notified', 'longitude', 'latitude', 'speed'];

  constructor(private route: ActivatedRoute, private statusService: StatusService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getVehicleStatus(this.id);
  }

  getVehicleStatus(vehicleId): void {
    this.statusService.getVehicleStatus(vehicleId)
      .subscribe(vehicleSt => {
        this.vehicleStatus = vehicleSt;
        this.vehicle = vehicleSt[0].vehicle
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
