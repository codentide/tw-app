pipeline {
    agent any
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main',
                credentialsId: 'git-jenkins',
                url: 'https://github.com/codentide/wt-application.git'
            }
        }
        stage('Docker image build'){
            steps {
                    script {
                        withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                        ]) {
                            sh """
                                sed -i "s|\\${MONGO_URI}|****|g" backend/docker-compose.yml
                                docker-compose -f backend/docker-compose.yml build
                            """
                        }
                    }
                }
        }

        stage('Docker container deployment'){
            steps {
                script {
                    withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        sh """
                            chmod +x backend/docker-compose.yml
                            docker-compose -f backend/docker-compose.yml up -d
                        """
                    }
                }
            }
        }
    }
    post {
        always {
            emailext subject: "Build state: ${currentBuild.currentResult}",
                      body: "Build completed, more details at ${env.BUILD_URL}",
                      to: "marco.delboccio@est.iudigital.edu.co"
        }
    }
}
