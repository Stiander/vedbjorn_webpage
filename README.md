# VEDBJØRN WEBAPP

For browsers

## How to debug

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
## How to build for production

1. Run `npm run build`
2. Run `npm install -g firebase-tools` (if you havent already)
3. Run `firebase login`
4. Run `firebase init`
   1. Select the "Hosting : Configure and deploy..." option
   2. Select "Use an existing project"
   3. Select the "Vedbjørn" project
   4. When asked "What do you want to use as your public directory" : write "build"
   5. When asked "Configure as a single-page app" : answer "y"
   6. When asked "Set up automatic builds and deploys with Github" : answer "n"
   7. When asked "File build/index-html already exists. Overwrite?" : answer "n"
5. Run `firebase deploy`

##
To Rebuild after the initial setup, just do 1. and then 5.
