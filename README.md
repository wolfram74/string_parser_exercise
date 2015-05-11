Build a web service (e.g. one that responds with JSON) in Ruby or Javascript to convert arbitrary text so that it contains only 1 space after a period between sentences. The response should contain the converted text along with meta data describing the corrections made.

Then, build a web based front-end that will submit arbitrary text to this service via AJAX and show the result. Additionally, the rendered result should include a visual representation of where corrections were made in the text.

check list:
1: page with a text box
2: route that intakes text and tweaks text, renders it on page
3: ajaxify the front end.