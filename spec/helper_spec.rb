require_relative "../helpers/application_helper"
# text_cleaner
# sentence_cleaner
describe "can test" do 
  it "can run tests" do
    expect(true).to eq(true)
  end
end

describe "#text_cleaner" do
  it "parses a simple sentence" do
    test_string = "one sentence. Two sentence."
    sentences, changes, olds = text_cleaner(test_string)
    expect(sentences.length).to eq(2)
  end

  it "finds sentences with no leading space" do
    test_string = "one sentence.No spaces."
    sentences, changes, olds = text_cleaner(test_string)
    expect(changes[1]).to eq(1)
  end

  it "finds sentences with extra spaces" do
    test_string = "one sentence.   Three spaces."
    sentences, changes, olds = text_cleaner(test_string)
    expect(changes[1]).to eq(-2)
  end
end
