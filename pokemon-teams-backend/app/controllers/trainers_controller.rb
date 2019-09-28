class TrainersController < ApplicationController
    def show
        trainer = Trainer.find_by
    end

    def index
        trainers = Trainer.all 
        # render json: trainers.to_json
        render json: trainers, include: [:pokemons]

    end

end
