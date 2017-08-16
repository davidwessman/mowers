# frozen_string_literal: true

# Lawnmower!
class Mower < ApplicationRecord
  belongs_to(:customer)
  has_many(:jobs, dependent: :destroy)
  enum(brand: { other: 0, husqvarna: 1, stiga: 2, klippo: 3 })

  validates(:brand, :model, presence: true)

  def to_s
    "#{model} #{brand} - #{customer}"
  end
end
