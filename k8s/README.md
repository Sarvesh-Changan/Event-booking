### K8s manifests

#### K8s manifest files 
- mongo-config.yaml
- mongo-secret.yaml
- mongo.yaml
- webapp.yaml

##### start KinD
```
kind create cluster --name node
```
#### Apply k8s manifests
```
kubectl apply -f .
```
```
##### get basic info about k8s components
    kubectl get node
    kubectl get pod
    kubectl get svc
    kubectl get all

##### get extended info about components
    kubectl get pod -o wide
    kubectl get node -o wide

##### get detailed info about a specific component
    kubectl describe svc {svc-name}
    kubectl describe pod {pod-name}

##### get application logs
    kubectl logs {pod-name}

#### Access web app

kubectl port-forward svc/webapp-service 3000:3000
```
##### delete Kind cluster
```
kind delete cluster --name=node
```
#### Links
* mongodb image on Docker Hub: https://hub.docker.com/_/mongo
* webapp image on Docker Hub: https://hub.docker.com/repository/docker/davarski/k8s-demo-app
* k8s official documentation: https://kubernetes.io/docs/home/
