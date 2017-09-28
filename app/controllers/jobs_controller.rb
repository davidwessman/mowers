# frozen_string_literal: true

class JobsController < ApplicationController
  before_action(:require_login)

  def show
    @job = Job.find(params[:id])
  end

  def index
    @job = Job.new
  end

  private

  def jobs_params
    params.require(:job).permit(:mower_id)
  end
end
