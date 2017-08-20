# frozen_string_literal: true

module Api
  # Controller to handle CRUD-actions for mowers
  class MowersController < ApplicationController
    before_action(:require_login)
    def create
      mower = Mower.create!(mower_params)
      render(json: mower, status: :ok)
    end

    def update
      mower = Mower.find(params[:id])
      mower.update!(mower_params)
      render(json: mower, status: :ok)
    end

    private

    def mower_params
      params.require(:mower).permit(:customer_id, :brand, :model, :year)
    end
  end
end
