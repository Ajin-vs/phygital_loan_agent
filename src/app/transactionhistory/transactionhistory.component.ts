import { Component } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.css']
})
export class TransactionhistoryComponent {
  offlineTransaction:any[] =[]
  constructor(private transactionService : TransactionService){}
  ngOnInit(){
    this.transactionService.getOfflineTransactionHs.subscribe((data:any)=>{
      data.map((tx:any)=>{
        let name = JSON.stringify(tx.name).split("|");
        console.log(JSON.stringify(data),"of history");
        
        // console.log(name[],"d");
        if(name[4] !== 'finance'){
          let tr ={
            date:name[0],
            // mobile:name[1]==JSON.parse(this.sender).mobile? name[4]:name[1],
            mobile:name[2],
            amount:name[1],
            // type: name[3].includes('debit')? 'debit':'credit'
          }
          this.offlineTransaction.push(tr);
        }
      
        // console.log(name);
        
      })
      // console.log(this.offlineTransaction);
      
    });
  }



}
