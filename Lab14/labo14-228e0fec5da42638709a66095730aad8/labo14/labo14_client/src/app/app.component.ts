import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Item } from './models/item';
import { ItemService } from './services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  itemId : number | null = null;
  itemName : string | null = null;
  itemValue : number | null = null;

  item : Item | null = null;
  items : Item[] | null = null;

  constructor(public itemService : ItemService){}

  async seeAllItems() : Promise<void>{
    this.items = await this.itemService.getAll();
    this.item = null;
  }

  async seeOneItem() : Promise<void>{
    if(this.itemId == null) return;
    this.item = await this.itemService.get(this.itemId);
    this.items = null;
  }

  async createItem() : Promise<void>{
    if(!this.itemName || !this.itemValue) return;
    await this.itemService.post(this.itemName, this.itemValue);
  }

  async editItem() : Promise<void>{
    if(!this.itemId || !this.itemName || !this.itemValue) return;
    await this.itemService.put(this.itemId, this.itemName, this.itemValue);
  }

  async deleteItem() : Promise<void>{
    if(this.itemId == null) return;
    await this.itemService.delete(this.itemId);
  }
}
