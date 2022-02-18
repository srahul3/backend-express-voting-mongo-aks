### Brown Field configuration


# creating the resource group
az group create -n <resourcegroupname> -l <location>
#create public ip
az network public-ip create -n <publicipname> -g <resourcegroupname> --allocation-method Static --sku Standard
# create application gateway with WAF enabled.
az network application-gateway create -n <appgwname> -l <location> -g <resourcegroupname> --sku WAF_v2 --public-ip-address <publicipname> --subnet /subscriptions/<subscriptionid>/resourceGroups/<aksvnetresourcegroupname>/providers/Microsoft.Network/virtualNetworks/<vnetname>/Subnets/<subnetname>


az group create -n AKSResourceGroup -l centralindia
az network public-ip create -n srahul3-aks-pip -g AKSResourceGroup --allocation-method Static --sku Standard

az network application-gateway create -n srahul3-aks-ag -l centralindia -g AKSResourceGroup --sku Standard_v2 --public-ip-address srahul3-aks-pip --subnet ingress-appgateway --subnet /subscriptions/f99fd245-91fb-4fb5-80b5-3a12f48208a1/resourceGroups/srahul3-gw/providers/Microsoft.Network/virtualNetworks/aks-vnet-10369927/Subnets/ingress-appgateway-subnet --vnet-name aks-vnet-10369927
az network application-gateway create -n srahul3-aks-ag -l centralindia -g AKSResourceGroup --sku Standard_v2 --public-ip-address srahul3-aks-pip --subnet ingress-appgateway --subnet agw --vnet-name aks-vnet-10369927
az network application-gateway create --capacity 2 --frontend-port 80 --http-settings-cookie-based-affinity Enabled \
--http-settings-port 80 --http-settings-protocol Http --location centralindia --name agw --public-ip-address srahul3-aks-pip \
--resource-group AKSResourceGroup --sku Standard_Small --subnet GatewaySubnet --vnet-name aks-vnet-10369927
az network application-gateway create -g AKSResourceGroup -n agw --capacity 2 --sku Standard_Medium \
    --vnet-name aks-vnet-10369927 --subnet GatewaySubnet --http-settings-cookie-based-affinity Enabled \
    --public-ip-address srahul3-aks-pip --servers 10.0.0.4 10.0.0.5

Note: The Subnet ID must point to an empty subnet within a vnet which has access 

az network public-ip create -n srahul3-aks-pipnew -g AKSResourceGroup --allocation-method Static --sku Standard
az network vnet create -n myVnet -g AKSResourceGroup --address-prefix 11.0.0.0/8 --subnet-name mySubnet --subnet-prefix 11.1.0.0/16 
az network application-gateway create -n myApplicationGateway -l canadacentral -g AKSResourceGroup --sku Standard_v2 --public-ip-address srahul3-aks-pipnew --vnet-name myVnet --subnet mySubnet


# enable AGIC on an existing AKS cluster
appgwId=$(az network application-gateway show -n agw -g AKSResourceGroup -o tsv --query "id") 
az aks enable-addons -n srahul3-github-aks -g AKSResourceGroup -a ingress-appgw --appgw-id $appgwId





apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    kubernetes.io/ingress.class: azure/application-gateway
    appgw.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
    - secretName: nginx-cert
      hosts:
        - sampleapp.com
  rules:
  - host: sampleapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          serviceName: nginx-service
          servicePort: 80




