$(document).ready(function(){
  $("#submit_text").on("click", buttonCapture)
});

function buttonCapture(){
  event.preventDefault()
  var rawText = $(event.target).parent().children().eq(0).val()
  sendData(rawText)
};


function sendData(input){
  $.ajax({
    type: "POST",
    url: "http://localhost:9393/text_format",
    data: {
      rawText: input
    },
    dataType: "json"
  }).done(displayText);

}

function displayText(textData){
  var newSentences = textData["newSentences"]
  var rawSentences = textData["rawSentences"]
  var changes = textData["changeData"]
  var newText = newSentences.join(".")+"."
  $("#new_text").text(newText)
  var editsString = ""
  for(var index in newSentences){
    if(!!changes[index]){
      if(changes[index] >0){
        var insert = newSentences[index]
        insert = stringSplice(insert, 1, "</plus>")
        insert = stringSplice(insert, 0, "<plus>")
        editsString += insert + "."
      } else{
        var insert = rawSentences[index]
        var spaces = "&nbsp;".repeat(Math.abs(changes[index]))
        insert = stringSplice(insert, -changes[index], spaces +"</minus>")
        insert = stringSplice(insert, 0, "<minus>")
        editsString += insert + "."
      };
    } else{
      editsString+= newSentences[index]+"."
    };
  };
  $("#edit_window").html(editsString)
}

function stringSplice(string, index, insertion){
  return string.slice(0,index)+insertion+string.slice(index)
};

function shout(data){
  console.log(data)
  console.log("that thing you expected.")
}