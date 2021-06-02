import React, { useState } from 'react';
import { DefaultLayout } from 'components/templates';
import { SearchForm, Modal, Tab, TabPanel } from 'components/organisms';
import { Input } from 'components/molecules';

const SampleContainer = () => {
  const [show, setShow] = useState(false);

  return (
    <DefaultLayout path={[{ name: 'Sample' }]}>
      {/* 참고 디자인 */}
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 참고 디자인
          </h2>
        </div>
        <div className="body-panel" style={{ paddingBottom: '10px' }}>
          <a
            href="http://demo.interface.club/limitless/demo/Template/layout_1/LTR/default/full/index.html"
            className="txt-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            링크
          </a>
        </div>
      </div>

      {/* 텍스트 */}
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 텍스트
          </h2>
        </div>
        <div className="body-panel" style={{ paddingBottom: '10px' }}>
          <div className="row">
            <div className="col-12">
              <span className="txt-muted">muted</span> <span className="txt-red">red</span>{' '}
              <span className="txt-teal">teal</span> <span className="txt-blue">blue</span>{' '}
              <span className="txt-green">green</span>
            </div>
          </div>
        </div>
      </div>

      {/* 배지 */}
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 배지
          </h2>
        </div>
        <div className="body-panel" style={{ paddingBottom: '10px' }}>
          <span className="badge-default">default</span> <span className="badge-red">red</span>{' '}
          <span className="badge-teal">teal</span> <span className="badge-blue">blue</span>{' '}
          <span className="badge-green">green</span> <span className="badge-orange">orange</span>{' '}
          <span className="badge-brown">brown</span> <span className="badge-slate">slate</span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 버튼
          </h2>
        </div>
        <div className="body-panel" style={{ paddingBottom: '10px' }}>
          <div className="row">
            <div className="col-6">
              <button type="button" className="btn-default">
                default
              </button>{' '}
              <button type="button" className="btn-red">
                red
              </button>{' '}
              <button type="button" className="btn-teal">
                teal
              </button>{' '}
              <button type="button" className="btn-blue">
                blue
              </button>{' '}
              <button type="button" className="btn-green">
                green
              </button>{' '}
              <button type="button" className="btn-orange">
                orange
              </button>{' '}
              <button type="button" className="btn-brown">
                brown
              </button>{' '}
              <button type="button" className="btn-slate">
                slate
              </button>
            </div>
            <div className="col-6">
              <button type="button" className="btn-default" disabled>
                disabled
              </button>{' '}
              <button type="button" className="btn-red" disabled>
                disabled
              </button>{' '}
              <button type="button" className="btn-teal" disabled>
                disabled
              </button>{' '}
              <button type="button" className="btn-blue" disabled>
                disabled
              </button>{' '}
              <button type="button" className="btn-green" disabled>
                disabled
              </button>{' '}
              <button type="button" className="btn-orange" disabled>
                disabled
              </button>{' '}
              <button type="button" className="btn-brown" disabled>
                disabled
              </button>{' '}
              <button type="button" className="btn-slate" disabled>
                disabled
              </button>{' '}
            </div>
          </div>
          <div className="dash" style={{ marginTop: '10px' }} />
          <div className="row">
            <div className="col-12">
              <div className="btn-group">
                <button type="button" className="btn-default">
                  default
                </button>
                <button type="button" className="btn-red">
                  red
                </button>
                <button type="button" className="btn-teal">
                  teal
                </button>
                <button type="button" className="btn-blue">
                  blue
                </button>
                <button type="button" className="btn-green">
                  green
                </button>
                <button type="button" className="btn-orange">
                  orange
                </button>
                <button type="button" className="btn-brown">
                  brown
                </button>
                <button type="button" className="btn-slate">
                  slate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 폼 요소 */}
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 폼 요소
          </h2>
        </div>
        <div className="body-panel">
          <form onSubmit={e => e.preventDefault()}>
            <fieldset>
              <legend>폼 제목</legend>
              <div className="head-form">
                <h3 className="tit-form">제목</h3>
                <div className="tool-form">
                  <button type="button" className="btn-slate">
                    버튼
                  </button>
                </div>
              </div>
              <div className="dash" />

              {/* Input */}
              <div className="row">
                <div className="col-2">
                  <label htmlFor="text" className="lab-comm">
                    Text Label
                    <span className="txt-blue">*</span>
                  </label>
                </div>
                <div className="col-10">
                  <Input type="text" id="text" placeholder="Text Input" />
                  <Input type="text" title="ReadOnly" placeholder="ReadOnly" readOnly />
                  <Input type="text" title="Disabled" placeholder="Disabled" disabled />
                  <Input type="text" className="error" title="error" placeholder="에러" />
                  <p className="txt-error">*에러</p>
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <label htmlFor="textarea">Textarea Label</label>
                </div>
                <div className="col-10">
                  <textarea id="textarea" rows="4" cols="50" />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <label htmlFor="emailInput">Email Label</label>
                </div>
                <div className="col-10">
                  <Input type="email" id="emailInput" placeholder="Email Input" />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <label htmlFor="fileInput">File Uploader</label>
                </div>
                <div className="col-10">
                  <Input type="file" id="fileInput" placeholder="파일을 선택해 주세요." />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <label htmlFor="imgFileInput">Image File Uploader</label>
                </div>
                <div className="col-10">
                  <Input type="img" id="imgFileInput" />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <label htmlFor="select" className="lab-comm">
                    Select Label
                  </label>
                </div>
                <div className="col-10">
                  <Input
                    type="select"
                    id="select"
                    value="0"
                    options={[
                      { label: '옵션', value: '0' },
                      { label: '옵션', value: '1' },
                      { label: '옵션', value: '2' },
                    ]}
                  />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <label htmlFor="multiple" className="lab-comm">
                    Multiple Select Label
                  </label>
                </div>
                <div className="col-10">
                  <Input
                    type="select"
                    id="multiple"
                    value={['0', '2']}
                    multiple
                    options={[
                      { label: '옵션', value: '0' },
                      { label: '옵션', value: '1' },
                      { label: '옵션', value: '2' },
                      { label: '옵션', value: '3' },
                    ]}
                  />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <strong className="lab-comm">Input Group</strong>
                </div>
                <div className="col-10">
                  <div className="row">
                    <div className="col-6">
                      <div className="inp-group">
                        <button type="button" className="btn-slate">
                          버튼
                        </button>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="inp-group">
                        <Input type="text" />
                        <button type="button" className="btn-slate">
                          버튼
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="inp-group">
                        <span className="txt-inp">prepend</span>
                        <Input type="text" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="inp-group">
                        <Input type="text" />
                        <span className="txt-inp">append</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dash" />

              {/* Checkbox */}
              <div className="row">
                <div className="col-2">
                  <strong className="lab-comm">Checkbox</strong>
                </div>
                <div className="col-5">
                  <Input
                    type="checkbox"
                    options={[
                      { label: '미선택', value: '미선택' },
                      { label: '선택', value: '선택', checked: true },
                      { label: '선택 불가', value: '선택 불가', disabled: true },
                    ]}
                  />
                </div>
                <div className="col-5">
                  <Input
                    type="checkbox"
                    align="vertical"
                    options={[
                      { label: '미선택', value: '미선택' },
                      { label: '선택', value: '선택', checked: true },
                      { label: '선택 불가', value: '선택 불가', disabled: true },
                    ]}
                  />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <strong className="lab-comm">Radio</strong>
                </div>
                <div className="col-5">
                  <Input
                    type="radio"
                    name="radio"
                    value="선택"
                    options={[
                      { label: '미선택', value: '미선택' },
                      { label: '선택', value: '선택' },
                      { label: '선택 불가', value: '선택 불가', disabled: true },
                    ]}
                  />
                </div>
                <div className="col-5">
                  <Input
                    type="radio"
                    name="vertical"
                    value="ALL"
                    align="vertical"
                    options={[
                      { label: '전체', value: 'ALL' },
                      { label: '노출', value: '1' },
                      { label: '미노출', value: '0' },
                    ]}
                  />
                </div>
              </div>
              <div className="dash" />
              <div className="row">
                <div className="col-2">
                  <strong className="lab-comm">DatePicker</strong>
                </div>
                <div className="col-10">
                  <Input type="date" id="date" name="date" />
                  <Input type="daterangeSingle" name="daterangeSingle" />
                  <Input type="daterange" id="daterange" name="daterange" />
                </div>
              </div>
              <div className="dash" />
              <div className="foot-form">
                <button type="submit" className="btn-slate">
                  버튼
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      {/* 테이블 */}
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 테이블
          </h2>
          <div className="tool-panel">
            <button type="button" className="btn-slate">
              버튼
            </button>
          </div>
        </div>
        <div className="body-panel">
          <div className="tbl-comm">
            <table>
              <thead>
                <tr>
                  <th scope="col">제목</th>
                  <th scope="col">제목</th>
                  <th scope="col">제목</th>
                  <th scope="col">제목</th>
                  <th scope="col">제목</th>
                  <th scope="col">제목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                  <td>내용</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="paging-comm">
            <li className="disabled">
              <span className="link-page">
                <i className="fa fa-angle-double-left" />
                <span className="screen-out">처음</span>
              </span>
            </li>
            <li className="disabled">
              <span className="link-page">
                <i className="fa fa-angle-left" />
                <span className="screen-out">이전</span>
              </span>
            </li>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
              return (
                <li key={i} className={i === 1 ? 'active' : ''}>
                  <button type="button" className="link-page" onClick={e => e.preventDefault()}>
                    {i}
                  </button>
                </li>
              );
            })}
            <li>
              <button type="button" className="link-page" onClick={e => e.preventDefault()}>
                <span className="screen-out">다음</span>
                <i className="fa fa-angle-right" />
              </button>
            </li>
            <li>
              <button type="button" className="link-page" onClick={e => e.preventDefault()}>
                <span className="screen-out">끝</span>
                <i className="fa fa-angle-double-right" />
              </button>
            </li>
          </ul>
        </div>
        <div className="foot-panel">
          <button type="button" className="btn-slate">
            버튼
          </button>
        </div>
      </div>

      {/* 패널 */}
      <div className="row">
        <div className="col-3">
          <div className="panel-comm">
            <div className="head-panel">
              <h2 className="tit-panel">
                <i className="fa fa-info-circle" /> Panel
              </h2>
              <div className="tool-panel">
                <button type="button" className="btn-slate">
                  Tool
                </button>
              </div>
            </div>
            <div className="body-panel">
              <div className="box-comm" style={{ height: 226 }}>
                Box
              </div>
            </div>
            <div className="foot-panel">
              <button type="button" className="btn-slate">
                Foot
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="col-3">
          <SearchForm
            searchInfo={[
              {
                type: 'radioGroup',
                title: '노출 상태',
                id: 'isDisplay',
                name: 'isDisplay',
                value: 'ALL',
                options: [
                  { label: '전체', value: 'ALL' },
                  { label: '노출', value: '1' },
                  { label: '미노출', value: '0' },
                ],
              },
              {
                type: 'select',
                title: '키워드',
                id: 'keyword',
                value: '0',
                options: [
                  { label: '옵션', value: '0' },
                  { label: '옵션', value: '1' },
                  { label: '옵션', value: '2' },
                ],
                dash: true,
              },
              {
                type: 'search',
                id: 'search',
              },
            ]}
          />
        </div>

        <div className="col-6">
          {/* Tab */}
          <Tab defaultSelected="tab1">
            <button key="tool" className="btn-slate">
              버튼
            </button>
            <TabPanel key="tab" id="tab1" label="Tab1">
              <div className="head-panel">
                <strong className="tit-panel">
                  <i className="fa fa-info-circle" /> Active
                </strong>
              </div>
              <div className="body-panel">
                <p style={{ height: 145, marginBottom: 10 }}>
                  주소를 변경하려면 href 속성을 추가한다.
                  <br />
                  &lt;TabPanel key="tab" href="변경할 주소" id="tabID" label="tabName" /&gt;
                </p>
              </div>
            </TabPanel>
            <TabPanel key="tab" id="tab2" label="Tab2">
              <div className="body-panel">
                <p style={{ height: 187, marginBottom: 10, whiteSpace: 'pre-wrap' }}>Tab2</p>
              </div>
            </TabPanel>
            <TabPanel key="tab" id="tab3" label="Tab3">
              <div className="body-panel">
                <p style={{ height: 187, marginBottom: 10, whiteSpace: 'pre-wrap' }}>Tab3</p>
              </div>
            </TabPanel>
          </Tab>
          <div className="panel-comm">
            <div className="head-panel">
              <h2 className="tit-panel">
                <i className="fa fa-search" /> Modal
              </h2>
            </div>
            <div className="body-panel" style={{ paddingBottom: '10px' }}>
              <button type="button" className="btn-slate" onClick={e => setShow(true)}>
                모달 열기
              </button>
              <Modal title="제목" show={show}>
                <div className="tbl-comm">내용</div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SampleContainer;
