import React, { Component } from 'react';
import { Text, View, FlatList, Image } from 'react-native';

export default class MyList extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            data: [],
            current_page: 1,
            error: null,
            hasMore: true
        }
    }

    //iniciate a request to get data
    componentDidMount() { this.getListOfData(); };

    //get more data
    getListOfData = () => {
        if (this.state.loading) { return; }
        this.setState({ loading: true });
        let newData = [];
        newData.push({
            title: "Lorem ipsum", 
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in congue risus, non viverra tellus. Nam faucibus ligula non metus ultrices mollis. Cras dolor purus, hendrerit eu eros quis, dignissim eleifend mi. In tincidunt mi in diam egestas congue ac ut purus. Nulla semper libero vitae blandit vehicula.",
            image: require("../images/img1.webp"),
            id: this.state.data.length
        });
        newData.push({
            title: "Curabitur vulputate", 
            text: "Curabitur vulputate enim in lacus imperdiet, a convallis odio posuere. Nulla id ex et purus sodales rutrum non eu eros. Ut consequat est lacus.",
            image: require("../images/img2.webp"),
            id: this.state.data.length + 1
        });
        newData.push({
            title: "Proin hendrerit", 
            text: "Proin hendrerit nisl id turpis bibendum, sit amet scelerisque augue elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a blandit sapien.",
            image: require("../images/img3.webp"),
            id: this.state.data.length + 2
        });
        setTimeout(() => {
            this.setState({
                hasMore: true,        
                data: [...this.state.data, ...newData],
                loading: false,
                current_page: this.state.current_page + 1
            });
        }, 800)
    }

    //verify if the user is close to the bottom of the list
    isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    }

    //render item list
    renderItemList = ({ item }) => {
        return (
            <View style={{ padding: 10 }} key={item.id.toString()}>
                <Image style={{ height: 200, }} key={item.id.toString()} resizeMode='cover' source={item.image}/>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.title}</Text>        
                <Text style={{ fontSize: 12 }}>{item.text}</Text>
            </View>
        )
    }

    //render component
    render() {
        return (
            <>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItemList}
                    keyExtractor={(item) => item.id.toString()}
                    extraData={this.state.data}
                    onScroll={(event) => {
                        if (this.isCloseToBottom(event.nativeEvent))
                            this.getListOfData();
                    }}
                    showsVerticalScrollIndicator={false}
                    refreshing={this.state.loading}
                    listFooterComponent={() => <Text>Carregando...</Text>}
                    onRefresh={() => {
                        //clear the feed
                        this.setState({
                            loading: false,
                            data: [],
                            current_page: 1,
                            error: null,
                            hasMore: true
                        }, () => this.getListOfData()) //and get the new data
                    }}
                />
            </>
        );
    }

}