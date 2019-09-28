class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all 
        render json: pokemons, include: [:trainer]
    end
end
