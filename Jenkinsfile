pipeline {
	agent {
		node {
			label 'urbano-staging'
			customWorkspace '/home/conexa/oca/backend-tn'
		}
	}
	stages {
		stage('Installation of dependencies') {
			steps {
                		echo 'npm install.......'
				dir('/home/conexa/oca/backend-tn') {
					sh 'yarn install'
				}
            		}
        	}
		stage('Build app') {
			steps {
                		echo 'copying .env.example........'
				dir('/home/conexa/oca/backend-tn'){
					script {
						sh "cp .env.example .env"
						sh "sed -i '4,5d' /home/conexa/oca/backend-tn/.env"
                        sh "sed -i '4i API_URL=https://oca-tiendanube-api-stage.conexa.ai' /home/conexa/oca/backend-tn/.env"  
                        sh "sed -i '5i FRONTEND_URL=https://oca-tiendanube-stage.conexa.ai' /home/conexa/oca/backend-tn/.env" 
					}
				}
            		}
        	}
        	stage('Launch app') {
            		steps {
                		echo 'pm2 start.......'
				   	    sh 'yarn compile'
					    sh 'pm2 start ecosystem.config.json'
					    sh 'pm2 save'
            		}
        	}
    	}
	post {
		success {
	               	slackSend channel: '#notifications-jenkins', color: '#6495ed', message: "Success: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        	}

      		failure {
	               	slackSend channel: '#notifications-jenkins', color: '#ff0000', message: "Failure: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
      		}

  	}

}
