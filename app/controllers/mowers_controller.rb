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
    @mower = Mower.new(mower_params)
    if @mower.save
      redirect_to(edit_mower_path(@mower), notice: t('.success'))
    else
      render(:new, status: 422)
    end
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
    @mower = Mower.find(params[:id])
    if @mower.update(mower_params)
      redirect_to(edit_mower_path(@mower), notice: t('.success'))
    else
      render(:edit, status: 422)
    end
  end

  private

  def mower_params
    params.require(:mower).permit(:customer_id, :brand, :model)
  end
end
