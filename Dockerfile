FROM node:14.4.0-stretch
WORKDIR /usr/src/app/
COPY . .
RUN cd frontend && npm install && npm run build && cd ../backend && npm install
EXPOSE 3001
WORKDIR /usr/src/app/backend
CMD ["npm",  "start" ]