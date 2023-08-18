
export function transactions({limit = 10, page = 1}) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: `query all($limit: Int, $page: Int) {
      transactions(limit: $limit, page: $page) {
        data {
          _id, name, type, amount
        },
        totalPages
      }
    }`,
    variables: {
      "limit": limit,
      "page": page
    }
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