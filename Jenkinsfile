pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm ci'
                }
            }
        }

        stage('Verify Backend') {
            steps {
                dir('backend') {
                    bat 'node --check server.js'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t ai-jira-devops-api:latest .'
            }
        }
    }

    post {
        success {
            echo 'Jenkins pipeline completed successfully!'
        }

        failure {
            echo 'Jenkins pipeline failed. Check the console output.'
        }
    }
}