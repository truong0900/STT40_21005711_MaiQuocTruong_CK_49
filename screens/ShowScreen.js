import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ShowScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Chairs');
  const categories = ['Sofas', 'Chairs', 'Tables', 'Kitchen'];
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://6758e7c760576a194d1231bd.mockapi.io/product')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Bỏ lọc theo category để hiển thị tất cả sản phẩm
  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      style={
        selectedCategory === category
          ? styles.selectedCategory
          : styles.category
      }
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={
          selectedCategory === category
            ? styles.selectedCategoryText
            : styles.categoryText
        }
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('DetailScreen', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover products</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => renderCategory(category))}
      </View>
      <FlatList
        data={products} // Sử dụng trực tiếp 'products' thay vì 'filteredProducts'
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />

        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/Data_Sang/home.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/Data_Sang/search.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Search</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/Data_Sang/heart.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Favorite</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
                <Image source={require('../assets/Data_Sang/profile.png')} style={styles.navicon}/>
                <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  category: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productList: {
    paddingBottom: 16,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navicon: {
    width: 24,
    height: 24,
  },
  navLabel: {
    fontSize: 12,
    color: '#555',
  },
});

export default ShowScreen;
