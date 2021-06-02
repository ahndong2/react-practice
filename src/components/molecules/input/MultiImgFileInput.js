// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect } from 'react';
import { API } from 'library/API';
import { HOST_UPLOAD_STORAGE_API } from 'Constans';
import cx from 'classnames';
import styles from './MultiImgFileInput.module.scss';

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

const MultiImgFileInput = ({ data }) => {
  const { id, name, className, url, onChange = () => {} } = data;

  // fileUrl State
  const [fileUrlList, setFileUrlList] = useState(url);
  // upload pending State 방어코드
  const [isPending, setPending] = useState(false);

  // storage 서버에 업로드
  const getTempImageUrl = async (e, file) => {
    const response = await uploadTempFile(file);
    const { result, data } = response.data;

    if (result.code === 1) {
      return data.returnUrl;
    }
    alert(result.message);
  };

  // 파일 읽기
  const fileRead = ({ file }) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = async e => {
        const returnUrl = await getTempImageUrl(e, file);
        resolve(returnUrl);
      };
      reader.readAsDataURL(file);
    });
  };

  // 업로드 될 파일 promiseAll
  const fileMultiUpload = async ({ fileList }) => {
    const urlList = await Promise.all(fileList.map(file => fileRead({ file })));
    return urlList;
  };

  // 파일 선택 되었을시 event
  const handleChange = async e => {
    const { files } = e.target;
    const fileList = [...files];

    if (!fileList.length) {
      setPending(false);
      return;
    }

    setPending(true);
    const returnUrls = await fileMultiUpload({ fileList });

    if (returnUrls.length > 0) {
      const newData = [...fileUrlList, ...returnUrls];
      setFileUrlList(newData);
    }
    setPending(false);
  };

  const handleRemove = i => {
    const newData = [...fileUrlList];
    newData.splice(i, 1);
    setFileUrlList(newData);
  };

  // 선택후 미리보기
  const preivew = () => {
    if (fileUrlList.length !== 0) {
      return fileUrlList.map((fileUrl, idx) => {
        const key = `${fileUrl}_${idx}`;
        return (
          <div key={key} className={styles.uploaded}>
            <a href={fileUrl} className={styles.image}>
              <img src={fileUrl} download alt={name} />
            </a>
            <button
              type="button"
              className={`btn-default ${styles.button}`}
              onClick={() => {
                handleRemove(idx);
              }}
            >
              삭제
            </button>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    if (url.length === 0) return;
    setFileUrlList(url);
  }, [url]);

  // 부모에 전달
  useEffect(() => {
    // 무한 루프 방지 내려받은 갯수, 부모에 전달할 갯수 확인
    if (url.length === fileUrlList.length || fileUrlList.length === 0) return;

    onChange(id, fileUrlList);
  }, [fileUrlList]);

  return (
    <div
      className={cx(styles.wrap, {
        [className]: className,
      })}
    >
      {preivew()}
      <label htmlFor={id} className={styles.label}>
        <input type="file" id={id} name={name} onChange={handleChange} disabled={isPending} accept="image/*" multiple />
        <i className="far fa-file-image" />
      </label>
    </div>
  );
};

export default MultiImgFileInput;
