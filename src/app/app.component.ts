import { Component } from '@angular/core';
import { AppserviceService } from './appservice.service';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phygital_loan_agent';
  netSpeed =0;
  backEvent = 0;
  constructor(private appService: AppserviceService, private router: Router){
    App.addListener('backButton', () => {

      if (this.router.url === '/home') {
        if (this.backEvent == 0) {
          Toast.show({
            text: 'Please click BACK again to exit!',
            duration: 'short'
          });
        }
  
        this.backEvent = this.backEvent + 1;
        setTimeout(() => {
          this.backEvent = 0;
        }, 2000);
        if (this.backEvent == 2) {
          // appService.bio = false;
          // localStorage.removeItem("bio");
          App.exitApp();
        }
      } else if (this.router.url.includes('/qrCode')) {
        router.navigate(['/home'])
      }
      else {
        window.history.back();
      }
  
  
      // if (this.backEvent !== 2) {
  
      // }
  
    })
  }
  ngOnInit(){
    this.appService.netSpeed.subscribe(speed=>{
      this.netSpeed = speed;
      console.log(speed);
      
    })
  }
 
}
