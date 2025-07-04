md extensions
cd extensions

IF EXIST CocosHeronFramework (
goto update
) ELSE (
goto clone
)

:clone
git clone -b main https://github.com/amoureux-lin/CocosHeronFramework.git

:update
cd CocosHeronFramework
git pull

npm install
npm build