class LineFood < ApplicationRecord
    belongs_to :restaurant
    belongs_to :food
    belongs_to :order, optional: true

    validates :count, numericality: {minimum: 0}

    scope :active, -> {where(active: true)}
    scope :other_restaurant, -> (selected_restaurant_id) {where.not(restaurant_id: selected_restaurant_id)}

    def amount
        return food.price*count
    end
end