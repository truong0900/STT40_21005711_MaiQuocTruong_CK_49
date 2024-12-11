import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const StartScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Gọi API khi component được render
    useEffect(() => {
        axios.get('https://6758e7c760576a194d1231bd.mockapi.io/product')
            .then(response => {
                // Lọc ra các sản phẩm có id là 1 và 2
                const filteredProducts = response.data.filter(product => product.id === '1' || product.id === '2');
                setProducts(filteredProducts);
                setLoading(false); // Dữ liệu đã được tải xong
            })
            .catch(error => {
                console.error(error);
                setLoading(false); // Nếu có lỗi, set loading thành false
            });
    }, []);

    const renderProduct = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Background and Title */}
            <Image source={require('../assets/Data_Sang/background.jpg')} style={styles.backgroundImage} />
            <Text style={styles.titleText}>Renovate your interior</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('ShowScreen')}
            >
                <Text style={styles.buttonText}>Go to catalog</Text>
            </TouchableOpacity>

            {/* Popular Products Section */}
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.popularText}>Popular products</Text>
                    <Text style={styles.viewAllText}>View all</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#00bdd6" />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productList}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    backgroundImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        position: 'absolute',
        top: 117,
        alignSelf: 'center',
        textAlign: 'center',
    },
    button: {
        alignSelf: 'center',
        marginTop: -120,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 3,
        marginBottom: 50,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    popularText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    viewAllText: {
        fontSize: 16,
        color: '#00bdd6',
        fontWeight: 'bold',
    },
    productList: {
        flexDirection: 'row',
    },
    productCard: {
        width: 150,
        marginRight: 15,
        alignItems: 'center',
    },
    productImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});

export default StartScreen;
