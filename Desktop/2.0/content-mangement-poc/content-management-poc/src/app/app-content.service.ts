import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppContentService {

  sendName: Subject<string> = new Subject();
  constructor() { }
}
