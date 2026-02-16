# aws-ecs

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.2.23. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

docker run -p 8081:8001 --env-file .env node-api:v2

kind create cluster --name local
or
kind create cluster --config ./k8s/local/kind/kind-cluster.yml --name local
