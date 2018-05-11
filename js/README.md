# speedlabeling

## JavaScript files

dataLoader.js
Defines a class used to load inputs from session storage. A user will use the login.html page to input all their information, which will then be saved to session storage and picked up by dataLoader.js.

lasso.js
The first prototype of the image selection tool. It uses the Fabric.js JavaScript Canvas Library.

login.js
All the logic for login.html. Saves necessary data to session storage and validates certain fields.

multi_class.js
Logic for multi_class.html page. Handles all UI changes and updates the dataLoader object.

text.js
Logic for the trinary labeling system and the page text.html. Handles all UI changes and updates the dataLoader object.