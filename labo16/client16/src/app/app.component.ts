import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Review } from './models/review';
import { GameReviewService } from './services/game-review.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  reviews : Review[] = [];

  // Inscription
  regUsername : string = "";
  regEmail : string = "";
  regPass : string = "";
  regPassCon : string = "";

  // Connexion
  logUsername : string = "";
  logPass : string = "";

  // Ajouter une critique
  gameName : string = "";
  reviewText : string = "";

  // Éditer une critique
  toggleEdit : boolean = false;
  reviewEditedText : string = "";
  reviewId : number = 0;

  constructor(public gameReview : GameReviewService){}

  async ngOnInit(){
    this.reviews = await this.gameReview.getReviews();
  }

  register(){
    this.gameReview.register(this.regUsername, this.regEmail, this.regPass, this.regPassCon);
  }

  login(){
    this.gameReview.login(this.logUsername, this.logPass);
  }

  logout(){
    localStorage.removeItem("token");
  }

  async addReview(){
    this.reviews.push(await this.gameReview.postReview(this.reviewText, this.gameName));
  }

  startEdit(review : Review){
    this.toggleEdit = !this.toggleEdit
    this.reviewId = review.id;
    this.reviewEditedText = review.text;
  }

  editReview(review : Review){
    this.gameReview.editReview(review.id, this.reviewEditedText);
    review.text = this.reviewEditedText;
    this.toggleEdit = false;
  }

  async upvoteReview(id : number){
    await this.gameReview.upvoteReview(id);
    this.reviews = await this.gameReview.getReviews();
  }

  async deleteReview(id : number){
    await this.gameReview.deleteReview(id);
    for(let i = this.reviews.length - 1; i >= 0; i--){
      if(this.reviews[i].id == id){
        this.reviews.splice(i, 1);
      }
    }
  }

}
