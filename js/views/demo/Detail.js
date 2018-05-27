import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import {Button, Card, CardItem, Container, Content, Text} from 'native-base';

import {createAction, NavigationActions} from '../../utils/index'

@connect(({detail}) => ({...detail}))
class Detail extends Component {
    static navigationOptions = {
        title: 'Detail',
    };

    incrementFn = () => {
        this.props.dispatch(createAction('detail/increment')({count: this.props.count}))
    };

    decrementFn = () => {
        this.props.dispatch(createAction('detail/decrement')({count: this.props.count}))
    };

    goBack = () => {
        // this.props.dispatch(NavigationActions.back({routeName: 'Account'}))
        this.props.navigation.goBack();
    };

    render() {
        const {count} = this.props;
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{count}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                        <Button onPress={this.incrementFn}>
                            <Text>加</Text>
                        </Button>
                        <Button onPress={this.decrementFn}>
                            <Text>减</Text>
                        </Button>
                        <Button onPress={this.goBack}>
                            <Text>Go Back</Text>
                        </Button>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Detail
