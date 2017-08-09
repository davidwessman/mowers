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
    post(customers_path, params: { customer: attributes })
    customer = Customer.last
    expect(response).to redirect_to(customer_path(customer))
    follow_redirect!
    expect(response).to have_http_status(200)

    expect(customer.name).to eq('David')
  end
end
