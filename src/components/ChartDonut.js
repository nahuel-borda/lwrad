import React from 'react'
import { Card, DonutChart, Title, Footer, ButtonInline } from '@tremor/react'
import * as RiIcons from "react-icons/ri";
import { Link } from "react-router-dom";

class ServiceStatusChartDonut extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          statusCountDataset: []
        }
    }

    parseStatusCountDataset(status_count) {
        // Add each service status to the statusCountDataset object
        let statusCountDatasetList = status_count
        
        // Update the state
        this.setState(
          { 
            'statusCountDataset': statusCountDatasetList
          }
        );
    }

    componentDidMount() {
        fetch('http://localhost:8000/services/status_count/')
        .then(res => res.json())
        .then(
        json => {this.parseStatusCountDataset(json)}
        )
    }

    render() {
        return (
            <Card>
                <Title>Services by Status</Title>
                <DonutChart 
                    data={this.state.statusCountDataset}
                    category='count'
                    dataKey='name'
                    marginTop='mt-6'
                   i colors={["yellow", "violet", "indigo", "green", "cyan", "rose"]}
                />
                <Footer>
                    <Link to='/services/'>
                      <ButtonInline
                          size="sm"
                          text="View details"
                          icon={ RiIcons.RiArrowRightCircleFill }
                          iconPosition="right"
                      />
                    </Link>
                </Footer>
            </Card>
          )
    };
}

export default ServiceStatusChartDonut