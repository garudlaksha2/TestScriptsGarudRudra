TestScriptsGarudRudra
=====================

All testing scripts for GarudRudra will reside here

Path injection:
http://localhost/injectinnext/<inject string here>

JSON injection:
http://localhost/injectionpost
Create a post body with content-type = application/json
create a json data with inject as key and injection string as value
e.g.
{"inject" :"*", "data1" :2}
