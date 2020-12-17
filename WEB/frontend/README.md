# ZTP-Cisco FRONTEND
Zero Touch Provisioning System for Cisco

This is the Frontend code.

## Requirments
- NPM

## Install libs
```npm install```


## Start DEV
Following command will start dev-server on localhost on port 3000, port can be changed in nuxt.config.js.
```npm run dev```

## Build for Prod
### Build
```npm run build```

### Add folder to API which handles all the traffic:
Remove old folder
```rm -rf ../backend/app/dist```
Add the new folder containing built frontend
```mv dist/ ../backend/app/```
