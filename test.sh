#!/bin/bash

echo "Iniciando la aplicación..."

bunx prisma generate
bunx prisma db push

bun run src/app.ts