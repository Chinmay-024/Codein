# Codein
Codein is an online code compiler

The technology used: React, Nodejs, MongoDB, and Material UI

- Developed a user-friendly online code compiler that allows users to type the code in any desired language and get the compiled output.

- The user can open the website and choose the desired language he wants to code in and then he can set his default language. He can type the code provided in the editor space and also provide the various inputs needed for his code and then submit the code.

- This code is managed in the frontend and after submitting is sent to the backend where node FS api creates a code file for that particular language and also an input file to store the inputs. 

- Then in the backend I make use of child process library of nodejs to run commands on the servers terminal using the exec command. To enable this process I hosted my app on an Azure Virtual Machine running on linux os and there I set up the environment for the common languages available for user to code in. So using exec command of child process library I run different commands to compile and execute the code on the server’s shell depending upon the code language.

- Then since there can be multiple req I have used Bull queue to schedule the tasks to diff workers and use polling to get the status of a particular task and when process executed return the output to the user also saving it in the database.

- Hosted the application on a Microsoft Azure Linux VM for scalability.

- Improved security using Docker containers for a secure, isolated execution environment, enhancing project robustness.

- Designed a user-friendly frontend using React, established a MongoDB schema for efficient data management, and built the backend
with Node.js's Express framework to create a robust and user-friendly coding platform.


## Screenshots

![Home](https://drive.google.com/uc?export=view&id=1VfqsahvmFPJyItiSUHljGFtS2AZN7wQ2)

Example of input and code :

![Admin](https://drive.google.com/uc?export=view&id=1iFzmcZgWuZitTUWzLwcKpgSpgBPXNsvI)


