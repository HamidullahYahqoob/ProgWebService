import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  @Input() review : Review | null = null;

  constructor(public reviewService : ReviewService){}

  async delete(review : Review){
    this.reviewService.deleteReview(review.id);
    review.text = "Commentaire supprimé.";
    review.author = "";
  }

}
