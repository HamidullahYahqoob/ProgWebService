import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostComponent } from './post/post.component';
import { ReviewService } from './services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from './models/review';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  registerUsername : string = "";
  registerPassword : string = "";
  registerPasswordConfirm : string = "";

  loginUsername : string = "";
  loginPassword : string = "";

  newText : string = "";

  reviews : Review[] = [];

  pseudo: string|null = null;

  travaux : string[]=[];

  constructor(public reviewService : ReviewService){}

  async ngOnInit(): Promise<void> {
    
    this.reviews = await this.reviewService.getReviews();

    // Ajouter du code ici

    this.pseudo = localStorage.getItem("user")
    this.reviewService.setUsername(this.pseudo);

    

    let guestStringData : string | null = localStorage.getItem("roles");

    if(guestStringData != null){
        
        this.travaux = JSON.parse(guestStringData);

    }

    this.reviewService.setRoles(this.travaux);
    console.log(this.reviewService.roles());
  }

  login(){
    this.reviewService.login(this.loginUsername, this.loginPassword);
  }

  register(){
    this.reviewService.register(this.registerUsername, this.registerPassword, this.registerPasswordConfirm);
  }

  logout(){
    this.reviewService.logout();
  }

  async postReview(){
    if(this.newText == "") return;
    this.reviews.push(await this.reviewService.postReview(this.newText));
  }

}
