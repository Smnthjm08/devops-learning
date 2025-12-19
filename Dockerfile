FROM oven/bun:alpine

WORKDIR /app

COPY . .
COPY src/ /app/src

RUN bun install

CMD ["bun", "run", "dev"]