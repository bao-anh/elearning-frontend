import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import {
  convertRadioChartData,
  convertBarChartData,
  convertPieChartData,
  mergeElementOfArray,
} from '../../utils';
import * as operationAction from '../../redux/actions/operation';
import * as toeicAction from '../../redux/actions/toeic';
import HeaderPanel from '../../components/common/HeaderPanel';
import CustomRadarChart from '../../components/home/CustomRadarChart';
import CustomBarChart from '../../components/home/CustomBarChart';
import CustomPieChart from '../../components/home/CustomPieChart';
import Loading from '../../components/common/Loading';
import SnackBar from '../../components/common/SnackBar';
import ProgressPanel from '../../components/toiec/ProgressPanel';
import '../../resources/scss/home.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const HomePage: FunctionComponent<{
  fetchDataInHomePage: Function;
  submitToeicScore: Function;
  updateToeicScore: Function;
  authState: any;
  toeicState: any;
  setState: any;
  match: any;
}> = ({
  fetchDataInHomePage,
  submitToeicScore,
  updateToeicScore,
  authState,
  toeicState,
  setState,
  match,
}) => {
  useEffect(() => {
    fetchDataInHomePage(onError);
    //eslint-disable-next-line
  }, [match]);

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  const onError = (data: any) => {
    let message = '';
    if (data.errors) {
      data.errors.forEach((error: any) => {
        message += `${error.msg}. `;
      });
    } else message += data.msg;
    setSnackBar({
      isOpen: true,
      severity: 'error',
      message,
    });
  };

  const renderSnackBar = () => {
    if (snackBar.isOpen) {
      return <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />;
    } else return null;
  };

  return (
    <React.Fragment>
      {renderSnackBar()}
      <Grid container className='container'>
        <Grid item xs={8}>
          <HeaderPanel title='Tiến độ luyện tập'>
            <ProgressPanel
              submitToeicScore={submitToeicScore}
              updateToeicScore={updateToeicScore}
              authState={authState}
              toeicState={toeicState}
              onError={onError}
            />
          </HeaderPanel>
          <HeaderPanel title='Số lượng bài thi đã làm gần đây'>
            {authState.isLoading ? (
              <Loading />
            ) : (
              <CustomBarChart
                data={convertBarChartData(authState.participantIds, 'testId')}
                color='#82ca9d'
                name='Số lượng bài thi'
              />
            )}
          </HeaderPanel>
          <HeaderPanel title='Số lượng bài tập đã làm gần đây'>
            {authState.isLoading ? (
              <Loading />
            ) : (
              <CustomBarChart
                data={convertBarChartData(
                  authState.participantIds,
                  'assignmentId'
                )}
                color='#ffe57f'
                name='Số lượng bài tập'
              />
            )}
          </HeaderPanel>
        </Grid>
        <Grid item xs={4}>
          <HeaderPanel title='Tỷ lệ làm đúng các bài thi TOEIC'>
            {authState.isLoading || toeicState.isLoading ? (
              <Loading />
            ) : authState.toeicId ? (
              <CustomRadarChart
                data={convertRadioChartData(toeicState.data.partIds)}
                name={authState.name}
              />
            ) : (
              <h3>Bạn chưa có điểm mục tiêu</h3>
            )}
          </HeaderPanel>
          <HeaderPanel title='Tỷ lệ học thuộc tất cả các từ vựng'>
            {authState.isLoading ? (
              <Loading />
            ) : authState.setIds.length ? (
              <CustomPieChart
                data={convertPieChartData(
                  mergeElementOfArray(authState.setIds, 'termIds')
                )}
                height={350}
                outerRadius={100}
                isAnimationActive={false}
              />
            ) : (
              <div>Bạn chưa có học phần nào</div>
            )}
          </HeaderPanel>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    toeicState: state.toeicState,
    setState: state.setState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInHomePage: (onError: any) =>
    dispatch(operationAction.fetchDataInHomePage(onError)),
  submitToeicScore: (targetScore: any, currentScore: any, onError: any) =>
    dispatch(toeicAction.submitToeicScore(targetScore, currentScore, onError)),
  updateToeicScore: (targetScore: any, onError: any) =>
    dispatch(toeicAction.updateToeicScore(targetScore, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
