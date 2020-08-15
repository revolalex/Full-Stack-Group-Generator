# Full-Stack-Group-Generator
Full Stack Project (Front-End, Back-End, API, DB)
> The goal was to realize a groupe generator in wich you can add a list off students, chose a number of students per groups and generate a groups randomly.
---

## Mandatory
Use MongoDB, Express, NodeJS, HTML, CSS, EJS

## Requirements


### Node

- #### Node installation
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

- #### Node modules
  - body-parser
  - express
  - fs
  - jsonfile
  - nodemon


## Install

    $ git clone https://github.com/revolalex/Full-Stack-Group-Generator.git
    $ install nodeJS
    $ don't forget the modules :
        - body-parser
        - ejs
        - express
        - mongodb
        - node-fetch
        - nodemon


## Running the project

    $ npm server.js
    and
    $ node main.js
    
## Screenshots:
Front-End: <br>
<img width="600" alt="Capture d’écran 2020-07-19 à 17 33 38" src="https://user-images.githubusercontent.com/56839789/90007334-dbdd2900-dc9a-11ea-935f-c56bc3846480.gif">

VS-Code: <br>
<img width="597" alt="Capture d’écran 2020-08-12 à 13 07 03" src="https://user-images.githubusercontent.com/56839789/90008577-dc76bf00-dc9c-11ea-9aea-cc576f68ddd9.png">




## Structure:
<br>
<img width="290" alt="Capture d’écran 2020-08-12 à 13 10 45" src="https://user-images.githubusercontent.com/56839789/90008829-4000ec80-dc9d-11ea-9ea2-2f6b7969804e.png">
<br>

- views for the front-end
- publics for the css
- server.js for the server part
- main.js for interact with the server

## API end points:

http://localhost:8080/Students<br>
==> to see the student in our collection (MongoDB) <br>

http://localhost:8080/Groups<br>
==> to see the group in our collection (MongoDB) <br>

http://localhost:3000/ + students or groups  <br>
==> for add a student or assign to a group




## Contact
revolalex@gmail.com

