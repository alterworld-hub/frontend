default:
    @just --list

dev:
    npm run dev

check:
    npm run lint
    npm run build
    npm run typecheck
    helm lint deploy/chart --set host=example.test --set image.tag=local

# Build image and run it on :3000
image:
    docker build -t frontend:local .
    docker run --rm -p 3000:3000 --read-only -e NODE_PATH_ID=local frontend:local
