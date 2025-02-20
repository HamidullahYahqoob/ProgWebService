import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-i18n',
  standalone: true,
  imports: [FormsModule,TranslateModule],
  templateUrl: './i18n.component.html',
  styleUrl: './i18n.component.css'
})
export class I18nComponent {

  money : number = 30;
  number ?: number;

  language : string = "fr";

  constructor(public translator : TranslateService) { 
    translator.setDefaultLang(this.language);
  }


  ngOnInit() {}

  jouer(mise : number) : void{
    if(mise != undefined && mise >= 0 && mise <= 36){
      this.bet = mise;
      this.startGame();
    }
    else{
      alert("Hey arrête de niaiser 😠");
    }
  }

  jouerCouleur(color : string):void{
    this.bet = color;
    this.startGame();
  }

  changeLanguage(lang : string){

    this.language = lang; 
    this.translator.use(this.language);
  }
  // █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
  // █ Pas besoin de consulter le code à partir d'ici █
  // █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█

  ballSpeed : number = 0;
  ballTheta : number = 0;
  ballMover : any;
  gameActive : boolean = false;
  bet : any;

  startGame(){

    if(this.money < 5){
      alert("🐖 Tirelire vide ! 🐖");
      return;
    }
    if(this.gameActive){
      return;
    }
    this.money -= 5;
    this.gameActive = true;
    this.ballMover = setInterval(this.moveBall.bind(this), 25);
    this.ballSpeed = Math.round(Math.random() * 37) + 74; 

  }

  moveBall(){

    if(this.ballSpeed <= 0){
      clearInterval(this.ballMover);
      this.gameActive = false;
      this.ballTheta = this.ballTheta % (Math.PI * 2);
      let betTheta = (3.02 * Math.PI / 2 + this.bet * Math.PI / 37) % (Math.PI * 2);
      if(this.bet == "red"){
        betTheta = (Math.round(this.ballTheta * 37.04 / (Math.PI * 2)) + 9) % 37;
        console.log(betTheta);
        if(betTheta % 2 == 1){
          this.money += 10;
          document.getElementById("messageRoulette")!.textContent = "+10 $ 🤑";
        }
        else{
          document.getElementById("messageRoulette")!.textContent = "-5 $ 😥";
        }
      }
      else if(this.bet == "black"){
        betTheta = (Math.round(this.ballTheta * 37.04 / (Math.PI * 2)) + 9) % 37;
        if(betTheta > 0 && Math.round(betTheta) % 2 == 0){
          this.money += 10;
          document.getElementById("messageRoulette")!.textContent = "+10 $ 🤑";
        }
        else{
          document.getElementById("messageRoulette")!.textContent = "-5 $ 😥";
        }
      }
      else if(this.bet != undefined){
        let diff = Math.PI / (37 * 2);
        //betTheta = betTheta < 0 ? betTheta + 2 * Math.PI : betTheta;
        console.log("Pari : " + betTheta);
        console.log("Position : " + this.ballTheta);
        if(Math.abs(betTheta - this.ballTheta) < diff){
          this.money += 150;
          document.getElementById("messageRoulette")!.textContent = "+150 $ 🤑";
        }
        else{
          document.getElementById("messageRoulette")!.textContent = "-5 $ 😥";
        }
      }
    }
    else{
      this.ballTheta += Math.PI / 740 * this.ballSpeed;
      this.ballSpeed -= 0.5;
      let left = 473 + Math.cos(this.ballTheta) * 130;
      let top = 197 + Math.sin(this.ballTheta) * 130;
      document.getElementById("ball")!.style.left = left + "px";
      document.getElementById("ball")!.style.top = top + "px";
    }

  }

}
