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

RUN echo 'export PATH="/home/vscode/.deno/bin:$PATH"' >> /home/vscode/.bashrc
RUN echo 'source <(mgraph completions bash)' >> /home/vscode/.bashrc

ARG USERNAME=vscode
RUN mkdir -p /home/$USERNAME/.vscode-server/extensions \
        /home/$USERNAME/.vscode-server-insiders/extensions \
    && chown -R $USERNAME \
        /home/$USERNAME/.vscode-server \
        /home/$USERNAME/.vscode-server-insiders