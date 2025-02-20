import { Component } from '@angular/core';
import { Profile } from '../../models/profile';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stockage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stockage.component.html',
  styleUrl: './stockage.component.css'
})
export class StockageComponent {

  name ?: string; // Lié à un input
  age ?: number; // Lié à un input
  profile ?: Profile;
  jsonData : string | null = null;

  constructor() { }

  ngOnInit() {

    this.init(); // Ne pas toucher à cette ligne de code

    let profileStringData : string | null = sessionStorage.getItem("profile");

    if(profileStringData != null){
      // Reconvertir la donnée en son type d'origine
      this.profile = JSON.parse(profileStringData);
  }
    
  
  }

  createProfile() : void{
    if(!this.name || !this.age){
      return;
    }
    this.profile = new Profile(this.name, this.age, 20);

    if(this.profile != null){
      sessionStorage.setItem("profile", JSON.stringify(this.profile));
  }

  }

  clearProfile() : void{
    this.profile = undefined;
  }

  finJeu(){
    if(!this.gColActive[0] && !this.gColActive[1] && !this.gColActive[2]){
      this. gJeuActif = false;
        if(this.gImgCol[0][this.gIndex[0]] == this.gImgCol[1][this.gIndex[1]] && this.gImgCol[0][this.gIndex[0]] == this.gImgCol[2][this.gIndex[2]]){
          this.profile!.money += 5;
            document.getElementById("message")!.textContent = "Bien joué ! +5$ ";
        }
        else{
            document.getElementById("message")!.textContent = "Aïe. Meilleure chance la prochaine fois.";
        }
    }
  }

  // █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
  // █ Pas besoin de consulter le code à partir d'ici █
  // █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█

  gImgCol = [["cerise", "arcenciel", "bague", "huit", "melon", "foudre"],["arcenciel", "cerise", "huit", "bague", "foudre", "melon"],["bague", "cerise", "melon", "foudre", "huit", "arcenciel"]];
  gIndex = [0,0,0];
  // Le jeu est-il lancé ?
  gJeuActif = false;

  // Variables pour stocker les planificateurs des 3 colonnes
  gPlanificateurColonne : any[] = [];

  // Quelles colonnes sont en train de bouger ?
  gColActive = [false, false, false];

  init(){
      this.afficherIcones();
      
  }

  jouer(){
      if(this.profile == undefined || this.profile.money < 1 || this.gJeuActif == true){
          alert("Impossible de lancer le jeu.")
      }
      else{
          this.gPlanificateurColonne[0] = setInterval(this.changerColonne.bind(this), 200, 0);
          this.gPlanificateurColonne[1] = setInterval(this.changerColonne.bind(this), 200, 1);
          this.gPlanificateurColonne[2] = setInterval(this.changerColonne.bind(this), 200, 2);
          this.activerJeu();
      }
  }

  stop(i : number){
    if(this.gColActive[i]){
        clearInterval(this.gPlanificateurColonne[i]);
        document.getElementById("stop" + (i+1))!.style.display = "none";
        this.gColActive[i] = false;
        this.finJeu();
    }
  }

  changerColonne(i : number){
    this.gIndex[i] = (this.gIndex[i] + 1) % this.gImgCol[i].length;
    this.afficherColonne(this.gIndex[i], this.gImgCol[i], i + 1);
  }

  afficherIcones(){
    this.afficherColonne(this.gIndex[0], this.gImgCol[0], 1);
    this.afficherColonne(this.gIndex[1], this.gImgCol[1], 2);
    this.afficherColonne(this.gIndex[2], this.gImgCol[2], 3);
  }

  afficherColonne(index : number, tableau : any, col : number){
      for(let i = 1; i < 6; i++){
          let numImage = (index + (i - 3)) % tableau.length;
          numImage = numImage < 0 ? numImage + tableau.length : numImage;
          document.getElementById("col" + col + "row" + i)!.setAttribute("src", "../../assets/images/" + tableau[numImage] + ".png")
      }
  }

  activerJeu(){
      for(let index = 1; index < 4; index++){
          document.getElementById("stop" + index)!.style.display = "block";
      }
      this.profile!.money -= 1;
      this.gColActive[0] = true;
      this.gColActive[1] = true;
      this.gColActive[2] = true;
      document.getElementById("message")!.textContent = "C'est parti !";
      this.gJeuActif = true;
  }

}
