

export class User {
  id: number =0;
  email: string ='';
  userName: string ='';
  surName: string='';
  adress : string='';
  gsm: string ='';
  userType: UserType = 0;


}

export enum UserType {
  Admin,
  User,
}


