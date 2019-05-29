import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {Input, Card} from 'antd';
import {
  Link  
} from 'react-router-dom';
import { filter } from 'minimatch';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon
} from 'react-share';
import { Certificate } from 'crypto';
import UserInfo from '../User/UserInfo';
import {ADD_UID, GET_DETAILS} from '../../components/GraphQL/queries';
// import {ApolloProvider} from 'react-apollo';
// import ApolloClient from 'apollo-boost';
import {print} from 'graphql';
import {url} from '../../utils/constants';


const axios = require('axios');
const Search = Input.Search;
const blockstack_id = "1CfgtF2dzq13RcrfXXcu76FUfad7yPzu5T";
const uid = UserInfo.getUID();
const { Meta } = Card;

// const client = new ApolloClient({
//   uri: 'http://192.168.0.110:8000/graphql'
//  });

class AllCertificates extends Component {
    constructor(props) {
        super(props);
      // console.log("UID is: ", uid);
    }

    state = {
        emailNotRegistered: false,
        certificates: [],
        displayCertificates: [],
        userIdentity: true,
        blockstackIdentity: blockstack_id    
    };

    filterCertificates = (value) => {
      const searchValue = value.length > 0 ? value : '';
      let myCertificatesData = [...this.state.certificates];
      let filteredCertificates = [];
      myCertificatesData = myCertificatesData.map((cert,index) => {
          return cert.certificate;
      }); 

      myCertificatesData.map((cert) => {
        let found = false;
        for (let i = 0; i < Object.keys(cert).length; i++) {
          const element = Object.values(cert)[i];
          const key = Object.keys(cert)[i];
          if(key == 'event_logo' || key == 'issue_date' || key == '_id')
          {
          }
          else
          {
            if(element.toLowerCase().includes(searchValue.toLowerCase()))
            {
               found = true;
               break;
            }                    
          }
        }
        if(found)
        {
          filteredCertificates.push(cert);
        }
      });
      console.log("Filtered data: ", filteredCertificates);
        this.makeDisplayCertificates(filteredCertificates);
    }
  
    onEnterSearchValue = (value) => {
      // console.log("Search value is: ", value);
      const searchValue = value.length > 0 ? value : '';
      this.filterCertificates(searchValue);
    }

    makeDisplayCertificates = (data) => {
                      // // console.log(blockstack.loadUserData().profile.image[0],"image")
                      console.log("Certificate Array is: ", data);
                      console.log("Is data array? ", (data.constructor === Array));
                      // // console.log("CERTIFICATES: " + response.data.data.results);
                      let arr = data.length > 0 ? [...data] : {...data};
                      console.log("Arr Array is: ", arr);
      
                      let displayCerts = [];
                      if(arr.length)
                      {
                        for (let index = 0; index < arr.length; index++) {
                            const element = arr[index].certificate ? arr[index].certificate : arr[index];
                            // console.log("certificate data ", element)
          
                            displayCerts.push(
                              <Col key = {index} lg={4} md={4} sm={12} xs={12}>
                              <Link to={{ pathname: "https://encert.app/certificate", search: "?"+element._id }} target="_blank">
                                <Card                    
                                style={{ border: "0.0px solid #A9A9A9", borderRadius: "10px", boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding: "10px", textAlign: "center",
                                        
                                }}
                                cover={<img alt="example" src={element.event_logo} style={{
                                  borderRadius: "5px"
                                }}/>}
                                // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                >
                                <Meta
                                  // avatar={<Avatar src={(blockstack.loadUserData().profile.imag=='undefined')?(inventLogo):(blockstack.loadUserData().profile.image[0].contentUrl)} />}
                                  title={element.achievement_title.toUpperCase()}
                                  description={element.event_name.toUpperCase()}
                                />
                                <br />
                                  <Container>
                                    <Row>                            
                                      <Col key = {element._id + "f"} xl={4} lg={4} md={4} sm={4} xs={4}>
                                      <FacebookShareButton
                                          url={`https://encert.app/certificate?${element._id}`} 
                                          quote="Have a look at my latest ceritification!"
                                          hashtag="#poweredByEncert"
                                      >
                                      <FacebookIcon size={34} round={true}/>
                                      </FacebookShareButton>
                                      </Col>
                                      <Col key = {element._id + "t"} xl={4} lg={4} md={4} sm={4} xs={4}>
                                      <TwitterShareButton                                
                                          url={`https://encert.app/certificate?${element._id}`} 
                                          title="Have a look at my latest ceritification!"
                                          via="Encert.app"
                                      >
                                      <TwitterIcon size={34} round={true}/>
                                      </TwitterShareButton>
                                      </Col>
                                      <Col key = {element._id + "L"} xl={4} lg={4} md={4} sm={4} xs={4}>
                                      <LinkedinShareButton 
                                          url={`https://encert.app/certificate?${element._id}`}
                                      >
                                      <LinkedinIcon size={34} round={true}/>
                                      </LinkedinShareButton>                             
                                      </Col>
                                    </Row>
                                  </Container>
                                </Card>
                              </Link>
                              </Col>
                            );                
                          }
                        }
                        else
                        {

                        }
                      console.log("Certificates to display: ", displayCerts);
                      this.setState({
                        displayCertificates: displayCerts.length > 0 ? displayCerts : <h2>No certificates found.</h2>,
                      })      
    }

