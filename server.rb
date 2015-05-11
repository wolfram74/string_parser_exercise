require "sinatra"
Tilt.register Tilt::ERBTemplate, 'erb'
set :public_folder, File.dirname(__FILE__)
require "debugger"
require "json"

get "/" do 
  erb :simple
end

post "/text_format" do
  content_type(:json)
  p params
  output = %w(so much shouting)
  output.to_json
end

__END__
