pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "MAVEN_HOME"
    }

    stages {
        stage('Clone') {
            steps {
                timeout(time: 2, unit: 'MINUTES'){
                    git branch: 'main', credentialsId: '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', url: 'https://github.com/flormery/capachica.git'
                }
            }
        }
                stage('Test') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    // Ejecuta pruebas unitarias y genera cobertura con karma + jasmine
                    sh 'ng test --watch=false --code-coverage'
                }
            }
        }

        stage('Sonar') {
            steps {
                timeout(time: 12, unit: 'MINUTES') {
                    withSonarQubeEnv('sonarqube') {
                        sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=frontend \
                          -Dsonar.sources=src \
                          -Dsonar.tests=src \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                          -Dsonar.test.inclusions=**/*.spec.ts \
                          -Dsonar.exclusions=**/*.spec.ts,**/node_modules/** \
                          -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
                        '''
                    }
                }
            }
        }

        stage('Quality gate') {
            steps {
                sleep(time: 10, unit: 'SECONDS')
                timeout(time: 12, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deploy (opcional)') {
            steps {
                timeout(time: 12, unit: 'MINUTES') {
                    echo 'Despliegue local solo para desarrollo...'
                    echo 'ng serve --configuration=production'
                    // sh 'ng serve --configuration=production' // solo si no necesitas el terminal activo
                }
            }
    }
}