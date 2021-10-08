// Why we shouldn't consume expired goods

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import Unorderedlist from "react-native-unordered-list";
import Carousel from "react-native-carousel-control";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default class page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Carousel
          currentPage={2}
          pageStyle={{ backgroundColor: "#ffd2a5", borderRadius: 30 }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>
              This is What Really happens when you Eat Expired-Food
            </Text>

            <Text style={styles.content}>
              Most times, you are fine if you have eaten a food that has passed
              by its expiration date only if the food is handled properly.
              According to the USDA Food Safety & Inspection Service cautions
              that if the food shows any signs of foul odor or the texture is
              off this means that the food is spoiling and indicates that it
              shouldn't be eaten.
            </Text>

            <Text style={styles.content}>
              A study published in Waste Management, 84% percent of consumers
              throw out food when it's closer to their expiration date. Throwing
              food in the garbage is like putting money in the trash. According
              to Our World in Data, food waste can be blamed for about 6% of
              global greenhouse gas emissions.
            </Text>

            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  "https://www.mashed.com/232887/this-is-what-really-happens-when-you-eat-expired-food/"
                )
              }
            >
              Click Here for More Information
            </Text>
          </View>

          <View>
            <Text style={styles.title}>
              5 SIDE Effects of Eating Expired Foods
            </Text>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                NOTHING AT ALL. The dates are only suggestions by the
                manufacturer for when the food is at its peak quality, not when
                it is unsafe to eat.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                FOOD POISONING. Symptoms like fever, chill, stomach cramps,
                diarrhea, nausea, and vomiting. This is more common with
                perishable foods like eggs, meats, fruits, and vegetables. Mold,
                sour taste, weird color or texture and poor smells are more
                detectable.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                EXPOSURE TO DANGEROUS BACTERIA. Microorganisms such as molds,
                yeast, and bacteria can multiply and cause food to spoil.
                Viruses are not capable of growing in food and do not cause
                spoilage.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                LOSS OF NUTRITIONAL VALUE. This is specifically true with infant
                formula, which is the only item that federal regulations require
                a “use-by” date on the product label under inspection of the FDA
                to monitor nutrient decline.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                PERFECTLY GOOD FOOD GETS WASTED. In an effort to reduce food
                waste, it is important that consumers understand the dates
                applied to food are for quality and not for safety.
              </Text>
            </Unorderedlist>

            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL("https://www.eatthis.com/eating-expired-foods/")
              }
            >
              Click Here for More Information
            </Text>
          </View>

          <View>
            <Text style={styles.title}>Tips on Food Safety</Text>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                Store food safely. Keep raw meat, poultry and fish separate from
                other foods in order to prevent cross-contamination.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                Handle it properly. Clean hands and surfaces can reduce your
                risk of developing a foodborne illness.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                Cook the item to safe temperatures. Harmful bacteria is killed
                when a food is cooked thoroughly.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                Maximize the shelf life of the product. Store pantry items
                between 50 and 70 degrees, ideally in metal, glass or plastic
                containers.
              </Text>
            </Unorderedlist>

            <Unorderedlist bulletUnicode={0x2023} style={styles.bullet}>
              <Text style={[styles.content]}>
                Track how long the item’s been stored. Most items last up to
                five days in the refrigerator (at 40 degrees or below) and 1
                month to a year in the freezer (0 degrees or below).
              </Text>
            </Unorderedlist>

            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  "https://www.livestrong.com/article/480566-effects-of-expired-foods/"
                )
              }
            >
              Click Here for More Information
            </Text>
          </View>
        </Carousel>
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
  title: {
    paddingTop: 15,
    paddingLeft: 10,
    fontSize: 30,
    borderRadius: 30,
  },
  bullet: {
    fontSize: 15,
    textShadowRadius: 1,
    margin: 5,
    textAlign: "justify",
    padding: 10,
  },
  content: {
    fontSize: 15,
    textShadowRadius: 1,
    margin: 10,
    textAlign: "justify",
    padding: 5,
  },
  link: {
    fontSize: 15,
    textShadowRadius: 1,
    margin: 10,
    fontWeight: "bold",
    textAlign: "justify",
    padding: 10,
    color: "#EA4C4C",
  },
});
