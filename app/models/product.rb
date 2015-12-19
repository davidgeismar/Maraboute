class Product < ActiveRecord::Base
  extend Enumerize

  enumerize :material, in: [:gold, :silver, :white_gold]
  enumerize :color, in: [:red, :black, :blue]
end
