import { Component } from '@angular/core';
import { Song } from './models/song';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(public http : HttpClient){}

  key = "9a8a3facebbccaf363bb9fd68fa37abf"


  artistName : string = "";
  genre : string = "";

  similarArtists : string[] = [];
  topSongs : Song[] = [];

  errorMessage ="";
  errorMessage2 ="";

  async getSimilarArtists(){

    this.similarArtists=[]

    try{
      let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+this.artistName+"&api_key="+this.key+"&format=json"));
      console.log(x);
   
      for(let a of x.similarartists.artist){
       this.similarArtists.push(a.name)
      }

      this.errorMessage= ""
    }
    catch(error){
      this.errorMessage="Réessayez avec un artiste qui existe!"
    }
   

  }

  async getTopSongs(){
this.topSongs=[]
    console.log(this.genre)
      let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag="+this.genre+"&api_key="+this.key+"&format=json"));
      console.log(x);
       
      
      for(let s of x.tracks.track){
        this.topSongs.push(new Song(s.name,s.artist.name,s.duration))
       }

      this.errorMessage2=""
       

   if(this.topSongs.length==0){
this.errorMessage2="Réessayez avec un genre qui existe!"
   }
      
    
    
  
  }

}
