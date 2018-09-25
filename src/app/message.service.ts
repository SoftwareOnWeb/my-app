import { Injectable } from '@angular/core';
import { IMessage, Message } from './MyMessage';
@Injectable({
  providedIn: 'root'
})

export class MessageService {
  message: IMessage[] = [];
  constructor() { }
  add(msg: String) {
    this.message.push(new Message(msg, new Date().toString()));
  }
  getAllMessages(): IMessage[] {
    return this.message;
  }
  clearAll(): void { this.message = []; }
}
