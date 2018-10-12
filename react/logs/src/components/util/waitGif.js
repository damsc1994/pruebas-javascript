import React, {Component} from 'react';

import { Image, Row, Grid, Col }  from 'react-bootstrap';

class WaitGif extends Component {
    render () {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src="/../../static/image/gym.jpg" circle/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default WaitGif;