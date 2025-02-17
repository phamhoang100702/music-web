const Auth_Domain = "http://localhost:8888/auth/"

const post = async (path, options = {}) => {
  const response = await fetch(Auth_Domain + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  return await response.json();
};

export const userLogin = async (options) => {
  return await post("login", options);
}

export const userRegister = async (options) => {
  return await post("register", options);
}

export const decode = async(token)=>{
  return await post("decode",{
    token : token
  })
}
