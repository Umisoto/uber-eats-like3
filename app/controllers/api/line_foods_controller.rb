module Api
    class LineFoodsController < ApplicationController
        before_action :set_food, only: %i[create replace]

        def index
            line_foods=LineFood.active
            if line_foods.exists?
                line_food_ids=[]
                count=0
                total_amount=0

                line_foods.each do |line_food|
                    line_food_ids << line_food.id
                    count+=line_food[:count]
                    total_amount+=line_food.amount
                end

                render json:{
                    line_food_ids: line_food_ids,
                    restaurant: line_foods[0].restaurant,
                    count: count,
                    total_amount: total_amount
                }, status: :ok
            else
                render json:{}, status: :no_content
                # line_foodsが存在しなければ204が返ってくる
            end
        end

        def create
            if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
                return render json:{
                    new_restaurant: Food.find(params[:food_id]).restaurant.name,
                    existing_restaurant: LineFood.active.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name
                }, status: :not_acceptable
            end

            set_line_food(@ordered_food)

            if @line_food.save
                render json:{
                    line_food: @line_food
                }, status: :created
            else
                render json:{}, status: :internal_server_error
            end
        end

        def replace
            line_foods=LineFood.active.other_restaurant(@ordered_food.restaurant.id)
            line_foods.each do |line_food|
                line_food.update(
                    count: 0,
                    active: false
                )
            end

            set_line_food(@ordered_food)

            if @line_food.save
                render json:{
                    line_food: @line_food
                }, status: :created
            else
                render json:{}, status: :internal_server_error
            end
        end

        private

        def set_food
            @ordered_food=Food.find(params[:food_id])
        end

        def set_line_food(ordered_food)
            if ordered_food.line_food.present?
                @line_food=ordered_food.line_food
                @line_food.attributes={
                    count: @line_food.count+params[:count],
                    active: true
                }
            else
                @line_food=ordered_food.build_line_food(
                    # LineFood.newすることなくFoodとリレーションを持ったline_foodを生成
                    restaurant: ordered_food.restaurant,
                    # foodとrestaurantのリレーションはデータ投入時(schema)にて実施済み
                    count: params[:count],
                    active: true
                )
            end
        end
    end
end