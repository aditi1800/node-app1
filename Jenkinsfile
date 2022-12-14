library identifier: "pipeline-library@v1.5",
retriever: modernSCM(
  [
    $class: "GitSCMSource",
    remote: "https://github.com/redhat-cop/pipeline-library.git"
  ]
)

// The name you want to give your Spring Boot application
// Each resource related to your app will be given this name
appName = "node-app-buildconfig"

pipeline {
    // Use the 'maven' Jenkins agent image which is provided with OpenShift 
    agent any
  environment {
  DEV_PROJECT="node-app-demo-aditi"
  }
    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        /*stage("Docker Build") {
            steps {
                // This uploads your application's source code and performs a binary build in OpenShift
                // This is a step defined in the shared library (see the top for the URL)
                // (Or you could invoke this step using 'oc' commands!)
                binaryBuild(buildConfigName: appName, buildFromPath: ".")
            }
        }*/
      stage('preamble') {
        steps {
            script {
                openshift.withCluster() {
                    openshift.withProject("$DEV_PROJECT") {
                        echo "Using project: ${openshift.project()}"
                        oc version
                    }
                }
            }
        }
    }
    }
}
