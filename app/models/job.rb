# frozen_string_literal: true

class Job < ApplicationRecord
  belongs_to(:mower)
end
