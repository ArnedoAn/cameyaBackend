#!/bin/bash

# Migración de base de datos
bunx prisma generate
bunx prisma db push

# Inicia la aplicación
bun run src/app.ts