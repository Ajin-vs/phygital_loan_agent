import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Network } from '@capacitor/network';
import { MessageService } from 'primeng/api';
import {SpeedTestService} from 'ng-speed-test';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  audio = new Audio("../../../assets/audio/success-1-6297.mp3");
  alertAudio = new Audio("../../../assets/audio/error-call-to-attention-129258.mp3");
  public connectionStatus: boolean = false;
  spinner = false;
  netSpeed=0;

  constructor(private messageService: MessageService, private router: Router,private speedTestService:SpeedTestService,private transationService: TransactionService) { }
  ngOnInit() {
    this.generateDirectory();

    Network.getStatus().then(status => {
      this.connectionStatus = status.connected;
      if (!this.connectionStatus) {
        // this.balance = localStorage.getItem('balance');
        this.netSpeed =0;
      } else {
        this.getNetSpeed();
      }
    });

    Network.addListener('networkStatusChange', status => {
      this.getNetSpeed();
      this.connectionStatus = status.connected;
      if (this.connectionStatus) {
        setInterval(()=>{
          this.getNetSpeed();
        },5000)
        // this.getBalance();
      }
      else {
        this.netSpeed =0;
      }
    });
  }
  qrScanner() {
    this.router.navigateByUrl('/qrScanner')
  }
  onlineSync() {
 
    Filesystem.readdir({
      path: '/inbound',
      directory: Directory.Data
    }).then((data) => {
      console.log(data,"inbound");
      if (!(data.files.length > 0)) {
        this.messageService.add({ severity: 'error', detail: 'There are No offline transactions to zync' });
        this.alertAudio.play();
      }
      else {
        if (this.connectionStatus) {

          this.spinner = true;
          let lastEle = data.files.length - 1
          data.files.map((transactions, index) => {
            Filesystem.readFile({
              path: `inbound/${transactions.name}`,
              directory: Directory.Data,
              encoding: Encoding.UTF8,
            }).then(data => {
              let res = JSON.stringify(data.data).split('|')[0];
              let signed = res.slice(1);
              this.transationService.submitOfflineTx(signed).subscribe(res => {
                Filesystem.deleteFile({
                  path: `inbound/${transactions.name}`,
                  directory: Directory.Data,
                }).then(dele => {
                  if (lastEle == index) {
                    this.audio.play();
                    this.messageService.add({ severity: 'success', detail: 'Offline transactions were synced' });
                    this.spinner = false;
                  }
                })


              })
              // console.log(JSON.stringify(data.data).split('|')[0].slice(0,1));
            })
          })
        }
        else {
          this.messageService.add({ severity: 'error', detail: 'No internet connection.' });
        }
      }
    }
    )
      .catch(err => {
        this.messageService.add({ severity: 'error', detail: 'There are No offline transactions to zync' });
      })
  }
  getNetSpeed(){
    try {
      this.speedTestService.getKbps(
        {
          iterations: 10,
          retryDelay: 1500,
        }
      ).subscribe(
        (speed) => {
          this.netSpeed =speed;
          // console.log('Your speed is ' + speed);
        }
      )
    } catch (error) {
      console.log(error);
      
    }
   
  }
  generateDirectory() {

    Filesystem.readdir({
      path: 'inbound',
      directory: Directory.Data
    }).then(data => { })
      .catch(err => { Filesystem.mkdir({ path: 'inbound', directory: Directory.Data }) })
  }
}
