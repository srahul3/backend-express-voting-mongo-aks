# Voting application Node JS Restful server based on Express
### Acronyms
Stacks = GitHub template

## What does this application do?
This Voting application is architectured as distributed scalable, resilient and highly scalable application. The Stacks are armed with Github Actions to auto-deploy on the Kubernetes cluster. After deployment, all applications will work together on the AKS cluster.

The application is divided into 2 stacks based on the team's responsibility.

### Frontend
The application is built using React JS. The UI provisions the pages to view the list of voting candidates and later allow the user to cast the vote.
Link: https://github.com/srahul3/frontend-react-voting-aks

### Backend
The application is built using Node JS featured with Express. The application exposes HTTP rest API which the frontend consumes.
Exposed APIs are:
GET /voting  -  List all the voting candidates.
PATCH /vote/:candidateID - Request to increment the candidate's vote by 1.

Link: https://github.com/srahul3/backend-express-voting-mongo-aks

### Deployment
The applications and services will self deploy to Azure and AKS using GitHub Actions. 
Each deployment is scaled to 2 replicas for demonstration purposes.
Each stack will also configure the respective Loadbalancer services.
Each stack will also configure its own ingress rules to Azure Application Gateway. The configuration is programmatically through YML configs on each stack.

Network traffic flow is shown in the below image
![image](https://user-images.githubusercontent.com/17195847/154816871-b96336fe-9743-4dc7-a36d-99fbd236a287.png)
The Application Gateway follows path-based routing. There will be one public IP configured and based on the URL path, the request will be routed to its respective service. The user can configure the WAF and other added security features by visiting the Azure portal. The Application Gateway programmatically gets configured by Ingess.yml by each stack.

## Before you begin
Note: Use the same location of all the resources you are going to create in the next steps.
Setup a VNET for this application. VNET provide network communication boundaries for different application to talk to each other within the same VNET.
Setup a Cosmos-Mongo in the same VNET under the default subnet.
Setup AKS cluster in the same VNET.
Set up a Public IP and assign a DNS to it. e.g. <user>-<voting>.centralindia.cloudapp.azure.com
Setup a default Application Gateway Service to be used by Kubernetes ingress controller.

After setup, we need to set up the ingress and Application Gateway Ingress Controller (AGIC) add-on. Read:
  https://docs.microsoft.com/en-us/azure/aks/ingress-basic?tabs=azure-cli
  https://docs.microsoft.com/en-us/azure/application-gateway/tutorial-ingress-controller-add-on-existing?toc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fazure%2Faks%2Ftoc.json&bc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fazure%2Fbread%2Ftoc.json

  Also, read the architecture of AGIC at https://azure.github.io/application-gateway-kubernetes-ingress/
  