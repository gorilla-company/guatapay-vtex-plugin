pipeline{

	agent{
	        node {
          	        label 'clip-production'
            }
         }
	environment {
        SCANNER_HOME = tool 'sonarqube'
	}
	stages {
    stage('SonarQube analysis') {
    
    steps {
            script{
			        dir('/home/conexa/workspace/Clients/Guatapay/staging/analyzing-deploy-source-code/src'){

                            withSonarQubeEnv(credentialsId: 'jenkins-sonarqube', installationName: 'sonarqube') {
                                                sh '''$SCANNER_HOME/bin/sonar-scanner \
                                                -Dsonar.projectKey=guatapay-backend-vtex-prod \
                                                -Dsonar.projectName=guatapay-backend-vtex-prod \
                                                -Dsonar.sources=. \
                                                -Dsonar.projectVersion=${BUILD_NUMBER}-${GIT_COMMIT_SHORT}'''
                            }
                    }
                  }
           }
}
// stage("Quality gate") {
//       steps {
//         script {
//           def qualitygate = waitForQualityGate()
//           sleep(10)
//           if (qualitygate.status != "OK") {
//             waitForQualityGate abortPipeline: true
//           }
//         }
//       }
//     }

stage ("build") {		//an arbitrary stage name
            steps {
                build 'deploy-backend-vtex'	//this is where we specify which job to invoke.
            }
        }
}
}
