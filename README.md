Online Quiz App
Overview
This is an Online Quiz Application developed using React.js for the frontend, Spring Boot for the backend, and MySQL for the database. Docker is used for containerization, making deployment easier and more consistent across different environments. The application allows users to create, update, and take exams by adding questions, and provides instant results based on the solutions provided.

Features
User authentication and authorization
Create, update, and delete exams
Add, edit, and remove questions from exams
Take exams and receive instant results
Dockerized for easy deployment
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm installed on your machine
Java Development Kit (JDK) installed
MySQL database server installed and running
Docker installed
Getting Started
To get started with the Online Quiz App, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/online-quiz-app.git
Navigate to the backend directory:

bash
Copy code
cd online-quiz-app/backend
Configure the backend:

Open src/main/resources/application.properties and configure your MySQL database connection details.
Set the server port (default is 9192).
Build and run the backend:

bash
Copy code
./gradlew build
java -jar build/libs/online-quiz-app.jar
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies and start the frontend server:

sql
Copy code
npm install
npm start
Access the application at http://localhost:3000 in your web browser.

Docker Deployment
To deploy the Online Quiz App using Docker, follow these steps:

Build the Docker image:

Copy code
docker build -t online-quiz-app .
Run the Docker container:

arduino
Copy code
docker run -d -p 80:80 online-quiz-app
Access the application at http://localhost in your web browser.

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature/new-feature)
Make your changes
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature/new-feature)
Create a new Pull Request
