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

  it('edit, updates and destroys a mower') do
    sign_in
    mower = create(:mower, brand: :stiga)
    get(edit_mower_path(mower))
    expect(response).to have_http_status(200)

    patch(mower_path(mower), params: { mower: { brand: :husqvarna } }.to_json,
                             headers: json_header)
    mower = Mower.last
    expect(response).to have_http_status(200)
    expect(response.body).to include('husqvarna')

    expect(mower.husqvarna?).to be_truthy

    delete(mower_path(mower))
    expect(response).to redirect_to(mowers_path)

    expect(Mower.where(id: mower.id)).to be_empty
  end
end
