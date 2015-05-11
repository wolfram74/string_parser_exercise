if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    return rpt;
  }
}

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
  $("#new_text").html(newText)
  var editsString = renderEditString(rawSentences, newSentences, changes)
  $("#edit_window").html(editsString)
}

function stringSplice(string, index, insertion){
  return string.slice(0,index)+insertion+string.slice(index)
};

function renderEditString(rawSentences, newSentences, changeData){
  var editsString = ""
  for(var index in newSentences){
    if(!!changeData[index]){
      if(changeData[index] >0){
        var insert = newSentences[index]
        insert = stringSplice(insert, 1, "</plus>")
        insert = stringSplice(insert, 0, "<plus>")
        editsString += insert + "."
      } else{
        var insert = rawSentences[index]
        var spaces = "&nbsp;".repeat(Math.abs(changeData[index]))
        insert = stringSplice(insert, -changeData[index], spaces +"</minus>")
        insert = stringSplice(insert, 0, "<minus>")
        editsString += insert + "."
      };
    } else{
      editsString+= rawSentences[index]+"."
    };
  };
  return editsString
};

function shout(data){
  console.log(data)
  console.log("that thing you expected.")
}