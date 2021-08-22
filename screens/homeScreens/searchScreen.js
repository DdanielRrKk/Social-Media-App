import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { AuthContext } from '../../helpers/globals';

import SearchBar from '../../components/misc/searchBar';
import SearchBubble from '../../components/items/searchBubble';

//===================TEST
import { testSearch } from '../../TESTDATA';
//===================TEST



export default function SearchScreen({ navigation }){    
    const { GetUser } = React.useContext(AuthContext);
    const username = GetUser();

    const [searchData, setSearchData] = React.useState(testSearch);
    const [searchValue, setSearchValue] = React.useState('');
    
    const backHandler = () => navigation.goBack();

    const updateSearchValue = (value) =>{
        // algoritym
        setSearchValue(value);
    }

    const openPersonsProfileScreen = (postUsername) => navigation.navigate('PersonsProfileScreen', {username: postUsername});
    const openProfileScreen = () => navigation.navigate('Tabs', {screen: 'ProfileScreen'});

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={backHandler}>
                    <AntDesign 
                        name="left" 
                        size={24} />
                </TouchableOpacity>

                <SearchBar 
                    value={searchValue}
                    changeHandler={updateSearchValue}/>
            </View>

            <FlatList 
                style={styles.list}
                data={searchData}
                renderItem={({item}) => (
                    <SearchBubble 
                        isMainUser={(item.username == username)? true : false}
                        bubble={item} 
                        //openTagHandler={openTagHandler}
                        openPersonsProfileHandler={openPersonsProfileScreen}
                        openProfileHandler={openProfileScreen}/>
                )}
                />
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header:{
        height: 56,
        width: '100%',
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    backButton:{
        marginHorizontal: 10
    },

    searchBar:{
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: 'white'
    },

    list:{
        width: '100%'
    },
});