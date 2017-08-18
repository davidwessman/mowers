# frozen_string_literal: true

module Api
  # Api-controller to handle customers
  class CustomersController < ApplicationController
    before_action(:require_login)

    def index
      customers = Customer.order(created_at: :desc)
      render(json: customers)
    end

    def create
      customer = Customer.create!(customer_params)
      render(json: customer, status: :ok)
    end

    def update
      customer = Customer.find(params[:id])
      customer.update!(customer_params)
      render(json: customer, status: :ok)
    end

    private

    def customer_params
      params.require(:customer).permit(:name, :phone, :address, :email)
    end
  end
end
