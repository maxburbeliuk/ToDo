const DOMAIN_NAME = process.env.REACT_APP_BACKEDN_URL
const VERSION_OF_API = process.env.REACT_APP_BACKEDN_VERSION

const endpointsBuilder = (endpoint, dataToReplace = {}) => {
  let builtEndpoint = endpoint

  Object.entries(dataToReplace).forEach(([key, value]) => {
    builtEndpoint = builtEndpoint.replace(`:${key}`, value)
  })

  return DOMAIN_NAME + VERSION_OF_API + builtEndpoint
}

export default endpointsBuilder
