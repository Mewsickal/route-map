import { Component, OnInit } from '@angular/core';
import { StatusService } from '../status.service';
import { Status, Vehicle } from '../interfaces';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-status-map',
  templateUrl: './status-map.component.html',
  styleUrls: ['./status-map.component.css']
})
export class StatusMapComponent implements OnInit {

  statuses$: Observable<Status[]>;
  displayedColumns: string[] = ['notified', 'longitude', 'latitude', 'speed', 'vehicle'];

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.statuses$ = this.statusService.getLatestStatus();
  }
}