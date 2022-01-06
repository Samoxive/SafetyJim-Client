const environment =
    process.env.NODE_ENV === "production"
        ? {
              clientId: "313749262687141888",
              apiUrl: "https://api.safetyjim.xyz",
              redirectUrl: "https://safetyjim.xyz/login"
          }
        : {
              clientId: "881152939530534913",
              apiUrl: "http://localhost:8080",
              redirectUrl: "http://localhost:3000/login"
          };

export default environment;
