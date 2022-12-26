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
      stage("Tag image") {
       steps{
    tagImage([
            sourceImagePath: "aditi-poc",
            sourceImageName: "node-app2",
            sourceImageTag : "latest",
            toImagePath: "aditi-poc",
            toImageName    : "node-app2",
            toImageTag     : "${env.BUILD_NUMBER}"
      
    ])
       }
}
      
       stage("Trigger ManifestUpdate"){
        steps{
          build job:'node-app-update-deployment-pipeline' , parameters: [string(name: 'DOCKERTAG',value: env.BUILD_NUMBER)]
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
