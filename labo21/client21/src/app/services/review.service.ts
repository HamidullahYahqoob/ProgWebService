import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Review } from '../models/review';

const domain = "https://localhost:7033/api/";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(public http : HttpClient) { }

  private usernameSignal : WritableSignal<string|null> = signal(null);

  readonly username : Signal<string|null> = this.usernameSignal.asReadonly();


  private roleSignal : WritableSignal<string[]> = signal([]);

  readonly roles : Signal<string[]> = this.roleSignal.asReadonly();

  async register(username : string, password : string, passwordConfirm : string){

    let registerDTO = {
      username : username,
      password : password,
      passwordConfirm : passwordConfirm
    };

    let x = await lastValueFrom(this.http.post<any>(domain + "Users/Register", registerDTO));
    console.log(x);

  }

  async login(username : string, password : string){

    let loginDTO = {
      username : username,
      password : password
    };

    let x = await lastValueFrom(this.http.post<any>(domain + "Users/Login", loginDTO));
    console.log(x);

    localStorage.setItem("user", x.userName);
    this.usernameSignal.set(x.userName)

    localStorage.setItem("roles",JSON.stringify(x.roles))
    this.roleSignal.set(x.roles);

    localStorage.setItem("token", x.token);

  }

  async logout(){


    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.usernameSignal.set(null);
    localStorage.removeItem("roles");
    this.roleSignal.set([]);


  }

  async getReviews() : Promise<Review[]>{

    let x = await lastValueFrom(this.http.get<Review[]>(domain + "Reviews/GetReview"));
    console.log(x);

    return x;

  }

  async postReview(text : string) : Promise<Review>{

    let reviewDTO = { text : text };

    let x = await lastValueFrom(this.http.post<any>(domain + "Reviews/PostReview", reviewDTO));
    console.log(x);

    return x;

  }

  async deleteReview(id : number){

    let x = await lastValueFrom(this.http.delete<any>(domain + "Reviews/DeleteReview/" + id));
    console.log(x);

  }

  setUsername(username : string | null){
    this.usernameSignal.set(username);
}

setRoles(roles : string[]){
    this.roleSignal.set(roles);
}

}
