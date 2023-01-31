docker build -t knights-tale-webapi-image -f Dockerfile .

if %ERRORLEVEL% NEQ 0 goto END

REM docker images
REM Run as image
REM docker run --rm -it knights-tale-webapi-image

docker container create -it --name knights-tale-webapi-container knights-tale-webapi-image
docker start -ai knights-tale-webapi-container

:END

pause