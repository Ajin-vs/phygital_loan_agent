import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ButtonModule} from 'primeng/button';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FooterComponent } from './footer/footer.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpeedTestModule } from 'ng-speed-test';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    FooterComponent,
    TransactionhistoryComponent,
    QrScannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    OverlayPanelModule,
    ZXingScannerModule,
    SpeedTestModule,
    HttpClientModule
  ],
  providers: [MessageService],

  bootstrap: [AppComponent]
})
export class AppModule { }
