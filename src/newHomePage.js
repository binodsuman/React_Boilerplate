import React from 'react';
import {Container, Form, Button, Row, Col, InputGroup, Table} from 'react-bootstrap';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import RestApi from "./restApi";

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {showGrid:false, hostList:[]};

        this.serviceNames = [];
        this.dataCenters = [];

        this.serviceNames.push({'key':'Crawler', 'value':'Crawler'});
        this.serviceNames.push({'key':'Dive', 'value':'Dive'});
        this.serviceNames.push({'key':'Publish', 'value':'Publish'});
        this.serviceNames.push({'key':'Post Processor', 'value':'Post Processor'});
        this.serviceNames.push({'key':'Matcher', 'value':'Matcher'});
        this.serviceNames.push({'key':'Amazon-A', 'value':'Amazon-A'});
        this.serviceNames.push({'key':'Amazon-B', 'value':'Amazon-B'});
        this.serviceNames.push({'key':'Non Amazon-A', 'value':'Non Amazon-A'});
        this.serviceNames.push({'key':'Non Amazon-B', 'value':'Non Amazon-B'});

        this.dataCenters.push({'key':'SouthCentral US', 'value':'SouthCentral US'});
        this.dataCenters.push({'key':'West US', 'value':'West US'});
        this.dataCenters.push({'key':'Both', 'value':'Both'});
    }

    handleServiceNameChange(e){
        this.setState({'serviceName': e.target.value});
    }

    handleDataCenterChange(e){
        this.setState({'dataCenter': e.target.value});
    }

    handleSubmit(){
        console.log('Inside handleSubmit');
        console.log(this.state);
        const data = {selectedService:this.state.serviceName, selectedDataCenter:this.state.dataCenter}
        RestApi.getHosts(data).then((responseData)=>{
            console.log('responseData :',responseData);
            const hostData = responseData.map((host)=>{
                return {name:host, selected:false}
            })
            this.setState({showGrid:true, hostList: hostData});
        }).catch((err)=>{
            console.log('Error :', err);
            this.setState({hostList: []});
        })
    }

    handleHealthCheck(){
        console.log('Inside handleHealthCheck');
        console.log(this.state.hostList);
        const data = this.state.hostList.filter((e) => e.selected);
        Promise.all(data.map(async (host) => {
            try {
                const responseData = await RestApi.getHostStatus(host);
                console.log(':: responseData ::', responseData);
                let tempList = this.state.hostList.map((object) => ({
                    ...object,
                  }));
                tempList.map((host) => {
                    if (host.name === responseData.name) {
                        host.reachable = responseData.reachable;
                        host.running = responseData.running;
                    }
                    return host;
                });
                console.log(':: tempList ::',tempList);
                const copy = tempList.slice();
                this.setState({
                    hostList: copy,
                });
                // this.setState({
                //     hostList: []
                //   },
                //   () => {
                //     this.setState({
                //         hostList: tempList
                //       });
                //   }
                // );
            } catch (error) {
                console.log('Error :', error);
            }
        })).then((data)=>console.log('All requests are processed successfully.'))
        .catch((err)=>console.log('Requests are failed. Error:', err));
    }

    handleReset(){
        // this.setState({age:'', gender:'', maritalStatus:'', diagnosis:'',
        // symptoms:[{'symptom':'', 'severity': ''}], 
        // medicines:[{'medicine':'', 'dose_per_day':0, 'days':0}],
        // showPrediction:false,
        // predictionData:{}});
    }

    onItemCheck(e, item) {
        let tempList = this.state.hostList;
        tempList.map((host) => {
            if (host.name === item.name) {
                host.selected = e.target.checked;
            }
            return host;
        });
        this.setState({
            hostList: tempList,
          });
    }

    renderHostTable(){
        console.log('showGrid :',this.state.showGrid);
        console.log('hostList :',this.state.hostList);
        if (this.state.showGrid) {
            const rows = this.state.hostList.map((host, index)=>{
                console.log(':: host.reachable ::',host.reachable);
                return <tr key={index}>
                <td>{(index+1)}</td>
                <td>{host.name}</td>
                <td>{host.reachable}</td>
                <td>{host.running}</td>
                <td>
                    <input
                        type="checkbox"
                        checked={host.selected}
                        onChange={(e) => this.onItemCheck(e, host)}/>
                </td>
            </tr>
            });
            return <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Host Name</th>
                        <th>Host Reachable</th>
                        <th>Service Running</th>
                        <th>Health Check</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            <Row>
            <Col sm={10}></Col>
            <Col sm={2} style={{ paddingLeft: 30}}>
            <Button variant="success" type="submit" onClick={this.handleHealthCheck.bind(this)}>Health Check</Button>
            </Col>
            </Row>
            </div>
        }
        return '';
    }
  
    render(){

        return (
            <Container>
            <br/>
            <Row>
            <Col sm={12}>
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
            
            <h5>Enter Details</h5>
            <br/>
            <Row>
            <Col sm={2}>
                    <label>Service Name</label>
            </Col>
            <Col sm={4}>
                    <select type="text" className="form-control dropdown" 
                    value={this.state.serviceName} onChange={this.handleServiceNameChange.bind(this)}>
                    <option>-- Select Service Name --</option>
                    {this.serviceNames.map((service)=>{
                        return <option key={service.key} value={service.value}>{service.value}</option>
                    })}
                    </select>
            </Col>
            <Col sm={2}>
                    <label>Data Center</label>
            </Col>
            <Col sm={4}>
                    <select type="text" className="form-control dropdown" 
                    value={this.state.dataCenter} onChange={this.handleDataCenterChange.bind(this)}>
                    <option>-- Select Data Center --</option>
                    {this.dataCenters.map((center)=>{
                        return <option key={center.key} value={center.value}>{center.value}</option>
                    })}
                    </select>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col sm={8}></Col>
            <Col sm={2} style={{ paddingLeft: 150}}>
            <Button variant="success" type="submit" onClick={this.handleReset.bind(this)}>Reset</Button>
            </Col>
            <Col sm={2} style={{ paddingLeft: 60}}>
            <Button variant="success" type="submit" onClick={this.handleSubmit.bind(this)}>Find Host</Button>
            </Col>
            </Row>

            </div>
            </Col>
            </Row>
            {this.renderHostTable()}
            {this.state.hostList.map((host, index)=>{
                return <label>{host.reachable}-{host.running}</label>
            })}
            </Container>
        )

    }
  }

  export default HomePage;