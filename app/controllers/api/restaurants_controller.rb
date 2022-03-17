module Api
    class RestaurantsController < ApplicationController
        def index
            restaurants=Restaurant.all 

            render json: {
                restaurants: restaurants
            }, status: :ok
        end
    end
end