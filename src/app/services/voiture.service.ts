import { Injectable } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  apiURL: string = 'http://localhost:8080/voitures/api';
  voitures!: Voiture[]; //un tableau de Voiture
  voiture: Voiture | undefined;
  
  //voiture: Voiture = new Voiture();

  constructor(private http: HttpClient) {
    /*this.voitures = [
    {idVoiture : 1, nomVoiture : "BMW", prixVoiture : 120.000, dateCreation : new Date("01/14/2021")},
    {idVoiture : 2, nomVoiture : "Mercedes", prixVoiture : 75.000, dateCreation : new Date("12/17/2021")},
    {idVoiture : 3, nomVoiture :"KIA", prixVoiture : 65.000, dateCreation : new Date("02/20/2020")}
     ];*/
  }
listeVoiture(): Observable<Voiture[]>{
  return this.http.get<Voiture[]>(this.apiURL);
}

ajouterVoiture(voit: Voiture):Observable<Voiture> {
  return this.http.post<Voiture>(this.apiURL, voit, httpOptions);
}

supprimerVoiture(id : number) {
  const url = `${this.apiURL}/${id}`;
  return this.http.delete(url, httpOptions);
  }

  consulterVoiture(id: number): Observable<Voiture> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Voiture>(url);
    }

  updateVoiture(voit :Voiture) : Observable<Voiture>
    {
    return this.http.put<Voiture>(this.apiURL, voit, httpOptions);
    }

}