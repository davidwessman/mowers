# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

ruby '2.5.1'
gem 'rails', '~> 5.1.4'

gem 'clearance' # Authentication
gem 'font-awesome-rails'
gem 'jbuilder'
gem 'mini_magick'
gem 'oj' # JSON-serialization, recommended for rollbar
gem 'pg', '~> 0.21'
gem 'puma', '~> 3.11'
gem 'rollbar' # Error reporting
gem 'sass-rails', '~> 5.0'
gem 'simple_form'
gem 'skylight' # Monitoring
gem 'textacular', '~> 5.0'
gem 'turbolinks'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'webpacker-react'

group :development, :test do
  gem 'bullet'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'capybara'
  gem 'dotenv-rails'
  gem 'factory_bot_rails'
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'selenium-webdriver'
end

group :development do
  gem 'foreman'
  gem 'rails_real_favicon'
  gem 'rubocop'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
