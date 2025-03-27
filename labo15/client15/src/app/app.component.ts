import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DinosaurService } from './services/dinosaur.service';
import { Dinosaur } from './models/dinosaur';
import { Zookeeper } from './models/zookeeper';
import { Incident } from './models/incident';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 
  dinosaurs : Dinosaur[] = [];
  zookeepers : Zookeeper[] = [];
  incidentsOf : Dinosaur | null = null;

  // Formulaire zookeeper
  zookeeperName : string = "";

  // Formulaire dinosaure
  dinosaurName : string = "";
  dinosaurSpecie : string = "";
  dinosaurZookeeperId ?: number;
  
  // Formulaire incident
  incidentDescription : string = "";
  incidentNbVictims ?: number;
  selectedDinosaurs : number[] = [];

  constructor(public dinosaur : DinosaurService){}

  async ngOnInit() {
    this.zookeepers = await this.dinosaur.getZookeepers();
    this.dinosaurs = await this.dinosaur.getDinosaurs();
  }

  async createDinosaur(){
    
    // On annule si l'id du zookeeper n'a pas été spécifié
    if(this.dinosaurZookeeperId == undefined) return;

    // Requête de création
    let dinosaur = await this.dinosaur.postDinosaur(this.dinosaurName, this.dinosaurSpecie, this.dinosaurZookeeperId);
    
    // Ajout du dinosaure dans la page
    this.dinosaurs.push(dinosaur);

  }

  async deleteDinosaur(id : number){

    // Requête de suppression
    await this.dinosaur.deleteDinosaur(id);

    // Retrait du dinosaure dans la page
    for(let i = this.dinosaurs.length - 1; i >= 0; i--){
      if(this.dinosaurs[i].id == id){
        this.dinosaurs.splice(i, 1);
      }
    }

  }

  async createZookeeper(){
    // Requête de création
    let zookeeper = await this.dinosaur.postZookeeper(this.zookeeperName);

    // Ajout dans la page
    this.zookeepers.push(zookeeper);
  }

  async deleteZookeeper(id : number){

    // Requête de suppression
    await this.dinosaur.deleteZookeeper(id);

    // Retrait des dinosaures associés dans la page
    for(let i = this.dinosaurs.length - 1; i >= 0; i--){
      if(this.dinosaurs[i].zookeeper.id == id){
        this.dinosaurs.splice(i, 1);
      }
    }

    // Retrait du gardien dans la page
    for(let i = this.zookeepers.length - 1; i >= 0; i--){
      if(this.zookeepers[i].id == id){
        this.zookeepers.splice(i, 1);
      }
    }

  }

  async createIncident(){
    // On ne crée pas si le nombre de victimes n'a pas été indiqué
    if(this.incidentNbVictims == undefined) return;

    // Requête de création
    await this.dinosaur.postIncident(this.incidentDescription, this.incidentNbVictims, this.selectedDinosaurs);
  }

  showIncidents(dinosaur : Dinosaur){
    // On change quels incidents sont affichés par ceux du dinosaure cliqué
    this.incidentsOf = dinosaur;
  }

  selectDinosaur(id : number){

    // L'id est déjà sélectionné ? On le retire
    if(this.selectedDinosaurs.includes(id)){
      let index = this.selectedDinosaurs.indexOf(id);
      this.selectedDinosaurs.splice(index, 1);
    }
    // Sinon on l'ajoute
    else{
      this.selectedDinosaurs.push(id);
    }
  }

}
