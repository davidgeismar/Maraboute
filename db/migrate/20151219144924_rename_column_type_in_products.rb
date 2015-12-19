class RenameColumnTypeInProducts < ActiveRecord::Migration
  def change
    rename_column :products, :type, :material
  end
end
