# frozen_string_literal: true

require 'rails_helper'
RSpec.describe('Searches', type: :request) do
  describe('GET /project') do
    it('renders project page, then do search request') do
      sign_in
      post(customer_api_search_path, xhr: true,
                                     params: { search: { name: 'David ' } })
      expect(response).to have_http_status(200)
    end
  end
end
