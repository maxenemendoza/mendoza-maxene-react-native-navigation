import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import type { RootStackParamList, CartItem } from "../types/index";
import { styles } from "../styles/CartScreen.styles";

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Cart"
>;

interface CartScreenProps {
  navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { cartItems, incrementQuantity, decrementQuantity, getTotalPrice } =
    useCart();
  const { theme, isDarkMode } = useTheme();

  const renderCartItem: ListRenderItem<CartItem> = ({ item }) => (
    <View
      style={[
        styles.cartItem,
        { backgroundColor: theme.cardBackground, borderColor: theme.border },
      ]}
    >
      <View style={styles.itemImageContainer}>
        {typeof item.image === "string" ? (
          <Text style={styles.itemEmoji}>{item.image}</Text>
        ) : (
          <Image
            source={item.image}
            style={styles.itemImage}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.itemPrice, { color: theme.primary }]}>
          ${item.price.toFixed(2)} each
        </Text>
        <Text style={[styles.itemTotal, { color: theme.textSecondary }]}>
          Total: ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: theme.primary }]}
          onPress={() => decrementQuantity(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </TouchableOpacity>

        <Text style={[styles.quantity, { color: theme.text }]}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: theme.primary }]}
          onPress={() => incrementQuantity(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = (): React.JSX.Element => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={[styles.emptyText, { color: theme.text }]}>
        Your cart is empty
      </Text>
      <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        Add some products to get started
      </Text>
      <TouchableOpacity
        style={[styles.shopButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Shopping Cart
        </Text>
        <View style={styles.placeholder} />
      </View>

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Total and Checkout Button */}
          <View
            style={[
              styles.footer,
              {
                backgroundColor: theme.cardBackground,
                borderTopColor: theme.border,
              },
            ]}
          >
            <View style={styles.totalContainer}>
              <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>
                Total Amount:
              </Text>
              <Text style={[styles.totalAmount, { color: theme.primary }]}>
                ${getTotalPrice().toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.checkoutButton,
                { backgroundColor: theme.primary },
              ]}
              onPress={() => navigation.navigate("Checkout")}
              activeOpacity={0.9}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
