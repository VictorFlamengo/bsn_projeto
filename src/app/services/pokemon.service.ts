import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=20';

  http = inject(HttpClient);

  buscarPokemon() {
    return this.http.get<any>(this.apiPokemon).pipe(
      map(res => res.results)
    )
  }
}
