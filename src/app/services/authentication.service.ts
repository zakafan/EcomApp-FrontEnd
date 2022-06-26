import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  public isAuthenticated: boolean = false;
  public userAuthenticated:any;
  public token: any;

private users=[
  {username:"admin", password:"1234",roles:['USER','ADMIN']},
    {username:"user1", password:"1234",roles:['USER']},
    {username:"user2", password:"1234",roles:['USER']}
]

  constructor() { }


public login(username:string,password:string){
  let user;
  this.users.forEach(u=>{
    if(u.username===username && u.password===password){
      user=u;
      this.token={username:u.username,roles:u.roles};
    }
  })
  if(user){
    this.isAuthenticated=true;
    this.userAuthenticated=user;
    
  }
  else{
    this.isAuthenticated=false;
    this.userAuthenticated=undefined;
  }
}

public isAdmin(){
  if(this.userAuthenticated){
    return this.userAuthenticated.roles.indexOf("ADMIN")>-1;
  }
  else return false;
}

public saveAuthenticatedUser(){
  if(this.userAuthenticated){
    localStorage.setItem('authToken',JSON.stringify(this.token));
  }

}

loadUser(){

  let user=localStorage.getItem('authenticatedUser');
  if(user){
    this.userAuthenticated=JSON.parse(user);
    this.isAuthenticated=true;
  }
}
logout(){
  this.isAuthenticated=false;
  this.userAuthenticated=undefined;
  localStorage.removeItem('authenticatedUser');
}


}


