import React, { Component } from 'react';
import { Script } from '../../models/script';

const TextInput = ({ name, label, onChange }) => (
  <div className="formInput">
    <label className="textInputLabel" htmlFor={name}>{label}</label>
    <input className="textInput" name={name} type="text" onChange={onChange} />
  </div>
);

const TextArea = ({ name, label, onChange }) => (
  <div className="formInput">
    <label className="textInputLabel" htmlFor={name}>{label}</label>
    <textarea className="textArea" name={name} type="text" onChange={onChange} />
  </div>
);

export default class ScriptForm extends Component {
  state = {
    title: "",
    description: "",
    function: "",
    validation: {}
  };

  onInput = e => {
    const name = e.target.name;
    const value = e.target.value.trim();

    console.log(name, value);

    this.setState({ [name]: value });
  };

  submitScript = e => {
    e.preventDefault();

    const { title, name, value } = this.state;
    const validation = Script.validateScript({ title, name, value });

    // this.props.addScript(script);
  };

  render() {
    return (
      <form name="inputForm" onSubmit={this.submitScript}>
        <TextInput name="title" label="Title" onChange={this.onInput}/>
        <TextInput name="description" label="Description" onChange={this.onInput}/>
        <TextArea name="function" label="Function" onChange={this.onInput} />

        <div className="actions">
          <div class="buttonGroup">
            <button className="button" type="submit">Submit</button>
            <button className="button">Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}
