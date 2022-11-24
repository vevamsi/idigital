import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data:any
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.dashboard().subscribe({
      next:resp=>this.data=resp.data
    })
  }

}
