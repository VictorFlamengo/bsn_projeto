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
      map(res => {
        return res.results.map((pokemon: any) =>{
          const id = this.extractID(pokemon.url)
          return {
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            id: id
          }
        })
      })
    )
  }

  buscarPokemonById(id: string) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return this.http.get<any>(url);
}

  private extractID(url: string) {
    const parts = url.split('/').filter(part => part)
    return parts[parts.length - 1]
  }
}
