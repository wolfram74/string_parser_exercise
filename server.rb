require "sinatra"
Tilt.register Tilt::ERBTemplate, 'erb'
set :public_folder, File.dirname(__FILE__)
require "debugger"
require "json"

require_relative "./helpers/application_helper"

get "/" do 
  erb :simple
end

post "/text_format" do
  content_type(:json)
  input_text = params["rawText"]
  new_sentences, changes, raw_sentences = text_cleaner(input_text)
  output = {"newSentences" => new_sentences, "changeData"=> changes, "rawSentences" =>raw_sentences}
  output.to_json
end

__END__
