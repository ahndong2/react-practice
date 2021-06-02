import React from 'react';
import TextInput from './TextInput';
import CheckboxInput from './CheckboxInput';
import CheckboxGroupInput from './CheckboxGroupInput';
import Radio from './RadioInput';
import RadioGroup from './RadioGroupInput';
import DateInput from './DateInput';
import DateRangeInput from './DateRangeInput';
import DateRangeSingle from './DateRangeSingle';
import EmailInput from './EmailInput';
import FileInput from './FileInput';
import ImgFileInput from './ImgFileInput';
import MultiImgFileInput from './MultiImgFileInput';
import NumberInput from './NumberInput';
import SearchInput from './SearchInput';
import SearchInputWidthButton from './SearchInputWidthButton';
import SelectInput from './SelectInput';
import TimeInput from './TimeInput';
import ToggleInput from './ToggleInput';
import TextArea from './TextArea';
// import TextEditor from './TextEditor';

/**
 * Input Compoent
 * @param {object} props
 * @return {Component} Input Compoent
 */

const Input = props => {
  const { type } = props;

  switch (type) {
    case 'checkbox':
      return <CheckboxInput data={props} />;
    case 'checkboxGroup':
      return <CheckboxGroupInput data={props} />;
    case 'radio':
      return <Radio data={props} />;
    case 'radioGroup':
      return <RadioGroup data={props} />;
    case 'date':
      return <DateInput data={props} />;
    case 'daterange':
      return <DateRangeInput data={props} />;
    case 'daterangeSingle':
      return <DateRangeSingle data={props} />;
    case 'email':
      return <EmailInput data={props} />;
    case 'file':
      return <FileInput data={props} />;
    case 'img':
      return <ImgFileInput data={props} />;
    case 'multiImg':
      return <MultiImgFileInput data={props} />;
    case 'number':
      return <NumberInput data={props} />;
    case 'searchWidthButton':
      return <SearchInputWidthButton data={props} />;
    case 'search':
      return <SearchInput data={props} />;
    case 'select':
      return <SelectInput data={props} />;
    case 'time':
      return <TimeInput data={props} />;
    case 'toggle':
      return <ToggleInput data={props} />;
    case 'textArea':
      return <TextArea data={props} />;
    // case 'textEditor':
    //   return <TextEditor data={props} />;
    default:
      return <TextInput data={props} />;
  }
};

export default Input;
