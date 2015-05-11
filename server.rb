require "sinatra"
Tilt.register Tilt::ERBTemplate, 'erb'
set :public_folder, File.dirname(__FILE__)
require "debugger"
require "json"

get "/" do 
  erb :simple
end

def sentence_cleaner(string)
  # input: string
  # output: 3 arrays:  cleaned sentences, annotations of changes, raw sentences
  sentences = string.split(".")
  old_sentences = string.split(".")
  sentence_count = sentences.length
  changes = Array.new(sentence_count)
  (sentence_count-1).times do |index|
    sentence = sentences[index+1]
    first_char = sentence.index(/\S/)
    if first_char == 0
      sentences[index+1].insert(0, " ")
      changes[index+1] = 1
    elsif first_char >1
      sentences[index+1][0, first_char] = " "
      changes[index+1] = -(first_char)+1
    end
  end
  return sentences, changes, old_sentences
end

post "/text_format" do
  content_type(:json)
  input_text = params["rawText"]
  new_sentences, changes, raw_sentences = sentence_cleaner(input_text)
  output = {"newSentences" => new_sentences, "changeData"=> changes, "rawSentences" =>raw_sentences}
  output.to_json
end

__END__
