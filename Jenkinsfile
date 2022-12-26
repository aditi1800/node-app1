library identifier: "pipeline-library@v1.5",
retriever: modernSCM(
  [
    $class: "GitSCMSource",
    remote: "https://github.com/redhat-cop/pipeline-library.git"
  ]
)

appName = "node-app-buildconfig"

pipeline {
    agent any
    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage("Docker Build") {
            steps {
                binaryBuild(buildConfigName: appName, buildFromPath: ".")
            }
        }
      stage("TEST: Can tag image") {
       steps{
    tagImage([
            sourceImagePath: "docker.io",
            sourceImageName: "aditishinde",
            sourceImageTag : "1.0",
            toImagePath: "docker.io",
            toImageName    : "aditishinde",
            toImageTag     : "${env.BUILD_NUMBER}"
      
    ])
       }
}
      /*
      stage('preamble') {
        steps {
            script {
                openshift.withCluster() {
                    openshift.withProject("$PROJECT_NAME") {
                        echo "Using project: ${openshift.project()}"
                         sh 'sh -x $WORKSPACE/deploy.sh'
                    }
                }
            }
        } 
    }*/
    }
}
