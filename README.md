# Online Quiz App

## Overview

This is an Online Quiz Application developed using React.js for the frontend, Spring Boot for the backend, and MySQL for the database. Docker is used for containerization, making deployment easier and more consistent across different environments. The application allows users to create, update, and take exams by adding questions, and provides instant results based on the solutions provided.

## Features
- Create, update, and delete exams
- Add, edit, and remove questions from exams
- Take exams and receive instant results
- Dockerized for easy deployment

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- Java Development Kit (JDK) installed
- MySQL database server installed and running
- Docker installed

## Getting Started

To get started with the Online Quiz App, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/lalitjangir2002/Online-Quiz-App.git
```

2. Navigate to the backend directory:

```bash
cd Online-Quiz-App/quiz-online-server
```

3. Configure the backend:

- Open src/main/resources/application.properties and configure your MySQL database connection details.
- Set the server port (I used 9192).

4. Run the backend server

5. Navigate to the frontend directory:

```bash
cd Online-Quiz-App/quiz-online-client
```

6. Install dependencies and start the frontend server:

```bash
npm install
npm run dev
```
7. Access the application at http://localhost:3000 in your web browser.


## Docker Deployment

To deploy the Online Quiz App using Docker, follow these steps:

1 Build the Docker image:

```bash
docker build -t online-quiz-app .
```

2. Run the Docker container:
```bash
docker run -d -p 9192:9192 online-quiz-app
```

3. Access the application at http://localhost in your web browser.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature/new-feature)
3. Make your changes
4. Commit your changes (git commit -m 'Add new feature')
5. Push to the branch (git push origin feature/new-feature)
6. Create a new Pull Request

## Contact
If you have any questions or suggestions about the Online Quiz App, feel free to contact us at <kumar.lalit.cse.2025@gmail.com> .
