import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget } from '../../components/Widgets';
import '../../resources/scss/home.scss';
import '../../resources/scss/main.scss';
import ListGreatApps from './ListGreatApps';

const HomePage = () => {
    return (
        <MainWidget className={'home-page'}>
            <Header />
            <ListGreatApps />
            <Footer />
        </MainWidget>
    );
}

export default HomePage;
