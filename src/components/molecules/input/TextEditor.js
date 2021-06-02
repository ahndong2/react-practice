import React from 'react';
import ReactSummernote from 'react-summernote';

const TextEditor = ({ data }) => {
  const { id, name, className, value = '', onChange = () => {} } = data;

  const handleChange = value => {
    onChange(id || name, value);
  };

  return (
    <ReactSummernote
      value={value}
      options={{
        lang: 'ru-RU',
        height: 350,
        dialogsInBody: true,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview']],
        ],
      }}
      onChange={handleChange}
    />
  );
};

export default TextEditor;
