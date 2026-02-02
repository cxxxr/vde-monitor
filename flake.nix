{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          vde-monitor = pkgs.stdenv.mkDerivation (finalAttrs: {
            pname = "vde-monitor";
            version = "0.1.4";

            src = ./.;

            nativeBuildInputs = [
              pkgs.nodejs_24
              pkgs.pnpm_10
              pkgs.pnpmConfigHook
              pkgs.makeWrapper
            ];

            pnpmDeps = pkgs.fetchPnpmDeps {
              inherit (finalAttrs) pname version src;
              pnpm = pkgs.pnpm_10;
              fetcherVersion = 3;
              hash = "sha256-A+0WjuIsFXVYYGgyx6GGO8n+XXFOMDNnV/Jw+C2Truk=";
            };

            buildPhase = ''
              runHook preBuild
              pnpm run build
              runHook postBuild
            '';

            installPhase = ''
              runHook preInstall

              mkdir -p $out/lib/vde-monitor $out/bin

              # Copy bundle output
              cp -r dist/* $out/lib/vde-monitor/

              # Copy runtime dependencies preserving pnpm's relative symlink structure
              cp -a node_modules $out/lib/vde-monitor/node_modules
              # Remove workspace packages (already bundled by tsdown)
              rm -rf $out/lib/vde-monitor/node_modules/@vde-monitor
              rm -rf $out/lib/vde-monitor/node_modules/.pnpm/node_modules/@vde-monitor

              makeWrapper ${pkgs.nodejs_24}/bin/node $out/bin/vde-monitor \
                --add-flags "$out/lib/vde-monitor/index.js"
              makeWrapper ${pkgs.nodejs_24}/bin/node $out/bin/vde-monitor-hook \
                --add-flags "$out/lib/vde-monitor/vde-monitor-hook.js"

              runHook postInstall
            '';

            meta = {
              description = "Monitor tmux sessions with a web UI";
              license = pkgs.lib.licenses.mit;
              mainProgram = "vde-monitor";
            };
          });

          default = self.packages.${system}.vde-monitor;
        }
      );

      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_24
              pkgs.pnpm_10
            ];
          };
        }
      );
    };
}
