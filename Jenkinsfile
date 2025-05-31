pipeline {
    agent any

    tools {
        nodejs 'NodeJS_24'
    }

    stages {
        stage('Clone') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    git branch: 'main',
                        credentialsId: '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',
                        url: 'https://github.com/flormery/capachica.git'
                }
            }
        }

        stage('Install dependencies') {
            steps {
                dir('turismo-frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('turismo-frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    dir('turismo-frontend') {
                        sh 'npx sonar-scanner'
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
