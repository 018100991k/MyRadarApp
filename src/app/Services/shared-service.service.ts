import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  private isNavbarBlockedSubject = new BehaviorSubject<boolean>(false);
  isNavbarBlocked$ = this.isNavbarBlockedSubject.asObservable();

  private sidebarWidthSubject = new BehaviorSubject<string>('20vw');
  sidebarWidth$ = this.sidebarWidthSubject.asObservable();

  constructor() {}

  toggleNavbarBlockedStatus(status: boolean) {
    // // Cambia la visibilidad del navbar en función del bloqueo
    this.isNavbarBlockedSubject.next(status);
  }

  updateSidebarWidth(width: string) {
    this.sidebarWidthSubject.next(width);
  }
}
