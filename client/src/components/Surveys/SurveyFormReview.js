//  Show users their form for review!!
import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions'

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const reviewFields = () => {
        return formFields.map(({label, name}) => {
            return (
                <div key={name}>
                    <label>{label}</label>
                    <div>{formValues[name]}</div>
                </div>
            )
        })
    };

    return (
        <div>
            <h5>Please confirm your details.</h5>
            {reviewFields(formValues)}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Go Back!</button>
            <button className="green btn-flat white-text right" onClick={ () => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons white-text right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return ({ formValues: state.form.surveyForm.values });
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));