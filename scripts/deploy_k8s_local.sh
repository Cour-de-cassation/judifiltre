echo "▶️   cleans node_modules & k3s for fresh build & deploy"
k3s-uninstall > /dev/null 2>&1;
rm -rf node_modules */node_modules > /dev/null 2>&1
for APP_ID in judifiltre-backend judifiltre-client;do
    echo "▶️   build & deploy $APP_ID"
    set -a; source .env-sample-${APP_ID}; set +a;
    if [ "${APP_ID}" == "judifiltre-client" ]; then
        yarn buildClient;
    else
        yarn buildBackend;
    fi
    (docker stop ${APP_ID};docker rm ${APP_ID}) >/dev/null 2>&1;
    docker image rm ${DOCKER_USERNAME}/${APP_ID}:$(./scripts/version.sh) > /dev/null 2>&1;
    export DOCKER_TARGET=${APP_ID};
    ./scripts/docker-build.sh || exit 1;
    ./scripts/deploy_k8s_services.sh || exit 1;
    ./scripts/test_minimal.sh || exit 1;
done
