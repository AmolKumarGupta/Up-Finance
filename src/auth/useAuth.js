const { useState } = require("react");

export default function useAuth() {
  const [token, setToken] = useState('jwt-token');
  // handle auth using localStorage and jwt
  return [token, setToken];
}
