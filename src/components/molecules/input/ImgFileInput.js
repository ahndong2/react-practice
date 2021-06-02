import React, { useState, useEffect } from 'react';
import { API } from 'library/API';
import { HOST_UPLOAD_STORAGE_API } from 'Constans';
import cx from 'classnames';
import styles from './ImgFileInput.module.scss';

const uploadTempFile = formData => {
  const method = 'POST';
  const data = new FormData();

  data.append('tempFile', formData);

  const request = {
    method,
    url: `${HOST_UPLOAD_STORAGE_API}/file/upload`,
    data,
  };

  return API(request);
};

/**
 * Preview Img File Input
 * @param {Object} {data}
 * @param {String} {data.id} *필수
 * @param {String} {data.name}
 * @param {String} {data.className}
 * @param {String} {data.url}
 * @param {function} {data.onChange} *필수
 * @return {(id, returnUrl)}
 * @example
 */

const ImgFileInput = ({ data }) => {
  const { id, name, className, url, onChange = () => {} } = data;

  const [fileUrl, setFileUrl] = useState(url);

  const getTempImageUrl = async (e, file) => {
    const response = await uploadTempFile(file);
    const { result, data } = response.data;

    if (result.code === 1) {
      setFileUrl(data.returnUrl);
    } else {
      alert(result.message);
    }
  };

  const handleChange = e => {
    const { files } = e.target;
    const path = Array.prototype.slice.call(files);
    const file = path[0];
    const { type } = file;

    if (!type.match('image.*')) {
      e.target.value = '';
      alert('이미지 파일만 가능합니다.');
      return false;
    }

    const reader = new FileReader();

    reader.onload = e => getTempImageUrl(e, file);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setFileUrl('');
  };

  useEffect(() => {
    setFileUrl(url);
  }, [url]);

  useEffect(() => {
    onChange(id, fileUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl]);

  return (
    <div
      className={cx(styles.wrap, {
        [styles.uploaded]: fileUrl,
        [className]: className,
      })}
    >
      {fileUrl ? (
        <>
          <a href={fileUrl} className={styles.image}>
            <img src={fileUrl} download alt={name} />
          </a>
          <button type="button" className={`btn-default ${styles.button}`} onClick={handleRemove}>
            삭제
          </button>
        </>
      ) : (
        <label htmlFor={id} className={styles.label}>
          <input type="file" id={id} name={name} onChange={handleChange} />
          <i className="far fa-file-image" />
        </label>
      )}
    </div>
  );
};

export default ImgFileInput;
