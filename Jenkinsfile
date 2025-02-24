pipeline {
    agent any
    tools {
        nodejs 'NodeJS@16'
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                wrap([$class: 'Xvfb']) {
                    sh 'npx playwright test'
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            junit 'playwright-report/*.xml'
        }
    }
}
