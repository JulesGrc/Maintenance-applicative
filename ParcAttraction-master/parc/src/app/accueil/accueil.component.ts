import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { CritiqueInterface } from '../Interface/critique.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  constructor(public attractionService: AttractionService)
  {}
  
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttractionVisible();

  public message: string = '';
  public selectedNote: number = 0;
  public selectedAttraction: number = 0;

  addCritique(message: string, selectedNote: number, selectedAttraction: number) {
    const critique: CritiqueInterface = {
      critique_id: null,
      message: message,
      note: selectedNote,
      attraction_id: selectedAttraction
    }
    this.attractionService.addCritique(critique).subscribe()
  }

  public critiques: Observable<CritiqueInterface[]> = this.attractionService.getCritique(this.selectedAttraction);
}
