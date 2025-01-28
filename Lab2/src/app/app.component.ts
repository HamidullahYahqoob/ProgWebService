import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VideoGame } from './models/videogame';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Servira plus tard
  videoGames : VideoGame[] = [];


  loveList : string[] = ["argent","défi","voyage"]

  userAge:number=19

  minuterie:number = 10

  reduit():number{
    if(this.minuterie>0)
    return this.minuterie--
  else
  return this.minuterie

  }

  theme:string = "light"

  changetheme(){
    if(this.theme == "light"){
      this.theme = "dark"
    }
    else{
      this.theme="light"
    }
  }

  nom:string=""

  alerte(){
    if(this.nom !=""){
      alert("Salut " + this.nom)
    }
  }

  couleur:string = "lightcyan"


  vgName:string ="";
  vgNbPlayers:number=0;
  vgReleased:boolean=false;
  vgGenre:string="";
  vgMode:string="";

  ajouterJeu(){
    if(this.vgName =="" || this.vgNbPlayers<0 || this.vgGenre == "" || this.vgMode==""){
      return;
    }

    this.videoGames.push(new VideoGame(this.vgName,this.vgNbPlayers,this.vgReleased,this.vgGenre.split(','),this.vgMode))
  }

}

