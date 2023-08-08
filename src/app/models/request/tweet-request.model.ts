import { User } from "../user.model";

export class TweetRequest {
    id : number = 0;
    tweet_no : number = 0;
    tweet_date : string = '';
    tweet_title : string = ''; 
    tweet_text : string = '' ;
    user_id: number = 0;
  }
  