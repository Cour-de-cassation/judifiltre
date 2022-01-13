for APP_ID in judifiltre-backend judifiltre-client;do
    export eval $(cat .env-sample-${APP_ID});
    if [ "${APP_ID}" == "judifiltre-client"]; then
        yarn buildClient;
    fi
    docker stop ${APP_ID};docker rm ${APP_ID};docker image rm ${DOCKER_USERNAME}/${APP_ID}:$(./scripts/version.sh);
    export DOCKER_TARGET=${APP_ID};
    ./script/docker-build.sh || exit 1;
    ./scripts/deploy_k8s_services.sh || exit 1;
    ./scripts/test_minimal.sh || exit 1;
done
