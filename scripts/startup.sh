#!/bin/sh

cd frontend || exit
npm run build
cd ..
x-terminal-emulator -T "Run Leon & Sylvia backend" -e "cd backend;npm run webpack"
x-terminal-emulator -T "Run Leon & Sylvia backend" -e "cd backend;npm run startlocal"
x-terminal-emulator -T "Run Leon & Sylvia frontend" -e "cd frontend;npm start"
