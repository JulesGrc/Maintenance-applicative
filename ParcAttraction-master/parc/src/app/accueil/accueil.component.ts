import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { CritiqueInterface } from '../Interface/critique.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'] // Use styleUrls instead of styleUrl
})
export class AccueilComponent {

  constructor(public attractionService: AttractionService) {
    this.attractionsWithCritiques = this.attractionService.getAllAttractionVisible().pipe(
      switchMap(attractions =>
        forkJoin(attractions.map(attraction =>
          this.attractionService.getCritique(attraction.attraction_id || 0).pipe(
            map(critiques => ({ attraction, critiques }))
          )
        ))
      )
    );
  }
  
  public message: string = '';
  public selectedNote: number = 0;
  public selectedAttractionId: number = 0;
  public anonyme = false;
  public prenom: string = '';
  public nom: string = '';

  onAnonymeChange() {
    if (this.anonyme) {
      this.prenom = 'Anonyme';
      this.nom = ' ';
    } else {
      this.prenom = '';
      this.nom = '';
    }
  }

  addCritique() {
    const critique: CritiqueInterface = {
      critique_id: null,
      nom: this.nom,
      prenom: this.prenom,
      message: this.message,
      note: this.selectedNote,
      attraction_id: this.selectedAttractionId
    }
    this.attractionService.addCritique(critique).subscribe();
  }

  public attractionsWithCritiques: Observable<{ attraction: AttractionInterface, critiques: CritiqueInterface[] }[]>;

}
