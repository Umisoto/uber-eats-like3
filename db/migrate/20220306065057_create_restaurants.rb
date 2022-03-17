class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.integer :time_required, null: false
      t.integer :shipping, null: false, default: 0

      t.timestamps
    end
  end
end
