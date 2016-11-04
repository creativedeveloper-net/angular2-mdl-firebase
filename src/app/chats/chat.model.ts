import { ChatData } from './chat-data.model';

export class Chat {
  author: string;
  data = new ChatData();
  public: boolean = false;
}
