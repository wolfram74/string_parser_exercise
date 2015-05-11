def text_cleaner(string)
  # input: string
  # output: 3 arrays:  cleaned sentences, annotations of changes, raw sentences
  sentences = string.split(".")
  old_sentences = string.split(".")
  sentence_count = sentences.length
  changes = Array.new(sentence_count)
  (sentence_count-1).times do |index|
    results = sentence_cleaner(sentences[index+1])
    changes[index+1] = results[:change]
    sentences[index+1] = results[:sentence]
  end
  return sentences, changes, old_sentences
end

def sentence_cleaner(sentence)
  first_char = sentence.index(/\S/)
  if first_char == 0
    sentence.insert(0, " ")
    change = 1
  elsif first_char >1
    sentence[0, first_char] = " "
    change = -(first_char)+1
  end
  return {sentence: sentence, change: change}
end