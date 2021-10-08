import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import UnorderedList from "react-native-unordered-list";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default class page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(80) }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1593014290067-93bac771f1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
              }}
              style={styles.img}
            />
            <Text style={styles.title}>
              This is what really happens when you eat Expired Food
            </Text>
            <Text style={styles.paragraph}>
              Most times, you are fine if you have eaten a food that has passed
              by its expiration date only if the food is handled properly.
              According to the USDA Food Safety & Inspection Service cautions
              that if the food shows any signs of foul odor or the texture is
              off this means that the food is spoiling and indicates that it
              shouldn't be eaten.
            </Text>
            <Text style={styles.paragraph}>
              A study published in Waste Management, 84% percent of consumers
              throw out food when it's closer to their expiration date. Throwing
              food in the garbage is like putting money in the trash. According
              to Our World in Data, food waste can be blamed for about 6% of
              global greenhouse gas emissions.
            </Text>
            <Text style={styles.title}>
              5 Side Effects of Eating Expired Food
            </Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>Nothing at all. </Text>
                The dates are only suggestions by the manufacturer for when the
                food is at its peak quality, not when it is unsafe to eat.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>Food poisoning. </Text>
                Symptoms like fever, chill, stomach cramps, diarrhea, nausea,
                and vomiting. This is more common with perishable foods like
                eggs, meats, fruits, and vegetables. Mold, sour taste, weird
                color or texture and poor smells are more detectable.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>
                  Exposure to dangerous bacteria.{" "}
                </Text>
                Symptoms like fever, chill, stomach cramps, diarrhea, nausea,
                and vomiting. This is more common with perishable foods like
                eggs, meats, fruits, and vegetables. Mold, sour taste, weird
                color or texture and poor smells are more detectable.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>
                  Loss of nutritional value.{" "}
                </Text>
                This is specifically true with infant formula, which is the only
                item that federal regulations require a “use-by” date on the
                product label under inspection of the FDA to monitor nutrient
                decline.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>
                  Perfectly good food gets wasted.{" "}
                </Text>
                In an effort to reduce food waste, it is important that
                consumers understand the dates applied to food are for quality
                and not for safety.
              </Text>
            </UnorderedList>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
              }}
              style={styles.img}
            />
            <Text style={styles.title}>Tips on Food Safety</Text>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>Store food safely. </Text>
                Keep raw meat, poultry and fish separate from other foods in
                order to prevent cross-contamination.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>Handle it properly. </Text>
                Clean hands and surfaces can reduce your risk of developing a
                foodborne illness.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>
                  Cook the item to safe temperatures.{" "}
                </Text>
                Harmful bacteria is killed when a food is cooked thoroughly.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>
                  Maximize the shelf life of the product.{" "}
                </Text>
                Store pantry items between 50 and 70 degrees, ideally in metal,
                glass or plastic containers.
              </Text>
            </UnorderedList>
            <UnorderedList bulletUnicode={0x2022} style={styles.bullet}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "bold" }}>
                  Track how long the item’s been stored.{" "}
                </Text>
                Most items last up to five days in the refrigerator (at 40
                degrees or below) and 1 month to a year in the freezer(0 degrees
                or below).
              </Text>
            </UnorderedList>
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
    fontSize: 25,
    fontWeight: "500",
    paddingVertical: 10,
  },
  paragraph: {
    fontSize: 18,
    paddingVertical: 5,
    textAlign: "justify",
    lineHeight: 35,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 1,
  },
  bullet: {
    width: 10,
    fontWeight: "bold",
    paddingVertical: 5,
    lineHeight: 30,
  },
});
