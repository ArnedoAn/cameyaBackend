# Cameya Backend

Cameya Backend is a Node.js application using the Bun runtime for the Cameya web project's backend functionalities.

## Project Deployment

To deploy the Cameya Backend, follow these steps:

### Prerequisites

Ensure that Docker is installed and running on your system. If not, you can download and install Docker from [here](https://www.docker.com/get-started).

### Deployment Steps

1. **Clone the Repository**:

```
git clone https://github.com/ArnedoAn/cameyaBackend
cd cameyaBackend
```

2. **Run Docker Compose**:
   Use the following command to start the Docker containers:

```
docker compose up
```

This command will build and start the necessary containers defined in the `docker-compose.yml` file.

3. **Explore API Services**:
   Once the containers are up and running, you can explore the API services by navigating to:  http://localhost:3000/api/docs
   This URL provides access to the API documentation where you can interact with the various endpoints provided by the Cameya Backend.

That's it! Your Cameya Backend is now deployed and ready for use.
