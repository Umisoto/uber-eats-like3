module Api
    class OrdersController < ApplicationController
        def create
            posted_line_foods=LineFood.where(id: params[:line_food_ids])
            order=Order.new(total_amount: total_amount(posted_line_foods))

            if order.save_with_update_line_foods!(posted_line_foods)
                render json:{}, status: :no_content
            else
                render json:{}, status: :internal_server_error
            end
        end

        private

        def total_amount(posted_line_foods)
            posted_line_foods.sum {|line_food| line_food.amount}+posted_line_foods.first.restaurant.shipping
        end
    end
end