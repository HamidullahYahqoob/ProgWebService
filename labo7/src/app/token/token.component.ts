import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './token.component.html',
  styleUrl: './token.component.css'
})
export class TokenComponent {

  artistName : string = "";
  artist ?: Artist;

  constructor(public spotify : SpotifyService) { }

  ngOnInit() {
    this.spotify.connect();
    
  }

  async getArtist() : Promise<void>{
    this.artist= await this.spotify.searchArtist(this.artistName)
  }

  

}
