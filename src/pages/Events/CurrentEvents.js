import React, { Component } from 'react';
import { Carousel } from 'antd';
import { GET_CURRENT_EVENTS } from '../../components/GraphQL/queries';
import { print } from 'graphql';
import { url } from '../../utils/constants';
import { Container, Row, Col } from 'react-grid-system';
import { Card, Icon, Avatar } from 'antd';

import './CurrentEvents.css';

const { Meta } = Card;

const axios = require('axios');
const orgId = 'HA83UtP4MgaHl4NyJDg2efo2z3e2';

class CurrentEvents extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        dotPosition: 'top',
        displayData: [],
        gridData: [],
        events: [
            {
                name: "ICC World Cup 2019",
                logo_url: "https://as00.epimg.net/en/imagenes/2018/04/27/other_sports/1524780070_068405_1524780306_noticia_normal.jpg",
                start_date: "30 May 2019"
            },
            {
                name: "La Liga 2019/2020",
                logo_url: "https://media.minutemediacdn.com/process?url=https%3A%2F%2F90min-images-original.s3.amazonaws.com%2Fproduction%2F5cb49257e195f34aa1000001.jpeg&filters%5Bcrop%5D%5Bw%5D=0.5374001452432825&filters%5Bcrop%5D%5Bh%5D=0.9982257828504536&filters%5Bcrop%5D%5Bo_x%5D=0.05718954248366013&filters%5Bcrop%5D%5Bo_y%5D=0.0&filters%5Bquality%5D%5Btarget%5D=80&type=.jpg&filters%5Bresize%5D%5Bw%5D=578&filters%5Bresize%5D%5Bh%5D=325",
                start_date: "10 Aug 2019"
            },
            {
                name: "Premier League 2019/2020",
                logo_url: "https://www.gannett-cdn.com/-mm-/eff16e362ab1c55fb18dd4faa6b341e433708ce3/c=0-219-4256-2613/local/-/media/2018/06/08/USATODAY/usatsports/e397b8c5a06941dcb8d65fd729e577f1.jpg?width=3200&height=1680&fit=crop",
                start_date: "10 Aug 2019"
            }
        ]
    };

    generateCarousels = (data) => {
        let myDisplayData = data.map(event => {
            return (
                <div style={{ width: "100%"}}>
                    <div style={{width: "80%", margin: "0 auto", textAlign: "center", paddingBottom: "15px"}}>
                        <Card
                            style={{ border: "2px solid #454d66", borderRadius: "5px", backgroundColor: "#dedede" }}
                            // style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src={event.event_logo}
                                    style={{ height: "350px", borderBottom: "2px solid #454d66" }}
                                />
                            }
                        >
                            <Meta
                                // avatar={<Avatar src={event.event_logo} />}
                                title={event.event_name.toUpperCase()}
                                description={`STARTING: ${event.event_startDate.toUpperCase()}`}
                            />
                        </Card>
                        <br />
                    </div>
                </div>
            );
        })
        console.log("My Data: ", myDisplayData);
        this.setState({
            displayData: myDisplayData
        })
    }

    generateGrid = (data) => {
        let myData = data;
        let newData = myData.map(element => {
            console.log("Url: ", element.logo_url);
            return (
                <Col xs={12} sm={6} md={4} lg={4} style={{ margin: "15px auto" }}>
                    <Card
                        style={{ border: "1.5px solid #D3D3D3", backgroundColor: "#dedede" }}
                        // style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src={element.event_logo}
                                style={{ height: "200px", borderBottom: "2px solid black" }}
                            />
                        }
                    >
                        <Meta
                            // avatar={<Avatar src={element.event_logo} />}
                            title={element.event_name.toUpperCase()}
                            description={`STARTING: ${element.event_startDate.toUpperCase()}`}
                        />
                    </Card>
                </Col>
            );
        })
        this.setState({
            gridData: newData
        })
    }

    getEventsFromServer = () => {
        axios.post(url, {
            query: print(GET_CURRENT_EVENTS),
            variables: {
                uid: ''
            },
        })
            .then(res => {
                console.log("Event details \n", res.data.data.getcurrentevents);
                this.generateCarousels(res.data.data.getcurrentevents);
                this.generateGrid(res.data.data.getcurrentevents);
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getEventsFromServer();
        // this.generateCarousels();
    }

    render() {
        const { dotPosition } = this.state;

        return (
            <div style={{ width: "100%", margin: "auto" }}>
                <div style={{ width: "100%", margin: "auto", backgroundColor: "#B0A9A7", borderRadius: "10px"}}>
                    <br />
                    <h2 style={{ textAlign: "center", margin: "10px 0px", color:"#beeef7" }}>HIGHLIGHT EVENTS</h2>
                    {this.state.displayData.length > 0
                        ?
                            <Carousel autoplay dotPosition={dotPosition}>
                                    {this.state.displayData}
                            </Carousel>
                        :
                        <h2>Getting events....</h2>
                    }
                <br />
                </div>
                <br />
                <div style={{ width: "100%", margin: "0", textAlign: "center", backgroundColor: "#454d66", borderRadius: "15px" }}>
                    <br />
                    <h2 style={{ color: "#d9d872", margin: "10px 0px" }}>ALL ONGOING EVENTS</h2>
                    <Container>
                        <Row>
                            {this.state.gridData}
                            {this.state.gridData}
                            {this.state.gridData}
                            {this.state.gridData}
                            {this.state.gridData}
                            {this.state.gridData}
                        </Row>
                    </Container>
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}

export default CurrentEvents;