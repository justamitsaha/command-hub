import type { CommandSection } from "@/types/config";

/* Default URL Generator Configuration */
const DEFAULT_URL_MAP: Record<string, string> = {
  "Config Server Actuator": "/config/actuator/health",
  "Config for Order API ": "/config/order-service/dev",
  "Config for Customer API": "/config/customer-service/default/main",
  "Config for Gateway": "/config/gateway-service/default/main",
  "Config for Discovery": "/config/discovery-service/default/main",
  "Eureka Dashboard": "/discovery",
  "Eureka Actuator:": "/discovery/actuator/health",
  "Gateway Actuator": "/gateway",
  "Customer Actuator": "/api/customer/actuator/health",
  "Customer Swagger": "/api/customer/swagger-ui/webjars/swagger-ui/index.html",
  "Order Service": "/api/order/actuator/health",
  "Web App": "/web",
};

/* Default Command Sections */
const DEFAULT_COMMAND_SECTIONS: CommandSection[] = [
  {
    title: "App Set up Commands",
    commands: {
      "cd /c/Amit/Work/code/Java/microservice/microservice-Patterns": "Go to project root",
      "kubectl create namespace microservice 2>/dev/null || true": "Create microservice namespace",
      "kubectl apply -f setup/k8s/microservice/kafka-allow-from-microservice.yaml": "Allow microservice namespace to access Kafka",
      "kubectl apply -f setup/k8s/microservice/config-bus-topic.yaml": "Create Config Bus topic",
      "kubectl apply -f setup/k8s/microservice/config-map/ -n microservice": "Apply Config Maps",
      "kubectl apply -f setup/k8s/microservice/deployment/mysql.yaml -n microservice": "Apply MySQL deployment",
      "export IMAGE_REPO=justamitsaha": "Set Docker image repo",
      "export IMAGE_VERSION=v1": "Set version tag",
      "envsubst < setup/k8s/microservice/deployment/configservice.yaml | kubectl apply -n microservice -f -": "Apply Config Service deployment",
      "envsubst < setup/k8s/microservice/deployment/discovery.yaml    | kubectl apply -n microservice -f -": "Apply Discovery Service deployment",
      "envsubst < setup/k8s/microservice/deployment/gateway.yaml      | kubectl apply -n microservice -f -": "Apply API Gateway deployment",
      "envsubst < setup/k8s/microservice/deployment/customer.yaml     | kubectl apply -n microservice -f -": "Apply Customer MS deployment",
      "envsubst < setup/k8s/microservice/deployment/reactive-order.yaml | kubectl apply -n microservice -f -": "Apply Reactive Order MS deployment",
      "envsubst < setup/k8s/microservice/deployment/webapp.yaml       | kubectl apply -n microservice -f -": "Apply Web App deployment",
      "kubectl apply -f setup/k8s/microservice/ingress -n microservice": "Apply Ingress setup",
      "curl -X POST http://localhost:8080/actuator/busrefresh": "Trigger config refresh via Bus"
    }
  },
  {
    title: "List pods/services etc",
    description: "Core kubectl operations",
    commands: {
      "kubectl get ns": "List all namespaces",
      "kubectl get all -n microservice": "List all resources in microservice namespace",
      "kubectl get pods -A": "List all pods in all namespaces",
      "kubectl get svc -A": "List all services in all namespaces",
      "kubectl describe pod POD_NAME -n NAMESPACE": "Describe a specific pod",
      "kubectl delete ingress --all -n microservice": "Delete all ingresses in microservice namespace"
    }
  },
  {
    title: "Deployments Rollout with Restart with out changing image tag",
    commands: {
      "kubectl rollout restart deployment/configservice -n microservice": "Restart Config MS deployment",
      "kubectl rollout restart deployment/discovery -n microservice": "Restart Discovery MS deployment",
      "kubectl rollout restart deployment/gateway -n microservice": "Restart Gateway MS deployment",
      "kubectl rollout restart deployment/customerservice -n microservice": "Restart Customer MS deployment",
      "kubectl rollout restart deployment/reactiveorderservice -n microservice": "Restart Order MS deployment",
      "kubectl rollout restart deployment/webapp -n microservice": "Restart WEb app deployment",
      "kubectl rollout status deployment/configservice -n microservice": "Check rollout status of Config Service deployment",
      "kubectl rollout status deployment/discovery -n microservice": "Check rollout status of Discovery Service deployment",
      "kubectl rollout status deployment/gateway -n microservice": "Check rollout status of Gateway deployment",
      "kubectl rollout status deployment/customerservice -n microservice": "Check rollout status of Customer MS deployment",
      "kubectl rollout status deployment/reactiveorderservice -n microservice": "Check rollout status of Reactive Order MS deployment",
      "kubectl rollout status deployment/webapp -n microservice": "Check rollout status of Web App deployment",
      "kubectl get pods -n microservice -l app=configservice": "Get pods for Config Service",
      "kubectl get pods -n microservice -l app=discovery": "Get pods for Discovery Service",
      "kubectl get pods -n microservice -l app=gateway": "Get pods for Gateway",
      "kubectl get pods -n microservice -l app=customerservice": "Get pods for Customer MS",
      "kubectl get pods -n microservice -l app=reactiveorderservice": "Get pods for Reactive Order MS",
      "kubectl get pods -n microservice -l app=webapp": "Get pods for Web App"
    }
  },
  {
    title: "Debugging Commands",
    commands: {
      "kubectl get pods -n microservice": "List all pods in microservice namespace",
      "kubectl exec -it sample -n microservice -- sh": "Enter shell of sample pod",
      "kubectl logs -f sample -n microservice": "Tail logs of sample pod"
    }
  },
  {
    title: "Port Forwarding",
    description: "Access internal services locally",
    commands: {
      "kubectl port-forward svc/mysql 3307:3306 -n microservice": "Forward MySQL to localhost:3307",
      "kubectl port-forward svc/redis 6380:6379 -n microservice": "Forward Redis to localhost:6380"
    }
  },
  {
    title: "Docker Commands",
    description: "Useful for debugging containers",
    commands: {
      "docker logs -f container-name": "Tail container logs",
      "docker exec -it container-name sh": "Enter running container shell"
    }
  }
];

/* Export configuration with environment variable support */
export const URL_MAP: Record<string, string> = 
  typeof window !== 'undefined' && window.APP_CONFIG?.urlMap 
    ? window.APP_CONFIG.urlMap 
    : DEFAULT_URL_MAP;

export const COMMAND_SECTIONS: CommandSection[] = 
  typeof window !== 'undefined' && window.APP_CONFIG?.commandSections 
    ? window.APP_CONFIG.commandSections 
    : DEFAULT_COMMAND_SECTIONS;
