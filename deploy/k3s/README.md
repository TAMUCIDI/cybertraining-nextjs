# CyberTraining K3s deployment

`cybertraining.yaml` updates the existing CyberTraining application at
`https://cyber-dart.geos.tamu.edu/`.

The manifest intentionally manages only the Next.js Deployment, ClusterIP
Service, and Traefik Ingress. It relies on the existing `postgres-service` and
`postgres-secret` resources in the `cybertraining-test` namespace and does not
replace or delete the PostgreSQL StatefulSet or its PVC.

Apply and verify from a host with cluster access:

```bash
kubectl apply -f deploy/k3s/cybertraining.yaml
kubectl -n cybertraining-test rollout status deployment/cybertraining-test-app --timeout=180s
kubectl -n cybertraining-test get pod,service,ingress,endpointslice -o wide
```

Test Traefik directly before testing the public reverse proxy:

```bash
curl -H 'Host: cyber-dart.geos.tamu.edu' http://10.55.180.150:32589/
curl https://cyber-dart.geos.tamu.edu/
```
