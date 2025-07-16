# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post   'login',   to: 'auth#login'
      post   'refresh', to: 'auth#refresh'
      delete 'logout',  to: 'auth#logout'
      get    'me',      to: 'users#me'
    end
  end
end

 