import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget, FixedContainer } from '../../components/Widgets';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';
const HomePage = () => {
    return (
        <MainWidget className={'about-page'}>
            <Header />
            <FixedContainer>
                <h1>About</h1>
            </FixedContainer>
            <Footer />
        </MainWidget>
    );
}

export default HomePage;
