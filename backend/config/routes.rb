Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'login',   to: 'auth#login'
      post 'refresh', to: 'refresh_by_access#create'
      get  'me',      to: 'users#me' # ✅ Added `/me` endpoint
      resources :users, only: [:show, :create]
    end
  end
end
