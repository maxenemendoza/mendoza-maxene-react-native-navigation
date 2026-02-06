import React from 'react';
import {
  View,
  Text,
  StyleSheet,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  themeToggle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  themeIcon: {
    fontSize: 24,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  productCard: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImageContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  productEmoji: {
    fontSize: 72,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  cartButton: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  cartIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  cartButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default HomeScreen;