
# Build from:
FROM node:12-alpine

WORKDIR /

# Copy package & package-lock
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

# Generate styles
RUN npm run build:css

CMD [ "npm", "start" ]