# frozen_string_literal: true

# Lawnmower!
class Mower < ApplicationRecord
  belongs_to(:customer)
  enum(brand: { other: 0, husqvarna: 1, stiga: 2, klippo: 3 })

  def to_s
    "#{model} #{brand} - #{customer}"
  end
end
