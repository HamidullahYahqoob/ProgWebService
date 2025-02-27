## Faire une classe avec typeScript : 
Crée un dossier app/models \
Nom de la classe avec un Majuscule, et fini avec .ts
```
class Cat{

    constructor(public name : string, public color : string){}
}
```
Pour crée une variable on utilise let.

## Creation projet Angular
Powershell &rarr; ng new nomProjet &rarr; CSS &rarr; Non \
Powershell dans le fichier &rarr; npm i &rarr; Ouvrir avec VS &rarr; ng serve\

*Si on doit installer des dépendance*\
*npm install jquery* \
*npm install bootstrap* \
*Voir le fichier package.json si les dépendances sont bien installés*
*Ajout de ce code dans le fichier angular.json à la première copie*

```
"styles": [  
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "src/styles.css"
],
"scripts": [               
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```
---
#### On veut passer une variable de ts &rarr; html = On utilise {{Variable}}
#### On veut utiliser une fonction de ts &rarr; html = On utilise {{fonction()}}
#### Tableau est déclaré ainsi &rarr; voitures : string[] = ["bmw","honda","toyota","hyundai"] et dans html on l'utilise ainsi {{voiture[2]}}

---
## Boucle For  et IF dans HTML 
Ajout de CommonModule dans imports dans le fichier ts. \ 
```
<ul>
    <li *ngFor="let i of voitures">{{i}}</li>
</ul>
```

```
<button *ngIf="voitures[3].type = corolla ">Vendre la voiture</button>

<button>Acheter d'autre voitures</button>

```
```
<ul>
    <li *ngFor="let v of voitures">
        {{v.name}} ({{v.annee != null ? v.annee + ' ans' : 'années inconnu'}}) fait des vidéos sur le thème 
        « {{v.type}} » <span *ngIf="v.type == 'Civic' || v.type == 'Elentra'">😳</span>
    </li>
</ul>
```
## Click 
Pour lancer une fonction à chaque clique, on ajoute (click)="nomFonction()" 

## Input de html vers Ts
Ajout de FormsModule dans les imports. \
Crée une variable dans le Ts. \
 ```maVoiture : String = ""; ``` \
Dans HTML j'ajoute dans la balise ```<input type="text" name="Voiture" [(ngModel)]="maVoiture"> ```

### Autres gadgets
On peut utiliser if dans le document html avec @if(condition){ ... } @else{ ... } \
Pareil avec boucle for avec @for(v of voitures;track $index){ ... } @empty{ ...}     track prend index quand le tab n'est pas dynamique sinon prend une propriété unique de chaque v exemple v.id\
On peut aussi avoir une switch avec @switch(mavVoiture){@case("Honda"){...}@case("Hyundai"){...} @default{...}}

## Requêtes HTTP
Dans le fichier app.config.ts on ajoute la ligne provideHttpClient() dans providers.
On ajoute constructor(public http : HttpClient){} dans le AppComponent du ts.
Lance la requête: 
```
async getSongs(){
  let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist=Cher&album=Believe&format=json"));
  console.log(x);

  let nomArtiste : string = x.album.artist; 
  let nomAlbum : string = x.album.name; 
  let urlImageMedium : string = x.album.image[1]["#text"];

  for(let s of x.album.tracks.track){
    this.songs.push(new Song(s.name, s.duration));
    }

}
```
### Quelques infos
Mettre la clé dans une constante \
Si on veut message d'erreur on peut crée une variable MessageErreur, faire un try and catch avec la requête et remplir le message d'erreur si dans catch. \
Pour OnInit, on ajoute ``` implements OnInit ``` après AppComponent du ts et pm ajoute la fonction ``` async ngOnInit(){ ... } ```


## Les composants
Crée un nouveau : ouvrir un terminal &rarr; cd src/app &rarr; ng generate component nomDuComposant &rarr; cd ../.. \
Pour utiliser un composant on doit l'ajouter dans les imports du composant Parent et utiliser son selector dans le html du Parent. \
Si on veut donner une variable à l'enfant via parent. On crée la variable dans le component de Enfant : ``` @Input() maVoiture:string ="rien" ``` et dans le html du parent lorsqu'on met le selector on ajoute le nom de la variable &rarr; ``` <app-enfant [maVoiture]="'Hyundai'"></app-enfant> ```

## Routage
Faire le routage de base dans le fichier app.routes.ts
```
export const routes: Routes = [
  {path: "", redirectTo: "/artist", pathMatch: "full"},
  {path: "artist", component: ArtistComponent},
  {path: "song", component: SongComponent},
  {path: "album", component: AlbumComponent},
  {path: "concert", component: ConcertComponent},
  
];
```
Ajout de ``` <router-outlet></router-outlet> ``` dans le HTML du composant app (Parent) \
Si je veux que certain attribut puissent diriger vers un autre composant je peux ajouter ``` <div [routerLink]="['/album']" >``` \
\
\
*Si je veux envoyer une String via le routage* \
*Faut ajouter une nouvelle règle de routage : {path: "artist/:nomArtiste", component: ArtistComponent}* \
*Changer les routerLink si nécessaire : ``` <div [routerLink]="['/artist','damso']" >``` ou ``` <div [routerLink]="['/artist','nomArtiste']" >```*
*Injecter dans le component que je veux ouvrir ``` constructor(public route : ActivatedRoute) { } ```* \
*Ajouter dans le ngOnInit() un moyen de reprendre le string  ```  this.Artiste = this.route.snapshot.paramMap.get("nomArtiste"); ```* 


## Services
Creation de nouveau services &rarr; Crée un dossier services dans src/app &rarr; se rendre cd src/app/services &rarr; ng generate service nomService &rarr; supprimer le ..spec.ts &rarr; cd ../../.. \
Pour ajouter les fonctions et les variables qui peuvent être réutiliser.
Exemple de service: 
```
export class MathService {

  myNumbers : number[] = [2, 34, 420, 73, 69, 1252, 144];

  constructor() { }

  pgcd(x : number, y : number) : number{

    while (x != y){
      if (x > y) x -= y; 
      else y -= x;
    }
    return x;

  }

}
```
On doit ajouter l'injection du service dans le composant : ``` constructor(public math : MathService){} ``` \
Maintenant quand tu veux utiliser dans le ts on fait this.myNumbers et dans le html math.myNumbers. 

Je pourais pas mieu expliquer que les notes de cours comment transformer une requête en service : 

AVANT: 

```
export class BlueComponent {

  character : Character | null = null;
  inputName : string = ""; // Lié à un <input>

  constructor(public http : HttpClient){}

  async searchCharacter(){
    let x = await lastValueFrom(this.http.get<any>("https://spapi.dev/api/characters?search=" + this.inputName));
    console.log(x);
    this.character = new Character(x[0].name, x[0].episodes.length, x[0].age);
  }

}

```

APRÈS:
```
export class SouthParkService {

  constructor(public http : HttpClient) { }

  async searchCharacter(name : string) : Promise<Character>{
    let x = await lastValueFrom(this.http.get<any>("https://spapi.dev/api/characters?search=" + name));
    console.log(x);
    return new Character(x[0].name, x[0].episodes.length, x[0].age);
  }

}

```
```
export class BlueComponent {

  character : Character | null = null;
  inputName : string = "";

  constructor(public southPark : SouthParkService){}

  async searchCharacter(){
    this.character = await this.southPark.searchCharacter(this.inputName);
  }

}
```

Trois changement, le nom est maintenant reçu en paramètre, il retourne ```Promise<Character>``` et la fonction retourne maintenant un character.

