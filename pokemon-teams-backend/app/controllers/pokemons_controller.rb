class PokemonsController < ApplicationController

   def create
      trainer = Trainer.find_by_id(params[:trainer_id])
      new_pokemon = trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
      
      if trainer.pokemons.length <= 6 && new_pokemon.save 
         render json: new_pokemon
      else 
         render json: {message: "Team full, unable to add additional pokemon"}, status: 400
      end
   end

   def destroy
      pokemon = Pokemon.find_by_id(params[:id])
      if pokemon.destroy 
         render json: {message: "Successfully Deleted Pokemon"}, status: 200
      else
         render json: {message: "unable to delete pokemon"}, status: 400
      end
   end

end
