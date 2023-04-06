// *******************
// treba da se proveri ako se rucno unese id koji ne postoji 
// da pokaze gresku, ovo isto vazi i za single feedback stranu
import { useState } from 'react';
import AddEditAction from './AddEditAction';
import CustomSelect from '../CustomSelect';
import useValidate from '../../hooks/useValidate';
import { contstant, icons } from '../../constants';

const AddEditBody = ({feedbackId, feedbacks}) => {
  const initData = {
    title: {value: '', error: false},
    category: {value: '', error: false},
    detail: {value: '', error: false}
  };
  const {inputData, handleDataValue, validateData} = useValidate(feedbackId ? {...initData, status: {value: '', error: false}} : initData);
  const categoryOptions = contstant.categories.map(category => category.label).filter(category => category !== 'All');
  const currentFeedback = feedbackId ? feedbacks.find(feedback => feedback.id === parseInt(feedbackId)) : null;

  // ovo za rucno uneti feedback ces se pozivati na proveru "currentFeedback"
  // a za to da li je add ili edit proveravacse prop "feedbackId"

  // ** sto se tice dobijanja vresnosti za custom selecte, to mozes
  // da prosledis actionoption u custom select i da dobijes nazad
  // value kojie ces da prosledis handleDataValue, a kod njega smo namestili da
  // moze da prihvati value isto tako stavi i za name propery

  return (
    <div className="container-body">
      <img src={feedbackId ? icons.iconEditFeedback : icons.iconNewFeedback} alt="add edit feedback" />
      <h2>{feedbackId ? `Edit '${currentFeedback.title}'` : 'Create New Feedback'}</h2>
      <form>
        <div className="form-group">
          <h4>Feedback Title</h4>
          <p>Add a short, descriptive headline</p>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <h4>Category</h4>
          <p>Choose a category for your feedback</p>
          <CustomSelect 
            options={categoryOptions}
            currentOption={categoryOptions[0]}
          />
        </div>
        <div className="form-group">
          <h4>Feedback Detail</h4>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <textarea className="form-control"></textarea>
        </div>
        <AddEditAction />
      </form>
    </div>
  )
}

export default AddEditBody;