import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {
  public scanResult = ''
  scannerEnabled: boolean = false;
  sub: any = ''
  page: any = ''
  audio = new Audio("../../../assets/audio/success-1-6297.mp3");

  constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService) {

  }
  ngOnInit() {
    this.scannerEnabled = true;
    this.sub = this.route.snapshot.paramMap.get('recieve');
    console.log(this.sub);
  }
  scanCompleteHandler(event: any) {

  }
  public scanSuccessHandler(event: string) {
  
    
      let crtDate = new Date();
      let recive = event.split('|');
      let path = ''
      // console.log("here");

      // console.log(event);

      // console.log(`outbound/${crtDate}|${JSON.stringify(JSON.parse(recive[1]))}|${recive[2]}|'credit'.txt`,);
      if ( recive[4] != 'finance') {
        console.log("invalid data");
        // this.messageService.add({ severity: 'error', detail: 'invalid data' });

      }
      else {
        Filesystem.writeFile({
          path: `inbound/${crtDate}|${recive[2]}|${recive[3]}|'finance'.txt`,
          data: event,
          directory: Directory.Data,
          encoding: Encoding.UTF8
        }).then(res => {
          // let latestBalance =Number(localStorage.getItem('balance')) + Number(recive[2])
          // localStorage.setItem('balance',JSON.stringify(latestBalance) );
          this.audio.play();
          this.messageService.add({ severity: 'success', detail: 'Transaction Completed' });
          this.router.navigate(['/home'])
        })
      }
      
    
  }

  ngOnDestroy() {
    this.scannerEnabled = false
  }
}
