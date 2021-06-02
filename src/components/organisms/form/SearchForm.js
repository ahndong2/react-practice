import React, { useState, useEffect } from 'react';
import { Input } from 'components/molecules';

/**
 * api url 의 문자열과 reqeuestIds 의 값을 매칭하여, 실제 호출할 api url 을 반환
 * @param {Array} [{search}]
 * @param {stirng} search.type : SELETE / FILE / RADIO / CHECKBOX
 * @param {stirng} search.title : 인풋명
 * @param {stirng} search.key : key
 * @param {object} search.options
 * @param {object} search.options.label
 * @param {object} search.options.value
 * @param {function} callback
 * @return {object} 검색 데이터
 * @example
 * import SearchForm from '../../components/organisms/model/SearchForm';
 *  const searchInfo = [
 *     {
 *         type : 'radio',
 *         title : '노출 상태',
 *         name : 'isDisplay1',
 *         id : 'isDisplay1',
 *         value : 'ALL',
 *         options : [{ label : '전체', value : 'ALL'},{ label : '노출', value : '1' },{ label : '미노출', value : '0' },]
 *     },
 *     {
 *         type : 'radioGroup',
 *         title : '노출 상태',
 *         name : 'isDisplay',
 *         id : 'isDisplay',
 *         value : 'ALL',
 *         options : [{ label : '전체', value : 'ALL'},{ label : '노출', value : '1' },{ label : '미노출', value : '0' },]
 *     },
 *     {
 *         type : 'select',
 *         title : '키워드',
 *         id : 'keyword',
 *         options : [{ label : '이름', value : '' },]
 *     },
 *     {
 *         type : 'checkbox',
 *         title : 'checkbox',
 *         id : 'checkbox',
 *         value : 'ALL',
 *         options : [{label : '전체', value: '0', checked:true},{label : '선택', value: '1'},{label : '미선택', value: '-1',checked:true},{label : '테스트', value: '2'}]
 *     },
 *     {
 *         type : 'checkboxGroup',
 *         title : 'checkboxGroup',
 *         id : 'checkboxGroup',
 *         value : 'ALL',
 *         options : [{label : '전체', value: '0', checked:true},{label : '선택', value: '1'},{label : '미선택', value: '-1',checked:true},{label : '테스트', value: '2'}]
 *     },
 *     {
 *         type : 'search',
 *         title : '',
 *         id : 'name'
 *     }
 * ];
 *
 * <SearchForm searchInfo={searchInfo} onSubmit={onSearch.bind(this)}/>
 */

const SearchForm = props => {
  const { title, searchInfo, onChange, onSubmit, hideSearchButton = true } = props;
  const [state, setState] = useState(searchInfo);
  const [searchParam, setSearchParam] = useState({});

  const handleChange = (e, id, value) => {
    const key = id || e.target.id;
    const val = value || e.target.value;

    setState(state.map(info => (info.id === key ? { ...info, value: val } : info)));
    setSearchParam({ ...searchParam, [key]: val });
  };

  const handleChangeDate = (id, value) => {
    setState(state.map(info => (info.id === id ? { ...info, value } : info)));
    setSearchParam({ ...searchParam, [id]: value });
  };

  useEffect(() => {
    setState(searchInfo);
  }, [searchInfo]);

  useEffect(() => {
    onChange(searchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  // 그려질 Search From Input List
  const inputList = state.map(info => {
    const { type } = info;

    if (type === 'select') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <label htmlFor={info.id} className="tit-form">
                {info.title}
              </label>
            </div>
          )}
          <Input
            type="select"
            id={info.id}
            name={info.name}
            value={info.value}
            onChange={handleChange}
            options={info.options}
            disabled={info.disabled}
          />
        </React.Fragment>
      );
    }

    if (type === 'checkbox') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <strong className="tit-form">{info.title}</strong>
            </div>
          )}
          <Input
            type="checkbox"
            id={info.id}
            name={info.name}
            checked={info.checked}
            onChange={handleChange}
            options={info.options}
          />
        </React.Fragment>
      );
    }

    if (type === 'checkboxGroup') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <strong className="tit-form">{info.title}</strong>
            </div>
          )}
          <Input
            type="checkboxGroup"
            id={info.id}
            name={info.name}
            value={info.value}
            onChange={handleChange}
            options={info.options}
          />
        </React.Fragment>
      );
    }

    if (type === 'radio') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <strong className="tit-form">{info.title}</strong>
            </div>
          )}
          <Input
            type="radio"
            id={info.id}
            name={info.name}
            value={info.value}
            onChange={handleChange}
            options={info.options}
          />
        </React.Fragment>
      );
    }

    if (type === 'radioGroup') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <strong className="tit-form">{info.title}</strong>
            </div>
          )}
          <Input
            type="radioGroup"
            id={info.id}
            name={info.name}
            value={info.value}
            onChange={handleChange}
            options={info.options}
          />
        </React.Fragment>
      );
    }

    if (type === 'date') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <label htmlFor={info.id} className="tit-form">
                {info.title}
              </label>
            </div>
          )}
          <Input
            type="date"
            id={info.id}
            name={info.name}
            placeHolder={info.placeHolder}
            format={info.format}
            disabled={info.disabled}
            onChange={handleChangeDate}
          />
        </React.Fragment>
      );
    }

    if (type === 'daterange') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <label htmlFor={info.id} className="tit-form">
                {info.title}
              </label>
            </div>
          )}
          <Input
            type="daterange"
            id={info.id}
            name={info.name}
            value={info.value}
            selectDate={info.selectDate}
            startDate={info.startDate}
            endDate={info.endDate}
            format={info.format}
            disabled={info.disabled}
            options={info.options}
            onChange={handleChangeDate}
          />
        </React.Fragment>
      );
    }

    if (type === 'textarea') {
      return (
        <React.Fragment key={info.id || info.name}>
          {info.dash && <div className="dash" />}
          {info.title && (
            <div className="head-form">
              <label htmlFor={info.id} className="tit-form">
                {info.title}
              </label>
            </div>
          )}
          <Input type="textarea" id={info.id} name={info.name} value={info.value} onChange={handleChangeDate} />
        </React.Fragment>
      );
    }
    // 파일, 컴포넌트 필요

    return (
      <React.Fragment key={info.id || info.name}>
        {info.dash && <div className="dash" />}
        {info.title && (
          <div className="head-form">
            <label htmlFor={info.id} className="tit-form">
              {info.title}
            </label>
          </div>
        )}
        <Input type={type} id={info.id} name={info.name} value={info.value} onChange={handleChange} />
      </React.Fragment>
    );
  });

  // useEffect(() => {
  //   setState(searchInfo);
  // }, [searchInfo]);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <fieldset>
        <legend>Search</legend>
        <div className="panel-comm">
          <div className="head-panel">
            <h2 className="tit-panel">
              <i className="fa fa-search" /> {title}
            </h2>
          </div>
          <div className="body-panel">{inputList}</div>
          {hideSearchButton && (
            <div className="foot-panel">
              <button type="submit" className="btn-slate" onClick={e => onSubmit(searchParam)}>
                검색
              </button>
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
};

SearchForm.defaultProps = {
  title: 'SEARCH',
  searchInfo: [],
  onChange: () => {},
  onSubmit: () => {},
};

export default SearchForm;
