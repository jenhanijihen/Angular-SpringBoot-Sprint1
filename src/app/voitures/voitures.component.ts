import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css']
})
export class VoituresComponent implements OnInit {

  voitures : Voiture[] | undefined;

  constructor(private voitureService:VoitureService,
              private router :Router,
              public authService: AuthService) {

    //this.voitures = voitureService.listeVoitures();
      }

  ngOnInit(): void {
    this.voitureService.listeVoiture().subscribe(voit => {
      console.log(voit);
      this.voitures = voit;
      });
  }

  supprimerVoiture(v: Voiture)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.voitureService.supprimerVoiture(v.idVoiture).subscribe(() => {
  console.log("voiture supprimé");
  this.SuprimerVoitureDuTableau(v);

  });
 
  }

  SuprimerVoitureDuTableau(voit : Voiture) {
    this.voitures?.forEach((cur, index) => {
    if(voit.idVoiture=== cur.idVoiture) {
    this.voitures?.splice(index, 1);
    }
    });
    }
}
