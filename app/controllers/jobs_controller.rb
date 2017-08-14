# frozen_string_literal: true

class JobsController < ApplicationController
  before_action(:require_login)

  def new
    @job = Job.new
  end

  def create
    job = Job.create!(jobs_params)
    render(json: job, status: :ok)
  end

  def index
    @job = Job.new
  end

  def customer
    @customer = Customer.find(params[:customer_id])
    @job = Job.new
  end

  def mower
    @customer = Customer.find(params[:customer_id])
    @mower = @customer.mowers.find(params[:mower_id])
    @job = Job.new
  end

  private

  def jobs_params
    params.require(:job).permit(:mower_id)
  end
end
