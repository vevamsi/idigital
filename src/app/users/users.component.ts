import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  list:any[]
  p:number=1;
  constructor(private api:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
   // this.loadData()
   this.route.queryParams.subscribe(params=>{
    console.log(params)
    const search=params['search']  
      if(search)
      this.loadsearchresult(search)
      else
      this.loadData()
  })
}

loadsearchresult(search:string){
  this.api.searchcustomers(search).subscribe({
    next:resp=>this.list=resp
  })
}

  loadData(){
    this.api.listcustomers().subscribe({
      next:resp=>this.list=resp
    })
  }
}
