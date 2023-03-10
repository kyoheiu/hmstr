dev:
	cd client && sudo rm -rf .next
	cd server && sudo chown -R ${USER}:${GROUP} databases
	cd client && yarn run dev & cd server && RUST_LOG=info cargo run -r && fg

test:
	hurl --test test.hurl

stop:
	killall node && killall hmstr-server

build:
	sudo docker build --tag=kyoheiudev/hmstr-server:$(VER) server 
	sudo docker build --tag=kyoheiudev/hmstr-client:$(VER) client 

push:
	sudo docker push kyoheiudev/hmstr-server:$(VER)
	sudo docker push kyoheiudev/hmstr-client:$(VER)

run:
	sudo docker compose up -d

down:
	sudo docker compose down --remove-orphans

remove:
	sudo docker compose down --remove-orphans
	sudo docker rm $(sudo docker ps -a -q) -f
	sudo docker rmi $(sudo docker images -a -q) -f
