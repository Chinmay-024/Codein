FROM alpine:3.16

RUN apk add --no-cache g++

WORKDIR /app

CMD ["tail", "-f", "/dev/null"]

# # Use an official Alpine Linux as a parent image
# FROM alpine:latest


# # Install necessary packages
# RUN apk --no-cache add \
#     g++ \
#     && rm -rf /var/cache/apk/*

# # Set the working directory
# WORKDIR /app

# # Copy the code into the container
# COPY . .

# # Modify the CMD instruction to run a long-lived process (e.g., /bin/sh -c "tail -f /dev/null")
# CMD ["/bin/sh", "-c", "tail -f /dev/null"]


# # Use an official Ubuntu as a parent image
# FROM ubuntu:latest

# # Set environment variables
# ENV DEBIAN_FRONTEND=noninteractive

# # Install necessary packages
# RUN apt-get update && apt-get install -y \
#     g++ \
#     && rm -rf /var/lib/apt/lists/*

# # Set the working directory
# WORKDIR /app

# # Copy the code into the container
# COPY . .

# # Modify the CMD instruction to run a long-lived process (e.g., /bin/sh -c "tail -f /dev/null")
# CMD ["/bin/sh", "-c", "tail -f /dev/null"]