    getCertificatesFromServerPrevious = () => {
        let that = this;
        axios.get(`https://encert-server.herokuapp.com/issuer/participant/exist/${blockstack_id}`, {
        })
        .then(function (response) {
          // console.log("Response for id check is: ", response);
          // console.log("Data exists for blockstack ID in server : ", response.data.data.result);

            if (!response.data.data.result) {
                that.setState({ emailNotRegistered: true });
            }      
  
            axios.get("https://encert-server.herokuapp.com/issuer/certificate/blockstack/" + blockstack_id)
              .then(function (response) {
                // // console.log(blockstack.loadUserData().profile.image[0],"image")
                 console.log("Certificate Array is: ", response.data.data.results);
                // // console.log("CERTIFICATES: " + response.data.data.results);
                let arr = response.data.data.results;
                that.makeDisplayCertificates(arr);
              })
  
              .catch(function (error) {
                  console.log(error);
              });
          })
          .catch(function (error) {
            console.log("Error while fetching identity from server. ", error);
          });
    }

    getCertificatesFromServer = () => {
      axios.post(url, {
        query: print(ADD_UID),
        variables: {
          uid: uid
        },
      })
        .then(res => console.log("CERT RES: ", res))
        .catch(err => console.log("CERT ERR: ", err))      

        axios.post(url, {
          query: print(GET_DETAILS),
          variables: {
            uid: uid
          },
        })
          .then(res => {
            console.log("cert details", res.data.data.getdetails);
            this.setState({
              certificates: res.data.data.getdetails
            },() => {
              this.makeDisplayCertificates(this.state.certificates);
            })
          })
          .catch(err => console.log(err))          
    }

    componentDidMount() {
        this.getCertificatesFromServer();
        // this.getCertificatesFromGraphQL();
    }

    render() {

        return (
            <div>
                <h1 style={{textAlign: "center"}}>MY CERTIFICATIONS</h1>
                <br />
                <div style={{width: "100%"}}>
                  <div style={{width: "70%", display: "flex", margin: "0px auto"}}>
                    <Search placeholder="Search by receiver name, team name, issuer name or event name." onChange={(e) => this.onEnterSearchValue(e.target.value)} enterButton/>
                  </div>
                </div>
                <br />            
                <br />            
                <br />            
                  <div style={{width: "100%", textAlign: "center"}}>
                    {
                      this.state.displayCertificates.length > 0
                      ?
                        <Container>
                        <div style={{width: "100%"}}>
                        <Row style={{margin: "0 auto"}}>
                        {this.state.displayCertificates}
                        </Row>
                        </div>
                        </Container>
                      :
                      <h3>No certifications achieved yet.</h3>
                    }
                  </div>
            </div>
            );
    }
}

export default AllCertificates;