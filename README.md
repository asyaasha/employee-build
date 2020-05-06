# Project Title

Test Challenge - Employee Builder, lets you create employees and assign skills to them

## Getting Started

to test the deployed project use this url 
https://buildopsest-20200505211854-hostingbucket-dev.s3.amazonaws.com/

to run the project locally:

- download the repository with git clone https://github.com/asyaasha/employee-build.git or download the zip file.
- run ```npm install``` to install the dependencies
- run ```npm start``` and open http://localhost:1234

To deploy with aplify publish
-  build the project ```npm run build``` 
- run ```npm deploy``` 

Might need to add project configs first with

```
amplify configure project
```

### Prerequisites

To run this project should have node installed
(version that was used to create this project ```node v12.16.1``` )


## How to Test
```
npm run test 
```
will run jest tests ( just a few tests currently set up )

# EmployeeTable View - url (/)
![table](https://user-images.githubusercontent.com/20131841/81230377-3b45e180-8fa6-11ea-9a64-4a818e71dd54.png)
* Should see the table displayed with employee data when the data is present
* Should be able to click on delete icon and delete an entry
* Should be able to click on edit icon and go to the edit page for an entry
* Should be able to click on the add icon in header on top right and got to create page
* Should show loading state when data loads

# Create View - url (/create)
![create](https://user-images.githubusercontent.com/20131841/81230993-51a06d00-8fa7-11ea-942b-75dbe9585234.png)
* Should be able to create a new employee
* Should be able to create a new skill
* Should not be able to submit empty inputs
* Should show loading state when data loads
* Home button should go back to the table page


# Update View - url (/update/:id)
![edit](https://user-images.githubusercontent.com/20131841/81231025-5f55f280-8fa7-11ea-8c8b-6a00eca68464.png)
* Should be able to update selected entry on submit
* Should show loading state when data loads
* Home button should go back to the table page

## Built With

- [AppSync](https://aws.amazon.com/appsync/)
  For creating the API
- [Amplify](https://docs.amplify.aws/start/getting-started/installation/q/integration/react) - For frontend to backend connectivity
- [React Apollo](https://www.apollographql.com/docs/react/) - for the GraphQLl queries
- [Graph QL](https://graphql.org/) - for loading and updating data
- [DynamoDB] database
