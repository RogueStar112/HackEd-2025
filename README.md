# Hatch

A **project-based platform focused on collaboration & productivity**, made at Tech Educators' 3-day hackathon, **HackEd**. The app focuses on making collaboration easier, so you can find the right people for your project without endless noise from online platforms. The app is a web application built using Next.js, Supabase and Google Gemini's API, deployed using Vercel. Check the _about_ to find the live deployment of the website.

This project is open source, feel free to contribute or use it for your own purposes.

## Features

- Create Projects
  * Input a description of the project, and AI will generate a short about and tags for the project, so it can be easily found by the search engine.
- Find Projects
  * Input a description of what project you are looking for, and AI will help you find projects that match your descriptions.
  * Can filter by age range and time commitment in hours per week.
- Profile Customisation
  * Users can create accounts and set their own interests and skills in their profile, which helps collaborators reach out to you.

## Installation

### Docker

You can run the software on your own computer using Docker, which avoids any package / npm issues.

- Linux
  * install docker via CLI, guide for Ubuntu is [here](https://docs.docker.com/engine/install/ubuntu/)
- MacOS / Windows
  * install Docker Desktop. Note that for Windows, you _will_ need WSL2 for Docker Desktop to work.

Then, setup your API keys. You will need to create a Supabase project at minimum, and get the project URL and Client ANON key.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Then, get a Google Gemini API key. All the links to get the API keys can be found in `/docker/env.sample`

```bash
GEMINI_API_KEY=...
```

Lastly, clone the repo and create a `.env` file

```bash
git clone https://github.com/RogueStar112/HackEd-2025
cd HackEd-2025/docker
cp .env.{sample,}
```

Use a text editor to fill in the API keys in `.env`

Lastly, run the software on `localhost:3002`. If you want to use a different port, change any instance of `3002` in the Dockerfile and these commands to any other port.

```bash
sudo docker build -t hatch .
sudo docker run -it --env-file .env --rm -p 3002:3002 hatch
```

Then, visit `localhost:3002` to see the website.

### Git

For development purposes, it is easier to use Git to install the software.

You _will_ need Node.js at least v20, install [here](https://nodejs.org/en/download)

Clone the repository

```bash
git clone https://github.com/RogueStar112/HackEd-2025
cd HackEd-2025/hatch
npm install
```

Then, make a .env file

```bash
cp ../docker/.env.sample .env
```

Follow the same steps from above to setup Supabase and get the API keys from Supabase and Google Gemini.

Lastly, run the application:

```bash
npm run dev -- -p 3002
```



