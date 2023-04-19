import { Component } from '@angular/core';
import { AppserviceService } from './appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phygital_loan_agent';
  netSpeed =0;
  constructor(private appService: AppserviceService){
    
  }
  ngOnInit(){
    this.appService.netSpeed.subscribe(speed=>{
      this.netSpeed = speed;
      console.log(speed);
      
    })
  }

}
