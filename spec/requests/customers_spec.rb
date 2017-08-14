# frozen_string_literal: true

require 'rails_helper'
RSpec.describe('Customers', type: :request) do
  it('renders customers index, then creates a new customer') do
    sign_in
    get(customers_path)
    expect(response).to have_http_status(200)
    attributes = { name: 'David', phone: '070560',
                   address: 'Havet, 26376 Nyhamnsläge',
                   email: 'david@wessman.co' }
    headers = { "CONTENT_TYPE": "application/json" }
    post(customers_path, params: { customer: attributes }.to_json,
                         headers: headers)
    customer = Customer.last
    expect(response).to have_http_status(200)
    expect(response.body).to include('Havet, 26376 Nyhamnsläge')
    expect(customer.name).to eq('David')
  end
end
