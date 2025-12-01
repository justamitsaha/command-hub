# GCP Kubernetes Deployment Guide

This guide explains how to deploy the Developer Toolkit on GCP Kubernetes with the `/support` base path.

## Build Docker Image

```bash
# Build the image
docker build -t gcr.io/YOUR_PROJECT_ID/developer-toolkit:latest .

# Push to GCP Container Registry
docker push gcr.io/YOUR_PROJECT_ID/developer-toolkit:latest
```

## Configure Environment Variables

The app reads configuration from environment variables that can be set via Kubernetes ConfigMap:

- `URL_MAP`: JSON string containing URL mappings
- `COMMAND_SECTIONS`: JSON string containing command sections

Example in `k8s-example.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: developer-toolkit-config
data:
  URL_MAP: '{"Service Name": "/path"}'
  COMMAND_SECTIONS: '[{"title": "Section", "commands": {}}]'
```

## Deploy to Kubernetes

1. **Update k8s-example.yaml**:
   - Replace `YOUR_PROJECT_ID` with your GCP project ID
   - Replace `YOUR_STATIC_IP_NAME` with your reserved static IP name
   - Replace `your-domain.com` with your actual domain
   - Update the ConfigMap with your actual URLs and commands

2. **Apply the configuration**:
```bash
kubectl apply -f k8s-example.yaml
```

3. **Verify deployment**:
```bash
kubectl get pods
kubectl get svc
kubectl get ingress
```

## Access the Application

The app will be available at: `https://your-domain.com/support`

## Update Configuration

To update the configuration without rebuilding:

```bash
# Edit the ConfigMap
kubectl edit configmap developer-toolkit-config

# Restart pods to pick up new config
kubectl rollout restart deployment/developer-toolkit
```

## Local Development

For local development, the app runs on `http://localhost:8080` without the `/support` prefix (configured in vite.config.ts).

## Environment Variable Format

### URL_MAP
Must be a valid JSON object:
```json
{
  "Display Name": "/api/path",
  "Another Service": "/another/path"
}
```

### COMMAND_SECTIONS
Must be a valid JSON array:
```json
[
  {
    "title": "Section Title",
    "description": "Optional description",
    "commands": {
      "command-to-run": "Description of command"
    }
  }
]
```
