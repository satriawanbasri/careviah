### Technology Used

Backend using nodejs expressjs.  
Frontend using reactjs javascript.

### To Setup Locally

To run it locally for both frontend and backend, just install the package first using "yarn" command, and run the apps using "yarn start".  
By default backend run on port 4000 and frontend run on port 3000.  
Don't forget to change environment variable (.env file) in frontend to point to local backend server by changning  
REACT_APP_API_BASE_URL=http://localhost:4000  
#REACT_APP_API_BASE_URL=https://api-careviah.vercel.app

### Apps Deployment Host

The apps has been deployed into vercel.  
For backend:  
https://api-careviah.vercel.app/  
For frontend:  
https://careviah.vercel.app/

### Database Used

Database used in the backend is json file in memory.  
To reset the data in deployment server, just hit the endpoint  
https://api-careviah.vercel.app/reset  
for local  
http://localhost:4000/reset  
or for local just restart the apps. Ctr+C then rerun "yarn start".  
The aim of this reset is to help in testing process because it its just using memory database.  
The json file data can be modified as needed to full fill business logic scenario.
