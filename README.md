# Monitoring
Monitoring is provided using prometheus and visualized using grafana and can only be used in docker container

## routes

deploying the docker container will create four servers : 
1. localhost:3000 for the backend app
2. localhost:3030 for exporting the metrics (localhost:3030/metrics)
3. localhost:9090 for the prometheus server 
4. localhost:3002 for the grafana server

## Usage

after deploying grafana can be accessed using (localhost:3002) the default user name and password are :
1. username : admin
2. password : admin

after accessing grafana you need to add the data source as (http://localhost:9090) depending on the deploy and then u can add you dashboard

## Examples
### General inforamtion monitoring example

[general information example](https://i.postimg.cc/MGtsVkXX/Screenshot-from-2024-08-31-11-49-29.png)
 <img src="https://i.postimg.cc/MGtsVkXX/Screenshot-from-2024-08-31-11-49-29.png" />

### Database monitoring examples
[Database operation example](https://i.postimg.cc/vH6SjS2S/Screenshot-from-2024-08-31-11-24-17.png)
 <img src="https://i.postimg.cc/vH6SjS2S/Screenshot-from-2024-08-31-11-24-17.png" />

[Database general example](https://i.postimg.cc/3xXfr0TX/Screenshot-from-2024-08-31-11-24-47.png)
 <img src="https://i.postimg.cc/3xXfr0TX/Screenshot-from-2024-08-31-11-24-47.png" />

[database requsets with results example](https://i.postimg.cc/rmmf9htj/Screenshot-from-2024-08-31-11-51-18.png)
 <img src="https://i.postimg.cc/rmmf9htj/Screenshot-from-2024-08-31-11-51-18.png" />
### RESTfull api monitoring example

[request api request count example](https://i.postimg.cc/SxFtp7wQ/Screenshot-from-2024-08-31-11-49-59.png)
 <img src="https://i.postimg.cc/SxFtp7wQ/Screenshot-from-2024-08-31-11-49-59.png" />
[request api response latency example](https://i.postimg.cc/43XLY4fr/Screenshot-from-2024-08-31-11-50-08.png)
 <img src="https://i.postimg.cc/43XLY4fr/Screenshot-from-2024-08-31-11-50-08.png" />

