# frozen_string_literal: true

module Api
  class JobsController < ApplicationController
    def customer
      jobs = Job.joins(:mower)
                .merge(Mower.where(customer_id: params[:customer]))
      render(json: jobs, status: :ok, include: { mower: { except: [] } })
    end

    def mower
      jobs = Job.where(mower_id: params[:mower])
      render(json: jobs, status: :ok, include: { mower: { except: [] } })
    end

    def create
      job = Job.create!(job_params)
      render(json: job, status: :ok)
    end

    def update
      job = Job.find(params[:id])
      job.update!(job_params)
      render(json: job, status: :ok)
    end

    def destroy
      Job.find(params[:id]).destroy!
      render(status: :ok)
    end

    private

    def job_params
      params.require(:job).permit(:mower_id, :status)
    end
  end
end
