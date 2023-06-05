{ pkgs }: { 
  deps = with pkgs; [
    yarn
    esbuild
    nodejs-19_x
  
    nodePackages.typescript
    nodePackages.typescript-language-server

    nodePackages.nodemon
    mongodb
  ];
}
