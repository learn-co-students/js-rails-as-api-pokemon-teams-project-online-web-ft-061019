class PokemonsController < ApplicationController
    def index
        @pokemons = Pokemon.all
        render json: @pokemons
    end

    def new
        @pokemon = Pokemon.new()
        render json: @pokemon
    end
end
