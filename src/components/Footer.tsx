import { Grid, Link } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import Logo from '../resources/images/logo.svg';
import { FixedContainer } from './Widgets';

const Footer: FunctionComponent<({})> = () => {
    return (
        <footer style={{marginTop:"auto", backgroundColor: '#3f51b5'}}>
            <FixedContainer>
                <div className={'footer-content'}>
                    <Grid container direction="row" alignItems="center" justify="space-between">
                        <Link href="/" className={'logo-web'}>
                            <img alt="" src={Logo} />
                        </Link>
                    </Grid>
                </div>
            </FixedContainer>
        </footer>
    );
}

export default Footer;