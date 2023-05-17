
export default function token({ name, password }, callback) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `{\n    login(name: "${name}", password: "${password}")\n}`,
    variables: {}
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  fetch(process.env.REACT_APP_GRAPHQL_URL, requestOptions)
    .then(response => response.text())
    .then(result => callback(null, JSON.parse(result)))
    .catch(error => callback(error, null));
}


export function signup({ name, email, password }, callback) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `mutation {\n    signup(name: "${name}", email: "${email}", password: "${password}")\n}`,
    variables: {}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  fetch(process.env.REACT_APP_GRAPHQL_URL, requestOptions)
    .then(response => response.text())
    .then(result => callback(null, JSON.parse(result)))
    .catch(error => callback(error, null));
}
