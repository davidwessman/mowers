# frozen_string_literal: true

class Job < ApplicationRecord
  belongs_to(:mower)
  has_one(:customer, through: :mower)
  enum(status: { not_started: 0, started: 1, done: 2 })

  def to_s
    "Id: #{id}"
  end
end
