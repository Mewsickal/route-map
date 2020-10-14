import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status-map',
  templateUrl: './status-map.component.html',
  styleUrls: ['./status-map.component.css']
})
export class StatusMapComponent implements OnInit {

  statuses: any;

  constructor(private statusService: StatusService) { }

  getStatuses(): void {
    this.statusService
      .getLatestStatus()
      .subscribe(response => this.statuses = JSON.stringify(response));
  }

  ngOnInit(): void {
    this.getStatuses();
  }
}