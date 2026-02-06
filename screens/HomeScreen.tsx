import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import type { RootStackParamList, Product } from '../types/index';
import { styles } from '../styles/HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { addToCart, getTotalItems } = useCart();
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleAddToCart = (product: Product): void => {
    addToCart(product);
  };

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <View style={[styles.productCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <View style={styles.productImageContainer}>
        <Text style={styles.productEmoji}>{item.image}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.productDescription, { color: theme.textSecondary }]}>
          {item.description}
        </Text>
        <View style={styles.productFooter}>
          <Text style={[styles.productPrice, { color: theme.primary }]}>
            ${item.price.toFixed(2)}
          </Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.8}
          >
            <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>TechShop</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Premium gadgets & accessories
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          onPress={toggleTheme}
        >
          <Text style={styles.themeIcon}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Go to Cart Button */}
      <TouchableOpacity
        style={[styles.cartButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('Cart')}
        activeOpacity={0.9}
      >
        <Text style={styles.cartIcon}>🛒</Text>
        <Text style={[styles.cartButtonText, { color: theme.buttonText }]}>
          Go to Cart
        </Text>
        {getTotalItems() > 0 && (
          <View style={[styles.badge, { backgroundColor: theme.success }]}>
            <Text style={styles.badgeText}>{getTotalItems()}</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;