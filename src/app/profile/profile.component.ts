import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uinfo:any;
  role=sessionStorage.getItem('role')
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    if(this.role==='U'){
      this.api.getcustomerdetails(sessionStorage.getItem('id'))
      .subscribe({
        next:resp=>this.uinfo=resp.data
      })
    }
  }

}
