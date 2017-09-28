# frozen_string_literal: true

require 'rails_helper'
RSpec.describe('API::Mowers', type: :request) do
  it('create a mower') do
    customer = create(:customer)
    sign_in
    attributes = { customer_id: customer.id,
                   brand: :husqvarna,
                   model: 'AM 330',
                   year: '2017' }

    post(api_mowers_path, params: { mower: attributes }.to_json,
                          headers: json_header)
    expect(response).to have_http_status(200)
    mower = Mower.last
    expect(response.body).to include('AM 330')

    expect(mower.husqvarna?).to be_truthy
  end

  it('updates and destroys a mower') do
    sign_in
    mower = create(:mower, brand: :stiga)
    attributes = { mower: { brand: :husqvarna } }

    patch(api_mower_path(mower), params: attributes.to_json,
                                 headers: json_header)
    mower = Mower.last
    expect(response).to have_http_status(200)
    expect(response.body).to include('husqvarna')

    expect(mower.husqvarna?).to be_truthy
  end

  it('fetches all mowers for a customer') do
    sign_in
    customer = create(:customer)
    create(:mower, customer: customer, model: 'stor och stark')
    create(:mower, customer: customer, model: 'bra robot')
    create(:mower, customer: customer, model: 'mycket klipp')
    create(:mower, model: 'inte en klippare') # other customer
    post(customer_api_mowers_path, params: { customer: customer.id }.to_json,
                                   headers: json_header)
    expect(response).to have_http_status(200)
    expect(response.parsed_body.count).to eq(3)
    expect(response.body).to include('stor och stark')
    expect(response.body).to include('bra robot')
    expect(response.body).to include('mycket klipp')
    expect(response.body).not_to include('inte en klippare')
  end
end
