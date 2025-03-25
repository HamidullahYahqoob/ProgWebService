import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { lastValueFrom } from 'rxjs';

const domain = "https://localhost:LE PORT DE VOTRE SERVEUR";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(public http : HttpClient) { }

  // ▄▄▄▄▄▄▄▄▄▄▄▄
  //    GetAll
  // ▀▀▀▀▀▀▀▀▀▀▀▀
  async getAll() : Promise<Item[]>{

    let x = await lastValueFrom(this.http.get<Item[]>("https://localhost:44320/api/Items/GetItem/"));
    console.log(x);
    return x;
  }

  // ▄▄▄▄▄▄▄▄▄▄▄▄
  //      Get
  // ▀▀▀▀▀▀▀▀▀▀▀▀
  async get(id : number) : Promise<Item>{

    let x = await lastValueFrom(this.http.get<Item>("https://localhost:44320/api/Items/GetItem/" + id));
    console.log(x);
    return x;

  }

  // ▄▄▄▄▄▄▄▄▄▄▄▄
  //     Post
  // ▀▀▀▀▀▀▀▀▀▀▀▀
  async post(name : string, value : number) : Promise<void>{

    let ItemTempo = new Item(0,name,value)

    let x = await lastValueFrom(this.http.post<any>("https://localhost:44320/api/Items/PostItem", ItemTempo));
    console.log(x);

  }

  // ▄▄▄▄▄▄▄▄▄▄▄▄
  //    Delete
  // ▀▀▀▀▀▀▀▀▀▀▀▀
  async delete(id : number) : Promise<void>{

    let x = await lastValueFrom(this.http.post<any>("https://localhost:44320/api/destroy/" + id,null));
    console.log(x);
    


  }

  // ▄▄▄▄▄▄▄▄▄▄▄▄
  //     Put
  // ▀▀▀▀▀▀▀▀▀▀▀▀
  async put(id : number, name : string, value : number) : Promise<void>{

    let newItem = new Item(id, name, value);
    let x = await lastValueFrom(this.http.put<any>("https://localhost:44320/api/Items/PutItem/" + newItem.id, newItem));
    console.log(x);

  }

}
