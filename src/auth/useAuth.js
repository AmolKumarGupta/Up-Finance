const { useState } = require("react");

export default function useAuth() {
  const getToken = () => {
    let storedToken = localStorage.getItem('token');
    if (!storedToken) {
      return null
    }
    return storedToken
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (string) => {
    localStorage.setItem('token', string)
    setToken(string)
  }

  return [token, saveToken];
}
