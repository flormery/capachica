pipeline {
    agent any

    tools {
        // El “Name” que diste en Jenkins Admin → Tools → NodeJS
        nodejs 'NodeJS_24'
    }

    stages {
        stage('Clone') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
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




        stage('Build') {
            steps {
                dir('capachica-app') {
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('capachica-app') {
                    withSonarQubeEnv('sonarqube') {
                        sh 'npx sonar-scanner'
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success { echo '✅ ¡Todo verde!' }
        failure { echo '🚨 Algo falló, échale un ojo.' }
        always  { echo '🔚 Pipeline finalizado.' }
    }
}