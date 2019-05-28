import { gql } from 'apollo-boost'

export const GET_USERS = gql`
  query {
    users{
      id
     username
     userid

    }
  }
`
export const GET_UIDS = gql`
  query {
    uids{
    uid

    }
  }
`
export const GET_DETAILS = gql`
mutation getdetails($uid:String!){
  getdetails(uid:$uid){
    name
 certificate{
  achievement_title
  event_name
  issue_date
  issuer_name
    receiver_name
  team_name
  event_logo
  _id
 }
    }
  }
`

export const ADD_USER = gql`
  mutation signin($username: String!,$userid: String!,$userDp:String) {
    signin(username: $username,userid: $userid,userDp:$userDp) {
      id
      username
     userid
     userDp
    }
  }
`

export const ADD_UID = gql`
  mutation adduid($uid: String!) {
    adduid(uid: $uid) {
   uid
    }
  }
`

export const DELETE_NAME = gql`
  mutation deleteNames($id: ID!) {
    deleteNames(id: $id) {
      name
      id
    }
  }
`
