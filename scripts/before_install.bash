cd /home/ubuntu/server/Stock-platform
sudo docker compose down
sudo docker system prune -a -f

cd /home/ubuntu/server
sudo rm -rf ./Stock-platform