{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{

  packages = [
    pkgs.git
    pkgs.github-cli
  ];

  env.OBJC_DISABLE_INITIALIZE_FORK_SAFETY = true;
  # env.ZENML_DEBUG = "true";
  env.ZENML_ANALYTICS_OPT_IN = "false";

  scripts.install-zenml-branch.exec = ''
    sh scripts/install-zenml-branch.sh $1
  '';

  languages.python = {
    enable = true;
    package = pkgs.python312;
    venv.enable = true;
    uv.enable = true;
  };

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_26;
    npm = {
      enable = true;
    };
    pnpm = {
      enable = true;
    };
  };

  languages.typescript = {
    enable = true;
  };

}
