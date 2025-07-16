# db/seeds.rb

email = "test@example.com"
password = "password"

unless User.exists?(email: email)
  User.create!(
    email: email,
    password: password,
    password_confirmation: password
  )
  puts "✅ User created: #{email}"
else
  puts "⚠️ User already exists: #{email}"
end
