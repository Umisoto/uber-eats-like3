class Order < ApplicationRecord
    has_many :line_foods

    validates :total_amount, numericality: {greater_than: 0}

    def save_with_update_line_foods!(line_foods)
        ActiveRecord::Base.transaction do
            line_foods.each do |line_food|
                line_food.update_attributes!(
                    count: 0,
                    active: false,
                    order: self
                )
            end

            self.save!
        end
    end
end
