### Brown Field configuration


# creating the resource group
az group create -n <resourcegroupname> -l <location>
#create public ip
az network public-ip create -n <publicipname> -g <resourcegroupname> --allocation-method Static --sku Standard
# create application gateway with WAF enabled.
az network application-gateway create -n <appgwname> -l <location> -g <resourcegroupname> --sku WAF_v2 --public-ip-address <publicipname> --subnet /subscriptions/<subscriptionid>/resourceGroups/<aksvnetresourcegroupname>/providers/Microsoft.Network/virtualNetworks/<vnetname>/Subnets/<subnetname>

Note: The Subnet ID must point to an empty subnet within a vnet which has access 

# creating publiv ip
az network public-ip create -n srahul3-aks-pip -g srahul3-aks-rg --allocation-method Static --sku Standard -l centralindia
# creating subnet
az network vnet create -n aks-vnet-35044775 -g srahul3-aks-rg --address-prefix 11.0.0.0/8 --subnet-name agw-subnet --subnet-prefix 11.1.0.0/16 
# creating application gateway
az network application-gateway create -n agw -l centralindia -g srahul3-aks-rg --sku Standard_v2 --public-ip-address srahul3-aks-pip --vnet-name aks-vnet-35044775 --subnet agw-subnet

/
# enable AGIC on an existing AKS cluster
appgwId=$(az network application-gateway show -n agw-aks -g MC_srahul3-aks-rg_srahul3-aks_centralindia -o tsv --query "id")
# In case add-on is aready installed with a gateway. Uninstall using nelow command 
az aks disable-addons -a ingress-appgw -n srahul3-aks -g srahul3-aks-rg
# Installing addon
az aks enable-addons -n srahul3-aks -g srahul3-aks-rg -a ingress-appgw --appgw-id $appgwId


#Ingress file sample
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




