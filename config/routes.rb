# frozen_string_literal: true

Rails.application.routes.draw do
  resources(:passwords, controller: 'clearance/passwords', only: %i[create new])
  resource(:session, controller: 'clearance/sessions', only: %i[create])

  resources(:users, controller: 'clearance/users', only: %i[create]) do
    resource(:password, controller: 'clearance/passwords',
                        only: %i[create edit update])
  end

  get(:sign_in, controller: 'clearance/sessions', action: :new, path: 'sign-in')
  delete(:sign_out, controller: 'clearance/sessions', action: :destroy,
                    path: 'sign-out')
  get(:sign_up, controller: 'clearance/users', action: :new, path: 'sign-up')

  resources(:customers)
  resources(:mowers, except: %i[show])

  resource(:search, only: []) do
    post(:customer)
    post(:mower)
  end

  root(controller: :home, action: :index)
end
