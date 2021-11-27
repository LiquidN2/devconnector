import React, { Component } from 'react';
import moment from 'moment';

import {
  ControlledTextInput,
  ControlledMonthDropDown,
  ControlledYearDropDown,
  ControlledTextArea,
  ControlledDropDownMenu
} from './ControlledInput';

const degreeOptions = [
  'Certificate',
  'Associate Degree/ Diploma',
  'Bachelor Degree',
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BS)',
  'Master Degree',
  'Master of Arts (MA)',
  'Master of Science (MS)',
  'Master of Business Administration (MBA)',
  'Doctor Degree',
  'Doctor of Philosophy (PhD)',
  'Doctor of Medicine (MD)',
  'Juris Doctor (JD)'
];

const checkboxPaddingTop = {
  paddingTop: "3.5rem"
};

const checkboxFont = {
  fontSize: "1.6rem"
};

export default class EducationModalForm extends Component {
  state = {
    _id: '',
    degree: '',
    fieldOfStudy: '',
    school: '',
    location: '',
    fromMonth: '',
    fromYear: '',
    toMonth: '',
    toYear: '',
    current: false,
    description: '',
    hasErrors: false,
    errorMessage: '',
    isSubmitting: false
  }

  componentDidMount = () => {
    this.setState(prevState => ({
      ...prevState,
      _id: this.props._id ? this.props._id : '',
      degree: this.props.degree ? this.props.degree : '',
      fieldOfStudy: this.props.fieldOfStudy ? this.props.fieldOfStudy : '',
      school: this.props.school ? this.props.school : '',
      location: this.props.location ? this.props.location : '',
      description: this.props.description ? this.props.description : '',
      fromMonth: this.props.from ? moment(this.props.from).format('MMM') : '',
      fromYear: this.props.from ? moment(this.props.from).format('YYYY') : '',
      toMonth: this.props.to ? moment(this.props.to).format('MMM') : '',
      toYear: this.props.to ? moment(this.props.to).format('YYYY') : '',
      current: this.props.current ? this.props.current : false
    }))
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //     if (this.props._id && !prevProps._id) {
  //         this.setState({_id: this.props._id});
  //     }

  //     if (this.props.title && !prevProps.title) {
  //         this.setState({title: this.props.title});
  //     }

  //     if (this.props.company && !prevProps.company) {
  //         this.setState({company: this.props.company});
  //     }

  //     if (this.props.location && !prevProps.location) {
  //         this.setState({location: this.props.location});
  //     }

  //     if (this.props.description && !prevProps.description) {
  //         this.setState({description: this.props.description});
  //     }
  // }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  onCurrentChange = event => {
    const current = event.target.checked ? true : false;
    if (current) {
      this.setState(prevState => {
        return {
          ...prevState,
          current,
          toMonth: '',
          toYear: ''
        };
      });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          current
        };
      });
    }
  };

  clearFormErrors = () => {
    this.setState(() => {
      return {
        hasErrors: false,
        errorMessage: ''
      }
    });
  }

  // validate dates
  validateFormData = () => {
    console.log('validating data');

    const currentDate = moment().valueOf();
    const fromDate = moment(`${this.state.fromMonth}${this.state.fromYear}`, 'MMMYYYY').valueOf();

    if (!this.state.current && (this.state.toMonth === '' || this.state.toYear === '')) {
      this.setState(() => {
        return {
          hasErrors: true,
          errorMessage: 'Please provide "to" date or select current.'
        }
      });
    }

    if (!this.state.current && (this.state.toMonth !== '' && this.state.toYear !== '')) {
      const toDate = moment(`${this.state.toMonth}${this.state.toYear}`, 'MMMYYYY').valueOf();

      if ((toDate > currentDate) || (fromDate > toDate)) {
        this.setState(() => {
          return {
            hasErrors: true,
            errorMessage: 'Please make sure education dates are correct.'
          }
        });
      }
    }

    if (this.state.current) {
      if (fromDate > currentDate) {
        this.setState(() => {
          return {
            hasErrors: true,
            errorMessage: 'Please make sure education dates are correct.'
          }
        });
      }
    }
  }

  onSubmit = event => {
    event.preventDefault();
    this.clearFormErrors();
    this.validateFormData();

    setTimeout(() => {
      if (!this.state.hasErrors) {
        const educationData = {
          _id: this.state._id,
          degree: this.state.degree,
          fieldOfStudy: this.state.fieldOfStudy,
          school: this.state.school,
          location: this.state.location,
          from: moment(`${this.state.fromMonth}${this.state.fromYear}`, 'MMMYYYY').valueOf(),
          to: this.state.current ? null : moment(`${this.state.toMonth}${this.state.toYear}`, 'MMMYYYY').valueOf(),
          current: this.state.current,
          description: this.state.description
        }

        this.props.onEducationUpdate(educationData);
      }
    }, 200);
  }

  render() {
    let formHeading;
    if (this.props._id) {
      formHeading = 'Provide Updates to Education Qualification';
    } else {
      formHeading = 'Provide Details Of Your New Education Qualification';
    }

    return (
      <div className="modal-form">
        {this.state.hasErrors ? this.state.errorMessage : null}
        <div className="row">
          <div className="col-full-width">
            <h2 className="modal-form__heading">{formHeading}</h2>
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="row u-margin--none">
            <div className="col-1-of-2">
              <div className="form__group">
                <label htmlFor="degree" className="form__label form__label--required">Degree/ Qualification Type</label>
                <ControlledDropDownMenu
                  fieldName="degree"
                  fieldId="degree"
                  className="form__input"
                  options={degreeOptions}
                  fieldValue={this.state.degree}
                  onChange={this.handleInputChange}
                  required={true}
                />
              </div>
              <div className="form__group">
                <label htmlFor="fieldOfStudy" className="form__label form__label--required">Field of Study</label>
                <ControlledTextInput
                  fieldName="fieldOfStudy"
                  fieldId="fieldOfStudy"
                  className="form__input"
                  fieldValue={this.state.fieldOfStudy}
                  onChange={this.handleInputChange}
                  required={true}
                />
              </div>
              <div className="form__group">
                <label htmlFor="school" className="form__label form__label--required">School</label>
                <ControlledTextInput
                  fieldName="school"
                  fieldId="school"
                  className="form__input"
                  fieldValue={this.state.school}
                  onChange={this.handleInputChange}
                  required={true}
                />
              </div>
              <div className="form__group">
                <label htmlFor="location" className="form__label">School Location</label>
                <ControlledTextInput
                  fieldName="location"
                  fieldId="location"
                  className="form__input"
                  fieldValue={this.state.location}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-1-of-2">
              <div className="form__group">
                <label htmlFor="from" className="form__label form__label--required">From</label>
                <div className="row">
                  <div className="col-1-of-2">
                    <ControlledMonthDropDown
                      fieldName="fromMonth"
                      fieldId="fromMonth"
                      fieldValue={this.state.fromMonth}
                      onChange={this.handleInputChange}
                      required={true}
                    />
                  </div>
                  <div className="col-1-of-2">
                    <ControlledYearDropDown
                      fieldName="fromYear"
                      fieldId="fromYear"
                      fieldValue={this.state.fromYear}
                      onChange={this.handleInputChange}
                      required={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="to" className="form__label">To</label>
                <div className="row">
                  <div className="col-1-of-2">
                    <ControlledMonthDropDown
                      fieldName="toMonth"
                      fieldId="toMonth"
                      fieldValue={this.state.toMonth}
                      selectedValue={this.state.toMonth}
                      onChange={this.handleInputChange}
                      isDisabled={this.state.current}
                    />
                  </div>
                  <div className="col-1-of-2">
                    <ControlledYearDropDown
                      fieldName="toYear"
                      fieldId="toYear"
                      fieldValue={this.state.toYear}
                      selectedValue={this.state.toYear}
                      onChange={this.handleInputChange}
                      isDisabled={this.state.current}
                    />
                  </div>
                </div>
              </div>

              <div className="form__group" style={checkboxPaddingTop}>
                <label htmlFor="current" className="checkbox-container">
                  <span style={checkboxFont}>I am currently pursuing this qualification</span>
                  <input
                    type="checkbox"
                    name="current"
                    id="current"
                    defaultChecked={this.props.current}
                    onChange={this.onCurrentChange}
                  />
                  <span className="checkbox-checkmark"></span>
                </label>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-full-width">
              <div className="form__group">
                <label htmlFor="description" className="form__label">Qualification Description</label>
                <ControlledTextArea
                  rows="5"
                  resize="vertical"
                  fieldId="description"
                  fieldName="description"
                  className="form__input"
                  fieldValue={this.state.description}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-1-of-4 col-offset-1-of-4">
              <button className="btn btn--full btn--color-primary">Save</button>
            </div>
            <div className="col-1-of-4">
              <button id="btn-close-exp-modal" className="btn btn--full" onClick={this.props.closeModal} >Close</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
