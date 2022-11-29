pipeline {
    options {
        // set a timeout of 60 minutes for this pipeline
        timeout(time: 60, unit: 'MINUTES')
    }

    environment {
        APP_NAME = "node-app"
        DEV_PROJECT = "aditi-poc"
        STAGE_PROJECT = "node-app-stage"
        PROD_PROJECT = "node-app-prod"
        APP_GIT_URL = "https://github.com/aditi1800/node-app1.git"
    }
    
    agent {
      node {
        label 'nodejs'
      }
    }

    stages {
        stage('Deploy to DEV environment') {
            steps {
                echo '#####Deploy to DEV environment ######'
                script {
                    openshift.withCluster() {
                        openshift.withProject("$DEV_PROJECT") {
                            echo "Using project: ${openshift.project()}"
                            // If DeploymentConfig already exists, rollout to update the application
                            if (openshift.selector("dc", APP_NAME).exists()) {
                                echo "DeploymentConfig " + APP_NAME + " exists, rollout to update app ..."
                                // Rollout (it corresponds to oc rollout <deploymentconfig>)
                                def dc = openshift.selector("dc", "${APP_NAME}")
                                dc.rollout().latest()
                                // If a Route does not exist, expose the Service and create the Route
                                if (!openshift.selector("route", APP_NAME).exists()) {
                                    echo "Route " + APP_NAME + " does not exist, exposing service ..." 
                                    def service = openshift.selector("service", APP_NAME)
                                    service.expose()
                                }
                            } 
                            // If DeploymentConfig does not exist, deploy a new application using an OpenShift Template
                            else{
                                echo "DeploymentConfig " + APP_NAME + " does not exist, creating app ..."
                                openshift.newApp('deployment/openshift/node-app-template.yaml')
                            }
                            def route = openshift.selector("route", APP_NAME)
                            echo "Test application with "
                            def result = route.describe()   
                        }
                    }
                }
            }
        }
    }
}
