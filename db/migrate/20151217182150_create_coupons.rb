class CreateCoupons < ActiveRecord::Migration
  def change
    create_table :coupons do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
