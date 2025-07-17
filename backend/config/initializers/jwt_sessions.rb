# config/initializers/jwt_sessions.rb
require "redis"
JWTSessions.encryption_key = Rails.application.credentials.secret_key_base
JWTSessions.token_store = :redis, { redis_url: ENV["REDIS_URL"] }
JWTSessions.access_exp_time = 5  
JWTSessions.refresh_exp_time = 604800