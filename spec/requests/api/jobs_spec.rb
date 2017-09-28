# frozen_string_literal: true

require 'rails_helper'
RSpec.describe('API::Jobs', type: :request) do
  it('create a job') do
    mower = create(:mower)
    sign_in
    attributes = { mower_id: mower.id }

    post(api_jobs_path, params: { job: attributes }.to_json,
                        headers: json_header)
    expect(response).to have_http_status(200)
    job = Job.last
    expect(job.mower_id).to eq(mower.id)
  end

  it('update and destroy a job') do
    sign_in
    job = create(:job)
    attributes = { job: { created_at: 5.minutes.ago } }

    patch(api_job_path(job), params: attributes.to_json,
                             headers: json_header)
    job = Job.last
    expect(response).to have_http_status(200)
    expect(response.parsed_body).to include("=> #{job.mower_id}")

    expect(job.husqvarna?).to be_truthy

    delete(api_job_path(job))
    expect(response).to redirect_to(jobs_path)

    expect(Job.where(id: job.id)).to be_empty
  end

  it('fetches all jobs for a mower') do
    sign_in
    mower = create(:mower)
    create(:job, mower: mower)
    create(:job, mower: mower)
    create(:job, mower: mower)
    create(:job) # other mower

    post(mower_api_jobs_path, params: { mower: mower.id }.to_json,
                              headers: json_header)
    expect(response).to have_http_status(200)
    expect(response.parsed_body.count).to eq(3)
  end

  it('fetches all jobs for a customer') do
    sign_in
    customer = create(:customer)
    mower1 = create(:mower, customer: customer)
    mower2 = create(:mower, customer: customer)
    create(:job, mower: mower1)
    create(:job, mower: mower2)
    create(:job, mower: mower2)
    create(:job) # other mower

    post(customer_api_jobs_path, params: { customer: customer.id }.to_json,
                                 headers: json_header)
    expect(response).to have_http_status(200)
    expect(response.parsed_body.count).to eq(3)
  end
end
