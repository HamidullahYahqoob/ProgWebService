import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Towel } from './models/Towel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lab1';
  myWisdom : string = "Je suis ton frère Luc ... un truc du genre je n'ai jamais écouté Star Wars"
  n = 9
  
  myServiette : Towel = new Towel("rouge",1.8,"21614285_front_a01_@2.png",false)

  hateList : string[] = ["J'ai pas trop d'inspi","En faite il y a des chose que j'aime pas","Mais si je les écrits on va me sortir du cours"]

  
bruh():string{
  return "Bruh."
}

equalToN(m : number):string{
  if(m==this.n){
    return "Identique"
  }else{
    return "Différent"
  }
}


}
