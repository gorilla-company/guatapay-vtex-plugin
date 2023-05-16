pipeline {
  agent { 
	  node {
          	 label 'srv2-docker-staging'
                 customWorkspace '/home/conexa/guatapay/guatapay-back-vtex'
               }
    }

  environment {
	DOCKERHUB_CREDENTIALS=credentials('github-cr-token')
        name_final = "guatapay-vtex-bd"

    }
    stages {
	  stage('Login in github') {

            steps {
                    echo 'Login in github.......'
                    script {
                            sh 'git clone -b develop https://ajrincones-conexa:$DOCKERHUB_CREDENTIALS_PSW@github.com/conexa-projects/Guatapay.VTEX.git backend-vtex'
                    }
                  }
          } 
          stage('Erase container') {

            when {
                expression { 
                    DOCKER_EXIST = sh(returnStdout: true, script: 'echo "$(sudo docker ps -q --filter name=${name_final})"').trim()
                    return  DOCKER_EXIST != '' 
                }
            }
            steps {
            echo 'erase container.......'    
                script{
			dir('/home/conexa/guatapay/guatapay-back-vtex'){
				
                    		sh ''' 
                         		sudo mv backend-vtex/Dockerfile .
                    		 '''
                    		sh ''' 
                         		sudo mv backend-vtex/docker-compose.yml .
                    		 '''
                    		sh ''' 
                         		sudo docker compose down
                    		 '''
                    	}
              	      }
                 }                                       
            }
    
        stage('Build container') {
	
            steps {
			echo 'build container.......'
                	script{
				dir('/home/conexa/guatapay/guatapay-back-vtex'){
                    			sh ''' 
                    				sudo docker compose build --no-cache
                    			'''
                    		}
               	     	      }	                    
                                  
            	 }
           }
        stage('Up container') {
        
            steps {
                echo 'up container.......'
                script{
			dir('/home/conexa/guatapay/guatapay-back-vtex'){
                    		sh ''' 
                    			sudo docker compose up -d --remove-orphans
 
                    		'''
				sh ''' 
                    			sudo rm -rf backend-vtex
 
                    		'''
                    	}
                      }                    
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
