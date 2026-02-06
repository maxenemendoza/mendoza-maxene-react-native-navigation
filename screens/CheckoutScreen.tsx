import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ListRenderItem,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import type { RootStackParamList, CartItem } from "../types/index";
import { styles } from "../styles/CheckoutScreen.styles";

type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Checkout"
>;

interface CheckoutScreenProps {
  navigation: CheckoutScreenNavigationProp;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { theme, isDarkMode } = useTheme();

  const handleCheckout = (): void => {
    Alert.alert(
      "Checkout Successful",
      "Thank you for your purchase!",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false },
    );
  };

  const renderCheckoutItem: ListRenderItem<CartItem> = ({ item }) => (
    <View
      style={[
        styles.checkoutItem,
        { backgroundColor: theme.cardBackground, borderColor: theme.border },
      ]}
    >
      <View style={styles.itemRow}>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.itemQuantity, { color: theme.textSecondary }]}>
            Qty: {item.quantity}
          </Text>
        </View>
        <View style={styles.priceInfo}>
          <Text style={[styles.itemPrice, { color: theme.textSecondary }]}>
            ${item.price.toFixed(2)} × {item.quantity}
          </Text>
          <Text style={[styles.itemTotal, { color: theme.primary }]}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSummary = (): React.JSX.Element => {
    const subtotal = getTotalPrice();
    const tax = subtotal * 0.1; // 10% tax
    const shipping = cartItems.length > 0 ? 9.99 : 0;
    const total = subtotal + tax + shipping;

    return (
      <View
        style={[
          styles.summaryCard,
          { backgroundColor: theme.cardBackground, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.summaryTitle, { color: theme.text }]}>
          Order Summary
        </Text>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            Tax (10%)
          </Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>
            ${tax.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            Shipping
          </Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>
            ${shipping.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <View style={styles.summaryRow}>
          <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
          <Text style={[styles.totalValue, { color: theme.primary }]}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

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
          Checkout
        </Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCheckoutItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Order Items
          </Text>
        }
        ListFooterComponent={renderSummary()}
        showsVerticalScrollIndicator={false}
      />

      {/* Checkout Button */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.border,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: theme.primary }]}
          onPress={handleCheckout}
          activeOpacity={0.9}
        >
          <Text style={styles.checkoutButtonText}>Complete Checkout</Text>
          <Text style={styles.checkIcon}>✓</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
