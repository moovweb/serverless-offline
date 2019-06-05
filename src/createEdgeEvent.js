const qs = require('qs')

module.exports = function createEdgeEvent(eventType, originalRequest) {
  const request = Object.assign({}, originalRequest, {
    querystring: qs.stringify(originalRequest.query),
    uri: originalRequest.path,
    headers: convertHeaders(originalRequest.headers)
  })

  return {
    Records: [
      {
        cf: {
          config: {
            eventType
          },
          request
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