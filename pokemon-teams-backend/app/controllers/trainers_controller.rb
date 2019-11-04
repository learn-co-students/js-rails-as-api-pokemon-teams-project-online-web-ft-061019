class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all
        render json: trainers.to_json({
            except: [:created_at, :updated_at],
            :include => {
                :pokemons => {
                    except: [:created_at, :updated_at]
                }
            }
        })
    end
end
