// HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
  Image,
} from 'react-native';
import { useTheme } from './ThemeContext';
import { useCart } from './CartContext';
import { Product } from './types';
import { Ionicons } from '@expo/vector-icons';

const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Wireless Headphones', 
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  { 
    id: '2', 
    name: 'Smart Watch', 
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
  },
  { 
    id: '3', 
    name: 'Laptop Stand', 
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
  },
  { 
    id: '4', 
    name: 'USB-C Hub', 
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop'
  },
  { 
    id: '5', 
    name: 'Mechanical Keyboard', 
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop'
  },
  { 
    id: '6', 
    name: 'Wireless Mouse', 
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop'
  },
  { 
    id: '7', 
    name: 'Phone Case', 
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop'
  },
  { 
    id: '8', 
    name: 'Screen Protector', 
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop'
  },
];

export const HomeScreen: React.FC = () => {
  const { theme, colors, toggleTheme } = useTheme();
  const { cart, addToCart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      {/* Product Image */}
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.productPrice, { color: colors.primary }]}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => addToCart(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Shop
        </Text>
        
        <View style={styles.headerRight}>
          {/* Theme Toggle */}
          <View style={styles.themeToggle}>
            <Ionicons 
              name={theme === 'light' ? 'sunny' : 'moon'} 
              size={20} 
              color={colors.text} 
            />
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={theme === 'dark' ? colors.secondary : '#f4f3f4'}
            />
          </View>

          {/* Cart Icon with Badge */}
          <TouchableOpacity style={styles.cartIcon} activeOpacity={0.7}>
            <Ionicons name="cart-outline" size={28} color={colors.text} />
            {totalItems > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Products List */}
      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
    elevation: 2,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});