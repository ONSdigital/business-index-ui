#!groovy
@Library('jenkins-pipeline-shared@develop') _
 
/*
* bi-ui Jenkins Pipeline
*/
pipeline {
  agent none
  options {
    skipDefaultCheckout()
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
    timeout(time: 60, unit: 'MINUTES')
  }
  environment {
    BI_UI_TEST_ADMIN_USERNAME="admin"
    BI_UI_TEST_ADMIN_PASSWORD="admin"
    BI_UI_TEST_USER_USERNAME="test"
    BI_UI_TEST_USER_PASSWORD="test"
  }
  stages {
    stage('Checkout') {
      agent any
      steps {
        colourText("info","Running build ${env.BUILD_ID} on ${env.JENKINS_URL}...")
        colourText("info","Checking out Github & Gitlab repos")
        deleteDir()
        checkout scm
        dir('conf') {
          git(url: "$GITLAB_URL/StatBusReg/bi-ui.git", credentialsId: 'bi-gitlab-id', branch: 'develop')
        }
        stash name: 'app'
      }
    }
    stage('Install Dependancies & Build') {
      agent { label 'build' }
      steps {
        colourText("info","Running 'npm install' and 'npm build'...")
        deleteDir()
        sh 'node --version'
        sh 'npm --version'
        unstash 'app'
        sh 'npm install'
 
        // Install the node_modules for just the server
        dir('server') {
          sh 'npm install'
        }
      }
    }
    stage('Test - Unit, Component, Server, Coverage + Stress') {
      agent { label 'build' }
      steps {
        parallel (
          "Unit" :  {
            colourText("info","Running unit tests...")
            sh 'npm run-script test-unit'
          },
          "Stress" :  {
            colourText("info","Running stress tests...")
            sh 'ENV=local node server/ & HOST=http://localhost:3001 REQUEST=5000 REQ_PER_SECOND=50 npm run-script test-load'
            // sh 'killall node'
            // The above command will leave node running, will this be closed along with the workspace?
          },
          "Server" : {
            colourText("info","Running server tests...")
            sh "npm run-script test-server"
          },
          "Coverage Report" : {
            colourText("info","Generating coverage report...")
            sh "npm run-script cover"
            step([$class: 'CoberturaPublisher', coberturaReportFile: '**/coverage/cobertura-coverage.xml'])
          },
          "Style Report" : {
            colourText("info","Generating style report...")
            sh 'npm run-script lint-report-xml'
            // step([$class: 'CheckStylePublisher', pattern: 'coverage/eslint-report-checkstyle.xml'])
            // checkstyle canComputeNew: false, canRunOnFailed: true, defaultEncoding: '', healthy: '', pattern: 'coverage/eslint-report-checkstyle.xml', unHealthy: ''
          }
        )
      }
    }
    stage('Zip Project') {
      agent { label 'build' }
      when {
        anyOf {
          branch "develop"
          branch "release"
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Zipping project...")
          colourText("info","Host is: ${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}")
          sh "sed -i -e 's|Local|dev|g' src/config/constants.js"
          sh "sed -i -e 's|http://localhost:9002|https://dev-bi-api.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}|g' src/config/api-urls.js"
          sh "sed -i -e 's|http://localhost:3001|https://dev-bi-ui.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}|g' src/config/api-urls.js"
          sh 'npm run build'
          // For deployment, only need the node_modules/package.json for the server
          sh 'rm -rf node_modules'
          sh 'cp -r server/node_modules .'
          sh 'rm -rf package.json'
          sh 'cp server/package.json .'
          sh 'rm -rf manifest.yml'
          // Get the proper manifest from Gitlab
          sh 'cp conf/dev/manifest.yml .'
          sh 'zip -r bi-ui.zip build node_modules favicon.ico package.json server manifest.yml'
          stash name: 'zip'
        }
      }
    }
    stage('Deploy - DEV') {
      agent { label 'build' }
      when {
        anyOf {
          branch "develop"
        }
      }
      steps {
        script {
          colourText("info","Deploying to DEV...")
          unstash 'zip'
          deployToCloudFoundry('cloud-foundry-bi-dev-user','bi','dev','dev-bi-ui','bi-ui.zip','manifest.yml')
        }
      }
    }
    stage('Integration Tests') {
      agent { label 'build' }
      when {
        anyOf {
          branch "release"
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Running integration tests...")
        }
      }
    }
    stage('Deploy - TEST') {
      agent { label 'build' }
      when {
        anyOf {
          branch "release"
        }
      }
      steps {
        script {
          colourText("info","Deploying to TEST...")
          unstash 'zip'
          deployToCloudFoundry('cloud-foundry-bi-test-user','bi','test','test-bi-ui','bi-ui.zip','manifest.yml')
        }
      }
    }
    stage('Promote to BETA?') {
      agent { label 'build' }
      when {
        anyOf {
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Deploy to BETA?")
          timeout(time: 10, unit: 'MINUTES') {
            input 'Deploy to Beta?'
          }
        }
      }
    }
    stage('Deploy - BETA') {
      agent { label 'build' }
      when {
        anyOf {
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Deploying to BETA...")
          unstash 'zip'
          deployToCloudFoundry('cloud-foundry-bi-prod-user','bi','beta','prod-bi-ui','bi-ui.zip','manifest.yml')
        }
      }
    }
  }
}