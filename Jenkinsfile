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
    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage("Docker Build") {
            steps {
                // This uploads your application's source code and performs a binary build in OpenShift
                // This is a step defined in the shared library (see the top for the URL)
                // (Or you could invoke this step using 'oc' commands!)
                binaryBuild(buildConfigName: appName, buildFromPath: ".")
            }
        }
      stage("Install OC CLI"){
        steps {
         wget https://mirror.openshift.com/pub/openshift-v4/amd64/clients/oc-dec2/4.6/linux/oc.tar.gz
         tar -xzf oc.tar.gz
         sudo -E env "PATH=$PATH" cp oc /bin
         sudo -E env "PATH=$PATH" cp oc /usr/bin
         sudo -E env "PATH=$PATH" chmod a+x /usr/bin/oc
         sudo -E env "PATH=$PATH" chmod a+x /bin/oc
         oc version
        }
      }
    }
}
