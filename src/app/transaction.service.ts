import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public domain ='http://mvp-phygital-wallet.ap-south-1.elasticbeanstalk.com'
  constructor(public httpClient: HttpClient) { }
  public submitOfflineTx(signed:any):Observable<any>{
    return this.httpClient.post(this.domain +'/submitOfflineXrp',{signed:signed})
  }
  getOfflineTransactionHs= new Observable((observer)=>{
    Filesystem.readdir({path:'inbound',directory:Directory.Data}).then(res=>{
      observer.next(res.files);
    })
  })
}
