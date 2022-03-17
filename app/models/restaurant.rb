class Restaurant < ApplicationRecord
    has_many :foods
    has_many :line_foods, through: :foods

    validates :name, :time_required, :shipping, presence: true
    validates :name, length: {maximum: 30}
    validates :time_required, :shipping, numericality: {greater_than: 0}
end