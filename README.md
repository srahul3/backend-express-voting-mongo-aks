# Voting application Node JS Restfull server based on Express
### Acronyms
Stacks = GitHub template

## What does this application do?
This Voting application is architectured as distributed scalable, resilient and highly scalable application. The Stacks are armed with Github Actions to auto deploy on kubernettes cluster. After deployment all applications will work together on AKS cluster.

The application is divided into 2 stacks based on teams responsibilty.

### Frontend
The application is built using React JS. The UI provisions the pages to view the list of voting candidates and later allow user to cast the vote.
Link : https://github.com/srahul3/frontend-react-voting-aks

### Backend
The application os built using Node JS featured with Express. The application exposes http rest API which frontend consumes it.
Exposed API are:
GET /voting  -  List all the voting candiadates.
PATCH /vote/:candidateID - Request to increment the candidate's vote by 1.

Link: https://github.com/srahul3/backend-express-voting-mongo-aks

### Deployment
The applications and services will self deploy to Azure and AKS using GitHub Actions. 
Each deplyment is scaled to 2 replicas for demostration purpose.
Each stack will also configure the respective Loadbalancer services.
Each stack will also congire it own ingress rules to Azure Application Gateway.

Network traffic flow is shoen in below image
![image](https://user-images.githubusercontent.com/17195847/154816871-b96336fe-9743-4dc7-a36d-99fbd236a287.png)
The Application Gateway folows path based routing. There will be one public IP configure and based on URL path, the request will be routed to it respective service. The user can configure the WAF and other added security features by visiting Azure portal. The Application Gateway programatically gets configure by Ingess.yml in each stacks.

## Before you begin
Note: Use same location of all the resource you are going to create in next steps.
Setup a VNET for this application. Vnet provide network communication boundaries for different application to talk to each other with in same VNET.
Setup a Cosmos-Mongo in same VNET under default subet.
Setup AKS cluster in same VNET.
Setup a Public IP and assign a DNS to it. e.g. <user>-<voting>.centralindia.cloudapp.azure.com
Setup a defauly Application Gateway Service to be used by Kubnettes ingess controller.

After setup we need to setup ingress and Application Gateway Ingress Controller (AGIC) add-on. Read:
  https://docs.microsoft.com/en-us/azure/aks/ingress-basic?tabs=azure-cli
  https://docs.microsoft.com/en-us/azure/application-gateway/tutorial-ingress-controller-add-on-existing?toc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fazure%2Faks%2Ftoc.json&bc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fazure%2Fbread%2Ftoc.json
  

