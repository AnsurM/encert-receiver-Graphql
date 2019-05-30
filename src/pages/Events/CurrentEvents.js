import React, { Component } from 'react';
import { Carousel } from 'antd';
import { GET_CURRENT_EVENTS } from '../../components/GraphQL/queries';
import { print } from 'graphql';
import { url } from '../../utils/constants';

import './CurrentEvents.css';
const axios = require('axios');
const orgId = 'HA83UtP4MgaHl4NyJDg2efo2z3e2';

class CurrentEvents extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        dotPosition: 'top',
        displayData: [],
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
                <div style={{ width: "100%" }}>
                    <div style={{ margin: "0 auto", textAlign: "center" }}>
                        <h2>Event: {event.event_name}</h2>
                        <img src={event.event_logo} alt={event.event_name}
                            style={{
                                width: "800px",
                                height: "500px",
                                display: "block",
                                margin: "0 auto"
                            }}
                        />
                        <h2>Starting: {event.event_startDate}</h2>
                    </div>
                </div>
            );
        })
        console.log("My Data: ", myDisplayData);
        this.setState({
            displayData: myDisplayData
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
                // this.setState({
                //     certificates: res.data.data.getdetails
                // }, () => {
                //     this.makeDisplayCertificates(this.state.certificates);
                // })
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
            <div style={{ backgroundColor: "#D3D3D3", height: '600px' }}>
                <br />
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
        );
    }
}

export default CurrentEvents;