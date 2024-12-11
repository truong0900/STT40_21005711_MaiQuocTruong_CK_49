import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function DetailScreen({ route }) {
  const { product } = route.params;
  const [additionalProducts, setAdditionalProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://6758e7c760576a194d1231bd.mockapi.io/product')
      .then((response) => {
        const filteredProducts = response.data.filter((item) => item.id !== product.id);
        setAdditionalProducts(filteredProducts.slice(0, 2));
      })
      .catch((error) => {
        console.error('Error fetching additional products:', error);
      });
  }, [product.id]);

  const renderAdditionalProduct = ({ item }) => (
    <TouchableOpacity style={styles.additionalProductCard}>
      <Image source={{ uri: item.image }} style={styles.additionalProductImage} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <MaterialIcons name="favorite-border" size={24} color="black" style={styles.icon} />
      </View>

      {/* Main Image Section */}
      <Image source={{ uri: product.image }} style={styles.mainImage} />

      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  icon: {
    padding: 8,
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 4,
    fontWeight: 'bold',
  },
  reviewText: {
    marginLeft: 8,
    color: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalProductsContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  additionalProductsList: {
    flexDirection: 'row',
  },
  additionalProductCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  additionalProductImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
});