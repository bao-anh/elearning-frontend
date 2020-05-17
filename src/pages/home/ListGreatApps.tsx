import { Button, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import Image from '../../components/Image';
import {
  FixedContainer,
  LoadingWidget,
  TitleBlock
} from '../../components/Widgets';
import AppInfo from '../../models/AppInfo';
import { getAllAppInfo } from '../../redux/actions';
import { AppState } from '../../redux/appstate';
import { AppInfoState } from '../../redux/reducers/appInfo';

const ListGreatApps: FunctionComponent<{
  getAllAppInfo: any;
  appInfoState: AppInfoState;
}> = ({ getAllAppInfo = () => {}, appInfoState }) => {
  useEffect(() => {
    getAllAppInfo();
    // eslint-disable-next-line
  }, []);
  if (appInfoState.loading === true || !appInfoState.data) {
    return <LoadingWidget />;
  }
  let appInfos: Array<AppInfo> = Object.values(appInfoState.data);
  return (
    <section className='list-great-apps'>
      <FixedContainer>
        <TitleBlock
          title='Great apps for you'
          description='Practice right now with our free apps!'
        />
        <Grid container alignItems='stretch' spacing={2}>
          {appInfos
            .sort((a: AppInfo, b: AppInfo) =>
              a.appName.localeCompare(b.appName)
            )
            .map((appInfo: AppInfo, index: number) => {
              return (
                <AppInfoItem appInfo={appInfo} key={'AppInfoItem-' + index} />
              );
            })}
        </Grid>
      </FixedContainer>
      <div style={{ width: '100%', height: '100px' }}></div>
    </section>
  );
};

const AppInfoItem: FunctionComponent<{
  appInfo: AppInfo;
}> = ({ appInfo }) => {
  let appName = appInfo.appName ? appInfo.appName : appInfo.title;
  return (
    <Grid item xs={6} sm={4} md={2} className='app-info-item'>
      <Button href={`/about?appNameId=` + appInfo.appNameId} target='_blank'>
        <div>
          <Image src={appInfo.avatar} alt={appName} width='100%' />
        </div>
        <div className='title'>
          <strong>{appName}</strong>
        </div>
        <div className='rating'>
          <Rating size='small' value={4} readOnly />
        </div>
      </Button>
    </Grid>
  );
};
const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    appInfoState: state.appInfoState,
    ...ownProps
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  getAllAppInfo: () => dispatch(getAllAppInfo())
});
export default connect(mapStateToProps, mapDispatchToProps)(ListGreatApps);
