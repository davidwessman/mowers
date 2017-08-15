# frozen_string_literal: true

class Customer < ApplicationRecord
  has_many(:mowers)
  validates(:name, :phone, :address, :email, presence: true)
  validates(:phone, :email, uniqueness: true)

  scope(:text_search, lambda do |str|
    fuzzy_search({ name: str, phone: str, address: str, email: str }, false)
  end)

  scope(:full_search, lambda do |params|
    search = params.to_h.delete_if { |_, value| value.blank? }
    fuzzy_search(params.to_h, false)
  end)

  def self.searchable_columns
    %i[name phone address]
  end

  def to_s
    name
  end
end
