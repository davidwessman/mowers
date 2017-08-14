# frozen_string_literal: true

# Controller to handle CRUD-actions for mowers
class MowersController < ApplicationController
  before_action(:require_login)
  def index
    @mowers = Mower.order(created_at: :desc)
  end

  def destroy
    Mower.find(params[:id]).destroy!
    redirect_to(mowers_path, notice: t('.success'))
  end

  def create
    mower = Mower.create!(mower_params)
    render(json: mower, status: :ok)
  end

  def edit
    @mower = Mower.find(params[:id])
  end

  def show
    @mower = Mower.find(params[:id])
  end

  def new
    @mower = Mower.new
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
