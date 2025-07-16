# config/initializers/jwt_sessions.rb
JWTSessions.encryption_key = Rails.application.credentials.secret_key_base
