class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
    end

    def show
        trainer = Trainer.find_by
        render json: trainer.to_json
    end

end