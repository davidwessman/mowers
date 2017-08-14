# frozen_string_literal: true

# Defines exception handling for controllers
module ExceptionHandler
  # provides the more graceful `included` method
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      render(json: { message: e.message }, status: :not_found)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render(json: { errors: e.record.errors },
             status: :unprocessable_entity)
    end
  end
end
