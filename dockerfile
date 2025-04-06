FROM node:18
COPY . .
RUN npm i
EXPOSE 3000 
CMD [ "node","index.js" ]