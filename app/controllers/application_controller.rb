# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Clearance::Controller
  include ExceptionHandler
  protect_from_forgery(with: :exception)
end
