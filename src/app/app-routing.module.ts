import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'history', component: TransactionhistoryComponent
  },
{
  path:'qrScanner',component:QrScannerComponent
},

  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
