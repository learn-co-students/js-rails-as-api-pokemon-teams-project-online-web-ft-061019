class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json
    end

end