# Voting application Node JS Restfull server based on Express
### Acronyms
Stacks = GitHub template

### What does this application do?
This Voting application is architectured as distributed scalable, resilient and highly scalable application. The Stacks are armed with Github Actions to auto deploy on kubernettes cluster. After deployment all applications will work together on AKS cluster.

The application is divided into 2 stacks based on teams responsibilty.

## Frontend
The application is built using React JS. The UI provisions the pages to view the list of voting candidates and later allow user to cast the vote.
Link : https://github.com/srahul3/frontend-react-voting-aks

## Backend
The application os built using Node JS featured with Express. The application exposes http rest API which frontend consumes it.
Exposed API are:
GET /voting  -  List all the voting candiadates.
PATCH /vote/:candidateID - Request to increment the candidate's vote by 1.

Link: https://github.com/srahul3/backend-express-voting-mongo-aks

## Deployment
The applications and services will self deploy to Azure and AKS using GitHub Actions. 
Each deplyment is scaled to 2 replicas for demostration purpose.
Each stack will also configure the respective Loadbalancer services.
Each stack will also congire it own ingress rules to Azure Application Gateway.



### Goal
The goal of this templete is to help 
