import React from 'react';
import {Container, Form, Button, Row, Col, InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import RestApi from "./restApi";

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {symptoms:[{'symptom':'', 'severity': ''}], 
                      medicines:[{'medicine':'', 'dose_per_day':0, 'days':0}],
                      showPrediction:false,
                      predictionData:{}};

        this.showPrediction = false;
        this.predictionData = {};

        this.allergySymptoms = [];
        this.feverSymptoms = [];
        this.coldSymptoms = [];
        this.gastroSymptoms = [];
        this.gerdSymptoms = [];
        this.diagnosisSymptoms = [];

        this.allergySymptoms.push({'key':'Chills', 'value':'Chills'});
        this.allergySymptoms.push({'key':'Sneezing', 'value':'Sneezing'});
        this.allergySymptoms.push({'key':'Watery_eyes', 'value':'Watery eyes'});

        this.coldSymptoms.push({'key':'Cough', 'value':'Cough'});
        this.coldSymptoms.push({'key':'Fever', 'value':'Fever'});
        this.coldSymptoms.push({'key':'Nasal_Congestion', 'value':'Nasal Congestion'});
        this.coldSymptoms.push({'key':'Runny_nose', 'value':'Runny nose'});
        this.coldSymptoms.push({'key':'Sneezing', 'value':'Sneezing'});
        this.coldSymptoms.push({'key':'Sore_throat', 'value':'Sore throat'});

        this.feverSymptoms.push({'key':'Fever', 'value':'Fever'});
        this.feverSymptoms.push({'key':'Headache', 'value':'Headache'});
        this.feverSymptoms.push({'key':'Lethargy', 'value':'Lethargy'});
        this.feverSymptoms.push({'key':'Shivering', 'value':'Shivering'});
        

        this.gerdSymptoms.push({'key':'Acidity', 'value':'Acidity'});
        this.gerdSymptoms.push({'key':'Chest_pain', 'value':'Chest pain'});
        this.gerdSymptoms.push({'key':'Heartburn', 'value':'Heartburn'});
        this.gerdSymptoms.push({'key':'Sour_liquid', 'value':'Sour liquid'});
        this.gerdSymptoms.push({'key':'Ulcers_on_tongue', 'value':'Ulcers on tongue'});
        this.gerdSymptoms.push({'key':'Vomiting', 'value':'Vomiting'});
        
        
        this.gastroSymptoms.push({'key':'Abdominal_cramps', 'value':'Abdominal cramps'});
        this.gastroSymptoms.push({'key':'Dehydration', 'value':'Dehydration'});
        this.gastroSymptoms.push({'key':'Fever', 'value':'Fever'});
        this.gastroSymptoms.push({'key':'Liquid_stools', 'value':'Liquid stools'});

        //Medicines
        this.allergyMedicines = [];
        this.feverMedicines = [];
        this.coldMedicienes = [];
        this.gastroMedicines = [];
        this.gerdMedicines = [];
        this.diagnosisMedicines = [];

        this.allergyMedicines.push({'key':'Levocetirizine_5mg', 'value':'Levocetirizine 5mg'});

        this.feverMedicines.push({'key':'Dolo_650mg', 'value':'Dolo 650mg'});
        this.feverMedicines.push({'key':'Dolo_650mg_if_body_temp>=100', 'value':'Dolo 650mg if body temp>=100'});
        this.feverMedicines.push({'key':'Azithromycin_250mg', 'value':'Azithromycin 250mg'});

        this.coldMedicienes.push({'key':'Levocetirizine_5mg', 'value':'Levocetirizine 5mg'});
        this.coldMedicienes.push({'key':'Easibreathe_Inhalant', 'value':'Easibreathe Inhalant'});
        this.coldMedicienes.push({'key':'Azithromycin_250mg', 'value':'Azithromycin 250mg'});
        this.coldMedicienes.push({'key':'Dolo_650mg', 'value':'Dolo 650mg'});
        this.coldMedicienes.push({'key':'Dolo_650mg_if_body_temp>=100', 'value':'Dolo 650mg if body temp>=100'});
        this.coldMedicienes.push({'key':'Benadryl_Syrup', 'value':'Benadryl Syrup'});

        this.gerdMedicines.push({'key':'Sompraz_D_40mg', 'value':'Sompraz D 40mg'});
        this.gerdMedicines.push({'key':'Omeprazole_20mg', 'value':'Omeprazole 20mg'});

        this.gastroMedicines.push({'key':'Ofloxacin_Ornidazol', 'value':'Ofloxacin Ornidazol'});
        this.gastroMedicines.push({'key':'N_Flox_TZ', 'value':'N Flox TZ'});
        this.gastroMedicines.push({'key':'Dolo_650mg', 'value':'Dolo 650mg'});
        this.gastroMedicines.push({'key':'Dolo_650mg_if_body_temp>=100', 'value':'Dolo 650mg if body temp>=100'});


        this.symptomMasterList = [];
        this.symptomMasterList.push({'key':'Sneezing', 'value':'Sneezing'});
        this.symptomMasterList.push({'key':'Runny_nose', 'value':'Runny nose'});
        this.symptomMasterList.push({'key':'Nasal_Congestion', 'value':'Nasal Congestion'});
        this.symptomMasterList.push({'key':'Sore_throat', 'value':'Sore throat'});
        this.symptomMasterList.push({'key':'Fever', 'value':'Fever'});
        this.symptomMasterList.push({'key':'Cough', 'value':'Cough'});
        this.symptomMasterList.push({'key':'Heartburn', 'value':'Heartburn'});
        this.symptomMasterList.push({'key':'Chest_pain', 'value':'Chest pain'});
        this.symptomMasterList.push({'key':'Ulcers_on_tongue', 'value':'Ulcers on tongue'});
        this.symptomMasterList.push({'key':'Vomiting', 'value':'Vomiting'});
        this.symptomMasterList.push({'key':'Watery_eyes', 'value':'Watery eyes'});
        this.symptomMasterList.push({'key':'Chills', 'value':'Chills'});
        this.symptomMasterList.push({'key':'Headache', 'value':'Headache'});
        this.symptomMasterList.push({'key':'Shivering', 'value':'Shivering'});
        this.symptomMasterList.push({'key':'Lethargy', 'value':'Lethargy'});
        this.symptomMasterList.push({'key':'Liquid_stools', 'value':'Liquid stools'});
        this.symptomMasterList.push({'key':'Abdominal_cramps', 'value':'Abdominal cramps'});
        this.symptomMasterList.push({'key':'Dehydration', 'value':'Dehydration'});
        this.symptomMasterList.push({'key':'Sour_liquid', 'value':'Sour liquid'});
        this.symptomMasterList.push({'key':'Acidity', 'value':'Acidity'});
        

        this.medicineMasterList = [];
        this.medicineMasterList.push({'key':'Levocetirizine_5mg', 'value':'Levocetirizine 5mg'});
        this.medicineMasterList.push({'key':'Easibreathe_Inhalant', 'value':'Easibreathe Inhalant'});
        this.medicineMasterList.push({'key':'Dolo_650mg', 'value':'Dolo 650mg'});
        this.medicineMasterList.push({'key':'Azithromycin_250mg', 'value':'Azithromycin 250mg'});
        this.medicineMasterList.push({'key':'Benadryl_Syrup', 'value':'Benadryl Syrup'});
        this.medicineMasterList.push({'key':'Sompraz_D_40mg', 'value':'Sompraz D 40mg'});
        this.medicineMasterList.push({'key':'Dolo_650mg_if_body_temp>=100', 'value':'Dolo 650mg if body temp>=100'});
        this.medicineMasterList.push({'key':'N_Flox_TZ', 'value':'N Flox TZ'});
        this.medicineMasterList.push({'key':'Ofloxacin_Ornidazol', 'value':'Ofloxacin Ornidazol'});
        this.medicineMasterList.push({'key':'Omeprazole_20mg', 'value':'Omeprazole 20mg'});


        this.ageList = ['15-20','20-25','25-30','30-35','35-40','40-45','45-50','50-55']

    }

    handleAgeChange(e){
        this.setState({'age': e.target.value});
    }

    handleGenderChange(e){
        this.setState({'gender': e.target.value});
    }

    handleMaritalStatusChange(e){
        this.setState({'maritalStatus': e.target.value});
    }

    handleDiagnosisChange(e){
        const selectedDiagnosis = e.target.value;
        console.log(':: selectedDiagnosis ::',selectedDiagnosis);
        this.setState({'diagnosis': selectedDiagnosis});
        this.diagnosisSymptoms = [];
        this.diagnosisMedicines = [];
        if(selectedDiagnosis==='Allergy'){
            this.diagnosisSymptoms = this.diagnosisSymptoms.concat(this.allergySymptoms);
            this.diagnosisMedicines = this.diagnosisMedicines.concat(this.allergyMedicines);
        } else if(selectedDiagnosis==='Common Cold'){
            this.diagnosisSymptoms = this.diagnosisSymptoms.concat(this.coldSymptoms);
            this.diagnosisMedicines = this.diagnosisMedicines.concat(this.coldMedicienes);
        } else if(selectedDiagnosis==='Fever'){
            this.diagnosisSymptoms = this.diagnosisSymptoms.concat(this.feverSymptoms);
            this.diagnosisMedicines = this.diagnosisMedicines.concat(this.feverMedicines);
        } else if(selectedDiagnosis==='Gastroenteritis'){
            this.diagnosisSymptoms = this.diagnosisSymptoms.concat(this.gastroSymptoms);
            this.diagnosisMedicines = this.diagnosisMedicines.concat(this.gastroMedicines);
        } else if(selectedDiagnosis==='GERD'){
            this.diagnosisSymptoms = this.diagnosisSymptoms.concat(this.gerdSymptoms);
            this.diagnosisMedicines = this.diagnosisMedicines.concat(this.gerdMedicines);
        }
    }

    handleAddSymptom(){
        this.setState((state, props) => ({
            symptoms: [...state.symptoms, {'symptom':'', 'severity': ''}]
        }));
    }

    handleAddMedicine(){
        this.setState((state, props) => ({
            medicines: [...state.medicines, {'medicine':'', 'dose_per_day':0, 'days':0}]
        }));
    }

    handleSymptomChange(index, e){
        let symptoms = [...this.state.symptoms];
        let item = {
            ...symptoms[index],
            symptom: e.target.value
        }
        console.log('Selected symptom :', item);
        symptoms[index] = item;
        this.setState({symptoms});
    }

    handleSeverityChange(index, e){
        let symptoms = [...this.state.symptoms];
        let item = {
            ...symptoms[index],
            severity: e.target.value
        }
        console.log('Selected symptom :', item);
        symptoms[index] = item;
        this.setState({symptoms});
    }

    handleMedicineChange(index, e){
        let medicines = [...this.state.medicines];
        let item = {
            ...medicines[index],
            medicine: e.target.value
        }
        console.log('Selected medicine :', item);
        medicines[index] = item;
        this.setState({medicines});
    }

    handleDosePerDayChange(index, e){
        let medicines = [...this.state.medicines];
        let item = {
            ...medicines[index],
            dose_per_day: e.target.value
        }
        console.log('Selected dose_per_day :', item);
        medicines[index] = item;
        this.setState({medicines});
    }

    handleDaysChange(index, e){
        let medicines = [...this.state.medicines];
        let item = {
            ...medicines[index],
            days: e.target.value
        }
        console.log('Selected days :', item);
        medicines[index] = item;
        this.setState({medicines});
    }
    

    handleSubmit(){
        console.log('Inside handleSubmit');
        console.log(this.state);
        const data = {'Gender':this.state.gender, 'Age': this.state.age, 
                        'Marital Status': this.state.maritalStatus, 'Diagnosis': this.state.diagnosis};
        const selectedSymptoms = this.state.symptoms;
        const selectedMedicines = this.state.medicines;

        console.log('selectedMedicines ::',selectedMedicines);

        this.symptomMasterList.forEach((symptom)=>{
            const selectedSymptom = selectedSymptoms.find((element)=> element.symptom===symptom.key);
            if(selectedSymptom){
                data[symptom.key] = selectedSymptom.severity ? selectedSymptom.severity : 'None';
            } else {
                data[symptom.key] = 'None';
            }
        });

        this.medicineMasterList.forEach((medicine)=>{
            const selectedMedicine = selectedMedicines.find((element)=> element['medicine']===medicine.key);
            console.log(':: selectedMedicine ::', selectedMedicine);
            if(selectedMedicine){
                data[medicine.key] = 1;
                data[medicine.key+'_dose_per_day'] = selectedMedicine.dose_per_day ? parseInt(selectedMedicine.dose_per_day) : 0;
                data[medicine.key+'_days'] = selectedMedicine.days ? parseInt(selectedMedicine.days) : 0;
            } else {
                data[medicine.key] = 0;
                data[medicine.key+'_dose_per_day'] = 0;
                data[medicine.key+'_days'] = 0;
            }
        });

        console.log('Data to be submitted :', data);

        RestApi.getHosts(data).then((responseData)=>{
            console.log('responseData :',responseData);
            this.setState({showPrediction:true, predictionData: responseData});
            /* this.predictionData = responseData;
            this.showPrediction = true; */
        }).catch((err)=>{
            console.log('Error :', err);
            this.predictionData = {};
        })
    }

    handleReset(){
        this.setState({age:'', gender:'', maritalStatus:'', diagnosis:'',
        symptoms:[{'symptom':'', 'severity': ''}], 
        medicines:[{'medicine':'', 'dose_per_day':0, 'days':0}],
        showPrediction:false,
        predictionData:{}});
    }

    renderSymptoms(){
        const addButton = <Button variant="success" type="submit" onClick={this.handleAddSymptom.bind(this)}>Add</Button>
        const rows = this.state.symptoms.map((data, index)=>{
            return <div>
            <Row>
                    <Col sm={5}>
                            <label>Symptom</label>
                            <select type="text" className="form-control dropdown"
                            value={data.symptom}
                            onChange={this.handleSymptomChange.bind(this,index)}>
                            <option value="">-- Select Symptom --</option>
                            {this.diagnosisSymptoms.map((symptom)=>{
                                return <option key={symptom.key} value={symptom.key}>{symptom.value}</option>
                            })}
                            </select>
                    </Col>
                    <Col sm={5}>
                        <label>Severity</label>
                        <select type="text" className="form-control dropdown"
                        value={data.severity}
                        onChange={this.handleSeverityChange.bind(this,index)}>
                        <option>-- Select Severity --</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        </select>
                    </Col>
                    <Col sm={2} style={{ paddingTop: 33}}>
                        {index===(this.state.symptoms.length-1) ? addButton : ''}
                    </Col>
                </Row>
                </div>
        });
        return rows;
    }

    renderMedicines(){
        const addButton = <Button variant="success" type="submit"
        onClick={this.handleAddMedicine.bind(this)}>Add</Button>
        const rows = this.state.medicines.map((data, index)=>{
            return <div>
            <Row>
            <Col sm={5}>
                    <label>Medicine</label>
                    <select type="text" className="form-control dropdown"
                    value={data.medicine}
                    onChange={this.handleMedicineChange.bind(this,index)}>
                    <option>-- Select Medicine --</option>
                    {this.diagnosisMedicines.map((medicine)=>{
                        return <option key={medicine.key} value={medicine.key}>{medicine.value}</option>
                    })}
                    </select>
                </Col>
                <Col sm={3}>
                    <label>Dose per Day</label>
                    <input type="number" className="form-control" min="0" max="7"
                        value={data.dose_per_day}
                        onChange={this.handleDosePerDayChange.bind(this,index)}/>
                </Col>
                <Col sm={2}>
                    <label>Days</label>
                    <input type="number" className="form-control" min="0" max="7"
                        value={data.days}
                        onChange={this.handleDaysChange.bind(this,index)}/>
                </Col>
                <Col sm={2} style={{ paddingTop: 33}}>
                    {index===(this.state.medicines.length-1) ? addButton : ''}
                </Col>
            </Row>
            </div>
        });
        return rows;
    }

    renderPrediction(){
        if(this.state.showPrediction){
            return <Col sm={6}>
                        <div className="shadow-lg p-3 mb-5 bg-white rounded">
                            <h5>Prediction</h5>
                            <br/>

                            <Row>
                                <Col sm={6}>
                                    <label>Is there chance of second visit? </label>
                                </Col>
                                <Col sm={4}>
                                    <label style={{ color: this.state.predictionData.Prediction === 1? 'red': 'green'}}>
                                        <b>{this.state.predictionData.Prediction === 1? 'Yes' : 'No'}</b>
                                    </label>
                                </Col>
                            </Row>

                            <br/>

                            <Row>
                                <Col>
                                    <label>Medicines prescribed to similar patient: </label>
                                </Col>
                            </Row>

                            <br/>

                            <Row>
                                <Col>
                                    <label>First visit medicines: </label>
                                </Col>
                            </Row>

                            {this.state.predictionData.Medicines.firstVisit.map((medicine) => {
                                return <Row>
                                    <Col sm={6}>
                                        <label>Medicine : </label>
                                        <label>{medicine['medicine']}</label>
                                    </Col>
                                    <Col sm={4}>
                                        <label>Dose per day : </label>
                                        <label>{medicine['dose_per_day']}</label>
                                    </Col>
                                    <Col sm={2}>
                                        <label>Days : </label>
                                        <label>{medicine['days']}</label>
                                    </Col>
                                </Row>
                            })}

                            <br/>

                            <Row>
                                <Col>
                                    <label>Second visit medicines: </label>
                                </Col>
                            </Row>

                            {this.state.predictionData.Medicines.secondVisit.map((medicine) => {
                                return <Row>
                                    <Col sm={6}>
                                        <label>Medicine : </label>
                                        <label>{medicine['medicine']}</label>
                                    </Col>
                                    <Col sm={4}>
                                        <label>Dose per day : </label>
                                        <label>{medicine['dose_per_day']}</label>
                                    </Col>
                                    <Col sm={2}>
                                        <label>Days : </label>
                                        <label>{medicine['days']}</label>
                                    </Col>
                                </Row>
                            })}


                        </div>
                    </Col>
        }
        return '';
    }
  
    render(){

        return (
            <Container>
            <br/>
            <Row>
            <Col sm={6}>
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
            
            <h5>Enter Patient Details</h5>
            <br/>
            <Row>
            <Col sm={4}>
                    <label>Age</label>
            </Col>
            <Col sm={6}>
                    <select type="text" className="form-control dropdown" 
                    value={this.state.age} onChange={this.handleAgeChange.bind(this)}>
                    <option>-- Select Age Range --</option>
                    {this.ageList.map((age)=>{
                        return <option key={age} value={age}>{age}</option>
                    })}
                    </select>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col sm={4}>
                    <label>Gender</label>
            </Col>
            <Col sm={6}>
                    <select type="text" className="form-control dropdown" 
                    value={this.state.gender} onChange={this.handleGenderChange.bind(this)}>
                    <option>-- Select Gender --</option>
                    <option value="M">Male</option>
                    <option value="F">Femal</option>
                    </select>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col sm={4}>
                    <label>Marital Status</label>
            </Col>
            <Col sm={6}>
                    <select type="text" className="form-control dropdown" 
                    value={this.state.maritalStatus}
                    onChange={this.handleMaritalStatusChange.bind(this)}>
                    <option>-- Select Marital Status --</option>
                    <option value="M">Married</option>
                    <option value="S">Single</option>
                    </select>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col sm={4}>
                    <label>Diagnosis</label>
            </Col>
            <Col sm={6}>
                    <select type="text"  className="form-control dropdown" 
                    onChange={this.handleDiagnosisChange.bind(this)}
                    value={this.state.diagnosis}>
                    <option>-- Select Diagnosis --</option>
                    <option>Allergy</option>
                    <option>Common Cold</option>
                    <option>Fever</option>
                    <option>Gastroenteritis</option>
                    <option>GERD</option>
                    </select>
            </Col>
            </Row>
            <br/>
            
            {this.renderSymptoms()}

            <br/>
            {this.renderMedicines()}

            <br/>
            <br/>
            
            <Row>
            <Col sm={7}></Col>
            <Col sm={2} style={{ paddingLeft: 40}}>
            <Button variant="success" type="submit" onClick={this.handleReset.bind(this)}>Reset</Button>
            </Col>
            <Col sm={3} style={{ paddingLeft: 40}}>
            <Button variant="success" type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </Col>
            </Row>

            </div>
            </Col>
            
            {this.renderPrediction()}

            </Row>
            </Container>
        )

    }
    
  }

  export default HomePage;