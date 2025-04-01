import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Review } from '../models/review';

const domain = "http://localhost:5141/";

@Injectable({
  providedIn: 'root'
})
export class GameReviewService {

  constructor(public http : HttpClient) { }

  // Si une des fonctions ci-dessous n'a pas de RETURN actuellement, c'est que vous n'aurez pas à en mettre.

  async register(username : string, email : string, password : string, passwordConfirm : string){

    let registerDTO = {
      username : username, 
      email : email,
      password:password,
      passwordConfirm:passwordConfirm

  };
  let x = await lastValueFrom(this.http.post<any>(domain+"api/Users/Register", registerDTO));
  console.log(x);

  }

  async login(username : string, password : string){

    let loginDTO =  {
      username : username,
      password : password
  };

  let x = await lastValueFrom(this.http.post<any>(domain + "api/Users/Login", loginDTO));
  console.log(x);

  localStorage.setItem("token", x.token);

  }

  async getReviews(){

    let x = await lastValueFrom(this.http.get<any>(domain + "api/Reviews/GetReview"));
    console.log(x);
      return x;

  }

  async postReview(text : string, game : string){

    let reviewDTO =  {
      text : text,
      game : game
  };

  let x = await lastValueFrom(this.http.post<any>(domain + "api/Reviews/PostReview", reviewDTO));
  console.log(x);
    return x;

  }

  async deleteReview(id : number){



  }

  async editReview(id : number, text : string){



  }

  async upvoteReview(id : number){



  }

}
