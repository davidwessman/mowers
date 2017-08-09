class CreateMowers < ActiveRecord::Migration[5.1]
  def change
    create_table :mowers do |t|
      t.references :customer, foreign_key: true
      t.integer :brand, default: 0, null: false
      t.string :model
      t.integer :year
      t.text :comment

      t.timestamps
    end
  end
end
