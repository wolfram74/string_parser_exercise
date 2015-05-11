$(document).ready(function(){
  $("#submit_text").on("click", buttonCapture)
});

function buttonCapture(){
  event.preventDefault()
  var rawText = $(event.target).parent().children().eq(0).val()
  console.log(rawText)
  sendData(rawText)
};


function sendData(input){
  shout()
  $.ajax({
    type: "POST",
    url: "http://localhost:9393/text_format",
    data: {
      rawText: input
    },
    dataType: "json"
  }).done(shout);

}

function shout(data){
  console.log(data)
  console.log("that thing you expected.")
}