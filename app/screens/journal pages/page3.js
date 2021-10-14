import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import UnorderedList from "react-native-unordered-list";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(80) }}>
            <TouchableWithoutFeedback>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
                }}
                style={styles.img}
              />
              <View style={styles.photoCredit}>
                <Text style={styles.baseText}>Image by Jasmin Sessler</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.title}>Top Causes of Food Waste</Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Purchasing too much food products
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Preparing more than what can be eaten
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                Improper food storage, and not consuming leftovers
              </Text>
            </UnorderedList>
            <Text style={styles.title}>Tips to Reduce Food Waste at Home</Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Create a shopping list. </Text>
                Make the best out of your market trip by having a list of what
                to buy. Cook and eat what you already have at home before buying
                more.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Plan your meals. </Text>
                Create a cycle menu or plan what you’re going to eat for each
                week to determine the quantity and types of food to purchase.
                This will lessen your trips, and will save time and money.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Check the storage. </Text>
                First in, First out (FIFO) means the first food that you bought
                must be the first one that you use. Avoid food spoilage, and
                ensure safe and proper preparation and handling of food at all
                times.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>Know your serving sizes. </Text>
                Only cook or serve what you and/or other household members can
                finish. Educate children about the importance of reducing food
                waste by involving them in food preparation or cooking and
                giving them a chance to get their meal served on their own.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={styles.boldText}>
                  Be creative with your next meal.{" "}
                </Text>
                Cook a variety of dishes using leftovers or use all parts of
                meat or produce from your home garden. Prepare simple and
                nutritious recipes just enough in quantity.
              </Text>
            </UnorderedList>
            <TouchableWithoutFeedback>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1582408904325-adf33a0ec010?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
                }}
                style={styles.img}
              />
              <View style={styles.photoCredit}>
                <Text style={styles.baseText}>Image by Jasmin Sessler</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.title}>What happens to food waste?</Text>
            <Text style={styles.paragraph}>
              Once you throw your food away, they go straight to the
              landfill—but it doesn’t just end then and there. Studies show that
              food waste in landfills essentially becomes toxic. When they are
              trapped in a huge pile of garbage, they’re deprived of oxygen,
              which is an important component for food to naturally decompose.
              And without oxygen, food waste releases methane—a greenhouse gas
              that is 20 times more harmful to the atmosphere than carbon
              dioxide.
            </Text>
            <Text style={styles.paragraph}>
              When it rains, landfills also become a source for groundwater
              pollution. The groundwater allows toxic chemicals such as ammonia
              to develop and this could be a major problem when they reach
              lakes, rivers, and other bodies of water.
            </Text>
            <Text style={styles.title}>Sources</Text>
            <Text style={styles.paragraph}>
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://www.rappler.com/moveph/food-wastage-household"
                  )
                }
              >
                How to stop food wasting? Start in the household
              </Text>
              {"\n"}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://wwf.org.ph/resource-center/story-archives-2020/food-waste-starts-at-home/"
                  )
                }
              >
                What are We Wasting for? Reducing Food Waste Starts at Home!
              </Text>
              {"\n"}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://nolisoli.ph/60816/food-waste-jchua-20190405/"
                  )
                }
              >
                Food for thought: This is what happens to food waste
              </Text>
              {"\n"}
              Images used are from{" "}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL("https://unsplash.com/")}
              >
                Unsplash
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 50,
  },
  img: {
    height: heightPercentageToDP(25),
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 0.05,
  },
  title: {
    fontSize: widthPercentageToDP(6),
    fontFamily: "NunitoSans_600SemiBold",
    paddingVertical: 10,
  },
  paragraph: {
    fontSize: widthPercentageToDP(4.5),
    fontFamily: "NunitoSans_400Regular",
    paddingVertical: 5,
    textAlign: "justify",
    lineHeight: 40,
  },
  boldText: {
    fontFamily: "NunitoSans_700Bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 1,
  },
  bullet: {
    width: 10,
    fontFamily: "NunitoSans_600SemiBold",
    paddingVertical: 5,
    lineHeight: 35,
    marginLeft: 10,
  },
  baseText: {
    fontSize: widthPercentageToDP(3.75),
    fontFamily: "NunitoSans_400Regular",
  },
  photoCredit: {
    position: "absolute",
    backgroundColor: "#f3f3f3",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 5,
  },
  link: {
    color: "#0645ad",
    textDecorationLine: "underline",
  },
});
