FROM denoland/deno:bin-2.0.3 AS deno
FROM mcr.microsoft.com/devcontainers/typescript-node
COPY --from=deno /deno /usr/local/bin/deno
