import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


let SongForm = props => {
  const { handleSubmit } = props;
  return <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="songName">Song Title</label>
        <Field name="songName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="link">URL</label>
        <Field name="link" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
}



SongForm = reduxForm({
  form: 'song'
})(SongForm);

SongForm = connect(null, {})(SongForm);

export default SongForm;
