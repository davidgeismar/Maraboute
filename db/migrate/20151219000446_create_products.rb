class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :color
      t.string :type
      t.integer :price

      t.timestamps null: false
    end
  end
end
