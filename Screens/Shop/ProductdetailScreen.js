import React from 'react'
import {View,Text,Image,StyleSheet,Button,ScrollView} from 'react-native'
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../../constants/Colors'
import * as CartActions from '../../Store/actions/cart'

function ProductdetailScreen({navigation}) {
    const productId = navigation.getParam('productId')
    const selectedproduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId))
    const dispatch = useDispatch()
    return (
        <ScrollView>
            <Image source={{uri: selectedproduct.ImageUrl}} style={styles.image}  />
            <View style={styles.button}>
            <Button color={Colors.primary} title="Add to Cart" onPress={()=>{
                dispatch(CartActions.add_to_cart(selectedproduct))
            }}/>
            </View>
            <Text style={styles.price}>${selectedproduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedproduct.description}</Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:15,
        fontFamily:'open-sans-bold'
    },
    description:{
        fontFamily:'open-sans',
        fontSize:14,
        textAlign:'center',
        marginHorizontal:15
    },
    button:{
        marginVertical:10,
        alignItems: 'center',

    }
})

ProductdetailScreen.navigationOptions = (navdata) => {
    return{
        headerTitle: navdata.navigation.getParam('ProductTitle')
    }
}

export default ProductdetailScreen
