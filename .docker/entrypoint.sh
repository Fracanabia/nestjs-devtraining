#!/bin/bash

# 1
npm install

# 2
npm run build

# 3
npx typeorm migration:run -d dist/database.providers.js

# 4
npm run start:dev
