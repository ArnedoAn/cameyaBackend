# Cameya Backend

Node.js backend for Cameya web project.

## Database configuration

1. Install and start [Docker](https://www.docker.com/get-started).<br>
2. Download the Docker image for Postgres: 

   ```
   docker pull postgres
   ```

3. Run the Docker container:

   ```
   docker run --name postgres-db -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
   ```

4. Extract the database connection information:

   ```json
   {
     "host": "localhost",
     "port": 5432,
     "username": "postgres",
     "password": "mysecretpassword",
     "database": "postgres"
   }
   ```

  5. Explore the api services at http://localhost:3000/api/docs.
