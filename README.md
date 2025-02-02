
# Hera Solutions oppgave

backend is implemented with Springboot running Amazon Corretto 17  
Frontend is react with a good mix of TSX and JSX (This is due to limited time)  
Database of choice is H2 which stores in file data file.  



The solution was not created with security in mind

How to run:

backend requires apache-maven  
backend:  
mvn spring-boot:run

Docker:
* docker build -t backend_solution .
* docker run -p 8080:8080 --name hera_solutions backendSolution
* docker start hera_solutions

frontend:  
* npm install  
* npm start



Implemented: 
* Frontend and backend for storing rutes and orders
* Orders can be reordered through drag and drop
* Orders can be sorted by delivery date and pickup date
* Orders can be saved in the respective orders via index


Not implemented:
* Orders do not store detailed information like address, zip code and city
* Orders can only be sorted ascending, but it would not be hard to implement descending
* Orders and Rutes can only be created not deleted
* Orders and Rutes cannot be updated

TODO:  
* Better code comments
* Change all JS files to TSX
* Security
* Updating Orders
* Updating Rutes


