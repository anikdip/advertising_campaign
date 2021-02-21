## Advertising Campaign Project

# Here technology uses
- Laravel for backend with rest api
- React for frontend
- Docker for containerization

## Project running steps

# Run the Laravel Backend Project

 For installing the backend download the advertising_campaign_backend project and run the below code

```
composer update
```

# Step by step code for run the docker image

To run the php, mysql and nginx docker container

```
docker-compose up -d
```

To clear the cache run the below code

```
docker-compose exec app php artisan config:cache
```

To clear the cache run the below code

```
docker-compose exec app php artisan config:cache
```

 For database migration use below code
 
``` 
docker-compose exec app php artisan migrate
```

For initialize the passport run below code

``` 
docker-compose exec app php artisan passport:install
```

For testring the test cases run below code

``` 
docker-compose exec app composer test
```

Now the backend running with full funcationality


# Run the React Frontend Project

For installing the frontend download the advertising_campaign_client project and run the below code 

``` 
npm install
```

To run the react docker container runt the below code

```
docker-compose up -d
```

Now both the backend and frontend application running properly
