cd ~
rm -rf pack-roger/
cp -r roger pack-roger
cd pack-roger
rm -rf .git
rm -rf node_modules
cp ../roger.pem key.pem
cd ..
zip -r roger.zip pack-roger
