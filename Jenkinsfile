pipeline {
    agent any

    tools {
        // El "Name" que diste en Jenkins Admin → Tools → NodeJS
        nodejs 'NodeJS_24'
    }

    stages {
        stage('Clone') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    git branch: 'main',
                        credentialsId: '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', url: 'https://github.com/flormery/capachica.git'
                }
            }
        }

       // A partir de aquí, entramos en capachica-app
    stage('Install dependencies') {
        steps {
            dir('capachica-app') {
                sh 'npm install'
            }
        }
    }

    stage('Unit tests + Coverage') {
        steps {
            dir('capachica-app') {
                sh 'npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage'
            }
        }
    }

    stage('Build') {
        steps {
            dir('capachica-app') {
                sh 'npm run build'
            }
        }
    }
}