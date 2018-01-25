# 08 REST API

## How To Use the Program

Fork then clone the repo to your machine, once cloned down navigate to the director ```lab-dean```. Make sure all dependencies are installed by typing ```npm i```. Make sure the that your ```package.json``` file contains the following dependencies:

```
 "devDependencies": {
    "debug": "^3.1.0",
    "dotenv": "^4.0.0",
    "jest": "^22.1.4",
    "superagent": "^3.8.2"
  },
  "dependencies": {
    "uuid": "^3.2.1"
  }
```

In your terminal run a Node server by typing the command ```node start:watch``` and test your routes by using the program ```Postman```.

## Route commands

POST: To do a POST request, in the request URL input box type ```http://localhost:3000/api/v1/note``` and in the body content box put in 
                                                  ```
                                                  title: {title},
                                                  message: {message}
                                                  ```
This will create a new object with the values entered for the ```title``` and ```message``` keys, and it will automatically assign an ID to the Note object

GET: To do a GET request, in the request URL input box type ```http://localhost:3000/api/v1/note?id={_id}``` and in the ```{_id}``` field replace it with the id of the Note you are trying to access.

PUT: To do a PUT request, in the request URL input box type ```http://localhost:3000/api/v1/note?id={_id}``` and in the body content box replace 
                                                  ```
                                                  title: {title},
                                                  message: {message}
                                                  ```
with the new values you want assigned to them, it will then remake the Note object with the same ID but the values you've provided.

DELETE: To do a DELETE request, in the request URL input box type ```http://localhost:3000/api/v1/note?id={_id}``` and in the ```{_id}``` field replace it with the id of the Note you are trying to delete. No further input will be needed, and the Note associated with the ID provided will be deleted.           

## Testing

All of the tests are validating the correct response codes from each of the CRUD method functions, it is verifying that a ```201``` status is received when the function is executed correctly, a ```400``` if the request is bad.