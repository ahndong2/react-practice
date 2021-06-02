import { createAction, handleActions } from 'redux-actions';

const SET_SPINNER = 'spinner/SET_SPINNER';

// createAction 으로 액션 생성함수 정의
export const setSpinner = createAction(SET_SPINNER, show => show);

// **** 초기 상태 정의
const initialState = {
  show: false,
};

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [SET_SPINNER]: (state, action) => ({
      show: action.payload,
    }),
  },
  initialState,
);
