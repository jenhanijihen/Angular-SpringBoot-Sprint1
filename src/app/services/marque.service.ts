import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voiture } from '../model/voiture.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL: string = 'http://localhost:8082/voiture';

  voiture: Voiture[] | undefined;
  //menu: Menu;
  constructor(private http : HttpClient,private authService:AuthService) {
  
    
  }
  listeVoiture(): Observable<Voiture[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Voiture[]>(this.apiURL+"/all",{headers:httpHeaders}
    );
  }
 
  ajouterMarque(m: Voiture):Observable< Voiture> {
    return this.http.post<Voiture>(this.apiURL, m, httpOptions);
  }
  supprimerMarque(id: number) {
    //supprimer le produit prod du tableau produits
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
    
  }
  consulterMarque(id: number):Observable< Voiture>{
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Voiture>(url);
  }
  updateMarque(m: Voiture):Observable<Voiture> {
    return this.http.put<Voiture>(this.apiURL, m, httpOptions);
  }
}