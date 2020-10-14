import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';
import { Status, Vehicle } from '../interfaces';

@Component({
  selector: 'app-status-map',
  templateUrl: './status-map.component.html',
  styleUrls: ['./status-map.component.css']
})
export class StatusMapComponent implements OnInit {

  statuses: Status[];
  displayedColumns: string[] = ['notified', 'longitude', 'latitude', 'speed', 'vehicle'];

  constructor(private statusService: StatusService) { }

  getStatuses(): void {
    this.statusService
      .getLatestStatus()
      .subscribe(response => this.statuses = response);
  }

  ngOnInit(): void {
    this.getStatuses();
  }
}