export interface IMessage {
  message: String;
  date: any;
}
export class Message implements IMessage {
  message: String; date: any;
  constructor(Msg: String, Date: any) {
    this.message = Msg;
    this.date = Date;
  }

}
