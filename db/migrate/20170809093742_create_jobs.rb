class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|
      t.references :mower, foreign_key: true
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
