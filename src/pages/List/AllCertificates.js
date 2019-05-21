import React, { Component } from 'react';
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

const axios = require('axios');
const Search = Input.Search;
const blockstack_id = "1CfgtF2dzq13RcrfXXcu76FUfad7yPzu5T";
const { Meta } = Card;

class AllCertificates extends Component {
    constructor(props) {
        super(props);
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
      myCertificatesData.map((certificate,index) => {
        for(let i = 0; i < Object.keys(certificate).length; i++)
          {
            if(Object.keys(certificate)[i] == '_id' ||
               Object.keys(certificate)[i] == 'blockstack_id' ||
               Object.keys(certificate)[i] == 'issue_date')
            { 
            }           
            else
            {
              console.log(`${Object.keys(certificate)[i]}: `, Object.values(certificate)[i]);
              if((Object.values(certificate)[i].toLowerCase().includes(searchValue.toLowerCase())))
              {
                filteredCertificates.push(
                  <Col key = {index} style={{marginBottom: '20px'}} md={3} sm={12}>
                  <Link to={{ pathname: "https://encert.app/certificate", search: "?"+certificate._id }} target="_blank">
                    <Card                    
                    style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                    cover={<img alt="example" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" />}
                    // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                    <Meta
                      // avatar={<Avatar src={(blockstack.loadUserData().profile.imag=='undefined')?(inventLogo):(blockstack.loadUserData().profile.image[0].contentUrl)} />}
                      title={certificate.achievement_title}
                      description={certificate.event_name}
                    />
                      <br />
                        <div style={{display: "flex", margin: "auto"}}>
                          <FacebookShareButton
                              url={`https://encert.app/certificate?${certificate._id}`} 
                              quote="Have a look at my latest ceritification!"
                              hashtag="#poweredByEncert"
                          >
                          <FacebookIcon size={28} round={true}/>
                          </FacebookShareButton>
                          <TwitterShareButton
                              url={`https://encert.app/certificate?${certificate._id}`} 
                              title="Have a look at my latest ceritification!"
                              via="Encert.app"
                          >
                          <TwitterIcon size={28} round={true}/>
                          </TwitterShareButton>
                          <LinkedinShareButton 
                              url={`https://encert.app/certificate?${certificate._id}`}                           
                          >
                          <LinkedinIcon size={28} round={true}/>
                          </LinkedinShareButton>
                        </div>
                    </Card>
                  </Link>
                  </Col>
                );  
              break;
              }
            }
          }
        })
        this.setState({
          displayCertificates: filteredCertificates.length > 0 ? filteredCertificates : 'No certificates found for this criteria.'
        })
  }
  
    onEnterSearchValue = (value) => {
      // console.log("Search value is: ", value);
      const searchValue = value.length > 0 ? value : '';
      this.filterCertificates(searchValue);
    }

    getCertificatesFromServer = () => {
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

                let displayCerts = [];

                for (let index = 0; index < arr.length; index++) {
                  const element = arr[index];
                  // console.log("certificate data ", element)

                  displayCerts.push(
                    <Col key = {index} style={{marginBottom: '20px'}} md={3} sm={12}>
                    <Link to={{ pathname: "https://encert.app/certificate", search: "?"+element._id }} target="_blank">
                      <Card                    
                      style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                      cover={<img alt="example" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" />}
                      // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                      >
                      <Meta
                        // avatar={<Avatar src={(blockstack.loadUserData().profile.imag=='undefined')?(inventLogo):(blockstack.loadUserData().profile.image[0].contentUrl)} />}
                        title={element.achievement_title}
                        description={element.event_name}
                      />
                      <br />
                        <div style={{display: "flex", margin: "auto"}}>
                          <FacebookShareButton
                              url={`https://encert.app/certificate?${element._id}`} 
                              quote="Have a look at my latest ceritification!"
                              hashtag="#poweredByEncert"
                          >
                          <FacebookIcon size={28} round={true}/>
                          </FacebookShareButton>
                          <TwitterShareButton
                              url={`https://encert.app/certificate?${element._id}`} 
                              title="Have a look at my latest ceritification!"
                              via="Encert.app"
                          >
                          <TwitterIcon size={28} round={true}/>
                          </TwitterShareButton>
                          <LinkedinShareButton 
                              url={`https://encert.app/certificate?${element._id}`}                           
                          >
                          <LinkedinIcon size={28} round={true}/>
                          </LinkedinShareButton>
                        </div>
                      </Card>
                    </Link>
                    </Col>
                  );                
                }
                // console.log("Certificates to display: ", displayCerts);
                that.setState({
                  certificates: arr,
                  displayCertificates: displayCerts,
                  // person: ({thisPerson}),
                  // userProfile: profile,
                  // userIdentity: true,
                  // isSignedIn: true,
                  blockstackIdentity: blockstack_id    
                })
                // console.log("states is ", that.state);
              })
  
              .catch(function (error) {
                  console.log(error);
              });
          })
          .catch(function (error) {
            console.log("Error while fetching identity from server. ", error);
          });
    }

    componentDidMount() {
        this.getCertificatesFromServer();
    }

    render() {

        return (
            <div>
                <h1>My Certificates File</h1>
                <br />
                <Search placeholder="Search by receiver name, team name, issuer name or event name." onChange={(e) => this.onEnterSearchValue(e.target.value)} enterButton/>
                <br />            
                <br />            
                <br />            
                {
                  this.state.displayCertificates.length > 0
                  ?
                    <Container>
                    <Row>
                    {this.state.displayCertificates}
                    </Row>
                    </Container>
                  :
                  <h4>No certifications achieved yet.</h4>
                }
            </div>
            );
    }
}
 
export default AllCertificates;