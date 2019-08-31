
cd /home/zyrilerrol/fabric-dev-servers
./startFabric.sh
composer network install --card PeerAdmin@hlfv1 --archiveFile supsi-tiforma@0.0.17.bna
composer network start --networkName supsi-tiforma --networkVersion 0.0.17 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 –file networkadmin.card
composer-rest-server -c admin@supsi-tiforma -n never
