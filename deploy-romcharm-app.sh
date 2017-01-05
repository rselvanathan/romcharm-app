docker pull rselvanathan/romcharm-app:latest
isImageRunning=$(docker inspect -f {{.State.Running}} romcharm-app 2> /dev/null)
if [ "$isImageRunning" = "true" ]; then
	echo "Removing romcharm-app container"
	docker stop romcharm-app
	docker rm romcharm-app
fi
value=$(docker images -q --filter "dangling=true")
if [ "$value" = "" ]; then
	echo "No Dangling Images"
else
	echo "Removing Dangling Images"
 	docker images -q --filter "dangling=true" | xargs docker rmi
fi
docker run -d -e VIRTUAL_HOST={URLS} --name romcharm-app -it rselvanathan/romcharm-app:latest