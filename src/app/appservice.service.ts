import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  netSpeed = new BehaviorSubject(0);
  constructor() { }
}
