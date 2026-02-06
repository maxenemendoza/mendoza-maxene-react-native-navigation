import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
  TextInput,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { products } from "../data/products";
import type { RootStackParamList, Product } from "../types/index";
import { styles } from "../styles/HomeScreen.styles";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { addToCart, getTotalItems } = useCart();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (product: Product): void => {
    addToCart(product);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <View
      style={[
        styles.productCard,
        { backgroundColor: theme.cardBackground, borderColor: theme.border },
      ]}
    >
      <View style={styles.productImageContainer}>
        {typeof item.image === "string" ? (
          <Text style={styles.productEmoji}>{item.image}</Text>
        ) : (
          <Image
            source={item.image}
            style={styles.productImage}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text
          style={[styles.productDescription, { color: theme.textSecondary }]}
        >
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
            <Text style={[styles.addButtonText, { color: theme.buttonText }]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
        translucent={false}
      />

      {/* Android Status Bar Spacer */}
      {Platform.OS === "android" && (
        <View style={{ height: StatusBar.currentHeight }} />
      )}

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Sonny Angel PH
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Sonny Angel PH Official Online Store
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.themeToggle,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
          onPress={toggleTheme}
        >
          <Text style={styles.themeIcon}>{isDarkMode ? "☀️" : "🌙"}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={[styles.searchContainer, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search"
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={[styles.clearIcon, { color: theme.textSecondary }]}>
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No products found
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
              Try searching with different keywords
            </Text>
          </View>
        }
      />

      {/* Go to Cart Button */}
      <TouchableOpacity
        style={[styles.cartButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("Cart")}
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
