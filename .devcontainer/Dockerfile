FROM mcr.microsoft.com/vscode/devcontainers/base:debian-10

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno \
    && curl -fsSL https://deno.land/x/install/install.sh | sh \
    && chown -R vscode /deno

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache/deno

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - 
RUN apt-get -y install --no-install-recommends nodejs

RUN npm install -g all-contributors-cli semantic-release @semantic-release/changelog @semantic-release/git commitizen cz-conventional-changelog
RUN echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
