#!/bin/bash

export GIT_OPS=judilibre-ops
export DEPS_SRC=$(pwd)/${GIT_OPS}
export SCRIPTS_SRC=${DEPS_SRC}/scripts
export KUBE_SRC=${DEPS_SRC}/k8s

# clone
if [ ! -d ${SCRIPTS_SRC} ];then
    if ! (git clone https://github.com/Cour-de-cassation/${GIT_OPS} > /dev/null 2>&1); then
        echo -e "\e[31m❌ init failed, couldn't clone git ${GIT_OPS} repository \e[0m" && exit 1;
        if [ "${GIT_BRANCH}" == "master" ]; then
            cd ${GIT_OPS};
            git checkout master;
            cd ..;
        fi;
    fi;
fi;

# scripts

for file in clean_old_replicas update_app check_install docker-check docker-build deploy_k8s_services wait_services_readiness; do
    if [ ! -f "./scripts/${file}.sh" ]; then
        ln -s ${SCRIPTS_SRC}/${file}.sh ./scripts/${file}.sh;
    fi;
done;

# kube configs
for file in $(ls ${KUBE_SRC}); do
    if [ ! -f "./k8s/$file" ]; then
        ln -s ${KUBE_SRC}/$file ./k8s/$file;
    fi;
done;

