FROM node:20

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN git clone https://github.com/RogueStar112/HackEd-2025.git

WORKDIR /app/HackEd-2025/hatch

RUN npm install

EXPOSE 3002

CMD ["npm", "run", "dev", "--", "-p", "3002"]
