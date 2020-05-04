Rails.application.routes.draw do
  devise_for :users
  get 'pages/success'
  post 'pages/create'
  post '/notify', to: 'pages#notify'
  root 'pages#donation'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
