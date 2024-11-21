import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  events = ['newUser', 'byeUser'];
  cbEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private socket: Socket) {
    this.Listener();
  }

  Listener = () => {
    this.events.forEach((eventName) => {
      this.socket.on(eventName, (data: any) => {
        this.cbEvent.emit({ name: eventName, data });
      });
    });
  };

  JoinRoom = (data: string) => {
    this.socket.emit('join', data);
  };
}
