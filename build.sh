cd frontend
npm run build
cd ..
\cp frontend/build/* backend/public/ -rf
mkdir backend/templates
mv backend/public/index.html backend/templates/index.html