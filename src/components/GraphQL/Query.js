import React from 'react'
import { Query } from 'react-apollo'

export default ({ children, query, ...rest }) => (
  <Query query={query} {...rest}>
    {({ error, loading, data }) => {
   //   console.log(error);
      if (error) return 'sorry, you fucked up'
      if (loading) return 'chill, loading time'

      return children(data)
    }}
  </Query>
)
