module.exports = function createEdgeEvent(eventType, request) {
  return {
    Records: [
      {
        cf: {
          config: {
            eventType
          },
          request: Object.assign({}, request, {
            headers: convertHeaders(request.headers)
          })
        }
      }
    ]
  }
}

function convertHeaders(headers) {
  const result = {}

  for (let key in headers) {
    result[key] = [{ key, value: headers[key] }]
  }

  return result
}