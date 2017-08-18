# frozen_string_literal: true

module Api
  class SearchesController < ApplicationController
    before_action(:require_login)

    def mower
      mowers = Mower.where(customer: params[:customer_id])
      render(json: mowers)
    end

    def customer
      customers = Customer.full_search(customer_params)
      render(json: customers)
    end

    private

    def search_param
      params.require(:search).fetch(:text, '')
    end

    def customer_params
      params.require(:search).permit(:address, :email, :phone, :name)
    end
  end
end
