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
      id:0,
      text : text,
      game : game
  };

  let x = await lastValueFrom(this.http.post<any>(domain + "api/Reviews/PostReview", reviewDTO));
  console.log(x);
    return x;

  }

  async deleteReview(id : number){

    let x = await lastValueFrom(this.http.delete<any>(domain + "api/Reviews/DeleteReview/"+id));
    console.log(x);
  

  }

  async editReview(id : number, text : string){

    let reviewDTO =  {
      id:id,
      text : text,
      game:"NimporteQuoi"
  };

    let x = await lastValueFrom(this.http.put<any>(domain + "api/Reviews/EditReview/"+id,reviewDTO));
    console.log(x);


  }

  async upvoteReview(id : number){


    let x = await lastValueFrom(this.http.put<any>(domain + "api/Reviews/UpvoteReview/"+id,null));
    console.log(x);
  }

}
