# config/initializers/jwt_sessions.rb
require "redis"
JWTSessions.encryption_key = Rails.application.credentials.secret_key_base
JWTSessions.token_store = :redis, { redis_url: ENV["REDIS_URL"] || "redis://localhost:6379/0" }