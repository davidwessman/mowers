# frozen_string_literal: true

FactoryBot.define do
  factory :job do
    mower
    status { Job.statuses.keys.sample }
  end
end
