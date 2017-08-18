# frozen_string_literal: true

# Controller for landing page
class HomeController < ApplicationController
  def index
    @count = {}
    @count[:customers] = Customer.all.count
    @count[:mowers] = Mower.all.count
    @count[:jobs] = Job.all.count
  end
end
