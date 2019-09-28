class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json
    end

    # Create Pokemon from Faker
    def create

    end

    # Delete Pokemon from Trainer
    def destroy

    end

end
