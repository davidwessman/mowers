# frozen_string_literal: true

FactoryBot.define do
  factory(:customer) do
    name
    phone
    address
    email
  end
end
