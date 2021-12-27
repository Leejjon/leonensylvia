#!/bin/sh

x-terminal-emulator -T "Run Leon & Sylvia backend" -e "cd backend;npm run webpack"
x-terminal-emulator -T "Run Leon & Sylvia backend" -e "cd backend;npm start"
x-terminal-emulator -T "Run Leon & Sylvia frontend" -e "cd frontend;npm start"
