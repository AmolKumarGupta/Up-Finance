
export function transactions() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `{
      transactions {
        _id, name, type, amount
      }
    }`,
    variables: {}
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  return fetch(process.env.REACT_APP_GRAPHQL_URL, requestOptions)
}

export function createTransaction(input) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `mutation {
      transaction_create(
        name: "${input.name}",
        type: "${input.type}",
        amount: ${Number(input.amount)}
      )
    }`,
    variables: {}
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  return fetch(process.env.REACT_APP_GRAPHQL_URL, requestOptions)
}

export function deleteTransaction (id) {
  if (! id) {
    return null;
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `mutation DeleteTransaction($id: String!) {
      transaction_delete(id: $id)
    }`,
    variables: {"id":String(id)}
  })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  return fetch(process.env.REACT_APP_GRAPHQL_URL, requestOptions)
}