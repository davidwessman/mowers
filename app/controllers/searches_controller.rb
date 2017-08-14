# frozen_string_literal: true

class SearchesController < ApplicationController
  before_action(:require_login)

  def mower
    @mowers = Mower.where(customer: params[:customer_id])
  end

  def customer
    @customers = Customer.text_search(search_param)
  end

  private

  def search_param
    params.require(:search).fetch(:text, '')
  end
end
