import { gql } from 'apollo-boost'


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

export const GET_SINGLE_CERTIFICATE = gql `
mutation singlecertificate($id:String!){
  singlecertificate(id:$id)
  {achievement_title
event_name
issue_date
issuer_name
receiver_name
team_name
event_logo
_id
}
}
`
export const GET_CURRENT_EVENTS = gql `
mutation getcurrentevents($uid:String!){
  getcurrentevents(uid:$uid){
    event_name
    event_logo
    event_startDate
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
