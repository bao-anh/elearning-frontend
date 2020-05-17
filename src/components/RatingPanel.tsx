import { Box, Button, Fab, Grid, TextareaAutosize } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import React, { FunctionComponent, useState } from 'react';

export const RatingWidget: FunctionComponent<({ 
    values: Array<number>, 
    className: string, 
    size: number 
    })> = ({ 
    values = [],
    className = '',
    size = '',
    }) => {
    size = size ? size : "medium";
    let total = 0;
    let value = 0;
    values.forEach((item, index) => {
        if (index > 0) {
            value += item * index;
            total += item;
        }
    });
    if (value > 0 && total > 0) {
        value = Math.round((value / total) * 10) / 10;
    }
    return (
        <div className={className}>
            <Grid
                className="star-panel"
                container
                direction="row"
                alignItems="center"
            >
                <Rating name="half-rating" max={5} precision={0.5} value={value} readOnly size="small" />
                <div>{value}</div>
            </Grid>
            <div className="total-ratings">
                ({total} ratings)
            </div>
        </div>
    );
}

export const RatingPanel: FunctionComponent<({ 
    values: Array<number>, onWriteReview: any 
    })> = ({
    values = [],
    onWriteReview = () => {}
    }) => {
    let total = 0;
    let value = 0;
    values.forEach((item, index) => {
        if (index > 0) {
            value += item * index;
            total += item;
        }
    });
    if (value > 0 && total > 0) {
        value = Math.round((value / total) * 10) / 10;
    }
    let listCenter = [];
    let listRight = [];
    for (let number = 1; number < 6; number++) {
        let element = values[number] ? values[number] : 0;
        let percent = total > 0 ? (element / total) * 100 : 0;
        listCenter.push(<Box key={'rate-center-item-' + number} className={'rate-item-center'}><div className={'rate-value'} style={{ width: percent + "%" }}></div></Box>);
        listRight.push(
            <Grid
                key={'rate-right-item-' + number}
                className={"rate-item-right"}
                container
                direction="row"
                alignItems="center"
            >
                <Rating name="half-rating" max={5} precision={1} value={value} readOnly />
                <div>{(Math.round(percent * 10) / 10)}%</div>
            </Grid>
        );
    }

    const [writeReview, setWriteReview] = useState(false);
    const [rateValue, setRateValue] = useState(0);

    return (
        <Grid
            container
            direction="column"
            alignItems="flex-end"
        >
            <Button variant="contained" color="primary" onClick={() => {
                setWriteReview(!writeReview);
            }}>Write Review</Button>
            <Grid
                className={"rating-panel"}
                container
                direction="row"
                alignItems="center"
            >
                <div className={'first-info'}>
                    <h1>{value}</h1>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                    >
                        <Rating name="half-rating" max={5} precision={0.5} value={value} readOnly />
                        <div>{value}</div>
                    </Grid>
                </div>
                <div className={'second-info'}>
                    {listCenter.reverse()}
                </div>
                <div className={'three-info'}>
                    {listRight.reverse()}
                </div>
            </Grid>
            <Box component='div' style={{ display: writeReview ? 'block' : 'none', width: '100%', border: '1px solid #ddd', padding: '10px' }}>
                <Rating name="half-rating" max={5} precision={0.5} value={rateValue} onChange={(event: any) => {
                    setRateValue(parseInt(event.target.value));
                }} />
                <TextAreaWidget onChange={(content: string) => {
                    if (!rateValue || rateValue < 1) {
                        window.alert('what the hell? rateValue = ' + rateValue);
                        return;
                    }
                    onWriteReview(content, rateValue);
                }} />
            </Box>
        </Grid>
    );
}

const TextAreaWidget: FunctionComponent<({ onChange: any })> = ({ onChange }) => {
    const [value, setvalue] = useState("");
    return (
        <Grid
            className={'text-area-widget'}
            container
            direction="row"
        >
            <Box className={'text-area-i-p'}>
                <TextareaAutosize className={'text-area-i'} placeholder="Enter to text..." onChange={(event) => setvalue(event.target.value)}></TextareaAutosize>
            </Box>
            <Fab className={'button-write-review'} color="primary" aria-label="add" onClick={() => {
                onChange(value);
            }}><SendIcon className={'icon'} /></Fab>
        </Grid>
    );
}