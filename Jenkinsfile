#!groovy
@Library('jenkins-pipeline-shared@develop') _
 
/*
* bi-ui Jenkins Pipeline
*/
pipeline {
  agent none
  environment {
    API_GW_URL = ""

    BRANCH_DEV = "develop"
    BRANCH_TEST = "release"
    BRANCH_PROD = "master"

    DEPLOY_DEV = "dev"
    DEPLOY_TEST = "test"
    DEPLOY_PROD = "beta"

    ORGANIZATION = "ons"
    TEAM = "bi"
    MODULE_NAME = "bi-ui"

    BI_UI_TEST_ADMIN_USERNAME="admin"
    BI_UI_TEST_ADMIN_PASSWORD="admin"
    BI_UI_TEST_USER_USERNAME="test"
    BI_UI_TEST_USER_PASSWORD="test"
  }
  options {
    skipDefaultCheckout()
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
    timeout(time: 60, unit: 'MINUTES')
    timestamps()
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
          git(url: "$GITLAB_URL/BusinessIndex/bi-ui.git", credentialsId: 'bi-gitlab-id', branch: 'develop')
        }
        stash name: 'app'
        script {
          version = '1.0.' + env.BUILD_NUMBER
          currentBuild.displayName = version
          env.NODE_STAGE = "Checkout"
        }
      }
    }
    stage('Install Dependancies') {
      agent { label 'GMU' }
      steps {
        colourText("info","Running 'npm install'")
        deleteDir()
        sh 'node --version'
        sh 'npm --version'
        unstash 'app'
        sh 'npm install'
        script {
          if (BRANCH_NAME == BRANCH_DEV) {
            env.DEPLOY_NAME = DEPLOY_DEV
          } else if  (BRANCH_NAME == BRANCH_TEST) {
            env.DEPLOY_NAME = DEPLOY_TEST
          } else if (BRANCH_NAME == BRANCH_PROD) {
            env.DEPLOY_NAME = DEPLOY_PROD
          }
        }
      }
      post {
        always {
          script {
            env.NODE_STAGE = "Install Dependancies"
          }
        }
        success {
          colourText("info","Successful install of dependancies.")
        }
        failure {
          colourText("warn","Unable to install dependancies.")
        }
      }
    }
    stage('Test - Unit, Server & Stress') {
      agent { label 'GMU' }
      steps {
        parallel (
          "Unit" :  {
            colourText("info","Running unit tests...")
            sh 'npm run test:unit'
          },
          "Stress" :  {
            colourText("info","Running stress tests...")
            sh 'ENV=local node server/ & HOST=http://localhost:3001 REQUEST=5000 REQ_PER_SECOND=50 npm run test:load'
            // sh 'killall node'
            // The above command will leave node running, will this be closed along with the workspace?
          },
          "Server" : {
            colourText("info","Running server tests...")
            sh "npm run test:server"
          }
        )
      }
      post {
        always {
          script {
            env.NODE_STAGE = "Test"
          }
        }
        success {
          colourText("info","Test stage complete")
        }
        failure {
          colourText("warn","Test stage failed.")
        }
      }
    }
    stage('Static Analysis - Coverage & Style') {
      agent { label 'GMU' }
      steps {
        parallel (
          "Coverage Report" : {
            colourText("info","Generating coverage report...")
            sh "npm run cover"
          },
          "Style Report" : {
            colourText("info","Generating style report...")
            sh 'npm run lint-report-xml'
          }
        )
      }
      post {
        always {
          script {
            env.NODE_STAGE = "Static Analysis"
          }
        }
        success {
          colourText("info","Static analysis complete, publishing reports...")
          // Publish coverage report
          step([$class: 'CoberturaPublisher', coberturaReportFile: '**/coverage/cobertura-coverage.xml'])
          // Publish style report
          // step([$class: 'CheckStylePublisher', pattern: 'coverage/eslint-report-checkstyle.xml'])
          // checkstyle canComputeNew: false, canRunOnFailed: true, defaultEncoding: '', healthy: '', pattern: 'coverage/eslint-report-checkstyle.xml', unHealthy: ''
        }
        failure {
          colourText("warn","Failed to publish static analysis reports.")
        }
      }
    }
    stage('Zip Project') {
      agent { label 'GMU' }
      when {
        anyOf {
          branch BRANCH_DEV
          branch BRANCH_TEST
          branch BRANCH_PROD
        }
      }
      steps {
        script {
          colourText("info","Zipping project...")

          // Install the node_modules for just the server - already have the ui ones
          dir('server') {
            sh 'npm install'
          }

          // Run npm run build
          sh "REACT_APP_ENV=${env.DEPLOY_NAME} REACT_APP_AUTH_URL=https://${env.DEPLOY_NAME}-bi-ui.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX} REACT_APP_API_URL=https://${env.DEPLOY_NAME}-bi-ui.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}/api npm run build"
          
          // For deployment, only need the node_modules/package.json for the server
          sh 'rm -rf node_modules'
          sh 'cp -r server/node_modules .'
          sh 'rm -rf package.json'
          sh 'cp server/package.json .'
 
          // Get the proper manifest from Gitlab
          sh "cp conf/${env.DEPLOY_NAME}/manifest.yml ."
          sh 'zip -r bi-ui.zip build node_modules favicon.ico package.json server manifest.yml'
          stash name: 'zip'
        }
      }
    }
    stage('Deploy - DEV & TEST') {
      agent { label 'GMU' }
      when {
        anyOf {
          branch BRANCH_DEV
          branch BRANCH_TEST
        }
      }
      steps {
        script {
          colourText("info","Deploying to ${env.DEPLOY_NAME}")
          unstash 'zip'
          deployToCloudFoundry("cloud-foundry-bi-${env.DEPLOY_NAME}-user","bi","${env.DEPLOY_NAME}","${env.DEPLOY_NAME}-bi-ui","bi-ui.zip","manifest.yml")
          env.APP_URL = "https://${env.DEPLOY_NAME}-${env.MODULE_NAME}.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}"
        }
      }
    }
    stage('Integration Tests') {
      agent { label 'GMU' }
      when {
        anyOf {
          branch BRANCH_DEV
          branch BRANCH_TEST
        }
      }
      steps {
        script {
          colourText("info","Running integration tests...")
          // We will run selenium integration tests here
        }
      }
    }
    stage('Deploy - BETA') {
      agent { label 'GMU' }
      when {
        anyOf {
          branch BRANCH_PROD
        }
      }
      steps {
        script {
          colourText("info","Deploying to BETA...")
          unstash 'zip'
          deployToCloudFoundry('cloud-foundry-bi-prod-user','bi','beta','prod-bi-ui','bi-ui.zip','manifest.yml')
          env.APP_URL = "https://${env.DEPLOY_NAME}-${env.MODULE_NAME}.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}"
        }
      }
    }
    stage('Checking App Health') {
      agent any
      when {
        anyOf {
          branch BRANCH_DEV
          branch BRANCH_TEST
          branch BRANCH_PROD
        }
      }
      steps {
        script {
          colourText("info","Checking deployed app health...")
          colourText("info","Pinging ${env.APP_URL}/api/health...")
          APP_STATUS = sh (
            script: "curl -sL -w '%{http_code}' '${env.APP_URL}/api/health' -o /dev/null",
            returnStdout: true
          ).trim()
          colourText("info", "APP_STATUS: ${APP_STATUS}")
          if (APP_STATUS != "200") {
            colourText("error", "Error: deployed app repsoned to GET with ${APP_STATUS}")
            error("Error: deployed app repsoned to GET with ${APP_STATUS}")
          }
        }
      }
    }
  }
}